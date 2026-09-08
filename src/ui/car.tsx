'use client'

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {CarType, CarBase} from "@/lib/car-context";
import {useCarContext} from "@/lib/car-context";
import {useCif} from "@/context/cif-context";
import { calculateCIF, canCalculateCIF } from "@/lib/cif";
import { useCurrency } from "@/context/currency-context";
import FavouriteHeart from "@/ui/favourite-heart";

const Car = ({car}: { car: CarBase }) => {
    // const {setStockCar} = useCarContext()
    const [total, setTotal] = React.useState(0)
    const { convert, currency } = useCurrency();
    const {
        shippingMode,
        showCif,
        includeInspection,
        selectedPort
    } = useCif();
    
    React.useEffect(() => {
        let cif = 0
        if (selectedPort) {
            cif = calculateCIF(car, selectedPort, shippingMode, includeInspection)
        }
        setTotal(cif)
    }, [selectedPort, shippingMode, includeInspection])
    
    const carPrice = convert(Number(car.fob_price))
    const cifPrice = convert(Number(total));
    
    return (
        <article
            // initial={{opacity: 0}}
            // animate={{scale: 1, opacity: 1}}
            // transition={{duration: 0.3}}
            className={`border-sky-600 border-opacity-50 rounded w-full flex flex-col h-full gap-4 group ease-in col-span-1 justify-between`}
        >
            <Link
                href={`/stock/${car.id}`}
                className='grid grid-rows-[auto_1fr_auto] h-full'
                // onClick={() => setStockCar(car)}
            >
                <div className="relative row-span-1 w-full overflow-hidden rounded-t aspect-[4/3] group">
                    {/*Favourite heart*/}
                    <FavouriteHeart vehicleId={car.id} />
                    <Image
                        src={
                            // car.images?.length && car.images[0]?.image
                            //     ? car.images[0].image
                               car?.image || "/car-placeholder.png"
                        }
                        alt={`${car.car_name.make.car_make} ${car.car_name.model} ${car.car_name.year.year}`}
                        fill
                        unoptimized
                        sizes='
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        33vw
                    '
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    {car.status === "S" && (
                        <span className="text-red-500 font-bold absolute left-0 bottom-0 bg-red-50 px-4 bg-opacity-80">
                      SOLD
                    </span>
                    )}
                </div>
                <p className="font-extrabold pt-2 line-clamp-2 min-h-[2.5rem] uppercase text-sm">
                    {car.car_name.make.car_make} {car.car_name.model} {car.car_name.year.year}
                </p>
                <div className="mt-auto">
                    <p className="grid gap-1 font-semibold">
                        Vehicle Price:
                        <span className="text-base md:text-lg text-green-800 font-extrabold"> {carPrice.toLocaleString()} {currency}</span>
                    </p>
                    {showCif && selectedPort && (
                        canCalculateCIF(car, selectedPort, shippingMode) ? (
                            <p className="font-semibold grid">
                                C&F Price:
                                <span className="md:text-lg text-amber-700 font-extrabold">{cifPrice?.toLocaleString()} {currency}</span>
                            </p>
                        ) : (
                            <p className="bg-amber-700 px-2 py-1 w-fit rounded text-amber-50 font-bold">
                                GET QUOTE NOW
                            </p>
                        )
                    )}
                </div>
            </Link>
        </article>
    );
};

export default Car;