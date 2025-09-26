import type { Viewport } from 'next';

export function generateViewport(): Viewport {
  return {
    themeColor: '#D2691E',
    colorScheme: 'light',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}
