'use client'

import React from 'react'
import {carsBaseUrl} from "@/lib/utils";

export interface CarBase {
    id: number
    car_name: {
        make: {
            car_make: string
        }
        model: string
        year: {
            year: number
        }
    }
    fob_price: string
    status: string
    
    // List page
    image?: string
    size?: {
        name?: string
        cubic_meters?: string
        cars_per_container?: string
    }
    category: string
    transmission_type: string
    mileage: number
}


export interface CarType extends CarBase {
    // id: number,
    auction_grade: string
    // body_type: string
    // car_name: {
    //     make: {
    //         car_make: string
    //     },
    //     model: string
    //     year: {
    //         year: number
    //     }
    // }
    // category: string
    chassis_number: string
    engine_capacity: number
    engine_type: string
    exterior_color: string
    interior_color: string
    features: string
    // fob_price: string
    images: {
        id: number,
        image: string
    }[]
    // mileage: number
    price: string
    // status: string
    // transmission_type: string
}

interface CarContextType {
    // Similar Cars to the selected car
    similarCars: CarBase[],
    // selectedCar is for a single car selected (e.g., for detail view)
    selectedCar: CarType | null, // Use null for no selection
    setCar: (car: CarType | null) => void,
    // searchResults will hold the *filtered* results based on user search
    searchResults: CarBase[],
    setSearchResults: (cars: CarBase[]) => void,
    // selectedStockCar also for single car selection (if different from selectedCar)
    selectedStockCar: CarType | null, // Use null for no selection
    setStockCar: (car: CarType | null) => void,
    // Add a state to hold the *full* stock data fetched from the server
    allStockCars: CarBase[],
    setAllStockCars: (cars: CarBase[]) => void,
    // Add a state for featured cars if you want to manage them separately in context
    // featuredCars: CarBase[],
    // setFeaturedCars: (cars: CarBase[]) => void,
    //
    // // New Arrivals
    // latestCars: CarBase[],
    // setLatestCars: (cars: CarBase[]) => void,
    
    // Favourites
    // favouriteCars: CarType[],
    // toggleFavourite: (cars: CarType) => void,
    // isFavourite: (id: number) => boolean,
    
    // Pagination
    // page: number,
    // hasMore: boolean,
    // loading: boolean,
    // fetchStockCars: (pageToFetch: number) => Promise<PaginatedCarResponse>,
    // fetchNextPage: () => Promise<void>
}

// interface PaginatedCarResponse {
//     count: number
//     next: string | null
//     previous: string | null
//     results: CarType[]
// }

interface CarProviderProps {
    children: React.ReactNode;
    // Props to receive initial data from Server Component
    initialAllStockCars: CarBase[];
    // initialFeaturedCars: CarBase[];
    // newArrivals: CarBase[];
}

const Context = React.createContext<CarContextType | null>(null)

export const CarProvider: React.FC<CarProviderProps> = ({children, initialAllStockCars}) => {
    const [selectedCar, setSelectedCar] = React.useState<CarType | null>(null)
    const [searchResults, setSearchResults] = React.useState<CarBase[]>(initialAllStockCars) // Initialize with all stock
    const [selectedStockCar, setSelectedStockCar] = React.useState<CarType | null>(null)
    const [allStockCars, setAllStockCars] = React.useState<CarBase[]>(initialAllStockCars); // State to hold all cars
    // const [featuredCars, setFeaturedCars] = React.useState<CarBase[]>(initialFeaturedCars); // State to hold featured cars
    // const [latestCars, setLatestCars] = React.useState<CarBase[]>(newArrivals)
    // const [favouriteCars, setFavouriteCars] = React.useState<CarType[]>([])
    // const [page, setPage] = React.useState(1)
    // const [hasMore, setHasMore] = React.useState(true)
    // const [loading, setLoading] = React.useState(false)
    //
    // const fetchStockCars = async (pageToFetch: number = 1): Promise<PaginatedCarResponse> => {
    //     setLoading(true)
    //     try {
    //         const res = await fetch(`${carsBaseUrl}?page=${pageToFetch}`)
    //         if (!res.ok) throw new Error('Failed to fetch')
    //
    //         const data: PaginatedCarResponse = await res.json()
    //
    //         if (data.results) {
    //             setAllStockCars(prev => [...prev, ...data.results])
    //             setSearchResults(prev => [...prev, ...data.results])
    //             setHasMore(data.next !== null)
    //             setPage(pageToFetch)
    //         } else {
    //             setHasMore(true) // or false if you prefer
    //         }
    //         return data
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    //
    //
    // const fetchNextPage = React.useCallback(async () => {
    //     if (!loading && hasMore) await fetchStockCars(page + 1)
    // }, [loading, hasMore, page])
    
    // Memoize setters to prevent unnecessary re-renders of consumers
    const setCar: CarContextType['setCar'] = React.useCallback((car) => setSelectedCar(car), []);
    const setStockCar: CarContextType['setStockCar'] = React.useCallback((car) => setSelectedStockCar(car), []);
    const updateSearchResults: CarContextType['setSearchResults'] = React.useCallback((cars) => setSearchResults(cars), []);
    const updateAllStockCars: CarContextType['setAllStockCars'] = React.useCallback((cars) => setAllStockCars(cars), []);
    // const updateFeaturedCars: CarContextType['setFeaturedCars'] = React.useCallback((cars) => setFeaturedCars(cars), []);
    // const updateLatestCars: CarContextType['setLatestCars'] = React.useCallback((cars) => setLatestCars(cars), []);
    // // Toggle & Checker functions for Favourites
    // const toggleFavourite = React.useCallback((car: CarType) => {
    //     setFavouriteCars(prevState =>
    //         prevState.some(c => c.id === car.id)
    //             ? prevState.filter(c => c.id !== car.id)
    //             : [...prevState, car])
    // }, [])
    // const isFavourite = React.useCallback((id: number) => favouriteCars.some(car => car.id === id), [favouriteCars])
    
    const similarCars = React.useMemo(() => {
        const baseCar = selectedStockCar
        if (!baseCar) return []
        const selectedMake = baseCar.car_name.make.car_make
        const selectedModel = baseCar.car_name.model
        
        return allStockCars.filter(car =>
            car.id !== baseCar.id &&
            car.car_name.make.car_make === selectedMake &&
            car.car_name.model === selectedModel)
    }, [selectedStockCar, allStockCars])
    
    const contextValue = React.useMemo(() => ({
        selectedCar, // Shorthand for selectedCar: selectedCar
        setCar, // Use the actual setter from useState
        searchResults,
        setSearchResults: updateSearchResults,
        selectedStockCar,
        setStockCar, // Use the actual setter
        allStockCars,
        setAllStockCars: updateAllStockCars,
        // featuredCars,
        // setFeaturedCars: updateFeaturedCars,
        similarCars,
        // latestCars,
        // setLatestCars: updateLatestCars,
        
        // Favourites
        // favouriteCars,
        // toggleFavourite,
        // isFavourite
        
        // Pagination
        // page,
        // hasMore,
        // loading,
        // fetchStockCars,
        // fetchNextPage,
    }), [
        selectedCar,
        searchResults,
        updateSearchResults, // Include memoized setters in dependencies
        selectedStockCar,
        allStockCars,
        updateAllStockCars,
        // featuredCars,
        // updateFeaturedCars,
        setCar,
        setStockCar,
        similarCars
    ]);
    
    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export const useCarContext = () => {
    const context = React.useContext(Context)
    if (!context) throw new Error('useCarContext must be used within a CarProvider')
    return context
}