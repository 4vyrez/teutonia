'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/content/public-site';

const EASE = [0.16, 1, 0.3, 1] as const;

export function BelongingSection() {
  const [featured, ...rest] = testimonials;

  return (
    <section id="gemeinschaft" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Featured pull quote */}
        <motion.div
          className="relative mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative marks */}
          <span
            className="pointer-events-none absolute -top-6 left-0 select-none font-serif leading-none text-accent/30 md:-top-8"
            style={{ fontSize: 'clamp(6rem, 12vw, 11rem)' }}
            aria-hidden
          >
            &ldquo;
          </span>

          <blockquote className="relative z-10 px-4">
            <div className="overflow-hidden">
              <motion.p
                className="font-serif text-2xl font-light italic leading-snug text-foreground md:text-3xl lg:text-[2.1rem]"
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              >
                {featured.quote}
              </motion.p>
            </div>
            <motion.footer
              className="mt-5 font-sans text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              — {featured.name}, {featured.field}
            </motion.footer>
          </blockquote>
        </motion.div>

        {/* Quote cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {rest.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="rounded-xl border border-border p-6"
            >
              {/* Photo-ready slot — uncomment when real photos exist */}
              {/* <div className="mb-4 h-10 w-10 overflow-hidden rounded-full bg-muted">
                <Image src={t.avatar} alt={t.name} width={40} height={40} className="object-cover" />
              </div> */}

              <p className="font-serif text-base italic leading-relaxed text-foreground/85">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="font-sans text-sm font-medium text-foreground">{t.name}</p>
                <p className="font-sans text-xs text-muted-foreground">{t.field}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
