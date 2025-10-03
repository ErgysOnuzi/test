import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import compression from 'compression'
import { Request, Response, NextFunction } from 'express'

/**
 * Comprehensive security middleware configuration for production
 */

// Rate limiting configurations
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later',
    retryAfter: 15
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil(15 * 60) // seconds
    })
  }
})

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes  
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    error: 'Too many login attempts from this IP, please try again later',
    retryAfter: 15
  },
  skipSuccessfulRequests: true, // Don't count successful requests
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many login attempts',
      message: 'Account temporarily locked due to repeated failed login attempts. Please try again in 15 minutes.',
      retryAfter: Math.ceil(15 * 60)
    })
  }
})

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // More restrictive for API endpoints
  message: {
    error: 'API rate limit exceeded',
    retryAfter: 15
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'API rate limit exceeded',
      message: 'Too many API requests. Please slow down.',
      retryAfter: Math.ceil(15 * 60)
    })
  }
})

export const uploadRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 uploads per hour per IP
  message: {
    error: 'Upload rate limit exceeded',
    retryAfter: 60
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Upload rate limit exceeded',
      message: 'Too many file uploads. Please wait before uploading more files.',
      retryAfter: Math.ceil(60 * 60)
    })
  }
})

// Security headers configuration
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Required for React inline styles and Vite HMR
        "https://fonts.googleapis.com",
        "https://unpkg.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "data:"
      ],
      scriptSrc: [
        "'self'",
        // In production: only 'self' + specific trusted sources
        // In development: allow inline for HMR
        ...(process.env.NODE_ENV === 'development' 
          ? ["'unsafe-inline'", "'unsafe-eval'"] 
          : [])
      ],
      imgSrc: [
        "'self'",
        "data:",
        "blob:",
        "https:", // Allow external images (Unsplash, Google, etc.)
        "*.googleapis.com",
        "*.gstatic.com"
      ],
      connectSrc: [
        "'self'",
        "https://maps.googleapis.com",
        "https://places.googleapis.com",
        // Allow Vite HMR in development
        ...(process.env.NODE_ENV === 'development' 
          ? ["ws:", "wss:", "http://localhost:*", "ws://localhost:*"] 
          : [])
      ],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  frameguard: { action: 'deny' }, // Prevent clickjacking
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  crossOriginEmbedderPolicy: false, // Allow external images
  crossOriginResourcePolicy: { policy: 'cross-origin' } // Allow external resources
})

// Input sanitization middleware - Temporarily disabled mongo-sanitize due to Node.js compatibility
export const inputSanitization = [
  // MongoDB sanitization temporarily disabled due to readonly property conflicts with current Node.js version
  // mongoSanitize({ replaceWith: '_' }), // TODO: Re-enable when compatible version available
  
  // Protect against HTTP Parameter Pollution attacks
  hpp({
    whitelist: ['sort', 'fields', 'page', 'limit'] // Allow arrays for these fields
  })
]

// Compression middleware
export const compressionMiddleware = compression({
  level: 6, // Compression level (0-9)
  threshold: 1024, // Only compress files over 1KB
  filter: (req: any, res: any) => {
    if (req.headers['x-no-compression']) {
      return false
    }
    return compression.filter(req, res)
  }
})

// Security audit logging
export const securityLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now()
  
  // Log suspicious patterns
  const suspiciousPatterns = [
    /\.(php|asp|jsp)$/i,
    /\/wp-admin/i,
    /<script/i,
    /union.*select/i,
    /base64_decode/i
  ]
  
  const userAgent = req.get('User-Agent') || ''
  const isSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(req.url) || pattern.test(userAgent)
  )
  
  if (isSuspicious) {
    console.warn(`🚨 Suspicious request detected:`, {
      ip: req.ip,
      userAgent,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    })
  }
  
  // Log response time (cannot set headers after response is sent)
  res.on('finish', () => {
    const duration = Date.now() - startTime
    
    // Log slow requests
    if (duration > 5000) {
      console.warn(`⏱️  Slow request detected: ${req.method} ${req.url} took ${duration}ms`)
    }
  })
  
  next()
}

// CORS configuration 
export const corsConfig = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://la-cantina.replit.app', 'https://lacantina-berlin.de']
    : true, // Allow all origins in development
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With', 
    'Content-Type',
    'Accept',
    'Authorization',
    'X-CSRF-Token'
  ],
  exposedHeaders: ['X-Response-Time', 'X-RateLimit-Limit', 'X-RateLimit-Remaining']
}