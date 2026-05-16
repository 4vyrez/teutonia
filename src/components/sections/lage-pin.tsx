'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type PinSide = 'left' | 'right' | 'above' | 'below';

export type MapPin = {
  id: string;
  label: string;
  headline: string;
  body: string;
  x: number; // % from left
  y: number; // % from top
  primary?: boolean;
  side: PinSide;
};

type LagePinsProps = {
  pins: MapPin[];
};

function popoverPosition(side: PinSide): string {
  switch (side) {
    case 'left':
      return 'right-full top-1/2 mr-4 -translate-y-1/2';
    case 'right':
      return 'left-full top-1/2 ml-4 -translate-y-1/2';
    case 'above':
      return 'left-1/2 bottom-full mb-3 -translate-x-1/2';
    default:
      return 'left-1/2 top-full mt-3 -translate-x-1/2';
  }
}

function connectorClass(side: PinSide): string {
  // Burgund hairline connector from pin towards popover side
  switch (side) {
    case 'left':
      return 'right-0 top-1/2 -translate-y-1/2 h-px w-4 bg-couleur-burgund/60';
    case 'right':
      return 'left-0 top-1/2 -translate-y-1/2 h-px w-4 bg-couleur-burgund/60';
    case 'above':
      return 'bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-couleur-burgund/60';
    default:
      return 'top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-couleur-burgund/60';
  }
}

function originForReveal(side: PinSide): string {
  // Anchor the clip-reveal so it expands away from the pin
  switch (side) {
    case 'left':
      return 'origin-right';
    case 'right':
      return 'origin-left';
    case 'above':
      return 'origin-bottom';
    default:
      return 'origin-top';
  }
}

export function LagePins({ pins }: LagePinsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside closes any open pin
  useEffect(() => {
    if (!activeId) return;
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current) return;
      const target = event.target as Node | null;
      if (target && !containerRef.current.contains(target)) {
        setActiveId(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveId(null);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [activeId]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {pins.map((pin) => {
        const isActive = activeId === pin.id;
        return (
          <div
            key={pin.id}
            className="absolute"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onPointerEnter={() => setActiveId(pin.id)}
            onPointerLeave={(e) => {
              // Don't close if pointer enters the popover (still inside)
              const next = e.relatedTarget as Node | null;
              if (next && containerRef.current?.contains(next)) return;
              setActiveId((current) => (current === pin.id ? null : current));
            }}
          >
            {/* Pin button — focusable + clickable */}
            <button
              type="button"
              aria-expanded={isActive}
              aria-label={`${pin.label} — Details öffnen`}
              onClick={() => setActiveId(isActive ? null : pin.id)}
              onFocus={() => setActiveId(pin.id)}
              className={cn(
                'absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-200',
                'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
                pin.primary
                  ? 'h-3.5 w-3.5 bg-couleur-burgund ring-[3px] ring-couleur-gold/85 shadow-[0_2px_10px_oklch(0.18_0.006_265/40%)]'
                  : 'h-2.5 w-2.5 bg-couleur-burgund ring-2 ring-background-elev shadow-[0_1px_4px_oklch(0.18_0.006_265/30%)]',
                isActive && 'scale-110',
              )}
            >
              {pin.primary && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full animate-pin-pulse"
                />
              )}
            </button>

            {/* Persistent label for the primary pin only — others reveal on hover */}
            {pin.primary && !isActive && (
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute whitespace-nowrap font-display text-xs font-medium text-couleur-burgund',
                  'left-full ml-3 top-1/2 -translate-y-1/2',
                )}
              >
                {pin.label}
              </span>
            )}

            {/* Popover */}
            {isActive && (
              <div
                role="dialog"
                aria-label={pin.headline}
                className={cn(
                  'absolute z-20 w-56 sm:w-64',
                  popoverPosition(pin.side),
                )}
              >
                {/* Connector hairline */}
                <span
                  aria-hidden
                  className={cn('absolute', connectorClass(pin.side))}
                />

                <div
                  className={cn(
                    'rounded-lg border border-border-strong bg-background-elev/95 px-4 py-3 shadow-[0_10px_40px_oklch(0.18_0.006_265/22%)] backdrop-blur-md',
                    'animate-clip-reveal',
                    originForReveal(pin.side),
                  )}
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-couleur-burgund/85">
                    {pin.label}
                  </div>
                  <div className="font-display mt-1 text-base leading-snug text-foreground">
                    {pin.headline}
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-foreground-muted">
                    {pin.body}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
