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

const navLinks = [
    { href: '/#about', label: 'Über Uns' },
    { href: '/#history', label: 'Geschichte' },
    {
        href: '/#community',
        label: 'Gemeinschaft',
        children: [
            { href: '/studium', label: 'Studium', icon: '📚' },
            { href: '/karriere', label: 'Karriere', icon: '💼' },
            { href: '/veranstaltungen', label: 'Veranstaltungen', icon: '🎉' },
            { href: '/freundschaft', label: 'Freundschaft', icon: '❤️' },
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
                'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300',
                isScrolled ? 'top-2' : 'top-4'
            )}
        >
            <nav
                className={cn(
                    'flex items-center gap-8 px-6 py-3 rounded-full backdrop-blur-xl transition-all duration-300',
                    isScrolled
                        ? 'bg-white/95 shadow-lg border border-gray-200/50'
                        : 'bg-black/20 border border-white/10'
                )}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-serif">
                    <span
                        className={cn(
                            'text-lg font-bold transition-colors',
                            isScrolled ? 'text-amber-600' : 'text-amber-400'
                        )}
                    >
                        KB!
                    </span>
                    <span
                        className={cn(
                            'text-lg font-semibold transition-colors',
                            isScrolled ? 'text-gray-900' : 'text-white'
                        )}
                    >
                        Teutonia
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) =>
                        link.children ? (
                            <li key={link.href}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        className={cn(
                                            'flex items-center gap-1 text-sm font-medium transition-colors hover:text-amber-500 focus:outline-none',
                                            isScrolled ? 'text-gray-700' : 'text-white/90'
                                        )}
                                    >
                                        {link.label}
                                        <ChevronDown className="h-3 w-3" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="start"
                                        className="w-48 bg-white/95 backdrop-blur-xl"
                                    >
                                        {link.children.map((child) => (
                                            <DropdownMenuItem key={child.href} asChild>
                                                <Link href={child.href} className="flex items-center gap-2">
                                                    <span>{child.icon}</span>
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
                                    className={cn(
                                        'text-sm font-medium transition-colors hover:text-amber-500',
                                        isScrolled ? 'text-gray-700' : 'text-white/90'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        )
                    )}
                </ul>

                {/* CTA Button */}
                <Link href="/#contact" className="hidden lg:block">
                    <Button
                        variant="default"
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold rounded-full hover:from-amber-400 hover:to-amber-300"
                    >
                        Kontakt
                    </Button>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={cn(
                        'lg:hidden p-2 transition-colors',
                        isScrolled ? 'text-gray-900' : 'text-white'
                    )}
                    aria-label="Menü öffnen"
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 mx-4 p-4 bg-white rounded-2xl shadow-xl lg:hidden"
                >
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                                {link.children && (
                                    <ul className="ml-4 mt-1 space-y-1">
                                        {link.children.map((child) => (
                                            <li key={child.href}>
                                                <Link
                                                    href={child.href}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    <span>{child.icon}</span>
                                                    <span>{child.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                        <li className="pt-2">
                            <Link
                                href="/#contact"
                                className="block text-center bg-gradient-to-r from-amber-500 to-amber-400 text-black font-semibold py-3 rounded-full"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Kontakt
                            </Link>
                        </li>
                    </ul>
                </motion.div>
            )}
        </motion.header>
    );
}
