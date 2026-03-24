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
  {
    ssr: false,
  }
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
    <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
              House Explorer
            </div>
            <h3 className="mt-2 font-serif text-3xl text-slate-900 md:text-4xl">
              Vom Haus zur jeweiligen Nutzung
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-primary/6 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary/80">
            <Boxes className="h-3.5 w-3.5" />
            3D-ready Struktur
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-[#e6daca] bg-[linear-gradient(180deg,rgba(255,251,245,0.96),rgba(241,232,220,0.9))]">
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
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,239,228,0.02),rgba(66,37,26,0.18))]" />

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
                    <span className="relative flex items-center gap-3">
                      <span
                        className={cn(
                          'relative flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300',
                          isActive
                            ? 'border-primary/65 bg-primary text-white shadow-[0_0_0_8px_rgba(122,47,43,0.12)]'
                            : 'border-white/95 bg-white/88 text-primary shadow-[0_18px_32px_rgba(82,57,40,0.18)]'
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {reducedMotion ? null : (
                          <motion.span
                            key={`${hotspot.id}-${index}`}
                            className="absolute inset-0 rounded-full border border-primary/40"
                            animate={{ scale: [1, 1.75], opacity: [0.45, 0] }}
                            transition={{
                              duration: 2.4,
                              repeat: Infinity,
                              ease: 'easeOut',
                              delay: index * 0.15,
                            }}
                          />
                        )}
                      </span>

                      <span
                        className={cn(
                          'hidden max-w-[14rem] rounded-full border px-3 py-2 text-xs font-medium leading-5 shadow-[0_24px_70px_rgba(79,56,40,0.14)] backdrop-blur md:block',
                          isActive
                            ? 'border-primary/20 bg-card text-foreground'
                            : 'border-border bg-card text-foreground/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'
                        )}
                      >
                        <span className="block text-[10px] uppercase tracking-[0.18em] text-primary/75">
                          {hotspot.label}
                        </span>
                        <span>{hotspot.teaser}</span>
                      </span>
                    </span>
                  </button>
                );
              })}

              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-foreground/70">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                Parkstraße 1 · Karlsruhe
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:hidden">
          {orderedHotspots.map((hotspot) => {
            const active = selectedHotspot?.id === hotspot.id;

            return (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => setSelectedHotspotId(hotspot.id)}
                className={cn(
                  'rounded-[1.4rem] border px-4 py-4 text-left transition-colors',
                  active
                    ? 'border-primary/18 bg-primary/8 text-slate-900'
                    : 'border-stone-200 bg-stone-50/80 text-slate-700'
                )}
              >
                <div className="text-xs uppercase tracking-[0.2em] text-primary/70">{hotspot.label}</div>
                <div className="mt-1 text-sm leading-6">{hotspot.teaser}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRoom.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.28 }}
            className="space-y-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
                  {selectedHotspot.label}
                </div>
                <h3 className="mt-2 font-serif text-3xl text-accent font-semibold md:text-4xl">
                  {selectedRoom.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                  {selectedRoom.teaser}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/14 bg-primary/6 px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary/80">
                <Sparkles className="h-3.5 w-3.5" />
                {selectedHotspot.cta}
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.7rem] border border-stone-200 bg-stone-50">
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

            <p className="leading-7 text-slate-700">{selectedRoom.description}</p>

            <div className="grid gap-3 md:grid-cols-3">
              {selectedRoom.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-[1.3rem] border border-stone-200 bg-[#faf5ee] p-4"
                >
                  <div className="text-[11px] uppercase tracking-[0.2em] text-primary/70">
                    {fact.label}
                  </div>
                  <div className="mt-2 text-sm font-medium leading-6 text-slate-800">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[1.6rem] border border-[#e7dccb] bg-[linear-gradient(180deg,rgba(248,242,233,0.98),rgba(255,255,255,0.95))] p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                Was diesen Bereich auszeichnet
              </div>
              <ul className="mt-4 space-y-3">
                {selectedRoom.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden gap-3 xl:grid">
              {orderedHotspots.map((hotspot) => {
                const active = selectedHotspot?.id === hotspot.id;

                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => setSelectedHotspotId(hotspot.id)}
                    className={cn(
                      'flex items-center justify-between rounded-[1.25rem] border px-4 py-4 text-left transition-colors',
                      active
                        ? 'border-primary/18 bg-primary/8 text-slate-900'
                        : 'border-stone-200 bg-stone-50/70 text-slate-700 hover:border-primary/12 hover:bg-primary/5'
                    )}
                  >
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-primary/70">
                        {hotspot.label}
                      </div>
                      <div className="mt-1 text-sm leading-6">{hotspot.teaser}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0" />
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
