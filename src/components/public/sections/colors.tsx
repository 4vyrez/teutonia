'use client';

import { motion } from 'framer-motion';

export function ColorsSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Unsere Farben
                    </h2>
                    <p className="text-lg text-gray-600">
                        Rot-Gold-Schwarz — Die Farben der Teutonia
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center gap-4"
                >
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-red-800 rounded-2xl shadow-lg" />
                        <span className="mt-3 text-sm font-medium text-gray-700">Rot</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-amber-500 rounded-2xl shadow-lg" />
                        <span className="mt-3 text-sm font-medium text-gray-700">Gold</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-900 rounded-2xl shadow-lg" />
                        <span className="mt-3 text-sm font-medium text-gray-700">Schwarz</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
