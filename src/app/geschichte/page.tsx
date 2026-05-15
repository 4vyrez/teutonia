import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SiteHeader } from '@/components/sections/site-header';
import { SiteFooter } from '@/components/sections/site-footer';
import { Section, Eyebrow } from '@/components/primitives/section';
import { EditorialColumn } from '@/components/primitives/editorial-column';
import { GoldRule } from '@/components/primitives/gold-rule';

export const metadata: Metadata = {
  title: 'Geschichte — Seit 10. Oktober 1843',
  description:
    'Die vollständige Chronik der Karlsruher Burschenschaft Teutonia — von der Gründung 1843 über die Revolution 1848 / 49 bis heute.',
};

const events = [
  {
    year: '1843',
    title: 'Gründung am 10. Oktober',
    body: 'Teutonia wird gegründet — als erste Burschenschaft an einer technischen Hochschule in Deutschland. Die Couleur orientiert sich an der Jenenser Urburschenschaft von 1815: Rot und Schwarz mit goldenem Vorstoß.',
  },
  {
    year: '1848 / 49',
    title: 'Revolution',
    body: 'Mitglieder beteiligen sich aktiv an der bürgerlichen Revolution. Nach deren Scheitern folgt das Verbot der Burschenschaften.',
  },
  {
    year: '1857',
    title: 'Wiedergründung',
    body: 'Nach acht Jahren Verbot wird Teutonia wieder als studentische Verbindung an der Polytechnischen Schule (heute KIT) aufgenommen.',
  },
  {
    year: '1877',
    title: 'Burschenschaft Germania',
    body: 'Aus den Reihen Teutonias entsteht eine Schwesterverbindung, die Burschenschaft Germania Karlsruhe.',
  },
  {
    year: '1937–1945',
    title: 'Kameradschaft Egerland',
    body: 'Wie alle Burschenschaften wird Teutonia 1935 zwangsweise als Verbindung aufgelöst. Mitglieder organisieren sich notgedrungen als „Kameradschaft Egerland". Diese Phase gehört zur Geschichte — sie ist Teil davon, warum wir heute die politische Linie ziehen, die wir ziehen.',
  },
  {
    year: '1950',
    title: 'Neugründung',
    body: 'Nach der Besatzungszeit wird Teutonia neu gegründet. Der Anschluss an die liberale Vorkriegstradition ist explizit.',
  },
  {
    year: '1962',
    title: 'Neubau des Hauses',
    body: 'Das heutige Verbindungshaus in der Parkstraße 1 wird bezogen. 20 Zimmer, eigene Bibliothek, direkte Nähe zur Universität.',
  },
  {
    year: '1971',
    title: 'Abschaffung der Bestimmungsmensur',
    body: 'Wir schaffen die Bestimmungsmensur ab. Wer fechten möchte, kann es privat tun — ein Pflichtteil der Mitgliedschaft ist es nicht mehr und war es seitdem nicht.',
  },
  {
    year: '1997',
    title: 'Austritt aus der Deutschen Burschenschaft',
    body: 'Teutonia tritt aus der Deutschen Burschenschaft (DB) aus — als Reaktion auf eine politische Drift im Dachverband, die nicht mehr mit unserer liberalen Tradition vereinbar war.',
  },
  {
    year: '1998',
    title: 'Beitritt zur Neuen Deutschen Burschenschaft',
    body: 'Beitritt zur damaligen Alternative — der Neuen Deutschen Burschenschaft (NDB).',
  },
  {
    year: '2011',
    title: 'Austritt aus der NDB',
    body: 'Auch die NDB verlassen wir wieder, als sich auch dort die Linie verschiebt. Folgejahre: Eigenständigkeit, keine vorschnelle Anbindung.',
  },
  {
    year: '2013',
    title: 'Viererbund',
    body: 'Gründung eines kleinen, klar definierten Verbundes mit drei anderen Burschenschaften. Pragmatisch, nicht ideologisch.',
  },
  {
    year: '2016',
    title: 'Allgemeine Deutsche Burschenschaft (ADB)',
    body: 'Mitbegründung der ADB — ein Dachverband mit klar verfassungstreuer, liberaler Linie. Hier sind wir bis heute zuhause.',
  },
];

export default function GeschichtePage() {
  return (
    <>
      <SiteHeader />
      <main
        data-theme="light"
        className="relative bg-background pt-32 text-foreground sm:pt-40"
      >
        <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-foreground-dim transition-colors hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            />
            Zurück
          </Link>
          <Eyebrow className="mt-10">Chronik · seit 1843</Eyebrow>
          <div className="mt-6 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
            <h1 className="font-display text-balance text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] text-foreground">
              Eine Geschichte mit{' '}
              <span className="italic text-couleur-gold-dim">Lücken.</span>
            </h1>
            <Image
              src="/haus/wappen.jpg"
              alt="Wappen der Karlsruher Burschenschaft Teutonia"
              width={120}
              height={150}
              className="h-auto w-24 self-start sm:w-32"
              priority
            />
          </div>
          <EditorialColumn className="mt-8 text-lg">
            <p>
              Hier ist die vollständige Linie. Wir lassen die schwierigen Jahre
              nicht aus — sie gehören dazu und prägen, warum wir heute die
              politische Position halten, die wir halten.
            </p>
          </EditorialColumn>
          <GoldRule className="mt-12" />
        </div>

        <Section className="pt-12 sm:pt-16" containerClassName="max-w-3xl">
          <ol className="space-y-12">
            {events.map((e) => (
              <li key={e.year} className="grid grid-cols-[5rem_1fr] gap-6 sm:grid-cols-[7rem_1fr] sm:gap-8">
                <div className="font-display tabular-nums text-xl leading-tight text-couleur-gold sm:text-2xl">
                  {e.year}
                </div>
                <div>
                  <h2 className="font-display text-xl leading-snug text-foreground sm:text-2xl">
                    {e.title}
                  </h2>
                  <p className="mt-3 text-pretty text-base leading-relaxed text-foreground-muted">
                    {e.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
