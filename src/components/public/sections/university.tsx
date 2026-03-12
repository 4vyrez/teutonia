'use client';

import { motion } from 'framer-motion';
import { Building2, Leaf, Route } from 'lucide-react';
import { campusFeatures } from '@/content/public-site';

const icons = [Building2, Route, Leaf];

export function UniversitySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 md:px-8 lg:pb-24">
      <div className="grid gap-6 rounded-[2.1rem] border border-[#e8dcc8] bg-[linear-gradient(180deg,rgba(255,250,244,0.96),rgba(245,236,225,0.86))] p-6 shadow-[0_36px_110px_rgba(104,77,47,0.09)] md:p-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="space-y-5">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75">
            Karlsruhe & KIT
          </span>
          <h2 className="font-serif text-4xl text-slate-900 md:text-6xl">
            Zwischen Universität, Oststadt und Hausalltag.
          </h2>
          <p className="text-lg leading-8 text-slate-700">
            Der Standort ist kein Nebenaspekt. Die Lage in der Oststadt verbindet akademische
            Nähe mit einem Umfeld, das Lernen und Alltag sinnvoll organisiert.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {campusFeatures.map((feature, index) => {
            const Icon = icons[index];

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.6rem] border border-white/75 bg-white/74 p-5 shadow-[0_22px_60px_rgba(103,74,43,0.08)] backdrop-blur"
              >
                <div className="inline-flex rounded-full border border-primary/12 bg-primary/6 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-700">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
