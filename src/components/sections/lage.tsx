import { Section, Eyebrow } from '@/components/primitives/section';
import { Caption } from '@/components/primitives/caption';

const points = [
  { x: 64, y: 58, label: 'Parkstraße 1', sub: 'Hier wohnst du', primary: true },
  { x: 38, y: 78, label: 'KIT Campus Süd', sub: '5 min zu Fuß' },
  { x: 27, y: 64, label: 'Info-Bibliothek', sub: '2 min zu Fuß' },
  { x: 46, y: 86, label: 'Uni-Bibliothek', sub: '7 min · 24 / 7' },
  { x: 78, y: 70, label: 'Tram 4 / 5', sub: '5 min · Marktplatz in 9 min' },
  { x: 56, y: 18, label: 'Hardtwald', sub: 'Hinter dem Haus' },
];

const distances = [
  { place: 'KIT Hauptcampus', time: '5 min', mode: 'zu Fuß' },
  { place: 'Informatik-Bibliothek', time: '2 min', mode: 'zu Fuß' },
  { place: 'Universitätsbibliothek (24 / 7)', time: '7 min', mode: 'zu Fuß' },
  { place: 'Straßenbahn (Linien 4 / 5)', time: '5 min', mode: 'zu Fuß' },
  { place: 'Marktplatz', time: '9 min', mode: 'Tram' },
  { place: 'Hardtwald', time: '0 min', mode: 'direkt hinten' },
];

export function Lage() {
  return (
    <Section id="lage" className="bg-background-veil border-y border-border">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>04 — Lage</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] text-foreground">
            Karlsruhe konzentriert sich{' '}
            <span className="italic text-couleur-gold-dim">um diese Ecke.</span>
          </h2>
          <p className="mt-8 max-w-prose text-pretty text-base leading-relaxed text-foreground-muted">
            Parkstraße 1 ist die kürzeste Verbindung zwischen Hörsaal,
            Bibliothek und Wald. Du erreichst alles, was im Studium zählt, zu
            Fuß. Was du mit der Tram erreichst, kommt obendrauf.
          </p>

          <dl className="mt-10 divide-y divide-border">
            {distances.map((d) => (
              <div
                key={d.place}
                className="flex items-baseline justify-between gap-4 py-3.5"
              >
                <dt className="text-sm text-foreground-muted">{d.place}</dt>
                <dd className="flex items-baseline gap-2 font-display text-couleur-gold-dim tabular-nums">
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
          <figure className="relative">
            <div className="relative aspect-[5/4] w-full overflow-hidden border border-border-strong bg-background">
              {/* Stylized SVG map — DSGVO-frei, kein Google Maps */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-label="Schematische Karte: Parkstraße 1 mit Umfeld"
                role="img"
              >
                <title>Lage Parkstraße 1 — KB! Teutonia</title>
                {/* Forest texture */}
                <defs>
                  <pattern
                    id="trees"
                    x="0"
                    y="0"
                    width="6"
                    height="6"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="3"
                      cy="3"
                      r="0.6"
                      fill="oklch(0.32 0.06 130)"
                      opacity="0.5"
                    />
                  </pattern>
                  <linearGradient id="campus" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.20 0.02 50)" />
                    <stop offset="100%" stopColor="oklch(0.14 0.013 45)" />
                  </linearGradient>
                </defs>

                {/* Hardtwald (forest) — top band */}
                <rect x="0" y="0" width="100" height="30" fill="url(#trees)" />
                <text
                  x="50"
                  y="14"
                  textAnchor="middle"
                  fontSize="2.5"
                  fill="oklch(0.55 0.04 130)"
                  fontStyle="italic"
                  letterSpacing="0.4"
                >
                  HARDTWALD
                </text>

                {/* Campus block — south */}
                <rect
                  x="20"
                  y="74"
                  width="32"
                  height="20"
                  fill="url(#campus)"
                  stroke="oklch(0.35 0.02 50)"
                  strokeWidth="0.2"
                />
                <text
                  x="36"
                  y="86"
                  textAnchor="middle"
                  fontSize="2.2"
                  fill="oklch(0.65 0.04 70)"
                  letterSpacing="0.3"
                >
                  KIT CAMPUS SÜD
                </text>

                {/* Streets — abstracted */}
                <g
                  stroke="oklch(0.32 0.02 50)"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.85"
                >
                  {/* Parkstraße (E-W through the middle) */}
                  <line x1="0" y1="58" x2="100" y2="58" />
                  {/* Engesserstraße / Adenauerring (vertical) */}
                  <line x1="40" y1="30" x2="40" y2="74" />
                  <line x1="72" y1="30" x2="72" y2="78" />
                  {/* Tram-Linie horizontal lower */}
                  <line
                    x1="0"
                    y1="70"
                    x2="100"
                    y2="70"
                    strokeDasharray="1 1"
                    stroke="oklch(0.78 0.14 78)"
                    strokeWidth="0.4"
                  />
                </g>

                {/* Connecting walk-paths (Burgund) */}
                <g
                  stroke="oklch(0.55 0.19 22)"
                  strokeWidth="0.6"
                  fill="none"
                  strokeDasharray="2 1.5"
                  strokeLinecap="round"
                  opacity="0.85"
                >
                  <path d="M64 58 Q 50 64 38 78" />
                  <path d="M64 58 Q 45 62 27 64" />
                  <path d="M64 58 Q 56 70 46 86" />
                  <path d="M64 58 L 78 70" />
                </g>

                {/* Points */}
                {points.map((p) => (
                  <g key={p.label}>
                    {p.primary ? (
                      <>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="2.4"
                          fill="oklch(0.55 0.19 22)"
                          stroke="oklch(0.78 0.14 78)"
                          strokeWidth="0.5"
                        />
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="4.5"
                          fill="none"
                          stroke="oklch(0.78 0.14 78)"
                          strokeWidth="0.3"
                          opacity="0.6"
                        />
                      </>
                    ) : (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="1.4"
                        fill="oklch(0.78 0.14 78)"
                      />
                    )}
                  </g>
                ))}
              </svg>

              {/* HTML labels on top — better typography than SVG text */}
              <div className="absolute inset-0">
                {points.map((p) => (
                  <div
                    key={p.label}
                    className="absolute -translate-x-1/2 -translate-y-full pb-2 text-center"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <div
                      className={`whitespace-nowrap font-display text-[11px] leading-tight tracking-wide sm:text-xs ${
                        p.primary
                          ? 'text-foreground'
                          : 'text-foreground-muted'
                      }`}
                    >
                      {p.label}
                    </div>
                    <div className="whitespace-nowrap text-[9px] uppercase tracking-[0.18em] text-couleur-gold-dim sm:text-[10px]">
                      {p.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </figure>
          <Caption number="Tafel 02.">
            Schematische Lage. Maßstab nicht real — die Wege schon.
          </Caption>
        </div>
      </div>
    </Section>
  );
}
