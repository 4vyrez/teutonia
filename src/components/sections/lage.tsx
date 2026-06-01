import { Eyebrow, Section } from '@/components/primitives/section';
import { Reveal } from '@/hooks/use-reveal';
import { LagePins, type MapPin } from './lage-pin';

/**
 * Pin positions projected from real WGS84 onto the SVG map bounds.
 *   Center: 49.0130 N, 8.4172 E (offset west of Parkstraße 1)
 *   Bounds: NW (49.02346, 8.40454) — SE (49.00545, 8.43201)
 *   Image:  1280×1280 px SVG, OSM Overpass vector data, Editorial palette.
 *
 * Coordinates geocoded via Nominatim (places) and Overpass railway=tram_stop
 * (tram). All x/y values are computed from the real lat/lon via:
 *   x% = (lon - nw_lon) / (se_lon - nw_lon) * 100
 *   y% = (lat - nw_lat) / (se_lat - nw_lat) * 100
 *
 * Coordinates, copy and sides match design_reference/home-bottom.jsx (Lage).
 */
const pins: MapPin[] = [
  {
    id: 'parkstrasse',
    label: 'Parkstraße 1',
    headline: 'Dein Zuhause.',
    body: '20 Zimmer mit eigenem Bad, Bibliothek, Bar, Lernzimmer.',
    x: 66.1,
    y: 49.8,
    kind: 'primary',
    side: 'left',
  },
  {
    id: 'audimax',
    label: 'Audimax',
    headline: 'Hörsäle & Vorlesungen.',
    body: 'Das größte Auditorium der Uni — fünf Minuten durch den Schlossgarten.',
    x: 40.3,
    y: 59.2,
    kind: 'place',
    side: 'left',
  },
  {
    id: 'kit-bib',
    label: 'KIT-Bibliothek',
    headline: '24 / 7 Lernen.',
    body: 'Universitätsbibliothek, durchgehend geöffnet. Sieben Minuten zu Fuß.',
    x: 43.1,
    y: 68.4,
    kind: 'place',
    side: 'left',
  },
  {
    id: 'hardtwald',
    label: 'Hardtwald',
    headline: 'Direkt hinterm Haus.',
    body: 'Lauf- und Spazierrevier. Die ersten 200 Meter sind quasi dein Vorgarten.',
    x: 49.0,
    y: 28.1,
    kind: 'place',
    side: 'right',
  },
  {
    id: 'tram-kwp',
    label: 'Karl-Wilhelm-Platz',
    headline: 'Tram um die Ecke.',
    body: 'Nächste Haltestelle. Linien 4 & 5 treffen die Stadt direkt.',
    x: 67.9,
    y: 67.5,
    kind: 'tram',
    side: 'right',
  },
  {
    id: 'tram-dt',
    label: 'Durlacher Tor',
    headline: 'Verkehrsknoten.',
    body: 'Zum KIT-Campus Süd und in den Rest der Stadt. Linien 1·2·4·S2·S5.',
    x: 45.8,
    y: 80.7,
    kind: 'tram',
    side: 'left',
  },
];

const distances = [
  { place: 'Karl-Wilhelm-Platz · Tram 4/5', time: '3 min' },
  { place: 'Audimax & Hörsäle', time: '5 min' },
  { place: 'Durlacher Tor · Tram-Knoten', time: '6 min' },
  { place: 'Universitätsbibliothek · 24/7', time: '7 min' },
  { place: 'Hardtwald', time: 'direkt' },
];

export function Lage() {
  return (
    <Section id="lage" theme="light" veil>
      <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal>
          <Eyebrow>04 — Lage</Eyebrow>
          <h2 className="font-display mt-7 text-balance text-[clamp(2rem,4.6vw,3.5rem)] font-light leading-[1.05] text-foreground [font-variation-settings:_'opsz'_72,_'SOFT'_50]">
            Karlsruhe konzentriert sich <span className="italic-gold">um diese Ecke.</span>
          </h2>
          <p className="mt-7 max-w-[480px] text-pretty text-base leading-[1.75] text-foreground-muted">
            Parkstraße 1 ist die kürzeste Verbindung zwischen Hörsaal, Bibliothek und Wald. Was im
            Studium zählt, erreichst du zu Fuß. Was die Tram dazu bringt, kommt obendrauf.
          </p>

          <dl className="mt-9">
            {distances.map((d, i) => (
              <div
                key={d.place}
                className={
                  i < distances.length - 1
                    ? 'flex items-baseline justify-between gap-4 border-b border-border py-4'
                    : 'flex items-baseline justify-between gap-4 py-4'
                }
              >
                <dt className="text-sm text-foreground-muted">{d.place}</dt>
                <dd className="font-display tabnum text-[19px] text-couleur-burgund [font-variation-settings:_'opsz'_36]">
                  {d.time}
                </dd>
              </div>
            ))}
          </dl>

          {/* Address card */}
          <div className="mt-7 rounded-[14px] border border-border bg-background-elev p-5">
            <div className="text-[10px] uppercase tracking-[0.26em] text-couleur-burgund">
              Adresse
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="font-display text-[21px] text-foreground [font-variation-settings:_'opsz'_36,_'SOFT'_30]">
                  Parkstraße 1
                </div>
                <div className="mt-1 text-[13px] text-foreground-muted">76131 Karlsruhe</div>
              </div>
              <a
                href="https://maps.google.com/?q=Parkstraße+1,+76131+Karlsruhe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-[0.18em] text-couleur-burgund"
              >
                In Karten öffnen ↗
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1}>
          {/* Interactive map */}
          <figure className="relative overflow-hidden rounded-2xl border border-border-strong bg-background-elev shadow-[0_14px_50px_-22px_oklch(0.18_0.006_265/28%)]">
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

              {/* Scale label */}
              <div className="absolute bottom-3.5 left-3.5 z-[4] flex items-center gap-2 rounded-full bg-[oklch(1_0_0/80%)] px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                <span aria-hidden className="inline-block h-px w-7 bg-foreground-muted" />
                <span>≈ 250 m</span>
              </div>
            </div>
          </figure>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap items-center gap-7 text-[11px] text-foreground-muted">
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-couleur-burgund" />
              KB! Teutonia
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-foreground" />
              KIT-Standorte
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-couleur-gold" />
              Tram-Haltestellen
            </span>
            <span className="ml-auto text-[10px] text-foreground-dim">
              Karte · OpenStreetMap · ≈ 1,25 km Breite
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
