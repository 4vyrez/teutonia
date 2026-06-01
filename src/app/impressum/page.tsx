import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterkennzeichnung der Karlsruher Burschenschaft Teutonia.',
  robots: { index: false, follow: true },
};

const telHref = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`;

export default function ImpressumPage() {
  return (
    <LegalLayout
      eyebrow="Rechtliches"
      title="Impressum"
      intro="Anbieterkennzeichnung nach § 5 TMG und § 18 Abs. 2 MStV."
      crossLink={{ href: '/datenschutz', label: 'Datenschutzerklärung' }}
      stand="Mai 2026"
      sections={[
        {
          n: '01',
          heading: 'Anbieter',
          body: (
            <p>
              {siteConfig.longName}
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
              <br />
              Deutschland
            </p>
          ),
        },
        {
          n: '02',
          heading: 'Kontakt',
          body: (
            <p>
              Telefon:{' '}
              <a href={telHref} className="underline-gold">
                {siteConfig.contact.phoneDisplay}
              </a>
              <br />
              E-Mail:{' '}
              <a href={`mailto:${siteConfig.contact.emails.admin}`} className="underline-gold">
                {siteConfig.contact.emails.admin}
              </a>
            </p>
          ),
        },
        {
          n: '03',
          heading: 'Vertretungsberechtigt',
          body: (
            <p>
              Vertretungsberechtigt im Sinne von § 5 TMG sind die jeweils amtierenden Chargierten
              der Aktivitas der Karlsruher Burschenschaft Teutonia. Aktuelle Kontaktdaten sind über
              die o. g. E-Mail-Adresse erhältlich.
            </p>
          ),
        },
        {
          n: '04',
          heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
          body: (
            <p>
              Der jeweils amtierende Sprecher der Aktivitas, Anschrift wie oben. Anfragen bitte an{' '}
              <a href={`mailto:${siteConfig.contact.emails.sprecher}`} className="underline-gold">
                {siteConfig.contact.emails.sprecher}
              </a>
              .
            </p>
          ),
        },
        {
          n: '05',
          heading: 'Streitschlichtung',
          body: (
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          ),
        },
        {
          n: '06',
          heading: 'Haftung für Inhalte und Links',
          body: (
            <p>
              Die Inhalte dieser Seiten wurden mit größtmöglicher Sorgfalt erstellt. Für
              Richtigkeit, Vollständigkeit und Aktualität können wir jedoch keine Gewähr übernehmen.
              Externe Links wurden zum Zeitpunkt der Verlinkung auf Rechtsverstöße überprüft. Für
              die Inhalte der verlinkten Seiten ist ausschließlich deren Betreiber verantwortlich.
            </p>
          ),
        },
        {
          n: '07',
          heading: 'Urheberrecht',
          body: (
            <p>
              Sämtliche Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
              Vervielfältigung, Bearbeitung und Verbreitung außerhalb des Urheberrechts bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors. Downloads und Kopien sind nur für den
              privaten, nicht-kommerziellen Gebrauch gestattet.
            </p>
          ),
        },
      ]}
    />
  );
}
