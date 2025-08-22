"use client";

import { useEffect, useState } from "react";

export const CustomCursor = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

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
