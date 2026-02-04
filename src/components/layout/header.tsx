'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
                        ? 'bg-[#150a0a]/80 backdrop-blur-xl shadow-lg border border-white/5'
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
                        <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500/80">
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
                                        className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors focus:outline-none group"
                                    >
                                        {link.label}
                                        <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="center"
                                        className="w-48 bg-[#150a0a]/95 backdrop-blur-xl border-white/10 text-white"
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
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-white/80 hover:text-amber-500 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        )
                    )}
                </ul>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Link href="/#contact" className="hidden lg:block">
                        <Button
                            size="sm"
                            className="bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg px-6 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] transition-all"
                        >
                            Kontakt
                        </Button>
                    </Link>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-full left-4 right-4 mt-2 p-6 bg-[#1a0f0f] border border-white/10 rounded-2xl shadow-2xl lg:hidden z-50"
                >
                    <ul className="space-y-4">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                {link.children ? (
                                    <div className="space-y-3">
                                        <div className="font-semibold text-amber-500 uppercase text-xs tracking-wider">{link.label}</div>
                                        <div className="pl-4 space-y-3 border-l border-white/10">
                                            {link.children.map(child => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block text-white/90 hover:text-white"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="block text-lg font-medium text-white"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.header>
    );
}
