"use client";

import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const RootShell = ({ children }) => {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdmin && (
                <MobileNavigation />
            )}

            <div className="min-h-screen flex">
                {!isAdmin && (
                    <aside className="hidden md:block w-64 shrink-0 p-5">
                        <Navigation isMobile={false} menuOpen={false} />
                    </aside>
                )}

                <main className="flex-1">{children}</main>
            </div>

            {!isAdmin && (
                <Footer />
            )}
        </>
    );
};

export default RootShell; 