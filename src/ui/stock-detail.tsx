"use client";

import React, {useRef, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {CarType, useCarContext} from "@/lib/car-context";
import Quote from "@/ui/quote";
import CifSelector from "@/ui/cif-selector";
import {useCif} from "@/context/cif-context";
import {calculateCIF, canCalculateCIF} from "@/lib/cif";
import {useCurrency} from "@/context/currency-context";
// Hero-icons
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import FeaturedCarsSection from "@/ui/featured-cars";
import SendWhatsapp from "@/ui/svgs/send-whatsapp";
import FavouriteHeart from "@/ui/favourite-heart";
import LoadingSkeleton from "@/ui/loading-skeleton";
import SimilarCarsSection from "@/ui/similar-cars-section";

const StockDetail = ({ car } : { car: CarType }) => {
    const { selectedStockCar, setStockCar } = useCarContext();
    
    // const car = React.useMemo(() =>
    //     allStockCars.find((car) => String(car.id) === id)
    // , [allStockCars, id])
    
    React.useEffect(() => {
        setStockCar(car ?? null)
    }, [car, setStockCar])
    
    if (!car && !selectedStockCar) return (
        <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600">Car Not Found or Data Error</h1>
                <p className="mt-4 text-gray-700">We could not load details for this car. Please check the URL or try again later.</p>
                {/* Using a Link component for navigation */}
                <Link
                href="/stock"
                className="mt-6 inline-block bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 hover:bg-sky-700 hover:shadow-xl"
            >
                ← Back to Stock
            </Link>
        </div>
    )
    
    const resolvedCar = car!;
    
    const {
        car_name,
        chassis_number,
        engine_capacity,
        status,
        images,
        interior_color,
        mileage,
        fob_price,
        features,
        exterior_color,
        transmission_type,
        engine_type,
    } =  resolvedCar;
    
    // console.log(car)
    
    const [total, setTotal] = React.useState(0);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    
    const {shippingMode, includeInspection, selectedPort, selectedCountry} = useCif();
    const {convert, currency, rates} = useCurrency();
    
    // Selected Country Currency
    const selectedCountryCurrency = selectedCountry?.currency?.toUpperCase()
    const thumbnailContainerRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);
    
    const updateScrollState = () => {
        const el = thumbnailContainerRef.current;
        if (!el) return;
        
        setCanScrollLeft(el.scrollLeft > 5);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    };
    
    const scrollThumbnails = (dir: "left" | "right") => {
        const el = thumbnailContainerRef.current;
        if (!el) return;
        
        const amount = el.clientWidth * 0.7; // scroll amount
        
        el.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };
    
    useEffect(() => {
        updateScrollState();
        const el = thumbnailContainerRef.current;
        if (!el) return;
        
        el.addEventListener("scroll", updateScrollState);
        return () => el.removeEventListener("scroll", updateScrollState);
    }, []);
    
    // Get Selected Country Currency Rate
    const selectedCountryCurrencyRate = React.useMemo(() => {
        if (!selectedCountryCurrency) return null
        return rates[selectedCountryCurrency] ?? null
    }, [rates, selectedCountryCurrency])
    
    // Convert to user selected country currency rate
    const convertDefaultCurrency = React.useCallback((usdValue: number) => {
        if(!selectedCountryCurrencyRate) return null
        if(selectedCountryCurrency === 'USD') return usdValue
        return usdValue * selectedCountryCurrencyRate
    }, [selectedCountryCurrencyRate, selectedCountryCurrency])
    
    const fobUsd = Number(fob_price) || 0
    const cifUsd = Number(total) || 0
    
    const carPrice = convert(fobUsd);
    const cifPrice = convert(cifUsd);
    
    const countryFob = convertDefaultCurrency(fobUsd)
    const countryCif = convertDefaultCurrency(cifUsd)
    
    useEffect(() => {
        if (!resolvedCar || !selectedPort) return
        const cif = calculateCIF(
            resolvedCar,
            selectedPort,
            shippingMode,
            includeInspection
        );
        setTotal(cif);
    }, [selectedPort, shippingMode, includeInspection, resolvedCar]);
    
    const name = `${car_name.make.car_make} ${car_name.model} ${car_name?.year?.year}`;
    const shareText = `Checkout this car on Sonador Motors: https://www.sonadormotors.jp/stock/${car?.id}`;
    const encodedShareText = encodeURIComponent(shareText);
    
    return (
        <>
        <section className="px-4 mx-auto mb-10 border-t-2 backdrop-blur-2xl border-t-blue-600 pt-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* ================= LEFT SIDE ================= */}
                <div className="lg:order-2">
                    <h1 className="text-xl md:text-2xl text-center mb-4 underline font-extrabold uppercase">
                        {name}
                    </h1>
                    {/* SHARE BUTTON */}
                    <div className="hidden my-2 lg:flex justify-center text-center">
                        <a
                            className="gap-2 w-fit flex items-center jcetify-center bg-green-600 hover:bg-green-700 px-4 mx-auto md:mx-0 rounded"
                            href={`https://api.whatsapp.com/send?text=${encodedShareText}`}
                            target="_blank"
                        >
                            <Image
                                src="/whatsapp.png"
                                alt="WhatsApp Icon"
                                width={40}
                                height={50}
                            />
                            <span className="font-bold text-green-100 uppercase">
                                Share This Car Via WhatsApp
                            </span>
                        </a>
                    </div>
                    {/* Chassis Optional Stars ★★★★★ */}
                    <ul className="w-full space-y-2 lg:mb-0">
                        <ul className="">
                            {[
                                ["Chassis No.", chassis_number ? `${chassis_number.slice(0, 10)}` : ""],
                                ["Engine Size", `${engine_capacity} CC`],
                                ["Fuel", engine_type],
                                ["Mileage", `${mileage} KM`],
                                ["Transmission", transmission_type === "A" ? "Automatic" : "Manual"],
                                ["Exterior Color", exterior_color],
                                ["Interior Color", interior_color],
                            ].map(([label, value]) => (
                                <li
                                    key={label}
                                    className="grid grid-cols-2 py-3 items-center"
                                >
                                    <span className="font-bold rounded-l md:uppercase bg-black text-gray-100 py-2 pl-2 md:p-4 uppercase">
                                        {label}
                                    </span>
                                    
                                    <span className="font-semibold text-wrap md:col-span-1 uppercase bg-gradient-to-r from-orange-600 to-orange-500 rounded-r text-amber-50 p-2 md:p-4">
                                        {value}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        
                        <li className="text-center my-4 ">
                            <p className="text-black flex items-center justify-center gap-4 text-xl font-bold">
                                FOB PRICE:
                                <span className="font-bold text-green-700">
                                    {carPrice
                                        ? `${carPrice.toLocaleString()} ${currency}`
                                        : "ASK IN THE FORM"}
                                </span>
                            </p>
                            {
                                selectedCountryCurrency &&
                                currency !== selectedCountryCurrency && currency === 'USD' && (
                                    <span className='tabular-nums text-sky-700 font-semibold'>
                                        {countryFob ? `( ${countryFob.toLocaleString()} ${selectedCountryCurrency} )` : '( calculating... )'}
                                    </span>
                                )
                            }
                        </li>
                        <li className="text-center">
                            {
                                selectedPort &&
                                (canCalculateCIF(
                                    resolvedCar,
                                    selectedPort,
                                    shippingMode
                                ) ? (
                                    <>
                                        <p className="font-bold text-black text-2xl flex justify-center gap-4">
                                            C&F PRICE:
                                            <span className="text-amber-700 font-extrabold">
                                                {cifPrice?.toLocaleString()}{" "}
                                                    {currency}
                                            </span>
                                        </p>
                                        {
                                            selectedCountryCurrency &&
                                            currency !== selectedCountryCurrency && currency === 'USD' && (
                                                <span className='tabular-nums text-sky-700 font-semibold'>
                                                    { countryCif ? `( ${countryCif.toLocaleString()} ${selectedCountryCurrency} )` : ( 'calculating...' )}
                                                </span>
                                            )
                                        }
                                    </>
                                ) : (
                                    <Link href='#get-quote'
                                          className="bg-amber-700 w-full mx-auto py-2 hover:bg-amber-800 rounded text-white font-bold inline-block mb-4 mt-2">
                                        REQUEST PRICE QUOTE BELOW
                                    </Link>
                                ))}
                        </li>
                        <li>
                            <a
                                href={`https://carvx.jp/search/new?chassis_number=${chassis_number}`}
                                target="_blank"
                                className="block pb-4 text-black font-extrabold text-center underline uppercase"
                            >
                                Find detailed chassis info here
                            </a>
                        </li>
                        <li>
                            <CifSelector isShowCif={true}/>
                        </li>
                        
                        <li className="my-4 p-4 border rounded text-center md:text-left border-gray-400 text-green-700 font-bold">
                            <em>** FOB price includes all charges in Japan. Shipping is not included. **</em>
                        </li>
                        
                        <li className="p-2 border rounded text-center border-gray-400">
                            ADDITIONAL FEATURES
                            <span className="font-semibold block pt-4">
                                {features}
                            </span>
                        </li>
                    </ul>
                </div>
                
                {/* ================= RIGHT SIDE (IMAGES) ================= */}
                <section>
                    {/* SHARE BUTTON */}
                    <a
                        className="inline-flex my-2 lg:hidden items-center justify-center gap-2 w-full bg-green-700 px-4 mx-auto md:mx-0 rounded"
                        href={`https://api.whatsapp.com/send?text=${encodedShareText}`}
                        target="_blank"
                    >
                        <Image
                            src="/whatsapp.png"
                            alt="WhatsApp Icon"
                            width={40}
                            height={50}
                        />
                        <span className="font-bold text-green-100 uppercase">
                            Share This Car Via WhatsApp
                        </span>
                    </a>
                    {/* MAIN IMAGE */}
                    <div className="relative w-full">
                        <FavouriteHeart vehicleId={resolvedCar.id}/>
                        {images.length > 0 && <Link href={images[currentImageIndex].image}>
                            <Image
                                src={images[currentImageIndex].image}
                                alt={name}
                                width={1000}
                                height={600}
                                className="rounded object-cover w-full border-2"
                                unoptimized
                            />
                        </Link>}
                        {status === "S" && (
                            <span className="text-red-500 font-bold absolute left-0 top-0 bg-red-50 px-4 bg-opacity-80">
                            SOLD
                        </span>
                        )}
                    </div>
                    {/* THUMBNAIL CAROUSEL */}
                    <div className="relative pt-2">
                        
                        {/* LEFT ARROW */}
                        {canScrollLeft && (
                            <button
                                onClick={() => scrollThumbnails("left")}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white z-20"
                            >
                                <ArrowLeftIcon className="h-6 w-6"/>
                            </button>
                        )}
                        
                        {/* RIGHT ARROW */}
                        {canScrollRight && (
                            <button
                                onClick={() => scrollThumbnails("right")}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white z-20"
                            >
                                <ArrowRightIcon className="h-6 w-6"/>
                            </button>
                        )}
                        
                        {/* SCROLLABLE GRID */}
                        {/* THUMBNAIL GALLERY */}
                        <div ref={thumbnailContainerRef} className="overflow-x-auto pb-3 scroll-smooth">
                            <div
                                className="
                                    grid
                                    grid-rows-2
                                    gap-2
                                    auto-cols-[130px]
                                    grid-flow-col
                                    sm:auto-cols-[12.5rem]
                                    md:auto-cols-[15.625rem]
                                    lg:auto-cols-[18.75rem]
                                    pr-10
                                    mb-4
                                "
                                style={{
                                    width: "max-content",            // required for iOS
                                }}
                            >
                                {images.map((obj, idx) => (
                                    <div
                                        key={obj.id}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`cursor-pointer border rounded overflow-hidden w-full h-[130px] sm:h-[12.5rem] ${
                                            idx === currentImageIndex ? "border-blue-600" : "border-gray-300"
                                        }`}
                                    >
                                        <Image
                                            src={obj.image}
                                            alt={name}
                                            width={200}
                                            height={150}
                                            className="object-cover w-full h-full"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SendWhatsapp/>
                    </div>
                </section>
            </div>
            <div id='get-quote'
                 className="mt-10 text-blue-900 max-w-screen-md mx-auto border-2 border-black p-4 rounded bg-orange-50 shadow-xl">
                {status !== "success" && (
                    <Quote car={resolvedCar} />
                )}
            </div>
        </section>
        <SimilarCarsSection />
        </>
    );
};

export default StockDetail;