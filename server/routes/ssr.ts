import express from 'express'
import { renderPage } from '../ssr'
import { inMemoryStorage } from '../inMemoryStorage'

const router = express.Router()

// SSR for landing page (home)
router.get(['/', '/de', '/en'], async (req, res) => {
  try {
    const locale = req.path === '/en' ? 'en' : 'de'
    const url = req.path === '/' ? '/de' : req.path
    
    const seoTitle = locale === 'de' 
      ? 'La Cantina Berlin - Authentische Italienische Küche | Ristorante'
      : 'La Cantina Berlin - Authentic Italian Restaurant | Fine Dining'
    
    const seoDescription = locale === 'de'
      ? 'Authentische italienische Küche im Herzen Berlins. Traditionelle Aromen im Ristorante La Cantina Bleibtreu. Tisch reservieren.'
      : 'Authentic Italian cuisine in the heart of Berlin. Experience traditional flavors at Ristorante La Cantina Bleibtreu. Book a table.'

    const html = renderPage({
      url,
      locale,
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