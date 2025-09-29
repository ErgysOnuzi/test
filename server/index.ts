import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import db from '../src/lib/db'
// import { setupAuth, isAuthenticated } from './replitAuth' // Disabled - using token auth instead
import { storage } from './storage'
import menuRoutes from './routes/menu'
import galleryRoutes from './routes/gallery'
import reservationRoutes from './routes/reservations'
import eventRoutes from './routes/events'
import contactRoutes from './routes/contact'
import feedbackRoutes from './routes/feedback'
import adminRoutes from './routes/admin'

// Load environment variables
config()

const app = express()
const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 5000 : 3001)

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
  
  // Force HTTPS redirect in production
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
      return
    }
    next()
  })
  
  app.use((req, res, next) => {
    res.set({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'"
    })
    next()
  })
}

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || true
    : true,
  credentials: true
}))
app.use(cookieParser()) // Add cookie parser middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression middleware for performance
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache')
  next()
})

// Serve static files from Vite build (production)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.join(__dirname, '../dist')

// Serve static files with proper headers and performance optimizations
app.use(express.static(distPath, {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: false,
  lastModified: false
}))

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

  // Enhanced health check for load balancer
  app.get('/health', (req, res) => {
    const healthData = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      pid: process.pid
    }
    res.json(healthData)
  })

  // Readiness probe for Kubernetes-style orchestration
  app.get('/ready', (req, res) => {
    res.status(200).send('Ready')
  })

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
  app.use('/api/menu', menuRoutes)
  app.use('/api/gallery', galleryRoutes)
  app.use('/api/reservations', reservationRoutes)
  app.use('/api/events', eventRoutes)
  app.use('/api/contact', contactRoutes)
  app.use('/api/feedback', feedbackRoutes)
  app.use('/api/admin', adminRoutes)

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
