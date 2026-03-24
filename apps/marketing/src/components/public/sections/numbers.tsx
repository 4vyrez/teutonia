'use client';

import { motion } from 'framer-motion';
import { homeKennzahlen } from '@/content/public-site';

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function NumbersSection() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Top rule */}
        <motion.div
          className="mb-16 h-px w-full origin-left bg-border"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        />

        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {homeKennzahlen.map((item, i) => (
            <motion.div
              key={item.value}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            >
              {/* Vertical separator */}
              {i > 0 && (
                <motion.div
                  className="absolute inset-y-0 left-0 hidden w-px bg-border md:block"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.08 }}
                />
              )}

              <span
                className="font-serif font-light italic leading-none text-foreground"
                style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}
              >
                {item.value}
              </span>
              <span className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-primary">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom rule */}
        <motion.div
          className="mt-16 h-px w-full origin-left bg-border"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        />
      </div>
    </section>
  );
}
