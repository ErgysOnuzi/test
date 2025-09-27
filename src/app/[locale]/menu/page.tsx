'use client';

import React, { useState, useEffect } from 'react';
import MenuWithFilters from '@/components/MenuWithFilters';
import { generateSEOMetadata, MenuSchema } from '@/components/StructuredData';
import { useTranslations } from 'next-intl';

export default function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<string>('de');
  
  useEffect(() => {
    const getLocale = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale);
    };
    getLocale();
  }, [params]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <>
      <MenuSchema menuItems={menuItems} locale={locale} />
      <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/5'>
        <MenuWithFilters menuItems={menuItems} locale={locale} />
      </div>
    </>
  );
}
