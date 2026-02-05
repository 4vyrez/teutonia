'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, FlaskConical, Globe, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export function UniversitySection() {
    return (
        <section id="university" className="py-32 relative overflow-hidden bg-transparent">
            {/* Tech Background Grid - Subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* Green Glow (KIT Color Reference) */}
            <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Content */}
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Exzellenzuniversität
                        </div>

                        <h2 className="font-serif text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            Studieren am <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
                                Puls der Zeit.
                            </span>
                        </h2>

                        <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-xl">
                            Das Studium mit Teutonia ist geprägt durch interdisziplinären Austausch zwischen unterschiedlichsten Fachrichtungen und Generationen.
                            Neben dem Fachwissen zählt für uns eine breitgefächerte Bildung.
                        </p>

                        <div className="grid grid-cols-2 gap-6 max-w-lg">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                                <Cpu className="w-8 h-8 text-emerald-500 mb-3" />
                                <div className="font-bold text-lg mb-1">Technik</div>
                                <div className="text-xs text-gray-500">Ingenieurwissenschaften & Informatik</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                                <FlaskConical className="w-8 h-8 text-teal-400 mb-3" />
                                <div className="font-bold text-lg mb-1">Forschung</div>
                                <div className="text-xs text-gray-500">Naturwissenschaften & Grundlagen</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Abstract Visualization */}
                    <div className="lg:col-span-5 relative">
                        <div className="aspect-square rounded-full border border-white/10 relative flex items-center justify-center animate-[spin_60s_linear_infinite]">
                            <div className="w-2/3 h-2/3 rounded-full border border-white/5 border-dashed" />
                            <div className="w-1/3 h-1/3 rounded-full border border-emerald-500/20" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-[#0d0d0d] p-8 rounded-full border border-white/10 shadow-2xl relative">
                                <div className="text-5xl font-black tracking-tighter text-white">KIT</div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Partner</div>
                            </div>
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-10 bg-[#121212] border border-amber-500/20 p-4 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.1)] max-w-[150px]"
                        >
                            <div className="text-amber-500 font-bold text-2xl mb-1">Nr. 1</div>
                            <div className="text-xs text-gray-500 leading-tight">Informatik in Deutschland</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-20 left-0 bg-[#121212] border border-emerald-500/20 p-4 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.1)] max-w-[150px]"
                        >
                            <div className="text-emerald-500 font-bold text-2xl mb-1">20k+</div>
                            <div className="text-xs text-gray-500 leading-tight">Studierende am Campus</div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
