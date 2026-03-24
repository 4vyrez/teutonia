'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { homeHero, heroStats } from '@/content/public-site';
import { cn } from '@teutonia/shared';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      {/* Breathing ambient glows */}
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[15%] h-[40rem] w-[40rem] rounded-full bg-[rgba(198,168,117,0.13)] blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[10%] right-[8%] h-[32rem] w-[32rem] rounded-full bg-[rgba(122,47,43,0.1)] blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Eyebrow */}
        <motion.p
          className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary/70"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {homeHero.eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-serif text-5xl font-light italic leading-[1.1] text-foreground md:text-7xl xl:text-8xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {homeHero.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {homeHero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/#contact"
            className={cn(
              'btn-shimmer inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5'
            )}
          >
            Jetzt bewerben
          </Link>
          <Link
            href="/#house"
            className="inline-flex items-center rounded-full border border-primary/25 px-7 py-3.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:border-primary/50 hover:text-foreground"
          >
            Das Haus entdecken →
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          {heroStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <span className="px-5 font-sans text-sm font-medium text-foreground/60">
                {stat.label}
              </span>
              {i < heroStats.length - 1 && (
                <span className="h-4 w-px bg-border" />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/30"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
