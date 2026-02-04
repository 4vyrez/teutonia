'use client';

import { motion } from 'framer-motion';

export function UniversitySection() {
    return (
        <section id="university" className="py-24 bg-[#0d0d0d] border-y border-white/5 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl">
                        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                            Verbunden mit dem <span className="text-amber-600">KIT.</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-light leading-relaxed">
                            Seit 1843 sind wir eng mit der Hochschule verbunden. Unsere Mitglieder studieren überwiegend am Karlsruher Institut für Technologie (ehem. Universität Karlsruhe).
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 items-center md:items-end opacity-70">
                        {/* Styled Text Representation of KIT Logo style */}
                        <div className="text-4xl font-extrabold tracking-tighter">KIT</div>
                        <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Karlsruher Institut für Technologie</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
