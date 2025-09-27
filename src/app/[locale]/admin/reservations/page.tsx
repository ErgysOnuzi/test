'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';
import AdminGate from '../AdminGate';

export const dynamic = 'force-dynamic';

interface Reservation {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export default function AdminReservationsPage() {
  const t = useTranslations('admin');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reservations from API
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/api/admin/reservations');
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          setError(t('failed_load_reservations'));
        }
      } catch (error) {
        setError(t('failed_load_reservations'));
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [t]);

  const handleStatusChange = async (
    id: number,
    newStatus: 'accepted' | 'rejected'
  ) => {
    try {
      const response = await fetch('/api/admin/reservations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setReservations((prev) =>
          prev.map((reservation) =>
            reservation.id === id
              ? { ...reservation, status: newStatus }
              : reservation
          )
        );
      } else {
        setError(t('failed_update_status'));
      }
    } catch (error) {
      setError(t('failed_update_status'));
    }
  };

  if (loading) {
    return (
      <AdminGate>
        <div className='min-h-screen bg-background'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='flex justify-center items-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            </div>
          </div>
        </div>
      </AdminGate>
    );
  }

  return (
    <AdminGate>
      <div className='min-h-screen bg-background'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h1 className='text-4xl font-serif font-bold text-primary mb-2'>
                {t('reservation_management')}
              </h1>
              <p className='text-muted-foreground text-lg'>
                {t('reservations_manage')}
              </p>
            </div>
            <Link
              href='/admin'
              className='inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors'
              data-testid='link-back-to-dashboard'
            >
              <ArrowLeft className='w-4 h-4' />
              {t('back_to_dashboard')}
            </Link>
          </div>

          {error && (
            <div className='bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6'>
              {error}
            </div>
          )}

          <div className='space-y-4'>
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className='bg-card rounded-lg shadow-sm border border-border p-6 hover-elevate transition-colors'
                data-testid={`reservation-${reservation.id}`}
              >
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                  <div className='flex-1 space-y-3'>
                    <div className='flex items-center gap-4'>
                      <h3 className='text-lg font-semibold text-foreground flex items-center gap-2'>
                        <User className='w-4 h-4' />
                        {reservation.name}
                      </h3>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          reservation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : reservation.status === 'accepted'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-destructive/10 text-destructive'
                        }`}
                      >
                        {reservation.status === 'pending'
                          ? t('pending')
                          : reservation.status === 'accepted'
                            ? t('accepted')
                            : t('rejected')}
                      </span>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-2'>
                        <Calendar className='w-4 h-4' />
                        {new Date(reservation.date).toLocaleDateString('de-DE')}
                      </div>
                      <div className='flex items-center gap-2'>
                        <Clock className='w-4 h-4' />
                        {reservation.time}
                      </div>
                      <div className='flex items-center gap-2'>
                        <Phone className='w-4 h-4' />
                        {reservation.phone}
                      </div>
                      <div className='flex items-center gap-2'>
                        <Mail className='w-4 h-4' />
                        {reservation.email}
                      </div>
                    </div>

                    <div className='text-sm text-muted-foreground'>
                      <strong>{reservation.guests}</strong>{' '}
                      {reservation.guests === 1 ? t('person') : t('people')}
                    </div>
                  </div>

                  {reservation.status === 'pending' && (
                    <div className='flex items-center gap-2 mt-4 lg:mt-0'>
                      <button
                        onClick={() =>
                          handleStatusChange(reservation.id, 'accepted')
                        }
                        className='inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium'
                        data-testid={`button-accept-${reservation.id}`}
                      >
                        <CheckCircle className='w-4 h-4' />
                        {t('confirm')}
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(reservation.id, 'rejected')
                        }
                        className='inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors font-medium'
                        data-testid={`button-reject-${reservation.id}`}
                      >
                        <XCircle className='w-4 h-4' />
                        {t('reject')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {reservations.length === 0 && !loading && (
            <div className='text-center py-12'>
              <p className='text-muted-foreground text-lg'>
                {t('no_reservations')}
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminGate>
  );
}
