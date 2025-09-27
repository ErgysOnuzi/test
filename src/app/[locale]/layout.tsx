import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalLoader from '@/components/GlobalLoader';
import { Providers } from '@/components/Providers';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <GlobalLoader />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </Providers>
    </NextIntlClientProvider>
  );
}