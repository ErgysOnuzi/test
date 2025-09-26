'use client';

import { useState, useMemo } from 'react';
import { Instagram, ExternalLink, Image as ImageIcon } from 'lucide-react';
import InstagramEmbed from './InstagramEmbed';
import { selectDailyInstagramPosts } from '@/lib/instagram';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  postUrl: string;
}

// Real Instagram URLs - integrated with existing Instagram system
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

interface InstagramGalleryProps {
  locale: string;
}

export default function InstagramGallery({ locale }: InstagramGalleryProps) {
  // Generate daily rotating Instagram posts with real data
  const selectedPostUrls = useMemo(() => {
    return selectDailyInstagramPosts(6); // Select 6 posts for gallery display
  }, []);

  const t = {
    de: {
      title: 'Folgen Sie uns auf Instagram',
      subtitle: 'Entdecken Sie die neuesten Kreationen aus unserer Küche',
      followUs: 'Folgen Sie @lacantina_berlin',
      viewPost: 'Beitrag ansehen',
      likes: 'Gefällt mir',
      comments: 'Kommentare',
      viewAll: 'Alle Beiträge ansehen'
    },
    en: {
      title: 'Follow Us on Instagram',
      subtitle: 'Discover the latest creations from our kitchen',
      followUs: 'Follow @lacantina_berlin',
      viewPost: 'View Post',
      likes: 'Likes',
      comments: 'Comments',
      viewAll: 'View All Posts'
    }
  };

  const translations = t[locale as 'de' | 'en'] || t.de;

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return locale === 'de' ? 'Heute' : 'Today';
    if (diffInDays === 1) return locale === 'de' ? 'Gestern' : 'Yesterday';
    if (diffInDays < 7) return locale === 'de' ? `vor ${diffInDays} Tagen` : `${diffInDays} days ago`;
    
    return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Show empty state with call-to-action when no real posts available
  if (selectedPostUrls.length === 0) {
    return (
      <section className="py-16 px-6 bg-gradient-to-br from-background via-secondary/5 to-muted/10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="w-8 h-8 text-pink-500" />
              <h2 className="text-4xl font-serif font-bold text-foreground">
                {translations.title}
              </h2>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              {translations.subtitle}
            </p>
            
            {/* Empty State Message */}
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-border">
              <ImageIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                {locale === 'de' ? 'Neue Posts kommen bald!' : 'New posts coming soon!'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {locale === 'de' 
                  ? 'Folgen Sie uns auf Instagram für die neuesten Updates aus unserer Küche und Restaurant.'
                  : 'Follow us on Instagram for the latest updates from our kitchen and restaurant.'}
              </p>
            </div>
            
            <a
              href="https://instagram.com/lacantina_berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              {translations.followUs}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-background via-secondary/5 to-muted/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-pink-500" />
            <h2 className="text-4xl font-serif font-bold text-foreground">
              {translations.title}
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            {translations.subtitle}
          </p>
          <a
            href="https://instagram.com/lacantina_berlin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
          >
            <Instagram className="w-5 h-5" />
            {translations.followUs}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedPostUrls.map((url, index) => {
            const postId = url.split('/p/')[1]?.split('/')[0] || `post-${index}`;
            return (
              <div
                key={postId}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/30 hover:shadow-2xl transition-all duration-500"
              >
                {/* Real Instagram Embed */}
                <div className="aspect-square relative overflow-hidden">
                  <InstagramEmbed url={url} aspect={1} />
                </div>
                
                {/* View on Instagram Link */}
                <div className="p-4 text-center">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    {locale === 'de' ? 'Auf Instagram ansehen' : 'View on Instagram'}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com/lacantina_berlin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-card hover:bg-muted px-6 py-3 rounded-full border border-border/30 transition-colors"
          >
            {translations.viewAll}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Schema markup for social media */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Ristorante La Cantina Bleibtreu",
            "sameAs": [
              "https://instagram.com/lacantina_berlin",
              "https://facebook.com/lacantina.berlin",
              "https://lacantina-berlin.de"
            ]
          }, null, 2)
        }}
      />
    </section>
  );
}