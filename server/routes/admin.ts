import express from 'express'
import { createHash } from 'crypto'

const router = express.Router()

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

// Generate simple session token
const generateSessionToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Admin authentication middleware
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const authHeader = req.headers.authorization
  const token = authHeader?.replace('Bearer ', '')
  
  if (!token || !activeSessions.has(token)) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }
  
  next()
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
      
      console.log(`🔐 Admin logged in: ${identifier}`)
      
      res.json({ 
        success: true,
        message: 'Login successful',
        token: sessionToken,
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
    const authHeader = req.headers.authorization
    const token = authHeader?.replace('Bearer ', '')
    
    if (token && activeSessions.has(token)) {
      activeSessions.delete(token)
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
    const authHeader = req.headers.authorization
    const token = authHeader?.replace('Bearer ', '')
    
    if (token && activeSessions.has(token)) {
      const session = activeSessions.get(token)
      res.json({ 
        authenticated: true,
        user: {
          email: session?.email,
          username: session?.username
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
    res.status(500).json({ error: 'Session check failed' })
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