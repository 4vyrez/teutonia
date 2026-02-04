'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const timelineEvents = [
    {
        year: '1843',
        title: 'Gründung',
        description: 'Am 10. Oktober 1843 wird die Teutonia von ehemaligen Mitgliedern des Corps Franconia gegründet. Ein liberaler Geist weht durch Karlsruhe.'
    },
    {
        year: '1848',
        title: 'Verbot & Revolution',
        description: 'Im Zuge der Badischen Revolution kämpfen Teutonen für Freiheit und Einheit. Die Burschenschaft wird zeitweise verboten.'
    },
    {
        year: '1857',
        title: 'Wiedergründung',
        description: 'Nach Jahren im Verborgenen tritt die Teutonia wieder an die Öffentlichkeit und entwickelt sich rasant.'
    },
    {
        year: '1874',
        title: 'Erstes Haus',
        description: 'Die Teutonia bezieht ihr erstes eigenes Verbindungshaus und festigt ihren Platz in der Karlsruher Gesellschaft.'
    },
    {
        year: '1906',
        title: 'Einzug ins Teutonenhaus',
        description: 'Das heutige Haus in der Schützenstraße wird feierlich eingeweiht. Ein architektonisches Juwel der Oststadt.'
    },
    {
        year: '1950',
        title: 'Wiederaufbau',
        description: 'Nach dem Zweiten Weltkrieg wird der Altherrenverein reaktiviert und der Aktivenbetrieb wieder aufgenommen.'
    },
    {
        year: 'Heute',
        title: 'Moderne Tradition',
        description: 'Die Teutonia verbindet heute über 200 Mitglieder aller Generationen und Fakultäten.'
    },
];

export function HistorySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Line grows as we scroll
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="history" className="py-32 bg-[#120808] text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent" />

            <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
                <div className="text-center mb-24">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                        Unsere <span className="text-amber-600">Geschichte.</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Seit über 180 Jahren prägen wir das akademische Leben in Karlsruhe.
                        Ein Streifzug durch die Zeit.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Center Line (Background) */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />

                    {/* Animated Fill Line */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-[20px] md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-amber-500 via-red-600 to-amber-500 -translate-x-1/2 origin-top"
                    />

                    <div className="space-y-12 md:space-y-24">
                        {timelineEvents.map((event, index) => (
                            <div key={event.year} className={cn(
                                "relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center",
                                index % 2 === 0 ? "md:flex-row-reverse" : ""
                            )}>
                                {/* Timeline Dot */}
                                <div className="absolute left-[20px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#120808] border-2 border-amber-500 z-10 shadow-[0_0_10px_rgba(217,119,6,0.5)]" />

                                {/* Content Side */}
                                <div className="w-full md:w-1/2 md:px-12 pl-12 pr-4">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-colors">
                                        <div className="text-4xl font-serif font-bold text-amber-600/20 absolute -top-4 -right-2 md:right-auto md:left-6 select-none leading-none">
                                            {event.year}
                                        </div>

                                        <div className="relative z-10">
                                            <span className="text-amber-500 font-mono text-sm tracking-wider mb-2 block">{event.year}</span>
                                            <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Empty Side for alignment */}
                                <div className="hidden md:block w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
