import Image from 'next/image';

/* Running-facts strip — verbatim copy from design_reference/home-top.jsx (Hero).
 * Values mirror siteConfig.facts (rooms 20, rentEur 280, walkUniMin 5); the
 * "Jahre" and "frei" figures are editorial copy carried over from the design. */
const facts: ReadonlyArray<{
  v: string;
  u: string;
  s: string;
  accent?: boolean;
}> = [
  { v: '20', u: 'Zimmer', s: '4 Etagen · eigenes Bad' },
  { v: 'ab 280', u: '€/Monat', s: 'warm, inkl. Internet' },
  { v: '5', u: 'min', s: 'zu Fuß zum KIT' },
  { v: '183', u: 'Jahre', s: 'seit 10. Oktober 1843' },
  { v: '3', u: 'frei', s: 'Wintersemester 26/27', accent: true },
];

/**
 * Hero — editorial cover. Ported 1:1 from design_reference/home-top.jsx (Hero):
 * 7fr/5fr type-column + background Wappen, masthead eyebrow, balanced display
 * headline (opsz 144 / SOFT 50), lede, two CTAs, and a five-column running-facts
 * strip with a live accent. Server Component — no state; the `.reveal` classes
 * are above-the-fold so they paint instantly (the reveal hook never arms them).
 */
export function Hero() {
  return (
    <section
      id="top"
      data-theme="dark"
      className="relative flex min-h-screen flex-col overflow-hidden bg-background"
    >
      {/* Ambient layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_78%_18%,_oklch(0.7_0.12_78_/_13%)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_8%_96%,_oklch(0.42_0.16_22_/_30%)_0%,_transparent_60%)]" />
        {/* Wappen — groß, rechts angeschnitten, Screen-Blend mit Originalfarben */}
        <Image
          src="/haus/wappen.png"
          alt=""
          aria-hidden
          width={860}
          height={1075}
          priority
          className="pointer-events-none absolute top-1/2 right-[clamp(-220px,-20vw,-80px)] h-auto w-[clamp(520px,62vw,860px)] -translate-y-1/2 select-none opacity-[0.09] mix-blend-screen [filter:sepia(0.35)_saturate(1.4)]"
        />
      </div>

      {/* Main spread */}
      <div className="relative z-[2] mx-auto grid w-full max-w-[1320px] flex-1 grid-cols-1 gap-[clamp(36px,5vw,72px)] px-[clamp(20px,4vw,56px)] pt-[clamp(96px,14vh,130px)] pb-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* LEFT — Type */}
        <div className="relative z-[1] flex flex-col justify-between">
          <div>
            <div className="reveal text-[9px] uppercase tracking-[0.4em] text-couleur-gold-dim">
              Karlsruher Burschenschaft
            </div>
            <h1 className="reveal reveal-d1 font-display mt-7 font-light leading-[0.94] tracking-[-0.028em] text-balance text-foreground text-[clamp(2.5rem,8vw,6.5rem)] [font-variation-settings:'opsz'_144,'SOFT'_50]">
              Mehr als
              <br />
              ein Zimmer.
              <br />
              <span className="italic-gold">Eine Lerngemeinschaft</span>
              <br />
              seit 1843.
            </h1>

            <div className="reveal reveal-d3 mt-10 max-w-[560px]">
              <p className="text-[17px] leading-[1.72] text-foreground-muted text-pretty">
                20 möblierte Zimmer mit eigenem Bad, fünf Minuten zu Fuß zum KIT. Eine Bibliothek
                mit drei Jahrzehnten Randnotizen, ein Lernzimmer das nie schläft, eine Bar ohne
                Kommerz — und ein Netzwerk, das nach dem Examen nicht aufhört.
              </p>
            </div>

            <div className="reveal reveal-d4 mt-11 flex flex-wrap items-center gap-3">
              <a href="#kontakt" className="btn btn-primary lg">
                Schnupperabend besuchen
                <span className="arrow">↗</span>
              </a>
              <a href="#haus" className="btn btn-ghost">
                Das Haus ansehen
                <span className="arrow arrow-down">↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — leere Spalte; Wappen liegt im Hintergrund */}
        <div aria-hidden />
      </div>

      {/* Running facts strip */}
      <div className="relative z-[2] mx-auto w-full max-w-[1320px] px-[clamp(20px,4vw,56px)] pb-[clamp(28px,4vh,48px)]">
        <div className="reveal reveal-d5 grid grid-cols-2 items-center gap-6 border-y border-border-strong py-[22px] sm:grid-cols-3 md:grid-cols-5">
          {facts.map((x, i) => (
            <div
              key={x.s}
              className="flex flex-col gap-1.5"
              style={{
                paddingLeft: i === 0 ? 0 : 18,
                borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
              }}
            >
              <div className="flex items-baseline gap-1.5">
                {x.accent ? (
                  <span
                    aria-hidden
                    className="mr-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-couleur-burgund animate-pin-pulse"
                  />
                ) : null}
                <span
                  className={`font-display tabnum font-light leading-none tracking-[-0.02em] text-[clamp(26px,3vw,40px)] [font-variation-settings:'opsz'_72] ${
                    x.accent ? 'text-couleur-burgund-hi' : 'text-foreground'
                  }`}
                >
                  {x.v}
                </span>
                <span
                  className={`text-[10px] uppercase tracking-[0.22em] ${
                    x.accent ? 'text-couleur-burgund' : 'text-foreground-dim'
                  }`}
                >
                  {x.u}
                </span>
              </div>
              <div className="text-[11px] tracking-[0.01em] text-foreground-muted">{x.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
