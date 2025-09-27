import React from 'react';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalLoader from '@/components/GlobalLoader';
import {
  RestaurantSchema,
  generateSEOMetadata,
} from '@/components/StructuredData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
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
  params,
}: LocaleLayoutProps) {
  // Await the params and ensure we have a valid locale
  const { locale: rawLocale } = await params;
  const locale =
    rawLocale && ['de', 'en'].includes(rawLocale) ? rawLocale : 'de';
  const messages = await getMessages({ locale });

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(
      `[layout] Using locale: ${locale} (from rawLocale: ${rawLocale})`
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RestaurantSchema locale={locale} />
      <GlobalLoader />
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
