'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import AdminGate from '../AdminGate';
import dynamic from 'next/dynamic';

// Lazy load MenuCRUD for better performance
const MenuCRUD = dynamic(() => import('./MenuCRUD'), {
  loading: () => (
    <div className='flex items-center justify-center py-8'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
    </div>
  ),
  ssr: false,
});
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Removed force-dynamic to allow static optimization

export default function AdminMenuPage() {
  const t = useTranslations('admin');
  return (
    <AdminGate>
      <div className='min-h-screen bg-background'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h1 className='text-4xl font-serif font-bold text-primary mb-2'>
                {t('menu_management')}
              </h1>
              <p className='text-muted-foreground text-lg'>
                {t('menu_management_desc')}
              </p>
            </div>
            <Link
              href='../'
              className='inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors'
              data-testid='link-back-to-dashboard'
            >
              <ArrowLeft className='w-4 h-4' />
              {t('back_to_dashboard')}
            </Link>
          </div>

          <MenuCRUD />
        </div>
      </div>
    </AdminGate>
  );
}
