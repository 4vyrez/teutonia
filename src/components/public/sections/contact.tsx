'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
    return (
        <section id="contact" className="py-32 bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-24">
                    {/* Info Side */}
                    <div className="flex flex-col justify-center">
                        <h2 className="font-serif text-5xl font-bold mb-8">
                            Bereit für den <br />
                            <span className="text-amber-500">nächsten Schritt?</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 font-light">
                            Ob Student, Alumnus oder Interessierter – wir freuen uns auf den Austausch. Komm vorbei oder schreib uns.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-amber-500/30 transition-colors">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-1">Anschrift</h3>
                                    <p className="text-lg">Karlsruher Burschenschaft Teutonia<br />Schützenstraße 30, 76137 Karlsruhe</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-amber-500/30 transition-colors">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-1">Email</h3>
                                    <a href="mailto:kontakt@kbteutonia.de" className="text-lg hover:text-amber-500 transition-colors">kontakt@kbteutonia.de</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-zinc-900/30 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-white/5"
                    >
                        <form className="space-y-6" action="https://formspree.io/f/theorei@icloud.com" method="POST">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-medium text-gray-400 uppercase tracking-wide">Name</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Max Mustermann"
                                        className="bg-white/5 border-white/5 hover:border-white/10 text-white placeholder:text-gray-600 focus:border-amber-500/50 focus:ring-amber-500/20 rounded-xl h-12"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-medium text-gray-400 uppercase tracking-wide">E-Mail</label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="max@kit.edu"
                                        className="bg-white/5 border-white/5 hover:border-white/10 text-white placeholder:text-gray-600 focus:border-amber-500/50 focus:ring-amber-500/20 rounded-xl h-12"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-xs font-medium text-gray-400 uppercase tracking-wide">Betreff</label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Interesse an einem Zimmer..."
                                    className="bg-white/5 border-white/5 hover:border-white/10 text-white placeholder:text-gray-600 focus:border-amber-500/50 focus:ring-amber-500/20 rounded-xl h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-medium text-gray-400 uppercase tracking-wide">Nachricht</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Deine Nachricht..."
                                    className="min-h-[150px] bg-white/5 border-white/5 hover:border-white/10 text-white placeholder:text-gray-600 focus:border-amber-500/50 focus:ring-amber-500/20 rounded-xl resize-none p-4"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-gray-200 font-medium h-14 rounded-xl text-base transition-all"
                            >
                                Nachricht senden
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
