'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function PagePreloader() {
  const router = useRouter();
  const locale = useLocale();
  
  useEffect(() => {
    // Critical pages to preload for instant navigation
    const criticalPages = [
      `/${locale}`,
      `/${locale}/menu`,
      `/${locale}/reservations`, 
      `/${locale}/gallery`,
      `/${locale}/contact`,
      `/${locale}/events`,
    ];

    // Preload pages after a short delay to not interfere with current page
    const preloadTimer = setTimeout(() => {
      criticalPages.forEach((page) => {
        router.prefetch(page);
      });
    }, 2000); // Wait 2 seconds after page load

    return () => clearTimeout(preloadTimer);
  }, [locale, router]);

  return null; // This component doesn't render anything
}