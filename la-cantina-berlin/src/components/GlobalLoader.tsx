'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    
    // Hide loader after a short delay to show immediate feedback
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div className="h-full bg-primary animate-pulse"></div>
    </div>
  );
}