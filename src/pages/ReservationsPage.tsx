import React from 'react'
import ReservationForm from '@/components/ReservationForm'

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/90 to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Reserve Your Table
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience authentic Italian cuisine in the heart of Berlin
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Open Daily 17:00-23:00</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Prenzlauer Berg, Berlin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Reservation Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-card rounded-2xl border shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-card-foreground mb-4">
                  Book Your Table
                </h2>
                <p className="text-muted-foreground">
                  Reserve your spot for an unforgettable Italian dining experience. We'll confirm your reservation within 30 minutes.
                </p>
              </div>
              <ReservationForm />
            </div>
          </div>

          {/* Restaurant Information */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="text-xl font-serif font-semibold text-card-foreground mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 10.71a11.045 11.045 0 005.28 5.28l1.323-3.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                </svg>
                Contact & Hours
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 10.71a11.045 11.045 0 005.28 5.28l1.323-3.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                  </svg>
                  <div>
                    <div className="font-medium text-card-foreground">Phone</div>
                    <div>+49 30 123 456 78</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-card-foreground">Address</div>
                    <div>Kastanienallee 123<br />10119 Berlin, Germany</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-card-foreground">Opening Hours</div>
                    <div className="space-y-1">
                      <div>Monday - Thursday: 17:00 - 22:30</div>
                      <div>Friday - Saturday: 17:00 - 23:00</div>
                      <div>Sunday: 17:00 - 22:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Features */}
            <div className="bg-card rounded-xl border p-6">
              <h3 className="text-xl font-serif font-semibold text-card-foreground mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                What Makes Us Special
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <div className="font-medium text-card-foreground">Fresh Ingredients</div>
                    <div className="text-sm">Daily imported Italian ingredients and fresh pasta made in-house</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <div className="font-medium text-card-foreground">Authentic Recipes</div>
                    <div className="text-sm">Traditional family recipes from different regions of Italy</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <div className="font-medium text-card-foreground">Wine Selection</div>
                    <div className="text-sm">Curated selection of over 100 Italian wines</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <div className="font-medium text-card-foreground">Cozy Atmosphere</div>
                    <div className="text-sm">Warm, intimate setting perfect for dates and family dinners</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation Policies */}
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                Reservation Policies
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Reservations confirmed within 30 minutes</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free cancellation up to 2 hours before</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Special dietary requirements accommodated</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tables held for 15 minutes past reservation time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}