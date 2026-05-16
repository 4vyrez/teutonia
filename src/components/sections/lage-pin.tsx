'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type PinSide = 'left' | 'right' | 'above' | 'below';
export type PinKind = 'primary' | 'place' | 'tram';

export type MapPin = {
  id: string;
  label: string;
  headline: string;
  body: string;
  /** Optional tag line below body (e.g. tram lines) */
  meta?: string;
  x: number;
  y: number;
  kind: PinKind;
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
  switch (side) {
    case 'left':
      return 'right-0 top-1/2 -translate-y-1/2 h-px w-4 origin-right bg-couleur-burgund/55';
    case 'right':
      return 'left-0 top-1/2 -translate-y-1/2 h-px w-4 origin-left bg-couleur-burgund/55';
    case 'above':
      return 'bottom-0 left-1/2 -translate-x-1/2 w-px h-3 origin-bottom bg-couleur-burgund/55';
    default:
      return 'top-0 left-1/2 -translate-x-1/2 w-px h-3 origin-top bg-couleur-burgund/55';
  }
}

function originForReveal(side: PinSide): string {
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
        const isPrimary = pin.kind === 'primary';
        const isTram = pin.kind === 'tram';

        return (
          <div
            key={pin.id}
            className="absolute"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            onPointerEnter={() => setActiveId(pin.id)}
            onPointerLeave={(e) => {
              const next = e.relatedTarget as Node | null;
              if (next && containerRef.current?.contains(next)) return;
              setActiveId((current) => (current === pin.id ? null : current));
            }}
          >
            {/* Pin marker — circle for places, rotated square for tram */}
            <button
              type="button"
              aria-expanded={isActive}
              aria-label={`${pin.label} — Details öffnen`}
              onClick={() => setActiveId(isActive ? null : pin.id)}
              onFocus={() => setActiveId(pin.id)}
              className={cn(
                'absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2',
                'transition-transform duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
                isPrimary &&
                  'h-3.5 w-3.5 rounded-full bg-couleur-burgund ring-[3px] ring-couleur-gold/85 shadow-[0_2px_10px_oklch(0.18_0.006_265/40%)]',
                pin.kind === 'place' &&
                  'h-2.5 w-2.5 rounded-full bg-couleur-burgund ring-2 ring-background-elev shadow-[0_1px_4px_oklch(0.18_0.006_265/30%)]',
                isTram &&
                  'h-2.5 w-2.5 rotate-45 bg-foreground ring-2 ring-background-elev shadow-[0_1px_4px_oklch(0.18_0.006_265/30%)]',
                isActive && 'scale-[1.18]',
              )}
            >
              {isPrimary && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full animate-pin-pulse"
                />
              )}
            </button>

            {/* Persistent label for the primary pin only */}
            {isPrimary && !isActive && (
              <span
                aria-hidden
                className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap font-display text-xs font-medium text-couleur-burgund opacity-90 transition-opacity duration-200"
              >
                {pin.label}
              </span>
            )}

            {/* Popover */}
            <div
              role="dialog"
              aria-label={pin.headline}
              aria-hidden={!isActive}
              className={cn(
                'pointer-events-none absolute z-20 w-56 sm:w-64',
                popoverPosition(pin.side),
                // Reserve layout space + animate in/out
                'transition-[opacity,transform] duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                isActive
                  ? 'pointer-events-auto opacity-100 translate-y-0'
                  : 'opacity-0',
                !isActive && pin.side === 'above' && 'translate-y-1',
                !isActive && pin.side === 'below' && '-translate-y-1',
                !isActive && pin.side === 'left' && 'translate-x-1',
                !isActive && pin.side === 'right' && '-translate-x-1',
              )}
            >
              {/* Connector hairline — scales in from the pin */}
              <span
                aria-hidden
                className={cn(
                  'absolute transition-transform duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                  connectorClass(pin.side),
                  isActive
                    ? 'scale-100'
                    : pin.side === 'above' || pin.side === 'below'
                      ? 'scale-y-0'
                      : 'scale-x-0',
                )}
              />

              {/* Card — clip-path reveal */}
              <div
                className={cn(
                  'rounded-lg border border-border-strong bg-background-elev/95 px-4 py-3 shadow-[0_10px_40px_oklch(0.18_0.006_265/22%)] backdrop-blur-md',
                  'transition-[clip-path,transform] duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                  originForReveal(pin.side),
                  isActive
                    ? 'scale-100 [clip-path:inset(0_0_0_0)]'
                    : 'scale-[0.97] [clip-path:inset(0_100%_0_0)]',
                )}
                style={
                  isActive
                    ? undefined
                    : pin.side === 'right'
                      ? { clipPath: 'inset(0 0 0 100%)' }
                      : pin.side === 'above'
                        ? { clipPath: 'inset(100% 0 0 0)' }
                        : pin.side === 'below'
                          ? { clipPath: 'inset(0 0 100% 0)' }
                          : undefined
                }
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-couleur-burgund/85">
                  {isTram && (
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rotate-45 bg-foreground"
                    />
                  )}
                  {pin.label}
                </div>
                <div className="font-display mt-1 text-base leading-snug text-foreground">
                  {pin.headline}
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-foreground-muted">
                  {pin.body}
                </p>
                {pin.meta && (
                  <div className="mt-3 border-t border-border pt-2 text-[10.5px] uppercase tracking-[0.18em] text-foreground-dim">
                    {pin.meta}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
