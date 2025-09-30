import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../src/App'

interface SSROptions {
  url: string
  locale: string
  reviewsData?: {
    place_info?: {
      rating: number
      user_ratings_total: number
    }
    reviews: any[]
  }
  menuItems?: any[]
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
}

export function renderPage(options: SSROptions): string {
  const { url, locale, menuItems = [], reviewsData, seoTitle, seoDescription, ogImage } = options
  
  // Create a query client for SSR
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
    },
  })

  // Pre-populate the cache with menu items if provided
  if (menuItems.length > 0) {
    queryClient.setQueryData(['/api/menu'], menuItems)
  }

  // Pre-populate the cache with reviews data if provided
  if (reviewsData) {
    queryClient.setQueryData(['/api/reviews'], reviewsData)
    queryClient.setQueryData(['/api/google-reviews'], reviewsData) // Backward compatibility
  }

  // Render the React app to string
  const appHTML = renderToString(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[url]} initialIndex={0}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  )

  const dehydratedState = JSON.stringify(queryClient.getQueryCache().getAll())

  // Generate the complete HTML
  return generateHTML({
    appHTML,
    dehydratedState,
    locale,
    seoTitle: seoTitle || 'La Cantina Berlin - Authentic Italian Restaurant',
    seoDescription: seoDescription || 'Authentic Italian cuisine in the heart of Berlin. Experience traditional flavors at Ristorante La Cantina Bleibtreu.',
    ogImage: ogImage || '/og.jpg',
    url,
    reviewsData
  })
}

interface HTMLOptions {
  appHTML: string
  dehydratedState: string
  locale: string
  seoTitle: string
  seoDescription: string
  ogImage: string
  url: string
  reviewsData?: {
    place_info?: {
      rating: number
      user_ratings_total: number
    }
    reviews: any[]
  }
}

