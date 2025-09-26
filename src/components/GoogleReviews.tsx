'use client';
import React, { useState, useEffect } from 'react';
import { Star, User, Calendar, ExternalLink } from 'lucide-react';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GoogleReviewsProps {
  maxReviews?: number;
  showViewMore?: boolean;
}

export default function GoogleReviews({ maxReviews = 3, showViewMore = true }: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGoogleReviews();
  }, []);

  const fetchGoogleReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch real Google reviews from our API endpoint
      const response = await fetch('/api/google-reviews');
      
      if (!response.ok) {
        // If API fails, hide the reviews section instead of showing mock data
        console.log('Google reviews API unavailable');
        setReviews([]); // Empty array - component will handle gracefully
        setError('Google Bewertungen sind derzeit nicht verfügbar.');
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      
      // Update state with real Google data
      setReviews(data.reviews.slice(0, maxReviews));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'text-yellow-500 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-border/30 pb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Reviews Temporarily Unavailable</h3>
          <p className="text-muted-foreground">
            We&apos;re working to display our Google reviews. Meanwhile, you can view them directly on Google.
          </p>
          <a
            href="https://maps.google.com/maps?q=Ristorante+La+Cantina+Bleibtreu+Bleibtreustra%C3%9Fe+17+Berlin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-2xl hover:bg-primary/90 transition-colors"
          >
            View on Google Maps
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-serif font-bold text-foreground">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="text-xl font-bold text-foreground">4.7</span>
          </div>
          <span className="text-muted-foreground text-sm">(337 reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-border/30 pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                {review.profile_photo_url ? (
                  <img 
                    src={review.profile_photo_url} 
                    alt={review.author_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-primary" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{review.author_name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">
                        {review.relative_time_description}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {review.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showViewMore && (
        <div className="text-center mt-6 pt-6 border-t border-border/30">
          <a
            href="https://maps.google.com/maps?q=Ristorante+La+Cantina+Bleibtreu+Bleibtreustra%C3%9Fe+17+Berlin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View all reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}