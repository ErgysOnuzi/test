'use client';
import React, { useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

interface InstagramFeedProps {
  showHeader?: boolean;
}

export default function InstagramFeed({ showHeader = true }: InstagramFeedProps) {
  useEffect(() => {
    // Load Instagram embed script if not already loaded
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = '//www.instagram.com/embed.js';
      document.body.appendChild(script);
      
      // Process embeds after script loads
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
    } else {
      // If script already exists, just process embeds
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }
  }, []);

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

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <blockquote 
          className="instagram-media" 
          data-instgrm-permalink="https://www.instagram.com/p/DO02v5qjEUd/" 
          data-instgrm-version="14"
          style={{ 
            background: '#FFF', 
            border: 0, 
            borderRadius: '3px', 
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
            margin: '1px', 
            maxWidth: '540px', 
            minWidth: '326px', 
            padding: 0, 
            width: '100%' 
          }}
        >
        </blockquote>
        
        <blockquote 
          className="instagram-media" 
          data-instgrm-permalink="https://www.instagram.com/p/DL77XYINvtn/" 
          data-instgrm-version="14"
          style={{ 
            background: '#FFF', 
            border: 0, 
            borderRadius: '3px', 
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
            margin: '1px', 
            maxWidth: '540px', 
            minWidth: '326px', 
            padding: 0, 
            width: '100%' 
          }}
        >
        </blockquote>
        
        <blockquote 
          className="instagram-media" 
          data-instgrm-permalink="https://www.instagram.com/p/DJCTJMsi720/" 
          data-instgrm-version="14"
          style={{ 
            background: '#FFF', 
            border: 0, 
            borderRadius: '3px', 
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
            margin: '1px', 
            maxWidth: '540px', 
            minWidth: '326px', 
            padding: 0, 
            width: '100%' 
          }}
        >
        </blockquote>
      </section>

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

// Extend the Window interface to include Instagram embed
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}