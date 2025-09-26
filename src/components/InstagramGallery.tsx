'use client';

import { useMemo } from 'react';
import { Instagram, ExternalLink, Image as ImageIcon } from 'lucide-react';
import InstagramEmbed from './InstagramEmbed';
import { selectDailyInstagramPosts } from '@/lib/instagram';

// Component uses daily rotating Instagram posts from shared lib/instagram.ts

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