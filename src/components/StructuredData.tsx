import { Metadata } from 'next';

interface RestaurantSchemaProps {
  locale: string;
  reviewsData?: any;
  menuItems?: any[];
}

interface EventSchemaProps {
  event: any;
  locale: string;
}

interface BreadcrumbSchemaProps {
  breadcrumbs: Array<{name: string; url: string}>;
}

interface FAQSchemaProps {
  faqs: Array<{question: string; answer: string}>;
  locale: string;
}

export function RestaurantSchema({ locale, reviewsData, menuItems }: RestaurantSchemaProps) {
  const restaurantData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Ristorante La Cantina Bleibtreu',
    image: [
      'https://lacantina-berlin.de/images/restaurant-interior.jpg',
      'https://lacantina-berlin.de/images/italian-food-spread.jpg',
    ],
    description:
      locale === 'de'
        ? 'Authentisches italienisches Restaurant in Berlin mit frischer Pasta, Holzofen-Pizza und ausgewählten italienischen Weinen. Traditionelle Küche aus Sizilien und ganz Italien.'
        : 'Authentic Italian restaurant in Berlin serving fresh pasta, wood-fired pizza, and selected Italian wines. Traditional cuisine from Sicily and all of Italy.',
    url: 'https://lacantina-berlin.de',
    telephone: '+49 30 8832156',
    email: 'info@ristorante-la-cantina.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bleibtreustraße 17',
      addressLocality: 'Berlin',
      addressRegion: 'Berlin',
      postalCode: '10623',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.5033,
      longitude: 13.3298,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '15:00',
        closes: '23:00',
      },
    ],
    servesCuisine: [
      'Italian',
      'Italienisch',
      'Mediterranean',
      'Pizza',
      'Pasta',
      'Seafood',
    ],
    priceRange: '€20-30',
    currenciesAccepted: 'EUR',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
    hasMenu: 'https://lacantina-berlin.de/menu',
    acceptsReservations: true,
    // Add Google Reviews aggregate rating if available
    ...(reviewsData && reviewsData.place_info?.rating > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviewsData.place_info.rating,
        reviewCount: reviewsData.place_info.user_ratings_total || reviewsData.reviews.length,
        bestRating: 5,
        worstRating: 1
      }
    }),

    // Add actual reviews if available
    ...(reviewsData && reviewsData.reviews.length > 0 && {
      review: reviewsData.reviews.slice(0, 5).map((review: any) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author_name
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1
        },
        reviewBody: review.text,
        datePublished: review.created_at || new Date(review.time * 1000).toISOString(),
        publisher: {
          '@type': 'Organization',
          name: 'Google'
        }
      }))
    }),

    // Add menu items as offers if available
    makesOffer: menuItems && menuItems.length > 0 
      ? menuItems.slice(0, 10).map(item => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MenuItem',
            name: locale === 'de' ? (item.titleDe || item.title) : (item.titleEn || item.title),
            description: locale === 'de' ? (item.descriptionDe || item.description) : (item.descriptionEn || item.description),
            image: item.imageUrl,
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'EUR',
              availability: item.isAvailable ? 'InStock' : 'OutOfStock'
            }
          }
        }))
      : [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'MenuItem',
              name: locale === 'de' ? 'Hausgemachte Pasta' : 'Homemade Pasta',
              description:
                locale === 'de'
                  ? 'Täglich frisch zubereitete Pasta'
                  : 'Daily fresh prepared pasta',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'MenuItem',
              name: locale === 'de' ? 'Holzofen Pizza' : 'Wood-Fired Pizza',
              description:
                locale === 'de'
                  ? 'Authentische neapolitanische Pizza aus dem Holzofen'
                  : 'Authentic Neapolitan pizza from wood oven',
            },
          },
        ],
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://lacantina-berlin.de/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'de' ? 'Speisekarte' : 'Menu',
        item: `https://lacantina-berlin.de/${locale}/menu`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: locale === 'de' ? 'Reservierung' : 'Reservations',
        item: `https://lacantina-berlin.de/${locale}/reservations`,
      },
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantData, null, 2),
        }}
        suppressHydrationWarning={true}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData, null, 2),
        }}
        suppressHydrationWarning={true}
      />
    </>
  );
}

