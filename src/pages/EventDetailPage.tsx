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
      </div>
    </div>
  )
}