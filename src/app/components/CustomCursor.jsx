"use client";

import { useEffect, useState } from "react";

export const CustomCursor = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Check if device is desktop (not touch device and has sufficient screen width)
        const checkIsDesktop = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const hasMouse = window.matchMedia('(pointer: fine)').matches;
            const isLargeScreen = window.innerWidth > 768; // md breakpoint
            setIsDesktop(!isTouchDevice && hasMouse && isLargeScreen);
        };

        checkIsDesktop();
        window.addEventListener('resize', checkIsDesktop);
        
        return () => window.removeEventListener('resize', checkIsDesktop);
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        const move = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [isDesktop]);

    // Don't render on mobile/touch devices
    if (!isDesktop) {
        return null;
    }

    return (
        <div
            className="fixed pointer-events-none h-4 w-4 bg-secondary rounded-3xl transition-transform duration-75 z-50"
            style={{
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%, -50%)",
            }}
        />
    );
};
