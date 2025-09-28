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
import adminRoutes from './routes/admin'

// Load environment variables
config()

const app = express()
const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 5000 : 3001)

// Middleware
app.use(cors())
app.use(cookieParser()) // Add cookie parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from Vite build (production)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.join(__dirname, '../dist')

// Serve static files with proper headers
app.use(express.static(distPath, {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: false
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

  // Health check
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    })
  })

  // API Routes
  app.use('/api/menu', menuRoutes)
  app.use('/api/gallery', galleryRoutes)
  app.use('/api/reservations', reservationRoutes)
  app.use('/api/events', eventRoutes)
  app.use('/api/contact', contactRoutes)
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

  app.listen(PORT, () => {
    console.log(`🚀 Express server running on port ${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/health`)
    console.log(`🌐 Frontend: Serving React app from ${distPath}`)
  })
}

// Initialize server
initializeServer()

export default app
