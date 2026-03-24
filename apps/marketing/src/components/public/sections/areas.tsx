'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { homePillars } from '@/content/public-site';

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function AreasSection() {
  return (
    <section className="overflow-hidden px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16">
          <div className="mb-3 overflow-hidden">
            <motion.p
              className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-primary"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              Was du gewinnst
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-5xl font-light italic text-foreground md:text-6xl"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
            >
              Vier Bereiche.
            </motion.h2>
          </div>
        </div>

        {/* Alternating rows */}
        <div className="divide-y divide-border">
          {homePillars.map((pillar, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={pillar.title}
                className="relative grid items-center gap-8 py-14 md:grid-cols-2 md:gap-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                {/* Faint background number */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute select-none font-serif font-light italic text-foreground ${isEven ? '-left-4' : '-right-4'}`}
                  style={{
                    fontSize: 'clamp(8rem, 18vw, 16rem)',
                    opacity: 0.03,
                    top: '-1rem',
                    lineHeight: 1,
                  }}
                >
                  0{i + 1}
                </span>

                {/* Text block */}
                <div className={`relative z-10 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                  <p className="mb-3 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-primary">
                    {pillar.eyebrow}
                  </p>
                  <div className="overflow-hidden">
                    <motion.h3
                      className="font-serif text-3xl font-light italic text-foreground md:text-4xl"
                      initial={{ y: '100%' }}
                      whileInView={{ y: '0%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                    >
                      {pillar.title}
                    </motion.h3>
                  </div>
                  <p className="mt-4 font-sans text-base leading-7 text-muted-foreground">
                    {pillar.description}
                  </p>
                  <Link
                    href={pillar.href}
                    className="mt-6 inline-block font-sans text-sm text-primary transition-opacity duration-300 hover:opacity-70"
                  >
                    Mehr erfahren →
                  </Link>
                </div>

                {/* Spacer column for alternating visual balance */}
                <div className={isEven ? 'md:order-2' : 'md:order-1'} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
