'use client';

import NextTopLoader from 'nextjs-toploader';

export default function GlobalLoader() {
  return (
    <NextTopLoader
      color="#c2410c"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px #c2410c,0 0 5px #c2410c"
    />
  );
}