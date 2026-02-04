import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  ColorsSection,
  CTASection,
} from '@/components/public/sections';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ColorsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
