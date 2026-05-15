import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SiteHeader } from '@/components/sections/site-header';
import { SiteFooter } from '@/components/sections/site-footer';
import { Section, Eyebrow } from '@/components/primitives/section';
import { GoldRule } from '@/components/primitives/gold-rule';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum und Anbieterkennzeichnung der Karlsruher Burschenschaft Teutonia.',
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
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
          <Eyebrow className="mt-10">Rechtliches</Eyebrow>
          <h1 className="font-display mt-6 text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-tight text-foreground">
            Impressum
          </h1>
          <GoldRule className="mt-10" />
        </div>

        <Section className="pt-12" containerClassName="max-w-3xl">
          <div className="prose-invert space-y-10 text-foreground-muted">
            <section>
              <h2 className="font-display text-xl text-foreground">
                Anbieter
              </h2>
              <p className="mt-3 leading-relaxed">
                {siteConfig.longName}
                <br />
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Kontakt
              </h2>
              <p className="mt-3 leading-relaxed">
                Telefon:{' '}
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="underline-gold"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <br />
                E-Mail:{' '}
                <a
                  href={`mailto:${siteConfig.contact.emails.admin}`}
                  className="underline-gold"
                >
                  {siteConfig.contact.emails.admin}
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Vertretungsberechtigt
              </h2>
              <p className="mt-3 leading-relaxed">
                Vertretungsberechtigt im Sinne von § 5 TMG sind die jeweils
                amtierenden Chargierten der Aktivitas der Karlsruher
                Burschenschaft Teutonia. Aktuelle Kontaktdaten sind über
                die o. g. E-Mail-Adresse erhältlich.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p className="mt-3 leading-relaxed">
                Der jeweils amtierende Sprecher der Aktivitas,
                Anschrift wie oben. Anfragen bitte an{' '}
                <a
                  href={`mailto:${siteConfig.contact.emails.sprecher}`}
                  className="underline-gold"
                >
                  {siteConfig.contact.emails.sprecher}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Streitschlichtung
              </h2>
              <p className="mt-3 leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Haftung für Inhalte und Links
              </h2>
              <p className="mt-3 leading-relaxed">
                Die Inhalte dieser Seiten wurden mit größtmöglicher Sorgfalt
                erstellt. Für Richtigkeit, Vollständigkeit und Aktualität
                können wir jedoch keine Gewähr übernehmen. Externe Links
                wurden zum Zeitpunkt der Verlinkung auf Rechtsverstöße
                überprüft. Für die Inhalte der verlinkten Seiten ist
                ausschließlich deren Betreiber verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-foreground">
                Urheberrecht
              </h2>
              <p className="mt-3 leading-relaxed">
                Sämtliche Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung
                und Verbreitung außerhalb des Urheberrechts bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors. Downloads
                und Kopien sind nur für den privaten, nicht-kommerziellen
                Gebrauch gestattet.
              </p>
            </section>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
