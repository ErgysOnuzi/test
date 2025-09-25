'use client';

import NextTopLoader from 'nextjs-toploader';

export default function GlobalLoader() {
  return (
    <NextTopLoader
      color="hsl(15, 75%, 45%)"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
    />
  );
}