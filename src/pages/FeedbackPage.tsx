import React, { useState } from 'react'

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

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
        Customer Feedback
      </h1>
      
      <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', marginBottom: '40px' }}>
        We value your opinion! Please share your experience at La Cantina Berlin.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Overall Rating *
          </label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
            <option value={4}>⭐⭐⭐⭐ Very Good</option>
            <option value={3}>⭐⭐⭐ Good</option>
            <option value={2}>⭐⭐ Fair</option>
            <option value={1}>⭐ Poor</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Tell us about your experience *
          </label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
            placeholder="How was your dining experience? Food quality, service, atmosphere..."
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
            Suggestions for improvement
          </label>
          <textarea
            name="suggestions"
            value={formData.suggestions}
            onChange={handleInputChange}
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
            placeholder="Any suggestions to help us improve your next visit?"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? '#ccc' : '#007bff',
            color: 'white',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>

        {message && (
          <div style={{
            padding: '15px',
            backgroundColor: message.includes('Thank you') ? '#d4edda' : '#f8d7da',
            color: message.includes('Thank you') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('Thank you') ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: '4px',
            marginTop: '10px'
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  )
}