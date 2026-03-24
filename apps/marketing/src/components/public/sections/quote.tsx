'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/content/public-site';

const EASE = [0.25, 0.1, 0.25, 1] as const;

const [featured] = testimonials;

export function QuoteSection() {
  return (
    <section className="px-4 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.blockquote
          className="relative text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          {/* Decorative opening mark */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 select-none font-serif leading-none text-foreground"
            style={{ fontSize: 'clamp(8rem, 16vw, 14rem)', opacity: 0.04, top: '-4rem', lineHeight: 1 }}
          >
            &ldquo;
          </span>

          <div className="relative z-10">
            <div className="overflow-hidden">
              <motion.p
                className="font-serif font-light italic leading-snug text-foreground"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.25rem)' }}
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              >
                {featured.quote}
              </motion.p>
            </div>

            {/* Gold rule — draws from center */}
            <motion.div
              className="mx-auto mt-10 h-px w-16 origin-center bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: EASE, delay: 0.5 }}
            />

            <motion.footer
              className="mt-6 font-sans text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              {featured.name} — {featured.field}
            </motion.footer>
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}
