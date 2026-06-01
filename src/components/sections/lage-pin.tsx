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
          <div key={pin.id} className="absolute" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
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
                'absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background-elev',
                'transition-transform duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                'hover:scale-[1.4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
                isPrimary &&
                  'h-5 w-5 bg-couleur-burgund shadow-[0_0_0_0_var(--couleur-burgund),0_0_12px_2px_oklch(0.46_0.165_22/35%)] animate-pin-pulse',
                pin.kind === 'place' && 'h-3 w-3 bg-foreground',
                isTram && 'h-3 w-3 bg-couleur-gold',
                isActive && 'scale-[1.4]',
              )}
            >
              {/* Hover/active ring — 1px hairline, fades in (design .map-pin .ring) */}
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute -inset-1 rounded-full border border-border-strong',
                  'transition-opacity duration-[220ms]',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
              />
            </button>

            {/* Popover — pointer-events-none always, so it never blocks other pins.
                State + animation driven entirely by the pin button. */}
            <div
              role="dialog"
              aria-label={pin.headline}
              aria-hidden={!isActive}
              className={cn(
                'pointer-events-none absolute z-20 w-[200px] sm:w-[260px]',
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

                {/* Card — design .map-callout: flat bg-elev, 14px radius, soft drop */}
                <div className="rounded-[14px] border border-border-strong bg-background-elev px-4 py-3.5 shadow-[0_12px_40px_-16px_oklch(0_0_0/30%)]">
                  <div className="text-[9px] uppercase tracking-[0.26em] text-couleur-burgund">
                    {pin.label}
                  </div>
                  <div className="font-display mt-1.5 text-[17px] leading-snug text-foreground [font-variation-settings:_'opsz'_24,_'SOFT'_30]">
                    {pin.headline}
                  </div>
                  <p className="mt-2 text-[12.5px] leading-[1.55] text-foreground-muted">
                    {pin.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
