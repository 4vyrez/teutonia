'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { historyTimeline } from '@/content/public-site';

export function HistorySection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.1 });

  return (
    <section id="history" className="mx-auto max-w-7xl px-6 pb-20 md:px-8 lg:pb-24">
      <div className="rounded-[2.2rem] border border-white/70 bg-white/78 p-6 shadow-[0_40px_120px_rgba(98,72,46,0.1)] backdrop-blur md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-5">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75">
              Geschichte
            </span>
            <h2 className="font-serif text-4xl text-slate-900 md:text-6xl">
              Herkunft ist hier nicht Kulisse, sondern Orientierung.
            </h2>
            <p className="text-lg leading-8 text-slate-700">
              Die Geschichte der Teutonia ist Teil ihres Selbstverständnisses. Sie wird nicht
              museal ausgestellt, sondern als Maßstab für Haltung und Verantwortung im Heute
              gelesen.
            </p>
          </div>

          <div ref={lineRef} className="relative pl-6 md:pl-10">
            <motion.div
              className="absolute bottom-0 left-0 top-0 w-px origin-top bg-[linear-gradient(180deg,rgba(122,47,43,0),rgba(122,47,43,0.75),rgba(122,47,43,0))]"
              initial={{ scaleY: 0 }}
              animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="space-y-6">
              {historyTimeline.map((event, index) => (
                <motion.article
                  key={event.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                  className="relative rounded-[1.6rem] border border-[#e7dccb] bg-[linear-gradient(180deg,rgba(251,247,240,0.98),rgba(255,255,255,0.92))] p-5 shadow-[0_22px_65px_rgba(100,71,46,0.06)]"
                >
                  <motion.div
                    className="absolute left-[-2rem] top-7 h-4 w-4 rounded-full border-4 border-[#f8f3eb] bg-primary shadow-[0_0_0_8px_rgba(122,47,43,0.08)]"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      delay: index * 0.08 + 0.2,
                      duration: 0.4,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                    {event.year}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">{event.title}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{event.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
