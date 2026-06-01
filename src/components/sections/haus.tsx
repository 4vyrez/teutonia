import Image from 'next/image';
import { PullQuote } from '@/components/primitives/pull-quote';
import { Eyebrow, Section } from '@/components/primitives/section';
import { Reveal } from '@/hooks/use-reveal';

/* Hausakte — Inventar-Tabelle (design_reference/home-top.jsx → Haus.inventar) */
const inventar = [
  { k: 'Adresse', v: 'Parkstraße 1 · 76131 Karlsruhe' },
  { k: 'Baujahr', v: '1907 — Gründerzeitvilla' },
  { k: 'Etagen', v: 'Vier · plus Kneipsaal & Salon' },
  { k: 'Zimmer', v: '20 · möbliert · ca. 17 m²' },
  { k: 'Eigenes Bad', v: 'WC + Dusche · eigener Schlüssel' },
  { k: 'Küchen', v: 'Zwei · voll ausgestattet' },
  { k: 'Lernzimmer', v: '24 / 7 geöffnet · 8 Plätze' },
  { k: 'Bibliothek', v: 'Eigene Hausbibliothek' },
  { k: 'Bar & Salon', v: 'Erdgeschoss · selbst betrieben' },
  { k: 'Internet', v: 'Eigener Anschluss pro Zimmer' },
  { k: 'Warmmiete', v: 'ab 280 €/Monat · inkl. alles' },
  { k: 'Schnupperabend', v: 'Jeden Mittwoch · 19 Uhr' },
];

const strip = [
  { src: '/haus/haus-lernen.jpg', tafel: '02', cap: 'Lesesaal · 1. Etage' },
  { src: '/haus/haus-leben.jpeg', tafel: '03', cap: 'Kneipsaal · Erdgeschoss' },
] as const;

export function Haus() {
  return (
    <Section id="haus" theme="light">
      <div className="grid items-start gap-[clamp(48px,6vw,96px)] [grid-template-columns:minmax(0,7fr)_minmax(0,5fr)] max-lg:grid-cols-1">
        {/* LEFT — Photo collage */}
        <div className="relative">
          {/* big photo */}
          <Reveal
            as="figure"
            className="relative m-0 overflow-hidden rounded-[4px] border border-border-strong"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/haus/haus-gemeinsam.jpg"
                alt="Bundesbrüder auf dem Wandertag"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(20,12,8,0.10)_0%,_transparent_30%,_rgba(20,12,8,0.60)_100%)]"
            />
            <div className="grain absolute inset-0" />
            <div className="absolute left-[18px] top-[18px] flex items-center gap-2 text-[9px] uppercase tracking-[0.32em] text-[oklch(0.96_0.003_265_/_90%)]">
              <span className="h-px w-4 bg-couleur-gold" />
              Tafel 01 — Hauptansicht
            </div>
            <div className="absolute inset-x-[22px] bottom-[22px] flex items-end justify-between gap-4">
              <span className="font-display text-[clamp(16px,1.7vw,22px)] italic leading-[1.25] text-[oklch(0.97_0.003_265)] [font-variation-settings:'opsz'_36,'SOFT'_80]">
                „Ein Tag draußen — und nebenbei lernt man, mit wem man studiert.“
              </span>
              <span className="whitespace-nowrap text-right text-[9px] uppercase tracking-[0.22em] text-[oklch(0.85_0.003_265_/_78%)]">
                Wandertag
                <br />
                Schwarzwald
              </span>
            </div>
          </Reveal>

          {/* secondary photo strip */}
          <Reveal delay={1} className="mt-[14px] grid grid-cols-2 gap-[14px]">
            {strip.map((p) => (
              <figure
                key={p.tafel}
                className="relative m-0 overflow-hidden rounded-[4px] border border-border"
              >
                <div className="relative aspect-square">
                  <Image
                    src={p.src}
                    alt={p.cap}
                    fill
                    sizes="(min-width: 1024px) 29vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_55%,_rgba(15,10,8,0.78)_100%)]"
                />
                <div className="grain absolute inset-0" />
                <div className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.3em] text-[oklch(0.96_0.003_265_/_88%)]">
                  Tafel {p.tafel}
                </div>
                <div className="absolute inset-x-3 bottom-3">
                  <span className="font-display text-[13px] italic text-[oklch(0.97_0.003_265)]">
                    {p.cap}
                  </span>
                </div>
              </figure>
            ))}
          </Reveal>

          {/* Address annotation card */}
          <Reveal
            delay={2}
            className="mt-7 grid grid-cols-[1fr_auto] items-center gap-6 rounded-[4px] border border-border-strong bg-background-elev px-6 py-5"
          >
            <div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-couleur-burgund">
                Anschrift
              </div>
              <div className="font-display mt-1.5 text-lg leading-[1.4] text-foreground [font-variation-settings:'opsz'_36,'SOFT'_30]">
                Parkstraße 1 · 76131 Karlsruhe
              </div>
              <div className="mt-1 text-xs text-foreground-muted">
                5 min zu Fuß zum KIT-Audimax · 12 min zum Schloss
              </div>
            </div>
            <a href="#lage" className="btn btn-ghost sm">
              Lage ansehen
              <span className="arrow arrow-down">↓</span>
            </a>
          </Reveal>
        </div>

        {/* RIGHT — Text + Hausakte */}
        <Reveal delay={1} className="lg:sticky lg:top-[100px]">
          <Eyebrow>01 — Das Haus</Eyebrow>
          <h2 className="font-display mt-7 text-balance text-[clamp(2rem,4.6vw,3.5rem)] font-light leading-[1.02] tracking-[-0.024em] text-foreground [font-variation-settings:'opsz'_72,'SOFT'_50]">
            Wohnen, wo Karlsruhe <span className="italic-gold">am leisesten ist.</span>
          </h2>
          <p className="mt-7 max-w-[480px] text-base leading-[1.78] text-foreground-muted">
            Eine Gründerzeitvilla aus 1907, zwischen Hardtwald und Universität. Vorn die Hörsäle,
            hinten die Kiefern. Im Haus wohnen 20 Studierende auf vier Etagen — möbliert, mit
            eigenem Bad, mit Internet, das tatsächlich funktioniert.
          </p>

          {/* Hausakte data table */}
          <div className="mt-10">
            <div
              className="mb-1 flex items-baseline justify-between border-b pb-2.5"
              style={{ borderColor: 'var(--couleur-gold-dim)' }}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-couleur-burgund">
                Hausakte
              </span>
              <span className="font-display text-xs italic text-couleur-gold [font-variation-settings:'opsz'_24,'SOFT'_80]">
                Stand · WS 26/27
              </span>
            </div>
            <dl className="text-[13px] leading-[1.5]">
              {inventar.map((row, i) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[125px_1fr] gap-[14px] py-[11px]"
                  style={{
                    borderBottom:
                      i < inventar.length - 1
                        ? '1px dashed var(--border)'
                        : '1px solid var(--border-strong)',
                  }}
                >
                  <dt className="pt-[3px] text-[9.5px] font-medium uppercase tracking-[0.24em] text-foreground-dim">
                    {row.k}
                  </dt>
                  <dd className="text-foreground">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <PullQuote source="280 € Warmmiete · Parkstraße 1">
            Du wohnst hier nicht günstiger als im Wohnheim — du wohnst mit Mitbewohnern, die schon
            wissen, wie die Klausur abläuft.
          </PullQuote>

          <div className="mt-9">
            <a href="#zimmer" className="btn btn-primary">
              Die Zimmer im Detail <span className="arrow arrow-down">↓</span>
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
