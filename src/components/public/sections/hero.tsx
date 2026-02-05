'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black selection:bg-amber-500/30">
            {/* V5 Background: Aurora & Smoke Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(180,0,0,0.15),transparent_70%)] animate-pulse-slow" />
                <div className="absolute top-0 right-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60 mix-blend-screen" />
                <div className="absolute -bottom-32 left-0 w-full h-[600px] bg-red-900/10 blur-[120px]" />
            </div>

            <div className="container relative z-10 mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 text-amber-200/90 text-sm font-medium tracking-widest backdrop-blur-xl"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    SEIT 1843. FÜHREND.
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-serif font-bold tracking-tight mb-8"
                >
                    <span className="block text-white mb-2">Zukunft gestalten.</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 pb-2">
                        Geschichte schreiben.
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                >
                    Das stärkste akademische Netzwerk am KIT. <br className="hidden md:block" />
                    <span className="text-white/90 font-medium">Gemeinschaft. Exzellenz. Charakter.</span>
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
