'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { mainNavigation, siteMeta } from '@/content/public-site';

const footerLinks = [
  { href: '/studium', label: 'Studium' },
  { href: '/karriere', label: 'Karriere' },
  { href: '/veranstaltungen', label: 'Veranstaltungen' },
  { href: '/freundschaft', label: 'Freundschaft' },
];

const legalLinks = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(243,235,224,0.92))]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.65fr_0.65fr_0.85fr]">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-10 overflow-hidden rounded-[0.9rem] border border-[#e2d6c4] bg-white shadow-[0_10px_24px_rgba(98,76,49,0.08)]">
                <Image
                  src="/images/Teutonia-wappen.jpg"
                  alt="Wappen der Teutonia"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <div className="font-serif text-2xl text-slate-900">Teutonia</div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-primary/75">
                  Karlsruhe seit 1843
                </div>
              </div>
            </Link>

            <p className="max-w-md leading-7 text-slate-700">
              Akademischer Anspruch, Hausgemeinschaft und ein konservativer, zugleich zeitgemäßer
              Auftritt gehören für die Teutonia zusammen.
            </p>

            <div className="space-y-1 text-sm leading-6 text-slate-600">
              {siteMeta.address.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
              Navigation
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              {mainNavigation
                .filter((item) => !item.children)
                .map((item) => (
                  <Link key={item.label} href={item.href} className="transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
              Bereiche
            </h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              {footerLinks.map((item) => (
                <Link key={item.label} href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.26 }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
              Direkter Kontakt
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">
              <div>
                <div className="font-medium text-slate-900">Allgemein</div>
                <a href={`mailto:${siteMeta.emails.general}`} className="transition-colors hover:text-primary">
                  {siteMeta.emails.general}
                </a>
              </div>
              <div>
                <div className="font-medium text-slate-900">Zimmer</div>
                <a href={`mailto:${siteMeta.emails.rooms}`} className="transition-colors hover:text-primary">
                  {siteMeta.emails.rooms}
                </a>
              </div>
              <div>
                <div className="font-medium text-slate-900">Telefon</div>
                <a href="tel:+4972166777348" className="transition-colors hover:text-primary">
                  {siteMeta.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/80 pt-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>© {currentYear} Karlsruher Burschenschaft Teutonia.</div>
          <div className="flex flex-wrap items-center gap-5">
            {siteMeta.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {social.label}
              </a>
            ))}
            {legalLinks.map((item) => (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
