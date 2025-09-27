'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/restaurant-interior.jpg"
          alt="Ristorante La Cantina Bleibtreu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
            {t('title')}
          </h1>
          
          <p className="text-xl md:text-2xl font-script text-orange-200 mb-8 italic">
            {t('tagline')}
          </p>
          
          <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto opacity-90">
            {t('subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              <Link href="/reservations">
                {t('cta_reserve')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg">
              <Link href="/menu">
                {t('cta_menu')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}