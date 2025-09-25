import React from 'react';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalLoader from '@/components/GlobalLoader';
import { RestaurantSchema, generateSEOMetadata } from '@/components/StructuredData';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  return generateSEOMetadata('home', locale);
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  // Await the params and ensure we have a valid locale
  const { locale: rawLocale } = await params;
  const locale = rawLocale && ['de', 'en'].includes(rawLocale) ? rawLocale : 'de';
  const messages = await getMessages({ locale });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[layout] Using locale: ${locale} (from rawLocale: ${rawLocale})`);
  }

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head>
        <RestaurantSchema locale={locale} />
        
        {/* Favicon and PWA - Partial implementation due to PNG creation constraints */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D2691E" />
        <meta name="msapplication-TileColor" content="#D2691E" />
        <meta name="msapplication-config" content="none" />
        
        <meta name="google-site-verification" content="your-google-verification-code" />
        <link rel="canonical" href={`https://lacantina-berlin.de/${locale}`} />
        <link rel="alternate" hrefLang="de" href="https://lacantina-berlin.de/de" />
        <link rel="alternate" hrefLang="en" href="https://lacantina-berlin.de/en" />
        <link rel="alternate" hrefLang="x-default" href="https://lacantina-berlin.de/de" />
        <meta name="geo.region" content="DE-BE" />
        <meta name="geo.placename" content="Berlin" />
        <meta name="geo.position" content="52.5048;13.3091" />
        <meta name="ICBM" content="52.5048, 13.3091" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <GlobalLoader />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}