import { useTranslations } from 'next-intl';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MenuHighlights from '@/components/MenuHighlights';
import ReservationCTA from '@/components/ReservationCTA';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <MenuHighlights />
      <ReservationCTA />
    </div>
  );
}