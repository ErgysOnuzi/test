import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) throw new Error('Failed to fetch events')
        const data = await response.json()
        setEvents(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvents()
  }, [])

  if (isLoading) {
    return (
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px 16px 32px', 
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          marginBottom: '20px'
        }}>
          Events
        </h1>
        <p>Loading events...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px 16px 32px', 
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          marginBottom: '20px'
        }}>
          Events
        </h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
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
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#111827', 
          marginBottom: '16px',
          margin: '0 0 16px 0'
        }}>
          Upcoming Events
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#4B5563',
          margin: 0
        }}>
          Join us for special events and celebrations
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'box-shadow 0.2s',
              display: 'block'
            }}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}
          >
            <div style={{ padding: '24px' }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                {event.title_en}
              </h3>
              <p style={{ 
                color: '#4B5563', 
                marginBottom: '16px',
                margin: '0 0 16px 0',
                lineHeight: '1.5'
              }}>
                {event.description_en}
              </p>
              <div style={{ 
                fontSize: '14px', 
                color: '#6B7280', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '4px' 
              }}>
                <p style={{ margin: 0 }}>{format(new Date(event.event_date), 'PPP')}</p>
                <p style={{ margin: 0 }}>€{event.price}</p>
                <p style={{ margin: 0 }}>{event.current_attendees}/{event.max_attendees} attendees</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {events.length === 0 && (
        <div style={{ textAlign: 'center', paddingTop: '48px' }}>
          <p style={{ color: '#6B7280', fontSize: '16px', margin: 0 }}>No events scheduled at the moment</p>
        </div>
      )}
    </div>
  )
}