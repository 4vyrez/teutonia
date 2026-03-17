'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Boxes, ScanSearch } from 'lucide-react';
import { houseHotspots, houseRooms, houseSceneAsset } from '@/content/public-site';
import { HouseExplorer } from '@/components/public/house/house-explorer';

export function HouseSection() {
  return (
    <section id="house" className="mx-auto max-w-7xl px-6 pb-20 md:px-8 lg:pb-24">
      <div className="space-y-5 pb-10 md:max-w-4xl">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75">
          Unser Haus
        </span>
        <h2 className="font-serif text-4xl text-slate-900 md:text-6xl">
          Ein Haus, das man besser versteht, wenn man es von innen sieht.
        </h2>
        <p className="text-lg leading-8 text-slate-700">
          Das Haus der Teutonia in der Karlsruher Oststadt ist kein Wohnheim, sondern ein gelebter
          Ort. Wähle einen Bereich und entdecke, wie Räume, Alltag und Gemeinschaft zusammenkommen.
        </p>
      </div>

      <HouseExplorer sceneAsset={houseSceneAsset} rooms={houseRooms} hotspots={houseHotspots} />

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-[1.9rem] border border-white/70 bg-white/78 p-6 shadow-[0_28px_90px_rgba(106,76,44,0.08)] backdrop-blur"
        >
          <div className="flex items-center gap-3 text-primary">
            <Boxes className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em]">20 Zimmer</span>
          </div>
          <h3 className="mt-4 font-serif text-3xl text-slate-900">
            Wohnen direkt im Haus der Gemeinschaft.
          </h3>
          <p className="mt-4 leading-7 text-slate-700">
            Zwanzig möblierte Zimmer, ein gemeinsamer Mittagstisch und kurze Wege zum KIT.
            Das Haus ist kein Internat, sondern ein Ort, an dem man sich bewusst entscheidet,
            Teil von etwas Größerem zu sein.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.06 }}
          className="rounded-[1.9rem] border border-[#e7dccb] bg-[linear-gradient(120deg,rgba(116,44,40,0.08),rgba(198,168,117,0.18),rgba(255,255,255,0.9))] p-6 shadow-[0_28px_90px_rgba(106,76,44,0.08)]"
        >
          <div className="flex items-center gap-3 text-primary">
            <ScanSearch className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em]">Zimmer anfragen</span>
          </div>
          <h3 className="mt-4 font-serif text-3xl text-slate-900">
            Interesse an einem Zimmer oder am Kennenlernen?
          </h3>
          <p className="mt-4 leading-7 text-slate-700">
            Wer bei uns einziehen oder die Teutonia unverbindlich kennenlernen möchte, kann jederzeit
            Kontakt aufnehmen. Einfach Studienfach und gewünschten Zeitraum mitschicken.
          </p>
          <Link
            href="/#contact"
            className="btn-shimmer mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Jetzt Kontakt aufnehmen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.article>
      </div>
    </section>
  );
}
