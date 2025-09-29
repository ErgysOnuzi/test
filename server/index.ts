import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { validateEnvironment } from './boot-guard'
import { db } from './db'
// import { setupAuth, isAuthenticated } from './replitAuth' // Disabled - using token auth instead
import { storage } from './storage'
import healthRoutes from './routes/health'
import ssrRoutes from './routes/ssr'
import menuRoutes from './routes/menu'
import galleryRoutes from './routes/gallery'
import reservationRoutes from './routes/reservations'
import eventRoutes from './routes/events'
import contactRoutes from './routes/contact'
import feedbackRoutes from './routes/feedback'
import adminRoutes from './routes/admin'
import uploadRoutes from './routes/upload'
import googleReviewsRoutes from './routes/google-reviews'
// Security middleware imports
import { 
  generalRateLimit, 
  authRateLimit, 
  apiRateLimit, 
  uploadRateLimit,
  securityHeaders, 
  inputSanitization, 
  compressionMiddleware,
  securityLogger,
  corsConfig
} from './middleware/security'

// Load environment variables
config()

// Validate all required environment variables - exit with code 1 if any are missing
validateEnvironment()

const app = express()
// Use port 3001 in development for API server, 5000 in production
const PORT = process.env.NODE_ENV === 'production' 
  ? parseInt(process.env.PORT || '5000')
  : 3001

// Essential security middleware - applied first
app.use(securityHeaders)
app.use(compressionMiddleware)
app.use(securityLogger)

// Apply general rate limiting to all routes
app.use(generalRateLimit)

// Advanced logging middleware for production monitoring
app.use((req, res, next) => {
  const start = Date.now()
  const { method, url, ip } = req
  
  res.on('finish', () => {
    const duration = Date.now() - start
    const { statusCode } = res
    const logLevel = statusCode >= 400 ? 'ERROR' : 'INFO'
    
    console.log(`[${logLevel}] ${method} ${url} ${statusCode} - ${duration}ms - ${ip}`)
    
    // Performance monitoring - log slow requests
    if (duration > 1000) {
      console.warn(`⚠️ SLOW REQUEST: ${method} ${url} took ${duration}ms`)
    }
  })
  
  next()
})

// Production security middleware
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
  
  // Force HTTPS redirect in production only when actually deployed
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') && req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
      return
    }
    next()
  })
  
  // Note: Security headers now handled by helmet middleware for consistency
  // Removed manual headers to prevent conflicts with helmet configuration
}

// Middleware with enhanced security
// Input sanitization middleware
app.use(inputSanitization)
// CORS with security configuration
app.use(cors(corsConfig))
app.use(cookieParser()) // Add cookie parser middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression middleware for performance
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache')
  next()
})

// Serve static files from Vite build (production)
const __filename = import.meta?.url ? fileURLToPath(import.meta.url) : process.cwd() + '/server/index.ts'
const __dirname = path.dirname(__filename)
const distPath = path.join(__dirname, '../dist')

// SSR routes for SEO-critical pages MUST come before static file serving
app.use(ssrRoutes)

// Setup routes without database-dependent authentication
function initializeServer() {
  // Disabled old auth system - using token-based auth instead
  // await setupAuth(app)

  // Auth routes - disabled, using token auth in admin routes instead
  // app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
  //   try {
  //     const userId = req.user.claims.sub;
  //     const user = await storage.getUser(userId);
  //     res.json(user);
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //     res.status(500).json({ message: "Failed to fetch user" });
  //   }
  // });

  // Health and monitoring routes
  app.use('/api', healthRoutes)

  // Database health check for backup monitoring
  app.get('/health/db', async (req, res) => {
    try {
      // Simple database connectivity test
      await db.$client.query('SELECT 1')
      res.json({ 
        status: 'ok', 
        database: 'connected',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Database health check failed:', error)
      res.status(503).json({ 
        status: 'error', 
        database: 'disconnected',
        timestamp: new Date().toISOString()
      })
    }
  })

  // API Routes
  // API routes with rate limiting
  app.use('/api/menu', apiRateLimit, menuRoutes)
  app.use('/api/gallery', apiRateLimit, galleryRoutes)
  app.use('/api/reservations', apiRateLimit, reservationRoutes)
  app.use('/api/events', apiRateLimit, eventRoutes)
  app.use('/api/contact', apiRateLimit, contactRoutes)
  app.use('/api/feedback', apiRateLimit, feedbackRoutes)
  app.use('/api/admin', authRateLimit, adminRoutes)
  app.use('/api/upload', uploadRateLimit, uploadRoutes)
  app.use('/api/reviews', apiRateLimit, googleReviewsRoutes)
  // Backward compatibility for frontend
  app.use('/api/google-reviews', apiRateLimit, googleReviewsRoutes)

  // Serve uploaded images with proper caching
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
    maxAge: process.env.NODE_ENV === 'production' ? '7d' : '1h',
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      res.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400')
      res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    }
  }))

  // Static file serving comes AFTER SSR routes and API routes
  app.use(express.static(distPath, {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
    etag: false,
    lastModified: false
  }))

  // Serve React app for all non-API routes (SPA fallback)
  app.use((req, res, next) => {
    // Skip API routes and static files
    if (req.path.startsWith('/api/') || req.path === '/health') {
      return next()
    }
    
    // If it's a static file request that wasn't found, 404
    if (req.path.includes('.')) {
      return res.status(404).send('Not found')
    }
    
    // Serve React app for all other routes
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error serving index.html:', err)
        res.status(500).send('Server error')
      }
    })
  })

  // Error handling middleware (must be last)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err)
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    })
  })

  // Graceful shutdown handling for scaling
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Express server running on port ${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/health`)
    console.log(`🌐 Frontend: Serving React app from ${distPath}`)
    console.log(`⚡ Ready for autoscaling with graceful shutdown`)
  })

  // Graceful shutdown for load balancer health checks
  process.on('SIGTERM', () => {
    console.log('🔄 SIGTERM received, shutting down gracefully...')
    server.close(() => {
      console.log('✅ Process terminated')
      process.exit(0)
    })
  })

  process.on('SIGINT', () => {
    console.log('🔄 SIGINT received, shutting down gracefully...')
    server.close(() => {
      console.log('✅ Process terminated')
      process.exit(0)
    })
  })
}

// Initialize server
initializeServer()

export default app
