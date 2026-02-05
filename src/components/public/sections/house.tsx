'use client';

import { motion } from 'framer-motion';
import { Home, Coffee, Monitor, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TechLightbox } from '@/components/ui/tech-lightbox';

const features = [
    { title: "20 Zimmer", desc: "Saniert & Vollmöbliert" },
    { title: "Grand Hall", desc: "Festsaal für Events" },
    { title: "Bar & Lounge", desc: "Private Members Club" },
    { title: "Bibliothek", desc: "Exzellente Lernatmosphäre" },
];

export function HouseSection() {
    return (
        <section id="house" className="py-32 relative text-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="mb-8">
                            <h2 className="font-serif text-3xl font-bold mb-4">
                                Ein Anwesen <span className="text-gray-500">mit Geschichte.</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Leben in einer Villa in der Oststadt. Keine 5 Minuten zum Campus.
                                Ein Ort, der Studium, Gemeinschaft und Lebensart verbindet.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {features.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="w-5 h-5 rounded-full bg-amber-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-amber-400" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{item.title}</div>
                                        <div className="text-xs text-gray-500">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-full">
                        <TechLightbox />
                    </div>
                </div>
            </div>
        </section>
    );
}
