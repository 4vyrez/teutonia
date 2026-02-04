'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, BookOpen } from 'lucide-react';

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
