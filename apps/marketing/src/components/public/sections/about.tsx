'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, BookOpenText, Landmark, Users } from 'lucide-react';
import { homeValues } from '@/content/public-site';
import { SpotlightCard } from '@teutonia/shared/components/ui/spotlight-card';

const icons = [ShieldCheck, BookOpenText, Landmark, Users];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 pb-20 md:px-8 lg:pb-24">
      <div className="flex flex-col gap-5 pb-10 md:max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75">
          Profil
        </span>
        <h2 className="font-serif text-4xl text-slate-900 md:text-6xl">
          Ein Umfeld mit klaren Maßstäben und spürbarer Lebendigkeit.
        </h2>
        <p className="text-lg leading-8 text-slate-700">
          Teutonia ist kein bloßer Traditionsname. Die Gemeinschaft wird im Alltag daran messbar,
          ob sie Orientierung gibt, Leistung ermöglicht und Menschen langfristig miteinander
          verbindet.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {homeValues.map((value, index) => {
          const Icon = icons[index];

          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
            >
              <SpotlightCard
                spotlightColor="rgba(122,47,43,0.07)"
                className="h-full rounded-[1.8rem] border border-white/70 bg-white/78 p-7 shadow-[0_28px_85px_rgba(105,74,44,0.08)] backdrop-blur"
              >
                <div className="inline-flex rounded-full border border-primary/12 bg-primary/6 p-3 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-4 leading-7 text-slate-700">{value.description}</p>
                {value.detail ? (
                  <p className="mt-5 border-t border-stone-200/80 pt-5 text-sm leading-6 text-slate-600">
                    {value.detail}
                  </p>
                ) : null}
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
