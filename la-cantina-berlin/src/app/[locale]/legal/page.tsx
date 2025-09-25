import React from 'react';
import { useTranslations } from 'next-intl';

export default function LegalPage() {
  const t = useTranslations('legal');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-center mb-12 text-rosso">
          {t('title')}
        </h1>
        
        {/* Impressum */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t('impressum_heading')}</h2>
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h3 className="font-semibold mb-3">{t('tmg_heading')}</h3>
            <p className="mb-4">
              {t('company_name')}<br />
              {t('company_address')}<br />
              {t('company_city')}<br />
              {t('company_country')}
            </p>
            
            <h3 className="font-semibold mb-3">{t('represented_by')}</h3>
            <p className="mb-4">
              {t('managing_director')}
            </p>
            
            <h3 className="font-semibold mb-3">{t('contact_heading')}</h3>
            <p className="mb-4">
              {t('phone')}<br />
              {t('email')}
            </p>
            
            <h3 className="font-semibold mb-3">{t('register_heading')}</h3>
            <p className="mb-4">
              {t('registration_entry')}<br />
              {t('registration_court')}<br />
              {t('registration_number')}
            </p>
            
            <h3 className="font-semibold mb-3">{t('vat_heading')}</h3>
            <p>
              {t('vat_info')}<br />
              {t('vat_number')}
            </p>
          </div>
        </section>
        
        {/* Datenschutz */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t('privacy_heading')}</h2>
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h3 className="font-semibold mb-3">{t('privacy_overview_heading')}</h3>
            <p className="mb-4">
              {t('privacy_overview_text')}
            </p>
            
            <h3 className="font-semibold mb-3">{t('responsible_party_heading')}</h3>
            <p className="mb-4">
              {t('responsible_for_data')}<br />
              {t('company_name')}<br />
              {t('company_address')}<br />
              {t('company_city')}<br />
              {t('company_country')}<br />
              {t('privacy_email')}
            </p>
            
            <h3 className="font-semibold mb-3">{t('data_collection_heading')}</h3>
            <p className="mb-4">
              {t('data_collection_text')}
            </p>
            
            <h3 className="font-semibold mb-3">{t('forms_data_heading')}</h3>
            <p className="mb-4">
              {t('forms_data_text')}
            </p>
            
            <h3 className="font-semibold mb-3">{t('your_rights_heading')}</h3>
            <p>
              {t('your_rights_text')}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}