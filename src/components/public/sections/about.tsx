'use client';

import { motion } from 'framer-motion';
import { Users, GraduationCap, Trophy, Globe, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const bentoItems = [
    {
        title: "Lebenslange Freundschaft",
        description: "Ein Bund fürs Leben. Von den ersten Tagen im Studium bis weit in den Ruhestand.",
        icon: Users,
        className: "md:col-span-2 bg-gradient-to-br from-red-900/40 to-black/60 backdrop-blur-md border-white/10",
        delay: 0.1
    },
    {
        title: "Exzellenz",
        description: "Bestleistung in Studium und Beruf.",
        icon: Trophy,
        className: "md:col-span-1 bg-white/5 backdrop-blur-md border-white/10",
        delay: 0.2
    },
    {
        title: "Tradition & Zukunft",
        description: "Werte aus 1843, gelebt im Heute.",
        icon: Sparkles,
        className: "md:col-span-1 bg-white/5 backdrop-blur-md border-white/10",
        delay: 0.3
    },
    {
        title: "Akademische Bildung",
        description: "Über den Tellerrand hinaus. Seminare, Vorträge und Training.",
        icon: GraduationCap,
        className: "md:col-span-2 bg-gradient-to-br from-zinc-900/80 to-black/60 backdrop-blur-md border-white/10",
        delay: 0.4
    }
];

export function AboutSection() {
    return (
        <section id="about" className="py-32 relative text-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24"
                >
                    <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                        Mehr als eine <span className="text-gray-600">Verbindung.</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        In unserer Gemeinschaft findet man immer den richtigen Ansprechpartner – egal, ob es ums Feiern, Arbeiten, Studieren oder die Verwirklichung neuer Ideen geht.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
                    {bentoItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: item.delay }}
                            className={cn(
                                "group relative p-8 rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors",
                                item.className
                            )}
                        >
                            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed font-light">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
