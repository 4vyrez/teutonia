'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

export function TechLightbox() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Trigger Card (Replaces the placeholder) */}
            <div
                className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                {/* Placeholder Image/Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black group-hover:scale-105 transition-transform duration-700" />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 group-hover:bg-amber-400/20 transition-colors">
                        <ZoomIn className="w-6 h-6 text-white group-hover:text-amber-400 transition-colors" />
                    </div>
                    <span className="text-white/60 font-serif text-2xl group-hover:text-white transition-colors">Hausansicht öffnen</span>
                    <span className="text-white/30 text-xs uppercase tracking-widest mt-2 hidden group-hover:block animate-in fade-in slide-in-from-bottom-2">Klicken zum Vergrößern</span>
                </div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setIsOpen(false)}
                    >
                        <button
                            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Placeholder for Real Image */}
                            <div className="absolute inset-0 flex items-center justify-center text-white/20">
                                <span className="font-mono text-sm">[HIER BILD EINFÜGEN: /images/haus-full.jpg]</span>
                            </div>

                            {/* Tech Details Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-xl font-bold text-white mb-1">Villa Teutonia</h3>
                                <p className="text-sm text-gray-400">Schützenstraße 16, 76131 Karlsruhe</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
