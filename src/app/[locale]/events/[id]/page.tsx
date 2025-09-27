import React from 'react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Users,
  Clock,
  MapPin,
  Star,
  Wine,
  ChefHat,
  Music,
  ArrowLeft,
  Phone,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Enhanced events data with all details
const eventsData = [
  {
    id: 1,
    title: 'Italian Wine Tasting Evening',
    title_de: 'Italienischer Weinabend',
    description:
      'Experience a curated selection of premium Italian wines paired with authentic antipasti and live acoustic music in our cozy restaurant atmosphere.',
    description_de:
      'Erleben Sie eine kuratierte Auswahl an Premium-italienischen Weinen, gepaart mit authentischen Antipasti und Live-Akustikmusik in unserer gemütlichen Restaurant-Atmosphäre.',
    longDescription: `Join us for an unforgettable evening celebrating the rich wine heritage of Italy. Our sommelier will guide you through a carefully selected journey of 6 premium Italian wines from different regions including Tuscany, Piedmont, and Veneto.

Each wine will be paired with traditional Italian antipasti prepared by our chef using authentic recipes and imported ingredients. The evening will be enhanced by live acoustic music featuring Italian classics and contemporary pieces.

This intimate experience is limited to 30 guests to ensure personal attention and the perfect atmosphere for wine appreciation and conversation.`,
    longDescription_de: `Begleiten Sie uns zu einem unvergesslichen Abend, der das reiche Weinerbe Italiens zelebriert. Unser Sommelier führt Sie durch eine sorgfältig ausgewählte Reise von 6 Premium-italienischen Weinen aus verschiedenen Regionen wie Toskana, Piemont und Venetien.

Jeder Wein wird mit traditionellen italienischen Antipasti gepaart, die von unserem Chefkoch mit authentischen Rezepten und importierten Zutaten zubereitet werden. Der Abend wird durch Live-Akustikmusik mit italienischen Klassikern und zeitgenössischen Stücken bereichert.

Diese intime Erfahrung ist auf 30 Gäste begrenzt, um persönliche Aufmerksamkeit und die perfekte Atmosphäre für Weingenuss und Gespräche zu gewährleisten.`,
    date: '2024-12-28',
    time: '19:00',
    duration: '3 hours',
    capacity: 30,
    availableSpots: 18,
    price: 45,
    category: 'Wine & Dining',
    featured: true,
    image: '🍷',
    highlights: [
      '6 premium Italian wines',
      'Artisanal antipasti pairings',
      'Live acoustic music',
      'Expert sommelier guidance',
      'Wine region education',
      'Take-home tasting notes',
    ],
    includes: [
      'Welcome aperitif',
      '6 wine tastings with food pairings',
      'Educational presentation about Italian wine regions',
      'Live acoustic music performance',
      'Professional wine tasting notes',
      'Light antipasti dinner',
    ],
    schedule: [
      { time: '19:00', activity: 'Welcome & Aperitif' },
      { time: '19:30', activity: 'Wine Tasting Begins - Northern Italy' },
      { time: '20:15', activity: 'Antipasti Course & Central Italy Wines' },
      { time: '21:00', activity: 'Live Music Performance' },
      { time: '21:30', activity: 'Southern Italy Wines & Dessert' },
      { time: '22:00', activity: 'Closing & Take-Home Notes' },
    ],
    dresscode: 'Smart casual',
    languages: ['English', 'German', 'Italian'],
    ageRestriction: '18+',
    dietary: 'Vegetarian options available upon request',
  },
  {
    id: 2,
    title: 'Pasta Making Masterclass',
    title_de: 'Pasta-Kochkurs',
    description:
      'Learn the secrets of perfect pasta preparation from our head chef in this hands-on cooking experience where tradition meets technique.',
    description_de:
      'Lernen Sie die Geheimnisse der perfekten Pasta-Zubereitung von unserem Chefkoch in diesem praktischen Kocherlebnis, wo Tradition auf Technik trifft.',
    longDescription: `Discover the art of authentic Italian pasta making in this comprehensive hands-on masterclass. Our executive chef will teach you traditional techniques passed down through generations, from mixing the perfect dough to creating various pasta shapes by hand.

You'll learn to make three different types of pasta: fresh tagliatelle, filled ravioli, and hand-rolled gnocchi. Each participant will work at their own station with professional equipment and high-quality Italian ingredients.

The class concludes with a communal dinner where you'll enjoy the pasta dishes you've created, paired with wines selected by our sommelier. You'll also receive printed recipes and tips to recreate these dishes at home.`,
    longDescription_de: `Entdecken Sie die Kunst der authentischen italienischen Pasta-Herstellung in diesem umfassenden praktischen Meisterkurs. Unser Küchenchef lehrt Ihnen traditionelle Techniken, die über Generationen weitergegeben wurden, vom Mischen des perfekten Teigs bis zur Erstellung verschiedener Pasta-Formen von Hand.

Sie lernen drei verschiedene Pasta-Arten herzustellen: frische Tagliatelle, gefüllte Ravioli und handgerollte Gnocchi. Jeder Teilnehmer arbeitet an seiner eigenen Station mit professioneller Ausrüstung und hochwertigen italienischen Zutaten.

Der Kurs endet mit einem gemeinsamen Abendessen, bei dem Sie die von Ihnen zubereiteten Pasta-Gerichte genießen, kombiniert mit von unserem Sommelier ausgewählten Weinen. Sie erhalten auch gedruckte Rezepte und Tipps, um diese Gerichte zu Hause nachzukochen.`,
    date: '2025-01-15',
    time: '18:00',
    duration: '4 hours',
    capacity: 15,
    availableSpots: 8,
    price: 65,
    category: 'Cooking Class',
    featured: true,
    image: '🍝',
    highlights: [
      '3 pasta varieties',
      'Professional techniques',
      'Take-home recipes',
      'Chef guidance',
      'Communal dinner',
      'Wine pairings',
    ],
    includes: [
      'Welcome drink and appetizers',
      'Professional cooking equipment and apron',
      'Premium Italian ingredients',
      'Hands-on instruction from head chef',
      '3-course pasta dinner with wine pairings',
      'Recipe booklet and cooking tips',
    ],
    schedule: [
      { time: '18:00', activity: 'Welcome & Introduction to Pasta Making' },
      { time: '18:30', activity: 'Fresh Tagliatelle - Dough & Rolling' },
      { time: '19:15', activity: 'Ravioli - Filling & Shaping' },
      { time: '20:00', activity: 'Break with Italian aperitivo' },
      { time: '20:30', activity: 'Gnocchi - Traditional Hand Rolling' },
      { time: '21:00', activity: 'Cooking & Plating Your Creations' },
      { time: '21:30', activity: 'Communal Dinner & Wine Tasting' },
    ],
    dresscode: 'Comfortable clothing, closed-toe shoes required',
    languages: ['English', 'German'],
    ageRestriction: '16+ (under 18 with adult supervision)',
    dietary: 'Gluten-free options available with advance notice',
  },
  {
    id: 3,
    title: 'Truffle Season Special',
    title_de: 'Trüffel-Saison Spezial',
    description:
      'Indulge in our exclusive truffle menu featuring fresh Italian truffles in a luxurious 5-course tasting experience.',
    description_de:
      'Verwöhnen Sie sich mit unserem exklusiven Trüffel-Menü mit frischen italienischen Trüffeln in einem luxuriösen 5-Gänge-Degustationserlebnis.',
    longDescription: `Experience the ultimate in luxury dining with our exclusive truffle season menu featuring the finest white and black truffles freshly imported from Alba and Norcia. This extraordinary 5-course tasting menu showcases the versatility and depth of truffle flavors in both traditional and innovative preparations.

Each course has been carefully crafted by our executive chef to highlight the unique characteristics of different truffle varieties. From delicate carpaccio with white truffle shavings to rich risotto infused with black truffle essence, every dish celebrates this prized ingredient.

The evening includes wine pairings selected specifically to complement the earthy, complex flavors of truffles, along with an educational component about truffle hunting traditions and culinary applications.`,
    longDescription_de: `Erleben Sie das Ultimative im Luxus-Dining mit unserem exklusiven Trüffel-Saison-Menü mit den feinsten weißen und schwarzen Trüffeln, frisch importiert aus Alba und Norcia. Dieses außergewöhnliche 5-Gänge-Degustationsmenü zeigt die Vielseitigkeit und Tiefe der Trüffel-Aromen in traditionellen und innovativen Zubereitungen.

Jeder Gang wurde sorgfältig von unserem Küchenchef zusammengestellt, um die einzigartigen Eigenschaften verschiedener Trüffel-Sorten hervorzuheben. Von zartem Carpaccio mit weißen Trüffel-Spänen bis zu reichhaltigem Risotto mit schwarzer Trüffel-Essenz feiert jedes Gericht diese geschätzte Zutat.

Der Abend beinhaltet Wein-Paarungen, die speziell ausgewählt wurden, um die erdigen, komplexen Aromen von Trüffeln zu ergänzen, zusammen mit einer Bildungskomponente über Trüffel-Jagd-Traditionen und kulinarische Anwendungen.`,
    date: '2025-02-14',
    time: '20:00',
    duration: '3.5 hours',
    capacity: 25,
    availableSpots: 12,
    price: 85,
    category: 'Special Menu',
    featured: true,
    image: '🍄',
    highlights: [
      'Fresh Italian truffles',
      '5-course tasting',
      'Premium wine pairings',
      'Limited availability',
      'Educational experience',
      'Luxury dining',
    ],
    includes: [
      'Champagne welcome reception',
      '5-course truffle tasting menu',
      'Premium wine pairings with each course',
      'Truffle education session',
      'Artisanal bread and olive oil',
      'Petit fours and digestif',
    ],
    schedule: [
      { time: '20:00', activity: 'Champagne Reception & Truffle Introduction' },
      { time: '20:30', activity: 'Course 1: White Truffle Carpaccio' },
      { time: '21:00', activity: 'Course 2: Truffle Soup & Education' },
      { time: '21:30', activity: 'Course 3: Black Truffle Risotto' },
      { time: '22:00', activity: 'Course 4: Truffle-Infused Main Course' },
      { time: '22:30', activity: 'Course 5: Truffle Dessert & Digestif' },
      { time: '23:00', activity: 'Coffee & Petit Fours' },
    ],
    dresscode: 'Formal or business attire',
    languages: ['English', 'German'],
    ageRestriction: '21+',
    dietary: 'Menu can be adapted for dietary restrictions with advance notice',
  },
];

