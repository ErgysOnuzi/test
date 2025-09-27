import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import MenuWithFilters from '@/components/MenuWithFilters'

interface MenuItem {
  id: number
  title: string
  titleDe?: string
  titleEn?: string
  description: string
  descriptionDe?: string
  descriptionEn?: string
  price: number
  category: string
  categoryDe?: string
  categoryEn?: string
  isAvailable: boolean
  allergens?: string
  imageUrl?: string | null
}

export default function MenuPage() {
  const { t, i18n } = useTranslation()

  const { data: menuItems = [], isLoading, error } = useQuery({
    queryKey: ['menu'],
    queryFn: async (): Promise<MenuItem[]> => {
      const response = await fetch('/api/menu')
      if (!response.ok) throw new Error('Failed to fetch menu')
      return response.json()
    },
  })

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{t('meta.menu.title')}</title>
          <meta name="description" content={t('meta.menu.description')} />
        </Helmet>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta-600"></div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>{t('meta.menu.title')}</title>
          <meta name="description" content={t('meta.menu.description')} />
        </Helmet>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">{t('menu.error')}</h1>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{t('meta.menu.title')}</title>
        <meta name="description" content={t('meta.menu.description')} />
      </Helmet>
      <MenuWithFilters menuItems={menuItems} locale={i18n.language} />
    </>
  )
}