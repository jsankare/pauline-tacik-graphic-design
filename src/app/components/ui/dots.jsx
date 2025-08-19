'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dotPng from '../../../../public/pois.png';

export default function Dots({ rows = 5, dotSize = 26, gap = 8 }) {
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) {
        return null;
    }

    const totalWidth = rows * dotSize + (rows - 1) * gap;
    const totalHeight = rows * dotSize + (rows - 1) * gap;

    return (
        <div
            aria-hidden
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: totalWidth,
                height: totalHeight,
                pointerEvents: 'none',
                zIndex: 10,
                overflow: 'visible', // no cropping
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap,
                    transform: `translate(-${dotSize / 2}px, ${dotSize / 2}px)`,
                }}
            >
                {Array.from({ length: rows }, (_, i) => {
                    const count = rows - i;
                    return (
                        <div key={i} style={{ display: 'flex', gap }}>
                            {Array.from({ length: count }, (_, j) => (
                                <Image
                                    key={j}
                                    src={dotPng}
                                    alt=""
                                    width={dotSize}
                                    height={dotSize}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
