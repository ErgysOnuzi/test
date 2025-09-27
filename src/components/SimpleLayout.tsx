import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function SimpleLayout() {
  const { locale } = useParams<{ locale: string }>()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (locale && locale !== i18n.language) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return (
    <>
      <Helmet>
        <html lang={locale || 'de'} />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-900 text-white p-4">
          <h1 className="text-xl font-bold">La Cantina Berlin - Vite Migration</h1>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>Migration Test - Express + Vite + React</p>
        </footer>
      </div>
    </>
  )
}