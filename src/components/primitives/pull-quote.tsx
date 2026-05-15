import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PullQuoteProps = {
  children: ReactNode;
  attribution?: string;
  className?: string;
};

export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <figure
      className={cn(
        'relative my-12 grid grid-cols-[3px_1fr] gap-6 sm:gap-8',
        className,
      )}
    >
      <span
        aria-hidden
        className="pullquote-bar self-stretch rounded-full"
      />
      <div>
        <blockquote className="font-display text-2xl leading-snug text-foreground text-balance sm:text-3xl">
          {children}
        </blockquote>
        {attribution ? (
          <figcaption className="mt-4 text-sm uppercase tracking-[0.18em] text-couleur-gold-dim">
            {attribution}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
