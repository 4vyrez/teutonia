import { SiteHeader } from '@/components/sections/site-header';
import { Hero } from '@/components/sections/hero';
import { Haus } from '@/components/sections/haus';
import { Identitaet } from '@/components/sections/identitaet';
import { Saeulen } from '@/components/sections/saeulen';
import { Lage } from '@/components/sections/lage';
import { Mitgliedschaft } from '@/components/sections/mitgliedschaft';
import { Semester } from '@/components/sections/semester';
import { GeschichtePreview } from '@/components/sections/geschichte-preview';
import { Kontakt } from '@/components/sections/kontakt';
import { SiteFooter } from '@/components/sections/site-footer';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Hero />
        <Haus />
        <Identitaet />
        <Saeulen />
        <Lage />
        <Mitgliedschaft />
        <Semester />
        <GeschichtePreview />
        <Kontakt />
      </main>
      <SiteFooter />
    </>
  );
}
