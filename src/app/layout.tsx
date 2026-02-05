import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { HudOverlay } from '@/components/layout/hud-overlay';
import { CommandMenu } from '@/components/layout/command-menu';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: 'KB! Teutonia | Karlsruher Burschenschaft seit 1843',
    template: '%s | KB! Teutonia',
  },
  description:
    'Karlsruher Burschenschaft Teutonia - Gegründet 1843. Die älteste Burschenschaft an einer technischen Universität. Ca. 20 Studenten und 170 Alumni am KIT.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'KB! Teutonia',
    description: 'Karlsruher Burschenschaft seit 1843',
    type: 'website',
    locale: 'de_DE',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans bg-white text-gray-900">
        <HudOverlay />
        <CommandMenu />
        <ScrollToTop />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
