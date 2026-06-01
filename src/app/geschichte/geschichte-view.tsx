'use client';

import { ArrowDown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Section } from '@/components/primitives/section';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHeader } from '@/components/sections/site-header';
import { Reveal } from '@/hooks/use-reveal';

/* ──────────────────────────────────────────────────────────────────────────
 * Geschichte — Chronik / Timeline (Client-View).
 *
 * 1:1-Port von design_reference/geschichte.html: dunkler Hero (damit der
 * transparente Header lesbar bleibt → SiteHeader liest data-theme der
 * sichtbaren Section) → helle Timeline mit Ären, Lücken-Bars, Punkten auf der
 * Schiene und einem lebenden Endmarker. Werte (px, clamp,
 * font-variation-settings, letter-spacing) verbatim aus der Design-HTML.
 *
 * "use client": IntersectionObserver-Reveals (via <Reveal>), die
 * scroll-getriebene Laser-Schiene (#thread-fill) und der Fortschrittsbalken
 * brauchen JS. prefers-reduced-motion wird respektiert (Reveal-Hook ist dann
 * no-op; Schiene zeigt sich statisch voll; Balken aktualisiert nicht).
 * Metadata bleibt im Server-Sibling page.tsx.
 * ────────────────────────────────────────────────────────────────────────── */

type TLEvent = {
  year: string;
  title: string;
  body: string;
  /** Wegmarke → größerer Punkt + Badge. */
  major?: boolean;
  badge?: boolean;
  /** Kontext-Zeile in Kapitälchen unter dem Text. */
  context?: string;
  /** Gedämpfte Variante (Unterbrechung 1937–1945). */
  dim?: boolean;
};

type Era = {
  index: string;
  span: string;
  name: string;
  tagline: string;
  /** Gedämpfte Ära (Unterbrechung). */
  dim?: boolean;
  events: TLEvent[];
  /** Lücken-Bar nach dieser Ära. */
  gapAfter?: string;
};

