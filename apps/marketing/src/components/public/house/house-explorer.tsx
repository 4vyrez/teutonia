'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Boxes, Building2, Sparkles } from 'lucide-react';
import { cn } from '@teutonia/shared';
import type { HouseHotspot, HouseRoom, HouseSceneAsset } from '@/lib/types/public';

const DynamicHouseSceneCanvas = dynamic(
  () => import('@/components/public/house/house-scene-canvas').then((module) => module.HouseSceneCanvas),
  { ssr: false }
);

function orderHotspots(hotspots: HouseHotspot[]) {
  return [...hotspots].sort((left, right) => left.mobileOrder - right.mobileOrder);
}

export function HouseExplorer({
  sceneAsset,
  rooms,
  hotspots,
}: {
  sceneAsset: HouseSceneAsset;
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

  const selectedHotspot =
    orderedHotspots.find((hotspot) => hotspot.id === selectedHotspotId) ?? orderedHotspots[0];
  const selectedRoom = selectedHotspot ? roomsById[selectedHotspot.roomId] : rooms[0];

  return (
    <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
      {/* Left: scene + hotspots */}
      <div className="rounded-xl border border-border bg-card p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
              House Explorer
            </div>
            <h3 className="mt-1.5 font-serif text-2xl italic text-foreground md:text-3xl">
              Vom Haus zur jeweiligen Nutzung
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-primary/15 bg-primary/6 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-primary/80">
            <Boxes className="h-3.5 w-3.5" />
            3D-ready
          </div>
        </div>

        {/* Scene */}
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card">
          {sceneAsset.kind === 'glb' ? (
            <div className="relative aspect-[16/10] w-full">
              <DynamicHouseSceneCanvas src={sceneAsset.src} poster={sceneAsset.poster} />
            </div>
          ) : (
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={sceneAsset.src}
                alt={sceneAsset.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1279px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(44,26,14,0.25))]" />

              {/* Hotspot buttons */}
              {orderedHotspots.map((hotspot, index) => {
                const isActive = selectedHotspot?.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => setSelectedHotspotId(hotspot.id)}
                    onFocus={() => setSelectedHotspotId(hotspot.id)}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 text-left"
                    style={{
                      left: `${hotspot.stagePosition.x}%`,
                      top: `${hotspot.stagePosition.y}%`,
                    }}
                    aria-pressed={isActive}
                    aria-label={`${hotspot.label}: ${hotspot.teaser}`}
                  >
                    <span className="relative flex items-center gap-2.5">
                      {/* Dot */}
                      <span
                        className={cn(
                          'relative flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300',
                          isActive
                            ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_0_6px_rgba(122,47,43,0.15)]'
                            : 'border-border bg-card text-foreground/50 shadow-sm'
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {reducedMotion ? null : (
                          <motion.span
                            key={`${hotspot.id}-${index}`}
                            className="absolute inset-0 rounded-full border border-primary/40"
                            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: 'easeOut',
                              delay: index * 0.18,
                            }}
                          />
                        )}
                      </span>

                      {/* Label */}
                      <span
                        className={cn(
                          'hidden max-w-[13rem] rounded-lg border px-2.5 py-1.5 text-xs font-medium leading-5 shadow-sm md:block',
                          isActive
                            ? 'border-primary/20 bg-card text-foreground'
                            : 'border-border bg-card text-foreground/70 opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100'
                        )}
                      >
                        <span className="block text-[9px] uppercase tracking-[0.16em] text-primary/70">
                          {hotspot.label}
                        </span>
                        <span>{hotspot.teaser}</span>
                      </span>
                    </span>
                  </button>
                );
              })}

              {/* Address badge */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground/70">
                <Building2 className="h-3 w-3 text-primary" />
                Parkstraße 1 · Karlsruhe
              </div>
            </div>
          )}
        </div>

        {/* Mobile hotspot grid */}
        <div className="mt-4 grid gap-2 sm:grid-cols-2 md:hidden">
          {orderedHotspots.map((hotspot) => {
            const active = selectedHotspot?.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => setSelectedHotspotId(hotspot.id)}
                className={cn(
                  'rounded-lg border px-3 py-3 text-left transition-colors',
                  active
                    ? 'border-primary/20 bg-primary/6 text-foreground'
                    : 'border-border bg-background text-foreground/70'
                )}
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-primary/70">{hotspot.label}</div>
                <div className="mt-0.5 text-sm leading-6">{hotspot.teaser}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: room detail */}
      <div className="rounded-xl border border-border bg-card p-5 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRoom.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
                  {selectedHotspot.label}
                </div>
                <h3 className="mt-1.5 font-serif text-2xl italic text-accent-foreground md:text-3xl">
                  {selectedRoom.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  {selectedRoom.teaser}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-primary/15 bg-primary/6 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-primary/80">
                <Sparkles className="h-3 w-3" />
                {selectedHotspot.cta}
              </div>
            </div>

            {/* Room image */}
            <div className="overflow-hidden rounded-lg border border-border bg-muted">
              <div className="relative aspect-[16/10]">
                <Image
                  src={selectedRoom.media[0].src}
                  alt={selectedRoom.media[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1279px) 100vw, 36vw"
                />
              </div>
            </div>

            <p className="text-sm leading-7 text-foreground/80">{selectedRoom.description}</p>

            {/* Facts */}
            <div className="grid gap-2 md:grid-cols-3">
              {selectedRoom.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-lg border border-border bg-background p-3"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-primary/70">
                    {fact.label}
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-foreground">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/75">
                Was diesen Bereich auszeichnet
              </div>
              <ul className="mt-3 space-y-2.5">
                {selectedRoom.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-foreground/80">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* XL room nav */}
            <div className="hidden gap-2 xl:grid">
              {orderedHotspots.map((hotspot) => {
                const active = selectedHotspot?.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => setSelectedHotspotId(hotspot.id)}
                    className={cn(
                      'flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors',
                      active
                        ? 'border-primary/20 bg-primary/6 text-foreground'
                        : 'border-border bg-background text-foreground/70 hover:border-primary/15 hover:bg-primary/4'
                    )}
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-primary/70">
                        {hotspot.label}
                      </div>
                      <div className="mt-0.5 text-sm">{hotspot.teaser}</div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-foreground/40" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
