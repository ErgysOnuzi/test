'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-destructive mb-4'>500</h1>
        <h2 className='text-2xl font-semibold text-foreground mb-4'>
          Application Error
        </h2>
        <p className='text-muted-foreground mb-8'>
          A critical error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className='bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors'
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
