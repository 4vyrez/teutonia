import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CaptionProps = {
  children: ReactNode;
  className?: string;
  number?: string;
};

export function Caption({ children, className, number }: CaptionProps) {
  return (
    <p
      className={cn(
        'mt-3 flex items-baseline gap-2 text-xs tabular-nums tracking-wide text-foreground-dim sm:text-[0.8125rem]',
        className,
      )}
    >
      {number ? (
        <span className="font-display text-couleur-gold-dim">{number}</span>
      ) : null}
      <span className="text-pretty">{children}</span>
    </p>
  );
}
