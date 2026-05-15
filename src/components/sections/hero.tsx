import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Stat } from '@/components/primitives/stat';
import { GoldRule } from '@/components/primitives/gold-rule';
import { siteConfig } from '@/lib/site-config';

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-background"
    >
      {/* Layered atmospheric backdrop — no glass, no AI-blob */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Subtle gold light from upper-right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.78_0.14_78_/_8%)_0%,_transparent_55%)]" />
        {/* Burgund glow bottom-left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.42_0.16_22_/_18%)_0%,_transparent_60%)]" />
        {/* Editorial grain */}
        <div className="grain absolute inset-0" />
        {/* Vertical hairlines as editorial rhythm */}
        <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-border lg:block" />
        <div className="absolute inset-y-0 right-1/4 hidden w-px bg-border xl:block" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-6 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-couleur-gold-dim">
          <span aria-hidden className="h-px w-10 bg-couleur-gold-dim" />
          <span>Karlsruher Burschenschaft · Parkstraße 1</span>
        </div>

        {/* Headline */}
        <div className="mt-10 flex flex-1 flex-col">
          <h1 className="font-display max-w-5xl text-balance text-[clamp(2.75rem,7vw,5.75rem)] font-light leading-[1.02] tracking-tight text-foreground">
            Mehr als ein Zimmer.{' '}
            <span className="block italic text-couleur-gold-dim">
              Eine Lerngemeinschaft seit 1843.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-foreground-muted sm:text-lg">
            20 möblierte Zimmer mit eigenem Bad, fünf Minuten zum KIT.
            Bibliothek, Bar, Lernzimmer — und eine Generation Studierender,
            die seit 165 Jahren weitergibt, was hier funktioniert.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#kontakt"
              className="group inline-flex h-12 items-center gap-2 bg-couleur-burgund px-7 text-sm font-medium text-primary-foreground shadow-[0_1px_0_oklch(1_0_0/8%)_inset,0_8px_24px_-12px_oklch(0.42_0.16_22/65%)] transition-colors hover:bg-couleur-burgund-hi focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Schnupperabend besuchen
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#haus"
              className="group inline-flex h-12 items-center gap-2 border border-border-strong px-7 text-sm font-medium text-foreground transition-colors hover:border-couleur-gold-dim hover:text-couleur-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Zimmer ansehen
              <ArrowDownRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Stat-Bar — concrete numbers */}
        <div className="mt-20 pb-12 sm:mt-28">
          <GoldRule />
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            <Stat
              value={siteConfig.facts.rooms}
              label="Zimmer im Haus"
            />
            <Stat
              value={`ab ${siteConfig.facts.rentEur}`}
              unit="€/M"
              label="Miete · warm"
            />
            <Stat
              value={siteConfig.facts.roomSizeSqm}
              unit="m²"
              label="Möbliert · eigenes Bad"
            />
            <Stat
              value={siteConfig.facts.walkUniMin}
              unit="min"
              label="zu Fuß zum KIT"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
