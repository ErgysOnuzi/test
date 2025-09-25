'use client';

import { useState } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle, Image as ImageIcon } from 'lucide-react';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  postUrl: string;
}

// TODO: Replace with real Instagram posts from @lacantina.berlin via Instagram Graph API
const instagramPosts: InstagramPost[] = [];

interface InstagramGalleryProps {
  locale: string;
}

export default function InstagramGallery({ locale }: InstagramGalleryProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

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

  // Don't show Instagram gallery if no real posts available
  if (instagramPosts.length === 0) {
    return null;
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
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/30 hover:shadow-2xl transition-all duration-500"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Image Container */}
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-primary/40" />
                </div>
                
                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredPost === post.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex items-center gap-6 text-white">
                    <div className="flex items-center gap-2">
                      <Heart className="w-6 h-6 fill-white" />
                      <span className="font-semibold">{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-6 h-6 fill-white" />
                      <span className="font-semibold">{formatNumber(post.comments)}</span>
                    </div>
                  </div>
                </div>

                {/* View Post Button */}
                <div className={`absolute top-4 right-4 transition-opacity duration-300 ${
                  hoveredPost === post.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/90 text-foreground p-2 rounded-full hover:bg-white transition-colors"
                    title={translations.viewPost}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Post Info */}
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {post.caption}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{formatNumber(post.comments)}</span>
                    </div>
                  </div>
                  <span>{formatDate(post.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
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