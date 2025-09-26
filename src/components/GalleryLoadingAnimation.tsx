'use client';

import React, { useState, useEffect } from 'react';
import { Camera, Loader2 } from 'lucide-react';

interface GalleryLoadingAnimationProps {
  onComplete: () => void;
  totalImages: number;
  loadedImages: number;
}

export default function GalleryLoadingAnimation({
  onComplete,
  totalImages,
  loadedImages,
}: GalleryLoadingAnimationProps) {
  const [progress, setProgress] = useState(0);

  // Update progress based on actual loaded images
  useEffect(() => {
    if (totalImages > 0) {
      const actualProgress = Math.floor((loadedImages / totalImages) * 100);
      setProgress(actualProgress);

      // Call onComplete when all images are loaded
      if (loadedImages >= totalImages) {
        setTimeout(onComplete, 500); // Small delay before showing gallery
      }
    }
  }, [loadedImages, totalImages, onComplete]);

  return (
    <div className='fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center z-50'>
      <div className='text-center max-w-md mx-auto px-6'>
        {/* Animated Camera Icon */}
        <div className='mb-8 relative'>
          <div className='w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden'>
            <Camera className='w-12 h-12 text-primary animate-pulse' />
            {/* Animated flash effect */}
            <div
              className='absolute inset-0 bg-white/20 rounded-full opacity-0 animate-ping'
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>

        {/* Loading Title */}
        <h2 className='text-3xl font-serif font-bold text-foreground mb-4'>
          Preparing Gallery
        </h2>
        <p className='text-muted-foreground mb-8 text-lg'>
          Loading beautiful moments from La Cantina Berlin...
        </p>

        {/* Progress Bar */}
        <div className='w-full bg-muted/30 rounded-full h-3 mb-4 overflow-hidden'>
          <div
            className='bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300 ease-out relative overflow-hidden'
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer' />
          </div>
        </div>

        {/* Progress Text */}
        <div className='flex items-center justify-center gap-2 text-muted-foreground'>
          <Loader2 className='w-4 h-4 animate-spin' />
          <span className='font-mono text-lg'>{progress}%</span>
          {totalImages > 0 && (
            <span className='text-sm'>
              ({Math.floor((progress / 100) * totalImages)}/{totalImages}{' '}
              images)
            </span>
          )}
        </div>

        {/* Fun loading messages */}
        <div className='mt-6 text-sm text-muted-foreground/70'>
          {progress < 30 && 'Capturing Italian moments...'}
          {progress >= 30 && progress < 60 && 'Selecting the finest views...'}
          {progress >= 60 && progress < 90 && 'Adding that perfect touch...'}
          {progress >= 90 && 'Almost ready to feast your eyes...'}
        </div>
      </div>

      {/* Custom CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
