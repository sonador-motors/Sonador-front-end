"use client";

import {useState, useRef, useEffect} from "react";
import {useCurrency} from "@/context/currency-context";

// Converts currency code to an emoji flag (USD → 🇺🇸)
function currencyToFlag(code: string) {
    if (code.length !== 3) return "🏳️";
    const country = code.slice(0, 2); // USD → US
    return country.toUpperCase().replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

export default function CurrencySelector() {
    const [open, setOpen] = useState(false);
    const {setCurrency, currency, rates} = useCurrency();
    
    const currencies = Object.keys(rates);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    
    return (
        <div className="relative" ref={dropdownRef}>
            {/* Button */}
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center bg-white text-sky-900 border border-sky-800 shadow-md rounded-base text-sm px-4 py-2 focus:outline-none"
            >
                <span className="mr-2">{currencyToFlag(currency)}</span>
                {currency}
                <svg
                    className="w-4 h-4 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 9-7 7-7-7"
                    />
                </svg>
            </button>
            
            {/* Dropdown */}
            <div
                className={`absolute right-0 mt-2 z-50 w-full bg-white border border-sky-800 rounded-base shadow-lg ${
                    open ? "block" : "hidden"
                }`}
            >
                <ul
                    className="
                        max-h-80
                        overflow-y-auto
                        scroll-smooth
                        py-2
                        text-sm
                        font-medium
                    "
                >
                    {currencies.map((code) => (
                        <li key={code}>
                            <button
                                className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-sky-100 hover:font-semibold"
                                onClick={() => {
                                    setCurrency(code);
                                    setOpen(false);
                                }}
                            >
                                <span>{currencyToFlag(code)}</span>
                                {code}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
