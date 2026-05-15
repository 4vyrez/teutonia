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
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  as: Tag = 'section',
  fullBleed = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn('relative py-24 sm:py-28 lg:py-32', className)}
    >
      {fullBleed ? (
        children
      ) : (
        <div
          className={cn(
            'mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12',
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

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-couleur-gold-dim',
        className,
      )}
    >
      <span aria-hidden className="inline-block h-px w-8 bg-couleur-gold-dim" />
      <span className="font-medium">{children}</span>
    </div>
  );
}
