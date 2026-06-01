import Link from 'next/link';
import { Wappen } from '@/components/primitives/wappen';
import { siteConfig } from '@/lib/site-config';

const telHref = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`;

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  internal?: boolean;
};

const groups: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Verbindung',
    links: [
      { label: 'Das Haus', href: '/#haus', internal: true },
      { label: 'Lage in Karlsruhe', href: '/#lage', internal: true },
      { label: 'Mitgliedschaft', href: '/mitgliedschaft', internal: true },
      { label: 'Geschichte seit 1843', href: '/geschichte', internal: true },
    ],
  },
  {
    title: 'Kontakt',
    links: [
      { label: 'Schnupperabend besuchen', href: '/#kontakt', internal: true },
      {
        label: 'Zimmer anfragen',
        href: `mailto:${siteConfig.contact.emails.zimmer}`,
      },
      { label: siteConfig.contact.phoneDisplay, href: telHref },
    ],
  },
  {
    title: 'Service',
    links: [
      {
        label: 'Mitgliederbereich ↗',
        href: siteConfig.appUrl,
        external: true,
      },
      { label: 'Impressum', href: '/impressum', internal: true },
      { label: 'Datenschutz', href: '/datenschutz', internal: true },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.internal) {
    return (
      <Link href={link.href} className="footer-link">
        {link.label}
      </Link>
    );
  }
  return (
    <a
      href={link.href}
      className="footer-link"
      {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {link.label}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer
      data-theme="light"
      className="relative border-t border-border bg-background-veil pt-[88px] pb-9"
    >
      <div className="mx-auto w-full max-w-[1320px] px-[var(--gutter)]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,3fr)]">
          {/* Brand + address + social */}
          <div>
            <Link href="/" aria-label="Startseite" className="flex items-center gap-[14px]">
              <Wappen variant="image" light className="h-[38px] w-auto" />
              <div>
                <div className="font-display text-[19px] text-foreground [font-variation-settings:'opsz'_24,'SOFT'_30]">
                  KB! Teutonia
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.26em] text-couleur-gold-dim">
                  Karlsruhe · seit 1843
                </div>
              </div>
            </Link>

            <address className="mt-7 text-[14px] not-italic leading-[1.9] text-foreground-muted">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
              <br />
              <a href={telHref} className="footer-link">
                {siteConfig.contact.phoneDisplay}
              </a>
              <br />
              <a
                href={`mailto:${siteConfig.contact.emails.zimmer}`}
                className="text-couleur-burgund underline decoration-couleur-gold-dim underline-offset-[3px]"
              >
                {siteConfig.contact.emails.zimmer}
              </a>
            </address>

            <div className="mt-7 flex gap-[14px]">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="KB! Teutonia auf Instagram"
                className="footer-link grid h-9 w-9 place-items-center rounded-full border border-border-strong"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  role="img"
                >
                  <title>Instagram</title>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="KB! Teutonia auf Facebook"
                className="footer-link grid h-9 w-9 place-items-center rounded-full border border-border-strong"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" role="img">
                  <title>Facebook</title>
                  <path d="M13 22V12h3l1-4h-4V5.5c0-1 .5-2 2-2h2V0h-3c-3 0-5 2-5 5v3H6v4h3v10h4Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <div className="text-[10px] font-medium uppercase tracking-[0.26em] text-couleur-gold-dim">
                  {group.title}
                </div>
                <ul className="mt-5 flex list-none flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Hairline rule — gold-dim at 0.32 opacity */}
        <div className="mt-16 border-t border-couleur-gold-dim opacity-[0.32]" />

        <div className="mt-6 flex flex-wrap justify-between gap-3 text-[11px] text-foreground-dim">
          <span>
            © {new Date().getFullYear()} {siteConfig.longName}. Alle Rechte vorbehalten.
          </span>
          <span className="font-display italic text-couleur-gold-dim [font-variation-settings:'opsz'_18,'SOFT'_60]">
            Gegründet am 10. Oktober 1843.
          </span>
        </div>
      </div>
    </footer>
  );
}
