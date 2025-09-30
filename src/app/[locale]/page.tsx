import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const isGerman = locale === 'de';

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="font-playfair text-2xl font-bold text-orange-600">
                La Cantina
                <span className="block text-sm font-dancing text-gray-600">Berlin</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href={`/${locale}`} className="text-gray-700 hover:text-orange-600 font-medium">Home</Link>
              <Link href={`/${locale}/menu`} className="text-gray-700 hover:text-orange-600 font-medium">Menu</Link>
              <Link href={`/${locale}/reservations`} className="text-gray-700 hover:text-orange-600 font-medium">Reservations</Link>
              <Link href={`/${locale}/gallery`} className="text-gray-700 hover:text-orange-600 font-medium">Gallery</Link>
              <Link href={`/${locale}/events`} className="text-gray-700 hover:text-orange-600 font-medium">Events</Link>
              <Link href={`/${locale}/contact`} className="text-gray-700 hover:text-orange-600 font-medium">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/de" className={`text-sm ${locale === 'de' ? 'font-bold text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}>DE</Link>
              <span className="text-gray-400">|</span>
              <Link href="/en" className={`text-sm ${locale === 'en' ? 'font-bold text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}>EN</Link>
              <Link
                href={`/${locale}/reservations`}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Reserve Table
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gray-800">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-6">
            Ristorante La Cantina
            <span className="block text-4xl md:text-5xl font-dancing italic text-orange-200 mt-2">
              Bleibtreu
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-inter leading-relaxed">
            {t('tagline')}
          </p>
          <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/reservations`}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              {t('cta_reserve')}
            </Link>
            <Link
              href={`/${locale}/menu`}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              {t('cta_menu')}
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            {isGerman ? 'Unsere Speisekarte' : 'Our Menu'}
          </h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            {isGerman 
              ? 'Entdecken Sie unsere authentische italienische Küche, mit Leidenschaft zubereitet aus den besten Zutaten direkt aus Italien und lokal in Berlin bezogen.' 
              : 'Discover our authentic Italian cuisine, crafted with passion using the finest ingredients imported directly from Italy and sourced locally in Berlin.'
            }
          </p>
          <Link
            href={`/${locale}/menu`}
            className="inline-block bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            {isGerman ? 'Speisekarte ansehen' : 'View Full Menu'}
          </Link>
        </div>
      </section>
    </div>
  );
}