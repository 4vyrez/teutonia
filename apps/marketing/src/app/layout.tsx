import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { Toaster } from '@teutonia/shared/components/ui/sonner';

import { ScrollToTop } from '@teutonia/shared/components/ui/scroll-to-top';
import { siteMeta } from '@/content/public-site';
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
    default: `${siteMeta.title} | Karlsruher Burschenschaft seit 1843`,
    template: '%s | KB! Teutonia',
  },
  description: siteMeta.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
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
        <ScrollToTop />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
