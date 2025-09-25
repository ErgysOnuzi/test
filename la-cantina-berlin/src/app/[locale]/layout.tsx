import React from 'react';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalLoader from '@/components/GlobalLoader';
import PagePreloader from '@/components/PagePreloader';
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
          <PagePreloader />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}