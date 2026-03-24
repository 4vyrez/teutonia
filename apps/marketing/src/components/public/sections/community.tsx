'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { homePillars } from '@/content/public-site';

const benefits: Record<string, string[]> = {
  Studium: [
    'Mittagstisch & gemeinsame Lernräume',
    'Fachübergreifender Austausch',
    'Unterstützung in der Klausurenphase',
  ],
  Karriere: [
    'Netzwerk aus 170+ Alten Herren',
    'Mentoring & Berufsorientierung',
    'Kontakte in viele Branchen',
  ],
  Veranstaltungen: [
    'Vorträge, Feste & Abende auf dem Haus',
    'Kulturelle und studentische Formate',
    'Gemeinsame Aktivitäten das ganze Jahr',
  ],
  Freundschaft: [
    'Echte Bindungen jenseits des Studiums',
    'Lebensbund mit gemeinsamen Werten',
    'Unterstützung in allen Lebensphasen',
  ],
};

export function CommunitySection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <motion.h2
          className="mb-12 font-serif text-4xl font-light italic text-foreground md:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Mehr als Wohnen
        </motion.h2>
      </div>

      {/* Horizontal scroll strip */}
      <div className="relative">
        {/* Fade mask on right edge */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 [mask-image:linear-gradient(to_left,white,transparent)] bg-background" />

        <motion.div
          className="flex gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scroll-snap-type:x_mandatory] cursor-grab active:cursor-grabbing md:px-[calc((100vw-80rem)/2+1rem)]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {homePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="min-w-[300px] max-w-[340px] flex-shrink-0 [scroll-snap-align:start] rounded-2xl border border-border bg-card p-6 md:min-w-[340px]"
            >
              <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                {pillar.eyebrow}
              </p>
              <h3 className="mb-4 font-serif text-2xl italic text-foreground">
                {pillar.title}
              </h3>

              <ul className="mb-6 space-y-2">
                {(benefits[pillar.title] ?? []).map((b) => (
                  <li key={b} className="flex items-start gap-2.5 font-sans text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50" />
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href={pillar.href}
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-primary transition-opacity hover:opacity-70"
              >
                Mehr erfahren
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
