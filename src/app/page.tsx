import { FAQ } from '@/components/sections/faq';
import { GeschichtePreview } from '@/components/sections/geschichte-preview';
import { Haus } from '@/components/sections/haus';
import { Hero } from '@/components/sections/hero';
import { Kontakt } from '@/components/sections/kontakt';
import { Lage } from '@/components/sections/lage';
import { Mitgliedschaft } from '@/components/sections/mitgliedschaft';
import { Saeulen } from '@/components/sections/saeulen';
import { Semester } from '@/components/sections/semester';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHeader } from '@/components/sections/site-header';
import { Zimmer } from '@/components/sections/zimmer';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Hero />
        <Haus />
        <Zimmer />
        <Saeulen />
        <Lage />
        <Mitgliedschaft />
        <Semester />
        <GeschichtePreview />
        <FAQ />
        <Kontakt />
      </main>
      <SiteFooter />
    </>
  );
}
