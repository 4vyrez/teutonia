import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: 'section' | 'div' | 'article' | 'aside';
  eyebrow?: string;
  fullBleed?: boolean;
  /** Hintergrund auf --background-veil setzen (design_reference Section `veil`). */
  veil?: boolean;
  theme?: 'light' | 'dark';
};

/**
 * Section — Sektions-Wrapper. Werte 1:1 aus design_reference/styles.css:
 * .section padding clamp(80px,11vw,160px) 0; .container max-width 1320px,
 * padding 0 clamp(20px,4vw,56px). Setzt data-theme für den Header-Scroll-Sync.
 *
 * Prop-API unverändert (id/children/className/containerClassName/as/eyebrow/
 * fullBleed/theme); `veil` ist optional ergänzt.
 */
export function Section({
  id,
  children,
  className,
  containerClassName,
  as: Tag = 'section',
  fullBleed = false,
  veil = false,
  theme,
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-theme={theme}
      className={cn(
        'relative py-[clamp(80px,11vw,160px)] text-foreground',
        veil ? 'bg-background-veil' : 'bg-background',
        className,
      )}
    >
      {fullBleed ? (
        children
      ) : (
        <div
          className={cn(
            'mx-auto w-full max-w-[1320px] px-[clamp(20px,4vw,56px)]',
            containerClassName,
          )}
        >
          {children}
        </div>
      )}
    </Tag>
  );
}

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Eyebrow — Kapitälchen-Label mit Gold-Strich. Nutzt die `.eyebrow`-Klasse
 * (globals.css): burgund, 11px, ls 0.26em, 32px-Strich vorne. `children` +
 * `className` bleiben unverändert.
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return <div className={cn('eyebrow', className)}>{children}</div>;
}
