import React from 'react';
import { getTranslations } from 'next-intl/server';
import {
  Calendar,
  Users,
  Clock,
  MapPin,
  Star,
  Wine,
  ChefHat,
  Music,
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Enhanced events data
const featuredEvents = [
  {
    id: 1,
    title: 'Italian Wine Tasting Evening',
    title_de: 'Italienischer Weinabend',
    description:
      'Experience a curated selection of premium Italian wines paired with authentic antipasti and live acoustic music.',
    description_de:
      'Verkostung ausgewählter italienischer Weine mit passenden Antipasti und Live-Musik.',
    date: '2024-12-28',
    time: '19:00',
    capacity: 30,
    price: 45,
    category: 'Wine & Dining',
    featured: true,
    image: '🍷',
    highlights: [
      'Premium Italian wines',
      'Artisanal antipasti',
      'Live acoustic music',
      'Wine expert guidance',
    ],
  },
  {
    id: 2,
    title: 'Pasta Making Masterclass',
    title_de: 'Pasta-Kochkurs',
    description:
      'Learn the secrets of perfect pasta preparation from our head chef in this hands-on cooking experience.',
    description_de:
      'Lernen Sie die Geheimnisse der perfekten Pasta-Zubereitung von unserem Chefkoch.',
    date: '2025-01-15',
    time: '18:00',
    capacity: 15,
    price: 65,
    category: 'Cooking Class',
    featured: true,
    image: '🍝',
    highlights: [
      'Hands-on cooking',
      'Traditional techniques',
      'Take-home recipes',
      'Chef guidance',
    ],
  },
  {
    id: 3,
    title: 'Truffle Season Special',
    title_de: 'Trüffel-Saison Spezial',
    description:
      'Indulge in our exclusive truffle menu featuring fresh Italian truffles in a 5-course tasting menu.',
    description_de:
      'Genießen Sie unser exklusives Trüffel-Menü mit frischen italienischen Trüffeln in einem 5-Gänge-Menü.',
    date: '2025-02-14',
    time: '20:00',
    capacity: 25,
    price: 85,
    category: 'Special Menu',
    featured: true,
    image: '🍄',
    highlights: [
      'Fresh Italian truffles',
      '5-course tasting',
      'Wine pairings',
      'Limited availability',
    ],
  },
];

const upcomingEvents = [
  {
    id: 4,
    title: 'Live Jazz & Italian Cuisine',
    date: '2025-01-25',
    time: '19:30',
    capacity: 40,
    price: 35,
    category: 'Music & Dining',
    image: '🎷',
  },
  {
    id: 5,
    title: 'Regional Sicilian Night',
    date: '2025-02-08',
    time: '18:30',
    capacity: 35,
    price: 55,
    category: 'Regional Cuisine',
    image: '🏝️',
  },
];

interface EventsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params;
  const t = await getTranslations('events');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      locale === 'de' ? 'de-DE' : 'en-US',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  };

  const getEventTitle = (event: any) => {
    return locale === 'de' && event.title_de ? event.title_de : event.title;
  };

  const getEventDescription = (event: any) => {
    return locale === 'de' && event.description_de
      ? event.description_de
      : event.description;
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/5'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-secondary/90 to-secondary text-secondary-foreground overflow-hidden'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative container mx-auto px-6 py-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-5xl md:text-6xl font-serif font-bold mb-6'>
              {t('special_events_title')}
            </h1>
            <p className='text-xl md:text-2xl opacity-90 mb-8 leading-relaxed'>
              {t('join_us_exclusive')} {t('authentic_taste_italy')}
            </p>
            <div className='flex flex-wrap justify-center gap-6 text-sm'>
              <div className='flex items-center gap-2'>
                <Wine className='w-5 h-5' />
                <span>{t('wine_tastings')}</span>
              </div>
              <div className='flex items-center gap-2'>
                <ChefHat className='w-5 h-5' />
                <span>{t('cooking_classes')}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Music className='w-5 h-5' />
                <span>{t('live_entertainment')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 py-16'>
        <div className='max-w-7xl mx-auto'>
          {/* Featured Events */}
          <div className='mb-20'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl font-serif font-bold text-foreground mb-4'>
                {t('featured_events')}
              </h2>
              <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
                {t('dont_miss_exclusive')}
              </p>
            </div>

            <div className='space-y-8'>
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className='bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-border p-8 hover:shadow-3xl transition-all duration-500 group overflow-hidden relative'
                  data-testid={`event-${event.id}`}
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                  <div className='relative z-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                      {/* Event Image & Category */}
                      <div className='text-center lg:text-left'>
                        <div className='text-8xl mb-4'>{event.image}</div>
                        <span className='inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-semibold'>
                          {event.category}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className='lg:col-span-2 space-y-6'>
                        <div>
                          <h3 className='text-3xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300'>
                            {getEventTitle(event)}
                          </h3>
                          <p className='text-muted-foreground text-lg leading-relaxed'>
                            {getEventDescription(event)}
                          </p>
                        </div>

                        {/* Event Info Grid */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                          <div className='flex items-center gap-2 text-sm'>
                            <Calendar className='w-4 h-4 text-primary' />
                            <div>
                              <p className='font-semibold text-foreground'>
                                {formatDate(event.date)}
                              </p>
                              <p className='text-muted-foreground text-xs'>
                                {t('date_label')}
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center gap-2 text-sm'>
                            <Clock className='w-4 h-4 text-primary' />
                            <div>
                              <p className='font-semibold text-foreground'>
                                {event.time}
                              </p>
                              <p className='text-muted-foreground text-xs'>
                                {t('time_label')}
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center gap-2 text-sm'>
                            <Users className='w-4 h-4 text-primary' />
                            <div>
                              <p className='font-semibold text-foreground'>
                                {event.capacity} {t('people')}
                              </p>
                              <p className='text-muted-foreground text-xs'>
                                {t('capacity_label')}
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center gap-2 text-sm'>
                            <Star className='w-4 h-4 text-primary' />
                            <div>
                              <p className='font-semibold text-foreground'>
                                €{event.price}
                              </p>
                              <p className='text-muted-foreground text-xs'>
                                {t('per_person')}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className='font-semibold text-foreground mb-3'>
                            {t('whats_included')}:
                          </h4>
                          <div className='flex flex-wrap gap-2'>
                            {event.highlights.map((highlight, index) => (
                              <span
                                key={index}
                                className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20'
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                          <Link
                            href={`/events/${event.id}`}
                            className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-2xl font-semibold transition-all duration-300 text-center hover:scale-105 shadow-lg'
                          >
                            {t('view_full_details')}
                          </Link>
                          <Link
                            href='/reservations'
                            className='border border-border hover:border-primary text-foreground hover:text-primary px-8 py-3 rounded-2xl font-semibold transition-all duration-300 text-center hover:scale-105'
                          >
                            {t('reserve_now')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className='mb-20'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-serif font-bold text-foreground mb-4'>
                {t('more_upcoming_events')}
              </h2>
              <p className='text-muted-foreground'>
                Additional events and experiences coming soon
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className='bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300 hover:scale-105'
                  data-testid={`upcoming-event-${event.id}`}
                >
                  <div className='text-center mb-4'>
                    <div className='text-4xl mb-2'>{event.image}</div>
                    <span className='inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-semibold'>
                      {event.category}
                    </span>
                  </div>

                  <h3 className='text-xl font-serif font-bold text-foreground text-center mb-4'>
                    {getEventTitle(event)}
                  </h3>

                  <div className='space-y-2 text-sm text-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <Calendar className='w-4 h-4 text-primary' />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                      <Clock className='w-4 h-4 text-primary' />
                      <span>{event.time}</span>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                      <Star className='w-4 h-4 text-primary' />
                      <span>
                        €{event.price} {t('per_person')}
                      </span>
                    </div>
                  </div>

                  <div className='text-center mt-6'>
                    <Link
                      href={`/events/${event.id}`}
                      className='text-primary hover:text-primary/80 font-semibold transition-colors'
                    >
                      {t('view_details')} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className='text-center py-16 bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm rounded-3xl border border-border'>
            <h2 className='text-3xl font-serif font-bold text-foreground mb-4'>
              Stay Updated on Events
            </h2>
            <p className='text-muted-foreground text-lg mb-8 max-w-2xl mx-auto'>
              {t('be_first_to_know')}
            </p>
            <Link
              href='/contact'
              className='bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-2xl font-semibold transition-all duration-300 inline-block hover:scale-105 shadow-lg'
            >
              {t('contact_us_for_event_info')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
