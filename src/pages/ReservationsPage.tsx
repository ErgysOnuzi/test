import React from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import ReservationForm from '@/components/ReservationForm'

export default function ReservationsPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('meta.reservations.title')}</title>
        <meta name="description" content={t('meta.reservations.description')} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('reservations.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('reservations.subtitle')}
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <ReservationForm />
        </div>
      </div>
    </>
  )
}