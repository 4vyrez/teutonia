'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { homeHero, homeHeroActions, homeMetrics } from '@/content/public-site';

function parseNumeric(value: string): { prefix: string; num: number; suffix: string } | null {
  const match = value.match(/^([^0-9]*)(\d[\d.,]*)(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[2].replace(/,/g, ''));
  if (isNaN(num)) return null;
  return { prefix: match[1], num, suffix: match[3] };
}

function AnimatedMetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const parsed = parseNumeric(value);
  const [display, setDisplay] = useState(parsed ? '0' : value);

  useEffect(() => {
    if (!inView || !parsed) return;
    let startTime: number | null = null;
    const duration = 1600;
    const { num, prefix, suffix } = parsed;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * num);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [inView, parsed]);

  return <div ref={ref}>{display}</div>;
}

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-8 lg:pb-24">
      <div className="grid gap-8 rounded-[2.25rem] border border-white/70 bg-white/78 p-6 shadow-[0_45px_120px_rgba(95,68,43,0.12)] backdrop-blur md:p-8 xl:grid-cols-[1.1fr_0.9fr] xl:p-10">
        <div className="space-y-8">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {homeHero.eyebrow}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="space-y-6"
          >
            <h1 className="max-w-4xl text-balance font-serif text-5xl font-semibold leading-[0.92] text-slate-900 md:text-7xl xl:text-[5.5rem]">
              {homeHero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700 md:text-xl">
              {homeHero.description}
            </p>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              {homeHero.supportingText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="flex flex-wrap gap-4"
          >
            {homeHeroActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={
                  action.variant === 'primary'
                    ? 'btn-shimmer inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5'
                    : 'inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/82 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-primary/35 hover:text-primary'
                }
              >
                {action.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
          >
            {homeMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.5rem] border border-[#eadfce] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(247,239,228,0.88))] p-4"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-primary/70">{metric.label}</div>
                <div className="mt-2 font-serif text-4xl text-slate-900">
                  <AnimatedMetricValue value={metric.value} />
                </div>
                {metric.detail ? (
                  <p className="mt-2 text-sm leading-6 text-slate-600">{metric.detail}</p>
                ) : null}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18 }}
          className="grid gap-5"
        >
          <div className="overflow-hidden rounded-[2rem] border border-[#e7dcc9] bg-[#f4ece0] shadow-[0_24px_70px_rgba(104,73,44,0.09)]">
            <div className="relative aspect-[4/4.2]">
              <Image
                src="/images/house/exterior.jpg"
                alt="Haus der Teutonia in der Karlsruher Oststadt"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1279px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,249,241,0.06),rgba(71,48,31,0.28))]" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[1.5rem] border border-white/40 bg-white/78 p-4 shadow-[0_16px_45px_rgba(63,46,31,0.14)] backdrop-blur">
                <div className="text-xs uppercase tracking-[0.2em] text-primary/70">Unser Haus</div>
                <div className="mt-2 font-serif text-3xl text-slate-900">Parkstraße 1</div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-700">
                  <MapPin className="h-4 w-4 text-primary" />
                  76131 Karlsruhe, nur wenige Minuten vom KIT entfernt
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[0.65fr_1fr] xl:grid-cols-2">
            <div className="flex items-center justify-center rounded-[1.8rem] border border-[#e6dbc9] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(246,238,226,0.85))] p-8">
              <div className="relative h-36 w-28 overflow-hidden rounded-[1.5rem] border border-[#e5d6c1] bg-white shadow-[0_18px_45px_rgba(106,79,53,0.08)]">
                <Image
                  src="/images/Teutonia-wappen.jpg"
                  alt="Wappen der Teutonia"
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-[#e6dbc9] bg-[linear-gradient(135deg,rgba(118,43,40,0.08),rgba(202,171,119,0.18),rgba(255,255,255,0.92))] p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-primary/70">Gemeinschaft</div>
              <h2 className="mt-3 font-serif text-3xl text-slate-900">Mehr als ein Zimmer. Ein Zuhause.</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Wer bei der Teutonia einzieht, findet einen Ort mit Geschichte, Mittagstisch, Lernräumen
                und Menschen, die gemeinsam Verantwortung übernehmen.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
