import express from 'express'
import { createHash, randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Environment-based JWT secret - required for production
const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-change-in-production'

// Admin credentials from environment variables - secure for production
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ergysonuzi12@gmail.com'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'ergysonuzi'
// Hash the password from environment variable for security
const ADMIN_PASSWORD_HASH = createHash('sha256').update(process.env.ADMIN_PASSWORD || 'Xharie123').digest('hex')


// In-memory session storage (since database is not working)
const activeSessions = new Map<string, { 
  email: string, 
  username: string, 
  loginTime: number 
}>()

// Generate secure JWT session token
const generateSessionToken = (): string => {
  return jwt.sign(
    {
      role: 'admin',
      authenticated: true,
      timestamp: Date.now(),
    },
    JWT_SECRET,
    { expiresIn: '2h' }
  )
}

// Generate CSRF token and secret
const generateCSRFToken = (): { token: string; secret: string } => {
  const secret = randomBytes(32).toString('hex')
  const nonce = randomBytes(32).toString('hex')
  const hmac = createHash('sha256').update(secret + nonce).digest('hex')
  const token = `${nonce}.${hmac}`
  return { token, secret }
}

// CSRF token validation middleware
const validateCSRF = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  try {
    const csrfToken = req.headers['x-csrf-token'] as string
    const csrfSecret = req.cookies?.['la_cantina_csrf_secret']
    
    if (!csrfToken || !csrfSecret) {
      res.status(403).json({ error: 'CSRF token required' })
      return
    }
    
    // Validate CSRF token format and HMAC
    const [nonce, providedHmac] = csrfToken.split('.')
    if (!nonce || !providedHmac) {
      res.status(403).json({ error: 'Invalid CSRF token format' })
      return
    }
    
    const expectedHmac = createHash('sha256').update(csrfSecret + nonce).digest('hex')
    if (providedHmac !== expectedHmac) {
      res.status(403).json({ error: 'Invalid CSRF token' })
      return
    }
    
    next()
  } catch (error) {
    res.status(403).json({ error: 'CSRF validation failed' })
  }
}

// Admin authentication middleware - now uses session cookies instead of Bearer tokens
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  try {
    const sessionCookie = req.cookies?.['la_cantina_admin_session']
    
    if (!sessionCookie) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }
    
    // Verify JWT token
    const decoded = jwt.verify(sessionCookie, JWT_SECRET) as any
    if (decoded.role === 'admin' && decoded.authenticated === true) {
      next()
    } else {
      res.status(401).json({ error: 'Invalid session' })
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid session' })
  }
}

// Combined authentication and CSRF validation for state-changing operations
const requireAuthWithCSRF = [requireAuth, validateCSRF]

