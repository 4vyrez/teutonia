import Image from 'next/image';
import { ArrowUpRight, Beer, BookOpen, Calendar, Users } from 'lucide-react';
import { Section, Eyebrow } from '@/components/primitives/section';
import { Caption } from '@/components/primitives/caption';

type EventKind = 'stiftungsfest' | 'vortrag' | 'kneipe' | 'wandertag';

const events: Array<{
  kind: EventKind;
  date: string;
  title: string;
  detail: string;
  open: 'Öffentlich' | 'Auf Einladung' | 'Schnuppern möglich';
}> = [
  {
    kind: 'stiftungsfest',
    date: 'Oktober',
    title: 'Stiftungsfest 1843',
    detail:
      'Jährliches Fest zum Gründungstag — mit Festkommers, Ball und Empfang. Alte Herren reisen aus dem ganzen Land an. Offizieller, formaler Rahmen.',
    open: 'Auf Einladung',
  },
  {
    kind: 'vortrag',
    date: 'monatlich',
    title: 'Vortragsabend',
    detail:
      'Ein Bundesbruder oder Gast spricht 45 Minuten, anschließend Fragen und Gespräch. Themen quer durch die Fächer — Technik, Politik, Wirtschaft, Geschichte.',
    open: 'Schnuppern möglich',
  },
  {
    kind: 'kneipe',
    date: 'wöchentlich',
    title: 'Kneipenabend',
    detail:
      'Locker, in der Hausbar. Studierende und Alte Herren mischen sich. Ein Bier, ein Lied, viel Reden. Hier kommen die meisten zum ersten Mal vorbei.',
    open: 'Schnuppern möglich',
  },
  {
    kind: 'wandertag',
    date: 'Sommer',
    title: 'Wandertag im Schwarzwald',
    detail:
      'Ein Tag draußen, am Stück. Eine Strecke, ein Ziel, abends Hütteneinkehr. Tradition seit Jahrzehnten — sportlich, aber nicht ehrgeizig.',
    open: 'Öffentlich',
  },
];

const iconFor: Record<EventKind, React.ComponentType<{ className?: string }>> = {
  stiftungsfest: Users,
  vortrag: BookOpen,
  kneipe: Beer,
  wandertag: Calendar,
};

export function Semester() {
  return (
    <Section id="semester" className="bg-background-veil border-y border-border">
      <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
        <div className="max-w-2xl">
          <Eyebrow>06 — Semesterprogramm</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] text-foreground">
            Was wir in einem{' '}
            <span className="italic text-couleur-gold-dim">Semester</span>{' '}
            tatsächlich tun.
          </h2>
          <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-foreground-muted">
            Vier wiederkehrende Formate. Die meisten davon kannst du als
            Gast besuchen — am einfachsten ein Kneipenabend. Kein
            Vorabverpflichtung, keine Anmeldung nötig.
          </p>
        </div>
        <a
          href="#kontakt"
          className="group inline-flex items-center gap-2 self-start border-b border-couleur-gold-dim pb-1 font-display italic text-couleur-gold transition-colors hover:text-foreground"
        >
          Termine erfragen
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-start">
        <div className="grid gap-px overflow-hidden border border-border-strong bg-border md:grid-cols-2">
          {events.map((e, i) => {
            const Icon = iconFor[e.kind];
            return (
              <article
                key={e.title}
                className="group relative flex flex-col gap-6 bg-background p-8 sm:p-10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center border border-couleur-gold-dim text-couleur-gold">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-couleur-gold-dim">
                      {e.date}
                    </div>
                    <div className="mt-1 font-display tabular-nums text-sm text-foreground-dim">
                      {String(i + 1).padStart(2, '0')} / 04
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
                    {e.title}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground-muted">
                    {e.detail}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground-dim">
                  <span aria-hidden className="h-px w-6 bg-couleur-gold-dim" />
                  {e.open}
                </div>
              </article>
            );
          })}
        </div>

        <figure className="relative isolate overflow-hidden border border-border-strong">
          <div className="relative aspect-[4/5]">
            <Image
              src="/haus/leben.jpeg"
              alt="Kneipsaal der KB! Teutonia mit gedeckten Tischen, Kerzen und Liederbüchern"
              fill
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="object-cover object-center"
            />
            {/* Subtle warm tint — preserve image fidelity */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(40,20,15,0.12)_0%,_rgba(20,15,12,0.55)_100%)]"
            />
            <div className="grain absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-background-veil/95 via-background-veil/40 to-transparent p-6 sm:p-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-couleur-gold">
                  Tafel 02
                </div>
                <div className="mt-2 font-display text-xl italic text-foreground sm:text-2xl">
                  Vor der Kneipe.
                </div>
              </div>
            </div>
          </div>
          <figcaption className="px-1">
            <Caption number="Tafel 02.">
              Kneipsaal, eine halbe Stunde vor dem ersten Lied. Liederbücher
              auf den Tischen, Kerzen schon an.
            </Caption>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
