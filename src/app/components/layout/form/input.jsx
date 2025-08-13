"use client";

import {useState} from "react";

const BasicInput = ({ type, placeholder, value, onChange, disabled, label, name, required = true }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordReveal = () => {
        setShowPassword(prev => !prev);
    };

    return(
        <div className="flex flex-col h-max w-full items-start justify-start relative gap-1.5">
            {label && (
                <label className="min-w-fit self-start" htmlFor={name}>
                    {label}{required && " *"}
                </label>
            )}
            <div className="relative w-full">
                <input
                    className="border border-gray-300 rounded-md p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                    id={name}
                    type={type === 'password' && showPassword ? 'text' : type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                />
                {type === 'password' && (
                    <div
                        onClick={handlePasswordReveal}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer select-none"
                    >
                        {showPassword ? "opened" : "closed"}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BasicInput;