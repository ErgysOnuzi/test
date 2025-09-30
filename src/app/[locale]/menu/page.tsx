'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  titleDe?: string;
  titleEn?: string;
  descriptionDe?: string;
  descriptionEn?: string;
  categoryDe?: string;
  categoryEn?: string;
}

const categories = [
  { key: 'all', de: 'All Food', en: 'All Food' },
  { key: 'appetizers', de: 'Vorspeisen', en: 'Starters' },
  { key: 'soup', de: 'Suppen', en: 'Soup' },
  { key: 'salad', de: 'Salate', en: 'Salads' },
  { key: 'pasta', de: 'Pasta', en: 'Pasta' },
  { key: 'pizza', de: 'Pizza', en: 'Pizza' },
  { key: 'fish', de: 'Fisch', en: 'Fish' },
  { key: 'meat', de: 'Fleisch', en: 'Meat' },
  { key: 'desserts', de: 'Desserts', en: 'Desserts' },
  { key: 'other', de: 'Sonstiges', en: 'Other' }
];

export default function MenuPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('menu');
  const isGerman = locale === 'de';
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading menu:', err);
        setLoading(false);
      });
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => {
        const categoryKey = isGerman ? item.categoryDe : item.categoryEn;
        const selectedCat = categories.find(c => c.key === selectedCategory);
        return categoryKey?.toLowerCase().includes(selectedCat?.[isGerman ? 'de' : 'en'].toLowerCase() || '');
      });

  return (
    <div className="min-h-screen bg-cream">
      <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${locale}`} className="flex items-center">
              <h1 className="font-playfair text-2xl font-bold text-orange-600">
                La Cantina
                <span className="block text-sm font-dancing text-gray-600">Berlin</span>
              </h1>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href={`/${locale}`} className="text-gray-700 hover:text-orange-600 font-medium">Home</Link>
              <Link href={`/${locale}/menu`} className="text-orange-600 font-medium">Menu</Link>
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

      <div className="pt-16">
        <section className="bg-orange-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
              {isGerman ? 'Unsere Speisekarte' : 'Our Menu'}
            </h1>
            <p className="text-xl max-w-4xl mx-auto">
              {isGerman 
                ? 'Entdecken Sie unsere authentische italienische Küche' 
                : 'Discover our authentic Italian cuisine'
              }
            </p>
          </div>
        </section>

        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((category) => {
                const count = category.key === 'all' 
                  ? items.length 
                  : items.filter(item => {
                      const categoryKey = isGerman ? item.categoryDe : item.categoryEn;
                      return categoryKey?.toLowerCase().includes(category[isGerman ? 'de' : 'en'].toLowerCase());
                    }).length;

                return (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-colors ${
                      selectedCategory === category.key 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    {category[isGerman ? 'de' : 'en']}
                    {count > 0 && (
                      <span className="ml-2 text-sm">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">{isGerman ? 'Wird geladen...' : 'Loading...'}</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">
                  {isGerman ? 'Keine Artikel in dieser Kategorie gefunden.' : 'No items found in this category.'}
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {selectedCategory === 'all' 
                      ? (isGerman ? 'Alle Gerichte' : 'All Dishes')
                      : categories.find(c => c.key === selectedCategory)?.[isGerman ? 'de' : 'en']
                    }
                  </h2>
                  <p className="text-gray-600">
                    {filteredItems.length} {isGerman ? 'Artikel' : 'items'}
                  </p>
                </div>

                <div className="grid gap-6 md:gap-8">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-playfair text-xl md:text-2xl font-semibold text-gray-900">
                              {isGerman ? (item.titleDe || item.title) : (item.titleEn || item.title)}
                            </h3>
                            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded ml-4">
                              {isGerman ? (item.categoryDe || item.category) : (item.categoryEn || item.category)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm md:text-base mb-4">
                            {isGerman ? (item.descriptionDe || item.description) : (item.descriptionEn || item.description)}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-orange-600">
                              €{item.price.toFixed(2)}
                            </span>
                            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded">
                              {isGerman ? 'Verfügbar' : 'Available'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}