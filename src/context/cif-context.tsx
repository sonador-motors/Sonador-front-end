'use client'

import React, {createContext, useMemo, useState} from 'react'

export interface Port {
    id: number
    port_name: string
    freight_roro: string
    freight_container: string
    freight_share_container: string
    insurance_rate: string
    inspection_cost: string
    is_default: boolean
}

interface Country {
    id: number
    name: string
    // iso_code?: string | null
    currency?: string | null
    ports: Port[]
}

export type Mode = 'roro' | 'container' | 'share_container'

interface CifContextType {
    countries: Country[]
    selectedCountry: Country | null
    selectedPort: Port | null
    // fetchCountries: () => Promise<void>
    selectCountry: (countryId: number) => void
    selectPort: (portId: number) => void
    // calculateCIF: (fob: number, mode: Mode, size?: number) => number | null
    // countryFlag: (isoCode?: string | null) => string
    
    // includeInsurance: boolean
    includeInspection: boolean
    // setIncludeInsurance: (value: boolean) => void
    setIncludeInspection: (value: boolean) => void
    showCif: boolean
    setShowCif: (value: boolean) => void
    shippingMode: Mode
    setShippingMode: (mode: Mode) => void
}

// const defaultCountry = {
//     "id": 3,
//     "name": "Tanzania",
//     "currency": "TZS",
//     "ports": [
//         {
//             "id": 4,
//             "port_name": "Dar Es Salaam",
//             "port_country": "Tanzania",
//             "freight_roro": "97.00",
//             "freight_container": "0.00",
//             "freight_share_container": "0.00",
//             "insurance_rate": "0.00",
//             "inspection_cost": "174.00",
//             "is_default": true,
//             "enabled": true,
//             "port": 2,
//             "country": 3
//         }
//     ]
// }

const DEFAULT_COUNTRY_ID = 3

const CifContext = createContext<CifContextType | undefined>(undefined)

export const CifProvider: React.FC<{children: React.ReactNode, initialCountries: Country[]}> = ({ children, initialCountries }) => {
    const defaultCountry = initialCountries.find(c => c.id === DEFAULT_COUNTRY_ID) ?? initialCountries[2] ?? null
    
    const defaultPort = defaultCountry?.ports.find(p => p.is_default) ?? defaultCountry?.ports[0] ?? null
    
    const countries = initialCountries
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(defaultCountry)
    const [selectedPort, setSelectedPort] = useState<Port | null>(defaultPort)
    
    const [showCif, setShowCif] = useState(false)
    
    // const [includeInsurance, setIncludeInsurance] = useState(false)
    const [includeInspection, setIncludeInspection] = useState(true)
    const [shippingMode, setShippingMode] = useState<Mode>('roro')
    
    
    // React.useEffect(() => {
    //     if(defaultCountry && countries.length > 0) {
    //         const country = countries.find(c => c.name.toLowerCase() === defaultCountry.toLowerCase()) || null
    //         setSelectedCountry(country)
    //     }
    //     return
    // }, [countries, defaultCountry])
    
    const selectCountry = (countryId: number) => {
        const country = countries.find(c => c.id === countryId) || null
        setSelectedCountry(country)
        if( country && country.ports.length > 0 ) {
            const defaultPort = country.ports.find(p => p.is_default) || country.ports[0]
            setSelectedPort(defaultPort)
        } else {
            setSelectedPort(null)
        }
    }
    
    const selectPort = (portId: number) => {
        if (!selectedCountry) return
        const port = selectedCountry.ports.find(p => p.id === portId) || null
        setSelectedPort(port)
    }
    
    
    const value = useMemo(() => ({
        countries,
        selectedCountry,
        selectedPort,
        selectCountry,
        selectPort,
        // calculateCIF,
        
        // includeInsurance,
        includeInspection,
        // setIncludeInsurance,
        setIncludeInspection,
        showCif,
        setShowCif,
        
        shippingMode,
        setShippingMode,
    }), [countries, selectedCountry, selectedPort, includeInspection, shippingMode, showCif])
    
    return <CifContext.Provider value={value}>{children}</CifContext.Provider>
}

export const useCif = () => {
    const context = React.useContext(CifContext)
    if (!context) {
        throw new Error('useCif must be used within a CifProvider')
    }
    return context
}



