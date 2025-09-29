import express from 'express'

const router = express.Router()

// GET /api/google-reviews - Fetch real Google reviews
router.get('/', async (req, res) => {
  try {
    const placeId = 'ChIJu3mKd0lOqEcRb5l8dZ2N-9o' // La Cantina Berlin place ID
    const apiKey = process.env.GOOGLE_PLACES_API_KEY

    if (!apiKey) {
      console.warn('⚠️ Google Places API key not configured')
      return res.status(503).json({ error: 'Google Reviews service not configured' })
    }

    // Fetch place details with reviews
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}&reviews_sort=newest`
    )

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Google API status: ${data.status}`)
    }

    // Transform Google reviews to our format
    const reviews = data.result.reviews?.map((review: any, index: number) => ({
      id: `google_${index}`,
      name: review.author_name,
      rating: review.rating,
      date: new Date(review.time * 1000).toISOString().split('T')[0], // Convert timestamp to date
      source: 'Google',
      review: review.text,
      profilePhoto: review.profile_photo_url,
      relativeTime: review.relative_time_description
    })) || []

    console.log(`📧 Fetched ${reviews.length} Google reviews`)
    
    res.json({
      reviews,
      businessInfo: {
        name: data.result.name,
        rating: data.result.rating,
        totalReviews: data.result.user_ratings_total
      }
    })
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    res.status(500).json({ error: 'Failed to fetch Google reviews' })
  }
})

export default router