'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Home, ArrowLeft, ChefHat, MapPin } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function LocaleNotFound() {
  const params = useParams();
  const locale = (params?.locale as string) || 'de';

  const translations = {
    de: {
      title: '404',
      heading: 'Seite nicht gefunden',
      description:
        'Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.',
      homeButton: 'Zur Startseite',
      suggestionsText: 'Oder besuchen Sie unsere',
      menu: 'Speisekarte',
      contact: 'Kontakt',
      reservations: 'Reservierungen',
      gallery: 'Galerie',
      orText: 'oder',
      restaurantName: 'La Cantina Berlin',
    },
    en: {
      title: '404',
      heading: 'Page Not Found',
      description:
        'The page you are looking for does not exist or has been moved.',
      homeButton: 'Go to Home',
      suggestionsText: 'Or visit our',
      menu: 'Menu',
      contact: 'Contact',
      reservations: 'Reservations',
      gallery: 'Gallery',
      orText: 'or',
      restaurantName: 'La Cantina Berlin',
    },
  };

  const t = translations[locale as 'de' | 'en'] || translations.de;

  return (
    <div className='min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-background via-background to-secondary/5'>
      <div className='text-center max-w-2xl mx-auto'>
        {/* Restaurant Icon */}
        <div className='mb-8'>
          <ChefHat className='w-24 h-24 text-primary mx-auto mb-6 opacity-80' />
        </div>

        {/* 404 Content */}
        <div className='mb-12'>
          <h1 className='text-8xl md:text-9xl font-serif font-bold text-primary mb-6'>
            {t.title}
          </h1>
          <h2 className='text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6'>
            {t.heading}
          </h2>
          <p className='text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg mx-auto'>
            {t.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className='space-y-6'>
          <Link
            href={`/${locale}`}
            className='inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105'
          >
            <Home className='w-5 h-5' />
            {t.homeButton}
          </Link>

          {/* Navigation Suggestions */}
          <div className='bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/30'>
            <p className='text-muted-foreground mb-6 text-lg'>
              {t.suggestionsText}
            </p>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <Link
                href={`/${locale}/menu`}
                className='group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20'
              >
                <ChefHat className='w-8 h-8 text-primary group-hover:scale-110 transition-transform' />
                <span className='text-sm font-medium text-foreground group-hover:text-primary'>
                  {t.menu}
                </span>
              </Link>

              <Link
                href={`/${locale}/reservations`}
                className='group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20'
              >
                <MapPin className='w-8 h-8 text-primary group-hover:scale-110 transition-transform' />
                <span className='text-sm font-medium text-foreground group-hover:text-primary'>
                  {t.reservations}
                </span>
              </Link>

              <Link
                href={`/${locale}/gallery`}
                className='group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20'
              >
                <div className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <span className='text-primary font-bold text-sm'>G</span>
                </div>
                <span className='text-sm font-medium text-foreground group-hover:text-primary'>
                  {t.gallery}
                </span>
              </Link>

              <Link
                href={`/${locale}/contact`}
                className='group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20'
              >
                <div className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <span className='text-primary font-bold text-sm'>@</span>
                </div>
                <span className='text-sm font-medium text-foreground group-hover:text-primary'>
                  {t.contact}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Restaurant Branding */}
        <div className='mt-12 pt-8 border-t border-border/30'>
          <p className='text-muted-foreground text-sm'>{t.restaurantName}</p>
        </div>
      </div>
    </div>
  );
}
