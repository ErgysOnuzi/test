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
        // Log the issue but return graceful fallback instead of throwing
        const { logError } = await import('@/lib/errorHandling');
        logError('Google API Configuration', new Error('Google API key not configured'), {
          hasApiKey: false,
          hasPlaceId: !!process.env.GOOGLE_PLACE_ID
        });
        
        return {
          name: 'Ristorante La Cantina Bleibtreu',
          rating: 0,
          reviewCount: 0,
          reviews: []
        };
      }

      // For better performance, use a known place_id if available
      // Otherwise, search for the restaurant
      let placeId = process.env.GOOGLE_PLACE_ID; // Add this to your environment if known
      
      if (!placeId) {
        // Search for the restaurant
        const restaurantName = 'Ristorante La Cantina Bleibtreu';
        const address = 'Bleibtreustraße 17, Berlin';
        const searchQuery = `${restaurantName} ${address}`;
        
        const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&language=de&region=DE&key=${apiKey}`;
        
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
        
        if (searchData.status === 'OK' && searchData.results && searchData.results.length > 0) {
          const exactMatch = searchData.results.find(result => 
            result.name?.toLowerCase().includes('cantina') && 
            result.formatted_address?.toLowerCase().includes('bleibtreustraße')
          );
          
          placeId = exactMatch ? exactMatch.place_id : searchData.results[0].place_id;
        } else {
          // Log the issue but return graceful fallback instead of throwing
          const { logError } = await import('@/lib/errorHandling');
          logError('Google Places Text Search', new Error('Restaurant not found in search results'), {
            status: searchData.status,
            resultsCount: searchData.results?.length || 0,
            query: searchQuery
          });
          
          return {
            name: 'Ristorante La Cantina Bleibtreu',
            rating: 0,
            reviewCount: 0,
            reviews: []
          };
        }
      }

      if (!placeId) {
        // Log the issue but return graceful fallback instead of throwing
        const { logError } = await import('@/lib/errorHandling');
        logError('Google Places PlaceId', new Error('Missing placeId after search'), {
          query: searchQuery,
          hasSearchResults: !!searchData.results?.length
        });
        
        return {
          name: 'Ristorante La Cantina Bleibtreu',
          rating: 0,
          reviewCount: 0,
          reviews: []
        };
      }

      // Get the place details with reviews
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
      
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      if (!detailsResponse.ok || detailsData.status !== 'OK') {
        // Log the issue but return graceful fallback instead of throwing
        const { logError } = await import('@/lib/errorHandling');
        logError('Google Places API Details', new Error(`API Status: ${detailsData.status || detailsResponse.statusText}`), {
          status: detailsData.status,
          errorMessage: detailsData.error_message
        });
        
        // Return fallback data to prevent 503 errors
        return {
          name: 'Ristorante La Cantina Bleibtreu',
          rating: 0,
          reviewCount: 0,
          reviews: []
        };
      }

      const { result } = detailsData;
      
      // Check if Google Places API returned valid data
      if (!result || !result.name) {
        // Log the issue but return graceful fallback
        const { logError } = await import('@/lib/errorHandling');
        logError('Google Places API Result', new Error('Invalid result structure'), {
          hasResult: !!result,
          resultKeys: result ? Object.keys(result) : []
        });
        
        return {
          name: 'Ristorante La Cantina Bleibtreu',
          rating: 0,
          reviewCount: 0,
          reviews: []
        };
      }
      
      return {
        name: result.name,
        rating: result.rating || 0,
        reviewCount: result.user_ratings_total || 0,
        reviews: result.reviews || []
      };

    } catch (error) {
      // Log error securely and return fallback instead of rethrowing
      const { logError } = await import('@/lib/errorHandling');
      logError('Google Reviews Cache', error, { 
        hasApiKey: !!process.env.GOOGLE_API_KEY,
        hasPlaceId: !!process.env.GOOGLE_PLACE_ID
      });
      
      // Return fallback data instead of throwing to prevent 503 errors
      return {
        name: 'Ristorante La Cantina Bleibtreu',
        rating: 0,
        reviewCount: 0,
        reviews: []
      };
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