'use client';

import { motion } from 'framer-motion';
import { Users, GraduationCap, Trophy, Globe, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpotlightCard } from '@/components/ui/spotlight-card';

const bentoItems = [
    {
        title: "Lebenslange Freundschaft",
        description: "Ein Bund fürs Leben. Von den ersten Tagen im Studium bis weit in den Ruhestand.",
        icon: Users,
        className: "md:col-span-2",
        delay: 0.1
    },
    {
        title: "Exzellenz",
        description: "Bestleistung in Studium und Beruf.",
        icon: Trophy,
        className: "md:col-span-1",
        delay: 0.2
    },
    {
        title: "Tradition & Zukunft",
        description: "Werte aus 1843, gelebt im Heute.",
        icon: Sparkles,
        className: "md:col-span-1",
        delay: 0.3
    },
    {
        title: "Akademische Bildung",
        description: "Über den Tellerrand hinaus. Seminare, Vorträge und Training.",
        icon: GraduationCap,
        className: "md:col-span-2",
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
                        Ein Netzwerk von <span className="text-white/30">Weltklasse.</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Wir bilden die Führungskräfte von morgen. Durch akademische Exzellenz, lebenslange Förderung und ein starkes Fundament an Werten.
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
                            className={item.className}
                        >
                            <SpotlightCard
                                className="h-full p-8 rounded-3xl bg-white/[0.02] border-white/5 hover:border-white/10 transition-colors"
                                spotlightColor="rgba(251, 191, 36, 0.15)"
                            >
                                <div className="h-full flex flex-col justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                        <item.icon className="w-6 h-6 text-amber-100/80" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-3 text-amber-50">{item.title}</h3>
                                        <p className="text-gray-400 leading-relaxed font-light">{item.description}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
