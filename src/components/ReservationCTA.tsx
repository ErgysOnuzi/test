'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export default function ReservationCTA() {
  const t = useTranslations('reservations');

  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-serif font-bold">
            {t('title')}
          </h2>
          <p className="text-xl opacity-90">
            {t('subtitle')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 my-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-2">
                {t('authentic_italian_cuisine')}
              </h3>
              <p className="opacity-80">
                Traditionelle Rezepte mit frischen Zutaten
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">
                {t('perfect_for_groups')}
              </h3>
              <p className="opacity-80">
                Ideal für Familie, Freunde und Geschäftsessen
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">
                {t('easy_online_booking')}
              </h3>
              <p className="opacity-80">
                Schnell und einfach online reservieren
              </p>
            </div>
          </div>

          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/reservations">
              {t('book_your_table')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}