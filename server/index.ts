import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})

export default app
