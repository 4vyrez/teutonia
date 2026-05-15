import { Section, Eyebrow } from '@/components/primitives/section';
import { Caption } from '@/components/primitives/caption';
import { cn } from '@/lib/utils';

/**
 * Pin positions projected from real WGS84 onto the SVG map bounds.
 *   Center: 49.0130 N, 8.4172 E (offset west of Parkstraße 1)
 *   Bounds: NW (49.02346, 8.40454) — SE (49.00545, 8.43201)
 *   Image:  1280×1280 px SVG, rendered from OSM Overpass vector data.
 *           Streets + parks only — no buildings (see scripts/build-map-svg.py).
 *
 * Side-placement keeps labels off each other; primary pin sits right of
 * center so most context (KIT, Bibs, Tram) reads left-to-right toward it.
 */
type PinSide = 'left' | 'right' | 'above' | 'below';
type MapPoint = {
  label: string;
  x: number;
  y: number;
  primary?: boolean;
  side: PinSide;
};

const points: MapPoint[] = [
  { label: 'Hardtwald', x: 49.0, y: 19.2, side: 'below' },
  { label: 'Informatik-Bib', x: 54.3, y: 51.9, side: 'right' },
  {
    label: 'Parkstraße 1',
    x: 66.1,
    y: 49.8,
    primary: true,
    side: 'left',
  },
  { label: 'KIT-Bibliothek', x: 43.1, y: 68.4, side: 'left' },
  { label: 'KIT Hauptbau', x: 25.7, y: 77.7, side: 'above' },
  { label: 'Tram 4 / 5', x: 44.1, y: 81.1, side: 'above' },
];

const distances = [
  { place: 'Informatik-Bibliothek', time: '2 min', mode: 'zu Fuß' },
  { place: 'KIT Hauptcampus', time: '5 min', mode: 'zu Fuß' },
  { place: 'Straßenbahn (Linien 4 / 5)', time: '5 min', mode: 'zu Fuß' },
  { place: 'Universitätsbibliothek (24 / 7)', time: '7 min', mode: 'zu Fuß' },
  { place: 'Marktplatz', time: '9 min', mode: 'Tram' },
  { place: 'Hardtwald', time: '0 min', mode: 'direkt hinten' },
];

function labelPosition(side: PinSide): string {
  switch (side) {
    case 'left':
      return 'right-full top-1/2 mr-2.5 -translate-y-1/2';
    case 'right':
      return 'left-full top-1/2 ml-2.5 -translate-y-1/2';
    case 'above':
      return 'left-1/2 bottom-full mb-1.5 -translate-x-1/2';
    case 'below':
    default:
      return 'left-1/2 top-full mt-1.5 -translate-x-1/2';
  }
}

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
          <figure className="relative overflow-hidden rounded-lg border border-border-strong bg-background-elev shadow-sm">
            <div className="relative aspect-square">
              {/* biome-ignore lint/performance/noImgElement: SVG vector map, no next/image optimization needed */}
              <img
                src="/lage/karlsruhe-light.svg"
                alt="Karte: Parkstraße 1 — KIT, Bibliotheken, Tram und Hardtwald in Gehweite"
                width={1280}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />

              {/* Pin layer */}
              <div className="pointer-events-none absolute inset-0">
                {points.map((p) => (
                  <div
                    key={p.label}
                    className="absolute"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full',
                        p.primary
                          ? 'h-3.5 w-3.5 bg-couleur-burgund ring-[3px] ring-couleur-gold/80 shadow-[0_2px_8px_oklch(0.22_0.014_45/40%)]'
                          : 'h-2 w-2 bg-couleur-burgund/90 ring-2 ring-background-elev shadow-[0_1px_3px_oklch(0.22_0.014_45/35%)]',
                      )}
                    />

                    <div
                      className={cn(
                        'absolute whitespace-nowrap',
                        labelPosition(p.side),
                      )}
                    >
                      <span
                        className={cn(
                          'font-display text-[11px] tracking-tight sm:text-xs',
                          p.primary
                            ? 'rounded-sm bg-background-elev/95 px-1.5 py-0.5 font-medium text-couleur-burgund shadow-[0_1px_3px_oklch(0.22_0.014_45/20%)]'
                            : 'text-foreground/85 [text-shadow:0_1px_2px_oklch(0.96_0.008_82/85%)]',
                        )}
                      >
                        {p.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Attribution */}
              <div className="absolute bottom-1.5 right-1.5 rounded-sm bg-background-elev/85 px-1.5 py-0.5 text-[10px] tracking-wide text-foreground-dim">
                © OpenStreetMap
              </div>
            </div>
          </figure>
          <Caption number="Tafel 02.">
            Karte um die Parkstraße 1 — etwa 1,25 km Bildbreite. Gehzeiten
            sind real gemessen, nicht geschätzt.
          </Caption>
        </div>
      </div>
    </Section>
  );
}
