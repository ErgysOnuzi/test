"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { Button } from "@/components/ui/button";

export default function Hero() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070')`
          }}
        />
        {/* Dark wash overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="hero-title font-serif font-bold mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl mb-4 font-script">
          {t('tagline')}
        </p>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/reservations`}>
            <Button 
              size="lg"
              className="px-8 py-3 text-lg border-2 border-primary"
              data-testid="button-hero-reserve"
            >
              {t('cta_reserve')}
            </Button>
          </Link>
          <Link href={`/${locale}/menu`}>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/80 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm px-8 py-3 text-lg border-2 hover:border-white [--button-outline:rgba(255,255,255,0.8)]"
              data-testid="button-hero-menu"
            >
              {t('cta_menu')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}