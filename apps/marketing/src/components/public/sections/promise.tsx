'use client';

import { motion } from 'framer-motion';
import { BookOpenText, Briefcase, Calendar, Users } from 'lucide-react';
import { homePillars } from '@/content/public-site';
import { cn } from '@teutonia/shared';

const icons = [BookOpenText, Briefcase, Calendar, Users];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function PromiseSection() {
  return (
    <section id="versprechen" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.h2
          className="mb-12 font-serif text-4xl font-light italic text-foreground md:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Was dich erwartet
        </motion.h2>

        {/* Cards grid */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {homePillars.map((pillar, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={pillar.title}
                variants={item}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                {/* Animated gold left border on hover */}
                <motion.div
                  className="absolute left-0 top-0 h-full w-[3px] origin-top bg-accent"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.25 }}
                />

                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

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
