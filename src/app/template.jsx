"use client";

import DotsImage from "../../public/banneer-dots.png"
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Template({ children }) {

    const pathname = usePathname();

    const AllowDots = !pathname.startsWith("/admin");

    return (
        <div className="h-full">
            {/*<div id={"banner-1"} className="min-h-screen border-1 border-secondary bg-white z-100 fixed top-0 left-0 w-1/4" />*/}
            {/*<div id={"banner-2"} className="min-h-screen border-1 border-secondary bg-white z-100 fixed top-0 left-1/4 w-1/4" />*/}
            {/*<div id={"banner-3"} className="min-h-screen border-1 border-secondary bg-white z-100 fixed top-0 left-2/4 w-1/4" />*/}
            {/*<div id={"banner-4"} className="min-h-screen border-1 border-secondary bg-white z-100 fixed top-0 left-3/4 w-1/4" />*/}
            {AllowDots && <Image src={DotsImage} alt={"Dots image decoration"} width={3000} height={1000} className="absolute left-0 top-0 right-0" />}
          {AllowDots && <div className="mb-20" />}
            {children}
        </div>
    )
}