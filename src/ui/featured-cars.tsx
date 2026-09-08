// 'use client'; // This component must be a Client Component

import React from 'react';
import Car from "@/ui/car";
import {CarBase} from "@/lib/car-context";
// import {CifProvider} from "@/context/cif-context";
// import Link from "next/link";
// import { ArrowForwardSharp } from "@mui/icons-material";

interface FeaturedCarsSectionProps {
    section?: 'featured' | 'new-arrivals';
    cars: CarBase[];
}

const FeaturedCarsSection = ({section, cars}: FeaturedCarsSectionProps) => {
    // const {featuredCars, similarCars, latestCars} = useCarContext();
    
    return (
        <>
            {section === 'featured' ? <section className='content-grid mt-8'>
                    <h2 className='uppercase text-center font-extrabold text-xl text-amber-800 border-y border-amber-800'>Featured Cars</h2>
                    <div className="relative col-[full]">
                        <div
                            className={`flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-6 scrollbar-hide`}>
                            {cars.length > 0 ? cars.map((car) => (
                                <div
                                    key={car.id}
                                    className="snap-start shrink-0 w-[15rem]"
                                >
                                    <Car car={car}/>
                                </div>
                            )) : <p>No Featured Cars Currently</p>}
                        </div>
                    </div>
                </section>
                // : section === 'similar'
                //     ? <section className='px-4 space-y-8 mt-20'>
                //     <h2 className='uppercase text-center font-extrabold text-xl md:text-2xl text-amber-800 underline '>Similar or Related Vehicles</h2>
                //     <div className="mt-8">
                //         <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                //             {similarCars && similarCars.length > 0 ? similarCars.map((car) => (
                //                 <div
                //                     key={car.id}
                //                 >
                //                     <Car car={car}/>
                //                 </div>
                //             )) : <p>No Similar Cars Currently</p>}
                //         </section>
                //     </div>
                // </section>
                    : <section className='px-4 space-y-8 mb-10'>
                    <h2 className='uppercase text-center font-extrabold text-xl text-amber-900 border-y border-amber-900'>New Arrivals</h2>
                    <div className="mt-8">
                        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {cars && cars.length > 0 ? cars.map((car) => (
                                <div
                                    key={car.id}
                                >
                                    <Car car={car}/>
                                </div>
                            )) : <p>No New Arrivals Currently</p>}
                        </section>
                    </div>
                </section>
            }
            {/*<Link href='/stock' className='text-center underline underline-offset-2 capitalize'>View more deals <ArrowForwardSharp /></Link>*/}
        </>
    );
};

export default FeaturedCarsSection;