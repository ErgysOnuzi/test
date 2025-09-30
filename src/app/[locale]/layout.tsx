import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/app/globals.css';

export const metadata = {
  title: 'Ristorante La Cantina Bleibtreu - Authentic Italian Cuisine in Berlin',
  description: 'Discover authentic Italian cuisine near Ku\'damm with homemade pasta, fresh Mediterranean fish and tableside flambéed specialties',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}