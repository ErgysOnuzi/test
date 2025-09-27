'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-primary">
              La Cantina Bleibtreu
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('description')}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('contact')}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t('address_street')}</p>
              <p>{t('address_city')}</p>
              <p>{t('phone')}</p>
              <p>{t('email')}</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('opening_hours')}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <p className="font-medium">{t('monday_saturday')}</p>
                <p>{t('monday_saturday_hours')}</p>
              </div>
              <div>
                <p className="font-medium">{t('sunday')}</p>
                <p>{t('sunday_hours')}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/menu" className="block text-muted-foreground hover:text-primary transition-colors">
                Menu
              </Link>
              <Link href="/reservations" className="block text-muted-foreground hover:text-primary transition-colors">
                Reservations
              </Link>
              <Link href="/events" className="block text-muted-foreground hover:text-primary transition-colors">
                Events
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t('copyright')}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t('takeaway')}
          </p>
        </div>
      </div>
    </footer>
  );
}