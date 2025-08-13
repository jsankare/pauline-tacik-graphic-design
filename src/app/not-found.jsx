"use client";

import { useEffect } from "react";
import TransitionLink from "./components/TransitionLink";

export default function NotFound() {
  useEffect(() => {
    // Add a class to hide Navigation and Footer while on the 404 page
    const root = document.documentElement;
    root.classList.add("hide-chrome");
    return () => {
      root.classList.remove("hide-chrome");
    };
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-6xl font-bold">
        404<span className=""> - Perdu ?</span>
      </h1>
      <p className="mt-4 text-lg ">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
        <TransitionLink className="mt-6 px-4 py-2  rounded transition-all duration-150 bg-primary text-white hover:scale-105 " href="/" label="Retourner à l'accueil" />
    </section>
  );
}
