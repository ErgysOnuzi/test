import React from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function BlogPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('meta.blog.title')}</title>
        <meta name="description" content={t('meta.blog.description')} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('blog.subtitle')}
          </p>
        </div>
        
        <div className="text-center py-12">
          <p className="text-gray-500">{t('blog.comingSoon')}</p>
        </div>
      </div>
    </>
  )
}