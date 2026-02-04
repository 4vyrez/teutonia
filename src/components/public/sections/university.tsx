'use client';

import { motion } from 'framer-motion';

export function UniversitySection() {
    return (
        <section id="university" className="py-24 relative overflow-hidden bg-white text-gray-900">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                            Unsere Alma Mater
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Karlsruher Institut für Technologie
                        </h2>
                        <div className="space-y-6 text-lg text-gray-600">
                            <p>
                                Das KIT geht auf die "Polytechnische Schule Karlsruhe" zurück, gegründet am 7. Oktober 1825
                                – damit ist sie die <strong>älteste Technische Hochschule Deutschlands</strong>.
                            </p>
                            <p>
                                Als Exzellenzuniversität verbindet das KIT eine lange universitäre Tradition mit
                                spitzenforschungsorientierter Großforschung. Hier studieren und forschen unsere
                                aktiven Mitglieder in den unterschiedlichsten Disziplinen.
                            </p>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-bold text-gray-900 mb-4">Berühmte Persönlichkeiten</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Karl Benz', 'Heinrich Hertz', 'Fritz Haber', 'Dieter Zetsche'].map(name => (
                                    <span key={name} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <div className="text-4xl font-bold text-green-600 mb-2">1825</div>
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Gründung</div>
                            </div>
                            <div className="bg-green-600 p-6 rounded-2xl shadow-xl text-white">
                                <div className="text-4xl font-bold mb-2">1.</div>
                                <div className="text-sm font-medium opacity-90 uppercase tracking-wide">Technische Hochschule Deutschlands</div>
                            </div>
                        </div>
                        <div className="space-y-6 pt-12">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <div className="text-4xl font-bold text-green-600 mb-2">2006</div>
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Elite-Uni Status</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
