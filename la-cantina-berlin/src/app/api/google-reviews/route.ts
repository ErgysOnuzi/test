import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      );
    }

    // Search specifically for your restaurant
    const restaurantName = 'Ristorante La Cantina Bleibtreu';
    const address = 'Bleibtreustraße 17, Berlin';
    const searchQuery = `${restaurantName} ${address}`;
    
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${apiKey}`;
    
    let placeId = null;
    
    try {
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      
      if (searchData.results && searchData.results.length > 0) {
        // Look for the best match - your exact restaurant
        const exactMatch = searchData.results.find(result => 
          result.name.toLowerCase().includes('cantina') && 
          result.formatted_address.toLowerCase().includes('bleibtreustraße')
        );
        
        placeId = exactMatch ? exactMatch.place_id : searchData.results[0].place_id;
      }
    } catch (searchError) {
      console.error('Error searching for restaurant:', searchError);
      return NextResponse.json(
        { error: 'Could not find restaurant in Google Places' },
        { status: 404 }
      );
    }

    if (!placeId) {
      return NextResponse.json(
        { error: 'Restaurant not found in Google Places' },
        { status: 404 }
      );
    }

    // Now get the place details with reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
    
    const detailsResponse = await fetch(detailsUrl);
    const detailsData: GooglePlaceDetails = await detailsResponse.json();

    if (!detailsResponse.ok) {
      throw new Error(`Google API error: ${detailsResponse.statusText}`);
    }

    const { result } = detailsData;
    
    return NextResponse.json({
      name: result.name,
      rating: result.rating,
      reviewCount: result.user_ratings_total,
      reviews: result.reviews || []
    });

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch reviews',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}