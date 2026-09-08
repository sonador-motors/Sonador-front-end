'use client'

// YesNoToggle.jsx (or .tsx)
import React from 'react';
import RadioButton from '@/ui/radio-button';
import {useCif} from "@/context/cif-context"; // Import your base component

interface YesNoRadioBtnProps {
    groupName: string
    question: string
    value: boolean
    onChange: (value: boolean) => void
}

const YesNoRadioBtn = ({
    groupName,
    question,
    value,
    onChange
}: YesNoRadioBtnProps) => {
    const {setIncludeInspection} = useCif()
    
    return (
        // Wrapper for inline alignment
        <div className="grid grid-cols-2 w-full">
            
            {/* Question Label */}
            <label className="font-semibold text-red-950">
                {question}
            </label>
            
            {/* Radio Button Group Container */}
            <div className="inline-flex items-center gap-2">
                
                {/* --- YES Option --- */}
                <RadioButton
                    name={groupName}
                    value='Yes'
                    label="Yes" // Explicitly setting the label
                    checked={value}
                    onChange={() => setIncludeInspection(true)}
                />

                {/* --- NO Option --- */}
                <RadioButton
                    name={groupName}
                    value="No"
                    label="No" // Explicitly setting the label
                    checked={!value}
                    onChange={() => setIncludeInspection(false)}
                />
            </div>
        </div>
    );
};

export default YesNoRadioBtn;