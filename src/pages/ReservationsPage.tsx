import React from 'react'
import ReservationForm from '@/components/ReservationForm'

export default function ReservationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
          Make a Reservation
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Book your table at La Cantina Berlin
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <ReservationForm />
      </div>
    </div>
  )
}