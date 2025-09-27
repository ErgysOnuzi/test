import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MenuHighlights from '@/components/MenuHighlights';
import ReservationCTA from '@/components/ReservationCTA';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <MenuHighlights />
      <ReservationCTA />
    </main>
  );
}