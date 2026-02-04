'use client';

import { motion } from 'framer-motion';

export function UniversitySection() {
    return (
        <section id="university" className="py-24 bg-[#0a0a0a] border-y border-white/5 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-gray-400">
                    Partner der <span className="text-white">Exzellenz</span>
                </h2>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Mock Logos - Replace with actual KIT / University assets if available */}
                    <div className="text-2xl font-bold font-serif">KIT</div>
                    <div className="text-xl font-bold font-mono">FRIDERICIANA</div>
                    <div className="text-xl font-bold tracking-widest">KARLSRUHE</div>
                </div>
            </div>
        </section>
    );
}
