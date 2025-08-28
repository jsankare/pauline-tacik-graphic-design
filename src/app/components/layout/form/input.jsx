"use client";

import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "../../icons";

const BasicInput = ({ type, placeholder, value, onChange, disabled, label, name, required = true }) => {

    const [showPassword, setShowPassword] = useState(false);

    const eyeClosed = <EyeClosedIcon className="w-7.5 h-7.5 text-primary" />;
    const eyeOpen = <EyeIcon className="w-10 h-10 text-primary"  />;

    const handlePasswordReveal = () => {
        setShowPassword(prev => !prev);
    };

    return(
        <div className="flex flex-col h-max w-full items-start justify-start relative gap-2">
            {label && (
                <label className="min-w-fit self-start text-sm font-medium text-primary" htmlFor={name}>
                    {label}{required && " *"}
                </label>
            )}
            <div className="relative w-full">
                <input
                    className="border-none p-3 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-secondary/30"
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
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none"
                    >
                        {showPassword ? eyeOpen : eyeClosed}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BasicInput;