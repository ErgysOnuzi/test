import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GlobalLoader from '@/components/GlobalLoader'
import { Helmet } from 'react-helmet-async'

export default function Layout() {
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
      <GlobalLoader />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}