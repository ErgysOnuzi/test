'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export default function MenuHighlights() {
  const t = useTranslations('menu');

  return (
    <section className="py-20 px-6 bg-secondary/50">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="space-y-4 mb-12">
          <h2 className="text-4xl font-serif font-bold text-primary">
            {t('signature_dishes')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('signature_subtitle')}
          </p>
        </div>

        {/* Menu highlights would go here - for now showing placeholder */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
              <div className="text-6xl">🍝</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Pasta Tradizionale</h3>
              <p className="text-muted-foreground">Hausgemachte Pasta mit traditionellen italienischen Saucen</p>
            </div>
          </div>

          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
              <div className="text-6xl">🐟</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Pesce Fresco</h3>
              <p className="text-muted-foreground">Fangfrischer Mittelmeerfisch täglich frisch zubereitet</p>
            </div>
          </div>

          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
              <div className="text-6xl">🥩</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Carne Flambéed</h3>
              <p className="text-muted-foreground">Am Tisch flambiertes Rinderfilet für unvergessliche Momente</p>
            </div>
          </div>
        </div>

        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/menu">
            {t('view_full_menu')}
          </Link>
        </Button>
      </div>
    </section>
  );
}