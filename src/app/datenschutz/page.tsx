import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung der Karlsruher Burschenschaft Teutonia gemäß DSGVO.',
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout
      eyebrow="Rechtliches · DSGVO"
      title="Datenschutzerklärung"
      intro="Wie wir mit deinen Daten umgehen — datensparsam, ohne Tracking."
      crossLink={{ href: '/impressum', label: 'Impressum' }}
      stand="Mai 2026"
      sections={[
        {
          n: '01',
          heading: 'Verantwortlich',
          body: (
            <p>
              Verantwortlich im Sinne der DSGVO ist die {siteConfig.longName},{' '}
              {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
              . Anfragen zum Datenschutz bitte an{' '}
              <a href={`mailto:${siteConfig.contact.emails.admin}`} className="underline-gold">
                {siteConfig.contact.emails.admin}
              </a>
              .
            </p>
          ),
        },
        {
          n: '02',
          heading: 'Datensparsamkeit',
          body: (
            <p>
              Wir erheben so wenig personenbezogene Daten wie möglich. Diese Website setzt keine
              Cookies, kein Tracking, keine Werbung und keine Drittanbieter-Skripte ein. Wir nutzen
              keinen externen Karten-Anbieter (z. B. Google Maps) — die Lage zeigen wir als
              statische, selbst gezeichnete Karte.
            </p>
          ),
        },
        {
          n: '03',
          heading: 'Server-Log-Daten',
          body: (
            <p>
              Bei jedem Aufruf werden technische Daten (anonymisierte IP-Adresse, User-Agent,
              Zeitstempel) durch unseren Hosting-Provider (Vercel Inc., USA) verarbeitet. Diese
              Daten werden ausschließlich zur Aufrechterhaltung des Betriebs und zur Abwehr von
              Angriffen verwendet. Eine personenbezogene Auswertung findet nicht statt.
            </p>
          ),
        },
        {
          n: '04',
          heading: 'Kontaktformular',
          body: (
            <p>
              Wenn du uns über das Kontaktformular schreibst, übermitteln wir deinen Namen, deine
              E-Mail-Adresse und deine Nachricht über unseren E-Mail-Dienst (Resend Inc., USA) an
              unsere Adresse{' '}
              <a href={`mailto:${siteConfig.contact.emails.zimmer}`} className="underline-gold">
                {siteConfig.contact.emails.zimmer}
              </a>
              . Die Daten werden ausschließlich verwendet, um deine Anfrage zu beantworten.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f DSGVO. Du kannst jederzeit per E-Mail
              die Löschung der Daten verlangen.
            </p>
          ),
        },
        {
          n: '05',
          heading: 'Deine Rechte',
          body: (
            <p>
              Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung, Datenübertragbarkeit und Widerspruch. Beschwerde bei einer
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
          ),
        },
        {
          n: '06',
          heading: 'Externe Links',
          body: (
            <p>
              Diese Website verlinkt auf den Mitgliederbereich (teutonia-app, ebenfalls auf Vercel
              gehostet), Facebook und Instagram. Beim Klick auf diese Links gelten die
              Datenschutzbestimmungen der jeweiligen Anbieter. Wir übertragen keine Daten an diese
              Anbieter, solange du nicht aktiv auf einen Link klickst.
            </p>
          ),
        },
      ]}
    />
  );
}
