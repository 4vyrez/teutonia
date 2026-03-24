'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { homeHero } from '@/content/public-site';

const EASE = [0.25, 0.1, 0.25, 1] as const;

const TITLE_LINES = ['Manche Bindungen', 'dauern länger', 'als das Studium.'];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      {/* Background year texture */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-serif font-light text-foreground"
        style={{ fontSize: 'clamp(12rem, 30vw, 28rem)', opacity: 0.03, lineHeight: 1 }}
      >
        1843
      </span>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Eyebrow */}
        <div className="mb-10 overflow-hidden">
          <motion.p
            className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-primary"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {homeHero.eyebrow}
          </motion.p>
        </div>

        {/* Headline — 3 staggered lines */}
        <h1 className="font-serif font-light italic leading-[0.95] text-foreground"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
        >
          {TITLE_LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Gold horizontal rule */}
        <div className="mt-8 flex justify-center">
          <motion.div
            className="h-px w-24 origin-left bg-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
          />
        </div>

        {/* Description */}
        <div className="mt-8 overflow-hidden">
          <motion.p
            className="mx-auto max-w-lg font-sans text-base leading-7 text-muted-foreground"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          >
            {homeHero.description}
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
        >
          <Link
            href="/#contact"
            className="btn-shimmer inline-flex items-center rounded-full bg-primary px-8 py-3.5 font-sans text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            Jetzt bewerben
          </Link>
          <Link
            href="/#house"
            className="font-sans text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            Das Haus entdecken →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
