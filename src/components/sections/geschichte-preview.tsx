import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section, Eyebrow } from '@/components/primitives/section';

const milestones = [
  { year: '1843', detail: 'Gründung — erste Burschenschaft an einer technischen Hochschule.' },
  { year: '1848 / 49', detail: 'Aktive Teilnahme an der Revolution. Danach Verbot.' },
  { year: '1950', detail: 'Neugründung nach dem Krieg.' },
  { year: '1971', detail: 'Abschaffung der Bestimmungsmensur.' },
  { year: 'heute', detail: '165 + Jahre liberal-freiheitliche Tradition, neu gelesen.' },
];

export function GeschichtePreview() {
  return (
    <Section id="geschichte" className="bg-background">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>08 — Tradition</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.1] text-foreground">
            165 Jahre — und{' '}
            <span className="italic text-couleur-gold-dim">
              hier ist, was 2026 daraus geworden ist.
            </span>
          </h2>
          <p className="mt-8 max-w-prose-tight text-pretty text-base leading-relaxed text-foreground-muted">
            Die Geschichte ist lang. Lückenhaft auch — wie jede ehrliche
            deutsche Geschichte. Hier nur das Gerüst. Die volle Linie steht
            auf einer eigenen Seite.
          </p>
          <Link
            href="/geschichte"
            className="group mt-8 inline-flex items-center gap-2 border-b border-couleur-gold-dim pb-1 font-display italic text-couleur-gold transition-colors hover:text-foreground"
          >
            Vollständige Chronik
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="lg:col-span-8">
          <ol className="space-y-px overflow-hidden border border-border-strong">
            {milestones.map((m, i) => (
              <li
                key={m.year}
                className="grid grid-cols-[7rem_1fr] gap-6 bg-background-elev px-6 py-6 sm:grid-cols-[9rem_1fr] sm:px-10 sm:py-7"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display tabular-nums text-2xl text-couleur-gold sm:text-3xl">
                    {m.year}
                  </span>
                  {i === milestones.length - 1 ? (
                    <span
                      aria-hidden
                      className="inline-block h-1 w-1 rounded-full bg-couleur-gold animate-pulse"
                    />
                  ) : null}
                </div>
                <p className="text-pretty text-sm leading-relaxed text-foreground-muted sm:text-base">
                  {m.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
