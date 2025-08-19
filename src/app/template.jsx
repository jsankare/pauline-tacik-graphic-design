"use client";

import {useEffect} from "react";
import {animatePageIn} from "../utils/animations";
import Dots from "@/app/components/ui/dots";

export default function Template({ children }) {

    useEffect(() => {
        animatePageIn()
    }, []);

    return (
        <div>
            <div id={"banner-1"} className="min-h-screen border-1 border-black bg-white z-10 fixed top-0 left-0 w-1/4" />
            <div id={"banner-2"} className="min-h-screen border-1 border-black bg-white z-10 fixed top-0 left-1/4 w-1/4" />
            <div id={"banner-3"} className="min-h-screen border-1 border-black bg-white z-10 fixed top-0 left-2/4 w-1/4" />
            <div id={"banner-4"} className="min-h-screen border-1 border-black bg-white z-10 fixed top-0 left-3/4 w-1/4" />
            <Dots rows={4} dotSize={40} gap={16} />
            {children}
        </div>
    )
}