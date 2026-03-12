'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, MoveRight } from 'lucide-react';
import type { PublicPageContent } from '@/lib/types/public';
import { PublicShell } from '@/components/public/public-shell';

export function PublicPageTemplate({ content }: { content: PublicPageContent }) {
  return (
    <PublicShell compactHeader>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-8 md:px-8 lg:pb-24">
        <div className="grid gap-8 rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-[0_40px_120px_rgba(87,61,40,0.12)] backdrop-blur xl:grid-cols-[1.25fr_0.75fr] xl:p-12">
          <div className="space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
            >
              <Compass className="h-3.5 w-3.5" />
              {content.eyebrow}
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="space-y-5"
            >
              <h1 className="max-w-4xl text-balance font-serif text-5xl font-semibold leading-[0.94] text-slate-900 md:text-7xl">
                {content.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
                {content.intro}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href={content.cta.primary.href}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                {content.cta.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={content.cta.secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-primary/30 hover:text-primary"
              >
                {content.cta.secondary.label}
                <MoveRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4 rounded-[1.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,239,228,0.9))] p-5 shadow-[0_24px_60px_rgba(121,85,57,0.08)]"
          >
            {content.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.4rem] border border-stone-200/80 bg-stone-50/80 p-5"
              >
                <div className="text-sm uppercase tracking-[0.22em] text-primary/70">{item.label}</div>
                <div className="mt-2 font-serif text-4xl text-slate-900">{item.value}</div>
                {item.detail ? (
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                ) : null}
              </div>
            ))}
          </motion.aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-20 md:px-8 lg:grid-cols-3 lg:pb-24">
        {content.highlights.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-[1.7rem] border border-white/65 bg-white/78 p-7 shadow-[0_28px_65px_rgba(103,72,43,0.08)] backdrop-blur"
          >
            <div className="mb-5 h-10 w-10 rounded-full border border-primary/15 bg-primary/7" />
            <h2 className="text-2xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-4 leading-7 text-slate-700">{item.description}</p>
          </motion.article>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:px-8 lg:grid-cols-2 lg:pb-24">
        {content.detailBlocks.map((block, index) => (
          <motion.article
            key={block.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-[1.8rem] border border-[#e7dccb] bg-[linear-gradient(180deg,rgba(252,248,241,0.94),rgba(245,237,225,0.92))] p-8 shadow-[0_28px_70px_rgba(114,82,52,0.08)]"
          >
            <h2 className="font-serif text-4xl leading-tight text-slate-900">{block.title}</h2>
            <p className="mt-5 leading-8 text-slate-700">{block.body}</p>

            {block.bullets ? (
              <ul className="mt-6 space-y-3">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {block.aside ? (
              <div className="mt-6 rounded-[1.4rem] border border-primary/12 bg-white/55 p-5 text-sm leading-6 text-slate-700">
                {block.aside}
              </div>
            ) : null}
          </motion.article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-8 lg:pb-24">
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-[2rem] border border-white/70 bg-white/82 px-8 py-10 text-center shadow-[0_28px_80px_rgba(96,70,43,0.08)] backdrop-blur md:px-14"
        >
          <p className="font-serif text-3xl leading-tight text-slate-900 md:text-5xl">
            “{content.quote.text}”
          </p>
          <footer className="mt-6 text-sm uppercase tracking-[0.2em] text-primary/75">
            {content.quote.attribution}
          </footer>
        </motion.blockquote>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-8 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="grid gap-6 rounded-[2rem] border border-[#e5d5bf] bg-[linear-gradient(120deg,rgba(113,43,40,0.08),rgba(198,168,117,0.22)_55%,rgba(255,255,255,0.92))] p-8 shadow-[0_40px_120px_rgba(110,79,49,0.08)] md:grid-cols-[1fr_auto] md:items-center md:p-12"
        >
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/80">
              Nächster Schritt
            </div>
            <h2 className="mt-3 font-serif text-4xl text-slate-900 md:text-5xl">
              {content.cta.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-700">{content.cta.description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={content.cta.primary.href}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {content.cta.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={content.cta.secondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-primary/30 hover:text-primary"
            >
              {content.cta.secondary.label}
            </Link>
          </div>
        </motion.div>
      </section>
    </PublicShell>
  );
}
