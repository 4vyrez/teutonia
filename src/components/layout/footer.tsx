'use client';

import Link from 'next/link';

const footerLinks = {
    navigation: [
        { href: '/#about', label: 'Über Uns' },
        { href: '/#history', label: 'Geschichte' },
        { href: '/#house', label: 'Unser Haus' },
        { href: '/#contact', label: 'Kontakt' },
    ],
    community: [
        { href: '#', label: 'Studium' },
        { href: '#', label: 'Karriere' },
        { href: '#', label: 'Veranstaltungen' },
        { href: '#', label: 'Freundschaft' },
    ],
    legal: [
        { href: '/impressum', label: 'Impressum' },
        { href: '/datenschutz', label: 'Datenschutz' },
    ],
};

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-b from-[#1a0505] to-[#0a0202] text-white border-t border-white/10">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3 font-serif mb-6 group">
                            {/* Small Wappen Icon */}
                            <div className="relative w-8 h-10 transition-transform group-hover:scale-105">
                                <img
                                    src="/images/Teutonia-wappen.jpg"
                                    alt="Teutonia Wappen"
                                    className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(180,0,0,0.3)]"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold leading-none tracking-tight">Teutonia</span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500/80">Karlsruhe</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Die älteste Burschenschaft an einer technischen Universität in Deutschland.<br />
                            Gegründet am 10. Oktober 1843.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/KB.Teutonia/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-500 transition-colors">
                                Facebook
                            </a>
                            <a href="https://www.instagram.com/teutoniakarlsruhe/?hl=de" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-500 transition-colors">
                                Instagram
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Navigation</h3>
                        <ul className="space-y-3">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Gemeinschaft</h3>
                        <ul className="space-y-3">
                            {footerLinks.community.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Kontakt</h3>
                        <address className="not-italic text-sm text-gray-400 space-y-4">
                            <div>
                                <strong className="text-white block mb-1">Anschrift</strong>
                                Karlsruher Burschenschaft Teutonia<br />
                                Parkstraße 1<br />
                                76131 Karlsruhe
                            </div>
                            <div>
                                <strong className="text-white block mb-1">Telefon</strong>
                                <a href="tel:+4972166777348" className="hover:text-red-400 transition-colors">
                                    0721 - 66 777 348
                                </a>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">Chargen / Verschiedenes</strong>
                                <a href="mailto:chargen@kbteutonia.de" className="hover:text-red-400 transition-colors">
                                    chargen@kbteutonia.de
                                </a>
                            </div>
                            <div>
                                <strong className="text-white block mb-1">Zimmervermietung</strong>
                                <a href="mailto:zimmer@kbteutonia.de" className="hover:text-red-400 transition-colors">
                                    zimmer@kbteutonia.de
                                </a>
                            </div>
                        </address>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-xs">
                        © {currentYear} Karlsruher Burschenschaft Teutonia.
                    </p>
                    <div className="flex gap-6">
                        {footerLinks.legal.map((link) => (
                            <Link key={link.label} href={link.href} className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
