'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Image, Camera } from 'lucide-react';
import NextImage from 'next/image';
import GalleryLoadingAnimation from './GalleryLoadingAnimation';

interface GalleryImage {
  id: number;
  imageUrl: string;
  description: string | null;
  category: string | null;
  createdAt: string;
}

export default function ClientGallery() {
  const t = useTranslations('gallery');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isImagesFetched, setIsImagesFetched] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (response.ok) {
          const data = await response.json();
          setImages(data);
          setIsImagesFetched(true);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        setIsImagesFetched(true); // Still mark as fetched to prevent infinite loading
      }
    };

    fetchImages();
  }, []);

  // Handle individual image load or error (both count as "processed")
  const handleImageLoad = useCallback(() => {
    setLoadedImagesCount(prev => prev + 1);
  }, []);

  const handleImageError = useCallback(() => {
    setLoadedImagesCount(prev => prev + 1); // Count errors as "loaded" to prevent hanging
  }, []);

  // Handle loading animation completion
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setShowGallery(true);
  }, []);

  // Set timeout to show gallery after 1.5 seconds regardless of image loading
  useEffect(() => {
    if (images.length > 0 && !timeoutReached) {
      const timer = setTimeout(() => {
        setTimeoutReached(true);
        if (isLoading) {
          handleLoadingComplete();
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [images.length, timeoutReached, isLoading, handleLoadingComplete]);

  // Show loading overlay immediately when page loads, continue until images are loaded
  const showLoadingOverlay = isLoading;

  // Show empty state if no images after fetching is complete
  if (images.length === 0 && isImagesFetched) {
    return (
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
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Loading Overlay - Shows immediately, completes after timeout or first few images */}
      {showLoadingOverlay && (
        <GalleryLoadingAnimation 
          onComplete={handleLoadingComplete}
          totalImages={images.length > 0 ? Math.min(images.length, 6) : 1} // Only wait for first 6 images
          loadedImages={timeoutReached ? images.length : Math.min(loadedImagesCount, 6)}
        />
      )}
      
      {/* Gallery Content */}
      <div className={`transition-all duration-1000 ${showGallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
          {t('visual_stories')}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('every_image_story')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="group bg-card/80 backdrop-blur-sm rounded-3xl shadow-lg border border-border overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
            data-testid={`gallery-image-${image.id}`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: showGallery ? 'fadeInUp 0.6s ease-out forwards' : 'none'
            }}
          >
            <div className="aspect-w-16 aspect-h-12 overflow-hidden relative">
              <NextImage
                src={image.imageUrl}
                alt={image.description || 'Ristorante La Cantina Bleibtreu'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={75}
                priority={index < 3} // First 3 images get priority loading
                onLoad={handleImageLoad}
                onError={handleImageError}
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

        {/* Custom CSS for fade in animation */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}