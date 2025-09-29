import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from '../i18n/translations'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { de, enUS } from 'date-fns/locale'

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
  const { locale = 'de' } = useParams<{ locale: string }>()
  const { t } = useTranslation(locale as 'de' | 'en')
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

  const getEventIcon = (title: string) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes('wine') || lowerTitle.includes('vino')) {
      return (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    }
    if (lowerTitle.includes('pasta') || lowerTitle.includes('cooking') || lowerTitle.includes('chef')) {
      return (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      )
    }
    return (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {t('pages.events.title')}
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{t('pages.events.loading')}</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {t('pages.events.title')}
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center gap-2 text-red-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{t('pages.events.error')}: {error}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/90 to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              {t('pages.events.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('pages.events.heroSubtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{t('pages.events.limitedSeating')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>{t('pages.events.authenticExperiences')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {events.length > 0 ? (
          <>
            {/* Upcoming Events */}
            <div className="mb-16">
              <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-12">
                {t('pages.events.upcomingEvents')}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {events.map((event) => {
                  const eventDate = new Date(event.event_date)
                  const availableSpots = event.max_attendees - event.current_attendees
                  const isNearlyFull = availableSpots <= 3

                  return (
                    <div
                      key={event.id}
                      className="bg-card rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      <div className="p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="bg-primary/10 rounded-full p-3 group-hover:bg-primary/20 transition-colors duration-300">
                            {getEventIcon(event.title_en)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-serif font-bold text-card-foreground mb-2">
                              {locale === 'de' ? event.title_de : event.title_en}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{format(eventDate, 'PPP', { locale: locale === 'de' ? de : enUS })}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{format(eventDate, 'p', { locale: locale === 'de' ? de : enUS })}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {locale === 'de' ? event.description_de : event.description_en}
                        </p>
                        
                        <div className="space-y-6 mb-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">€{event.price}</div>
                                <div className="text-sm text-muted-foreground">{t('pages.events.perPerson')}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-semibold text-card-foreground">
                                  {availableSpots} {t('pages.events.spotsLeft')}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {t('pages.events.ofSpots')} {event.max_attendees} {t('pages.events.spots')}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {availableSpots === 0 ? (
                                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                                  {t('pages.events.soldOut')}
                                </div>
                              ) : isNearlyFull ? (
                                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                                  {t('pages.events.almostFull')}
                                </div>
                              ) : (
                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                  {t('pages.events.available')}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Capacity Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Capacity</span>
                              <span>{event.current_attendees}/{event.max_attendees}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  availableSpots === 0 
                                    ? 'bg-red-500' 
                                    : isNearlyFull 
                                    ? 'bg-amber-500' 
                                    : 'bg-green-500'
                                }`}
                                style={{ width: `${(event.current_attendees / event.max_attendees) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex -space-x-2">
                            {Array.from({ length: Math.min(event.current_attendees, 5) }).map((_, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
                              >
                                {String.fromCharCode(65 + i)}
                              </div>
                            ))}
                            {event.current_attendees > 5 && (
                              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-background flex items-center justify-center text-xs font-medium text-gray-600">
                                +{event.current_attendees - 5}
                              </div>
                            )}
                            {event.current_attendees === 0 && (
                              <div className="text-sm text-muted-foreground italic">{t('pages.events.beFirstToJoin')}</div>
                            )}
                          </div>
                          <Link
                            to={`/events/${event.id}`}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-center min-w-[140px] ${
                              availableSpots === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-primary text-primary-foreground hover:bg-primary/90'
                            }`}
                            onClick={(e) => availableSpots === 0 && e.preventDefault()}
                          >
                            {availableSpots === 0 ? t('pages.events.soldOut') : t('pages.events.reserveSpot')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Event Features */}
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-xl font-serif font-semibold text-center text-foreground mb-8">
                What to Expect at Our Events
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-card-foreground mb-2">Expert Guidance</h4>
                  <p className="text-sm text-muted-foreground">Learn from our experienced Italian chefs and wine experts</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-card-foreground mb-2">Small Groups</h4>
                  <p className="text-sm text-muted-foreground">Intimate experiences with personalized attention</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-card-foreground mb-2">Authentic Experience</h4>
                  <p className="text-sm text-muted-foreground">Traditional techniques and genuine Italian hospitality</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-card rounded-2xl border p-12 max-w-md mx-auto">
              <svg className="w-16 h-16 text-muted-foreground mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-serif font-medium text-card-foreground mb-4">No Events Scheduled</h3>
              <p className="text-muted-foreground mb-6">
                We're planning exciting new events! Check back soon for wine tastings, cooking classes, and special celebrations.
              </p>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Get Notified
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}