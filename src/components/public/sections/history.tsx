'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const timelineEvents = [
    {
        year: '1843',
        title: 'Gründung der Teutonia',
        date: '10. Oktober 1843',
        description:
            'Die Karlsruher Burschenschaft Teutonia wird von ehemaligen Mitgliedern des Corps Franconia gegründet. Ein liberal-freiheitlicher Geist prägt die Gründer – sie sind begeistert von den Idealen der Burschenschaftsbewegung.',
    },
    {
        year: '1848',
        title: 'Revolution & Verbot',
        date: '1848–1849',
        description:
            'Die Teutonen beteiligen sich aktiv an der Revolution. Ein größerer Teil kämpft in der Badischen Volksarmee für einen geeinten Nationalstaat. Nach dem Scheitern wird die Burschenschaft 1849 verboten.',
    },
    {
        year: '1857',
        title: 'Wiedergründung',
        date: '1857',
        description:
            'Nach Jahren im Verborgenen wird die Teutonia wiedergegründet und bekennt sich öffentlich zum Burschenschaftswesen. Die Verbindung wächst erneut und ist bis in die 1930er Jahre oft die stärkste lokale Burschenschaft.',
    },
    {
        year: '1877',
        title: 'Tochterverbindungen',
        date: '1877–1893',
        description:
            'Aus der Teutonia gehen mehrere neue Burschenschaften hervor: Germania Karlsruhe (1877), Cimbria (1888) und die Münchner Burschenschaft Stauffia (1893), die bis heute existiert.',
    },
    {
        year: '1937',
        title: 'NS-Zeit & Gleichschaltung',
        date: '1937–1945',
        description:
            'Im Zuge der "Gleichschaltung" durch das NS-Regime wird die Teutonia offiziell aufgelöst. Sie existiert jedoch als "Kameradschaft Egerland" gemeinsam mit der Tochterverbindung Germania bis 1945 weiter.',
    },
    {
        year: '1950',
        title: 'Wiedererstehung',
        date: '1947–1950',
        description:
            '1950 nimmt die Gemeinschaft offiziell wieder den Namen Karlsruher Burschenschaft Teutonia an – mit den traditionellen Farben, dem Zirkel und dem Wahlspruch "Freiheit, Ehre, Vaterland".',
    },
    {
        year: '1971',
        title: 'Fakultativ Schlagend',
        date: '1971',
        description:
            'Die Teutonia wird zur "fakultativ schlagenden" Verbindung – das Fechten von Mensuren ist seitdem optional, aber das Erlernen des Korbschlägers bleibt Teil der Tradition.',
    },
    {
        year: 'Heute',
        title: 'Lebendige Tradition',
        date: 'Gegenwart',
        description:
            'Teutonia verbindet ca. 20 Studenten mit über 170 Alumni. Wir leben unsere Werte und pflegen Traditionen, die über Generationen Bestand haben – im Herzen von Karlsruhe, direkt am KIT.',
    },
];

export function HistorySection() {
    const [selectedEvent, setSelectedEvent] = useState(timelineEvents[timelineEvents.length - 1]);

    return (
        <section id="history" className="py-24 bg-gray-900 text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-sm font-medium mb-4">
                        Geschichte
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                        Über 180 Jahre Tradition
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Eine bewegte Geschichte, geprägt von den Höhen und Tiefen der deutschen Vergangenheit.
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="hidden md:block absolute top-[28px] left-0 right-0 h-0.5 bg-gray-700 w-full" />

                    {/* Timeline Events */}
                    <div className="flex overflow-x-auto pb-12 gap-8 md:gap-0 md:justify-between relative z-10 no-scrollbar px-4">
                        {timelineEvents.map((event, index) => {
                            const isSelected = selectedEvent.year === event.year;
                            return (
                                <button
                                    key={event.year}
                                    onClick={() => setSelectedEvent(event)}
                                    className="group flex flex-col items-center flex-shrink-0 focus:outline-none"
                                >
                                    <div
                                        className={cn(
                                            'w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 relative bg-gray-900 z-10',
                                            isSelected
                                                ? 'border-amber-500 scale-110 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                                                : 'border-gray-700 group-hover:border-gray-500'
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'text-xs font-bold',
                                                isSelected ? 'text-amber-500' : 'text-gray-500 group-hover:text-gray-300'
                                            )}
                                        >
                                            {event.year}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Card */}
                    <motion.div
                        key={selectedEvent.year}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 mt-4"
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <h3 className="text-3xl font-serif font-bold text-amber-400">
                                        {selectedEvent.title}
                                    </h3>
                                </div>
                                <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-sm font-mono text-gray-400 mb-6">
                                    {selectedEvent.date}
                                </span>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {selectedEvent.description}
                                </p>
                            </div>
                            <div className="text-9xl font-serif font-bold text-white/5 select-none leading-none -mt-4 hidden md:block">
                                {selectedEvent.year}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
