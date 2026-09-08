'use client';

import React from "react";
import Car from "@/ui/car";
import { CarBase, useCarContext } from "@/lib/car-context";

interface SimilarCarsSectionProps {
  cars: CarBase[];
}

const SimilarCarsSection = () => {
    const {similarCars} = useCarContext();
  return (
    <section className='px-4 space-y-8 mt-20'>
        <h2 className='uppercase text-center font-extrabold text-xl md:text-2xl text-amber-800 underline '>Similar or Related Vehicles</h2>
        <div className="mt-8">
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {similarCars && similarCars.length > 0 ? similarCars.map((car) => (
                    <div
                        key={car.id}
                    >
                        <Car car={car}/>
                    </div>
                )) : <p>No Similar Cars Currently</p>}
            </section>
        </div>
    </section>
  );
};

export default SimilarCarsSection;
