import {CarBase, CarProvider} from "@/lib/car-context";
import React from "react";
import {getStockData} from "@/lib/utils";

export default async function StockLayout({ children }: { children: React.ReactNode }) {
    const {success, data} = await getStockData();
    const allStockCars: CarBase[] = success ? data : [];
    // const featuredCarsData = allStockCars.filter((car: CarBase) => car.category === 'Featured');
    // // const newArrivalsRes = await getNewArrivals()
    // const newArrivals = allStockCars
    //     .sort((a, b) => b.id - a.id)
    //     .slice(0, 12)
  return (
    <CarProvider
        initialAllStockCars={allStockCars}
        // initialFeaturedCars={featuredCarsData}
        // newArrivals={newArrivals}
    >
        {children}
    </CarProvider>
  );
}
