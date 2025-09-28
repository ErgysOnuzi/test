import express from 'express'
import { createHash, randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Environment-based JWT secret - required for production
const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-change-in-production'

// Admin credentials - in production, these should be environment variables
const ADMIN_EMAIL = 'ergysonuzi12@gmail.com'
const ADMIN_USERNAME = 'ergysonuzi'
// Hash the password for better security
const ADMIN_PASSWORD_HASH = createHash('sha256').update('Xharie123').digest('hex')

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
router.post('/logout', async (req, res): Promise<void> => {
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
router.get('/session', async (req, res): Promise<void> => {
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

// GET /api/admin/csrf - Get CSRF token
router.get('/csrf', async (req, res): Promise<void> => {
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

export default router