import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type EditorialColumnProps = {
  children: ReactNode;
  className?: string;
  width?: 'tight' | 'normal' | 'wide';
};

export function EditorialColumn({
  children,
  className,
  width = 'normal',
}: EditorialColumnProps) {
  const widthClass =
    width === 'tight'
      ? 'max-w-prose-tight'
      : width === 'wide'
      ? 'max-w-prose-wide'
      : 'max-w-prose';
  return (
    <div
      className={cn(
        widthClass,
        'text-pretty text-foreground-muted leading-relaxed',
        className,
      )}
    >
      {children}
    </div>
  );
}
