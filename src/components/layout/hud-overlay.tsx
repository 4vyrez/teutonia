'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function HudOverlay() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            {/* 1. Global Scroll Progress (Top) */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-amber-400 origin-left shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                style={{ scaleX }}
            />

            {/* 2. Corner Brackets (Tech Aesthetic) */}
            {/* Top Left */}
            <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-white/10" />

            {/* Top Right */}
            <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-white/10" />

            {/* Bottom Left */}
            <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-white/10" />

            {/* Bottom Right */}
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-white/10" />

            {/* 3. Side Indicators (Vertical lines) */}
            <div className="absolute top-1/2 left-6 w-[1px] h-24 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute top-1/2 right-6 w-[1px] h-24 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* 4. Subtle Scanline/Grid Texture (Optional, keep subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[101] bg-[length:100%_4px,6px_100%] pointer-events-none opacity-20" />
        </div>
    );
}
