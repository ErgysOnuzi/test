import { body, param, query, validationResult, ValidationChain } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

/**
 * Comprehensive input validation middleware using express-validator
 */

// Generic validation result handler
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    console.warn(`❌ Validation errors for ${req.method} ${req.url}:`, errors.array())
    
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array().map(error => ({
        field: error.type === 'field' ? error.path : 'unknown',
        message: error.msg,
        value: error.type === 'field' ? error.value : undefined
      }))
    })
    return
  }
  
  next()
}

// Common validation rules
export const commonValidations = {
  email: body('email')
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Please provide a valid email address'),
    
  name: body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .matches(/^[a-zA-ZÀ-ÿ\u0100-\u017F\s'-]+$/)
    .withMessage('Name must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes'),
    
  phone: body('phone')
    .optional()
    .matches(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{8,}$/)
    .withMessage('Please provide a valid phone number'),
    
  message: body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
    
  date: body('date')
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Date cannot be in the past')
      }
      return true
    })
    .withMessage('Please provide a valid future date'),
    
  time: body('time')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time must be in HH:MM format'),
    
  guests: body('guests')
    .isInt({ min: 1, max: 20 })
    .withMessage('Number of guests must be between 1 and 20'),
    
  id: param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer')
}

// Contact form validation
export const validateContactForm: ValidationChain[] = [
  commonValidations.name,
  commonValidations.email,
  commonValidations.phone,
  commonValidations.message,
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
]

// Reservation validation  
export const validateReservation: ValidationChain[] = [
  commonValidations.name,
  commonValidations.email,
  commonValidations.phone,
  commonValidations.date,
  commonValidations.time,
  commonValidations.guests,
  
  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests must not exceed 500 characters'),
]

// Event booking validation
export const validateEventBooking: ValidationChain[] = [
  commonValidations.id, // for event ID
  commonValidations.name,
  commonValidations.email,
  commonValidations.phone,
  
  body('guests')
    .isInt({ min: 1, max: 50 })
    .withMessage('Number of guests must be between 1 and 50'),
    
  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests must not exceed 500 characters'),
]

// Admin login validation
export const validateAdminLogin: ValidationChain[] = [
  body('identifier')
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 100 })
    .withMessage('Username or email is required'),
    
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters'),
]

// Feedback validation
export const validateFeedback: ValidationChain[] = [
  commonValidations.name,
  commonValidations.email,
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
    
  body('experience')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Experience description must be between 10 and 1000 characters'),
    
  body('visitDate')
    .optional()
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (!value) return true
      const visitDate = new Date(value)
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      
      if (visitDate > new Date()) {
        throw new Error('Visit date cannot be in the future')
      }
      if (visitDate < oneYearAgo) {
        throw new Error('Visit date cannot be more than one year ago')
      }
      return true
    })
    .withMessage('Please provide a valid visit date within the past year'),
    
  body('wouldRecommend')
    .optional()
    .isBoolean()
    .withMessage('Please indicate whether you would recommend us'),
    
  body('suggestions')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Suggestions must not exceed 500 characters'),
]

// File upload validation
export const validateImageUpload = [
  // File validation is handled by multer middleware and ImageValidator service
  // But we can add additional checks here
  body('alt')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Alt text must not exceed 200 characters'),
    
  body('caption')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Caption must not exceed 300 characters'),
]

// Query parameter validation for pagination and filtering
export const validateQueryParams = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
    
  query('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Category must contain only alphanumeric characters, hyphens, and underscores'),
]

// Sanitization helpers
export const sanitizeHtml = (field: string) => 
  body(field)
    .customSanitizer((value: string) => {
      // Basic HTML sanitization - remove script tags and event handlers
      if (typeof value !== 'string') return value
      
      return value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+="[^"]*"/gi, '')
        .replace(/javascript:/gi, '')
        .trim()
    })