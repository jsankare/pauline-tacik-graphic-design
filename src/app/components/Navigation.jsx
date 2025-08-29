"use client";

import TransitionLink from "../components/TransitionLink";
import Image from "next/image";
import Logo from "../../../public/logo-inline.png";
import { usePathname } from "next/navigation";

const Navigation = ({ onLinkClick }) => {
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
            <div className="flex flex-col gap-3 mt-1 items-center text-primary relative">
                {navItems.map((item, index) => (
                    <div key={item.href} className="relative">
                        <TransitionLink 
                            href={item.href} 
                            label={item.label} 
                            onClick={onLinkClick} 
                            primaryColor={true}
                            className={`font-omnes-semicond hover:font-aracau transition-all duration-200 ${
                                pathname === item.href ? 'font-aracau' : ''
                            }`}
                        />
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
