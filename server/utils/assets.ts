import fs from 'fs'
import path from 'path'

interface Assets {
  js: string
  css: string
}

let cachedAssets: Assets | null = null

export function getProductionAssets(): Assets {
  if (cachedAssets) {
    return cachedAssets
  }

  const isProduction = process.env.NODE_ENV === 'production'
  
  if (!isProduction) {
    // Development mode - use Vite dev server
    return {
      js: '/src/main.tsx',
      css: ''
    }
  }

  try {
    // Production mode - read from built index.html
    const indexPath = path.join(process.cwd(), 'dist/client/index.html')
    
    if (!fs.existsSync(indexPath)) {
      console.error('❌ Production build not found at:', indexPath)
      throw new Error('Build files not found')
    }
    
    const indexHtml = fs.readFileSync(indexPath, 'utf-8')
    
    // Extract JS and CSS paths from the built HTML
    const jsMatch = indexHtml.match(/src="(\/assets\/[^"]+\.js)"/)
    const cssMatch = indexHtml.match(/href="(\/assets\/[^"]+\.css)"/)
    
    if (!jsMatch) {
      console.error('❌ Could not find JS asset in built HTML')
      throw new Error('JS asset not found in build')
    }
    
    cachedAssets = {
      js: jsMatch[1],
      css: cssMatch ? cssMatch[1] : ''
    }
    
    console.log('📦 Production assets loaded:', cachedAssets)
    return cachedAssets
  } catch (error) {
    console.error('❌ CRITICAL: Failed to load production assets:', error)
    // In production, this should fail visibly
    throw error
  }
}
