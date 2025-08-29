"use client";

import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";

const TransitionLink = ({ href, label, onClick, centered = false, primaryColor = false, isLogo = false, className = "" }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageOut(href, router);
        }
        if (onClick) onClick();
    };

    const isActive = pathname === href && !isLogo;

    return (
        <button
            className={`
                min-w-fit text-xl hover:text-neutral-700 hover:cursor-pointer
                ${primaryColor ? "text-primary hover:text-secondary" : "text-neutral-900"} 
                ${centered ? "flex justify-center items-center" : ""}
                ${isActive ? "underline underline-offset-4 decoration-2" : ""}
                ${className}
            `}
            onClick={handleClick}
        >
            {label}
        </button>
    );
};

export default TransitionLink;
