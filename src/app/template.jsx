"use client";

import {useEffect} from "react";
import {animatePageIn} from "../utils/animations";
import DotsImage from "../../public/tampons-pois-angle.png"
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Template({ children }) {

    const pathname = usePathname();

    // useEffect(() => {
    //     animatePageIn()
    // }, []);

    const AllowDots = !pathname.startsWith("/admin");

    return (
        <div className="h-full">
            {/*<div id={"banner-1"} className="min-h-screen border-1 border-secondary bg-white z-100 fixed top-0 left-0 w-1/4" />*/}
            {/*<div id={"banner-2"} className="min-h-screen border-1 border-secondary bg-white z-100 fixed top-0 left-1/4 w-1/4" />*/}
            {/*<div id={"banner-3"} className="min-h-screen border-1 border-secondary bg-white z-100 fixed top-0 left-2/4 w-1/4" />*/}
            {/*<div id={"banner-4"} className="min-h-screen border-1 border-secondary bg-white z-100 fixed top-0 left-3/4 w-1/4" />*/}
            {AllowDots && <Image src={DotsImage} alt={"Dots image decoration"} width={175} height={175} className="absolute top-0 right-0 md:top-0 md:right-0 top-33 right-0" />}
            {children}
        </div>
    )
}