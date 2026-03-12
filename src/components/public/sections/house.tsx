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
          Ein Explorer, der vom Gebäude zu den tatsächlichen Räumen führt.
        </h2>
        <p className="text-lg leading-8 text-slate-700">
          Die Haus-Sektion arbeitet nicht mehr mit einer generischen Lightbox. Sie zeigt das Haus
          als zusammenhängenden Ort und führt von diskreten Punkten zu Nutzung, Atmosphäre und
          den dazugehörigen Innenräumen.
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
            <span className="text-xs font-semibold uppercase tracking-[0.24em]">Model-ready</span>
          </div>
          <h3 className="mt-4 font-serif text-3xl text-slate-900">
            Die Struktur ist auf ein späteres 3D-Modell vorbereitet.
          </h3>
          <p className="mt-4 leading-7 text-slate-700">
            Hotspots, Raumdaten und das Szenen-Asset sind bewusst getrennt. Sobald ein bereinigtes
            `glb`-Modell vorliegt, kann der Explorer vom Foto-Stage auf eine echte 3D-Szene
            umgestellt werden, ohne die UX neu zu bauen.
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
            <span className="text-xs font-semibold uppercase tracking-[0.24em]">AI- & Blender-Pfad</span>
          </div>
          <h3 className="mt-4 font-serif text-3xl text-slate-900">
            Der nächste Ausbauschritt ist definiert, nicht dem Zufall überlassen.
          </h3>
          <p className="mt-4 leading-7 text-slate-700">
            Welche Fotos, Perspektiven und Exportformate für ein echtes 3D-Modell benötigt werden,
            ist im Repo dokumentiert. Damit kannst du gezielt Material sammeln oder an einen
            externen Modellierungs-Workflow übergeben.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Weiteres Material abstimmen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.article>
      </div>
    </section>
  );
}
