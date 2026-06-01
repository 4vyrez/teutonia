import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StatProps = {
  value: ReactNode;
  label: ReactNode;
  unit?: ReactNode;
  /** Optional sub-line below the label (design: muted, 12px). */
  sub?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
};

/**
 * Stat — Kennzahl. Werte 1:1 aus design_reference (.stat-value/.stat-unit/.stat-label):
 * value: Fraunces 300, clamp(40px,4.5vw,56px), opsz 72, tabular, ls -0.02em.
 * unit:  0.4em, burgund. label: 10px upper, ls 0.24em, dim. sub: 12px muted.
 * Props (value/label/unit/align/className) sind unverändert; `sub` ist optional ergänzt.
 */
export function Stat({ value, label, unit, sub, className, align = 'left' }: StatProps) {
  return (
    <div
      className={cn('flex flex-col', align === 'center' && 'items-center text-center', className)}
    >
      <div className="flex items-baseline">
        <span className="font-display font-light leading-none tabular-nums text-foreground text-[clamp(40px,4.5vw,56px)] tracking-[-0.02em] [font-variation-settings:'opsz'_72,'SOFT'_0,'WONK'_0]">
          {value}
        </span>
        {unit ? (
          <span className="ml-1 font-display text-[0.4em] text-couleur-burgund">{unit}</span>
        ) : null}
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-[0.24em] text-foreground-dim">
        {label}
      </div>
      {sub ? <div className="mt-1.5 text-xs text-foreground-muted">{sub}</div> : null}
    </div>
  );
}
