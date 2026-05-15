import Image from 'next/image';
import { Section, Eyebrow } from '@/components/primitives/section';
import { Caption } from '@/components/primitives/caption';
import { cn } from '@/lib/utils';

/**
 * Pin positions are projected from real WGS84 coordinates onto the
 * static map asset bounds (see public/lage/karlsruhe-light.json).
 *   bounds: NW (49.02706, 8.40454) — SE (49.00184, 8.44299)
 *   image:  1792×1792 px, zoom 16 OSM tiles, duotone-recolored.
 */
type MapPoint = {
  label: string;
  sub: string;
  x: number; // % from left
  y: number; // % from top
  primary?: boolean;
  side?: 'left' | 'right' | 'above' | 'below';
};

const points: MapPoint[] = [
  {
    label: 'Parkstraße 1',
    sub: 'Hier wohnst du',
    x: 47.23,
    y: 49.84,
    primary: true,
    side: 'right',
  },
  {
    label: 'KIT Hauptbau',
    sub: '5 min · zu Fuß',
    x: 18.36,
    y: 69.75,
    side: 'left',
  },
  {
    label: 'KIT-Bibliothek',
    sub: '7 min · 24 / 7',
    x: 30.79,
    y: 63.08,
    side: 'below',
  },
  {
    label: 'Informatik-Bib',
    sub: '2 min · zu Fuß',
    x: 38.78,
    y: 51.32,
    side: 'right',
  },
  {
    label: 'Tram 4 / 5',
    sub: '5 min · Durlacher Tor',
    x: 31.49,
    y: 72.16,
    side: 'below',
  },
  {
    label: 'Hardtwald',
    sub: 'Direkt hinterm Haus',
    x: 42.0,
    y: 24.0,
    side: 'above',
  },
];

const distances = [
  { place: 'KIT Hauptcampus', time: '5 min', mode: 'zu Fuß' },
  { place: 'Informatik-Bibliothek', time: '2 min', mode: 'zu Fuß' },
  { place: 'Universitätsbibliothek (24 / 7)', time: '7 min', mode: 'zu Fuß' },
  { place: 'Straßenbahn (Linien 4 / 5)', time: '5 min', mode: 'zu Fuß' },
  { place: 'Marktplatz', time: '9 min', mode: 'Tram' },
  { place: 'Hardtwald', time: '0 min', mode: 'direkt hinten' },
];

function pinTransform(side: MapPoint['side']) {
  switch (side) {
    case 'left':
      return 'right-full mr-3 -translate-y-1/2 top-1/2 flex-row-reverse';
    case 'right':
      return 'left-full ml-3 -translate-y-1/2 top-1/2';
    case 'above':
      return 'left-1/2 -translate-x-1/2 bottom-full mb-2 flex-col';
    case 'below':
    default:
      return 'left-1/2 -translate-x-1/2 top-full mt-2 flex-col';
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
                alt="Karte: Parkstraße 1 zwischen KIT-Campus, Hardtwald und Innenstadt"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              {/* Subtle paper tint to align with light section */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-veil/35"
              />

              {/* Pin layer */}
              <div className="absolute inset-0 pointer-events-none">
                {points.map((p) => (
                  <div
                    key={p.label}
                    className="absolute"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    {/* Pin marker — center on coordinate */}
                    <span
                      aria-hidden
                      className={cn(
                        'block -translate-x-1/2 -translate-y-1/2',
                        p.primary
                          ? 'h-3 w-3 rounded-full bg-couleur-burgund ring-[3px] ring-couleur-gold/65 shadow-[0_2px_6px_oklch(0.22_0.014_45/30%)]'
                          : 'h-2 w-2 rounded-full bg-couleur-burgund/85 ring-2 ring-background-elev',
                      )}
                    />

                    {/* Label card */}
                    <div
                      className={cn(
                        'absolute flex items-center gap-2',
                        pinTransform(p.side),
                      )}
                    >
                      <div
                        className={cn(
                          'rounded-md border bg-background-elev/95 px-2.5 py-1.5 shadow-sm backdrop-blur-sm',
                          p.primary
                            ? 'border-couleur-gold/70'
                            : 'border-border-strong',
                        )}
                      >
                        <div className="font-display whitespace-nowrap text-xs leading-tight text-foreground sm:text-sm">
                          {p.label}
                        </div>
                        <div className="whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-couleur-burgund/80">
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
            Echter Kartenausschnitt um die Parkstraße 1. Maßstab: ~1,7 km
            Bildbreite. Gehzeiten sind real gemessen, nicht geschätzt.
          </Caption>
        </div>
      </div>
    </Section>
  );
}
