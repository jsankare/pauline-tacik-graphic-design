"use client";

import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";

const TransitionLink = ({ href, label, onClick }) => {
    const router = useRouter()
    const pathname = usePathname();

    const handleClick = () => {
        if(pathname !== href) {
            animatePageOut(href, router)
        }
        if (onClick) onClick();
    }

    return (
        <button className="text-xl text-neutral-900 hover:text-neutral-700 hover:cursor-pointer" onClick={handleClick} >{label}</button>
    )
}

export default TransitionLink;