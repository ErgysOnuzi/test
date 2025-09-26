import React from 'react';
import { getTranslations } from 'next-intl/server';
import {
  Clock,
  Phone,
  Mail,
  MapPin,
  Users,
  Calendar,
  Star,
} from 'lucide-react';
import ReservationForm from '@/components/ReservationForm';

export default async function ReservationsPage() {
  const t = await getTranslations('reservations');

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-primary/5'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-primary/90 to-primary text-primary-foreground'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative container mx-auto px-6 py-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-5xl md:text-6xl font-serif font-bold mb-6'>
              {t('table_reservations')}
            </h1>
            <p className='text-xl md:text-2xl opacity-90 mb-8 leading-relaxed'>
              {t('experience_authentic_cuisine')}
            </p>
            <div className='flex flex-wrap justify-center gap-6 text-sm'>
              <div className='flex items-center gap-2'>
                <Star className='w-5 h-5' />
                <span>{t('authentic_italian_cuisine')}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='w-5 h-5' />
                <span>{t('perfect_for_groups')}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Calendar className='w-5 h-5' />
                <span>{t('easy_online_booking')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 py-16'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Reservation Form */}
            <div className='space-y-8'>
              <div>
                <h2 className='text-3xl font-serif font-bold text-foreground mb-4'>
                  {t('book_your_table')}
                </h2>
                <p className='text-muted-foreground text-lg'>
                  {t('fill_out_form')}
                </p>
              </div>

              <div className='bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-border p-8'>
                <ReservationForm />
              </div>
            </div>

            {/* Restaurant Information */}
            <div className='space-y-8'>
              <div>
                <h2 className='text-3xl font-serif font-bold text-foreground mb-4'>
                  {t('restaurant_information')}
                </h2>
                <p className='text-muted-foreground text-lg'>
                  {t('visit_beautiful_location')}
                </p>
              </div>

              <div className='grid gap-6'>
                <div className='bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-start space-x-4'>
                    <MapPin className='w-6 h-6 text-primary mt-1 flex-shrink-0' />
                    <div>
                      <h3 className='font-semibold text-foreground mb-2'>
                        {t('address')}
                      </h3>
                      <p className='text-muted-foreground'>
                        Bleibtreustr. 17
                        <br />
                        10623 Berlin
                        <br />
                        Germany
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-start space-x-4'>
                    <Phone className='w-6 h-6 text-primary mt-1 flex-shrink-0' />
                    <div>
                      <h3 className='font-semibold text-foreground mb-2'>
                        {t('phone_reservations')}
                      </h3>
                      <p className='text-muted-foreground mb-2'>
                        <a
                          href='tel:+49308832156'
                          className='text-primary hover:text-primary/80 transition-colors text-lg font-medium'
                        >
                          030 8832156
                        </a>
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {t('available_business_hours')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-start space-x-4'>
                    <Mail className='w-6 h-6 text-primary mt-1 flex-shrink-0' />
                    <div>
                      <h3 className='font-semibold text-foreground mb-2'>
                        {t('email_heading')}
                      </h3>
                      <p className='text-muted-foreground mb-2'>
                        <a
                          href='mailto:reservierung@ristorante-la-cantina.de'
                          className='text-primary hover:text-primary/80 transition-colors'
                        >
                          reservierung@ristorante-la-cantina.de
                        </a>
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {t('typically_respond')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300'>
                  <div className='flex items-start space-x-4'>
                    <Clock className='w-6 h-6 text-primary mt-1 flex-shrink-0' />
                    <div>
                      <h3 className='font-semibold text-foreground mb-2'>
                        {t('opening_hours')}
                      </h3>
                      <div className='text-muted-foreground space-y-1'>
                        <div className='flex justify-between'>
                          <span>{t('monday_saturday')}</span>
                          <span className='font-medium'>
                            {t('monday_saturday_hours')}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>{t('sunday')}</span>
                          <span className='font-medium'>
                            {t('sunday_hours')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className='mt-20'>
            <h2 className='text-3xl font-serif font-bold text-center text-foreground mb-12'>
              {t('why_choose_lacantina')}
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center p-8 bg-card/30 backdrop-blur-sm rounded-3xl border border-border hover:shadow-xl transition-all duration-300 hover:scale-105'>
                <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <Star className='w-8 h-8 text-primary' />
                </div>
                <h3 className='text-xl font-serif font-bold text-foreground mb-4'>
                  {t('authentic_experience')}
                </h3>
                <p className='text-muted-foreground'>
                  {t('authentic_experience_desc')}
                </p>
              </div>

              <div className='text-center p-8 bg-card/30 backdrop-blur-sm rounded-3xl border border-border hover:shadow-xl transition-all duration-300 hover:scale-105'>
                <div className='w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <Users className='w-8 h-8 text-secondary' />
                </div>
                <h3 className='text-xl font-serif font-bold text-foreground mb-4'>
                  {t('perfect_atmosphere')}
                </h3>
                <p className='text-muted-foreground'>
                  {t('perfect_atmosphere_desc')}
                </p>
              </div>

              <div className='text-center p-8 bg-card/30 backdrop-blur-sm rounded-3xl border border-border hover:shadow-xl transition-all duration-300 hover:scale-105'>
                <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <MapPin className='w-8 h-8 text-primary' />
                </div>
                <h3 className='text-xl font-serif font-bold text-foreground mb-4'>
                  {t('prime_location')}
                </h3>
                <p className='text-muted-foreground'>
                  {t('located_heart_berlin')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
