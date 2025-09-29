import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'

interface Event {
  id: string
  title_de: string
  title_en: string
  description_de: string
  description_en: string
  event_date: string
  price: number
  max_attendees: number
  current_attendees: number
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Booking form state
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    specialRequests: ''
  })

  useEffect(() => {
    if (!id) return
    
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`)
        if (!response.ok) throw new Error('Failed to fetch event')
        const data = await response.json()
        setEvent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooking(true)
    setBookingError(null)

    try {
      const response = await fetch(`/api/events/${id}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingForm,
          eventId: id
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to book event')
      }

      setBookingSuccess(true)
      setShowBookingForm(false)
      
      // Refresh event data to show updated availability
      const eventResponse = await fetch(`/api/events/${id}`)
      if (eventResponse.ok) {
        const updatedEvent = await eventResponse.json()
        setEvent(updatedEvent)
      }
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : 'Booking failed')
    } finally {
      setIsBooking(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBookingForm(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value
    }))
  }

  const availableSpots = event ? event.max_attendees - event.current_attendees : 0
  const isEventFull = availableSpots <= 0

  if (isLoading) {
    return (
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px 16px 32px', 
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
        <p>Loading event...</p>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px 16px 32px', 
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          color: '#111827',
          margin: '0'
        }}>
          Event Not Found
        </h1>
        {error && <p style={{ color: 'red', marginTop: '16px' }}>Error: {error}</p>}
      </div>
    )
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px 16px 32px', 
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '768px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#111827', 
          marginBottom: '24px',
          margin: '0 0 24px 0'
        }}>
          {event.title_en}
        </h1>
        
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <p style={{ 
            fontSize: '18px', 
            color: '#374151', 
            marginBottom: '24px',
            margin: '0 0 24px 0',
            lineHeight: '1.6'
          }}>
            {event.description_en}
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '24px' 
          }}>
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                Event Details
              </h3>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px', 
                color: '#4B5563' 
              }}>
                <p style={{ margin: 0 }}>
                  <strong>Date:</strong> {format(new Date(event.event_date), 'PPP')}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Price:</strong> €{event.price}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Availability:</strong> {event.current_attendees}/{event.max_attendees} attendees
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: '#111827',
            margin: '0 0 16px 0'
          }}>
            Book Your Spot
          </h3>

          {bookingSuccess && (
            <div style={{
              backgroundColor: '#D1FAE5',
              border: '1px solid #A7F3D0',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <p style={{ 
                color: '#065F46', 
                margin: 0,
                fontWeight: '500'
              }}>
                📝 Booking submitted successfully! Your reservation is pending confirmation by our staff. You will receive a confirmation email once approved.
              </p>
            </div>
          )}

          {isEventFull ? (
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <p style={{ 
                color: '#B91C1C', 
                margin: 0,
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Sorry, this event is fully booked.
              </p>
            </div>
          ) : !showBookingForm ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                color: '#059669', 
                marginBottom: '16px',
                margin: '0 0 16px 0',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                {availableSpots} spots remaining
              </p>
              <button
                onClick={() => setShowBookingForm(true)}
                style={{
                  backgroundColor: '#C2410C',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9A3412'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#C2410C'}
              >
                Book Now - €{event.price}
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit}>
              {bookingError && (
                <div style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <p style={{ color: '#B91C1C', margin: 0 }}>
                    {bookingError}
                  </p>
                </div>
              )}

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    value={bookingForm.guests}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {Array.from({ length: Math.min(availableSpots, 8) }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={bookingForm.specialRequests}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any dietary restrictions, allergies, or special requests..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '16px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                justifyContent: 'flex-end',
                flexWrap: 'wrap'
              }}>
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  style={{
                    backgroundColor: '#F3F4F6',
                    color: '#374151',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isBooking}
                  style={{
                    backgroundColor: isBooking ? '#9CA3AF' : '#C2410C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isBooking ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isBooking ? 'Booking...' : `Confirm Booking - €${event.price * bookingForm.guests}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}