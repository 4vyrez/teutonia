import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const buttonStyles = cva(
  [
    'group inline-flex items-center justify-center gap-2 rounded-md',
    'font-sans text-sm font-medium leading-none tracking-wide',
    'transition-[background-color,color,border-color,box-shadow,transform] duration-200',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-couleur-burgund text-primary-foreground',
          'hover:bg-couleur-burgund-hi',
          'shadow-[0_1px_0_oklch(1_0_0/8%)_inset,0_8px_24px_-12px_oklch(0.42_0.16_22/55%)]',
        ],
        ghost: [
          'border border-border-strong text-foreground',
          'hover:border-couleur-gold-dim hover:text-foreground',
          'hover:bg-foreground/5',
        ],
        link: ['p-0 text-foreground underline-gold hover:text-couleur-gold'],
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-6',
        lg: 'h-12 px-8 text-[0.9375rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & { children: ReactNode };

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={props.type ?? 'button'}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonStyles> & { children: ReactNode };

export function LinkButton({
  className,
  variant,
  size,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a className={cn(buttonStyles({ variant, size }), className)} {...props}>
      {children}
    </a>
  );
}

export { buttonStyles };
