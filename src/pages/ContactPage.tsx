import React from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('meta.contact.title')}</title>
        <meta name="description" content={t('meta.contact.description')} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {t('contact.title')}
            </h1>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('contact.address')}</h3>
                <p className="text-gray-600">
                  Bleibtreustraße 49<br />
                  10623 Berlin<br />
                  Deutschland
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('contact.phone')}</h3>
                <p className="text-gray-600">+49 30 881 6562</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('contact.email')}</h3>
                <p className="text-gray-600">info@lacantina-berlin.de</p>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}