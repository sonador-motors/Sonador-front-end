import {points, postersSetOne} from "@/lib/data";
import React from "react";
import Link from "next/link";
import {ArrowForwardSharp} from "@mui/icons-material";
import Image from "next/image";
import Slider from "@/ui/slider";
import classNames from "classnames";
import FeaturedCarsSection from "@/ui/featured-cars"; // New Client Component
import BrowseByBrand from "@/ui/browse-by-brand";
import Posters from "@/ui/posters";
// import {HomeCarsProvider} from "@/context/home-cars-context";
import { getNewArrivals, getFeatured, getBrands } from "@/lib/utils";

// It's a good practice to fetch data outside the component if it's not dynamic
// or if it's re-used across multiple routes, or use caching in getStockData.
// For demonstration, we'll keep it inside Home for simplicity, but acknowledge it's a Server Component.

export default async function Home() {
    const featured = await getFeatured();
    const newArrivals = await getNewArrivals();
    const brands = await getBrands();
    
    return (
        // <HomeCarsProvider>
            <main className='flex-1'>
                <Slider/>
                {/* Pass featured cars to a new Client Component */}
                <section className="relative">
                    {/* Left decorative image */}
                    <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2">
                        <a href='https://g.co/kgs/ZKTTY1' target='_blank' className='animate-techFloatLeft'>
                            <Image
                                src="/google-qr.png"
                                alt="Decor Left"
                                width={300}
                                height={300}
                                className="pointer-events-none select-none animate-techPulse"
                            />
                        </a>
                    </div>
                    
                    {/* Right decorative image */}
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
                        <a href='https://g.co/kgs/ZKTTY1' target='_blank' className='animate-techFloatRight'>
                            <Image
                                src="/google-qr.png"
                                alt="Decor Right"
                                width={300}
                                height={300}
                                className="pointer-events-none select-none animate-techPulse"
                            />
                        </a>
                    </div>
                    <FeaturedCarsSection cars={featured.data} section='featured' />
                    <div className='lg:hidden'>
                        <FeaturedCarsSection section='new-arrivals' cars={newArrivals.data}/>
                    </div>
                    <Posters posters={postersSetOne}/>
                </section>
                <div className='hidden lg:block'>
                    <FeaturedCarsSection section='new-arrivals' cars={newArrivals.data}/>
                </div>
                <section className='content-grid full bg-gradient-to-r from-sky-950 via-sky-900 to-sky-600'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-6 py-10">
                        {/* Card 3 - Japanese Car Auctions */}
                        <Link
                            href="/account/profile"
                            className="flex flex-col items-center justify-between text-center border-4 border-sky-300 rounded p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full max-w-sm h-full gap-2"
                        >
                            <Image
                                src="/hammer.png"
                                alt="auction Hammer"
                                width={100}
                                height={100}
                                className=" mb-3"
                                unoptimized
                            />
                            <p className="font-semibold uppercase text-sky-50 mb-2">
                                Get Username & Password For Auction Access <br/>
                            </p>
                            <span className="text-sky-50">
                          This gives you the opportunity to access all cars being sold on a daily allover Japan in real-time.
                        </span>
                            <span className="text-sky-300 text-sm uppercase font-medium mt-auto">
                            Click to explore →
                        </span>
                        </Link>
                        
                        {/* Card 3 - Japanese Car Auctions */}
                        <Link
                            href="https://www.iauc.co.jp/service/login"
                            className="flex flex-col items-center gap-2 justify-between text-center border-4 border-sky-300 rounded p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full max-w-sm h-full"
                        >
                            <Image
                                src="/japan-flag.png"
                                alt="Globe Icon"
                                width={100}
                                height={100}
                                className=" mb-3"
                                unoptimized
                            />
                            <p className="font-semibold uppercase text-sky-50 mb-2">
                                Access All Japanese Car Auctions <br/>
                            </p>
                            <span className="text-sky-50">
                          Get full access to Japanese car auctions and see real-time listings.
                        </span>
                            <span className="text-sky-300 uppercase text-sm font-medium mt-auto">
                            Click to explore →
                        </span>
                        </Link>
                        
                        {/* Card 2 - Japanese Car Trade Listing */}
                        <Link
                            href="https://www.japanesecartrade.com/sonadormotors/about-us.html"
                            className="flex flex-col items-center text-center border-4 border-sky-300  rounded-md p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full max-w-sm h-full justify-between"
                        >
                            <Image
                                src="/jct.png"
                                alt="Japanese Car Trade"
                                width={100}
                                height={100}
                                className="rounded-full border-4 border-sky-500 mb-3"
                                unoptimized
                            />
                            <p className="font-semibold uppercase text-sky-50 mb-2">
                                Our Japanese Car Trade Listing
                            </p>
                            <span className="text-sky-50">
                          Explore verified car listings from trusted Japanese exporters.
                        </span>
                            <span className="text-sky-300 uppercase text-sm font-medium mt-auto">
                            Click to explore →
                        </span>
                        </Link>
                        
                        {/* Card 1 - View All Stock */}
                        <Link
                            href="/stock"
                            className="flex flex-col items-center gap-2 text-center border-4 border-sky-300 rounded p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300  w-full max-w-sm h-full justify-between"
                        >
                            <Image
                                src="/globe.png"
                                alt="Search Eye Icon"
                                width={100}
                                height={100}
                                className="rounded-full border-4 border-sky-500 p-4 mb-3"
                                unoptimized
                            />
                            <p className="font-semibold text-lg uppercase text-sky-50 mb-2">
                                View Available Stock
                            </p>
                            <span className="text-sky-50">
                          Browse our full range of available cars directly from Japan.
                        </span>
                            <span className="text-sky-300 uppercase text-sm font-medium mt-auto">
                            Click to explore →
                        </span>
                        </Link>
                    </div>
                    {/*<Link href='/account/profile' className='px-4 py-2 font-bold bg-sky-700 text-blue-100 text-center rounded mb-10'>GET USERNAME & PASSWORD FOR AUCTION ACCESS</Link>*/}
                </section>
                <BrowseByBrand brands={brands.data}/>
                <section className="relative overflow-hidden text-sky-100">
                    
                    {/* FLASH BANNER */}
                    <Link
                        href="/stock"
                        className="bg-[#22e0b6] block text-[#06363b] py-2 font-bold uppercase text-sm tracking-widest overflow-hidden">
                        <div className="flex whitespace-nowrap animate-marquee">
                            {Array.from({length: 20}).map((_, i) => (
                                <span key={i} className="mx-6 flex items-center gap-2">
          ⚡ New Arrivals
        </span>
                            ))}
                        </div>
                    </Link>
                    
                    {/* MAIN CONTENT */}
                    <div
                        className="relative content-grid py-10 bg-gradient-to-br from-[#0b3a40] via-[#0a4f55] to-[#06363b]"
                    >
                        <div
                            className=" pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px]"
                        />
                        <div className="pb-4">
                            <h2 className='h2 text-white'>Why Get Access To Japanese Auctions With Us.</h2>
                            <p>Auction is the most convenient source to buy a car from Japan. Tens of thousands of cars
                                are selling on more than 100 auctions all over Japan. The benefits of buying from
                                auctions are the price, most of auctions provide Live Auction enabling us to monitor the
                                current bid on LIVE and buy for the best price possible. The auction system also
                                provides three months auction history where we can find a market price for any model.
                                The auctions offer massive choice, there is up to 40000cars selling everyday and there
                                is no limit to the number of cars you can bid to purchase just one car. They also
                                provide auction sheets wherein we can check car descriptions and condition reports. All
                                auctions allot quality grade to each car on the scale of 0 to S with S being the highest
                                quality. More about grading <Link href='/auction-sheet'
                                                                  className='text-amber-300 underline'>HERE</Link>.
                                There are also cars selling (as is conditions) that are usually with damages. And
                                finally, every bid ends in 20-30 seconds on average so you will not need to wait weeks
                                for auctions to end.
                            </p>
                        </div>
                    </div>
                </section>
                
                <section className='content-grid bg-orange-100 text-orange-900 py-10'>
                    <div className='flex gap-4 md:gap-14 flex-col md:flex-row lg:gap-40'>
                        <Image
                            // src='/spring-hd.webp'
                            src='/homepage-lambo.png'
                            alt='A man getting out of a car'
                            width={400}
                            height={250}
                            className='rounded lg:w-5/12 lg:object-cover lg:max-h-[23rem]'
                        />
                        <article className='flex flex-col gap-4 justify-around lg:w-1/3'>
                            <h2 className='text-lg capitalize font-bold self-end md:text-xl lg:text-2xl'>We have the
                                expertise to get you a car deal worth your money</h2>
                            <p>Join the thousands who secure the best car deals with Sonador Motors. It is free
                                consultation
                                and within 24hrs we will give you the best options that fit in your budget.</p>
                            <Link href='/stock'
                                  className='border py-3 px-8 text-center text-orange-100 bg-orange-900 rounded-full  self-start'>Explore
                                Our Stock <ArrowForwardSharp/></Link>
                        </article>
                    </div>
                </section>
                <section className='content-grid'>
                    <div className={'full bg-gradient-to-b pb-8 from-[#fafafa] to-[#f2f2f2]'}>
                        <h2 className="h2 bg-gradient-to-r from-[#111111] to-[#e66b02] bg-clip-text text-transparent">WHY
                            CHOOSE US</h2>
                        <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {points.map((point) => {
                                return (<li
                                        key={point.text}
                                        className={classNames(
                                            "grid p-4 h-auto rounded-lg shadow-xl w-full justify-between border",
                                            point.id === 1
                                                // "bg-purple-100 border-purple-800 text-purple-900"
                                                ? "bg-gradient-to-r  from-black to-gray-600 text-white"
                                                : point.id === 2
                                                    // bg-blue-100 border-blue-900 text-blue-900"
                                                    ? "bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white"
                                                    : point.id === 3
                                                        // bg-green-100 border-green-800 text-green-800
                                                        ? 'bg-gradient-to-r  from-black to-gray-600 text-white'
                                                        : point.id === 4
                                                            // bg-amber-200 border-amber-800 text-amber-800
                                                            ? 'bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white'
                                                            : point.id === 5
                                                                // bg-yellow-100 border-yellow-800 text-yellow-800
                                                                ? 'bg-gradient-to-r  from-black to-gray-600 text-white' :
                                                                'bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white'
                                        )}>
                                        <h3 className='uppercase text-lg font-extrabold flex gap-2 items-center'><span
                                            className=' w-8 h-8 flex items-center justify-center p-1 border rounded-full'>{point.id}</span> {point.text}
                                        </h3>
                                        <p className=''>{point.desc}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </section>
            </main>
        // </HomeCarsProvider>
    )
}