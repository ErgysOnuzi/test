import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'La Cantina Berlin - Authentic Italian Restaurant',
  description: 'Experience authentic Italian cuisine in the heart of Berlin. Fresh pasta, traditional recipes, and warm hospitality await you at La Cantina.',
  keywords: 'Italian restaurant Berlin, pasta, pizza, authentic Italian food, La Cantina'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <NextTopLoader
          color="#D44A3A"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #D44A3A,0 0 5px #D44A3A"
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}