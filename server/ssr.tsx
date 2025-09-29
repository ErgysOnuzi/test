import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../src/App'

interface SSROptions {
  url: string
  locale: string
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
    ogImage: ogImage || 'https://la-cantina.replit.app/og.jpg',
    url
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
}

function generateHTML(options: HTMLOptions): string {
  const { appHTML, dehydratedState, locale, seoTitle, seoDescription, ogImage, url } = options
  
  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${seoTitle}</title>
    <meta name="description" content="${seoDescription}" />

    <!-- Open Graph Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://la-cantina.replit.app${url}" />
    <meta property="og:site_name" content="La Cantina Berlin" />
    <meta property="og:title" content="${seoTitle}" />
    <meta property="og:description" content="${seoDescription}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="La Cantina Berlin elegant restaurant interior" />

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seoTitle}" />
    <meta name="twitter:description" content="${seoDescription}" />
    <meta name="twitter:image" content="${ogImage}" />

    <!-- Canonical URL -->
    <link rel="canonical" href="https://la-cantina.replit.app${url}" />
    
    <!-- Structured Data for Restaurant -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "La Cantina Berlin",
      "alternateName": "Ristorante La Cantina Bleibtreu",
      "description": "${seoDescription}",
      "url": "https://la-cantina.replit.app",
      "sameAs": ["https://servepos.online"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Bleibtreustraße",
        "addressLocality": "Berlin",
        "addressCountry": "DE"
      },
      "servesCuisine": "Italian",
      "priceRange": "$$",
      "acceptsReservations": true
    }
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