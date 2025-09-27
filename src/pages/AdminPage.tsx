import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function AdminPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('meta.admin.title')}</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('admin.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('admin.subtitle')}
            </p>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-500">{t('admin.comingSoon')}</p>
          </div>
        </div>
      </div>
    </>
  )
}