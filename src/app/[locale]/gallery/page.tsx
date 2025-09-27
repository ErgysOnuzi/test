import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Camera, Star, MapPin } from 'lucide-react';
import ClientGallery from '@/components/ClientGallery';

export const revalidate = 300; // Cache for 5 minutes

interface GalleryPageProps {
  params: Promise<{ locale: string }>;
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params;
  const t = await getTranslations('gallery');

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-primary/5'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-primary/90 to-secondary text-primary-foreground overflow-hidden'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative container mx-auto px-6 py-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-5xl md:text-6xl font-serif font-bold mb-6'>
              {t('title')}
            </h1>
            <p className='text-xl md:text-2xl opacity-90 mb-8 leading-relaxed'>
              {t('take_visual_journey')}
            </p>
            <div className='flex flex-wrap justify-center gap-6 text-sm'>
              <div className='flex items-center gap-2'>
                <Camera className='w-5 h-5' />
                <span>{t('restaurant_atmosphere')}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Star className='w-5 h-5' />
                <span>{t('signature_dishes')}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-5 h-5' />
                <span>{t('berlin_location')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className='container mx-auto px-6 py-16'>
        <div className='max-w-7xl mx-auto'>
          <ClientGallery />
        </div>
      </div>
    </div>
  );
}
