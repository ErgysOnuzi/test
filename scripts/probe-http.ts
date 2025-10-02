#!/usr/bin/env tsx

interface ProbeResult {
  url: string
  status: number
  hasCSS: boolean
  hasJS: boolean
  hasSecurityHeaders: boolean
  redirectsTo?: string
  error?: string
}

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000'

const routes = [
  '/de',
  '/en',
  '/de/menu',
  '/en/menu',
  '/de/gallery',
  '/en/gallery',
  '/de/events',
  '/en/events',
  '/de/reservations',
  '/en/reservations',
  '/de/contact',
  '/en/contact',
  '/de/admin/login',
  '/en/admin/login',
  '/api/health',
  '/api/menu',
  '/api/reviews',
  '/',
  '/invalid-route-404'
]

async function probeRoute(route: string): Promise<ProbeResult> {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      redirect: 'manual'
    })

    const result: ProbeResult = {
      url: route,
      status: response.status,
      hasCSS: false,
      hasJS: false,
      hasSecurityHeaders: false
    }

    if (response.status === 301 || response.status === 302) {
      result.redirectsTo = response.headers.get('location') || 'unknown'
    }

    if (response.headers.get('content-type')?.includes('text/html')) {
      const html = await response.text()
      result.hasCSS = html.includes('<link') && html.includes('.css')
      result.hasJS = html.includes('<script') && (html.includes('.js') || html.includes('module'))
    }

    result.hasSecurityHeaders = !!(
      response.headers.get('x-frame-options') ||
      response.headers.get('x-content-type-options') ||
      response.headers.get('content-security-policy')
    )

    return result
  } catch (error) {
    return {
      url: route,
      status: 0,
      hasCSS: false,
      hasJS: false,
      hasSecurityHeaders: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function runProbe() {
  console.log('🔍 HTTP Routing Probe\n')
  console.log(`Testing routes on ${BASE_URL}\n`)
  
  const results = await Promise.all(routes.map(probeRoute))
  
  console.log('┌─────────────────────────────┬────────┬─────┬────┬──────────┬─────────────────┐')
  console.log('│ Route                       │ Status │ CSS │ JS │ Security │ Redirect        │')
  console.log('├─────────────────────────────┼────────┼─────┼────┼──────────┼─────────────────┤')
  
  for (const result of results) {
    const css = result.hasCSS ? '✓' : '✗'
    const js = result.hasJS ? '✓' : '✗'
    const sec = result.hasSecurityHeaders ? '✓' : '✗'
    const redirect = result.redirectsTo ? result.redirectsTo.substring(0, 15) : ''
    const error = result.error ? `ERROR: ${result.error}` : ''
    
    console.log(
      `│ ${result.url.padEnd(27)} │ ${String(result.status).padEnd(6)} │  ${css}  │ ${js}  │    ${sec}     │ ${(redirect || error).padEnd(15)} │`
    )
  }
  
  console.log('└─────────────────────────────┴────────┴─────┴────┴──────────┴─────────────────┘\n')
  
  const issues = []
  
  if (results.filter(r => r.status === 200 && r.hasCSS && r.hasJS).length === 0) {
    issues.push('⚠️  No routes are serving CSS and JS properly')
  }
  
  if (results.filter(r => r.hasSecurityHeaders).length === 0) {
    issues.push('⚠️  No security headers detected on any route')
  }
  
  const htmlRoutes = results.filter(r => r.url.startsWith('/') && !r.url.startsWith('/api'))
  const missingAssets = htmlRoutes.filter(r => r.status === 200 && (!r.hasCSS || !r.hasJS))
  
  if (missingAssets.length > 0) {
    issues.push(`⚠️  ${missingAssets.length} HTML routes missing assets: ${missingAssets.map(r => r.url).join(', ')}`)
  }
  
  if (issues.length > 0) {
    console.log('Issues Found:')
    issues.forEach(issue => console.log(issue))
    console.log('')
  } else {
    console.log('✅ All routes passed basic checks\n')
  }
}

runProbe().catch(console.error)
