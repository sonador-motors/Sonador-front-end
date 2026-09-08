'use client'

import React from 'react'
import RadioButton from "@/ui/radio-button";
import YesNoRadioBtn from "@/ui/yes-no-radio-btn";
import { useCif } from "@/context/cif-context";

const CifSelector = ({ isShowCif }: { isShowCif?: boolean }) => {
    const {
        countries,
        selectedCountry,
        selectedPort,
        selectCountry,
        selectPort,
        setShippingMode,
        shippingMode,
        includeInspection,
        setIncludeInspection,
        setShowCif,
        showCif,
    } = useCif()

    return (
        <section className="relative rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-black to-gray-600 px-5 py-4 text-white">
                <h3 className="text-lg md:text-xl font-extrabold tracking-wide uppercase">
                    Shipping Cost Calculator (CIF)
                </h3>
                <p className="text-xs mt-1">
                    Estimate landing cost before checkout
                </p>
            </div>

            {/* Body */}
            <div className="p-5 space-y-6">

                {/* Country */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-700">
                        Final Destination Country
                    </label>
                    <select
                        className="w-full h-12 rounded-xl border border-gray-300 bg-gray-50 px-4 font-semibold text-gray-900
                                   focus:border-red-600 uppercase focus:ring-2 focus:ring-red-500"
                        value={selectedCountry?.id || ''}
                        onChange={e => selectCountry(Number(e.target.value))}
                    >
                        <option value="">
                            Select Country
                        </option>
                        {[...countries]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(country => (
                                <option value={country.id} key={country.id}>
                                    {country.name.toUpperCase()}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Port */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-700">
                        Arrival Port
                    </label>
                    <select
                        value={selectedPort?.id || ''}
                        className="w-full h-12 rounded-xl border border-gray-300 bg-gray-50 px-4 font-semibold text-gray-900
                                   disabled:opacity-50 focus:border-red-600 focus:ring-2 focus:ring-red-500"
                        onChange={e => selectPort(Number(e.target.value))}
                        disabled={!selectedCountry}
                    >
                        <option value="">
                            Select Port
                        </option>
                        {selectedCountry?.ports.map(port => (
                            <option value={port.id}  key={port.id}>
                                {port.port_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Shipping Method */}
                <div className="space-y-3">
                    <p className="text-xs font-bold uppercase text-gray-700">
                        Shipping Method
                    </p>
                    <div className="flex flex-wrap gap-8">
                        {['roro', 'container'].map(mode => (
                            <RadioButton
                                key={mode}
                                name="shipping_method"
                                value={mode}
                                checked={shippingMode === mode}
                                onChange={(e) =>
                                    setShippingMode(e.target.value as any)
                                }
                                label={mode.toUpperCase().replace('_', ' ')}
                            />
                        ))}
                    </div>
                </div>

                {/* Inspection */}
                <div className="pt-4 border-t border-gray-200">
                    <YesNoRadioBtn
                        groupName="inspection"
                        question="Include Inspection"
                        value={includeInspection}
                        onChange={setIncludeInspection}
                    />
                </div>

                {/* Actions */}
                {!isShowCif && (
                    <div className="pt-4">
                        {showCif ? (
                            <button
                                className="w-full h-12 rounded-xl font-bold text-green-800 bg-green-100 border border-green-500 hover:bg-green-200 transition"
                                onClick={() => {
                                    selectCountry(0)
                                    selectPort(0)
                                    setShippingMode('roro')
                                    setShowCif(false)
                                    setIncludeInspection(true)
                                }}
                            >
                                Reset Calculator
                            </button>
                        ) : (
                            <button
                                className="w-full h-12 rounded-xl font-bold text-white bg-green-700
                                           hover:bg-green-800 transition
                                           disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                                onClick={() => setShowCif(true)}
                                disabled={!selectedCountry || !selectedPort}
                            >
                                Add Shipping Costs
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default CifSelector
