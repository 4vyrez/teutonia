import { PublicShell } from '@/components/public/public-shell';
import {
  HeroSection,
  AboutSection,
  HistorySection,
  CommunitySection,
  UniversitySection,
  HouseSection,
  ContactSection,
} from '@/components/public/sections';

export default function HomePage() {
  return (
    <PublicShell>
      <>
        <HeroSection />
        <AboutSection />
        <CommunitySection />
        <UniversitySection />
        <HistorySection />
        <HouseSection />
        <ContactSection />
      </>
    </PublicShell>
  );
}
