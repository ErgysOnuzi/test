import express from 'express'
import db, { schema } from '../../src/lib/db'

const router = express.Router()

// Admin credentials - in production, these should be environment variables
const ADMIN_EMAIL = 'ergysonuzi12@gmail.com'
const ADMIN_USERNAME = 'ergysonuzi'
const ADMIN_PASSWORD = 'Xharie123'

// Admin authentication middleware
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session && req.session.adminAuthenticated) {
    next()
  } else {
    res.status(401).json({ error: 'Authentication required' })
  }
}

// POST /api/admin/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body

    // Validate credentials - identifier can be email or username
    const isValidCredentials = (
      (identifier === ADMIN_EMAIL || identifier === ADMIN_USERNAME) && 
      password === ADMIN_PASSWORD
    )

    if (isValidCredentials) {
      // Set session
      if (req.session) {
        req.session.adminAuthenticated = true
        req.session.adminUser = {
          email: ADMIN_EMAIL,
          username: ADMIN_USERNAME
        }
      }
      
      res.json({ 
        success: true,
        message: 'Login successful',
        user: {
          email: ADMIN_EMAIL,
          username: ADMIN_USERNAME
        }
      })
    } else {
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
    // Clear session
    if (req.session) {
      req.session.adminAuthenticated = false
      req.session.adminUser = null
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
    const isAuthenticated = req.session && req.session.adminAuthenticated === true
    
    res.json({ 
      authenticated: isAuthenticated,
      user: isAuthenticated ? req.session.adminUser : null
    })
  } catch (error) {
    console.error('Error checking admin session:', error)
    res.status(500).json({ error: 'Session check failed' })
  }
})

export default router