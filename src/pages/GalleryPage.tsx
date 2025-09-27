import React from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import ClientGallery from '@/components/ClientGallery'

export default function GalleryPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('meta.gallery.title')}</title>
        <meta name="description" content={t('meta.gallery.description')} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('gallery.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('gallery.subtitle')}
          </p>
        </div>
        <ClientGallery />
      </div>
    </>
  )
}