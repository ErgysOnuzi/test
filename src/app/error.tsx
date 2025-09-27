'use client';

import React from 'react';
import { logError } from '@/lib/errorHandling';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error securely for monitoring (client-side logging)
  React.useEffect(() => {
    logError('Client Error Boundary', error, {
      digest: error.digest,
      url: window.location.href,
    });
  }, [error]);
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-destructive mb-4'>500</h1>
        <h2 className='text-2xl font-semibold text-foreground mb-4'>
          Something went wrong!
        </h2>
        <p className='text-muted-foreground mb-8'>
          An error occurred while loading this page.
        </p>
        <button
          onClick={() => reset()}
          className='bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors mr-4'
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
