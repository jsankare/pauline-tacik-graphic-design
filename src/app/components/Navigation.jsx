"use client";

import TransitionLink from "../components/TransitionLink";
import Image from "next/image";
import Logo from "../../../public/logo-inline.png";
import { usePathname } from "next/navigation";

const ActiveDot = ({ isActive, isMobile, menuOpen }) => {
    const baseClasses = "absolute h-4 w-4 bg-secondary rounded-3xl transition-all duration-300 left-17 top-4";
    const mobileClasses = isMobile && menuOpen ? "absolute left-10 bottom-[-10px]" : "";
    
    return (
        <div className={`${baseClasses} ${mobileClasses} ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
    )
}

const Navigation = ({ onLinkClick, isMobile = false, menuOpen = false }) => {
    const pathname = usePathname();
    
    const navItems = [
        { href: "/", label: "Projets" },
        { href: "/workshops", label: "Ateliers" },
        { href: "/about", label: "À propos" },
        { href: "/contact", label: "Contact" }
    ];

    return (
        <nav className="flex flex-col gap-6">
            <div className="flex justify-center items-center">
                <TransitionLink
                    href="/"
                    label={<Image src={Logo} alt="ceci est un logo" width={250} height={250} />}
                    onClick={onLinkClick}
                    centered={true}
                />
            </div>
            <div className="flex flex-col gap-3 items-center text-primary relative">
                {navItems.map((item, index) => (
                    <div key={item.href} className="relative">
                        <TransitionLink 
                            href={item.href} 
                            label={item.label} 
                            onClick={onLinkClick} 
                            primaryColor={true} 
                        />
                        <ActiveDot 
                            isActive={pathname === item.href} 
                            isMobile={isMobile}
                            menuOpen={menuOpen}
                        />
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
