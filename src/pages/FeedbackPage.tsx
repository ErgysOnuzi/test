import React, { useState } from 'react'

// Sample customer reviews and testimonials
const sampleReviews = [
  {
    id: 1,
    name: 'Maria Schmidt',
    rating: 5,
    date: '2025-09-20',
    source: 'Google',
    review: 'Absolutely fantastic! The pasta was handmade and the tiramisu was the best I\'ve ever had. Chef Antonio is a master of his craft. Will definitely be back!'
  },
  {
    id: 2,
    name: 'Thomas Weber',
    rating: 5,
    date: '2025-09-18',
    source: 'Website',
    review: 'Amazing Italian experience in the heart of Berlin. The wine selection is outstanding and the atmosphere feels like you\'re dining in Italy. Highly recommended!'
  },
  {
    id: 3,
    name: 'Elena Rossi',
    rating: 5,
    date: '2025-09-15',
    source: 'Google',
    review: 'La Cantina Berlin exceeded all expectations. Fresh ingredients, authentic flavors, and exceptional service. The risotto alle vongole was perfection!'
  },
  {
    id: 4,
    name: 'Hans Mueller',
    rating: 4,
    date: '2025-09-12',
    source: 'Website',
    review: 'Great food and lovely ambiance. The osso buco was tender and flavorful. Only minor wait for our table but totally worth it. A true Italian gem!'
  },
  {
    id: 5,
    name: 'Sophie Dubois',
    rating: 5,
    date: '2025-09-10',
    source: 'Google',
    review: 'Incredible dining experience! Every dish was a work of art. The staff was knowledgeable about wine pairings. This is now our favorite restaurant in Berlin.'
  },
  {
    id: 6,
    name: 'Andrea Bianchi',
    rating: 5,
    date: '2025-09-08',
    source: 'Website',
    review: 'Finally, authentic Italian cuisine in Berlin! As an Italian living here, I can confirm this is the real deal. Grazie mille for bringing Italy to our city!'
  }
]

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    experience: '',
    suggestions: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showAllReviews, setShowAllReviews] = useState(false)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setMessage('Thank you for your feedback! We appreciate your input.')
        setFormData({
          name: '',
          email: '',
          rating: 5,
          experience: '',
          suggestions: ''
        })
      } else {
        setMessage('Sorry, there was an error submitting your feedback. Please try again.')
      }
    } catch (error) {
      setMessage('Sorry, there was an error submitting your feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayedReviews = showAllReviews ? sampleReviews : sampleReviews.slice(0, 3)
  const avgRating = sampleReviews.reduce((sum, review) => sum + review.rating, 0) / sampleReviews.length

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/90 to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Customer Reviews & Feedback
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your opinion matters to us. Share your La Cantina Berlin experience.
          </p>
          <div className="flex items-center justify-center gap-4 text-lg">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {renderStars(Math.round(avgRating))}
              </div>
              <span className="font-semibold">{avgRating.toFixed(1)} stars</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <span>{sampleReviews.length} reviews</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Customer Reviews Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-12">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-card rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      review.source === 'Google' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {review.source}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "{review.review}"
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-card-foreground">{review.name}</span>
                  <span className="text-muted-foreground">
                    {new Date(review.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {!showAllReviews && sampleReviews.length > 3 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllReviews(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Show All {sampleReviews.length} Reviews
              </button>
            </div>
          )}
        </div>

        {/* Feedback Form Section */}
        <div className="bg-card rounded-2xl border p-8 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-bold text-card-foreground mb-4">
              Share Your Experience
            </h3>
            <p className="text-muted-foreground">
              Help us continue delivering exceptional Italian dining experiences
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-card-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-card-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-card-foreground mb-2">
                Overall Rating *
              </label>
              <div className="relative">
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 appearance-none bg-background"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent (5 stars)</option>
                  <option value={4}>⭐⭐⭐⭐ Very Good (4 stars)</option>
                  <option value={3}>⭐⭐⭐ Good (3 stars)</option>
                  <option value={2}>⭐⭐ Fair (2 stars)</option>
                  <option value={1}>⭐ Needs Improvement (1 star)</option>
                </select>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-card-foreground mb-2">
                Tell us about your experience *
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-vertical"
                placeholder="How was your dining experience? Food quality, service, atmosphere, staff..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-card-foreground mb-2">
                Suggestions for improvement
                <span className="text-muted-foreground font-normal ml-1">(Optional)</span>
              </label>
              <textarea
                name="suggestions"
                value={formData.suggestions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-vertical"
                placeholder="Any suggestions to help us improve your next visit?"
              />
            </div>

            <div className="flex items-center justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </div>

            {message && (
              <div className={`p-4 rounded-lg border flex items-center gap-3 ${
                message.includes('Thank you')
                  ? 'bg-green-50 text-green-800 border-green-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {message.includes('Thank you') ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                <span className="font-medium">{message}</span>
              </div>
            )}
          </form>
        </div>

        {/* Call to Action */}
        <div className="bg-muted/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
            Love La Cantina Berlin?
          </h3>
          <p className="text-muted-foreground mb-6">
            Help others discover our authentic Italian cuisine by leaving a review on Google or sharing your experience on social media.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Review on Google
            </button>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}