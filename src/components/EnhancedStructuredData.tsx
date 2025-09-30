import React from 'react';

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

// Event Schema for individual events with comprehensive SEO optimization
export function EventSchema({ event, locale }: EventSchemaProps) {
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: locale === 'de' ? (event.titleDe || event.title) : (event.titleEn || event.title),
    description: locale === 'de' ? (event.descriptionDe || event.description) : (event.descriptionEn || event.description),
    startDate: event.date || event.event_date,
    endDate: event.endDate || event.event_date,
    eventStatus: 'EventScheduled',
    eventAttendanceMode: 'OfflineEventAttendanceMode',
    location: {
      '@type': 'Restaurant',
      name: 'Ristorante La Cantina Bleibtreu',
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
      }
    },
    organizer: {
      '@type': 'Restaurant',
      name: 'Ristorante La Cantina Bleibtreu',
      url: 'https://lacantina-berlin.de',
      telephone: '+49 30 8832156',
      email: 'info@ristorante-la-cantina.de'
    },
    offers: {
      '@type': 'Offer',
      price: event.price || 0,
      priceCurrency: 'EUR',
      availability: (event.capacity && event.currentBookings >= event.capacity) ? 'SoldOut' : 'InStock',
      url: `https://lacantina-berlin.de/${locale}/events/${event.id}`,
      validFrom: new Date().toISOString(),
      category: 'primary'
    },
    image: event.imageUrl || '/images/events/default-event.jpg',
    audience: {
      '@type': 'Audience',
      audienceType: locale === 'de' ? 'Erwachsene' : 'Adults'
    },
    maximumAttendeeCapacity: event.capacity || event.max_attendees || 20,
    remainingAttendeeCapacity: Math.max(0, (event.capacity || event.max_attendees || 20) - (event.currentBookings || event.current_attendees || 0)),
    isAccessibleForFree: (event.price || 0) === 0,
    inLanguage: locale === 'de' ? 'de-DE' : 'en-US'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(eventData, null, 2),
      }}
      suppressHydrationWarning={true}
    />
  );
}

// Enhanced Breadcrumb Schema with improved SEO structure
export function BreadcrumbSchema({ breadcrumbs }: BreadcrumbSchemaProps) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: {
        '@type': 'WebPage',
        '@id': crumb.url,
        name: crumb.name
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData, null, 2),
      }}
      suppressHydrationWarning={true}
    />
  );
}

// FAQ Schema for enhanced SEO with restaurant-specific questions
export function FAQSchema({ faqs, locale }: FAQSchemaProps) {
  const defaultFAQs = locale === 'de' ? [
    {
      question: 'Welche Öffnungszeiten hat das Restaurant?',
      answer: 'Wir sind Montag bis Samstag von 15:00 bis 23:00 Uhr geöffnet. Sonntag ist Ruhetag.'
    },
    {
      question: 'Ist eine Reservierung erforderlich?',
      answer: 'Eine Reservierung wird empfohlen, besonders an Wochenenden. Sie können online oder telefonisch unter +49 30 8832156 reservieren.'
    },
    {
      question: 'Welche Zahlungsmethoden werden akzeptiert?',
      answer: 'Wir akzeptieren Bargeld, Kredit- und Debitkarten (Visa, MasterCard, American Express).'
    },
    {
      question: 'Gibt es vegetarische und vegane Optionen?',
      answer: 'Ja, wir bieten verschiedene vegetarische Pasta-Gerichte und können viele Gerichte nach Absprache vegan zubereiten.'
    },
    {
      question: 'Wo befindet sich das Restaurant?',
      answer: 'Das Ristorante La Cantina Bleibtreu befindet sich in der Bleibtreustraße 17, 10623 Berlin-Charlottenburg, nahe dem Kurfürstendamm.'
    }
  ] : [
    {
      question: 'What are the restaurant opening hours?',
      answer: 'We are open Monday to Saturday from 3:00 PM to 11:00 PM. Sunday is our rest day.'
    },
    {
      question: 'Do I need a reservation?',
      answer: 'Reservations are recommended, especially on weekends. You can book online or call us at +49 30 8832156.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, credit and debit cards (Visa, MasterCard, American Express).'
    },
    {
      question: 'Do you have vegetarian and vegan options?',
      answer: 'Yes, we offer various vegetarian pasta dishes and can prepare many dishes vegan upon request.'
    },
    {
      question: 'Where is the restaurant located?',
      answer: 'Ristorante La Cantina Bleibtreu is located at Bleibtreustraße 17, 10623 Berlin-Charlottenburg, near Kurfürstendamm.'
    }
  ];

  const faqList = faqs.length > 0 ? faqs : defaultFAQs;

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData, null, 2),
      }}
      suppressHydrationWarning={true}
    />
  );
}

// Local Business Schema with comprehensive data
export function LocalBusinessSchema({ locale, reviewsData }: { locale: string; reviewsData?: any }) {
  const businessData = {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'LocalBusiness'],
    '@id': 'https://lacantina-berlin.de/#restaurant',
    name: 'Ristorante La Cantina Bleibtreu',
    legalName: 'Ristorante La Cantina Bleibtreu',
    description: locale === 'de'
      ? 'Authentisches italienisches Restaurant in Berlin-Charlottenburg mit frischer hausgemachter Pasta, Holzofen-Pizza und ausgewählten italienischen Weinen. Traditionelle Küche aus Sizilien und ganz Italien in gemütlicher Atmosphäre.'
      : 'Authentic Italian restaurant in Berlin-Charlottenburg serving fresh homemade pasta, wood-fired pizza and selected Italian wines. Traditional cuisine from Sicily and all of Italy in a cozy atmosphere.',
    url: 'https://lacantina-berlin.de',
    sameAs: [
      'https://www.facebook.com/lacantina.berlin',
      'https://www.instagram.com/lacantina.berlin',
      'https://www.google.com/maps/place/Bleibtreustra%C3%9Fe+17,+10623+Berlin'
    ],
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
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '15:00',
        closes: '23:00'
      }
    ],
    priceRange: '€20-30',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
    currenciesAccepted: 'EUR',
    servesCuisine: ['Italian', 'Mediterranean'],
    hasMap: 'https://www.google.com/maps/place/Bleibtreustra%C3%9Fe+17,+10623+Berlin',
    isAccessibleForFree: false,
    smokingAllowed: false,
    ...(reviewsData && reviewsData.place_info?.rating > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviewsData.place_info.rating,
        reviewCount: reviewsData.place_info.user_ratings_total || reviewsData.reviews.length,
        bestRating: 5,
        worstRating: 1
      }
    }),
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Reservations',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Takeout',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wine Selection',
        value: true
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessData, null, 2),
      }}
      suppressHydrationWarning={true}
    />
  );
}

// Website Schema for overall site SEO
export function WebsiteSchema({ locale }: { locale: string }) {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://lacantina-berlin.de/#website',
    name: 'Ristorante La Cantina Bleibtreu',
    url: 'https://lacantina-berlin.de',
    description: locale === 'de'
      ? 'Offizielle Website des Ristorante La Cantina Bleibtreu - Authentisches italienisches Restaurant in Berlin-Charlottenburg'
      : 'Official website of Ristorante La Cantina Bleibtreu - Authentic Italian restaurant in Berlin-Charlottenburg',
    inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
    publisher: {
      '@type': 'Restaurant',
      name: 'Ristorante La Cantina Bleibtreu'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://lacantina-berlin.de/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteData, null, 2),
      }}
      suppressHydrationWarning={true}
    />
  );
}