const eras: Era[] = [
  {
    index: '01',
    span: '1843–1857',
    name: 'Gründung & Revolution',
    tagline:
      'Erste Burschenschaft an einer technischen Hochschule. Acht Jahre Verbot nach der Revolution von 1848.',
    events: [
      {
        year: '10. Okt. 1843',
        title: 'Gründung',
        major: true,
        badge: true,
        body: 'Teutonia wird gegründet — als erste Burschenschaft an einer technischen Hochschule in Deutschland. Die Couleur orientiert sich an der Jenenser Urburschenschaft von 1815: Rot und Schwarz mit breitem goldenem Vorstoß.',
        context: 'Karlsruher Polytechnikum · Jenenser Urburschenschaft 1815',
      },
      {
        year: '1848 / 49',
        title: 'Revolution',
        major: true,
        badge: true,
        body: 'Mitglieder beteiligen sich aktiv an der bürgerlichen Revolution, kämpfen im badischen Volksheer für eine deutsche Verfassung. Nach deren Scheitern folgt das Verbot der Burschenschaften.',
        context: 'Frankfurter Paulskirche · Friedrich Hecker · Badischer Aufstand',
      },
      {
        year: '1857',
        title: 'Wiedergründung',
        body: 'Nach acht Jahren Verbot wird Teutonia wieder als studentische Verbindung an der Polytechnischen Schule (heute KIT) aufgenommen.',
      },
    ],
    gapAfter: '20 Jahre',
  },
  {
    index: '02',
    span: '1877–1937',
    name: 'Wachstum & Verbund',
    tagline: 'Schwesterverbindungen entstehen. Teutonia wird Teil eines nationalen Netzwerks.',
    events: [
      {
        year: '1877',
        title: 'Burschenschaft Germania',
        body: 'Aus den Reihen Teutonias entsteht eine Schwesterverbindung, die Burschenschaft Germania Karlsruhe.',
      },
      {
        year: '1900',
        title: 'Mitgründer Rüdesheimer DC',
        body: 'Teutonia ist Mitbegründerin des Rüdesheimer Deputierten-Convents — der Verbund der Burschenschaften an technischen Hochschulen.',
      },
      {
        year: 'nach 1918',
        title: 'Deutsche Burschenschaft',
        body: 'Mit Gründung der DB übernimmt Teutonia den zweiten Vorsitz.',
      },
    ],
    gapAfter: '19 Jahre',
  },
  {
    index: '03',
    span: '1937–1950',
    name: 'Unterbrechung',
    dim: true,
    tagline:
      'Zwangsauflösung. Diese Jahre gehören zur Geschichte — sie prägen, warum wir heute die Linie ziehen, die wir ziehen.',
    events: [
      {
        year: '1937–1945',
        title: 'Kameradschaft Egerland',
        major: true,
        dim: true,
        body: 'Wie alle Burschenschaften wird Teutonia zwangsweise aufgelöst. Mitglieder organisieren sich notgedrungen als „Kameradschaft Egerland". Diese Phase gehört zur Geschichte — sie prägt, warum wir heute die politische Linie ziehen, die wir ziehen.',
        context: 'Gleichschaltung · Reichsstudentenführung · NS-Regime',
      },
      {
        year: '1950',
        title: 'Neugründung',
        body: 'Nach der Besatzungszeit wird Teutonia neu gegründet. Der Anschluss an die liberale Vorkriegstradition ist explizit.',
      },
    ],
    gapAfter: '12 Jahre',
  },
  {
    index: '04',
    span: '1962–1990',
    name: 'Neubeginn & Konsolidierung',
    tagline: 'Neues Haus. Neue Regeln. Teutonia zieht selbst die Grenzen.',
    events: [
      {
        year: '1962',
        title: 'Neubau des Hauses',
        body: 'Das heutige Verbindungshaus in der Parkstraße 1 wird bezogen. 20 Zimmer, eigene Bibliothek, direkte Nähe zur Universität.',
      },
      {
        year: '1971',
        title: 'Bestimmungsmensur abgeschafft',
        major: true,
        badge: true,
        body: 'Wir schaffen die Bestimmungsmensur — die Pflichtpartie — ab. Verabredungsmensuren mit befreundeten Korporationen werden seitdem freiwillig gefochten. Den Umgang mit dem Korbschläger lernt allerdings weiterhin jedes Mitglied — als Disziplin, nicht als Probe.',
        context: 'Studentenbewegung 1968 · Gesellschaftsliberalisierung',
      },
      {
        year: '1977',
        title: 'Darmstädter Arbeitskreis',
        body: 'Teutonia ist Gründungsmitglied des Darmstädter Arbeitskreises liberal-konservativer Burschenschaften innerhalb der DB.',
      },
      {
        year: '1990',
        title: 'Liberale Interessengemeinschaft',
        body: 'Kurzlebige liberale Initiative innerhalb der DB. Bereits nach einem Jahr wieder aufgelöst.',
      },
    ],
    gapAfter: '7 Jahre',
  },
  {
    index: '05',
    span: '1997–heute',
    name: 'Klarer Kurs',
    tagline: 'Austritt. Eigenständigkeit. Gründungsmitglied der ADB.',
    events: [
      {
        year: '30. Juni 1997',
        title: 'Hambacher Kreis & DB-Austritt',
        major: true,
        badge: true,
        body: 'Teutonia gründet den Hambacher Kreis mit und tritt zum 30. Juni 1997 aus der Deutschen Burschenschaft aus — als Reaktion auf eine politische Drift im Dachverband, die nicht mehr mit unserer liberalen Tradition vereinbar war.',
        context: 'Berliner Republik · gesellschaftliche Neuorientierung',
      },
      {
        year: '1998',
        title: 'Beitritt zur NDB',
        body: 'Beitritt zur damaligen Alternative — der Neuen Deutschen Burschenschaft (NDB).',
      },
      {
        year: '30. Juni 2011',
        title: 'Austritt aus der NDB',
        major: true,
        badge: true,
        body: 'Auch die NDB verlassen wir wieder, als sich auch dort die Linie verschiebt. Folgejahre: Eigenständigkeit, keine vorschnelle Anbindung.',
      },
      {
        year: '2013',
        title: 'Viererbund',
        body: 'Pragmatischer Verbund mit Germania Braunschweig, Hilaritas Stuttgart und Arminia-Rhenania München. Klein, definiert, nicht ideologisch.',
      },
      {
        year: '2. Okt. 2016',
        title: 'Allgemeine Deutsche Burschenschaft',
        major: true,
        badge: true,
        body: 'Mitgründung der ADB — ein Dachverband mit klar verfassungstreuer, liberaler Linie. Hier sind wir bis heute zuhause.',
      },
    ],
  },
];

