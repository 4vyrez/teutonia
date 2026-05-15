import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { JsonLd } from '@/components/primitives/json-ld';
import { defaultMetadata, buildLocalBusinessJsonLd } from '@/lib/seo';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: '#1a1410',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={buildLocalBusinessJsonLd()} />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            classNames: {
              toast:
                'rounded-md border border-[oklch(0.945_0.012_82/22%)] bg-[oklch(0.145_0.013_45)] text-[oklch(0.945_0.012_82)]',
              title: 'font-display',
              description: 'text-[oklch(0.74_0.018_70)]',
            },
          }}
        />
      </body>
    </html>
  );
}
