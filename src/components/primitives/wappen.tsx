import Image from 'next/image';
import { cn } from '@/lib/utils';

type WappenProps = {
  className?: string;
  /**
   * 'image'  → echtes Wappen-Foto (design_reference: assets/wappen.png).
   * 'couleur'→ stilisiertes Inline-SVG (Default, abwärtskompatibel).
   * 'mono'   → einfarbiges Inline-SVG.
   */
  variant?: 'image' | 'mono' | 'couleur';
  /** Für helle Sektionen: mix-blend multiply (entspricht `light` im Prototyp). */
  light?: boolean;
};

/**
 * Wappen — KB! Teutonia.
 *
 * Der maßgebliche Design-Soll-Zustand nutzt das Raster-Wappen
 * (public/haus/wappen.png) via `variant="image"`. Die bestehenden
 * Inline-SVG-Varianten ('couleur' Default, 'mono') bleiben unverändert,
 * damit aktuelle Header/Footer-Importe (<Wappen className="h-8 w-auto" />)
 * weiterlaufen.
 */
export function Wappen({ className, variant = 'couleur', light = false }: WappenProps) {
  if (variant === 'image') {
    return (
      <Image
        src="/haus/wappen.png"
        alt="KB! Teutonia"
        width={1450}
        height={1350}
        priority={false}
        className={cn('h-8 w-auto', light && 'mix-blend-multiply', className)}
      />
    );
  }

  if (variant === 'mono') {
    return (
      <svg
        viewBox="0 0 32 40"
        fill="none"
        aria-label="KB! Teutonia Wappen"
        className={cn('h-8 w-auto text-foreground', className)}
      >
        <path
          d="M16 1 1 6v14c0 8 6 14 15 19 9-5 15-11 15-19V6L16 1Z"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.5"
        />
        <text
          x="16"
          y="24"
          textAnchor="middle"
          fontFamily="serif"
          fontStyle="italic"
          fontSize="14"
          fill="currentColor"
        >
          T
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 32 40"
      fill="none"
      aria-label="KB! Teutonia Wappen"
      className={cn('h-8 w-auto', className)}
    >
      <defs>
        <linearGradient id="wappen-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.55 0.19 22)" />
          <stop offset="60%" stopColor="oklch(0.40 0.16 22)" />
          <stop offset="100%" stopColor="oklch(0.18 0.12 22)" />
        </linearGradient>
      </defs>
      <path
        d="M16 1 1 6v14c0 8 6 14 15 19 9-5 15-11 15-19V6L16 1Z"
        fill="url(#wappen-bg)"
        stroke="oklch(0.78 0.14 78)"
        strokeWidth="1"
      />
      {/* Goldener Vorstoß */}
      <path
        d="M2 7.2v12.4c0 7.6 5.6 13.2 14 18.2 8.4-5 14-10.6 14-18.2V7.2"
        fill="none"
        stroke="oklch(0.78 0.14 78)"
        strokeWidth="0.6"
        opacity="0.65"
      />
      <text
        x="16"
        y="25"
        textAnchor="middle"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="15"
        fill="oklch(0.96 0.04 78)"
      >
        T
      </text>
    </svg>
  );
}
