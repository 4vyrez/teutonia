'use client';

import { motion } from 'framer-motion';
import { Home, Coffee, Monitor, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    { title: "20 Zimmer", desc: "Zentral & Günstig" },
    { title: "Festsaal", desc: "Für große Events" },
    { title: "Bar & Lounge", desc: "24/7 geöffnet" },
    { title: "Lernräume", desc: "Volle Konzentration" },
];

export function HouseSection() {
    return (
        <section id="house" className="py-32 bg-black text-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="mb-8">
                            <h2 className="font-serif text-3xl font-bold mb-4">
                                Dein Zuhause <span className="text-gray-500">am Campus.</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                Keine 5 Minuten zum Audimax. Unsere Villa in der Oststadt bietet mehr als nur ein Dach über dem Kopf.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {features.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-amber-500" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{item.title}</div>
                                        <div className="text-xs text-gray-500">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
                        {/* Placeholder Texture */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/20 font-serif text-2xl group-hover:scale-110 transition-transform duration-700">Hausansicht Foto</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
