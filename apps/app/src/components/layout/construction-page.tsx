'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@teutonia/shared/components/ui/button';

export default function ConstructionPage({ title, description }: { title: string, description: string }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#100505] to-black -z-10" />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl bg-white/5 backdrop-blur-xl p-12 rounded-3xl border border-white/10 shadow-2xl"
            >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8 border border-white/10">
                    <Construction className="w-8 h-8 text-amber-400" />
                </div>

                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">{title}</h1>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                    {description}
                </p>

                <Link href="/">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white gap-2 h-12 px-8 rounded-xl font-medium transition-colors hover:text-amber-200">
                        <ArrowLeft className="w-4 h-4" />
                        Zurück zur Startseite
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
