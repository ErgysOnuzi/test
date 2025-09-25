'use client';

import { useState } from 'react';
import { Star, Quote, User, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  dish?: string;
  verified: boolean;
}

// This component returns null when no testimonials are available
// Customer testimonials - real Google My Business reviews are integrated via GoogleReviews component
const testimonials: Record<string, Testimonial[]> = {
  de: [],
  en: []
};

interface CustomerTestimonialsProps {
  locale: string;
}

export default function CustomerTestimonials({ locale }: CustomerTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = testimonials[locale as 'de' | 'en'] || testimonials.de;

  const t = {
    de: {
      title: 'Was unsere Gäste sagen',
      subtitle: 'Authentische Bewertungen von echten Gästen',
      verified: 'Verifizierter Gast',
      dish: 'Lieblingsgericht',
      previous: 'Vorherige',
      next: 'Nächste',
      averageRating: 'Durchschnittsbewertung',
      totalReviews: 'Bewertungen',
      excellent: 'Hervorragend',
      writeReview: 'Bewertung schreiben'
    },
    en: {
      title: 'What Our Guests Say',
      subtitle: 'Authentic reviews from real guests',
      verified: 'Verified Guest',
      dish: 'Favorite Dish',
      previous: 'Previous',
      next: 'Next',
      averageRating: 'Average Rating',
      totalReviews: 'Reviews',
      excellent: 'Excellent',
      writeReview: 'Write Review'
    }
  };

  const translations = t[locale as 'de' | 'en'] || t.de;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Schema markup for reviews - Display only, no rich results
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Ristorante La Cantina Bleibtreu",
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5
      },
      "reviewBody": review.comment,
      "datePublished": review.date
    }))
  };

  // Don't show testimonials section if no real reviews available
  if (reviews.length === 0) {
    return null;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema, null, 2)
        }}
      />
      
      <section className="py-16 px-6 bg-gradient-to-br from-muted/30 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              {translations.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {translations.subtitle}
            </p>
            
            {/* Rating Summary */}
            <div className="flex items-center justify-center gap-8 bg-card rounded-2xl p-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-sm text-muted-foreground">
                  {reviews.length} {translations.totalReviews}
                </div>
              </div>
            </div>
          </div>

          {/* Main Testimonial Carousel */}
          <div className="relative">
            <div className="bg-card rounded-3xl shadow-xl border border-border/30 p-8 md:p-12 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-6 left-6 text-primary/20">
                <Quote className="w-16 h-16" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  {renderStars(reviews[currentIndex].rating)}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed text-center mb-8 font-medium">
                  "{reviews[currentIndex].comment}"
                </blockquote>
                
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <User className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-foreground text-lg">
                        {reviews[currentIndex].name}
                      </h4>
                      {reviews[currentIndex].verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          ✓ {translations.verified}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{reviews[currentIndex].location}</span>
                    </div>
                  </div>
                </div>
                
                {reviews[currentIndex].dish && (
                  <div className="text-center mb-4">
                    <span className="text-sm text-muted-foreground">
                      {translations.dish}: 
                    </span>
                    <span className="text-sm font-medium text-primary ml-2">
                      {reviews[currentIndex].dish}
                    </span>
                  </div>
                )}
                
                <div className="text-center text-sm text-muted-foreground">
                  {formatDate(reviews[currentIndex].date)}
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="flex items-center gap-2 bg-card hover:bg-muted px-4 py-2 rounded-full border border-border/30 transition-colors"
                aria-label={translations.previous}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{translations.previous}</span>
              </button>
              
              <div className="flex gap-2 items-center">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="flex items-center gap-2 bg-card hover:bg-muted px-4 py-2 rounded-full border border-border/30 transition-colors"
                aria-label={translations.next}
              >
                <span className="hidden sm:inline">{translations.next}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* All Reviews Grid */}
          <div className="mt-16">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-8 text-center">
              {translations.totalReviews}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map((review) => (
                <div
                  key={review.id}
                  className="bg-card rounded-2xl p-6 border border-border/30 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ✓
                      </span>
                    )}
                  </div>
                  
                  <p className="text-foreground mb-4 leading-relaxed line-clamp-4">
                    "{review.comment}"
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium text-foreground">{review.name}</div>
                      <div className="text-muted-foreground">{review.location}</div>
                    </div>
                    <div className="text-muted-foreground">
                      {formatDate(review.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}