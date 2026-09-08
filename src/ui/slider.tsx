"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {ChevronLeft, ChevronRight} from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Sonador Motors Co.,Ltd",
        description: "Try Our Selection Today About Quality Japanese Vehicles. You Will Testify.",
        img: "/cars-hero.jpg",
        url: "/stock",
        bg: "md:bg-gradient-to-r bg-gradient-to-b from-sky-300 md:via-gray-950 via-gray-900 to-blue-950",
        descClass: "text-white",
        featuredClass: "border text-sky-50",
        titleClass: "text-white",
        buttonClass: "bg-amber-400 hover:bg-amber-600 text-amber-950 font-bold",
    },
    // {
    //       id: 7,
    //       title: "Happy New Year 2026 🎆",
    //       description:
    //         "We remain committed to delivering high-quality Japanese vehicles and reliable service throughout the year ahead. Wishing you a prosperous and successful New Year.",
    //       img: "/new-years-banner.jpeg",
    //       url: "/stock",
    //       bg: "bg-gradient-to-b md:bg-gradient-to-l from-black md:via-gray-800 to-orange-800",
    //       descClass: "text-white/90 text-base",
    //       titleClass: "text-white tracking-wide",
    //       featuredClass: "hidden",
    //       buttonClass: "hidden",
    //     },
    // {
    //     id: 6,
    //     title: "Merry Christmas   🎄",
    //     description: "Thank You Our Customers who have supported us throughout the year 2025. We Promise to Provide you with even more reliable high quality japanese vehicles in 2026.",
    //     img: "/christmas-banner.jpeg",
    //     url: "/stock",
    //     bg: "bg-gradient-to-b md:bg-gradient-to-r from-sky-200 via-gray-900 to-blue-950",
    //     descClass: "text-white",
    //     featuredClass: "hidden",
    //     titleClass: "text-white",
    //     buttonClass: "hidden",
    // },
    {
        id: 5,
        title: "Connecting Car Dealers to Japan",
        description: "Reliable access to Japan’s trusted car market, with seamless sourcing and guided support.",
        img: "/triton-bridge.jpeg", // or any image you prefer
        url: "/stock",
        bg: "bg-gradient-to-b md:bg-gradient-to-r from-indigo-600/90 via-black to-teal-500/70",
        descClass: "text-indigo-50",
        featuredClass: "border text-indigo-100",
        titleClass: "text-indigo-100 text-2xl",
        buttonClass: "border hover:bg-teal-100 hover:text-teal-800 text-teal-100",
    },
    {
        id: 4,
        title: "Seamless 🌍 Global Shipping. Guaranteed.",
        description: "Effortless logistics across 100+ countries. Transparent rates.",
        img: "/vessel.png",
        url: "/stock",
        bg: "bg-gradient-to-b md:bg-gradient-to-r from-fuchsia-500/90 via-black to-sky-600/70",
        descClass: "text-purple-50",
        featuredClass: "bg-purple-100",
        titleClass: "text-purple-50",
        buttonClass: "border hover:bg-sky-100 hover:text-sky-700 text-sky-100",
    },
    {
        id: 2,
        title: "Find Your Perfect ✨ SUV",
        description: "Curated SUVs built for safety, comfort, and style.",
        img: "/suv.jpg",
        url: "/stock",
        bg: "bg-gradient-to-b md:bg-gradient-to-r from-orange-500/90 via-black to-purple-200/70",
        descClass: "text-orange-50",
        featuredClass: "border text-orange-100",
        titleClass: "text-orange-100",
        buttonClass: "bg-green-100 hover:bg-green-200 text-green-900",
    },
    {
        id: 3,
        title: "Conquer Every ⛰️Terrain",
        description: "High-performance off-roaders. Start your epic journey here.",
        img: "/offloader.jpg",
        url: "/stock",
        bg: "bg-gradient-to-b md:bg-gradient-to-r from-emerald-500/90 via-black to-green-800/70",
        descClass: "text-green-100",
        featuredClass: "bg-yellow-100",
        titleClass: "text-green-100",
        buttonClass: "border hover:bg-yellow-100 hover:text-yellow-900 text-yellow-100",
    },
];

// Clone technique for fully infinite loop
const extendedSlides = [
    slides[slides.length - 1], // clone last
    ...slides,                 // original slides
    slides[0],                 // clone first
];

const Slider = () => {
    const [current, setCurrent] = useState(1); // start on first real slide
    const [transition, setTransition] = useState(true);
    
    const goToPrev = () => setCurrent((prev) => prev - 1);
    const goToNext = () => setCurrent((prev) => prev + 1);
    
    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);
    
    // Handle infinite looping through clones
    useEffect(() => {
        if (current === extendedSlides.length - 1) {
            // Reached clone of first slide → jump to real first
            setTimeout(() => {
                setTransition(false);
                setCurrent(1);
            }, 1000);
        }
        
        if (current === 0) {
            // Reached clone of last slide → jump to real last
            setTimeout(() => {
                setTransition(false);
                setCurrent(slides.length);
            }, 1000);
        }
        
        const timer = setTimeout(() => setTransition(true), 50);
        return () => clearTimeout(timer);
    }, [current]);
    
    return (
        <div className="h-[89vh] md:h-[70vh] overflow-hidden relative">
            
            {/* Slider track */}
            <div
                className="w-max h-full flex"
                style={{
                    transform: `translateX(-${current * 100}vw)`,
                    transition: transition ? "transform 1s ease-in-out" : "none",
                }}
            >
                {extendedSlides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`${slide.bg} w-screen h-full flex flex-col md:flex-row`}
                    >
                        {/* Left content */}
                        <div className="h-1/2 md:w-1/2 md:h-full">
                            <section
                                className="h-full mr-auto flex flex-col justify-center items-center gap-y-8 px-6 py-4 text-center">
                <span
                    className={`text-sm uppercase tracking-wider font-bold px-4 py-1 rounded-full ${slide.featuredClass}`}
                >Featured</span>
                                
                                <h2
                                    className={`text-lg lg:text-3xl uppercase font-bold ${slide.descClass}`}
                                >
                                    {slide.description}
                                </h2>
                                
                                <h1
                                    className={`text-3xl md:text-4xl tracking-widest lg:text-5xl uppercase font-extrabold font-serif ${slide.titleClass}`}
                                >
                                    {slide.title}
                                </h1>
                                
                                <Link href="/stock">
                                    <button
                                        className={`rounded-full py-3 px-8 font-bold transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300 ${slide.buttonClass}`}
                                    >
                                        SHOP NOW
                                    </button>
                                </Link>
                            </section>
                        </div>
                        
                        {/* Right image */}
                        <div className="relative h-1/2 md:w-1/2 md:h-full">
                            <Image
                                src={slide.img}
                                alt={slide.description}
                                fill
                                sizes="100%"
                                className="object-cover w-full h-full"
                                priority
                            />
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Prev */}
            <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full border border-gray-400 transition-all duration-300 hover:scale-110 active:scale-95"
            >
                <ChevronLeft className="w-6 h-6 text-sky-900"/>
            </button>
            
            {/* Next */}
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full border border-gray-400 transition-all duration-300 hover:scale-110 active:scale-95"
            >
                <ChevronRight className="w-6 h-6 text-sky-900"/>
            </button>
            
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-100/30">
                <div
                    className="h-full bg-sky-500 transition-all duration-300"
                    style={{
                        width: `${((current - 1) / slides.length) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
};

export default Slider;
