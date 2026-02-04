'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black selection:bg-amber-500/30">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-black to-black" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

            {/* Spotlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-600/20 blur-[100px] rounded-full opacity-50 animate-pulse" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-32 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 text-amber-500/80 text-sm font-medium tracking-wide backdrop-blur-xl"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    EST. 1843
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tight leading-none"
                >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        Teutonia
                    </span>
                    <span className="block text-4xl md:text-5xl lg:text-6xl font-sans font-light text-white/40 mt-2 tracking-widest uppercase">
                        Karlsruhe
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                >
                    Tradition trifft Zukunft. Die älteste Burschenschaft am KIT. <br className="hidden md:block" />
                    <span className="text-white/80">Gemeinschaft. Exzellenz. Charakter.</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link href="/#about">
                        <Button
                            size="lg"
                            className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-base font-medium transition-all hover:scale-105"
                        >
                            Mehr erfahren
                        </Button>
                    </Link>
                    <Link href="/#contact">
                        <Button
                            variant="ghost"
                            size="lg"
                            className="text-white hover:text-amber-400 hover:bg-white/5 rounded-full px-8 h-12 text-base font-medium group"
                        >
                            Kontakt aufnehmen
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
                <ChevronDown className="w-5 h-5 text-white/30 animate-bounce" />
            </motion.div>
        </section>
    );
}
