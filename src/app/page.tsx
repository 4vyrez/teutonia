import { Header, Footer } from '@/components/layout';
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
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <HistorySection />
        <CommunitySection />
        <UniversitySection />
        <HouseSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
