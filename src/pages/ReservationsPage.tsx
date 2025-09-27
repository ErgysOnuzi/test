import React from 'react'
import ReservationForm from '@/components/ReservationForm'

export default function ReservationsPage() {
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
          Make a Reservation
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#4B5563',
          margin: 0
        }}>
          Book your table at La Cantina Berlin
        </p>
      </div>
      <div style={{ maxWidth: '672px', margin: '0 auto' }}>
        <ReservationForm />
      </div>
    </div>
  )
}