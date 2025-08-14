"use client";

import TransitionLink from "../components/TransitionLink";
import Image from "next/image";
import Logo from "../../../public/ptacik-logo.png";

const Navigation = ({ onLinkClick }) => {
    return (
        <nav className="flex flex-col gap-6">
            <TransitionLink
                href="/"
                label={<Image src={Logo} alt="ceci est un logo" width={150} height={150} />}
                onClick={onLinkClick}
                centered={true}
            />
            <div className="flex flex-col gap-3 items-start">
                <TransitionLink href="/" label="Projets" onClick={onLinkClick} />
                <TransitionLink href="/workshops" label="Ateliers" onClick={onLinkClick} />
                <TransitionLink href="/about" label="À propos" onClick={onLinkClick} />
                <TransitionLink href="/contact" label="Contact" onClick={onLinkClick} />
                <TransitionLink href="/admin" label="Admin (temp)" onClick={onLinkClick} />
                <TransitionLink href="/login" label="Login (temp)" onClick={onLinkClick} />
            </div>
        </nav>
    );
};

export default Navigation;
