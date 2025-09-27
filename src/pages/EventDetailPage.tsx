import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
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

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'de' ? de : enUS

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const response = await fetch(`/api/events/${id}`)
      if (!response.ok) throw new Error('Failed to fetch event')
      return response.json()
    },
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta-600"></div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{t('events.notFound')}</h1>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{i18n.language === 'de' ? event.title_de : event.title_en} - {t('meta.events.title')}</title>
        <meta name="description" content={i18n.language === 'de' ? event.description_de : event.description_en} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {i18n.language === 'de' ? event.title_de : event.title_en}
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-lg text-gray-700 mb-6">
              {i18n.language === 'de' ? event.description_de : event.description_en}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('events.details')}</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>{t('events.date')}:</strong> {format(new Date(event.event_date), 'PPP', { locale })}</p>
                  <p><strong>{t('events.price')}:</strong> €{event.price}</p>
                  <p><strong>{t('events.availability')}:</strong> {event.current_attendees}/{event.max_attendees} {t('events.attendees')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}