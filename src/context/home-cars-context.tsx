'use client'

import React, {ReactNode, useState} from 'react'
import {CarBase} from "@/lib/car-context";

interface HomeCarsContext {
    featuredCars: CarBase[];
    newArrivals: CarBase[];
    availableBrands: string[]
}

interface HomeCarsProviderProps {
  children: ReactNode
  initialFeatured: CarBase[]
  initialArrivals: CarBase[]
  initialBrands: string[]
}

const HomeCarsContext = React.createContext<HomeCarsContext | null>(null)

export const HomeCarsProvider = async ({children, initialArrivals, initialFeatured, initialBrands}: HomeCarsProviderProps) => {
    const [featuredCars] = useState<CarBase[]>(initialFeatured);
    const [newArrivals] = useState<CarBase[]>(initialArrivals);
    const [availableBrands] = useState<string[]>(initialBrands);
    // const [loading, setLoading] = useState(true);
    // const [selectedHomeStockCar, setSelectedHomeStockCar] = useState<CarType | null>(null);
    
    // const setHomeStockCar: HomeCarsContext['setHomeStockCar'] = React.useCallback((car) => setSelectedHomeStockCar(car), []);
    
    return (
        <HomeCarsContext.Provider value={{featuredCars, newArrivals, availableBrands}}>
            {children}
        </HomeCarsContext.Provider>
    )
}

export const useHomeCarsOptional = () => {
    return React.useContext(HomeCarsContext)
}