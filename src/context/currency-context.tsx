"use client";

import React, {createContext, useContext, useEffect, useState, useCallback} from "react";
import {getRates} from "@/lib/utils";

interface CurrencyContextType {
    currency: string;                   // current selected currency (USD, UGX, JPY...)
    setCurrency: (c: string) => void;   // update selected currency
    rates: Record<string, number>;      // conversion rates from USD
    convert: (usdValue: number) => number; // convert from USD → currency
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({children, rates}: { children: React.ReactNode, rates: Record<string, number> }) {
    const [currency, setCurrency] = useState("USD");  // default is USD
    
    // Convert USD price → selected currency
    const convert = useCallback(
        (usdValue: number) => {
            if (currency === "USD") return Number(usdValue.toFixed(2));
    
            const rate = rates[currency];
            if (!rate) return Number(usdValue.toFixed(2)); // fallback
    
            return Number((usdValue * rate).toFixed(2));
        },
        [currency, rates]
    )
    
    return (
        <CurrencyContext.Provider value={{currency, setCurrency, rates, convert}}>
            {children}
        </CurrencyContext.Provider>
    );
}

export const useCurrency = () => {
    const ctx = useContext(CurrencyContext);
    if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
    return ctx;
};
