import { cva, type VariantProps } from 'class-variance-authority';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Button — Werte 1:1 aus design_reference/styles.css (.btn .btn-primary
 * .btn-ghost .btn-pill). Die mehrschichtigen Schatten + ::before-Glow +
 * ::after-Highlight + .arrow-Hover liegen als @layer components in globals.css;
 * cva mappt hier nur die Klassen-Kombinationen.
 *
 * Backward-compatible: `variant` (primary/ghost/link) und `size` (sm/md/lg)
 * bleiben unverändert. Neu ergänzt: `variant: 'pill'` (+ `tone` für pill
 * dark/light) und das `<Arrow>`-Span für den Hover-Translate.
 */
const buttonStyles = cva('', {
  variants: {
    variant: {
      primary: 'btn btn-primary',
      ghost: 'btn btn-ghost',
      pill: 'btn-pill',
      // `link` hat im Design keine .btn-Entsprechung — eigenständig, wie bisher.
      link: [
        'group inline-flex items-center justify-center gap-2 p-0',
        'font-sans text-sm font-medium leading-none tracking-wide',
        'text-foreground underline-gold transition-colors duration-200',
        'hover:text-couleur-gold',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
      ],
    },
    /** Größen-Modifier (.sm/.lg) der Prototyp-Buttons. md = Basis (kein Modifier). */
    size: {
      sm: 'sm',
      md: '',
      lg: 'lg',
    },
    /** Pill-Tonalität — folgt sonst dem Section-Theme manuell. */
    tone: {
      dark: 'btn-pill-dark',
      light: 'btn-pill-light',
    },
  },
  compoundVariants: [
    // tone gilt nur für die Pill-Variante.
    { variant: 'pill', tone: 'dark', class: 'btn-pill-dark' },
    { variant: 'pill', tone: 'light', class: 'btn-pill-light' },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// `tone` nur anwenden, wenn variant === 'pill' (sonst hängt es .btn-pill-* an
// Nicht-Pill-Buttons). Wir filtern das in den Komponenten unten.
type Variants = VariantProps<typeof buttonStyles>;

function resolveClass({ variant, size, tone }: Variants, className?: string): string {
  const isPill = variant === 'pill';
  const isLink = variant === 'link';
  return cn(
    buttonStyles({
      variant,
      // size-Modifier macht nur für primary/ghost Sinn.
      size: isPill || isLink ? undefined : size,
      tone: isPill ? (tone ?? 'dark') : undefined,
    }),
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Variants & { children: ReactNode };

export function Button({ className, variant, size, tone, children, ...props }: ButtonProps) {
  return (
    <button
      type={props.type ?? 'button'}
      className={resolveClass({ variant, size, tone }, className)}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & Variants & { children: ReactNode };

export function LinkButton({
  className,
  variant,
  size,
  tone,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a className={resolveClass({ variant, size, tone }, className)} {...props}>
      {children}
    </a>
  );
}

/**
 * Arrow — Pfeil-Span mit Hover-Translate (siehe .btn .arrow in globals.css).
 * In Button/LinkButton legen, z. B. `<LinkButton>Mehr <Arrow /></LinkButton>`.
 * `direction="down"` nutzt den vertikalen Translate (.arrow-down).
 */
export function Arrow({
  direction = 'right',
  children,
}: {
  direction?: 'right' | 'down';
  children?: ReactNode;
}) {
  return (
    <span aria-hidden className={direction === 'down' ? 'arrow arrow-down' : 'arrow'}>
      {children ?? (direction === 'down' ? '↓' : '→')}
    </span>
  );
}

export { buttonStyles };
