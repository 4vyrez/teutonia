'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import {
  Search,
  Home,
  GraduationCap,
  Users,
  Calendar,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <AnimatePresence>
            {open ? (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="relative w-full max-w-lg overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/94 shadow-[0_32px_90px_rgba(105,76,45,0.16)] backdrop-blur"
            >
                <Command className="w-full bg-transparent p-2">
                    <div className="flex items-center border-b border-stone-200 px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 text-slate-500" />
                        <Command.Input
                            placeholder="Wonach suchst du?..."
                            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                        />
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden py-2 px-1">
                        <Command.Empty className="py-6 text-center text-sm text-slate-500">
                            Keine Ergebnisse gefunden.
                        </Command.Empty>

                        <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                            <CommandItem onSelect={() => runCommand(() => router.push('/'))} icon={Home}>Startseite</CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/studium'))} icon={GraduationCap}>Studium & Bildung</CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/karriere'))} icon={ArrowRight}>Karriere & Netzwerk</CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/veranstaltungen'))} icon={Calendar}>Veranstaltungen</CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/freundschaft'))} icon={Users}>Gemeinschaft</CommandItem>
                        </Command.Group>

                        <Command.Group heading="Aktionen" className="mt-2 px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                            <CommandItem onSelect={() => runCommand(() => router.push('/#contact'))} icon={ArrowRight}>Mitglied werden</CommandItem>
                            <CommandItem onSelect={() => runCommand(() => router.push('/#contact'))} icon={ArrowRight}>Kontakt aufnehmen</CommandItem>
                        </Command.Group>
                    </Command.List>

                    <div className="flex items-center justify-between border-t border-stone-200 px-4 py-2 text-[10px] text-slate-500">
                        <span>Suche mit Tastatur</span>
                        <div className="flex gap-1">
                            <span className="rounded bg-stone-100 px-1.5 py-0.5 text-slate-600">ESC</span>
                            <span>zum schließen</span>
                        </div>
                    </div>
                </Command>
            </motion.div>
        </div>
            ) : null}
        </AnimatePresence>
    );
}

function CommandItem({
    children,
    onSelect,
    icon: Icon,
}: {
    children: React.ReactNode;
    onSelect: () => void;
    icon: LucideIcon;
}) {
    return (
        <Command.Item
            onSelect={onSelect}
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors aria-selected:bg-primary/8 aria-selected:text-primary"
        >
            <Icon className="h-4 w-4 opacity-60" />
            {children}
        </Command.Item>
    );
}
