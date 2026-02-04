'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-red-950 text-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-sm font-medium mb-4">
                            Kontakt
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Interesse geweckt?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-lg">
                            Wir freuen uns über dein Interesse! Schreib uns eine Nachricht oder besuche uns einfach bei einer unserer Veranstaltungen.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">Adresse</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Karlsruher Burschenschaft Teutonia<br />
                                        Karlsruher Oststadt<br />
                                        76131 Karlsruhe
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">E-Mail</h3>
                                    <p className="text-gray-400">
                                        kontakt@kbteutonia.de
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10"
                    >
                        <form className="space-y-4" action="https://formspree.io/f/theorei@icloud.com" method="POST">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Dein Name"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-300">E-Mail</label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="deine@email.de"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-300">Betreff</label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Worum geht es?"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300">Nachricht</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Deine Nachricht..."
                                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold hover:from-amber-400 hover:to-amber-300 h-12 rounded-xl text-base"
                            >
                                Nachricht senden
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