interface EventPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const t = await getTranslations('events');
  const { id, locale } = await params;

  // Fetch event from database
  let event;
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
    const response = await fetch(`${baseUrl}/api/events/${id}`, {
      cache: 'no-store', // Always get fresh data
    });

    if (response.ok) {
      const dbEvent = await response.json();
      // Convert database event to display format
      event = {
        id: dbEvent.id,
        title: dbEvent.title,
        title_de: dbEvent.title,
        description:
          dbEvent.description || 'Enjoy this special event at our restaurant.',
        description_de:
          dbEvent.description ||
          'Genießen Sie diese besondere Veranstaltung in unserem Restaurant.',
        longDescription:
          dbEvent.description ||
          'Join us for this special event at Ristorante La Cantina Bleibtreu. More details will be provided upon booking.',
        longDescription_de:
          dbEvent.description ||
          'Begleiten Sie uns zu dieser besonderen Veranstaltung im Ristorante La Cantina Bleibtreu. Weitere Details erhalten Sie bei der Buchung.',
        date: dbEvent.date,
        time: '19:00',
        duration: '3 hours',
        capacity: dbEvent.capacity || 30,
        availableSpots: Math.floor((dbEvent.capacity || 30) * 0.6), // 60% available
        price: 45,
        category: 'Special Event',
        featured: true,
        image: '🍽️',
        highlights: [
          'Authentic Italian cuisine',
          'Professional service',
          'Cozy atmosphere',
          'Fresh ingredients',
          'Wine pairings',
          'Memorable experience',
        ],
        includes: [
          'Welcome drink',
          'Multi-course meal',
          'Professional service',
          'Cozy restaurant atmosphere',
          'Fresh, high-quality ingredients',
          'Unforgettable dining experience',
        ],
        schedule: [
          { time: '19:00', activity: 'Welcome & Seating' },
          { time: '19:30', activity: 'Appetizer Course' },
          { time: '20:30', activity: 'Main Course' },
          { time: '21:30', activity: 'Dessert & Coffee' },
          { time: '22:00', activity: 'Event Conclusion' },
        ],
        dresscode: 'Smart casual',
        languages: ['English', 'German'],
        ageRestriction: '18+',
        dietary: 'Dietary restrictions can be accommodated with advance notice',
      };
    } else {
      notFound();
    }
  } catch (error) {
    console.error('Failed to fetch event:', error);
    notFound();
  }

  if (!event) {
    notFound();
  }

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

  // Get localized content
  const title = locale === 'de' ? event.title_de || event.title : event.title;
  const description =
    locale === 'de'
      ? event.description_de || event.description
      : event.description;
  const longDescription =
    locale === 'de'
      ? event.longDescription_de || event.longDescription
      : event.longDescription;

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/5'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-secondary/90 to-primary text-primary-foreground overflow-hidden'>
        <div className='absolute inset-0 bg-black/30'></div>
        <div className='relative container mx-auto px-6 py-16'>
          <div className='max-w-4xl mx-auto'>
            {/* Back Link */}
            <Link
              href={`/${locale}/events`}
              className='inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6'
            >
              <ArrowLeft className='w-5 h-5' />
              {t('back_to_events')}
            </Link>

            <div className='text-center'>
              <div className='text-8xl mb-6'>{event.image}</div>
              <span className='inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4'>
                {event.category}
              </span>
              <h1 className='text-4xl md:text-5xl font-serif font-bold mb-6'>
                {title}
              </h1>
              <p className='text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed'>
                {description}
              </p>

              {/* Quick Info */}
              <div className='flex flex-wrap justify-center gap-6 text-sm'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-5 h-5' />
                  <span>
                    {event.time} ({event.duration})
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Star className='w-5 h-5' />
                  <span>€{event.price} per person</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='w-5 h-5' />
                  <span>{event.availableSpots} spots available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 py-16'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
            {/* Main Content */}
            <div className='lg:col-span-2 space-y-12'>
              {/* Description */}
              <div className='bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border'>
                <h2 className='text-3xl font-serif font-bold text-foreground mb-6'>
                  {t('about_this_event')}
                </h2>
                <div className='prose prose-lg max-w-none text-muted-foreground'>
                  {longDescription.split('\n').map(
                    (paragraph: string, index: number) =>
                      paragraph.trim() && (
                        <p key={index} className='mb-4 leading-relaxed'>
                          {paragraph.trim()}
                        </p>
                      )
                  )}
                </div>
              </div>

              {/* What's Included */}
              <div className='bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border'>
                <h2 className='text-3xl font-serif font-bold text-foreground mb-6'>
                  {t('whats_included')}
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {event.includes.map((item, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <Star className='w-5 h-5 text-primary mt-0.5 flex-shrink-0' />
                      <span className='text-muted-foreground'>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className='bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border'>
                <h2 className='text-3xl font-serif font-bold text-foreground mb-6'>
                  {t('event_schedule')}
                </h2>
                <div className='space-y-4'>
                  {event.schedule.map((item, index) => (
                    <div
                      key={index}
                      className='flex items-start gap-4 pb-4 border-b border-border/30 last:border-b-0'
                    >
                      <div className='bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold text-sm min-w-fit'>
                        {item.time}
                      </div>
                      <div className='flex-1'>
                        <p className='text-foreground font-medium'>
                          {item.activity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className='bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border'>
                <h2 className='text-3xl font-serif font-bold text-foreground mb-6'>
                  {t('event_highlights')}
                </h2>
                <div className='flex flex-wrap gap-3'>
                  {event.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className='px-4 py-2 bg-primary/10 text-primary rounded-full text-sm border border-primary/20 font-medium'
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className='space-y-8'>
              {/* Booking Card */}
              <div className='bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-border sticky top-6'>
                <div className='text-center mb-6'>
                  <div className='text-4xl font-bold text-primary mb-2'>
                    €{event.price}
                  </div>
                  <div className='text-muted-foreground'>{t('per_person')}</div>
                </div>

                <div className='space-y-4 mb-6'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>
                      {t('available_spots')}:
                    </span>
                    <span className='font-semibold text-foreground'>
                      {event.availableSpots} / {event.capacity}
                    </span>
                  </div>
                  <div className='w-full bg-muted rounded-full h-2'>
                    <div
                      className='bg-primary h-2 rounded-full transition-all duration-300'
                      style={{
                        width: `${((event.capacity - event.availableSpots) / event.capacity) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className='space-y-4 mb-8'>
                  <Link
                    href={`/${locale}/reservations?eventId=${event.id}&eventTitle=${encodeURIComponent(title)}`}
                    className='w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 px-6 rounded-2xl font-semibold transition-all duration-300 block text-center hover:scale-105 shadow-lg'
                  >
                    {t('reserve_your_spot')}
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className='w-full border border-border hover:border-primary text-foreground hover:text-primary py-4 px-6 rounded-2xl font-semibold transition-all duration-300 block text-center hover:scale-105'
                  >
                    {t('ask_questions')}
                  </Link>
                </div>

                <div className='pt-6 border-t border-border/30'>
                  <h4 className='font-semibold text-foreground mb-4'>
                    {t('need_help')}
                  </h4>
                  <div className='space-y-3 text-sm'>
                    <div className='flex items-center gap-2 text-muted-foreground'>
                      <Phone className='w-4 h-4' />
                      <a
                        href='tel:+4930883215600'
                        className='hover:text-primary transition-colors'
                      >
                        030 8832156
                      </a>
                    </div>
                    <div className='flex items-center gap-2 text-muted-foreground'>
                      <Mail className='w-4 h-4' />
                      <a
                        href='mailto:info@ristorante-la-cantina.de'
                        className='hover:text-primary transition-colors'
                      >
                        info@ristorante-la-cantina.de
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className='bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border'>
                <h3 className='font-semibold text-foreground mb-4'>
                  {t('event_details')}
                </h3>
                <div className='space-y-3 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>
                      {t('duration')}:
                    </span>
                    <span className='font-medium'>{event.duration}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>
                      {t('dress_code')}:
                    </span>
                    <span className='font-medium'>{event.dresscode}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>
                      {t('age_restriction')}:
                    </span>
                    <span className='font-medium'>{event.ageRestriction}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>
                      {t('languages')}:
                    </span>
                    <span className='font-medium'>
                      {event.languages.join(', ')}
                    </span>
                  </div>
                  <div className='pt-2 border-t border-border/30'>
                    <span className='text-muted-foreground text-xs'>
                      {event.dietary}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className='bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border'>
                <h3 className='font-semibold text-foreground mb-4'>
                  {t('location')}
                </h3>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-start gap-2'>
                    <MapPin className='w-4 h-4 text-primary mt-0.5 flex-shrink-0' />
                    <div>
                      <p className='font-medium'>
                        Ristorante La Cantina Bleibtreu
                      </p>
                      <p className='text-muted-foreground'>
                        Bleibtreustr. 17
                        <br />
                        10623 Berlin
                        <br />
                        Germany
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
