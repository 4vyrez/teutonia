'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { homePillars } from '@/content/public-site';

const EASE = [0.16, 1, 0.3, 1] as const;

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
        {/* Heading reveal */}
        <div className="mb-12 overflow-hidden">
          <motion.h2
            className="font-serif text-4xl font-light italic text-foreground md:text-5xl"
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            Mehr als Wohnen
          </motion.h2>
        </div>
      </div>

      {/* Horizontal scroll strip — wrapped in overflow-hidden to prevent page overflow */}
      <div className="relative w-full overflow-hidden">
        {/* Right fade mask — gradient overlay */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-[max(1rem,calc((100vw-80rem)/2+1rem))]"
          style={{ scrollSnapType: 'x mandatory', cursor: 'grab' }}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          onMouseDown={(e) => {
            const el = e.currentTarget;
            const startX = e.pageX - el.offsetLeft;
            const startScrollLeft = el.scrollLeft;
            el.style.cursor = 'grabbing';
            const onMove = (e: MouseEvent) => {
              const x = e.pageX - el.offsetLeft;
              el.scrollLeft = startScrollLeft - (x - startX);
            };
            const onUp = () => {
              el.style.cursor = 'grab';
              window.removeEventListener('mousemove', onMove);
              window.removeEventListener('mouseup', onUp);
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
          }}
        >
          {homePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="min-w-[300px] flex-shrink-0 rounded-xl border border-border p-6 transition-colors hover:border-primary/25 hover:shadow-md md:min-w-[340px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary/65">
                {pillar.eyebrow}
              </p>
              <h3 className="mb-4 font-serif text-2xl italic text-foreground">
                {pillar.title}
              </h3>

              <ul className="mb-6 space-y-2">
                {(benefits[pillar.title] ?? []).map((b) => (
                  <li key={b} className="flex items-start gap-2.5 font-sans text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40" />
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href={pillar.href}
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-primary/80 transition-colors hover:text-primary"
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
