import express from 'express'
import { renderPage } from '../ssr'
import { inMemoryStorage } from '../inMemoryStorage'
import { GoogleReviewsService } from '../services/googleReviews'

const router = express.Router()

// SSR for landing page (home) with reviews for SEO
router.get(['/', '/de', '/en'], async (req, res) => {
  try {
    const locale = req.path === '/en' ? 'en' : 'de'
    const url = req.path === '/' ? '/de' : req.path
    
    // Fetch reviews data for SEO
    let reviewsData = null
    try {
      reviewsData = await GoogleReviewsService.getReviews()
      console.log(`📊 SSR: Loaded ${reviewsData.reviews.length} reviews for SEO`)
    } catch (error) {
      console.warn('⚠️ SSR: Failed to load reviews for SEO:', error)
    }
    
    const seoTitle = locale === 'de' 
      ? 'La Cantina Berlin - Authentische Italienische Küche | Ristorante'
      : 'La Cantina Berlin - Authentic Italian Restaurant | Fine Dining'
    
    let seoDescription = locale === 'de'
      ? 'Authentische italienische Küche im Herzen Berlins. Traditionelle Aromen im Ristorante La Cantina Bleibtreu. Tisch reservieren.'
      : 'Authentic Italian cuisine in the heart of Berlin. Experience traditional flavors at Ristorante La Cantina Bleibtreu. Book a table.'

    // Enhance SEO description with reviews data
    if (reviewsData && reviewsData.reviews.length > 0) {
      const avgRating = reviewsData.place_info.rating || 0
      const reviewCount = reviewsData.place_info.user_ratings_total || 0
      
      if (avgRating > 0) {
        seoDescription += locale === 'de'
          ? ` ⭐ ${avgRating}/5 Sterne (${reviewCount} Bewertungen) auf Google.`
          : ` ⭐ ${avgRating}/5 stars (${reviewCount} reviews) on Google.`
      }
    }

    const html = renderPage({
      url,
      locale,
      reviewsData, // Pass reviews data for SSR
      seoTitle,
      seoDescription,
      ogImage: 'https://la-cantina.replit.app/og-landing.jpg'
    })
    
    res.send(html)
  } catch (error) {
    console.error('SSR Error for landing page:', error)
    res.status(500).send('Internal Server Error')
  }
})

// SSR for menu page
router.get(['/de/menu', '/en/menu'], async (req, res) => {
  try {
    const locale = req.path.startsWith('/en') ? 'en' : 'de'
    const menuItems = inMemoryStorage.getAllMenuItems()
    
    const seoTitle = locale === 'de'
      ? 'Speisekarte - La Cantina Berlin | Italienische Küche'
      : 'Menu - La Cantina Berlin | Italian Cuisine'
    
    const seoDescription = locale === 'de'
      ? `Entdecken Sie unsere authentische italienische Speisekarte mit ${menuItems.length} köstlichen Gerichten. Hausgemachte Pasta, frischer Fisch und traditionelle Rezepte.`
      : `Discover our authentic Italian menu with ${menuItems.length} delicious dishes. Homemade pasta, fresh fish and traditional recipes.`

    const html = renderPage({
      url: req.path,
      locale,
      menuItems,
      seoTitle,
      seoDescription,
      ogImage: 'https://la-cantina.replit.app/og-menu.jpg'
    })
    
    res.send(html)
  } catch (error) {
    console.error('SSR Error for menu page:', error)
    res.status(500).send('Internal Server Error')
  }
})

export default router