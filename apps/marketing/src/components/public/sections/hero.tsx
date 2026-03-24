'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { homeHero, heroStats } from '@/content/public-site';

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const words = homeHero.title.split(' ');

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      {/* Breathing ambient glows */}
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[12%] h-[38rem] w-[38rem] rounded-full bg-[rgba(198,168,117,0.12)] blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[8%] right-[6%] h-[30rem] w-[30rem] rounded-full bg-[rgba(122,47,43,0.09)] blur-3xl"
        animate={{ x: [0, -22, 0], y: [0, 16, 0] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Eyebrow */}
        <div className="overflow-hidden mb-6">
          <motion.p
            className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary/65"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {homeHero.eyebrow}
          </motion.p>
        </div>

        {/* Headline — word-by-word reveal */}
        <h1 className="font-serif text-5xl font-light italic leading-[1.08] text-foreground md:text-7xl xl:text-[5.5rem]">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden leading-[1.15]">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.07 }}
              >
                {word}
                {i < words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Description */}
        <div className="overflow-hidden mt-6">
          <motion.p
            className="mx-auto max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          >
            {homeHero.description}
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.55 }}
        >
          <Link
            href="/#contact"
            className="btn-shimmer inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            Jetzt bewerben
          </Link>
          <Link
            href="/#house"
            className="inline-flex items-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground/70 transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
          >
            Das Haus entdecken →
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-12 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {heroStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <span className="px-5 font-sans text-sm text-foreground/50">
                {stat.label}
              </span>
              {i < heroStats.length - 1 && (
                <span className="h-3.5 w-px bg-border" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/25"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
