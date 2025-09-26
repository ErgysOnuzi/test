/**
 * Safe Error Handling Utilities
 * Ensures no sensitive information is leaked to users while maintaining proper logging
 */

import { NextResponse } from 'next/server';

export interface SafeErrorResponse {
  error: string;
  code?: string;
  timestamp: string;
}

/**
 * Logs errors securely for monitoring without exposing details to users
 */
export function logError(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, any>
) {
  const timestamp = new Date().toISOString();

  if (error instanceof Error) {
    console.error(`[${timestamp}] ${context}:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
      ...additionalInfo,
    });
  } else {
    console.error(`[${timestamp}] ${context}:`, {
      error: String(error),
      type: typeof error,
      ...additionalInfo,
    });
  }
}

/**
 * Creates a safe API error response that doesn't leak internal information
 */
export function createSafeErrorResponse(
  userMessage: string,
  status: number = 500,
  code?: string
): NextResponse {
  const errorResponse: SafeErrorResponse = {
    error: userMessage,
    timestamp: new Date().toISOString(),
  };

  if (code) {
    errorResponse.code = code;
  }

  return NextResponse.json(errorResponse, { status });
}

/**
 * Common error messages that are safe to show users
 */
export const SafeErrorMessages = {
  INTERNAL_SERVER_ERROR:
    'An internal server error occurred. Please try again later.',
  INVALID_REQUEST: 'Invalid request format.',
  UNAUTHORIZED: 'Access denied. Please check your permissions.',
  NOT_FOUND: 'The requested resource was not found.',
  BAD_REQUEST: 'Invalid request parameters.',
  SERVICE_UNAVAILABLE:
    'Service temporarily unavailable. Please try again later.',
  RATE_LIMITED: 'Too many requests. Please try again later.',
  VALIDATION_ERROR: 'Validation failed. Please check your input.',
  DATABASE_ERROR: 'Database operation failed. Please try again later.',
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  FILE_UPLOAD_ERROR: 'File upload failed. Please try again.',
  AUTHENTICATION_FAILED: 'Authentication failed. Please log in again.',
} as const;

/**
 * Error codes for different types of errors
 */
export const ErrorCodes = {
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  AUTH_FAILED: 'AUTH_FAILED',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  SERVICE_ERROR: 'SERVICE_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  FILE_ERROR: 'FILE_ERROR',
} as const;

/**
 * Handles API route errors safely
 */
export function handleAPIError(
  context: string,
  error: unknown,
  fallbackMessage: string = SafeErrorMessages.INTERNAL_SERVER_ERROR,
  fallbackStatus: number = 500
): NextResponse {
  // Log the actual error for debugging
  logError(context, error);

  // Return safe response to user
  return createSafeErrorResponse(fallbackMessage, fallbackStatus);
}

/**
 * Categorizes errors and returns appropriate user messages
 */
export function categorizeError(error: unknown): {
  message: string;
  status: number;
  code: string;
} {
  if (error instanceof Error) {
    // Check common error patterns
    if (
      error.message.includes('ENOTFOUND') ||
      error.message.includes('ECONNREFUSED')
    ) {
      return {
        message: SafeErrorMessages.NETWORK_ERROR,
        status: 503,
        code: ErrorCodes.NETWORK_ERROR,
      };
    }

    if (
      error.message.includes('validation') ||
      error.message.includes('invalid')
    ) {
      return {
        message: SafeErrorMessages.VALIDATION_ERROR,
        status: 400,
        code: ErrorCodes.VALIDATION_FAILED,
      };
    }

    if (
      error.message.includes('unauthorized') ||
      error.message.includes('forbidden')
    ) {
      return {
        message: SafeErrorMessages.UNAUTHORIZED,
        status: 403,
        code: ErrorCodes.AUTH_FAILED,
      };
    }

    if (error.message.includes('not found')) {
      return {
        message: SafeErrorMessages.NOT_FOUND,
        status: 404,
        code: ErrorCodes.NOT_FOUND,
      };
    }
  }

  // Default to internal server error
  return {
    message: SafeErrorMessages.INTERNAL_SERVER_ERROR,
    status: 500,
    code: ErrorCodes.INTERNAL_ERROR,
  };
}
