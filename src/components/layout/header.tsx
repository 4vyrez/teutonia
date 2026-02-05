'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TechButton } from '@/components/ui/tech-button';
import { MagneticLink } from '@/components/ui/magnetic-link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, X } from 'lucide-react';

/* 
  Updated Navigation Links
  We map specific sub-topics to the single-page sections via anchors (#community) 
  until dedicated sub-pages are created.
*/
const navLinks = [
    { href: '/#about', label: 'Über Uns' },
    { href: '/#history', label: 'Geschichte' },
    {
        href: '/#community',
        label: 'Gemeinschaft',
        children: [
            { href: '/#community', label: 'Studium' },
            { href: '/#community', label: 'Karriere' },
            { href: '/#community', label: 'Veranstaltungen' },
            { href: '/#community', label: 'Freundschaft' },
        ],
    },
    { href: '/#university', label: 'KIT' },
    { href: '/#house', label: 'Unser Haus' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled ? 'py-4' : 'py-6'
            )}
        >
            <nav
                className={cn(
                    'container mx-auto px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between',
                    isScrolled
                        ? 'bg-black/20 backdrop-blur-2xl shadow-lg border border-white/10'
                        : 'bg-transparent'
                )}
            >
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-3 font-serif group">
                    {/* Wappen Image */}
                    <div className="relative w-10 h-12 transition-transform group-hover:scale-105">
                        <img
                            src="/images/Teutonia-wappen.jpg"
                            alt="Teutonia Wappen"
                            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(180,0,0,0.5)]"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className={cn(
                            'text-xl font-bold leading-none tracking-tight transition-colors',
                            isScrolled ? 'text-white' : 'text-white'
                        )}>
                            Teutonia
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-amber-200 transition-colors">
                            Karlsruhe
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) =>
                        link.children ? (
                            <li key={link.href}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors focus:outline-none group px-2 py-1"
                                    >
                                        {link.label}
                                        <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="center"
                                        className="w-48 bg-[#0a0505]/95 backdrop-blur-xl border-white/10 text-white"
                                    >
                                        {link.children.map((child) => (
                                            <DropdownMenuItem key={child.label} asChild>
                                                <Link href={child.href} className="flex items-center gap-2 cursor-pointer hover:bg-white/5 focus:bg-white/5">
                                                    <span>{child.label}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        ) : (
                            <li key={link.href}>
                                <MagneticLink>
                                    <Link
                                        href={link.href}
                                        className="block text-sm font-medium text-white/80 hover:text-amber-200 transition-colors px-2 py-1"
                                    >
                                        {link.label}
                                    </Link>
                                </MagneticLink>
                            </li>
                        )
                    )}
                </ul>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Link href="/#contact" className="hidden lg:block">
                        <TechButton variant="gold" size="sm" className="hidden lg:flex font-serif tracking-wide border-t border-white/20">
                            Kontakt
                        </TechButton>
                    </Link>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Full Screen Professional */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center lg:hidden"
                >
                    <div className="absolute top-6 right-6">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    <ul className="space-y-8 text-center">
                        {navLinks.map((link) => (
                            <li key={link.href} className="overflow-hidden">
                                {link.children ? (
                                    <div className="space-y-4">
                                        <div className="text-amber-500/50 uppercase text-sm tracking-[0.3em] font-mono mb-2">{link.label}</div>
                                        {link.children.map(child => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="block text-3xl font-serif font-bold text-white hover:text-amber-400 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="block text-4xl font-serif font-bold text-white hover:text-amber-400 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                        <li className="pt-8">
                            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
                                <TechButton variant="gold" size="tech">
                                    Mitglied werden
                                </TechButton>
                            </Link>
                        </li>
                    </ul>
                </motion.div>
            )}
        </motion.header>
    );
}
