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

/** ms-delay before a popover closes when the pointer leaves the pin —
 *  gives the user grace to glance toward a neighbouring pin without flicker. */
const CLOSE_DELAY = 220;

function popoverPosition(side: PinSide): string {
  switch (side) {
    case 'left':
      return 'right-full top-1/2 mr-3.5 -translate-y-1/2';
    case 'right':
      return 'left-full top-1/2 ml-3.5 -translate-y-1/2';
    case 'above':
      return 'left-1/2 bottom-full mb-2.5 -translate-x-1/2';
    default:
      return 'left-1/2 top-full mt-2.5 -translate-x-1/2';
  }
}

function connectorClass(side: PinSide): string {
  switch (side) {
    case 'left':
      return 'right-0 top-1/2 -translate-y-1/2 h-px w-3.5 origin-right bg-couleur-burgund/55';
    case 'right':
      return 'left-0 top-1/2 -translate-y-1/2 h-px w-3.5 origin-left bg-couleur-burgund/55';
    case 'above':
      return 'bottom-0 left-1/2 -translate-x-1/2 w-px h-2.5 origin-bottom bg-couleur-burgund/55';
    default:
      return 'top-0 left-1/2 -translate-x-1/2 w-px h-2.5 origin-top bg-couleur-burgund/55';
  }
}

/** Enter-from translate (when closed → opening, popover slides from pin-side) */
function closedTranslate(side: PinSide): string {
  switch (side) {
    case 'left':
      return 'translate-x-1.5';
    case 'right':
      return '-translate-x-1.5';
    case 'above':
      return 'translate-y-1.5';
    default:
      return '-translate-y-1.5';
  }
}

export function LagePins({ pins }: LagePinsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Click outside / Escape closes any open popover
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

  // Cleanup pending close-timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function openPin(id: string) {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveId(id);
  }

  function schedulePinClose(id: string) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveId((current) => (current === id ? null : current));
      closeTimerRef.current = null;
    }, CLOSE_DELAY);
  }

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
          >
            {/* Pin — only thing with pointer-events. Hover opens, leave schedules close. */}
            <button
              type="button"
              aria-expanded={isActive}
              aria-label={`${pin.label} — Details öffnen`}
              onClick={() => (isActive ? setActiveId(null) : openPin(pin.id))}
              onPointerEnter={() => openPin(pin.id)}
              onPointerLeave={() => schedulePinClose(pin.id)}
              onFocus={() => openPin(pin.id)}
              onBlur={() => schedulePinClose(pin.id)}
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
                isActive && 'scale-[1.22]',
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
            {isPrimary && (
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap font-display text-xs font-medium text-couleur-burgund',
                  'transition-opacity duration-200',
                  isActive ? 'opacity-0' : 'opacity-90',
                )}
              >
                {pin.label}
              </span>
            )}

            {/* Popover — pointer-events-none always, so it never blocks other pins.
                State + animation driven entirely by the pin button. */}
            <div
              role="dialog"
              aria-label={pin.headline}
              aria-hidden={!isActive}
              className={cn(
                'pointer-events-none absolute z-20 w-56 sm:w-64',
                popoverPosition(pin.side),
              )}
            >
              <div
                className={cn(
                  'relative will-change-transform',
                  'transition-[opacity,transform] duration-[380ms]',
                  'ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isActive
                    ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
                    : ['opacity-0 scale-[0.97]', closedTranslate(pin.side)],
                )}
              >
                {/* Connector hairline — scales in/out separately */}
                <span
                  aria-hidden
                  className={cn(
                    'absolute transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                    connectorClass(pin.side),
                    isActive
                      ? 'scale-100'
                      : pin.side === 'above' || pin.side === 'below'
                        ? 'scale-y-0'
                        : 'scale-x-0',
                  )}
                />

                {/* Card */}
                <div className="rounded-lg border border-border-strong bg-background-elev/96 px-4 py-3 shadow-[0_18px_50px_-12px_oklch(0.18_0.006_265/28%)] backdrop-blur-md">
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
          </div>
        );
      })}
    </div>
  );
}