export function MenuSchema({
  menuItems,
  locale,
}: {
  menuItems: any[];
  locale: string;
}) {
  const menuData = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: locale === 'de' ? 'Hauptgerichte' : 'Main Dishes',
        hasMenuItem: menuItems
          .filter((item) => !item.category?.toLowerCase().includes('drink'))
          .map((item) => ({
            '@type': 'MenuItem',
            name:
              locale === 'de'
                ? item.titleDe || item.title
                : item.titleEn || item.title,
            description:
              locale === 'de'
                ? item.descriptionDe || item.description
                : item.descriptionEn || item.description,
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'EUR',
              availability: item.isAvailable ? 'InStock' : 'OutOfStock',
            },
          })),
      },
      {
        '@type': 'MenuSection',
        name: locale === 'de' ? 'Getränke' : 'Beverages',
        hasMenuItem: menuItems
          .filter(
            (item) =>
              item.category?.toLowerCase().includes('drink') ||
              item.category?.toLowerCase().includes('bier') ||
              item.category?.toLowerCase().includes('wein')
          )
          .map((item) => ({
            '@type': 'MenuItem',
            name:
              locale === 'de'
                ? item.titleDe || item.title
                : item.titleEn || item.title,
            description:
              locale === 'de'
                ? item.descriptionDe || item.description
                : item.descriptionEn || item.description,
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'EUR',
              availability: item.isAvailable ? 'InStock' : 'OutOfStock',
            },
          })),
      },
    ],
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(menuData, null, 2),
      }}
    />
  );
}

