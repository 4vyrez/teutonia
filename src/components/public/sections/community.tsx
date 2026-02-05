'use client';

import { motion } from 'framer-motion';
import { Book, Briefcase, Calendar, Heart, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const pillars = [
    {
        title: 'Studium',
        icon: Book,
        desc: 'Gemeinsames Lernen, Bibliothek und Prüfungsvorbereitung.',
        href: '/studium'
    },
    {
        title: 'Karriere',
        icon: Briefcase,
        desc: 'Netzwerk aus über 170 Alumni in Führungspositionen.',
        href: '/karriere'
    },
    {
        title: 'Events',
        icon: Calendar,
        desc: 'Vorträge, Bälle und legendäre Partys auf dem Haus.',
        href: '/veranstaltungen'
    },
    {
        title: 'Freundschaft',
        icon: Heart,
        desc: 'Ein Bund fürs Leben. In Karlsruhe und der Welt.',
        href: '/freundschaft'
    }
];

export function CommunitySection() {
    return (
        <section id="community" className="py-32 relative text-white border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <span className="text-amber-200 font-mono text-sm tracking-widest uppercase mb-4 block">Gemeinschaft</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold">Vier Säulen. Ein Fundament.</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((pillar, i) => (
                        <Link href={pillar.href} key={i} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="h-full p-8 rounded-3xl bg-white/5 border border-white/5 group-hover:border-amber-400/30 transition-colors relative overflow-hidden"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-5 h-5 text-white/50" />
                                </div>

                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                                    <pillar.icon className="w-5 h-5 text-white" />
                                </div>

                                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
