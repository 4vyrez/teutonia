import { Section, Eyebrow } from '@/components/primitives/section';

const stages = [
  {
    title: 'Fux',
    sub: 'Erstes Jahr',
    body: 'Als Fux lernst du die Verbindung kennen — Werte, Geschichte, Routinen. Du wohnst im Haus, hast keine Pflichten in der Verwaltung. Ein Fuxmajor begleitet dich durch das erste Jahr.',
    badge: 'Probesemester möglich',
  },
  {
    title: 'Bursche',
    sub: 'Nach ca. einem Jahr',
    body: 'Du bist Vollmitglied. Jüngere Burschen übernehmen Aufgaben — Sprecher, Schriftwart, Aktivenkasse, Veranstaltungsleitung. So wirst du Teil davon, wie das Haus läuft.',
    badge: 'Mit Stimmrecht',
  },
  {
    title: 'Inaktiver Bursche',
    sub: 'Letzte Studiensemester',
    body: 'Wenn die Abschlussarbeit ruft, trittst du in den Hintergrund. Wohnen kannst du weiter — und beratend hilfst du den jüngeren Bundesbrüdern.',
    badge: 'Studium im Fokus',
  },
  {
    title: 'Alter Herr',
    sub: 'Nach dem Studium',
    body: 'Mit dem Abschluss bist du nicht mehr aktiv, aber bleibst Teil der Verbindung. Du trittst dem Altherrenverein bei — und das Haus bleibt ein Treffpunkt.',
    badge: 'Lebenslang',
  },
];

export function Mitgliedschaft() {
  return (
    <Section id="mitgliedschaft" className="bg-background">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Eyebrow>05 — Mitgliedschaft</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] text-foreground">
            Vier Stationen.{' '}
            <span className="italic text-couleur-gold-dim">
              Lebenslang.
            </span>
          </h2>
          <p className="mt-8 max-w-prose-tight text-pretty text-base leading-relaxed text-foreground-muted">
            Mitgliedschaft ist keine Mitgliedschaft, wie du sie kennst. Sie
            verändert sich mit deinem Studium und endet nicht mit dem
            Abschluss.
          </p>
          <p className="mt-5 max-w-prose-tight text-pretty text-sm leading-relaxed text-foreground-dim">
            Der Einstieg ist niedrigschwellig: ein Probesemester, in dem du
            wohnst und mitlebst, bevor du dich entscheidest.
          </p>
        </div>

        <div className="lg:col-span-8">
          <ol className="relative space-y-4">
            {/* Vertical hairline */}
            <div
              aria-hidden
              className="absolute left-[18px] top-3 bottom-3 w-px bg-couleur-gold-dim opacity-30 sm:left-6"
            />
            {stages.map((s, i) => (
              <li
                key={s.title}
                className="relative grid grid-cols-[auto_1fr] gap-6 sm:gap-8"
              >
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border border-couleur-gold-dim bg-background font-display tabular-nums text-xs text-couleur-gold sm:h-12 sm:w-12 sm:text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="border border-border bg-background-elev px-6 py-5 sm:px-8 sm:py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl leading-tight text-foreground sm:text-[1.6rem]">
                      {s.title}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.22em] text-couleur-gold-dim">
                      {s.sub}
                    </span>
                  </div>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground-muted">
                    {s.body}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground-dim">
                    <span
                      aria-hidden
                      className="h-px w-6 bg-couleur-gold-dim"
                    />
                    {s.badge}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
