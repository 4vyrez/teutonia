import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SiteHeader } from '@/components/sections/site-header';
import { SiteFooter } from '@/components/sections/site-footer';
import { Section, Eyebrow } from '@/components/primitives/section';
import { GoldRule } from '@/components/primitives/gold-rule';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description:
    'Datenschutzerklärung der Karlsruher Burschenschaft Teutonia gemäß DSGVO.',
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
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
          <Eyebrow className="mt-10">Rechtliches · DSGVO</Eyebrow>
          <h1 className="font-display mt-6 text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-tight text-foreground">
            Datenschutzerklärung
          </h1>
          <GoldRule className="mt-10" />
        </div>

        <Section className="pt-12" containerClassName="max-w-3xl">
          <div className="space-y-10 text-foreground-muted">
            <section>
              <h2 className="font-display text-xl text-foreground">
                Verantwortlich
              </h2>
              <p className="mt-3 leading-relaxed">
                Verantwortlich im Sinne der DSGVO ist die{' '}
                {siteConfig.longName}, {siteConfig.address.street},{' '}
                {siteConfig.address.postalCode} {siteConfig.address.city}.
                Anfragen zum Datenschutz bitte an{' '}
                <a
                  href={`mailto:${siteConfig.contact.emails.admin}`}
                  className="underline-gold"
                >
                  {siteConfig.contact.emails.admin}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Datensparsamkeit
              </h2>
              <p className="mt-3 leading-relaxed">
                Wir erheben so wenig personenbezogene Daten wie möglich.
                Diese Website setzt keine Cookies, kein Tracking, keine
                Werbung und keine Drittanbieter-Skripte ein. Wir nutzen
                keinen externen Karten-Anbieter (z. B. Google Maps) — die
                Lage zeigen wir als statische, selbst gezeichnete Karte.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Server-Log-Daten
              </h2>
              <p className="mt-3 leading-relaxed">
                Bei jedem Aufruf werden technische Daten (anonymisierte
                IP-Adresse, User-Agent, Zeitstempel) durch unseren
                Hosting-Provider (Vercel Inc., USA) verarbeitet. Diese
                Daten werden ausschließlich zur Aufrechterhaltung des
                Betriebs und zur Abwehr von Angriffen verwendet. Eine
                personenbezogene Auswertung findet nicht statt.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Kontaktformular
              </h2>
              <p className="mt-3 leading-relaxed">
                Wenn du uns über das Kontaktformular schreibst, übermitteln
                wir deinen Namen, deine E-Mail-Adresse und deine Nachricht
                über unseren E-Mail-Dienst (Resend Inc., USA) an unsere
                Adresse{' '}
                <a
                  href={`mailto:${siteConfig.contact.emails.zimmer}`}
                  className="underline-gold"
                >
                  {siteConfig.contact.emails.zimmer}
                </a>
                . Die Daten werden ausschließlich verwendet, um deine
                Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1
                lit. b und f DSGVO. Du kannst jederzeit per E-Mail die
                Löschung der Daten verlangen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Deine Rechte
              </h2>
              <p className="mt-3 leading-relaxed">
                Du hast jederzeit das Recht auf Auskunft, Berichtigung,
                Löschung, Einschränkung der Verarbeitung,
                Datenübertragbarkeit und Widerspruch. Beschwerde bei einer
                Aufsichtsbehörde — in Baden-Württemberg dem{' '}
                <a
                  href="https://www.baden-wuerttemberg.datenschutz.de/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-gold"
                >
                  Landesbeauftragten für Datenschutz
                </a>{' '}
                — kannst du ebenfalls einlegen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Externe Links
              </h2>
              <p className="mt-3 leading-relaxed">
                Diese Website verlinkt auf den Mitgliederbereich
                (teutonia-app, ebenfalls auf Vercel gehostet), Facebook und
                Instagram. Beim Klick auf diese Links gelten die
                Datenschutzbestimmungen der jeweiligen Anbieter. Wir
                übertragen keine Daten an diese Anbieter, solange du nicht
                aktiv auf einen Link klickst.
              </p>
            </section>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
