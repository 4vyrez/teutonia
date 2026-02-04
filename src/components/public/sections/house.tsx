'use client';

import { motion } from 'framer-motion';
import { Home, Coffee, Utensils, MonitorPlay, Bed, Sun } from 'lucide-react';

const houseFeatures = [
    { icon: Home, title: 'Festsaal', text: 'Bälle, Vorträge & Feiern' },
    { icon: Bed, title: '20 Zimmer', text: 'Günstiges Wohnen am KIT' },
    { icon: Sun, title: 'Loggia & Garten', text: 'Grillen & Entspannen' },
    { icon: MonitorPlay, title: 'Bar & Lounge', text: 'Abendlicher Treffpunkt' },
    { icon: Coffee, title: 'Kaffeeecke', text: 'Gespräche & Zeitung' },
    { icon: Utensils, title: 'Mittagstisch', text: 'Täglich frisch gekocht' },
];

export function HouseSection() {
    return (
        <section id="house" className="py-24 bg-gray-900 text-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-sm font-medium mb-4">
                            Unser Haus
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Der Treffpunkt unseres Bundes
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            Zentrum unseres Gemeinschaftslebens ist unser Verbindungshaus in der Karlsruher Oststadt.
                            In unmittelbarer Nähe zur Universität gelegen, ist es der ideale Ort zum Lernen, Leben und Feiern.
                            Von hier aus lässt sich jedes Universitätsgebäude in wenigen Minuten erreichen.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {houseFeatures.map((feature) => (
                                <div key={feature.title} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{feature.title}</div>
                                        <div className="text-sm text-gray-400">{feature.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[600px] rounded-3xl overflow-hidden bg-gray-800 border border-gray-700"
                    >
                        {/* Placeholder for House Image - using CSS pattern for now */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-serif text-2xl">
                            [Bild vom Haus]
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
