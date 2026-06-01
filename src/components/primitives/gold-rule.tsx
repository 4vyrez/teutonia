import { cn } from '@/lib/utils';

type GoldRuleProps = {
  className?: string;
  variant?: 'solid' | 'dotted' | 'double';
};

/**
 * GoldRule — goldener Trennstrich. design_reference/styles.css `.gold-rule`:
 * border-top 1px var(--gold-dim), opacity 0.4. `variant` + `className` bleiben.
 */
export function GoldRule({ className, variant = 'solid' }: GoldRuleProps) {
  return (
    <hr
      aria-hidden
      className={cn(
        'h-px w-full border-0 border-t border-couleur-gold-dim bg-transparent opacity-40',
        variant === 'dotted' && 'border-dotted',
        variant === 'double' && 'h-[3px] border-y',
        className,
      )}
    />
  );
}
