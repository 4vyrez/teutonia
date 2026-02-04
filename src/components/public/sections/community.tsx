'use client';

import { motion } from 'framer-motion';
import { Book, Briefcase, PartyPopper, Heart, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const communityPillars = [
    {
        id: 'studium',
        title: 'Studium',
        icon: Book,
        color: 'from-blue-500 to-cyan-400',
        description: 'Interdisziplinärer Austausch, Unterstützung von Alumni und Lerngruppen.',
        features: ['Interdisziplinärer Austausch', 'Alumni-Unterstützung', 'Lerngruppen', 'Bibliothek'],
        link: '/studium',
    },
    {
        id: 'karriere',
        title: 'Karriere',
        icon: Briefcase,
        color: 'from-amber-500 to-yellow-400',
        description: 'Starkes Netzwerk, berufliche Orientierung und Kontakte in die Wirtschaft.',
        features: ['Alumni-Netzwerk', 'Wirtschaftskontakte', 'Mentoring', 'Praktika'],
        link: '/karriere',
    },
    {
        id: 'veranstaltungen',
        title: 'Veranstaltungen',
        icon: PartyPopper,
        color: 'from-purple-500 to-pink-400',
        description: 'Vorträge, Bälle, Reisen und studentische Feiern in Gemeinschaft.',
        features: ['Vorträge', 'Bälle', 'Reisen', 'Stammtische'],
        link: '/veranstaltungen',
    },
    {
        id: 'freundschaft',
        title: 'Freundschaft',
        icon: Heart,
        color: 'from-red-500 to-rose-400',
        description: 'Lebenslange Verbundenheit, gegenseitiger Rückhalt und Generationenbund.',
        features: ['Lebensbund', 'Rückhalt', 'Generationen', 'Feiern'],
        link: '/freundschaft',
    },
];

export function CommunitySection() {
    return (
        <section id="community" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                        Gemeinschaft
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Mehr als nur Studium
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Entdecke die vier Säulen unserer Gemeinschaft.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {communityPillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 text-white shadow-lg`}>
                                <pillar.icon className="w-7 h-7" />
                            </div>

                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                                {pillar.title}
                            </h3>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                {pillar.description}
                            </p>

                            <ul className="space-y-2 mb-8">
                                {pillar.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-sm text-gray-500">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${pillar.color} mr-2`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={pillar.link}
                                className="inline-flex items-center text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors"
                            >
                                Mehr erfahren
                                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
