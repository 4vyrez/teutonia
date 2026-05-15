'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Wappen } from '@/components/primitives/wappen';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site-config';

export function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const update = () => {
      // Switch when scrolled past 85% of the first viewport (~ end of Hero)
      setSolid(window.scrollY > window.innerHeight * 0.85);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
    };
  }, []);

  return (
    <header
      data-theme={solid ? 'light' : 'dark'}
      className={cn(
        'fixed inset-x-0 top-0 z-30',
        'transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300',
        solid
          ? 'bg-background/85 backdrop-blur-md border-b border-border shadow-[0_1px_0_oklch(0.22_0.014_45/8%)]'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label="KB! Teutonia — Startseite"
          className="group flex items-center gap-3"
        >
          <Wappen className="h-8 w-auto transition-opacity group-hover:opacity-90" />
          <div className="hidden sm:block">
            <div className="font-display text-base leading-none text-foreground">
              KB! Teutonia
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-couleur-gold-dim">
              Karlsruhe · seit 1843
            </div>
          </div>
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`${siteConfig.appUrl}/sign-in`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-xs font-medium tracking-wide text-foreground transition-colors hover:border-couleur-gold-dim hover:text-couleur-gold"
        >
          Mitgliederbereich
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </a>
      </div>
    </header>
  );
}
