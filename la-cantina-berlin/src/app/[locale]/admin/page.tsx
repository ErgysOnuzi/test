'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChefHat, Calendar, Image, Utensils, Users, TrendingUp, ArrowRight, MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load admin gate for better performance
const AdminGate = dynamic(() => import('./AdminGate'), {
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>,
  ssr: false
});
export default function AdminPage() {
  const t = useTranslations('admin');
  const params = useParams();
  const locale = params.locale as string;

  const managementCards = [
    {
      title: t('menu_management'),
      description: t('menu_desc'),
      icon: ChefHat,
      href: `/${locale}/admin/menu`,
      color: 'bg-primary',
    },
    {
      title: t('reservation_management'),
      description: t('reservation_desc'),
      icon: Calendar,
      href: `/${locale}/admin/reservations`,
      color: 'bg-accent',
    },
    {
      title: t('gallery_management'),
      description: t('gallery_desc'),
      icon: Image,
      href: `/${locale}/admin/gallery`,
      color: 'bg-secondary',
    },
    {
      title: t('event_management'),
      description: t('event_desc'),
      icon: Users,
      href: `/${locale}/admin/events`,
      color: 'bg-primary',
    },
    {
      title: t('feedback_management'),
      description: t('feedback_desc'),
      icon: MessageCircle,
      href: `/${locale}/admin/feedback`,
      color: 'bg-secondary',
    },
  ];

  return (
    <AdminGate>
      <div className="min-h-screen bg-background">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
              {t('restaurant_name')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('title')}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-xl border border-border p-6 hover-elevate">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">123</p>
                  <p className="text-sm text-muted-foreground">{t('menu_items')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6 hover-elevate">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">-</p>
                  <p className="text-sm text-muted-foreground">{t('open_reservations')}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6 hover-elevate">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">-</p>
                  <p className="text-sm text-muted-foreground">{t('upcoming_events')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Management Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {managementCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Link key={index} href={card.href} className="group">
                  <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-all duration-200 hover-elevate">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 ${card.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {card.title}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
              {t('quick_actions')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href={`/${locale}/admin/menu`} className="bg-card rounded-lg border border-border p-4 hover-elevate transition-all">
                <div className="text-center">
                  <ChefHat className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{t('new_dish')}</p>
                </div>
              </Link>
              <Link href={`/${locale}/admin/reservations`} className="bg-card rounded-lg border border-border p-4 hover-elevate transition-all">
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{t('add_reservation')}</p>
                </div>
              </Link>
              <Link href={`/${locale}/admin/gallery`} className="bg-card rounded-lg border border-border p-4 hover-elevate transition-all">
                <div className="text-center">
                  <Image className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{t('add_photo')}</p>
                </div>
              </Link>
              <Link href={`/${locale}/admin/events`} className="bg-card rounded-lg border border-border p-4 hover-elevate transition-all">
                <div className="text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{t('create_event')}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminGate>
  );
}