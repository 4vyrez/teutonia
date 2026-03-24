'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { homePillars } from '@/content/public-site';
import { SpotlightCard } from '@teutonia/shared/components/ui/spotlight-card';

export function CommunitySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 md:px-8 lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div className="space-y-5">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75">
            Bereiche
          </span>
          <h2 className="font-serif text-4xl text-slate-900 md:text-6xl">
            Vier Perspektiven auf denselben Kern.
          </h2>
          <p className="text-lg leading-8 text-slate-700">
            Studium, Karriere, Veranstaltungen und Freundschaft sind keine getrennten Themen. Sie
            zeigen nur unterschiedliche Seiten derselben Gemeinschaft.
          </p>
        </div>

        <div className="rounded-[1.8rem] border border-[#e6dbc9] bg-[linear-gradient(120deg,rgba(115,45,40,0.07),rgba(199,168,117,0.2),rgba(255,255,255,0.9))] p-6 text-sm leading-7 text-slate-700 shadow-[0_28px_70px_rgba(109,78,47,0.08)]">
          Jedes Thema hat seinen eigenen Raum — mit konkreten Einblicken, Erfahrungsberichten und
          klaren Antworten auf das, was Studienanfänger und Interessierte wirklich beschäftigt.
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {homePillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08 }}
          >
            <SpotlightCard
              spotlightColor="rgba(122,47,43,0.07)"
              className="h-full rounded-[1.8rem] border border-white/70 bg-white/80 shadow-[0_28px_80px_rgba(103,75,49,0.08)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
            >
              <Link
                href={pillar.href}
                className="group flex h-full flex-col p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
                    {pillar.eyebrow}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-5 font-serif text-3xl text-slate-900">{pillar.title}</h3>
                <p className="mt-4 leading-7 text-slate-700">{pillar.description}</p>
              </Link>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
