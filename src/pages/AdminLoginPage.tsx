import React from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function AdminLoginPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('meta.adminLogin.title')}</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('admin.login.title')}
            </h1>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-500">{t('admin.login.comingSoon')}</p>
          </div>
        </div>
      </div>
    </>
  )
}