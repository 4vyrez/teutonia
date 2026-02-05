'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Search, Home, GraduationCap, Users, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#0F0F0F] shadow-2xl shadow-amber-900/20"
            >
                <Command className="w-full bg-transparent p-2">
                    <div className="flex items-center border-b border-white/5 px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 text-white/50" />
                        <Command.Input
                            placeholder="Wonach suchst du?..."
                            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-white/40 text-white"
                        />
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden py-2 px-1">
                        <Command.Empty className="py-6 text-center text-sm text-white/40">
                            Keine Ergebnisse gefunden.
                        </Command.Empty>

                        <Command.Group heading="Navigation" className="text-xs text-white/40 font-medium px-2 py-1.5 uppercase tracking-wider">
                            <CommandItem onSelect={() => runCommand(() => router.push('/'))} icon={Home}>Startseite</CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/studium'))} icon={GraduationCap}>Studium & Bildung</CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/karriere'))} icon={ArrowRight}>Karriere & Netzwerk</CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/veranstaltungen'))} icon={Calendar}>Veranstaltungen</CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/freundschaft'))} icon={Users}>Gemeinschaft</CommandItem>
                        </Command.Group>

                        <Command.Group heading="Aktionen" className="text-xs text-white/40 font-medium px-2 py-1.5 mt-2 uppercase tracking-wider">
                            <CommandItem onSelect={() => runCommand(() => router.push('/#contact'))} icon={ArrowRight}>Mitglied werden</CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/#contact'))} icon={ArrowRight}>Kontakt aufnehmen</CommandItem>
                        </Command.Group>
                    </Command.List>

                    <div className="border-t border-white/5 px-4 py-2 text-[10px] text-white/30 flex justify-between items-center">
                        <span>Suche mit Tastatur</span>
                        <div className="flex gap-1">
                            <span className="bg-white/10 px-1.5 py-0.5 rounded text-white/50">ESC</span>
                            <span>zum schließen</span>
                        </div>
                    </div>
                </Command>
            </motion.div>
        </div>
    );
}

function CommandItem({ children, onSelect, icon: Icon }: { children: React.ReactNode, onSelect: () => void, icon: any }) {
    return (
        <Command.Item
            onSelect={onSelect}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/80 aria-selected:bg-white/10 aria-selected:text-amber-200 cursor-pointer transition-colors"
        >
            <Icon className="h-4 w-4 opacity-50" />
            {children}
        </Command.Item>
    );
}
