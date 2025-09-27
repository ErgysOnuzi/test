'use client';

import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('home');

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-bold text-primary">
                {t('original_heading')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('restaurant_story')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('quality_promise')}
              </p>
              <p className="text-xl font-medium text-primary italic">
                {t('brand_promise')}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8">
            <div className="text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🍝</div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                {t('fresh_pasta_title')}
              </h3>
              <p className="text-muted-foreground">
                {t('fresh_pasta_desc')}
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🐟</div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                {t('wood_fired_title')}
              </h3>
              <p className="text-muted-foreground">
                {t('wood_fired_desc')}
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                {t('fine_wines_title')}
              </h3>
              <p className="text-muted-foreground">
                {t('fine_wines_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}