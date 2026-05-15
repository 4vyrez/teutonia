import { Section, Eyebrow } from '@/components/primitives/section';
import { EditorialColumn } from '@/components/primitives/editorial-column';
import { GoldRule } from '@/components/primitives/gold-rule';

const principles = [
  {
    label: 'Liberal-freiheitlich',
    detail:
      'Eine liberale Gesinnung zieht sich seit der Gründung 1843 durch unsere Geschichte. Wir verstehen Burschenschaft als Bildungs- und Lerngemeinschaft, nicht als politische Bewegung.',
  },
  {
    label: 'Parteipolitisch neutral',
    detail:
      'Wir nehmen keine Parteilinie ein und lehnen jede Vereinnahmung ab. Im Haus wird diskutiert, nicht agitiert.',
  },
  {
    label: 'Ohne Mensur',
    detail:
      'Die Bestimmungsmensur haben wir 1971 abgeschafft. Wir fechten nicht und wir verlangen es von niemandem.',
  },
  {
    label: 'Eigenständig',
    detail:
      '1997 sind wir aus der Deutschen Burschenschaft ausgetreten, 2011 aus der NDB. Seit 2016 sind wir Mitglied der Allgemeinen Deutschen Burschenschaft (ADB) — einem Dachverband mit klar verfassungstreuer Linie.',
  },
];

export function Identitaet() {
  return (
    <Section id="identitaet" className="bg-background">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>02 — Identität</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] text-foreground">
            Wer wir sind. <br />
            <span className="italic text-couleur-gold-dim">
              Und wer wir nicht sind.
            </span>
          </h2>
          <p className="mt-8 max-w-prose-tight text-pretty text-base leading-relaxed text-foreground-muted">
            „Burschenschaft" ist ein Wort mit Beifang. Deshalb hier präzise,
            ohne Pathos: vier Punkte, die uns einordnen.
          </p>
        </div>

        <div className="lg:col-span-8">
          <ol className="space-y-12">
            {principles.map((p, i) => (
              <li key={p.label} className="grid grid-cols-[auto_1fr] gap-6">
                <span
                  aria-hidden
                  className="font-display tabular-nums text-2xl leading-none text-couleur-gold-dim sm:text-3xl"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
                    {p.label}
                  </h3>
                  <EditorialColumn className="mt-3 text-base">
                    <p>{p.detail}</p>
                  </EditorialColumn>
                  {i < principles.length - 1 ? (
                    <GoldRule className="mt-10" />
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
