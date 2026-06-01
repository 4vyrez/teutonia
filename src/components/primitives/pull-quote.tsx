import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PullQuoteProps = {
  children: ReactNode;
  /** Quellen-/Autorzeile unter dem Zitat. */
  attribution?: string;
  /** Alias für `attribution` (design_reference nennt es `source`). */
  source?: string;
  className?: string;
};

/**
 * PullQuote — Editorial-Zitat. Werte 1:1 aus design_reference/shared.jsx → PullQuote:
 * grid 3px·1fr, gap 22, Bar = gold→gold-dim (.pullquote-bar), Fraunces italic
 * clamp(20px,2vw,24px) / lh 1.42 / opsz 48 SOFT 60, Anführungszeichen um den Text,
 * figcaption 10px upper / ls 0.22em / gold-dim / Inter 500.
 * Backward-compatible: `attribution` bleibt; `source` ist optionaler Alias.
 */
export function PullQuote({ children, attribution, source, className }: PullQuoteProps) {
  const caption = attribution ?? source;
  return (
    <figure className={cn('relative mt-9 grid grid-cols-[3px_1fr] gap-[22px]', className)}>
      <span aria-hidden className="pullquote-bar self-stretch rounded-full" />
      <div>
        <blockquote className="font-display italic text-foreground text-[clamp(20px,2vw,24px)] leading-[1.42] [font-variation-settings:'opsz'_48,'SOFT'_60]">
          &ldquo;{children}&rdquo;
        </blockquote>
        {caption ? (
          <figcaption className="mt-3.5 font-sans text-[10px] font-medium uppercase not-italic tracking-[0.22em] text-couleur-gold-dim">
            {caption}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
