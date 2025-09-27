import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import path from 'path'
import db from '../src/lib/db'
import menuRoutes from './routes/menu'
import galleryRoutes from './routes/gallery'
import reservationRoutes from './routes/reservations'
import eventRoutes from './routes/events'
import contactRoutes from './routes/contact'
import adminRoutes from './routes/admin'

// Load environment variables
config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from Vite build (production)
const distPath = path.join(__dirname, '../dist')
app.use(express.static(distPath))

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

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

// Serve React app for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🌐 Frontend: Serving React app from ${distPath}`)
})

export default app
