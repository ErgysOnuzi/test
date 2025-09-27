import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('meta.notFound.title')}</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {t('notFound.title')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('notFound.description')}
          </p>
          <Link
            to="/de"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-terracotta-600 hover:bg-terracotta-700"
          >
            {t('notFound.backHome')}
          </Link>
        </div>
      </div>
    </>
  )
}