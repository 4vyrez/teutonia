import Image from 'next/image';
import { Eyebrow, Section } from '@/components/primitives/section';
import { Reveal } from '@/hooks/use-reveal';

/* ── Bildtafel-Daten ── verbatim aus design_reference/home-top.jsx → UnsereZimmer.plates
 * (assets/ → /haus/). Vier Aufnahmen: Bild, Tafel-Nr., Label, Etage, Fakten, Beschreibung. */
type PlateData = {
  tafel: string;
  src: string;
  label: string;
  floor: string;
  facts: readonly string[];
  desc: string;
};

const plates = [
  {
    tafel: '01',
    src: '/haus/haus-lernen.jpg',
    label: 'Das Zimmer',
    floor: '1.–4. Etage',
    facts: ['~17 m²', 'eigenes Bad', 'möbliert'],
    desc: 'Schreibtisch, Bett, Schrank, eigenes Bad mit Dusche. Du ziehst ein, nicht um. Schlüssel gibt es am ersten Tag.',
  },
  {
    tafel: '02',
    src: '/haus/lernen.jpg',
    label: 'Lernzimmer',
    floor: '2. Etage',
    facts: ['24/7 offen', '8 Plätze', 'Ruhe'],
    desc: 'Wer hier um zwei Uhr nachts sitzt, ist nicht allein. Klausurphasen werden gemeinsam überstanden.',
  },
  {
    tafel: '03',
    src: '/haus/haus-leben.jpeg',
    label: 'Bar & Kneipsaal',
    floor: 'Erdgeschoss',
    facts: ['selbst betrieben', 'kein Kommerz', 'Stammtisch'],
    desc: 'Treffpunkt nach dem Abendessen. Hier schauen die meisten Gäste zum ersten Mal rein.',
  },
  {
    tafel: '04',
    src: '/haus/leben.jpeg',
    label: 'Speisesaal',
    floor: 'je pro 2 Etagen',
    facts: ['voll ausgestattet', 'lange Tische', 'gemeinsame Küche'],
    desc: 'Gemeinsames Abendessen ab 19 Uhr. Niemand muss kommen — fast alle kommen.',
  },
] as const satisfies readonly PlateData[];

const AVAILABLE_ROOMS = 3;

/* 20 stabile Segment-IDs für den Zimmerstatus-Balken (fixe Länge, nie umsortiert). */
const ROOM_SEGMENTS = Array.from({ length: 20 }, (_, i) => `room-${i}`);

/* ── PlateBig ── große Fotoplatte, min-height 520, dunkler Verlauf unten,
 * Grain-Overlay, Tafel-Label oben, kursiver Titel + Beschreibung + Gold-Chips. */