// POST /api/admin/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body

    // Hash the provided password and validate credentials
    const passwordHash = createHash('sha256').update(password).digest('hex')
    const isValidCredentials = (
      (identifier === ADMIN_EMAIL || identifier === ADMIN_USERNAME) && 
      passwordHash === ADMIN_PASSWORD_HASH
    )

    if (isValidCredentials) {
      // Generate session token
      const sessionToken = generateSessionToken()
      
      // Store session in memory
      activeSessions.set(sessionToken, {
        email: ADMIN_EMAIL,
        username: ADMIN_USERNAME,
        loginTime: Date.now()
      })
      
      // Generate CSRF token
      const { token: csrfToken, secret: csrfSecret } = generateCSRFToken()
      
      console.log(`🔐 Admin logged in: ${identifier}`)
      
      // Set secure session cookie
      res.cookie('la_cantina_admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
        signed: false // We use JWT signing instead
      })
      
      // Set CSRF secret cookie
      res.cookie('la_cantina_csrf_secret', csrfSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
      })
      
      // Redirect to admin dashboard with current locale from request
      // Extract locale from referer URL or default to 'de'
      const referer = req.headers.referer || ''
      const localeMatch = referer.match(/\/([a-z]{2})\/admin\/login/)
      const locale = localeMatch ? localeMatch[1] : 'de'
      const dashboardUrl = `/${locale}/admin/dashboard`
      
      res.json({ 
        success: true,
        message: 'Login successful',
        redirectTo: dashboardUrl,
        csrfToken: csrfToken,
        user: {
          email: ADMIN_EMAIL,
          username: ADMIN_USERNAME
        }
      })
    } else {
      console.log(`🚫 Failed login attempt: ${identifier}`)
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    console.error('Error during admin login:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// POST /api/admin/logout - Admin logout
router.post('/logout', async (req, res) => {
  try {
    const sessionCookie = req.cookies?.['la_cantina_admin_session']
    
    if (sessionCookie) {
      // Clear session cookies
      res.clearCookie('la_cantina_admin_session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      res.clearCookie('la_cantina_csrf_secret', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      console.log(`🔐 Admin logged out`)
    }
    
    res.json({ 
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Error during admin logout:', error)
    res.status(500).json({ error: 'Logout failed' })
  }
})

// GET /api/admin/session - Check admin session
router.get('/session', async (req, res) => {
  try {
    const sessionCookie = req.cookies?.['la_cantina_admin_session']
    
    if (!sessionCookie) {
      res.json({ 
        authenticated: false,
        user: null
      })
      return
    }
    
    // Verify JWT token
    const decoded = jwt.verify(sessionCookie, JWT_SECRET) as any
    if (decoded.role === 'admin' && decoded.authenticated === true) {
      res.json({ 
        authenticated: true,
        user: {
          email: ADMIN_EMAIL,
          username: ADMIN_USERNAME
        }
      })
    } else {
      res.json({ 
        authenticated: false,
        user: null
      })
    }
  } catch (error) {
    console.error('Error checking admin session:', error)
    res.json({ 
      authenticated: false,
      user: null
    })
  }
})

// POST /api/admin/refresh - Refresh session token
router.post('/refresh', async (req, res) => {
  try {
    const sessionCookie = req.cookies?.['la_cantina_admin_session']
    
    if (!sessionCookie) {
      return res.status(401).json({ error: 'No active session to refresh' })
    }
    
    // Verify current JWT token
    const decoded = jwt.verify(sessionCookie, JWT_SECRET) as any
    if (decoded.role === 'admin' && decoded.authenticated === true) {
      // Generate new session token
      const newSessionToken = generateSessionToken()
      
      // Update session in memory
      activeSessions.delete(sessionCookie) // Remove old session
      activeSessions.set(newSessionToken, {
        email: ADMIN_EMAIL,
        username: ADMIN_USERNAME,
        loginTime: Date.now()
      })
      
      // Generate new CSRF token
      const { token: csrfToken, secret: csrfSecret } = generateCSRFToken()
      
      console.log(`🔄 Admin session refreshed`)
      
      // Set new secure session cookie
      res.cookie('la_cantina_admin_session', newSessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
        signed: false
      })
      
      // Set new CSRF secret cookie
      res.cookie('la_cantina_csrf_secret', csrfSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000
      })
      
      res.json({ 
        success: true,
        message: 'Session refreshed successfully',
        csrfToken: csrfToken,
        user: {
          email: ADMIN_EMAIL,
          username: ADMIN_USERNAME
        }
      })
    } else {
      res.status(401).json({ error: 'Invalid session' })
    }
  } catch (error) {
    console.error('Error refreshing admin session:', error)
    res.status(401).json({ error: 'Invalid session' })
  }
})

// GET /api/admin/csrf - Get CSRF token
router.get('/csrf', async (req, res) => {
  try {
    const { token: csrfToken, secret: csrfSecret } = generateCSRFToken()
    
    // Set CSRF secret cookie
    res.cookie('la_cantina_csrf_secret', csrfSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
    })
    
    res.json({ csrfToken })
  } catch (error) {
    console.error('Error generating CSRF token:', error)
    res.status(500).json({ error: 'Failed to generate CSRF token' })
  }
})

// GET /api/admin/bookings - Get all event bookings (admin only)
router.get('/bookings', requireAuth, async (req, res) => {
  try {
    const { inMemoryStorage } = await import('../inMemoryStorage')
    const bookings = inMemoryStorage.getAllEventBookings()
    console.log(`📊 Admin fetched ${bookings.length} event bookings`)
    res.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
})

// PATCH /api/admin/bookings/:id/status - Update booking status (admin only)
router.patch('/bookings/:id/status', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body // 'confirmed', 'cancelled', 'pending'

    if (!['confirmed', 'cancelled', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be confirmed, cancelled, or pending' })
    }

    const { inMemoryStorage } = await import('../inMemoryStorage')
    const booking = inMemoryStorage.getEventBookingById(parseInt(id))
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    const previousStatus = booking.status
    
    // Update booking status
    const updatedBooking = inMemoryStorage.updateEventBooking(parseInt(id), { status })
    
    if (!updatedBooking) {
      return res.status(500).json({ error: 'Failed to update booking' })
    }

    // Handle capacity adjustments when status changes
    const event = inMemoryStorage.getEventById(booking.eventId)
    if (event) {
      let capacityChange = 0
      
      // Calculate capacity change based on status transition
      if (previousStatus === 'confirmed' && status === 'cancelled') {
        // Freeing up spots
        capacityChange = -booking.guests
      } else if ((previousStatus === 'cancelled' || previousStatus === 'pending') && status === 'confirmed') {
        // CRITICAL: Check capacity before confirming
        const availableSpots = event.max_attendees - event.current_attendees
        if (booking.guests > availableSpots) {
          return res.status(400).json({ 
            error: `Cannot confirm booking: Only ${availableSpots} spots available, but ${booking.guests} requested` 
          })
        }
        // Taking up spots
        capacityChange = booking.guests
      } else if (previousStatus === 'pending' && status === 'cancelled') {
        // Cancelling pending booking - no capacity change needed (wasn't counted)
        capacityChange = 0
      }
      
      if (capacityChange !== 0) {
        const newAttendeeCount = Math.max(0, event.current_attendees + capacityChange)
        inMemoryStorage.updateEvent(booking.eventId, { 
          current_attendees: newAttendeeCount 
        })
        console.log(`📊 Updated event ${booking.eventId} capacity: ${capacityChange > 0 ? '+' : ''}${capacityChange} guests (${event.current_attendees} → ${newAttendeeCount})`)
      }
    }

    console.log(`📝 Admin updated booking ${id}: ${previousStatus} → ${status}`)
    res.json({
      success: true,
      booking: updatedBooking,
      message: `Booking ${status} successfully`
    })
  } catch (error) {
    console.error('Error updating booking status:', error)
    res.status(500).json({ error: 'Failed to update booking status' })
  }
})

// DELETE /api/admin/bookings/:id - Cancel booking and adjust capacity (admin only)
router.delete('/bookings/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const { inMemoryStorage } = await import('../inMemoryStorage')
    
    const booking = inMemoryStorage.getEventBookingById(parseInt(id))
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    // Adjust event capacity if booking was confirmed
    if (booking.status === 'confirmed') {
      const event = inMemoryStorage.getEventById(booking.eventId)
      if (event) {
        const newAttendeeCount = Math.max(0, event.current_attendees - booking.guests)
        inMemoryStorage.updateEvent(booking.eventId, { 
          current_attendees: newAttendeeCount 
        })
        console.log(`📊 Freed ${booking.guests} spots from event ${booking.eventId} (${event.current_attendees} → ${newAttendeeCount})`)
      }
    }

    // Delete the booking
    const deleted = inMemoryStorage.deleteEventBooking(parseInt(id))
    if (!deleted) {
      return res.status(500).json({ error: 'Failed to delete booking' })
    }

    console.log(`🗑️ Admin deleted booking ${id} for ${booking.name}`)
    res.json({
      success: true,
      message: 'Booking deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting booking:', error)
    res.status(500).json({ error: 'Failed to delete booking' })
  }
})

// Clean up expired sessions (optional, runs every hour)
setInterval(() => {
  const now = Date.now()
  const oneDayMs = 24 * 60 * 60 * 1000 // 24 hours
  
  for (const [token, session] of activeSessions.entries()) {
    if (now - session.loginTime > oneDayMs) {
      activeSessions.delete(token)
    }
  }
}, 60 * 60 * 1000) // Run every hour

// Export the authentication middleware for use in other routes
export { requireAuth }

export default router