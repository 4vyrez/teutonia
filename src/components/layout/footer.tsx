import Link from 'next/link';

const footerLinks = {
    navigation: [
        { href: '/#about', label: 'Über Uns' },
        { href: '/#history', label: 'Geschichte' },
        { href: '/#house', label: 'Unser Haus' },
        { href: '/#contact', label: 'Kontakt' },
    ],
    community: [
        { href: '/studium', label: 'Studium' },
        { href: '/karriere', label: 'Karriere' },
        { href: '/veranstaltungen', label: 'Veranstaltungen' },
        { href: '/freundschaft', label: 'Freundschaft' },
    ],
    legal: [
        { href: '/impressum', label: 'Impressum' },
        { href: '/datenschutz', label: 'Datenschutz' },
        { href: '/mitgliederbereich', label: 'Mitglieder' },
    ],
};

export function Footer() {
    const currentYear = new Date().getFullYear();
    const version = process.env.NEXT_PUBLIC_APP_VERSION || '0.2.78';

    return (
        <footer className="bg-gray-950 text-white">
            <div className="container mx-auto px-6 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 font-serif mb-4">
                            <span className="text-xl font-bold text-amber-400">KB!</span>
                            <span className="text-xl font-semibold">Teutonia</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Die älteste Burschenschaft an einer technischen Universität in Deutschland.
                            Gegründet am 10. Oktober 1843.
                        </p>
                        {/* Color Swatches */}
                        <div className="flex gap-2 mt-4">
                            <span className="w-6 h-6 rounded-full bg-red-800" title="Rot" />
                            <span className="w-6 h-6 rounded-full bg-amber-500" title="Gold" />
                            <span className="w-6 h-6 rounded-full bg-gray-900 border border-gray-700" title="Schwarz" />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold text-amber-400 mb-4 text-sm uppercase tracking-wider">
                            Navigation
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="font-semibold text-amber-400 mb-4 text-sm uppercase tracking-wider">
                            Gemeinschaft
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.community.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-amber-400 mb-4 text-sm uppercase tracking-wider">
                            Kontakt
                        </h3>
                        <address className="text-gray-400 text-sm not-italic space-y-2">
                            <p>Karlsruher Burschenschaft Teutonia</p>
                            <p>Schützenstraße 30</p>
                            <p>76137 Karlsruhe</p>
                            <p className="pt-2">
                                <a
                                    href="mailto:senior@teutonia-karlsruhe.de"
                                    className="hover:text-amber-400 transition-colors"
                                >
                                    senior@teutonia-karlsruhe.de
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Karlsruher Burschenschaft Teutonia. Alle Rechte vorbehalten.
                    </p>

                    {/* Version Badge */}
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full text-amber-400 font-mono text-xs">
                            v{version}
                        </span>

                        {/* Legal Links */}
                        <div className="flex gap-4">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-500 hover:text-gray-300 transition-colors text-xs"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
