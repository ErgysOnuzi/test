import crypto from 'crypto'

// Cache configuration
const CACHE_DURATION = 6 * 60 * 60 * 1000 // 6 hours in milliseconds
const reviewsCache = new Map<string, { data: any; timestamp: number }>()

// Google Places API configuration
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place'

export interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  relative_time_description: string
  profile_photo_url?: string
}

export interface SanitizedReview {
  id: string
  author_name: string
  rating: number
  text: string
  time: number
  relative_time_description: string
  created_at: string
}

export class GoogleReviewsService {
  private static apiKey: string
  private static placeId: string

  static initialize() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY!
    this.placeId = process.env.GOOGLE_PLACE_ID!

    if (!this.apiKey || !this.placeId) {
      console.warn('⚠️ Google Reviews: Missing API key or Place ID')
      return false
    }

    console.log('✅ Google Reviews service initialized')
    return true
  }

  static async fetchPlaceDetails(): Promise<any> {
    if (!this.apiKey || !this.placeId) {
      throw new Error('Google Places API not configured')
    }

    const cacheKey = `place_details_${this.placeId}`
    const cached = reviewsCache.get(cacheKey)

    // Check cache first
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      console.log('📋 Using cached Google Place details')
      return cached.data
    }

    try {
      const url = new URL(`${GOOGLE_PLACES_BASE_URL}/details/json`)
      url.searchParams.set('place_id', this.placeId)
      url.searchParams.set('key', this.apiKey)
      url.searchParams.set('fields', 'name,rating,reviews,user_ratings_total,formatted_address,website,formatted_phone_number')
      url.searchParams.set('language', 'en') // Default to English, can be made configurable
      url.searchParams.set('reviews_sort', 'newest') // Get newest reviews first

      console.log('🌐 Fetching Google Place details...')
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'La-Cantina-Restaurant/1.0',
        },
        // Security: Set timeouts and size limits
        signal: AbortSignal.timeout(10000), // 10 second timeout
      })

      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (data.status !== 'OK') {
        throw new Error(`Google Places API status: ${data.status} - ${data.error_message || 'Unknown error'}`)
      }

      // Cache the successful response
      reviewsCache.set(cacheKey, {
        data,
        timestamp: Date.now()
      })

      console.log(`✅ Fetched Google Place details: ${data.result?.name || 'Unknown'} (${data.result?.reviews?.length || 0} reviews)`)
      return data

    } catch (error: any) {
      console.error('❌ Failed to fetch Google Place details:', error.message)
      
      // If we have cached data, return it even if stale
      if (cached) {
        console.log('📋 Falling back to stale cached data')
        return cached.data
      }
      
      throw error
    }
  }

  static sanitizeReview(review: GoogleReview): SanitizedReview {
    // Generate a consistent ID for each review based on content
    const reviewId = crypto
      .createHash('sha256')
      .update(`${review.author_name}-${review.time}-${review.text.substring(0, 50)}`)
      .digest('hex')
      .substring(0, 16)

    // Sanitize text content - remove potential XSS, keep basic formatting
    const sanitizedText = review.text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[<>]/g, '') // Remove angle brackets
      .trim()

    // Sanitize author name - remove special characters but keep international chars
    const sanitizedAuthorName = review.author_name
      .replace(/[<>]/g, '')
      .replace(/script/gi, '')
      .trim()
      .substring(0, 100) // Limit length

    return {
      id: reviewId,
      author_name: sanitizedAuthorName,
      rating: Math.max(1, Math.min(5, Math.floor(review.rating))), // Ensure rating is 1-5
      text: sanitizedText.substring(0, 1000), // Limit text length
      time: review.time,
      relative_time_description: review.relative_time_description || 'Recently',
      created_at: new Date(review.time * 1000).toISOString(),
    }
  }

  static async getReviews(): Promise<{
    reviews: SanitizedReview[]
    place_info: {
      name: string
      rating: number
      user_ratings_total: number
      formatted_address?: string
    }
    cached: boolean
    fetched_at: string
  }> {
    try {
      // Check if we're serving from cache
      const cacheKey = `place_details_${this.placeId}`
      const cached = reviewsCache.get(cacheKey)
      const isCachedData = cached && (Date.now() - cached.timestamp) < CACHE_DURATION

      const data = await this.fetchPlaceDetails()
      const result = data.result

      if (!result) {
        throw new Error('No place data received from Google Places API')
      }

      // Extract and sanitize reviews
      const rawReviews = result.reviews || []
      const sanitizedReviews = rawReviews
        .filter((review: GoogleReview) => {
          // Basic validation
          return review.author_name && 
                 review.text && 
                 review.rating >= 1 && 
                 review.rating <= 5 &&
                 review.text.length >= 10 && // Minimum meaningful review length
                 review.text.length <= 2000 // Maximum reasonable length
        })
        .map((review: GoogleReview) => this.sanitizeReview(review))
        .sort((a: SanitizedReview, b: SanitizedReview) => b.time - a.time) // Most recent first

      const placeInfo = {
        name: result.name || 'La Cantina Berlin',
        rating: Math.round((result.rating || 0) * 10) / 10, // Round to 1 decimal
        user_ratings_total: result.user_ratings_total || 0,
        formatted_address: result.formatted_address,
      }

      console.log(`📊 Processed ${sanitizedReviews.length} reviews for ${placeInfo.name} ${isCachedData ? '(cached)' : '(fresh)'}`)

      return {
        reviews: sanitizedReviews,
        place_info: placeInfo,
        cached: isCachedData,
        fetched_at: cached ? new Date(cached.timestamp).toISOString() : new Date().toISOString(),
      }

    } catch (error: any) {
      console.error('❌ Error getting reviews:', error.message)
      
      // Return empty but valid response structure
      return {
        reviews: [],
        place_info: {
          name: 'La Cantina Berlin',
          rating: 0,
          user_ratings_total: 0,
        },
        cached: false,
        fetched_at: new Date().toISOString(),
      }
    }
  }

  static clearCache() {
    reviewsCache.clear()
    console.log('🧹 Google Reviews cache cleared')
  }

  static getCacheStats() {
    return {
      cache_entries: reviewsCache.size,
      cache_keys: Array.from(reviewsCache.keys()),
    }
  }
}