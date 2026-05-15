import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Wappen } from '@/components/primitives/wappen';
import { GoldRule } from '@/components/primitives/gold-rule';
import { siteConfig } from '@/lib/site-config';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-hidden="true"
      className={className}
    >
      <title>Facebook</title>
      <path d="M13.5 21v-7.5h2.5l.4-2.9h-2.9V8.7c0-.8.2-1.4 1.4-1.4h1.6V4.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2H7.8v2.9h2.5V21h3.2Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-hidden="true"
      className={className}
    >
      <title>Instagram</title>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

const columns = [
  {
    title: 'Verbindung',
    links: [
      { label: 'Das Haus', href: '/#haus' },
      { label: 'Wer wir sind', href: '/#identitaet' },
      { label: 'Mitgliedschaft', href: '/#mitgliedschaft' },
      { label: 'Semester', href: '/#semester' },
    ],
  },
  {
    title: 'Kontakt',
    links: [
      { label: 'Schnupperabend', href: '/#kontakt' },
      { label: 'Zimmer anfragen', href: '/#kontakt' },
      { label: 'Geschichte', href: '/geschichte' },
    ],
  },
  {
    title: 'Service',
    links: [
      {
        label: 'Mitgliederbereich',
        href: `${siteConfig.appUrl}/sign-in`,
        external: true,
      },
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-background-veil">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_3fr]">
          <div className="space-y-6">
            <Link
              href="/"
              aria-label="Startseite"
              className="inline-flex items-center gap-3"
            >
              <Wappen className="h-10 w-auto" />
              <div>
                <div className="font-display text-lg leading-none text-foreground">
                  KB! Teutonia
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-couleur-gold-dim">
                  Karlsruhe · seit 1843
                </div>
              </div>
            </Link>
            <address className="not-italic text-sm leading-relaxed text-foreground-muted">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
              <br />
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="hover:text-foreground"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              <br />
              <a
                href={`mailto:${siteConfig.contact.emails.zimmer}`}
                className="underline-gold hover:text-couleur-gold"
              >
                {siteConfig.contact.emails.zimmer}
              </a>
            </address>
            <div className="flex items-center gap-4 text-foreground-dim">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="KB! Teutonia auf Facebook"
                className="transition-colors hover:text-couleur-gold"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="KB! Teutonia auf Instagram"
                className="transition-colors hover:text-couleur-gold"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-xs uppercase tracking-[0.22em] text-couleur-gold-dim">
                  {col.title}
                </div>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-foreground"
                        >
                          {link.label}
                          <ArrowUpRight
                            aria-hidden
                            className="h-3 w-3 transition-transform group-hover:-translate-y-0.5"
                          />
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <GoldRule className="mt-16 mb-6" />

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-foreground-dim sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.longName}. Alle Rechte
            vorbehalten.
          </p>
          <p className="font-display italic text-couleur-gold-dim">
            Gebaut mit Sorgfalt — gegründet am 10. Oktober 1843.
          </p>
        </div>
      </div>
    </footer>
  );
}
