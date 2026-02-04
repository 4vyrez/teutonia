'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-red-950" />

            {/* Animated particles/decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-32 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm"
                >
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    Gegründet 10. Oktober 1843
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
                >
                    <span className="text-amber-400">KB!</span> Teutonia
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 font-serif"
                >
                    Karlsruher Burschenschaft
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg text-white/60 max-w-2xl mx-auto mb-12"
                >
                    Die älteste Burschenschaft an einer technischen Universität in Deutschland.
                    Gemeinschaft, Tradition und Freundschaft seit über 180 Jahren.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/#about">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold rounded-full px-8 hover:from-amber-400 hover:to-amber-300 group"
                        >
                            Mehr erfahren
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                    <Link href="/#contact">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white/30 text-white hover:bg-white/10 rounded-full px-8"
                        >
                            Kontakt aufnehmen
                        </Button>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20"
                >
                    <div className="text-center">
                        <div className="text-4xl font-bold text-amber-400 font-serif">180+</div>
                        <div className="text-sm text-white/60 mt-1">Jahre Geschichte</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-amber-400 font-serif">~20</div>
                        <div className="text-sm text-white/60 mt-1">Aktive Studenten</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-amber-400 font-serif">170+</div>
                        <div className="text-sm text-white/60 mt-1">Alte Herren</div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 bg-white/60 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
