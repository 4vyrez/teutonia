import { Mail, MapPin, Phone } from 'lucide-react';
import { Section, Eyebrow } from '@/components/primitives/section';
import { ContactForm } from '@/components/contact/contact-form';
import { siteConfig } from '@/lib/site-config';

export function Kontakt() {
  return (
    <Section id="kontakt" theme="light">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
        {/* Left rail */}
        <div className="lg:col-span-5">
          <Eyebrow>07 — Kontakt</Eyebrow>
          <h2 className="font-display mt-6 text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.05] text-foreground">
            Komm vorbei.{' '}
            <span className="italic text-couleur-gold-dim">
              Schreib uns. Ruf an.
            </span>
          </h2>
          <p className="mt-8 max-w-prose-tight text-pretty text-base leading-relaxed text-foreground-muted">
            Am einfachsten ist ein Schnupperabend — komm zu einer Kneipe
            vorbei, ohne Verpflichtung. Wenn du ein Zimmer suchst, schreib
            direkt. Wir melden uns in zwei bis drei Tagen, persönlich.
          </p>

          <dl className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin
                className="mt-1 h-5 w-5 shrink-0 text-couleur-gold-dim"
                aria-hidden
              />
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-couleur-gold-dim">
                  Adresse
                </dt>
                <dd className="mt-1 font-display text-lg leading-snug text-foreground">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone
                className="mt-1 h-5 w-5 shrink-0 text-couleur-gold-dim"
                aria-hidden
              />
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-couleur-gold-dim">
                  Telefon
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                    className="font-display text-lg text-foreground hover:text-couleur-gold"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail
                className="mt-1 h-5 w-5 shrink-0 text-couleur-gold-dim"
                aria-hidden
              />
              <div className="space-y-3">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-couleur-gold-dim">
                  E-Mail
                </dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.contact.emails.zimmer}`}
                    className="underline-gold font-display text-lg text-foreground hover:text-couleur-gold"
                  >
                    {siteConfig.contact.emails.zimmer}
                  </a>
                  <div className="mt-1 text-xs text-foreground-dim">
                    für Zimmer-Anfragen
                  </div>
                </dd>
                <dd>
                  <a
                    href={`mailto:${siteConfig.contact.emails.veranstaltung}`}
                    className="underline-gold text-sm text-foreground-muted hover:text-couleur-gold"
                  >
                    {siteConfig.contact.emails.veranstaltung}
                  </a>
                  <div className="mt-1 text-xs text-foreground-dim">
                    für Schnupperabend / Veranstaltungen
                  </div>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Right rail — Form */}
        <div className="lg:col-span-7">
          <div className="rounded-lg border border-border-strong bg-background-elev p-8 shadow-sm sm:p-12">
            <div className="mb-10 flex items-baseline justify-between gap-4 border-b border-border-strong pb-6">
              <h3 className="font-display text-xl leading-tight text-foreground">
                Direkt schreiben
              </h3>
              <span className="text-xs uppercase tracking-[0.22em] text-couleur-gold-dim">
                Formular
              </span>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
