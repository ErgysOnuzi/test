import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Camera, Image, Star, MapPin } from 'lucide-react';
import db, { schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

async function getGalleryImages() {
  try {
    const images = await db
      .select()
      .from(schema.gallery)
      .where(eq(schema.gallery.isActive, true))
      .orderBy(desc(schema.gallery.createdAt));
    
    return images;
  } catch (error) {
    console.error('Gallery database error:', error);
    return [];
  }
}

interface GalleryPageProps {
  params: Promise<{ locale: string }>;
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params;
  const t = await getTranslations('gallery');
  const images = await getGalleryImages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/90 to-secondary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              {t('take_visual_journey')}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                <span>{t('restaurant_atmosphere')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>{t('signature_dishes')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{t('berlin_location')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          
          {images.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-12">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Camera className="w-16 h-16 text-primary" />
                </div>
                <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                  {t('gallery_coming_soon')}
                </h2>
                <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                  {t('currently_curating')}
                </p>
              </div>

              {/* Preview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl mb-4">🍝</div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                    {t('signature_dishes')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('beautiful_photos')}
                  </p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl mb-4">🏮</div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                    {t('cozy_atmosphere_title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('restaurant_ambiance_desc')}
                  </p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                    {t('special_events_title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('special_events_desc')}
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl border border-primary/20">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {t('experience_yourself')}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  {t('while_gallery_prepared')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href={`/${locale}/reservations`}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-2xl font-semibold transition-all duration-300 text-center hover:scale-105 shadow-lg"
                  >
                    {t('make_reservation')}
                  </a>
                  <a 
                    href={`/${locale}/menu`}
                    className="border border-border hover:border-primary text-foreground hover:text-primary px-8 py-3 rounded-2xl font-semibold transition-all duration-300 text-center hover:scale-105"
                  >
                    {t('view_menu')}
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                  {t('visual_stories')}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {t('every_image_story')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {images.map((image) => (
                  <div 
                    key={image.id} 
                    className="group bg-card/80 backdrop-blur-sm rounded-3xl shadow-lg border border-border overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
                    data-testid={`gallery-image-${image.id}`}
                  >
                    <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                      <img
                        src={image.imageUrl}
                        alt={image.description || 'Ristorante La Cantina Bleibtreu'}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    {image.description && (
                      <div className="p-6">
                        <p className="text-foreground leading-relaxed group-hover:text-primary transition-colors duration-300">
                          {image.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <Image className="w-4 h-4" />
                          <span>Ristorante La Cantina Bleibtreu</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-16 text-center py-12 bg-card/30 backdrop-blur-sm rounded-3xl border border-border">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  Share Your Experience
                </h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Tag us @lacantina_berlin on social media to be featured in our gallery!
                </p>
                <div className="flex justify-center gap-4">
                  <span className="text-2xl">#LaCantinaBerlin</span>
                  <span className="text-2xl">#AuthenticItalian</span>
                  <span className="text-2xl">#BerlinDining</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}