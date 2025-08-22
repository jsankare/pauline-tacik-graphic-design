"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import TransitionLink from "../components/TransitionLink";
import Image from "next/image";
import Logo from "../../../public/ptacik-logo.png";

export default function MobileNavigation({ onLinkClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header mobile */}
      <header className="md:hidden flex justify-between items-center p-4 border-b border-neutral-200">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-1 hover:cursor-pointer"
          aria-label="Ouvrir le menu"
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
        <TransitionLink
          href="/"
          label={
            <Image
              src={Logo}
              alt="ceci est un logo"
              width={150}
              height={150}
            />
          }
          onClick={onLinkClick}
        />
      </header>

      {/* Menu mobile overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative bg-white w-64 h-full p-5 shadow-lg">
          <button
            onClick={() => setMenuOpen(false)}
            className="mb-4 text-sm hover:cursor-pointer"
          >
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-6 h-0.5 bg-black"></span>
          </button>
          <Navigation 
            onLinkClick={() => setMenuOpen(false)} 
            isMobile={true}
            menuOpen={menuOpen}
          />
        </div>
      </div>
    </>
  );
}
