'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Users,
  Euro,
} from 'lucide-react';
import AdminGate from '../AdminGate';

export const dynamic = 'force-dynamic';

interface Event {
  id: number;
  title: string;
  description: string | null;
  titleDe: string | null;
  titleEn: string | null;
  descriptionDe: string | null;
  descriptionEn: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  capacity: number | null;
  currentBookings: number;
  price: number | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminEventsPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Load events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/admin/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else if (response.status === 401) {
          setError(t('unauthorized_access'));
        } else {
          setError(t('failed_to_load_events'));
        }
      } catch (err) {
        setError(t('network_error_loading_events'));
        // Error already captured in UI state
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [t]);

  const handleDelete = async (id: number) => {
    if (confirm(t('delete_event_confirm'))) {
      try {
        const response = await fetch(`/api/admin/events?id=${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setEvents((prev) => prev.filter((event) => event.id !== id));
          setSuccessMessage(t('event_deleted_success'));
          setError(null);
          setTimeout(() => setSuccessMessage(null), 5000);
        } else {
          setError(t('failed_to_delete_event'));
        }
      } catch (err) {
        setError(t('network_error_deleting_event'));
        // Error already captured in UI state
      }
    }
  };

  const handleAddEvent = async () => {
    // This should be connected to a proper form - placeholder functionality disabled
    setError(
      'Event creation form not yet implemented. Please add events through the main admin interface.'
    );
    return; // Exit early - no further execution needed
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
                {t('events_management_title')}
              </h1>
              <p className='text-muted-foreground text-lg'>
                {t('events_management_desc')}
              </p>
            </div>
            <Link
              href={`/${locale}/admin`}
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

          {successMessage && (
            <div className='bg-green-100 border border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700/50 dark:text-green-400 px-4 py-3 rounded-lg mb-6'>
              {successMessage}
            </div>
          )}

          <div className='mb-6'>
            <button
              onClick={() => setShowAddForm(true)}
              className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium'
              data-testid='button-add-event'
            >
              <Plus className='w-4 h-4' />
              {t('new_event')}
            </button>
          </div>

          <div className='space-y-4'>
            {events.map((event) => (
              <div
                key={event.id}
                className='bg-card rounded-lg shadow-sm border border-border p-6 hover-elevate transition-colors'
                data-testid={`event-${event.id}`}
              >
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                  <div className='flex-1 space-y-3'>
                    <div className='flex items-center gap-4'>
                      <h3 className='text-xl font-semibold text-foreground'>
                        {event.title}
                      </h3>
                    </div>

                    {event.description && (
                      <p className='text-muted-foreground'>
                        {event.description}
                      </p>
                    )}

                    <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-2'>
                        <Calendar className='w-4 h-4' />
                        {event.date
                          ? new Date(event.date).toLocaleDateString(
                              locale === 'de' ? 'de-DE' : 'en-US',
                              {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }
                            )
                          : 'Invalid date'}
                      </div>
                      {event.capacity && (
                        <div className='flex items-center gap-2'>
                          <Users className='w-4 h-4' />
                          {event.capacity} {t('seats')}
                        </div>
                      )}
                      {event.price && (
                        <div className='flex items-center gap-2'>
                          <Euro className='w-4 h-4' />
                          {event.price.toFixed(2)} €
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-2 mt-4 lg:mt-0'>
                    <button
                      onClick={() =>
                        setError('Edit functionality not yet implemented')
                      }
                      className='inline-flex items-center gap-2 border border-border text-foreground px-4 py-2 rounded-md hover:bg-muted transition-colors font-medium'
                      data-testid={`button-edit-${event.id}`}
                    >
                      <Edit2 className='w-4 h-4' />
                      {t('edit')}
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className='inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors font-medium'
                      data-testid={`button-delete-${event.id}`}
                    >
                      <Trash2 className='w-4 h-4' />
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {events.length === 0 && !loading && (
            <div className='text-center py-12'>
              <Calendar className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
              <p className='text-muted-foreground text-lg mb-4'>
                {t('no_events_planned')}
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium'
              >
                <Plus className='w-4 h-4' />
                {t('create_first_event')}
              </button>
            </div>
          )}

          {/* Simple add form modal */}
          {showAddForm && (
            <div className='fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50'>
              <div className='bg-card rounded-lg border border-border p-6 w-full max-w-md shadow-lg'>
                <h3 className='text-lg font-semibold text-foreground mb-4'>
                  {t('new_event')}
                </h3>
                <p className='text-muted-foreground mb-4'>
                  {t('form_new_event')}
                </p>
                <div className='flex justify-end space-x-2'>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className='px-4 py-2 text-muted-foreground border border-border rounded hover:bg-muted transition-colors'
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className='px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors'
                  >
                    Hinzufügen
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminGate>
  );
}
