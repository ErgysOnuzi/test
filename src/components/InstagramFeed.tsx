'use client';
import React, { useMemo } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import InstagramEmbed from './InstagramEmbed';

interface InstagramFeedProps {
  showHeader?: boolean;
  selectedPosts?: string[]; // Pre-selected posts from server-side for hydration consistency
}

const IG_URLS = [
  "https://www.instagram.com/p/DAvXTRFidcu/",
  "https://www.instagram.com/p/C_vwvupNoNR/",
  "https://www.instagram.com/p/C8HwJgmt8aL/",
  "https://www.instagram.com/p/C6gz8uSiGlb/",
  "https://www.instagram.com/p/C6Mg0uGLdNH/",
  "https://www.instagram.com/p/C4lqzQMrscT/",
  "https://www.instagram.com/p/C4kriK-NmpI/",
  "https://www.instagram.com/p/C0e_9IcLnk-/",
  "https://www.instagram.com/p/Cztz53rN1km/",
  "https://www.instagram.com/p/CroTpxftUqg/",
  "https://www.instagram.com/p/C3xB9KuNmPR/",
  "https://www.instagram.com/p/C2pL7VuoTqX/",
];

// Seeded random function to ensure consistent results across renders
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

// Function to select 2 posts using date as seed for daily rotation
const selectDailyPosts = (posts: string[], count: number): string[] => {
  const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24)); // Days since epoch
  const shuffled = [...posts];
  
  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(today + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
};

function InstagramFeedContent({ showHeader = true, selectedPosts: propSelectedPosts }: InstagramFeedProps) {
  // Use pre-selected posts from server if available, otherwise fall back to client-side selection
  const selectedPosts = useMemo(() => {
    if (propSelectedPosts && propSelectedPosts.length > 0) {
      return propSelectedPosts;
    }
    return selectDailyPosts(IG_URLS, 2);
  }, [propSelectedPosts]);

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border">
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Instagram className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold text-foreground">Latest from Instagram</h2>
          </div>
          <a
            href="https://instagram.com/lacantina.berlin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {selectedPosts.map(url => (
          <InstagramEmbed key={url} url={url} />
        ))}
      </div>

      <div className="text-center mt-6 pt-6 border-t border-border/30">
        <a
          href="https://instagram.com/lacantina.berlin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
        >
          <Instagram className="w-4 h-4" />
          Follow us for more updates
        </a>
      </div>
    </div>
  );
}

// Export the main component (this fixes the hydration issue with deterministic daily rotation)
export default function InstagramFeed(props: InstagramFeedProps) {
  return <InstagramFeedContent {...props} />;
}