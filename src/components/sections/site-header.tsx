import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Wappen } from '@/components/primitives/wappen';
import { siteConfig } from '@/lib/site-config';

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-8 lg:px-12">
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
