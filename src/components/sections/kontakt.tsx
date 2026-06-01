import { ContactForm } from '@/components/contact/contact-form';
import { Eyebrow, Section } from '@/components/primitives/section';
import { siteConfig } from '@/lib/site-config';

/*
 * Namen-Schutz: Namen sind im Quelltext rückwärts gespeichert.
 * CSS direction:rtl dreht sie für den Nutzer korrekt dar.
 * Crawler extrahieren den rohen Text-Node (rückwärts) und können
 * die Namen so nicht der Verbindung zuordnen.
 */
function ProtectedName({ rev, label }: { rev: string; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      style={{ direction: 'rtl', unicodeBidi: 'bidi-override', display: 'inline' }}
    >
      {rev}
    </span>
  );
}

type ChargeRow = {
  amt: string;
  stud: string;
  rev: string;
  label: string;
  email: string;
};

const CHARGEN_DATA: ChargeRow[] = [
  {
    amt: 'Sprecher',
    stud: 'stud. Informatik',
    rev: 'hcsallaP xaM',
    label: 'Max Pallasch',
    email: siteConfig.contact.emails.sprecher,
  },
  {
    amt: 'Schriftwart',
    stud: 'stud. Maschinenbau',
    rev: 'ocsalB bocaJ',
    label: 'Jacob Blasco',
    email: siteConfig.contact.emails.schriftwart,
  },
  {
    amt: 'Veranstaltungsleiter',
    stud: 'stud. Wirtschaftsingenieurwesen',
    rev: 'retsieM oclaF',
    label: 'Falco Meister',
    email: siteConfig.contact.emails.veranstaltung,
  },
];

const WEITERE_DATA: ChargeRow[] = [
  {
    amt: 'Fuxmajor',
    stud: 'stud. Chemieingenieurwesen',
    rev: 'regrebnedliM sraL',
    label: 'Lars Mildenberger',
    email: siteConfig.contact.emails.fuxmajor,
  },
  {
    amt: 'Aktivenkassenwart',
    stud: 'stud. Bauingenieur',
    rev: 'zlotS nairoiF',
    label: 'Florian Stolz',
    email: siteConfig.contact.emails.aktivenkasse,
  },
  {
    amt: 'Hauptkassenwart',
    stud: 'stud. Maschinenbau',
    rev: 'reuaB sennahoJ',
    label: 'Johannes Bauer',
    email: siteConfig.contact.emails.hauptkasse,
  },
  {
    amt: 'Systemadministrator',
    stud: 'stud. Wirtschaftsingenieurwesen',
    rev: 'renneR suliuJ',
    label: 'Julius Renner',
    email: siteConfig.contact.emails.admin,
  },
];

function KontaktTable({
  title,
  rows,
  verteiler = false,
}: {
  title: string;
  rows: ChargeRow[];
  verteiler?: boolean;
}) {
  return (
    <div className="reveal mt-[52px]">
      <div className="mb-3.5 text-[10px] uppercase tracking-[0.26em] text-foreground-dim">
        {title}
      </div>
      <table className="w-full border-collapse">
        <colgroup>
          <col className="w-[24%]" />
          <col className="w-[38%]" />
          <col />
        </colgroup>
        <thead>
          <tr className="border-b border-[oklch(0.965_0.003_265/12%)]">
            {['Amt', 'Amtsträger', 'Kontakt'].map((h) => (
              <th
                key={h}
                className="pb-2.5 pt-[13px] text-left text-[10px] font-normal uppercase tracking-[0.22em] text-foreground-dim align-middle"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.amt} className="border-t border-[oklch(0.965_0.003_265/7%)]">
              <td className="py-[13px] text-[13.5px] text-foreground align-middle">{row.amt}</td>
              <td className="py-[13px] text-[13.5px] text-foreground-muted align-middle">
                <span className="mr-1.5 text-foreground-dim">{row.stud}</span>
                <ProtectedName rev={row.rev} label={row.label} />
              </td>
              <td className="py-[13px] text-[13.5px] align-middle">
                <a
                  href={`mailto:${row.email}`}
                  className="tabnum text-couleur-burgund no-underline hover:text-couleur-burgund-hi"
                >
                  {row.email}
                </a>
              </td>
            </tr>
          ))}
          {verteiler ? (
            <tr className="border-t border-[oklch(0.965_0.003_265/7%)]">
              <td className="py-[13px] align-middle" />
              <td className="py-[13px] text-[13px] text-foreground-dim align-middle">
                Verteiler an alle Chargierten
              </td>
              <td className="py-[13px] text-[13.5px] align-middle">
                <a
                  href="mailto:chargen@kbteutonia.de"
                  className="tabnum text-couleur-burgund no-underline hover:text-couleur-burgund-hi"
                >
                  chargen@kbteutonia.de
                </a>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export function Kontakt() {
  return (
    <Section id="kontakt" theme="dark">
      <div className="grid items-start gap-16 lg:grid-cols-2">
        {/* Left rail */}
        <div className="reveal">
          <Eyebrow>09 — Kontakt</Eyebrow>
          <h2 className="font-display mt-7 text-balance text-[clamp(2rem,4.6vw,3.5rem)] font-light leading-[1.05] text-foreground [font-variation-settings:'opsz'_72,'SOFT'_50]">
            Komm einfach vorbei. <span className="italic-gold">Kein Vorabgespräch nötig.</span>
          </h2>
          <p className="mt-6 max-w-[460px] text-pretty text-base leading-[1.75] text-foreground-muted">
            Der einfachste Weg: ein Kneipenabend. Keine Anmeldung, kein Vorwissen, keine
            Verpflichtung. Einmal vorbeischauen — und dann entscheiden, ob das hier was für dich
            ist.
          </p>

          <address className="mt-9 text-[14.5px] not-italic leading-[2] text-foreground-muted">
            {siteConfig.address.street} · {siteConfig.address.postalCode} {siteConfig.address.city}
            <br />
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="text-foreground hover:text-couleur-gold"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
            <br />
            <a
              href={`mailto:${siteConfig.contact.emails.zimmer}`}
              className="text-couleur-burgund underline decoration-[oklch(0.46_0.165_22/40%)] underline-offset-[3px] hover:text-couleur-burgund-hi"
            >
              {siteConfig.contact.emails.zimmer}
            </a>
          </address>
        </div>

        {/* Right rail — Form */}
        <ContactForm />
      </div>

      <KontaktTable
        title="Die Chargierten des Wintersemesters 25/26"
        rows={CHARGEN_DATA}
        verteiler
      />
      <KontaktTable title="Weitere Amtsträger" rows={WEITERE_DATA} />
    </Section>
  );
}
