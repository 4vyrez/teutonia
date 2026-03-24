'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HouseHotspot, HouseRoom } from '@/lib/types/public';

function orderHotspots(hotspots: HouseHotspot[]) {
  return [...hotspots].sort((left, right) => left.mobileOrder - right.mobileOrder);
}

export function HouseExplorer({
  rooms,
  hotspots,
}: {
  rooms: HouseRoom[];
  hotspots: HouseHotspot[];
}) {
  const reducedMotion = useReducedMotion();
  const orderedHotspots = useMemo(() => orderHotspots(hotspots), [hotspots]);
  const roomsById = useMemo(
    () => Object.fromEntries(rooms.map((room) => [room.id, room])),
    [rooms]
  );
  const [selectedHotspotId, setSelectedHotspotId] = useState(orderedHotspots[0]?.id ?? '');
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedHotspot =
    orderedHotspots.find((hotspot) => hotspot.id === selectedHotspotId) ?? orderedHotspots[0];
  const selectedRoom = selectedHotspot ? roomsById[selectedHotspot.roomId] : rooms[0];

  function selectRoom(id: string) {
    if (id !== selectedHotspotId) setIsExpanded(false);
    setSelectedHotspotId(id);
  }

  const heroTransition = reducedMotion ? { duration: 0 } : { duration: 0.45 };
  const heroVariants = {
    initial: { opacity: 0, scale: reducedMotion ? 1 : 1.04 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: reducedMotion ? 1 : 0.98 },
  };

  return (
    <div className="space-y-3">
      {/* Hero */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-stone-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRoom.id}
            variants={heroVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={heroTransition}
            className="absolute inset-0"
          >
            <Image
              src={selectedRoom.media[0].src}
              alt={selectedRoom.media[0].alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 90vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,16,8,0.75)_0%,rgba(28,16,8,0.15)_45%,transparent_100%)]" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">
                {selectedHotspot.label}
              </div>
              <h3 className="mt-2 font-serif text-3xl text-white md:text-4xl">
                {selectedRoom.title}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Info Bar */}
      <div className="overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/80 shadow-[0_12px_40px_rgba(100,70,40,0.08)] backdrop-blur">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRoom.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.22 }}
            className="flex flex-wrap items-center gap-3 p-4 md:flex-nowrap md:gap-5 md:px-5"
          >
            <p className="min-w-0 flex-1 text-sm leading-6 text-slate-700">
              {selectedRoom.teaser}
            </p>
            {selectedRoom.facts.slice(0, 2).map((fact) => (
              <div
                key={fact.label}
                className="flex-shrink-0 rounded-full border border-stone-200 bg-stone-50 px-3.5 py-1.5 text-center"
              >
                <div className="text-[9px] uppercase tracking-[0.18em] text-primary/60">
                  {fact.label}
                </div>
                <div className="text-xs font-semibold text-slate-800">{fact.value}</div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-primary/15 bg-primary/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10"
            >
              {isExpanded ? 'Weniger' : 'Mehr erfahren'}
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Accordion Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.32, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRoom.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
                  className="space-y-5 border-t border-stone-200/80 px-4 py-5 md:px-5"
                >
                  <p className="leading-7 text-slate-700">{selectedRoom.description}</p>
                  <ul className="space-y-2">
                    {selectedRoom.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {selectedRoom.facts.map((fact) => (
                      <div
                        key={fact.label}
                        className="rounded-[1.2rem] border border-stone-200 bg-[#faf5ee] px-4 py-3"
                      >
                        <div className="text-[10px] uppercase tracking-[0.2em] text-primary/65">
                          {fact.label}
                        </div>
                        <div className="mt-1.5 text-sm font-medium leading-5 text-slate-800">
                          {fact.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pill Navigation */}
      <div className="flex flex-wrap gap-2">
        {orderedHotspots.map((hotspot) => {
          const active = hotspot.id === selectedHotspotId;
          return (
            <button
              key={hotspot.id}
              type="button"
              onClick={() => selectRoom(hotspot.id)}
              aria-pressed={active}
              className={cn(
                'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200',
                active
                  ? 'border-primary/20 bg-primary text-white shadow-[0_4px_16px_rgba(122,47,43,0.22)]'
                  : 'border-stone-200 bg-white/80 text-slate-600 hover:border-primary/15 hover:bg-primary/5 hover:text-primary'
              )}
            >
              {hotspot.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
