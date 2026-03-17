'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Mail, MapPin, Phone } from 'lucide-react';
import { contactCards, siteMeta } from '@/content/public-site';

const icons = [Mail, Home, Phone];

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 pb-20 md:px-8 lg:pb-28">
      <div className="grid gap-6 rounded-[2.2rem] border border-white/70 bg-white/82 p-6 shadow-[0_40px_120px_rgba(98,71,43,0.1)] backdrop-blur lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
        <div className="space-y-5 rounded-[1.8rem] border border-[#e7dccb] bg-[linear-gradient(120deg,rgba(117,43,40,0.08),rgba(198,168,117,0.22),rgba(255,255,255,0.92))] p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75">
            Kontakt
          </span>
          <h2 className="font-serif text-4xl text-slate-900 md:text-5xl">
            Kennenlernen, besuchen, nachfragen.
          </h2>
          <p className="leading-7 text-slate-700">
            Wer mehr über das Haus, ein Zimmer oder die Gemeinschaft wissen möchte, soll schnell
            zum richtigen Ansprechpartner kommen. Deshalb setzt die Seite auf direkte Kontaktwege
            statt auf ein ungesichertes Formular.
          </p>

          <div className="rounded-[1.6rem] border border-white/70 bg-white/68 p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-primary" />
              <div className="space-y-1 text-sm leading-6 text-slate-700">
                {siteMeta.address.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {siteMeta.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-primary/30 hover:text-primary"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {contactCards.map((item, index) => {
            const Icon = icons[index];

            return (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                className="group grid gap-3 rounded-[1.7rem] border border-stone-200 bg-stone-50/75 p-5 shadow-[0_18px_50px_rgba(104,76,47,0.06)] transition-colors hover:border-primary/18 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex rounded-full border border-primary/12 bg-primary/6 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
                    {item.title}
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              </motion.a>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="rounded-[1.7rem] border border-[#e7dccb] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(246,238,226,0.9))] p-6"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
              Für Zimmeranfragen
            </div>
            <p className="mt-3 leading-7 text-slate-700">
              Bitte kurz Studienfach, gewünschten Zeitraum und bisherigen Bezug zu Karlsruhe
              angeben. So kann das Gespräch direkt an die richtige Stelle gehen.
            </p>
            <Link
              href={`mailto:${siteMeta.emails.rooms}?subject=Zimmeranfrage%20Teutonia`}
              className="btn-shimmer mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Zimmeranfrage starten
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
