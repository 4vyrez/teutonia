import { Section, Eyebrow } from '@/components/primitives/section';
import { Caption } from '@/components/primitives/caption';
import { LagePins, type MapPin } from './lage-pin';

/**
 * Pin positions projected from real WGS84 onto the SVG map bounds.
 *   Center: 49.0130 N, 8.4172 E (offset west of Parkstraße 1)
 *   Bounds: NW (49.02346, 8.40454) — SE (49.00545, 8.43201)
 *   Image:  1280×1280 px SVG, rendered from OSM Overpass vector data,
 *           neutral Apple-grey palette (no buildings, no labels).
 *
 * Pins are interactive client components — hover/focus/tap reveals a
 * popover with a one-line story per location. Tram pin removed (closer
 * stops exist; full transit info lives in the distance list to the left).
 */
const pins: MapPin[] = [
  {
    id: 'parkstrasse',
    label: 'Parkstraße 1',
    headline: 'Dein Zuhause.',
    body: '20 Zimmer mit eigenem Bad, Bibliothek, Bar, Lernzimmer. Vorn die Universität, hinten der Hardtwald.',
    x: 66.1,
    y: 49.8,
    primary: true,
    side: 'left',
  },
  {
    id: 'kit-haupt',
    label: 'KIT Hauptbau',
    headline: 'Audimax & Hörsäle.',
    body: 'Wo die Vorlesungen sind. Fünf Minuten zu Fuß durch den Schlossgarten.',
    x: 25.7,
    y: 77.7,
    side: 'above',
  },
  {
    id: 'kit-bib',
    label: 'KIT-Bibliothek',
    headline: '24 / 7 Lernen.',
    body: 'Universitätsbibliothek, durchgehend geöffnet. Sieben Minuten zu Fuß.',
    x: 43.1,
    y: 68.4,
    side: 'left',
  },
  {
    id: 'info-bib',
    label: 'Informatik-Bib',
    headline: 'Spezialbibliothek.',
    body: 'Im Informatikbau am Fasanengarten. Zwei Minuten von der Haustür.',
    x: 54.3,
    y: 51.9,
    side: 'right',
  },
  {
    id: 'hardtwald',
    label: 'Hardtwald',
    headline: 'Direkt hinterm Haus.',
    body: 'Lauf- und Spazierrevier. Die ersten 200 Meter sind quasi dein Vorgarten.',
    x: 49.0,
    y: 19.2,
    side: 'below',
  },
];

const distances = [
  { place: 'Informatik-Bibliothek', time: '2 min', mode: 'zu Fuß' },
  { place: 'KIT Hauptcampus', time: '5 min', mode: 'zu Fuß' },
  { place: 'Universitätsbibliothek (24 / 7)', time: '7 min', mode: 'zu Fuß' },
  { place: 'Nächste Tram-Haltestelle', time: '3 min', mode: 'zu Fuß' },
  { place: 'Marktplatz', time: '9 min', mode: 'Tram' },
  { place: 'Hardtwald', time: '0 min', mode: 'direkt hinten' },
];

export function Lage() {
  return (
    <Section
      id="lage"
      theme="light"
      className="border-y border-border bg-background-veil"
    >
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>04 — Lage</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] text-foreground">
            Karlsruhe konzentriert sich{' '}
            <span className="italic text-couleur-gold-dim">um diese Ecke.</span>
          </h2>
          <p className="mt-8 max-w-prose text-pretty text-base leading-relaxed text-foreground-muted">
            Parkstraße 1 ist die kürzeste Verbindung zwischen Hörsaal,
            Bibliothek und Wald. Was im Studium zählt, erreichst du zu Fuß.
            Was die Tram dazu bringt, kommt obendrauf.
          </p>

          <dl className="mt-10 divide-y divide-border">
            {distances.map((d) => (
              <div
                key={d.place}
                className="flex items-baseline justify-between gap-4 py-3.5"
              >
                <dt className="text-sm text-foreground-muted">{d.place}</dt>
                <dd className="flex items-baseline gap-2 font-display tabular-nums text-couleur-burgund">
                  <span className="text-lg">{d.time}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-foreground-dim">
                    {d.mode}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <figure className="relative overflow-hidden rounded-lg border border-border-strong bg-background-elev shadow-[0_12px_40px_oklch(0.18_0.006_265/10%)]">
            <div className="relative aspect-square">
              {/* biome-ignore lint/performance/noImgElement: SVG vector map, no next/image optimization needed */}
              <img
                src="/lage/karlsruhe-light.svg"
                alt="Karte: Parkstraße 1 zwischen KIT-Campus, Hardtwald und Innenstadt"
                width={1280}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />

              {/* Interactive pin layer */}
              <LagePins pins={pins} />
            </div>
          </figure>
          <Caption number="Tafel 02.">
            Karte auf Basis von OpenStreetMap-Daten — etwa 1,25 km Bildbreite.
            Tippe oder fahre über einen Pin, um zu sehen, was dort passiert.
          </Caption>
        </div>
      </div>
    </Section>
  );
}
