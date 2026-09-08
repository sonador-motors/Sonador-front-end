import React from 'react';

interface RadioButtonProps {
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const RadioButton = ({
    name,
    value,
    checked,
    onChange,
    label
}: RadioButtonProps) => {
    // 💡 Use a unique ID based on the radio group name and value
    const uniqueId = `${name}-${value}`;

    return (
        <div className="inline-flex items-center gap-1">
            
            {/* 1. Visually hidden input and custom visual */}
            <div className="relative flex items-center">
                <input
                    name={name}
                    type="radio"
                    value={value}
                    // 🚨 IMPORTANT: Use the unique ID here
                    id={uniqueId}
                    checked={checked}
                    onChange={onChange}
                    // Tailwind styles for custom radio appearance
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-black checked:border-red-700 transition-all"
                />
                <span
                    // The "checked" dot
                    className="absolute bg-red-700 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                </span>
            </div>
            
            {/* 2. Text Label associated with the input */}
            <label
                className="ml-2 text-red-900 font-bold cursor-pointer text-sm"
                // 🚨 IMPORTANT: Associate with the input's unique ID
                htmlFor={uniqueId}
            >
                {label ? label : value}
            </label>
        </div>
    );
};

export default RadioButton;