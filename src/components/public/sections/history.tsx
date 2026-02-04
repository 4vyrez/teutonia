'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const timelineEvents = [
    {
        year: '1843',
        title: 'Gründung',
        description: 'Gründung durch ehemalige Corpsstudenten. Liberaler Geist und Begeisterung für die Burschenschaftsbewegung.'
    },
    {
        year: '1848',
        title: 'Revolution',
        description: 'Kampf für Freiheit und Einheit. Aktive Beteiligung an der Badischen Revolution. Verbot der Burschenschaft.'
    },
    {
        year: '1857',
        title: 'Rückkehr',
        description: 'Wiedergründung nach Jahren im Verborgenen. Aufstieg zu einer der stärksten Verbindungen in Karlsruhe.'
    },
    {
        year: '1950',
        title: 'Neustart',
        description: 'Wiederaufbau nach dem 2. Weltkrieg. Bekenntnis zu den alten Farben und Werten.'
    },
    {
        year: 'Heute',
        title: 'Moderne',
        description: 'Tradition trifft Zukunft. Eine lebendige Gemeinschaft im Herzen der Technologieregion Karlsruhe.'
    },
];

export function HistorySection() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="history" className="py-32 bg-[#050505] text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold max-w-xl">
                        Eine Geschichte, die <span className="text-gray-600">verpflichtet.</span>
                    </h2>
                    <div className="hidden md:block w-full max-w-xs h-px bg-white/20 mb-4" />
                </div>

                <div className="relative">
                    {/* Horizontal Line */}
                    <div className="absolute top-[80px] left-0 w-full h-px bg-white/10 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {timelineEvents.map((event, index) => (
                            <div
                                key={event.year}
                                className="relative group cursor-pointer"
                                onClick={() => setActiveIndex(index)}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                {/* Marker */}
                                <div className="hidden md:flex items-center justify-center w-full mb-8 relative z-10">
                                    <div className={cn(
                                        "w-4 h-4 rounded-full border-2 transition-all duration-300 bg-[#050505]",
                                        index === activeIndex ? "border-amber-500 scale-125 bg-amber-500" : "border-white/20 group-hover:border-white/50"
                                    )} />
                                </div>

                                {/* Content */}
                                <div className={cn(
                                    "p-6 rounded-2xl border transition-all duration-300",
                                    index === activeIndex
                                        ? "bg-white/5 border-amber-500/30"
                                        : "bg-transparent border-white/5 opacity-50 hover:opacity-100"
                                )}>
                                    <div className="text-3xl font-bold text-amber-500 mb-2 font-mono">{event.year}</div>
                                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
