'use client';

import { useState } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle, Image as ImageIcon } from 'lucide-react';
import NextImage from 'next/image';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  postUrl: string;
}

// Instagram posts data - currently using static data, can be extended with Instagram Graph API
const instagramPosts: InstagramPost[] = [
  {
    id: '1',
    imageUrl: '/uploads/gallery/WhatsApp_Image_2025-09-25_at_12.06.01_AM.jpeg',
    caption: 'Frische Pasta aus unserer Küche - jeden Tag mit Liebe zubereitet ❤️ #LaCantinaBerlin #FreshPasta #ItalianCuisine',
    likes: 247,
    comments: 18,
    timestamp: '2025-01-20T18:30:00Z',
    postUrl: 'https://instagram.com/lacantina_berlin'
  },
  {
    id: '2', 
    imageUrl: '/uploads/gallery/WhatsApp_Image_2025-09-25_at_12.06.01_AM_(1).jpeg',
    caption: 'Gemütliche Atmosphäre für den perfekten Abend mit Familie und Freunden 🍷 #LaCantinaBerlin #Atmosphere #ItalianDining',
    likes: 189,
    comments: 12,
    timestamp: '2025-01-18T19:45:00Z',
    postUrl: 'https://instagram.com/lacantina_berlin'
  },
  {
    id: '3',
    imageUrl: '/uploads/gallery/WhatsApp_Image_2025-09-25_at_12.06.01_AM_(2).jpeg', 
    caption: 'Authentische italienische Küche mitten in Berlin 🇮🇹 Besucht uns in der Bleibtreustraße! #Berlin #ItalianFood #Authentic',
    likes: 312,
    comments: 25,
    timestamp: '2025-01-16T12:15:00Z',
    postUrl: 'https://instagram.com/lacantina_berlin'
  },
  {
    id: '4',
    imageUrl: '/uploads/gallery/WhatsApp_Image_2025-09-25_at_12.06.01_AM_(3).jpeg',
    caption: 'Unser Chef kreiert täglich neue Köstlichkeiten mit den besten Zutaten 👨‍🍳 #ChefSpecial #LaCantinaBerlin #ItalianChef',
    likes: 156,
    comments: 9,
    timestamp: '2025-01-14T16:20:00Z',
    postUrl: 'https://instagram.com/lacantina_berlin'
  },
  {
    id: '5',
    imageUrl: '/uploads/gallery/WhatsApp_Image_2025-09-25_at_12.06.02_AM.jpeg',
    caption: 'Weekend Special: Homemade Tiramisu - der perfekte Abschluss eines wunderbaren Abends 🍮 #Tiramisu #Dessert #LaCantina',
    likes: 278,
    comments: 21,
    timestamp: '2025-01-12T20:30:00Z', 
    postUrl: 'https://instagram.com/lacantina_berlin'
  },
  {
    id: '6',
    imageUrl: '/uploads/gallery/WhatsApp_Image_2025-09-25_at_12.06.02_AM_(1).jpeg',
    caption: 'Frische Zutaten, traditionelle Rezepte - so schmeckt Italien in Berlin! 🍅🧄 #FreshIngredients #Traditional #LaCantinaBerlin',
    likes: 201,
    comments: 14,
    timestamp: '2025-01-10T14:45:00Z',
    postUrl: 'https://instagram.com/lacantina_berlin'
  }
];

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
                <NextImage
                  src={post.imageUrl}
                  alt={post.caption.slice(0, 100)}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
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