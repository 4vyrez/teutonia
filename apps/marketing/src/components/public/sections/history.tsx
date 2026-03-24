'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { historyTimeline } from '@/content/public-site';

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function HistorySection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: '-80px' });

  return (
    <section id="history" className="relative overflow-hidden px-4 py-24 md:py-32">
      {/* Giant background year */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif font-light text-foreground"
        style={{ fontSize: 'clamp(14rem, 35vw, 36rem)', opacity: 0.025, lineHeight: 1 }}
      >
        1843
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Left: Intro */}
          <div className="flex flex-col justify-center">
            <div className="mb-3 overflow-hidden">
              <motion.p
                className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-primary"
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                Geschichte
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-serif text-4xl font-light italic leading-tight text-foreground md:text-5xl"
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
              >
                180 Jahre. Keine Unterbrechung.
              </motion.h2>
            </div>
            <motion.p
              className="mt-6 font-sans text-base leading-7 text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Gegründet 1843 am Polytechnikum Karlsruhe. Seither dieselbe Frage: Was macht einen
              guten Menschen aus? Die Teutonia ist nicht Nostalgie — sie ist Kontinuität.
            </motion.p>
          </div>

          {/* Right: Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Animated vertical line */}
            <motion.div
              className="absolute left-[7px] top-0 w-px origin-top bg-border"
              style={{ height: '100%' }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />

            {/* Events */}
            <motion.div
              className="space-y-10 pl-10"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } } }}
            >
              {historyTimeline.map((event) => (
                <motion.div
                  key={event.year}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                  className="relative"
                >
                  {/* Dot — semi-filled for dark bg visibility */}
                  <motion.div
                    className="absolute -left-[2.375rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-primary bg-primary/20"
                    variants={{
                      hidden: { scale: 0 },
                      visible: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
                    }}
                  />

                  <p className="mb-1 font-sans text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    {event.year}
                  </p>
                  <h3 className="mb-1.5 font-serif text-lg italic text-foreground">
                    {event.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
