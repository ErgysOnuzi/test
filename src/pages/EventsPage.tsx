import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
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
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'de' ? de : enUS

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('/api/events')
      if (!response.ok) throw new Error('Failed to fetch events')
      return response.json()
    },
  })

  return (
    <>
      <Helmet>
        <title>{t('meta.events.title')}</title>
        <meta name="description" content={t('meta.events.description')} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('events.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('events.subtitle')}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map((event: Event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {i18n.language === 'de' ? event.title_de : event.title_en}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {i18n.language === 'de' ? event.description_de : event.description_en}
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>{format(new Date(event.event_date), 'PPP', { locale })}</p>
                    <p>€{event.price}</p>
                    <p>{event.current_attendees}/{event.max_attendees} {t('events.attendees')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}