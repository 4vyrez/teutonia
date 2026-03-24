'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/content/public-site';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

export function BelongingSection() {
  const [featured, ...rest] = testimonials;

  return (
    <section id="gemeinschaft" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Featured pull quote */}
        <motion.div
          className="relative mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative quote mark */}
          <span
            className="pointer-events-none absolute -top-4 left-0 font-serif text-[8rem] leading-none text-accent/20 select-none md:text-[10rem]"
            aria-hidden
          >
            &ldquo;
          </span>

          <blockquote className="relative z-10 px-4">
            <p className="font-serif text-2xl font-light italic leading-snug text-foreground md:text-3xl lg:text-4xl">
              {featured.quote}
            </p>
            <footer className="mt-6 font-sans text-sm text-muted-foreground">
              — {featured.name}, {featured.field}
            </footer>
          </blockquote>
        </motion.div>

        {/* Quote cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {rest.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              {/* Photo-ready avatar slot — uncomment and replace when real photos are available */}
              {/* <div className="mb-4 h-10 w-10 overflow-hidden rounded-full bg-muted">
                <Image src={t.avatar} alt={t.name} width={40} height={40} className="object-cover" />
              </div> */}

              <p className="font-serif text-base italic leading-relaxed text-foreground/90">
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
