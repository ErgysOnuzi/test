import express from 'express'

const router = express.Router()

router.get('/sitemap.xml', (req, res) => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://lacantina-berlin.de'
    : `http://${req.get('host')}`
  
  const now = new Date().toISOString().split('T')[0]
  
  const staticPages = [
    { url: '/de', changefreq: 'daily', priority: '1.0' },
    { url: '/en', changefreq: 'daily', priority: '1.0' },
    { url: '/de/menu', changefreq: 'weekly', priority: '0.9' },
    { url: '/en/menu', changefreq: 'weekly', priority: '0.9' },
    { url: '/de/gallery', changefreq: 'weekly', priority: '0.8' },
    { url: '/en/gallery', changefreq: 'weekly', priority: '0.8' },
    { url: '/de/events', changefreq: 'weekly', priority: '0.8' },
    { url: '/en/events', changefreq: 'weekly', priority: '0.8' },
    { url: '/de/reservations', changefreq: 'monthly', priority: '0.8' },
    { url: '/en/reservations', changefreq: 'monthly', priority: '0.8' },
    { url: '/de/contact', changefreq: 'monthly', priority: '0.7' },
    { url: '/en/contact', changefreq: 'monthly', priority: '0.7' },
    { url: '/de/feedback', changefreq: 'monthly', priority: '0.7' },
    { url: '/en/feedback', changefreq: 'monthly', priority: '0.7' }
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.url.startsWith('/de') ? `<xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url.replace('/de', '/en')}" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}${page.url}" />` : ''}
    ${page.url.startsWith('/en') ? `<xhtml:link rel="alternate" hreflang="de" href="${baseUrl}${page.url.replace('/en', '/de')}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}" />` : ''}
  </url>`).join('\n')}
</urlset>`
  
  res.header('Content-Type', 'application/xml')
  res.send(sitemap)
})

export default router
