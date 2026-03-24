'use client';

import { motion } from 'framer-motion';
import { MapPin, Route } from 'lucide-react';
import { HouseExplorer } from '@/components/public/house/house-explorer';
import { houseSceneAsset, houseRooms, houseHotspots, siteMeta } from '@/content/public-site';

export function HouseSectionComponent() {
  return (
    <section id="house" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-light italic text-foreground md:text-5xl">
            Dein Zuhause auf Zeit. Und mehr.
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
            Das Haus liegt in der Karlsruher Oststadt — fünf Minuten vom KIT, mitten im
            Studentenleben. 20 Zimmer, gemeinsame Räume, ein Rhythmus, der trägt.
          </p>
        </motion.div>

        {/* House Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <HouseExplorer
            sceneAsset={houseSceneAsset}
            rooms={houseRooms}
            hotspots={houseHotspots}
          />
        </motion.div>

        {/* Info pills */}
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-sans text-sm text-foreground/70">
            <MapPin className="h-4 w-4 text-primary" />
            {siteMeta.address[1]}, {siteMeta.address[2]}
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-sans text-sm text-foreground/70">
            <Route className="h-4 w-4 text-primary" />
            5 Minuten zum KIT
          </div>
        </motion.div>
      </div>
    </section>
  );
}
