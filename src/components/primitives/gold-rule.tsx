import { cn } from '@/lib/utils';

type GoldRuleProps = {
  className?: string;
  variant?: 'solid' | 'dotted' | 'double';
};

export function GoldRule({ className, variant = 'solid' }: GoldRuleProps) {
  return (
    <hr
      aria-hidden
      className={cn(
        'h-px w-full border-0 bg-couleur-gold-dim opacity-30',
        variant === 'dotted' && 'bg-[length:6px_1px] bg-repeat-x bg-transparent border-t border-dotted border-couleur-gold-dim',
        variant === 'double' && 'h-[3px] border-y border-couleur-gold-dim bg-transparent',
        className,
      )}
    />
  );
}