const heroStats = [
  { v: '1843', l: 'Gegründet' },
  { v: '183', l: 'Jahre Geschichte' },
  { v: '17', l: 'Schlüsselereignisse' },
];

/* ── Fortschrittsbalken + Laser-Schiene ── scroll-getrieben (rAF). Bei
 * prefers-reduced-motion: Balken bleibt statisch, Schiene zeigt sich voll. */
function useScrollProgress(
  barRef: React.RefObject<HTMLDivElement | null>,
  railRef: React.RefObject<HTMLDivElement | null>,
  fillRef: React.RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      const fill = fillRef.current;
      const rail = railRef.current;
      if (fill && rail) {
        fill.style.height = `${rail.offsetHeight}px`;
        fill.style.opacity = '1';
      }
      return;
    }

    let raf = false;
    const onScroll = () => {
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        raf = false;
        const sy = window.scrollY;
        const dh = document.documentElement.scrollHeight - window.innerHeight;
        const bar = barRef.current;
        if (bar) bar.style.width = `${dh > 0 ? ((sy / dh) * 100).toFixed(2) : 0}%`;

        // Schiene füllt sich bis zur aktuellen Leseposition (Viewport-Mitte).
        const rail = railRef.current;
        const fill = fillRef.current;
        if (rail && fill) {
          const r = rail.getBoundingClientRect();
          const read = window.innerHeight * 0.5;
          const h = Math.max(0, Math.min(rail.offsetHeight, read - r.top));
          fill.style.height = `${h}px`;
          fill.style.opacity = h > 4 ? '1' : '0';
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [barRef, railRef, fillRef]);
}

