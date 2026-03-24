import { PublicShell } from '@/components/public/public-shell';
import {
  HeroSection,
  PromiseSection,
  BelongingSection,
  HouseSectionComponent,
  CommunitySection,
  HistorySection,
  ContactSection,
} from '@/components/public/sections';

export default function HomePage() {
  return (
    <PublicShell>
      <>
        <HeroSection />
        <PromiseSection />
        <BelongingSection />
        <HouseSectionComponent />
        <CommunitySection />
        <HistorySection />
        <ContactSection />
      </>
    </PublicShell>
  );
}