function PlateBig({ tafel, src, label, floor, facts, desc }: PlateData) {
  return (
    <figure className="relative m-0 min-h-[520px] overflow-hidden rounded-[4px] border border-border-strong">
      <Image
        src={src}
        alt={label}
        fill
        sizes="(min-width: 900px) 62vw, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(20,12,8,0.08)_30%,_rgba(12,8,6,0.88)_100%)]"
      />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-x-[22px] top-[22px] flex items-baseline justify-between">
        <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.32em] text-[oklch(0.96_0.003_265_/_90%)]">
          <span className="h-px w-[18px] bg-couleur-gold" />
          Tafel {tafel}
        </span>
        <span className="font-display text-[13px] italic text-[oklch(0.86_0.003_265_/_85%)] [font-variation-settings:'opsz'_24,'SOFT'_80]">
          {floor}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-[clamp(24px,3vw,36px)]">
        <div className="font-display text-[clamp(28px,3.4vw,44px)] italic leading-[1.05] tracking-[-0.018em] text-[oklch(0.97_0.003_265)] [font-variation-settings:'opsz'_96,'SOFT'_80]">
          {label}
        </div>
        <p className="mt-[14px] max-w-[480px] text-[14.5px] leading-[1.65] text-[oklch(0.86_0.003_265)]">
          {desc}
        </p>
        <div className="mt-5 flex flex-wrap gap-5">
          {facts.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-couleur-gold"
            >
              <span className="h-1 w-1 rounded-full bg-couleur-gold" />
              {f}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}

/* ── StatusPanel ── Karte „Zimmerstatus", riesige Fraunces-96px-Zahl freier
 * Zimmer, 20-Segment-Balken (belegt vs. frei), CTA „Zimmer anfragen → #kontakt". */
function StatusPanel({ available }: { available: number }) {
  return (
    <aside className="relative flex flex-col gap-[22px] overflow-hidden rounded-[4px] border border-border-strong bg-background-elev p-[clamp(24px,2.5vw,32px)]">
      {/* gold corner accent */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-[60px] w-[60px] opacity-[0.18] bg-[linear-gradient(135deg,_var(--couleur-gold)_50%,_transparent_50%)]"
      />

      <div className="relative">
        <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-couleur-burgund">
          Zimmerstatus
        </div>
      </div>

      <div className="relative flex items-baseline gap-4">
        <span className="font-display tabnum text-[96px] font-light leading-[0.88] tracking-[-0.05em] text-foreground [font-variation-settings:'opsz'_144,'SOFT'_0,'WONK'_0]">
          {available}
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="text-[14.5px] text-foreground">freie Zimmer</span>
          <span className="text-xs text-foreground-muted">noch zu vergeben</span>
        </div>
      </div>

      <div>
        <div className="flex h-2 gap-[3px]">
          {ROOM_SEGMENTS.map((id, j) => (
            <div
              key={id}
              className="flex-1 rounded-[1px]"
              style={{
                background: j < available ? 'var(--couleur-burgund)' : 'var(--border-strong)',
              }}
            />
          ))}
        </div>
        <div className="mt-2.5 flex justify-between text-[9.5px] uppercase tracking-[0.22em] text-foreground-dim">
          <span className="text-couleur-burgund">{available} frei</span>
          <span>{20 - available} bewohnt · 20 ges.</span>
        </div>
      </div>

      <a href="#kontakt" className="btn btn-primary w-full">
        Zimmer anfragen <span className="arrow">↗</span>
      </a>
    </aside>
  );
}

/* ── Plate ── kleinere Fotoplatte, aspect 4/5. Pure-CSS-Hover: hebt −3px +
 * Gold-Border (group/transition → Server Component, kein "use client"). */
function Plate({ tafel, src, label, floor }: PlateData) {
  return (
    <figure className="m-0 overflow-hidden rounded-[4px] border border-border-strong bg-background-elev transition-[transform,border-color] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-[3px] hover:border-couleur-gold-dim motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative overflow-hidden">
        <div className="relative aspect-[4/5]">
          <Image
            src={src}
            alt={label}
            fill
            sizes="(min-width: 900px) 30vw, 100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_55%,_rgba(15,10,8,0.78)_100%)]"
        />
        <div className="grain absolute inset-0" />
        <div className="absolute left-[14px] top-[14px] text-[9px] uppercase tracking-[0.3em] text-[oklch(0.96_0.003_265_/_90%)]">
          Tafel {tafel}
        </div>
        <div className="absolute inset-x-[14px] bottom-[14px] flex items-end justify-between gap-2.5">
          <span className="font-display text-[19px] italic leading-[1.1] text-[oklch(0.97_0.003_265)] [font-variation-settings:'opsz'_36,'SOFT'_80]">
            {label}
          </span>
          <span className="shrink-0 text-right text-[9px] uppercase tracking-[0.22em] text-[oklch(0.82_0.003_265_/_80%)]">
            {floor}
          </span>
        </div>
      </div>
    </figure>
  );
}

/* ── Unsere Zimmer ── Magazin-„Bildtafel" aus vier Fotoplatten + Status-Panel.
 * design_reference/home-top.jsx → UnsereZimmer. id="zimmer", theme light, veil. */
export function Zimmer() {
  const hero = plates[0];
  const rest = plates.slice(1);

  return (
    <Section id="zimmer" theme="light" veil>
      {/* Header */}
      <Reveal className="mb-12 grid items-end gap-14 [grid-template-columns:minmax(0,7fr)_minmax(0,5fr)] max-lg:grid-cols-1">
        <div>
          <Eyebrow>02 — Unsere Zimmer</Eyebrow>
          <h2 className="font-display mt-7 text-balance text-[clamp(2rem,4.6vw,3.5rem)] font-light leading-[1.02] tracking-[-0.024em] text-foreground [font-variation-settings:'opsz'_72,'SOFT'_50]">
            Das Haus, <span className="italic-gold">von innen.</span>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-[14px]">
          <span className="text-[10px] uppercase tracking-[0.3em] text-couleur-burgund">
            Bildtafel · vier Aufnahmen
          </span>
          <p className="text-[14.5px] leading-[1.7] text-foreground-muted">
            Vier Räume, eine Adresse. Jeder Raum hat seine Routine — das Lernzimmer wird nachts
            voll, die Bar nach dem Abendessen, die Küche zur Klausurzeit zum Lazarett.
          </p>
        </div>
      </Reveal>

      {/* Hero row: big plate + status panel */}
      <Reveal
        delay={1}
        className="mb-[clamp(20px,2vw,28px)] grid gap-[clamp(20px,2vw,28px)] [grid-template-columns:minmax(0,8fr)_minmax(0,4fr)] max-lg:grid-cols-1"
      >
        <PlateBig {...hero} />
        <StatusPanel available={AVAILABLE_ROOMS} />
      </Reveal>

      {/* Secondary plates row */}
      <Reveal delay={2} className="grid grid-cols-3 gap-[clamp(20px,2vw,28px)] max-lg:grid-cols-1">
        {rest.map((p) => (
          <Plate key={p.tafel} {...p} />
        ))}
      </Reveal>

      {/* Footnote strip */}
      <Reveal
        delay={3}
        className="mt-12 flex flex-wrap items-baseline justify-between gap-6 border-t border-border-strong pt-6"
      >
        <div className="text-[11px] tracking-[0.06em] text-foreground-dim">
          Alle Aufnahmen im Haus Parkstraße 1 · Wintersemester 2026 / 27
        </div>
        <div className="flex items-baseline gap-[18px]">
          <span className="text-[11px] text-foreground-muted">Lust auf eine Hausführung?</span>
          <a href="#kontakt" className="btn btn-ghost sm">
            Schnupperabend <span className="arrow">↗</span>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
