import React from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import Hero from '@/components/Hero'
import InstagramFeed from '@/components/InstagramFeed'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('meta.home.title')}</title>
        <meta name="description" content={t('meta.home.description')} />
      </Helmet>
      <Hero />
      <InstagramFeed />
    </>
  )
}