import { Request, Response, NextFunction } from 'express'

export interface ErrorResponse {
  error: {
    code: string
    message: string
    fields?: Record<string, string>
  }
}

export class AppError extends Error {
  statusCode: number
  code: string
  fields?: Record<string, string>

  constructor(statusCode: number, code: string, message: string, fields?: Record<string, string>) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.fields = fields
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      error: {
        code: err.code,
        message: err.message,
        ...(err.fields && { fields: err.fields })
      }
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${err.code}] ${err.message}`, err.stack)
    }
    
    res.status(err.statusCode).json(response)
    return
  }

  console.error('Unhandled error:', err)
  
  const response: ErrorResponse = {
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : err.message
    }
  }
  
  res.status(500).json(response)
}

export const badRequest = (message: string, fields?: Record<string, string>) => 
  new AppError(400, 'BAD_REQUEST', message, fields)

export const unauthorized = (message: string = 'Authentication required') => 
  new AppError(401, 'UNAUTHORIZED', message)

export const forbidden = (message: string = 'Access forbidden') => 
  new AppError(403, 'FORBIDDEN', message)

export const notFound = (message: string = 'Resource not found') => 
  new AppError(404, 'NOT_FOUND', message)

export const conflict = (message: string, fields?: Record<string, string>) => 
  new AppError(409, 'CONFLICT', message, fields)

export const tooManyRequests = (message: string = 'Too many requests') => 
  new AppError(429, 'TOO_MANY_REQUESTS', message)

export const internalError = (message: string = 'Internal server error') => 
  new AppError(500, 'INTERNAL_SERVER_ERROR', message)
