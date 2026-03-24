import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { Toaster } from '@teutonia/shared/components/ui/sonner';

import { CommandMenu } from '@/components/layout/command-menu';
import { ScrollToTop } from '@teutonia/shared/components/ui/scroll-to-top';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'KB! Teutonia App',
    template: '%s | KB! Teutonia App',
  },
  description: 'Mitgliederbereich der Karlsruher Burschenschaft Teutonia.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'KB! Teutonia App',
    description: 'Mitgliederbereich der Karlsruher Burschenschaft Teutonia.',
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
    <html lang="de" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground">
        <CommandMenu />
        <ScrollToTop />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
