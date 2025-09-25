"use client";

import { useTranslations } from 'next-intl';
import { ChefHat, Flame, Wine } from 'lucide-react';
import Hero from '@/components/Hero';
import GoogleReviews from '@/components/GoogleReviews';
import ServerInstagramFeed from '@/components/ServerInstagramFeed';

export default function HomePage() {
  const t = useTranslations('home');
  
  // Get locale from params for components
  const locale = 'de'; // This should ideally come from params

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Restaurant Story Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
            {t('original_heading')}
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>{t('restaurant_story')}</p>
            <p>{t('quality_promise')}</p>
            <p className="text-xl font-medium text-primary">
              {t('brand_promise')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">{t('fresh_pasta_title')}</h3>
              <p className="text-muted-foreground">{t('fresh_pasta_desc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">{t('wood_fired_title')}</h3>
              <p className="text-muted-foreground">{t('wood_fired_desc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wine className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">{t('fine_wines_title')}</h3>
              <p className="text-muted-foreground">{t('fine_wines_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <GoogleReviews maxReviews={3} showViewMore={true} />
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <ServerInstagramFeed maxPosts={2} showHeader={true} />
        </div>
      </section>
    </div>
  );
}