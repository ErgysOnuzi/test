'use client'
 
import React from 'react';
import { logError } from '@/lib/errorHandling';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log critical error securely for monitoring (client-side logging)
  React.useEffect(() => {
    logError('Global Error Boundary', error, { 
      digest: error.digest,
      url: window.location.href,
      userAgent: navigator.userAgent 
    });
  }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Application Error
        </h2>
        <p className="text-gray-600 mb-8">
          A critical error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}