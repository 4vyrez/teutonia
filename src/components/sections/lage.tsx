import Image from 'next/image';
import { Section, Eyebrow } from '@/components/primitives/section';
import { Caption } from '@/components/primitives/caption';
import { cn } from '@/lib/utils';

/**
 * Pin positions projected from real WGS84 onto the static map bounds.
 *   Center: 49.0130 N, 8.4172 E (offset west of Parkstraße 1)
 *   Bounds: NW (49.02346, 8.40454) — SE (49.00545, 8.43201)
 *   Image:  1280×1280 px, CartoDB light_nolabels @ z16, Editorial Duotone.
 *
 * Side-placement keeps labels off each other; primary pin sits right of
 * center so most context (KIT, Bibs, Tram) reads left-to-right toward it.
 */
type PinSide = 'left' | 'right' | 'above' | 'below';
type MapPoint = {
  label: string;
  sub: string;
  x: number;
  y: number;
  primary?: boolean;
  side: PinSide;
};

const points: MapPoint[] = [
  // Hardtwald — top of frame; label below the pin
  { label: 'Hardtwald', sub: 'Direkt hinterm Haus', x: 49.0, y: 19.2, side: 'below' },
  // Informatik-Bib — close to Parkstraße, label above to avoid clash
  { label: 'Informatik-Bib', sub: '2 min · zu Fuß', x: 54.3, y: 51.9, side: 'above' },
  // Parkstraße 1 — the anchor, label to the left so it reads "into the city"
  {
    label: 'Parkstraße 1',
    sub: 'Hier wohnst du',
    x: 66.1,
    y: 49.8,
    primary: true,
    side: 'left',
  },
  // KIT-Bibliothek — center-south, label left
  { label: 'KIT-Bibliothek', sub: '7 min · 24 / 7', x: 43.1, y: 68.4, side: 'left' },
  // KIT Hauptbau — south-west, label above (near south edge)
  { label: 'KIT Hauptbau', sub: '5 min · zu Fuß', x: 25.7, y: 77.7, side: 'above' },
  // Durlacher Tor (Tram 4/5) — bottom, label above (frame edge nearby)
  { label: 'Tram 4 / 5', sub: 'Durlacher Tor · 5 min', x: 44.1, y: 81.1, side: 'above' },
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
      return 'right-full top-1/2 mr-3 -translate-y-1/2';
    case 'right':
      return 'left-full top-1/2 ml-3 -translate-y-1/2';
    case 'above':
      return 'left-1/2 bottom-full mb-2 -translate-x-1/2';
    case 'below':
    default:
      return 'left-1/2 top-full mt-2 -translate-x-1/2';
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
            <div className="relative aspect-[5/5]">
              <Image
                src="/lage/karlsruhe-light.webp"
                alt="Karte: Parkstraße 1 — KIT, Bibliotheken, Tram und Hardtwald in Gehweite"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              {/* Subtle paper tint at top + bottom for label legibility */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-background-veil/20 via-transparent to-background-veil/30"
              />

              {/* Pin layer */}
              <div className="pointer-events-none absolute inset-0">
                {points.map((p) => (
                  <div
                    key={p.label}
                    className="absolute"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    {/* Pin marker — centered on the geographic point */}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full',
                        p.primary
                          ? 'h-3.5 w-3.5 bg-couleur-burgund ring-[3px] ring-couleur-gold/80 shadow-[0_2px_8px_oklch(0.22_0.014_45/40%)]'
                          : 'h-2 w-2 bg-couleur-burgund/90 ring-2 ring-background-elev shadow-[0_1px_3px_oklch(0.22_0.014_45/35%)]',
                      )}
                    />

                    {/* Label card — positioned per side */}
                    <div
                      className={cn(
                        'absolute whitespace-nowrap',
                        labelPosition(p.side),
                      )}
                    >
                      <div
                        className={cn(
                          'rounded-md border bg-background-elev/95 px-2.5 py-1.5 shadow-[0_2px_8px_oklch(0.22_0.014_45/15%)] backdrop-blur-sm',
                          p.primary
                            ? 'border-couleur-gold/70'
                            : 'border-border-strong',
                        )}
                      >
                        <div className="font-display text-xs leading-tight text-foreground sm:text-sm">
                          {p.label}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.16em] text-couleur-burgund/80">
                          {p.sub}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Attribution */}
              <div className="absolute bottom-2 right-2 rounded-sm bg-background-elev/85 px-1.5 py-0.5 text-[10px] tracking-wide text-foreground-dim backdrop-blur-sm">
                © OpenStreetMap
              </div>
            </div>
          </figure>
          <Caption number="Tafel 02.">
            Karte um die Parkstraße 1 — etwa 1,7 km Bildbreite. Gehzeiten
            sind real gemessen, nicht geschätzt.
          </Caption>
        </div>
      </div>
    </Section>
  );
}
