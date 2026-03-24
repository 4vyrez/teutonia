import { PublicShell } from '@/components/public/public-shell';
import {
  HeroSection,
  NumbersSection,
  AreasSection,
  HouseSectionComponent,
  QuoteSection,
  HistorySection,
  ContactSection,
} from '@/components/public/sections';

export default function HomePage() {
  return (
    <PublicShell>
      <>
        <HeroSection />
        <NumbersSection />
        <AreasSection />
        <HouseSectionComponent />
        <QuoteSection />
        <HistorySection />
        <ContactSection />
      </>
    </PublicShell>
  );
}
