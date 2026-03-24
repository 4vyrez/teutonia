'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { historyTimeline } from '@/content/public-site';

export function HistorySection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: '-80px' });

  return (
    <section id="history" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Left: Intro */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
              Geschichte
            </p>
            <h2 className="font-serif text-4xl font-light italic leading-tight text-foreground md:text-5xl">
              Seit 1843 — und kein bisschen ruhiger.
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground">
              Über 180 Jahre studentischer Geschichte, geprägt von Haltung, Verantwortung und dem
              Willen, mehr aus dem Studium zu machen als nur Lehrveranstaltungen zu besuchen. Die
              Teutonia ist nicht Nostalgie — sie ist Kontinuität.
            </p>
          </motion.div>

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
                    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
                  }}
                  className="relative"
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute -left-[2.375rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"
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
