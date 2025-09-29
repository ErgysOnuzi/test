import express from 'express'
import crypto from 'crypto'
import { GoogleReviewsService } from '../services/googleReviews'
import { requireAuth } from './admin'

const router = express.Router()

// Initialize Google Reviews service on startup
GoogleReviewsService.initialize()

// GET /api/google-reviews - Fetch real Google reviews with caching and security
router.get('/', async (req, res) => {
  const traceId = crypto.randomUUID()
  
  try {
    // Set appropriate cache headers for reviews
    res.set({
      'Cache-Control': 'public, max-age=21600, stale-while-revalidate=3600', // 6 hours cache, 1 hour stale
      'X-Content-Type-Options': 'nosniff',
      'X-Trace-ID': traceId,
    })

    const reviewsData = await GoogleReviewsService.getReviews()

    // Add metadata for monitoring and debugging
    const response = {
      success: true,
      ...reviewsData,
      metadata: {
        total_reviews: reviewsData.reviews.length,
        average_rating: reviewsData.reviews.length > 0 
          ? Math.round((reviewsData.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsData.reviews.length) * 10) / 10
          : 0,
        latest_review: reviewsData.reviews.length > 0 ? reviewsData.reviews[0].created_at : null,
        trace_id: traceId,
      }
    }

    console.log(`✅ Google Reviews API: ${reviewsData.reviews.length} reviews served (trace: ${traceId})`)
    
    res.json(response)

  } catch (error: any) {
    console.error(`❌ Google Reviews API error (trace: ${traceId}):`, error.message)
    
    // Return structured error response without exposing internal details
    res.status(500).json({
      success: false,
      error: 'Unable to fetch reviews at this time',
      reviews: [],
      place_info: {
        name: 'La Cantina Berlin',
        rating: 0,
        user_ratings_total: 0,
      },
      cached: false,
      fetched_at: new Date().toISOString(),
      metadata: {
        total_reviews: 0,
        average_rating: 0,
        latest_review: null,
        trace_id: traceId,
      }
    })
  }
})

// GET /api/reviews/cache - Cache management endpoint (admin only)
router.get('/cache', requireAuth, async (req, res) => {
  try {
    const stats = GoogleReviewsService.getCacheStats()
    res.json({
      success: true,
      cache_stats: stats,
    })
  } catch (error: any) {
    console.error('Cache stats error:', error.message)
    res.status(500).json({
      success: false,
      error: 'Failed to get cache stats'
    })
  }
})

// DELETE /api/reviews/cache - Clear cache endpoint (admin only)
router.delete('/cache', requireAuth, async (req, res) => {
  try {
    GoogleReviewsService.clearCache()
    res.json({
      success: true,
      message: 'Reviews cache cleared successfully'
    })
  } catch (error: any) {
    console.error('Clear cache error:', error.message)
    res.status(500).json({
      success: false,
      error: 'Failed to clear cache'
    })
  }
})

export default router