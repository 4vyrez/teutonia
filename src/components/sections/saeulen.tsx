import Image from 'next/image';
import { Section, Eyebrow } from '@/components/primitives/section';

const pillars = [
  {
    eyebrow: 'Gemeinschaft',
    title: 'Du wohnst nicht allein.',
    body: 'Bei der Klausur ist um halb zwei jemand wach. Wenn der Kühlschrank leer ist, kocht der Nachbar mit. Wir teilen Lernmaterialien, Erfahrungen und das Haus.',
    routine: 'Was passiert montags?',
    detail:
      'Gemeinsames Abendessen im Haus, ab 19 Uhr. Niemand muss kommen — fast alle kommen.',
  },
  {
    eyebrow: 'Bildung',
    title: 'Lernen quer durch die Fächer.',
    body: 'Maschinenbau erklärt Informatik die Mechanik. BWL übersetzt die Klausurfrage zurück. Ältere Semester wissen, welche Übungsleiterin gnädig korrigiert. Das ist kein Zufall — das ist die Idee.',
    routine: 'Wo lernst du?',
    detail:
      'Im Lernzimmer, in der Bibliothek der Verbindung, in der Uni-Bib (7 min). Oder mit jemandem aus deinem Studiengang am Küchentisch.',
  },
  {
    eyebrow: 'Netzwerk',
    title: 'Alumni, die noch da sind.',
    body: 'Ältere Mitglieder bleiben dem Haus verbunden — als Ratgeber, als Gesprächspartner, manchmal als Türöffner. Kein zwanghaftes Networking. Eher: jemand, der schon dort war, wo du hingehst.',
    routine: 'Wann triffst du sie?',
    detail:
      'Bei Festen, Vorträgen im Haus, oder ganz nüchtern bei einem Bier an der Bar. Mehrmals pro Semester.',
  },
];

export function Saeulen() {
  return (
    <Section
      id="saeulen"
      theme="light"
      className="border-y border-border bg-background-veil"
    >
      <div>
        <div className="max-w-3xl">
          <Eyebrow>03 — Was du bekommst</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] text-foreground">
            Drei Säulen, die wir{' '}
            <span className="italic text-couleur-gold-dim">
              konkret füllen.
            </span>
          </h2>
          <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-foreground-muted">
            Keine Slogans. Was wir versprechen, sind Routinen, die seit
            Jahrzehnten funktionieren. Hier ist, was du erwarten kannst.
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          {/* Hero photo of community */}
          <figure className="relative isolate mb-10 overflow-hidden rounded-lg border border-border-strong shadow-sm">
            <div className="relative aspect-[16/7] sm:aspect-[21/8]">
              <Image
                src="/haus/gemeinsam.jpg"
                alt="Bundesbrüder gemeinsam beim Wandertag im Schwarzwald"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Slight warm wash — keep image legible */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_0%,_transparent_55%,_rgba(20,15,12,0.65)_100%)]"
              />
              <div className="grain absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-10">
                <div className="max-w-md">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-couleur-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    Tafel 03 · Wandertag
                  </div>
                  <p className="mt-3 font-display text-xl italic leading-snug text-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] sm:text-2xl">
                    „Ein Tag draußen — und nebenbei lernt man, mit wem man
                    studiert."
                  </p>
                </div>
                <div className="hidden text-right text-[10px] uppercase tracking-[0.22em] text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] sm:block">
                  Schwarzwald
                  <br />
                  Sommersemester
                </div>
              </div>
            </div>
          </figure>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {pillars.map((p, i) => (
              <article
                key={p.eyebrow}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-border-strong bg-background-elev p-8 shadow-sm transition-colors hover:border-couleur-gold-dim sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-couleur-gold-dim">
                    {p.eyebrow}
                  </span>
                  <span className="font-display tabular-nums text-sm text-foreground-dim">
                    {String(i + 1).padStart(2, '0')} / 03
                  </span>
                </div>
                <h3 className="font-display mt-8 text-balance text-2xl leading-snug text-foreground sm:text-[1.75rem]">
                  {p.title}
                </h3>
                <p className="mt-5 flex-1 text-pretty text-sm leading-relaxed text-foreground-muted">
                  {p.body}
                </p>
                <div className="mt-8 border-t border-border-strong pt-6">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-couleur-gold-dim">
                    {p.routine}
                  </div>
                  <p className="mt-2 text-sm italic text-foreground-muted">
                    {p.detail}
                  </p>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-couleur-gold-dim to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
