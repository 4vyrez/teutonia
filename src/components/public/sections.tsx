'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, BookOpen } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-red-950" />

            {/* Animated particles/decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-32 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm"
                >
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    Gegründet 10. Oktober 1843
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
                >
                    <span className="text-amber-400">KB!</span> Teutonia
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4 font-serif"
                >
                    Karlsruher Burschenschaft
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg text-white/60 max-w-2xl mx-auto mb-12"
                >
                    Die älteste Burschenschaft an einer technischen Universität in Deutschland.
                    Gemeinschaft, Tradition und Freundschaft seit über 180 Jahren.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/#about">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold rounded-full px-8 hover:from-amber-400 hover:to-amber-300 group"
                        >
                            Mehr erfahren
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                    <Link href="/#contact">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white/30 text-white hover:bg-white/10 rounded-full px-8"
                        >
                            Kontakt aufnehmen
                        </Button>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20"
                >
                    <div className="text-center">
                        <div className="text-4xl font-bold text-amber-400 font-serif">180+</div>
                        <div className="text-sm text-white/60 mt-1">Jahre Geschichte</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-amber-400 font-serif">~20</div>
                        <div className="text-sm text-white/60 mt-1">Aktive Studenten</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-amber-400 font-serif">170+</div>
                        <div className="text-sm text-white/60 mt-1">Alte Herren</div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 bg-white/60 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}

export function AboutSection() {
    const features = [
        {
            icon: Users,
            title: 'Lebenslange Freundschaft',
            description:
                'Eine Gemeinschaft, die weit über das Studium hinausgeht. Bundesbrüder bleiben ein Leben lang verbunden.',
        },
        {
            icon: BookOpen,
            title: 'Akademische Exzellenz',
            description:
                'Gegenseitige Unterstützung im Studium, Zugang zu Erfahrungen und Wissen älterer Semester.',
        },
        {
            icon: Calendar,
            title: 'Aktives Bundesleben',
            description:
                'Regelmäßige Veranstaltungen, Commerse, Kneipen und gemeinsame Aktivitäten prägen unser Zusammenleben.',
        },
    ];

    return (
        <section id="about" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                        Über Uns
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Mehr als eine Verbindung
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Die Teutonia ist eine Gemeinschaft von Studenten und Akademikern,
                        die sich den Werten von Freundschaft, Bildung und Tradition verpflichtet fühlen.
                    </p>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-400 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ColorsSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Unsere Farben
                    </h2>
                    <p className="text-lg text-gray-600">
                        Rot-Gold-Schwarz — Die Farben der Teutonia
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center gap-4"
                >
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-red-800 rounded-2xl shadow-lg" />
                        <span className="mt-3 text-sm font-medium text-gray-700">Rot</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-amber-500 rounded-2xl shadow-lg" />
                        <span className="mt-3 text-sm font-medium text-gray-700">Gold</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-900 rounded-2xl shadow-lg" />
                        <span className="mt-3 text-sm font-medium text-gray-700">Schwarz</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export function CTASection() {
    return (
        <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-red-950 text-white">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                        Interesse geweckt?
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                        Wir freuen uns über jeden, der mehr über uns erfahren möchte.
                        Besuche uns auf unserem Haus oder schreibe uns eine Nachricht.
                    </p>
                    <a
                        href="mailto:senior@teutonia-karlsruhe.de"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold px-8 py-4 rounded-full hover:from-amber-400 hover:to-amber-300 transition-all"
                    >
                        Kontakt aufnehmen
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
