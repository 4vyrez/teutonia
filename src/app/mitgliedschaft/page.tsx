import type { Metadata } from 'next';
import { Arrow, LinkButton } from '@/components/primitives/button';
import { Eyebrow, Section } from '@/components/primitives/section';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHeader } from '@/components/sections/site-header';
import { Reveal } from '@/hooks/use-reveal';
import { membershipStages } from '@/lib/membership-data';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Mitgliedschaft',
  description:
    'Vier Stationen der Mitgliedschaft bei KB! Teutonia — vom ersten Schnupperabend bis zum Alten Herrn. Rechte, Pflichten und der Aufnahmeprozess.',
  alternates: { canonical: '/mitgliedschaft' },
};

/**
 * /mitgliedschaft — long-form membership page.
 * 1:1 port of design_reference/mitgliedschaft.{html,jsx}. Three sections per
 * pages/mitgliedschaft.md: dark hero → light StagesDetail timeline → dark CTA.
 * The four stations come from the single source of truth membership-data.ts
 * (same source the homepage Mitgliedschaft section consumes, short form).
 */
export default function MitgliedschaftPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <MitgliedschaftHero />
        <StagesDetail />
        <MitgliedschaftCloser />
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Hero ── dark, min-h 70vh, ambient gold/burgund radials + grain, content
 * bottom-aligned. Raw <section> (not the Section primitive) for the flex
 * bottom-alignment + ambient layers; values verbatim from mitgliedschaft.jsx. */
function MitgliedschaftHero() {
  return (
    <section
      data-theme="dark"
      className="relative flex min-h-[70vh] flex-col overflow-hidden bg-background"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 75% 20%, oklch(0.78 0.14 78 / 9%) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 12% 95%, oklch(0.42 0.16 22 / 18%) 0%, transparent 65%)',
          }}
        />
        <div className="grain" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-end px-[clamp(20px,4vw,56px)] pt-[clamp(140px,22vh,240px)] pb-[clamp(60px,8vw,100px)]">
        <Eyebrow>Mitgliedschaft · Aufnahmeprozess</Eyebrow>
        <h1 className="font-display mt-9 max-w-[18ch] text-balance text-[clamp(2.75rem,8vw,6.5rem)] font-light leading-[0.98] tracking-[-0.02em] text-foreground [font-variation-settings:'opsz'_144,'SOFT'_50,'WONK'_0]">
          Vier Stationen.
          <br />
          <span className="italic-gold">Lebenslang.</span>
        </h1>
        <p className="mt-8 max-w-[680px] text-[17px] leading-[1.7] text-foreground-muted">
          Mitgliedschaft ist keine Mitgliedschaft, wie du sie kennst. Sie verändert sich mit deinem
          Studium — und endet nicht mit dem Abschluss. Hier ist, was dich erwartet, vom ersten
          Schnupperabend bis zum Alten Herrn.
        </p>
      </div>
    </section>
  );
}

/* ── StagesDetail ── light. Header + vertical timeline (continuous gold-dim
 * line at left:30) with 4 entries: 60×60 numbered circle + card with title,
 * sub, duration pill, body, and Rechte/Pflichten marker lists. */
function StagesDetail() {
  return (
    <Section theme="light">
      <Reveal className="mb-16 max-w-[760px]">
        <Eyebrow>Die vier Stationen</Eyebrow>
        <h2 className="font-display mt-7 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.05] text-foreground [font-variation-settings:'opsz'_72,'SOFT'_50]">
          Vom Schnupperabend bis zur <span className="italic-gold">Alten Herrenrunde.</span>
        </h2>
        <p className="mt-6 text-[16px] leading-[1.7] text-foreground-muted">
          Was du erwarten kannst — Rechte, Pflichten, ungefährer Zeitrahmen. Alles unter dem
          Vorbehalt, dass jedes Studium anders verläuft.
        </p>
      </Reveal>

      <ol className="relative flex list-none flex-col gap-7">
        {/* Continuous timeline line: 1px gold-dim at 40% opacity, behind circles */}
        <div
          aria-hidden
          className="absolute left-[30px] top-7 bottom-7 w-px bg-couleur-gold-dim opacity-40"
        />
        {membershipStages.map((s, i) => (
          <Reveal as="li" key={s.id} className="grid grid-cols-[60px_1fr] gap-7">
            {/* Numbered circle */}
            <div className="relative z-[1] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-couleur-gold-dim bg-background">
              <span className="font-display tabnum text-[22px] text-couleur-burgund">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-border bg-background-elev px-9 py-8">
              <div className="flex flex-wrap items-baseline justify-between gap-[14px]">
                <div>
                  <h3 className="font-display text-[clamp(26px,2.6vw,36px)] leading-[1.1] text-foreground [font-variation-settings:'opsz'_60,'SOFT'_40]">
                    {s.title}
                  </h3>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.26em] text-couleur-gold-dim">
                    {s.sub}
                  </div>
                </div>
                <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
                  {s.duration}
                </div>
              </div>

              <p className="mt-[22px] max-w-[680px] text-pretty text-[15px] leading-[1.75] text-foreground-muted">
                {s.body}
              </p>

              <div className="mt-7 grid grid-cols-1 gap-7 border-t border-border pt-6 sm:grid-cols-2">
                {/* Rechte — "Was du bekommst" */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.26em] text-couleur-burgund">
                    Was du bekommst
                  </div>
                  <ul className="mt-[14px] flex list-none flex-col gap-2">
                    {s.rights.map((r) => (
                      <li
                        key={r}
                        className="grid grid-cols-[14px_1fr] gap-[10px] text-[13.5px] text-foreground"
                      >
                        <span aria-hidden className="leading-[1.5] text-couleur-burgund">
                          +
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pflichten — "Was du beiträgst" */}
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.26em] text-couleur-gold-dim">
                    Was du beiträgst
                  </div>
                  <ul className="mt-[14px] flex list-none flex-col gap-2">
                    {s.duties.map((d) => (
                      <li
                        key={d}
                        className="grid grid-cols-[14px_1fr] gap-[10px] text-[13.5px] text-foreground"
                      >
                        <span aria-hidden className="leading-[1.5] text-couleur-gold-dim">
                          ·
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ── Closer ── dark, centered CTA + two buttons. */
function MitgliedschaftCloser() {
  return (
    <Section theme="dark">
      <Reveal className="mx-auto max-w-[880px] text-center">
        <Eyebrow className="justify-center">Bereit?</Eyebrow>
        <h2 className="font-display mt-8 text-balance text-[clamp(2.25rem,5.4vw,4rem)] font-light leading-[1.1] text-foreground [font-variation-settings:'opsz'_72,'SOFT'_50]">
          Das einfachste ist immer noch:
          <br />
          <span className="italic-gold">vorbeikommen.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-[620px] text-[16px] leading-[1.8] text-foreground-muted">
          Mittwochabend, 19 Uhr. Parkstraße 1, klingeln. Du musst nichts mitbringen, nichts wissen,
          nichts versprechen. Bleib so lange du magst.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-[14px]">
          <LinkButton href="/#kontakt" variant="primary">
            Schnupperabend besuchen <Arrow>↗</Arrow>
          </LinkButton>
          <LinkButton href="mailto:zimmer@kbteutonia.de" variant="ghost">
            Zimmer anfragen <Arrow>↗</Arrow>
          </LinkButton>
        </div>
      </Reveal>
    </Section>
  );
}
