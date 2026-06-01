import { Arrow, LinkButton } from '@/components/primitives/button';
import { Eyebrow, Section } from '@/components/primitives/section';
import { Reveal } from '@/hooks/use-reveal';
import { membershipStages } from '@/lib/membership-data';

/**
 * Mitgliedschaft — short 4-panel overview of the membership stages.
 * 1:1 port of design_reference/home-bottom.jsx → Mitgliedschaft (dark theme).
 * The four stages come from the single source of truth in lib/membership-data
 * (long form lives on /mitgliedschaft); the index drives the "01–04" numeral.
 */
export function Mitgliedschaft() {
  return (
    <Section id="mitgliedschaft" theme="dark">
      {/* ── Header ── */}
      <Reveal className="mb-[52px] grid items-end gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <Eyebrow>05 — Mitgliedschaft</Eyebrow>
          <h2 className="font-display mt-7 text-balance text-[clamp(2rem,4.6vw,3.5rem)] font-light leading-[1.05] text-foreground [font-variation-settings:'opsz'_72,'SOFT'_50]">
            Vier Stationen. <span className="italic-gold">Lebenslang.</span>
          </h2>
        </div>
        <div>
          <p className="max-w-[460px] text-[15px] leading-[1.8] text-foreground-muted">
            Mitgliedschaft ist keine Mitgliedschaft, wie du sie kennst. Sie verändert sich mit
            deinem Studium — und endet nicht mit dem Abschluss.
          </p>
          <p className="mt-3 max-w-[420px] text-[13px] leading-[1.7] text-foreground-dim">
            Niedrigschwelliger Einstieg: ein Probesemester, in dem du wohnst und mitlebst, bevor du
            dich entscheidest.
          </p>
          <LinkButton href="/mitgliedschaft" variant="ghost" className="mt-7 h-[44px]">
            Mehr zur Aufnahme <Arrow>↗</Arrow>
          </LinkButton>
        </div>
      </Reveal>

      {/* ── 4 Panels ── */}
      {/* Hairline grid: every panel carries a top+left border; the wrapper's
          -mt-px/-ml-px crops the outer top/left edge so only interior dividers
          show. Works identically at 4 / 2 / 1 columns without nth-child. */}
      <Reveal delay={1} className="overflow-hidden rounded-2xl border border-border">
        <div className="-mt-px -ml-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {membershipStages.map((s, i) => (
            <div
              key={s.id}
              className="relative flex flex-col overflow-hidden border-t border-l border-border bg-background-elev"
            >
              {/* Burgund top accent bar */}
              <div aria-hidden className="h-[3px] shrink-0 bg-couleur-burgund" />

              {/* Large decorative numeral — background */}
              <div
                aria-hidden
                className="font-display pointer-events-none absolute -top-2 -right-1 select-none text-[96px] leading-none tracking-[-0.04em] tabular-nums text-foreground opacity-[0.045] [font-variation-settings:'opsz'_144,'SOFT'_0,'WONK'_0]"
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <div className="relative flex flex-1 flex-col px-7 pt-7 pb-8">
                {/* Station title */}
                <h3 className="font-display text-[clamp(19px,1.85vw,25px)] font-normal leading-[1.12] tracking-[-0.012em] text-couleur-burgund [font-variation-settings:'opsz'_60,'SOFT'_40,'WONK'_0]">
                  {s.title}
                </h3>

                {/* Sub label */}
                <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-foreground-dim">
                  {s.sub}
                </div>

                {/* Hairline separator */}
                <div
                  aria-hidden
                  className="mt-[22px] h-px shrink-0 bg-[oklch(0.965_0.003_265_/_10%)]"
                />

                {/* Body */}
                <p className="mt-[18px] flex-1 text-pretty text-[13.5px] leading-[1.75] text-foreground-muted">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
