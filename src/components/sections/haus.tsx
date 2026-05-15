import Image from 'next/image';
import { Section, Eyebrow } from '@/components/primitives/section';
import { EditorialColumn } from '@/components/primitives/editorial-column';
import { Caption } from '@/components/primitives/caption';
import { PullQuote } from '@/components/primitives/pull-quote';

const amenities = [
  { label: 'Möbliertes Zimmer', detail: '~17 m², Schreibtisch, Bett, Schrank' },
  { label: 'Eigenes Bad', detail: 'Dusche, WC, eigener Schlüssel' },
  { label: 'Zwei Küchen', detail: 'Voll ausgestattet, geteilt auf zwei Etagen' },
  { label: 'Lernzimmer', detail: 'Ruhig, 24 / 7 zugänglich' },
  { label: 'Bar & Fernsehecke', detail: 'Selbst betrieben, kein Kommerz' },
  { label: 'Internet & Kabel', detail: 'In jedem Zimmer, eigener Anschluss' },
];

export function Haus() {
  return (
    <Section id="haus" theme="light">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Left col — Editorial intro */}
        <div className="lg:col-span-5">
          <Eyebrow>01 — Das Haus</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] text-foreground">
            Wohnen, wo Karlsruhe{' '}
            <span className="italic text-couleur-gold-dim">am leisesten ist.</span>
          </h2>
          <EditorialColumn className="mt-8 text-base">
            <p>
              Die Parkstraße 1 liegt zwischen Hardtwald und Universität. Vorn
              die Hörsäle, hinten Kiefern. Im Haus wohnen 20 Studierende auf
              vier Etagen — möbliert, mit eigenem Bad, mit Internet, das
              tatsächlich funktioniert.
            </p>
            <p className="mt-5">
              Was hier hängt, hat eine Vorgeschichte. Was hier passiert, ist
              nicht inszeniert. Eine Bibliothek mit handgeschriebenen
              Randnotizen aus drei Jahrzehnten. Ein Lernzimmer, das auch um
              halb zwei nachts offen ist. Eine Bar, die niemandem etwas
              verkauft.
            </p>
          </EditorialColumn>

          <PullQuote attribution="280 € Warmmiete · Parkstraße 1">
            Du wohnst hier nicht günstiger als im Heim — du wohnst mit
            Mitbewohnern, die schon wissen, wie die Klausur abläuft.
          </PullQuote>
        </div>

        {/* Right col — visual + amenities */}
        <div className="lg:col-span-7">
          <figure className="relative isolate overflow-hidden rounded-lg border border-border-strong bg-background-elev shadow-sm">
            <div className="relative aspect-[4/5] sm:aspect-[5/6]">
              <Image
                src="/haus/lernen.jpg"
                alt="Drei Studierende beim gemeinsamen Lernen mit Büchern und Laptop in der Hausbibliothek der KB! Teutonia"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              {/* Light warm wash — keep faces & books legible */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(140deg,_rgba(30,18,12,0.20)_0%,_transparent_45%,_rgba(20,12,8,0.45)_100%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(209,166,74,0.12)_0%,_transparent_55%)]"
              />
              <div className="grain absolute inset-0" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-background-veil/85 via-background-veil/40 to-transparent p-6 sm:p-8">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-couleur-gold">
                    Aufgenommen · Wintersemester
                  </div>
                  <div className="mt-2 font-display text-xl italic text-foreground sm:text-2xl">
                    Lesesaal, erste Etage.
                  </div>
                </div>
                <div className="hidden text-right text-[10px] uppercase tracking-[0.22em] text-foreground-dim sm:block">
                  Tafel 01
                  <br />
                  /05
                </div>
              </div>
            </div>
          </figure>
          <Caption number="Tafel 01.">
            Hausbibliothek, erste Etage. Drei Bundesbrüder beim gemeinsamen
            Lernen — das, was wir in Kurzform „Studieren auf Teutonia" nennen.
          </Caption>

          {/* Amenities — two columns, sparse */}
          <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {amenities.map((item, i) => (
              <div key={item.label} className="group">
                <div className="flex items-baseline gap-3">
                  <span className="font-display tabular-nums text-couleur-gold-dim text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <dt className="font-display text-lg text-foreground">
                    {item.label}
                  </dt>
                </div>
                <dd className="ml-9 mt-1 text-sm text-foreground-muted">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