// SEO metadata generator for German keywords
export function generateSEOMetadata(
  page: 'home' | 'menu' | 'reservations' | 'contact' | 'gallery' | 'events',
  locale: string
): Metadata {
  const baseTitle = 'Ristorante La Cantina Bleibtreu';
  const germanKeywords = [
    'Italienisches Restaurant Berlin',
    'Authentische italienische Küche Berlin',
    'Pasta Restaurant Berlin',
    'Pizza Berlin',
    'Italiener Berlin Charlottenburg',
    'Holzofen Pizza Berlin',
    'Italienische Weine Berlin',
    'Restaurant Bleibtreustraße Berlin',
  ];

  const englishKeywords = [
    'Italian Restaurant Berlin',
    'Authentic Italian Cuisine Berlin',
    'Best Pasta Berlin',
    'Wood Fired Pizza Berlin',
    'Italian Wine Berlin',
    'Restaurant Charlottenburg',
  ];

  const keywords = locale === 'de' ? germanKeywords : englishKeywords;

  const pageData = {
    home: {
      de: {
        title: `${baseTitle} - Authentisches Italienisches Restaurant in Berlin Charlottenburg`,
        description: `Entdecken Sie authentische italienische Küche im Herzen Berlins. Frische hausgemachte Pasta, Holzofen-Pizza und ausgewählte italienische Weine. Reservieren Sie jetzt Ihren Tisch in unserem gemütlichen Restaurant in der Bleibtreustraße.`,
      },
      en: {
        title: `${baseTitle} - Authentic Italian Restaurant in Berlin Charlottenburg`,
        description: `Discover authentic Italian cuisine in the heart of Berlin. Fresh homemade pasta, wood-fired pizza and selected Italian wines. Reserve your table now at our cozy restaurant on Bleibtreustraße.`,
      },
    },
    menu: {
      de: {
        title: `Speisekarte - ${baseTitle} | Italienische Gerichte & Getränke Berlin`,
        description: `Unsere authentische italienische Speisekarte mit frischer Pasta, traditioneller Pizza aus dem Holzofen und italienischen Spezialitäten. Alle Preise und Gerichte online einsehen.`,
      },
      en: {
        title: `Menu - ${baseTitle} | Italian Dishes & Beverages Berlin`,
        description: `Our authentic Italian menu featuring fresh pasta, traditional wood-fired pizza and Italian specialties. View all prices and dishes online.`,
      },
    },
    reservations: {
      de: {
        title: `Tisch Reservieren - ${baseTitle} | Online Reservierung Berlin`,
        description: `Reservieren Sie Ihren Tisch im Ristorante La Cantina Bleibtreu online. Schnell und einfach einen Platz in unserem italienischen Restaurant in Berlin Charlottenburg buchen.`,
      },
      en: {
        title: `Table Reservation - ${baseTitle} | Online Booking Berlin`,
        description: `Reserve your table at Ristorante La Cantina Bleibtreu online. Quick and easy booking at our Italian restaurant in Berlin Charlottenburg.`,
      },
    },
    contact: {
      de: {
        title: `Kontakt & Anfahrt - ${baseTitle} | Italienisches Restaurant Berlin`,
        description: `Kontaktieren Sie uns für Reservierungen oder Fragen. Ristorante La Cantina Bleibtreu, Bleibtreustraße 17, 10623 Berlin. Telefon: +49 30 8832156. Öffnungszeiten und Anfahrt.`,
      },
      en: {
        title: `Contact & Directions - ${baseTitle} | Italian Restaurant Berlin`,
        description: `Contact us for reservations or questions. Ristorante La Cantina Bleibtreu, Bleibtreustraße 17, 10623 Berlin. Phone: +49 30 8832156. Opening hours and directions.`,
      },
    },
    gallery: {
      de: {
        title: `Galerie - ${baseTitle} | Fotos vom Restaurant & italienischen Gerichten`,
        description: `Entdecken Sie die Atmosphäre unseres italienischen Restaurants in Berlin. Fotos von unseren Gerichten, dem Restaurant und der gemütlichen Einrichtung.`,
      },
      en: {
        title: `Gallery - ${baseTitle} | Restaurant & Italian Food Photos`,
        description: `Discover the atmosphere of our Italian restaurant in Berlin. Photos of our dishes, restaurant and cozy interior.`,
      },
    },
    events: {
      de: {
        title: `Events & Veranstaltungen - ${baseTitle} | Italienische Kochlkurse Berlin`,
        description: `Besondere Events im Ristorante La Cantina Bleibtreu: Italienische Kochkurse, Weinverkostungen und private Feiern. Buchen Sie Ihr einzigartiges Erlebnis.`,
      },
      en: {
        title: `Events & Special Occasions - ${baseTitle} | Italian Cooking Classes Berlin`,
        description: `Special events at Ristorante La Cantina Bleibtreu: Italian cooking classes, wine tastings and private celebrations. Book your unique experience.`,
      },
    },
  };

  const data = pageData[page]?.[locale as 'de' | 'en'] ||
    pageData[page]?.['de'] || {
      title:
        'Ristorante La Cantina Bleibtreu - Authentic Italian Restaurant Berlin',
      description:
        'Experience authentic Italian cuisine at Ristorante La Cantina Bleibtreu in Berlin. Fresh pasta, traditional recipes, and warm hospitality await you.',
    };

  return {
    metadataBase: new URL('https://lacantina-berlin.de'),
    title: data.title,
    description: data.description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Ristorante La Cantina Bleibtreu' }],
    creator: 'Ristorante La Cantina Bleibtreu',
    publisher: 'Ristorante La Cantina Bleibtreu',
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      url: `https://lacantina-berlin.de/${locale}`,
      siteName: 'Ristorante La Cantina Bleibtreu',
      title: data.title,
      description: data.description,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Ristorante La Cantina Bleibtreu - Italienisches Restaurant',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['/images/twitter-card.jpg'],
    },
    icons: {
      icon: [
        { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', url: '/favicon.ico' },
        { rel: 'shortcut icon', url: '/favicon.ico' },
      ],
      apple: [
        { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon.svg' },
      ],
    },
    manifest: '/manifest.json',
    other: {
      'msapplication-TileColor': '#D2691E',
      'msapplication-config': 'none',
      'google-site-verification': 'your-google-verification-code',
      'geo.region': 'DE-BE',
      'geo.placename': 'Berlin',
      'geo.position': '52.5048;13.3091',
      ICBM: '52.5048, 13.3091',
    },
    alternates: {
      canonical: `https://lacantina-berlin.de/${locale}/${page === 'home' ? '' : page}`,
      languages: {
        de: `https://lacantina-berlin.de/de/${page === 'home' ? '' : page}`,
        en: `https://lacantina-berlin.de/en/${page === 'home' ? '' : page}`,
      },
    },
  };
}
