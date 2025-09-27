'use client';
import { useMemo } from 'react';

type Props = { url: string; aspect?: number };

export default function InstagramEmbed({ url, aspect = 1.25 }: Props) {
  const shortcode = useMemo(() => {
    try {
      const u = new URL(url);
      const parts = u.pathname.split('/').filter(Boolean);
      return parts[1]; // '/p/{shortcode}/'
    } catch {
      return '';
    }
  }, [url]);

  if (!shortcode) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: `${aspect * 100}%`,
      }}
    >
      <iframe
        src={`https://www.instagram.com/p/${shortcode}/embed`}
        title={`ig-${shortcode}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 0,
          overflow: 'hidden',
        }}
        loading='lazy'
      />
    </div>
  );
}
