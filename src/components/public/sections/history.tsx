'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const timelineEvents = [
    {
        year: '1843',
        title: 'Gründung',
        description: 'Am 10. Oktober 1843 gründen Studenten des Polytechnikums die Teutonia. Sie ist die erste Burschenschaft an einer technischen Hochschule.'
    },
    {
        year: '1848',
        title: 'Freiheitskampf',
        description: 'Teutonen kämpfen in der Badischen Revolution für Freiheit und Einheit. Nach dem Scheitern wird die Burschenschaft verboten.'
    },
    {
        year: '1857',
        title: 'Wiedergründung',
        description: 'Nach Jahren im Verborgenen tritt die Teutonia wieder öffentlich auf. Das Bekenntnis zu Schwarz-Rot-Gold wird wieder erlaubt.'
    },
    {
        year: '1906',
        title: 'Teutonenhaus',
        description: 'Das heutige Haus in der Schützenstraße wird eingeweiht. Es steht an der Stelle des im Krieg zerstörten Hauses der Burschenschaft Germania.'
    },
    {
        year: '1950',
        title: 'Neustart',
        description: 'Aus dem "Studentenclub Universitas" geht die wiedergegründete Teutonia hervor. Die alten Farben und Werte werden wieder aufgenommen.'
    },
    {
        year: '2016',
        title: 'ADB',
        description: 'Teutonia ist Gründungsmitglied der "Allgemeinen Deutschen Burschenschaft" (ADB) und übernimmt Verantwortung im neuen Dachverband.'
    },
];

export function HistorySection() {
    return (
        <section id="history" className="py-32 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">
                        Unsere <span className="text-amber-400 drop-shadow-md">Geschichte.</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Seit über 180 Jahren prägen wir das akademische Leben in Karlsruhe.
                        Ein Streifzug durch die Zeit.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Center Line (Static) */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/50 to-transparent -translate-x-1/2" />

                    <div className="space-y-12 md:space-y-24">
                        {timelineEvents.map((event, index) => (
                            <div key={event.year} className={cn(
                                "relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center",
                                index % 2 === 0 ? "md:flex-row-reverse" : ""
                            )}>
                                {/* Timeline Dot */}
                                <div className="absolute left-[20px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-700 border-2 border-amber-400 z-10 shadow-[0_0_15px_rgba(251,191,36,0.4)]" />

                                {/* Content Side */}
                                <div className="w-full md:w-1/2 md:px-12 pl-12 pr-4">
                                    <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 hover:bg-white/10 transition-all duration-500 backdrop-blur-md">
                                        <div className="text-amber-400 font-mono text-lg font-bold mb-2 tracking-wider drop-shadow-sm">{event.year}</div>
                                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-300 transition-colors">{event.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {event.description}
                                        </p>
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
