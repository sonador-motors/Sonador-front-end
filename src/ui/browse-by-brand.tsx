'use client'

import {localBrands} from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import React from "react";
// import {CarBase, CarType, useCarContext} from "@/lib/car-context";

const BrowseByBrand = ({ brands }: {brands: String[]}) => {
    // const { allStockCars } = useCarContext() as { allStockCars: CarBase[] }
    
    // const getMake = (car: CarBase) => car?.car_name?.make?.car_make ?? ''
    
    // Get available brands
    // const availableBrands = React.useMemo(
	// 	() => [...new Set(allStockCars.map((c) => getMake(c)))].filter(Boolean).sort(),
	// 	[allStockCars]
	// )
    
    // Filter brands based on the images to make sure that displayed brands are the ones available
    const filteredBrands = localBrands.filter((brand) => brands.includes(brand.name))
    
    // console.log(filteredBrands)
    // flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-6 scrollbar-hide
    
    return (
        <section className='content-grid bg-white py-8 full'>
            <h2 className='uppercase text-center font-bold text-2xl pb-8'>Search By Brand</h2>
            <div className='grid breakout grid-cols-3 md:grid-cols-5 lg:grid-cols-7'>
            {filteredBrands.map((brand, idx) => (
              <div key={idx} className=''>
                 {/* snap-start shrink-0 w-[15rem]*/}
                 <Link
                    href={`/stock?brand=${encodeURIComponent(brand.name)}`}
                    className='flex flex-col justify-center text-center p-2 h-full border'
                 >
                    <Image
                       src={brand.image}
                       alt={brand.name}
                       width={150}
                       height={150}
                       className='w-full h-full object-contain'
                    />
                    <p className='font-bold'>{brand.name}</p>
                 </Link>
              </div>
            ))}
            </div>
        </section>
    )
}

export default BrowseByBrand