'use client';

import { motion } from 'framer-motion';
import { BookOpenText, Briefcase, Calendar, Users } from 'lucide-react';
import { homePillars } from '@/content/public-site';

const EASE = [0.16, 1, 0.3, 1] as const;
const icons = [BookOpenText, Briefcase, Calendar, Users];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function PromiseSection() {
  return (
    <section id="versprechen" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Heading reveal */}
        <div className="mb-12 overflow-hidden">
          <motion.h2
            className="font-serif text-4xl font-light italic text-foreground md:text-5xl"
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            Was dich erwartet
          </motion.h2>
        </div>

        {/* Cards */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {homePillars.map((pillar, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={pillar.title}
                variants={card}
                whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(122,47,43,0.09)' }}
                transition={{ duration: 0.2 }}
                className="group rounded-xl border border-border bg-transparent p-6 transition-colors hover:bg-card"
              >
                <Icon className="mb-4 h-5 w-5 text-primary/70" />
                <h3 className="mb-2 font-sans text-base font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
