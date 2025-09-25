import React from 'react';
import MenuWithFilters from '@/components/MenuWithFilters';
import { generateSEOMetadata, MenuSchema } from '@/components/StructuredData';

// Enable static generation with ISR - revalidate every 5 minutes
export const revalidate = 300;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  return generateSEOMetadata('menu', locale);
}

async function getMenuItems() {
  try {
    // Get base URL for server-side fetching
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL || 'http://localhost:5000';
    
    const response = await fetch(`${baseUrl}/api/menu`, {
      next: { 
        tags: ['menu'],
        revalidate: 300 // Cache for 5 minutes
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching menu items:', error);
    // Return empty array if API fails - no mock data
    console.error('Menu API failed, returning empty array. Check database connection.');
    return [];
  }
}

export default async function MenuPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const menuItems = await getMenuItems();
  
  return (
    <>
      <MenuSchema menuItems={menuItems} locale={locale} />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        <MenuWithFilters menuItems={menuItems} locale={locale} />
      </div>
    </>
  );
}