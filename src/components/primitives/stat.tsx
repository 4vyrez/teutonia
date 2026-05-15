import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StatProps = {
  value: ReactNode;
  label: ReactNode;
  unit?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
};

export function Stat({
  value,
  label,
  unit,
  className,
  align = 'left',
}: StatProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <div className="flex items-baseline gap-1.5 font-display text-4xl tabular-nums leading-none text-foreground sm:text-5xl">
        <span>{value}</span>
        {unit ? (
          <span className="text-xl text-couleur-gold-dim sm:text-2xl">
            {unit}
          </span>
        ) : null}
      </div>
      <div className="text-xs uppercase tracking-[0.22em] text-foreground-dim">
        {label}
      </div>
    </div>
  );
}
