'use client'

import React from 'react'
import Image from 'next/image'
import {Search, X, SlidersHorizontal} from "lucide-react";
import Car from '@/ui/car'
import {shuffleStock} from '@/lib/utils'
import {CarBase, CarType, useCarContext} from '@/lib/car-context'
import {useRouter, useSearchParams} from 'next/navigation'
import CifSelector from "@/ui/cif-selector";
import SendWhatsapp from "@/ui/svgs/send-whatsapp";

// Define the number of items to load each time the user scrolls to the bottom
const ITEMS_TO_LOAD = 50;

const StockCars = () => {
    const {allStockCars} = useCarContext() as { allStockCars: CarBase[] }
    
    const router = useRouter()
    const searchParams = useSearchParams()
    
    // useRef for the Intersection Observer target element
    const observerTargetRef = React.useRef<HTMLDivElement>(null)
    
    // State to track how many items are currently displayed (for infinite scroll)
    const [itemsToDisplay, setItemsToDisplay] = React.useState(ITEMS_TO_LOAD)
    
    // Filters state - remove 'page'
    const [filters, setFilters] = React.useState({
        brand: '',
        model: '',
        year: 0,
        trans: '',
        maxPrice: '',
        search: '',
    })
    
    const [displayedStock, setDisplayedStock] = React.useState<CarBase[]>([])
    
    // ========== INITIALIZE FROM URL ==========
    React.useEffect(() => {
        const brand = searchParams.get('brand') || ''
        const model = searchParams.get('model') || ''
        const year = Number(searchParams.get('year')) || 0
        const trans = searchParams.get('trans') || ''
        const maxPrice = searchParams.get('maxPrice') || ''
        const search = searchParams.get('search') || ''
        
        setFilters({brand, model, year, trans, maxPrice, search})
        // Reset items to display when loading new search params
        setItemsToDisplay(ITEMS_TO_LOAD)
    }, [searchParams])
    
    // ========== UPDATE URL WHEN FILTERS CHANGE ==========
    const updateURL = React.useCallback(
        (updated: Partial<typeof filters>) => {
            const newFilters = {...filters, ...updated}
            setFilters(newFilters)
            setItemsToDisplay(ITEMS_TO_LOAD); // Reset scroll position when filters change
            
            const params = new URLSearchParams()
            if (newFilters.brand) params.set('brand', newFilters.brand)
            if (newFilters.model) params.set('model', newFilters.model)
            if (newFilters.year) params.set('year', newFilters.year.toString())
            if (newFilters.trans) params.set('trans', newFilters.trans)
            if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice)
            if (newFilters.search) params.set('search', newFilters.search)
            
            router.replace(`?${params.toString()}`, {scroll: false})
        },
        [filters, router]
    )
    
    // ========== STOCK DATA ==========
    React.useEffect(() => {
        if (allStockCars.length > 0) setDisplayedStock(shuffleStock(allStockCars))
    }, [allStockCars])
    
    const getMake = (car: CarBase) => car?.car_name?.make?.car_make ?? ''
    const getModel = (car: CarBase) => car.car_name.model ?? ''
    const getYear = (car: CarBase) => car?.car_name?.year?.year ?? ''
    const getTransmission = (car: CarBase) => car?.transmission_type?.toUpperCase() ?? ''
    const getPrice = (car: CarBase) => Number(car?.fob_price ?? 0)
    
    const brands = React.useMemo(
        () => [...new Set(displayedStock.map(getMake))].filter(Boolean).sort(),
        [displayedStock]
    )
    
    const models = React.useMemo(() => {
        if (!filters.brand) return []
        return [...new Set(displayedStock
            .filter((c) => getMake(c) === filters.brand)
            .map(getModel)
        )].filter(Boolean)
    }, [displayedStock, filters.brand])
    
    const years = React.useMemo(() => {
        if (!filters.brand) return []
        let filtered = displayedStock.filter((c) => getMake(c) === filters.brand)
        if (filters.model) filtered = filtered.filter((c) => getModel(c) === filters.model)
        return [...new Set(filtered.map(getYear))].filter(Boolean).sort((a, b) => Number(b) - Number(a))
    }, [displayedStock, filters.brand, filters.model])
    
    const transmissions = React.useMemo(
        () => [...new Set(displayedStock.map(getTransmission))].filter(Boolean),
        [displayedStock]
    )
    
    // ========== FILTER CARS (NO PAGINATION LOGIC HERE) ==========
    const filteredStock = React.useMemo(() => {
        let filtered = displayedStock
        
        if (filters.brand) filtered = filtered.filter((c) => getMake(c) === filters.brand)
        if (filters.model) filtered = filtered.filter((c) => getModel(c) === filters.model)
        if (filters.year) filtered = filtered.filter((c) => getYear(c) === filters.year)
        if (filters.trans) filtered = filtered.filter((c) => getTransmission(c) === filters.trans)
        if (filters.maxPrice) filtered = filtered.filter((c) => getPrice(c) <= Number(filters.maxPrice))
        
        if (filters.search.trim()) {
            const q = filters.search.toLowerCase()
            filtered = filtered.filter((c) =>
                [
                    getMake(c).toLowerCase(),
                    getModel(c).toLowerCase(),
                    getYear(c).toString(),
                    getTransmission(c).toLowerCase(),
                    c.mileage?.toString() ?? '',
                ].some((v) => v.includes(q))
            )
        }
        return filtered
    }, [displayedStock, filters])
    
    // ========== INFINITE SCROLL LOGIC ==========
    const displayedCars = React.useMemo(() => {
        return filteredStock.slice(0, itemsToDisplay)
    }, [filteredStock, itemsToDisplay])
    
    // Check if there are more items to load
    const hasMore = filteredStock.length > displayedCars.length;
    
    // Intersection Observer Effect
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    // Load more items when the target enters the viewport
                    setItemsToDisplay((prev) => prev + ITEMS_TO_LOAD)
                }
            },
            {threshold: 1.0} // Trigger when 100% of the target is visible
        )
        
        const currentTarget = observerTargetRef.current
        
        if (currentTarget) {
            observer.observe(currentTarget)
        }
        
        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [hasMore]) // Dependency on hasMore ensures the observer stops when all items are loaded
    // Note: The use of an empty dependency array (or carefully controlled dependencies like [hasMore])
    // is common for setting up observers.
    
    const success = displayedStock.length > 0
    const clearFilters = () => router.replace('?')
    
    // ========== UI ==========
    return (
        <>
            {/* Header (omitted for brevity, assume it's the same) */}
            <div className="relative full bg-sky-900 overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0 -z-10 opacity-40">
                    <Image
                        src="/japanese-supra.jpg"
                        alt="Background Supra"
                        width={1920}
                        height={1080}
                        className="object-cover"
                        priority
                    />
                </div>
                
                {/* Content */}
                <div className="content-grid py-12 mb-12">
                    <section
                        className="md:flex items-center justify-between gap-10 text-center lg:text-left">
                        
                        {/* Left Text Section */}
                        <div
                            className="flex flex-col gap-6 md:h-full md:max-w-lg lg:max-w-2xl md:items-start md:justify-between ">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold  uppercase text-sky-100 font-serif tracking-widest">
                                Best Car Deals
                            </h1>
                            <section className="bg-sky-100 shadow-lg rounded p-3 space-y-2">
                                <p className="text-lg font-bold text-sky-900 uppercase">
                                    Drive a slightly used car for less than you might expect. <br/>
                                    Thoroughly inspected, <br/> delivered worldwide at affordable rates.
                                </p>
                                <SendWhatsapp/>
                            </section>
                        </div>
                        
                        {/* Right Car Image */}
                        <div className="mt-10 md:mt-0 lg:mt-0 flex justify-center lg:justify-end">
                            <Image
                                src="/japanese-supra.png"
                                alt="A dark blue BMW"
                                width={550}
                                height={350}
                                className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-xl"
                            />
                        </div>
                    </section>
                </div>
            </div>
            
            <div className="content-grid">
                <CifSelector/>
            </div>
            <section className="content-grid gap-4 my-4">
                <div className="relative mb-8">
                    
                    {/* Glow background */}
                    <div
                        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 opacity-30 blur-lg"></div>
                    
                    {/* Main container */}
                    <div className="relative rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
                        
                        {/* Header */}
                        <div
                            className="flex flex-col gap-2 px-6 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/20 p-2">
                                    <SlidersHorizontal size={18}/>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold tracking-wide uppercase">
                                        Search Available Stock
                                    </h3>
                                    <p className="text-xs text-orange-100">
                                        Find the right vehicle from Japan
                                    </p>
                                </div>
                            </div>
                            
                            {Object.values(filters).some(Boolean) && (
                                <button
                                    onClick={clearFilters}
                                    className="self-start rounded-lg bg-white/20 px-4 py-2 text-xs font-semibold hover:bg-white/30 sm:self-auto"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                        
                        {/* Filters */}
                        <section className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-6">
                            
                            {/* Brand */}
                            <select
                                value={filters.brand}
                                onChange={(e) =>
                                    updateURL({brand: e.target.value, model: "", year: 0})
                                }
                                className="h-12 uppercase rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-semibold focus:border-orange-600 focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">Select Brand</option>
                                {brands.map((b) => (
                                    <option className='uppercase' key={b} value={b}>{b.toUpperCase()}</option>
                                ))}
                            </select>
                            
                            {/* Model */}
                            <select
                                value={filters.model}
                                onChange={(e) =>
                                    updateURL({model: e.target.value, year: 0})
                                }
                                disabled={!filters.brand}
                                className="h-12 rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-semibold disabled:opacity-40 focus:border-orange-600 focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">Select Model</option>
                                {[...models]
                                    .sort((a, b) => a.localeCompare(b))
                                    .map((m) => (
                                        <option key={m}>{m}</option>
                                    ))}
                            </select>
                            
                            {/* Year */}
                            <select
                                value={filters.year || ""}
                                onChange={(e) =>
                                    updateURL({year: Number(e.target.value)})
                                }
                                disabled={!filters.brand}
                                className="h-12 rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-semibold disabled:opacity-40 focus:border-orange-600 focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">Select Year</option>
                                {years.map((y) => (
                                    <option key={y}>{y}</option>
                                ))}
                            </select>
                            
                            {/* Transmission */}
                            <select
                                value={filters.trans}
                                onChange={(e) => updateURL({trans: e.target.value})}
                                className="h-12 rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-semibold focus:border-orange-600 focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">Transmission</option>
                                {transmissions.map((t) => (
                                    <option key={t} value={t}>
                                        {t === "M" ? "Manual" :  t === "H" ? "Hybrid" : "Automatic"}
                                    </option>
                                ))}
                            </select>
                            
                            {/* Max Price */}
                            <input
                                type="number"
                                value={filters.maxPrice}
                                onChange={(e) =>
                                    updateURL({maxPrice: e.target.value})
                                }
                                placeholder="Max Price (USD)"
                                className="h-12 rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm font-semibold focus:border-orange-600 focus:ring-2 focus:ring-orange-500"
                            />
                            
                            {/* Keyword Search */}
                            <div
                                className="flex h-12 items-center rounded-xl border border-gray-300 bg-gray-50 focus-within:border-orange-600 focus-within:ring-2 focus-within:ring-orange-500 lg:col-span-2">
                                <input
                                    type="text"
                                    value={filters.search}
                                    onChange={(e) =>
                                        updateURL({search: e.target.value})
                                    }
                                    placeholder="Search keyword..."
                                    className="flex-1 bg-transparent px-4 text-sm font-semibold outline-none"
                                />
                                {filters.search ? (
                                    <button
                                        type="button"
                                        onClick={() => updateURL({search: ""})}
                                        className="px-4 text-gray-500 hover:text-red-600"
                                    >
                                        <X size={18}/>
                                    </button>
                                ) : (
                                    <div className="px-4 text-gray-400">
                                        <Search size={18}/>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
                {/* Car Grid */}
                <section
                    className="mt-12 breakout px-4 lg:px-0 grid gap-4 md:gap-x-8 md:gap-y-16 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {success && displayedCars.length > 0 ? (
                        displayedCars.map((car) => <Car key={car.id} car={car}/>)
                    ) : (
                        <p className="col-span-full text-xl my-20 text-center font-semibold text-gray-500 p-8 border-2 border-dashed rounded-xl">
                            {success
                                ? 'No cars match your search criteria. Please try a different term.'
                                : 'Failed to fetch Cars Data. Please check your connection or try again!'}
                        </p>
                    )}
                </section>
                
                {/* INFINITE SCROLL TARGET AND LOADING INDICATOR */}
                {hasMore && (
                    <div ref={observerTargetRef} className="col-span-full flex justify-center py-8">
                        {/* You can replace this with a proper loading spinner component */}
                        <div className="text-lg font-semibold text-sky-700 animate-pulse">
                            Loading more cars...
                        </div>
                    </div>
                )}
                
                {/* Display message when all cars are loaded */}
                {!hasMore && filteredStock.length > 0 && (
                    <div className="col-span-full text-center text-gray-500 py-8">
                        <p>You have reached the end of the list ({filteredStock.length} total cars displayed).</p>
                    </div>
                )}
            </section>
        </>
    )
}

export default StockCars