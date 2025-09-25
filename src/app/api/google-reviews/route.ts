import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { handleAPIError } from '@/lib/errorHandling';

// Google Places API types
interface GooglePlaceDetails {
  result: {
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews: Array<{
      author_name: string;
      author_url?: string;
      profile_photo_url?: string;
      rating: number;
      relative_time_description: string;
      text: string;
      time: number;
    }>;
  };
}

// Server-side cached function to fetch Google Reviews
const getCachedGoogleReviews = unstable_cache(
  async () => {
    try {
      const apiKey = process.env.GOOGLE_API_KEY;
      
      if (!apiKey) {
        throw new Error('Google API key not configured');
      }

      // For better performance, use a known place_id if available
      // Otherwise, search for the restaurant
      let placeId = process.env.GOOGLE_PLACE_ID; // Add this to your environment if known
      
      if (!placeId) {
        // Search for the restaurant
        const restaurantName = 'Ristorante La Cantina Bleibtreu';
        const address = 'Bleibtreustraße 17, Berlin';
        const searchQuery = `${restaurantName} ${address}`;
        
        const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${apiKey}`;
        
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
        
        if (searchData.results && searchData.results.length > 0) {
          const exactMatch = searchData.results.find(result => 
            result.name.toLowerCase().includes('cantina') && 
            result.formatted_address.toLowerCase().includes('bleibtreustraße')
          );
          
          placeId = exactMatch ? exactMatch.place_id : searchData.results[0].place_id;
        } else {
          throw new Error('Restaurant not found in Google Places');
        }
      }

      if (!placeId) {
        throw new Error('Restaurant not found in Google Places');
      }

      // Get the place details with reviews
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
      
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      if (!detailsResponse.ok) {
        throw new Error(`Google API error: ${detailsResponse.statusText}`);
      }

      const { result } = detailsData;
      
      return {
        name: result.name,
        rating: result.rating,
        reviewCount: result.user_ratings_total,
        reviews: result.reviews || []
      };

    } catch (error) {
      // Log error securely without exposing details  
      const { logError } = await import('@/lib/errorHandling');
      logError('Google Reviews Cache', error, { 
        hasApiKey: !!process.env.GOOGLE_API_KEY,
        hasPlaceId: !!process.env.GOOGLE_PLACE_ID
      });
      throw error;
    }
  },
  ['google-reviews'], // cache key
  { revalidate: 1800 } // Cache for 30 minutes
);

export async function GET(request: NextRequest) {
  // Add caching headers for additional client-side caching
  const headers = {
    'Cache-Control': 'public, max-age=300, s-maxage=1800, stale-while-revalidate=3600',
  };
  
  try {
    // Use server-side cached data
    const reviewData = await getCachedGoogleReviews();
    
    return NextResponse.json(reviewData, { headers });

  } catch (error) {
    return handleAPIError(
      'Google Reviews API',
      error,
      'Unable to load reviews at this time. Please try again later.',
      503
    );
  }
}