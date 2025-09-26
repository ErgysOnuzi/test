'use client'
 
import React from 'react';
import Link from 'next/link';
import { logError } from '@/lib/errorHandling';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log error securely for monitoring (client-side logging)
  React.useEffect(() => {
    logError('Client Error Boundary', error, { 
      digest: error.digest,
      url: window.location.href 
    });
  }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-charcoal-800 mb-4">
          Something went wrong!
        </h2>
        <p className="text-charcoal-600 mb-8">
          An error occurred while loading this page.
        </p>
        <button
          onClick={() => reset()}
          className="bg-terracotta-600 text-white px-6 py-3 rounded-lg hover:bg-terracotta-700 transition-colors mr-4"
        >
          Try Again
        </button>
        <Link
          href="/de"
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}