function generateHTML(options: HTMLOptions): string {
  const { appHTML, dehydratedState, locale, seoTitle, seoDescription, ogImage, url, reviewsData } = options
  
  // Centralized site configuration
  const SITE_URL = 'https://lacantina-berlin.de'
  const ASSET_BASE = 'https://lacantina-berlin.de'
  
  // Generate proper URLs for different locales
  const cleanPath = url.replace(/^\/(de|en)/, '') || '/'
  const canonicalUrl = `${SITE_URL}${url}`
  const alternateUrl = locale === 'de' 
    ? `${SITE_URL}/en${cleanPath === '/' ? '' : cleanPath}`
    : `${SITE_URL}/de${cleanPath === '/' ? '' : cleanPath}`
  const defaultUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`
  
  // Fix OG image to use consistent domain
  const resolvedOgImage = ogImage.startsWith('http') ? ogImage : `${ASSET_BASE}${ogImage}`
  
  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${seoTitle}</title>
    <meta name="description" content="${seoDescription}" />
    
    <!-- Enhanced SEO Meta Tags -->
    <meta name="keywords" content="${locale === 'de' 
      ? 'Italienisches Restaurant Berlin, Pasta Berlin, Pizza Berlin, Italiener Charlottenburg, Ristorante Berlin' 
      : 'Italian Restaurant Berlin, Pasta Berlin, Pizza Berlin, Italian Food Berlin, Ristorante Berlin'}" />
    <meta name="author" content="Ristorante La Cantina Bleibtreu" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="bingbot" content="index, follow" />
    <meta name="geo.region" content="DE-BE" />
    <meta name="geo.placename" content="Berlin" />
    <meta name="geo.position" content="52.5033;13.3298" />
    <meta name="ICBM" content="52.5033, 13.3298" />
    
    <!-- Favicon and Icons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />

    <!-- Enhanced Open Graph Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Ristorante La Cantina Bleibtreu" />
    <meta property="og:title" content="${seoTitle}" />
    <meta property="og:description" content="${seoDescription}" />
    <meta property="og:image" content="${resolvedOgImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Ristorante La Cantina Bleibtreu - Authentic Italian Restaurant in Berlin" />
    <meta property="og:locale" content="${locale === 'de' ? 'de_DE' : 'en_US'}" />
    <meta property="og:locale:alternate" content="${locale === 'de' ? 'en_US' : 'de_DE'}" />

    <!-- Enhanced Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lacantina_berlin" />
    <meta name="twitter:title" content="${seoTitle}" />
    <meta name="twitter:description" content="${seoDescription}" />
    <meta name="twitter:image" content="${resolvedOgImage}" />
    <meta name="twitter:image:alt" content="Authentic Italian Restaurant in Berlin" />

    <!-- Canonical URL and Language Alternates -->
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="de" href="${SITE_URL}/de${cleanPath === '/' ? '' : cleanPath}" />
    <link rel="alternate" hreflang="en" href="${SITE_URL}/en${cleanPath === '/' ? '' : cleanPath}" />
    <link rel="alternate" hreflang="x-default" href="${defaultUrl}" />
    
    <!-- Enhanced Structured Data for Restaurant -->
    <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["Restaurant", "LocalBusiness"],
      "@id": `${SITE_URL}/#restaurant`,
      "name": "Ristorante La Cantina Bleibtreu",
      "alternateName": "La Cantina Berlin",
      "description": seoDescription,
      "url": SITE_URL,
      "sameAs": [
        "https://www.facebook.com/lacantina.berlin",
        "https://www.instagram.com/lacantina.berlin",
        "https://www.google.com/maps/place/Bleibtreustra%C3%9Fe+17,+10623+Berlin"
      ],
      "telephone": "+49 30 8832156",
      "email": "info@ristorante-la-cantina.de",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Bleibtreustraße 17",
        "addressLocality": "Berlin",
        "addressRegion": "Berlin",
        "postalCode": "10623",
        "addressCountry": "DE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 52.5033,
        "longitude": 13.3298
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "15:00",
          "closes": "23:00"
        }
      ],
      "servesCuisine": ["Italian", "Mediterranean"],
      "priceRange": "€20-30",
      "currenciesAccepted": "EUR",
      "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
      "hasMenu": `${SITE_URL}/${locale}/menu`,
      "acceptsReservations": true,
      "smokingAllowed": false,
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Reservations",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Takeout",
          "value": true
        }
      ],
      ...(reviewsData && reviewsData.place_info?.rating > 0 && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": reviewsData.place_info.rating,
          "reviewCount": reviewsData.place_info.user_ratings_total || reviewsData.reviews.length,
          "bestRating": 5,
          "worstRating": 1
        }
      }),
      ...(reviewsData && reviewsData.reviews.length > 0 && {
        "review": reviewsData.reviews.slice(0, 3).map((review) => ({
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating || 5,
            "bestRating": 5,
            "worstRating": 1
          },
          "author": {
            "@type": "Person",
            "name": review.author_name || 'Google User'
          },
          "reviewBody": (review.text || '').substring(0, 200) + ((review.text || '').length > 200 ? '...' : ''),
          "datePublished": review.time ? new Date(review.time * 1000).toISOString() : new Date().toISOString()
        }))
      })
    }, null, 2)}
    </script>
    
    <!-- Website Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "name": "Ristorante La Cantina Bleibtreu",
      "url": SITE_URL,
      "description": locale === 'de' 
        ? 'Offizielle Website des Ristorante La Cantina Bleibtreu - Authentisches italienisches Restaurant in Berlin-Charlottenburg'
        : 'Official website of Ristorante La Cantina Bleibtreu - Authentic Italian restaurant in Berlin-Charlottenburg',
      "inLanguage": locale === 'de' ? 'de-DE' : 'en-US',
      "publisher": {
        "@type": "Restaurant",
        "name": "Ristorante La Cantina Bleibtreu"
      }
    }, null, 2)}
    </script>
  </head>
  <body>
    <div id="root">${appHTML}</div>
    <script>
      window.__REACT_QUERY_STATE__ = ${dehydratedState};
    </script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
}

export default { renderPage }