export function GeschichteView() {
  const barRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useScrollProgress(barRef, railRef, fillRef);

  return (
    <>
      {/* Lokale Keyframes — bob (Scroll-Cue) + live (Endmarker-Puls). Nicht in
          globals.css vorhanden; respektiert prefers-reduced-motion. */}
      <style>{`
        @keyframes geschichte-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(3px)} }
        @keyframes geschichte-live {
          0%,100% { box-shadow:0 0 0 0 oklch(.46 .165 22 / 45%); }
          50%      { box-shadow:0 0 0 8px oklch(.46 .165 22 / 0%); }
        }
        .geschichte-bob  { animation: geschichte-bob 2s ease-in-out infinite; }
        .geschichte-live { animation: geschichte-live 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .geschichte-bob, .geschichte-live { animation: none; }
        }
      `}</style>

      {/* Fortschrittsbalken — fixed, burgund→gold. */}
      <div
        ref={barRef}
        aria-hidden
        className="fixed inset-x-0 top-0 z-[200] h-[2px] w-0 origin-left"
        style={{
          background: 'linear-gradient(90deg, var(--couleur-burgund), var(--couleur-gold))',
          transition: 'width .08s linear',
        }}
      />

      <SiteHeader />

      <main>
        {/* ═══ HERO ═══ — dunkel, damit der transparente Header lesbar bleibt. */}
        <Section
          theme="dark"
          fullBleed
          className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-[1.75rem] pb-[5rem] pt-[8rem]"
        >
          {/* Couleur-Glow oben rechts (gold) + unten links (burgund). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at top right, oklch(.78 .14 78 / 8%) 0%, transparent 55%), radial-gradient(ellipse at bottom left, oklch(.42 .16 22 / 16%) 0%, transparent 60%)',
            }}
          />

          {/* Zurück-Link — oben links, im Header-Bereich fixiert. */}
          <Link
            href="/"
            className="group fixed left-6 top-5 z-[100] inline-flex items-center gap-2 text-[0.625rem] font-medium uppercase tracking-[0.22em] text-foreground-dim transition-colors hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
            />
            Zurück
          </Link>

          <div className="relative mx-auto w-full max-w-[68rem]">
            <div className="eyebrow mb-8">08 — Chronik</div>
            <h1
              className="font-display max-w-[14ch] font-light text-foreground"
              style={{
                fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
                lineHeight: 1.02,
                letterSpacing: '-.022em',
                fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 0",
              }}
            >
              183 Jahre — <em className="italic-gold">eine Linie, die hält.</em>
            </h1>
            <p
              className="mt-7 max-w-[50ch] text-pretty"
              style={{
                fontSize: '1rem',
                lineHeight: 1.75,
                color: 'oklch(0.76 0.004 265)',
              }}
            >
              Hier ist die vollständige Linie. Wir lassen die schwierigen Jahre nicht aus — sie
              gehören dazu und prägen, warum wir heute die politische Position halten, die wir
              halten.
            </p>

            {/* Hero-Kennzahlen. */}
            <div
              className="mt-12 flex flex-wrap gap-12 pt-8"
              style={{ borderTop: '1px solid oklch(0.965 0.003 265 / 14%)' }}
            >
              {heroStats.map((s) => (
                <div key={s.l}>
                  <div
                    className="font-display font-light text-foreground"
                    style={{
                      fontSize: '2.5rem',
                      lineHeight: 1,
                      letterSpacing: '-.025em',
                      fontVariationSettings: "'opsz' 72, 'SOFT' 0, 'WONK' 0",
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="mt-[0.4rem] text-[0.6rem] font-medium uppercase tracking-[0.2em]"
                    style={{ color: 'oklch(0.58 0.004 265)' }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll-Cue. */}
            <div
              className="mt-12 flex items-center gap-3 text-[0.625rem] font-medium uppercase tracking-[0.22em]"
              style={{ color: 'oklch(0.58 0.004 265)' }}
            >
              <span
                aria-hidden
                className="geschichte-bob grid h-[26px] w-[26px] place-items-center rounded-full"
                style={{ border: '1px solid oklch(0.965 0.003 265 / 22%)' }}
              >
                <ArrowDown className="h-[11px] w-[11px]" strokeWidth={1.5} />
              </span>
              Chronik durchblättern
            </div>
          </div>
        </Section>

        {/* ═══ TIMELINE ═══ — hell. */}
        <Section theme="light" fullBleed as="div" className="pb-[8rem] pt-[5rem]">
          <section aria-label="Chronik" className="mx-auto max-w-[56rem] px-[2.5rem]">
            {/* Bühne: [1px Schiene] [2.5rem Gap] [Inhalt]. */}
            <div className="flex items-stretch gap-[2.5rem]">
              {/* Schiene — vertikale Linie + Laser-Trail. */}
              <div ref={railRef} aria-hidden className="relative flex-[0_0_1px]">
                {/* Grundfaden. */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'oklch(0.18 0.006 265 / 9%)' }}
                />
                {/* Laser-Trail: Fenster, Unterkante = Leseposition. */}
                <div
                  ref={fillRef}
                  className="pointer-events-none absolute left-[-0.5px] top-0 z-[1] w-[2px] opacity-0"
                  style={{
                    height: 0,
                    background:
                      'linear-gradient(to bottom, transparent 0%, oklch(0.46 0.165 22 / 8%) 12%, oklch(0.46 0.165 22 / 32%) 45%, oklch(0.55 0.06 70 / 72%) 74%, oklch(0.72 0.11 72 / 95%) 90%, oklch(0.92 0.16 76) 100%)',
                    boxShadow: '0 0 5px 2px oklch(0.65 0.09 70 / 22%)',
                  }}
                />
              </div>

              {/* Inhalt. */}
              <div className="min-w-0 flex-1">
                {eras.map((era, ei) => (
                  <div key={era.index}>
                    {/* Ära-Header. */}
                    <Reveal className={ei === 0 ? 'pb-8' : 'pb-8 pt-[4.5rem]'}>
                      <div
                        className={
                          'eyebrow mb-[0.9rem] gap-[0.625rem] text-[0.625rem] tracking-[0.22em] ' +
                          (era.dim ? 'text-foreground-dim' : '')
                        }
                      >
                        {era.index} — {era.span}
                      </div>
                      <h2
                        className={
                          'font-display font-light ' +
                          (era.dim ? 'text-foreground-muted' : 'text-foreground')
                        }
                        style={{
                          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                          lineHeight: 1.1,
                          letterSpacing: '-.012em',
                          fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 0",
                        }}
                      >
                        {era.name}
                      </h2>
                      <p
                        className="mt-2 max-w-[54ch] text-pretty text-foreground-muted"
                        style={{ fontSize: '0.9375rem' }}
                      >
                        {era.tagline}
                      </p>
                    </Reveal>

                    {/* Events. */}
                    {era.events.map((e) => (
                      <Reveal
                        key={e.year + e.title}
                        className={
                          'relative pb-[2.75rem] [--dot-left:calc(-2.5rem_-_4px)] [--dot-size:8px] [--dot-top:0.35rem] ' +
                          (e.major
                            ? '[--dot-left:calc(-2.5rem_-_5px)] [--dot-size:10px] [--dot-top:0.27rem]'
                            : '')
                        }
                      >
                        {/* Punkt auf der Schiene. */}
                        <span
                          aria-hidden
                          className="absolute z-[2] rounded-full"
                          style={{
                            left: 'var(--dot-left)',
                            top: 'var(--dot-top)',
                            width: 'var(--dot-size)',
                            height: 'var(--dot-size)',
                            background: 'var(--background)',
                            border: '1.5px solid var(--couleur-burgund)',
                          }}
                        />
                        {/* Meta: Jahr + optionale Wegmarke-Badge. */}
                        <div className="mb-[0.45rem] flex flex-wrap items-baseline gap-3">
                          <span
                            className={
                              'font-display ' +
                              (e.dim ? 'text-foreground-dim' : 'text-couleur-burgund')
                            }
                            style={{
                              fontWeight: 400,
                              fontSize: '0.875rem',
                              lineHeight: 1,
                              letterSpacing: '-.01em',
                              fontVariationSettings: "'opsz' 36, 'SOFT' 0",
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            {e.year}
                          </span>
                          {e.badge ? (
                            <span
                              className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-couleur-burgund opacity-75"
                              style={{
                                padding: '.15rem .45rem',
                                border: '1px solid oklch(0.46 0.165 22 / 28%)',
                                borderRadius: '2px',
                              }}
                            >
                              Wegmarke
                            </span>
                          ) : null}
                        </div>
                        <h3
                          className={`font-display ${e.dim ? 'text-foreground-muted' : 'text-foreground'}`}
                          style={{
                            fontWeight: 400,
                            fontSize: '1.125rem',
                            lineHeight: 1.25,
                            letterSpacing: '-.01em',
                            fontVariationSettings: "'opsz' 48, 'SOFT' 50, 'WONK' 0",
                          }}
                        >
                          {e.title}
                        </h3>
                        <p
                          className="mt-[0.45rem] max-w-[56ch] text-pretty text-foreground-muted"
                          style={{ fontSize: '0.9375rem', lineHeight: 1.75 }}
                        >
                          {e.body}
                        </p>
                        {e.context ? (
                          <span
                            className={
                              'mt-[0.7rem] inline-block text-[0.6rem] font-medium uppercase tracking-[0.2em] ' +
                              (e.dim
                                ? 'text-foreground-dim opacity-50'
                                : 'text-couleur-burgund opacity-[0.55]')
                            }
                          >
                            {e.context}
                          </span>
                        ) : null}
                      </Reveal>
                    ))}

                    {/* Lücken-Bar. */}
                    {era.gapAfter ? (
                      <Reveal className="flex items-center gap-4 pb-[0.25rem] pt-[1.5rem]">
                        <span
                          aria-hidden
                          className="h-px flex-1"
                          style={{ background: 'var(--border)' }}
                        />
                        <span className="whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.22em] text-foreground-dim">
                          {era.gapAfter}
                        </span>
                        <span
                          aria-hidden
                          className="h-px flex-1"
                          style={{ background: 'var(--border)' }}
                        />
                      </Reveal>
                    ) : null}
                  </div>
                ))}

                {/* Endmarker — lebender, pulsierender Punkt. */}
                <Reveal className="relative pt-[0.25rem]">
                  <span
                    aria-hidden
                    className="geschichte-live absolute z-[2] rounded-full"
                    style={{
                      left: 'calc(-2.5rem - 5px)',
                      top: '0.25rem',
                      width: '10px',
                      height: '10px',
                      background: 'var(--couleur-burgund)',
                      border: '2px solid var(--background)',
                    }}
                  />
                  <div
                    className="font-display font-light text-couleur-burgund"
                    style={{
                      fontSize: '1.5rem',
                      lineHeight: 1,
                      letterSpacing: '-.02em',
                      fontVariationSettings: "'opsz' 72, 'SOFT' 50, 'WONK' 0",
                    }}
                  >
                    2026
                  </div>
                  <div className="mt-[0.3rem] text-[0.6rem] font-medium uppercase tracking-[0.2em] text-foreground-dim">
                    Heute · Mitglied der ADB
                  </div>
                  <p
                    className="mt-2 max-w-[48ch] text-foreground-muted"
                    style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}
                  >
                    20 Zimmer. 5 Minuten zum KIT. Die Lerngemeinschaft besteht fort.
                  </p>
                </Reveal>
              </div>
            </div>
          </section>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
