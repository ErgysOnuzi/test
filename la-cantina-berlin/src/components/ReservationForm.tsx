"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ReservationForm() {
  const t = useTranslations('reservations');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 2
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(t('reservation_success'));
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: '',
          time: '',
          guests: 2
        });
      } else {
        setMessage(t('reservation_error'));
      }
    } catch (error) {
      setMessage(t('reservation_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          {t('name')} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
          data-testid="input-reservation-name"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          {t('phone')} *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
          data-testid="input-reservation-phone"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
          data-testid="input-reservation-email"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
            {t('date')} *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
            data-testid="input-reservation-date"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-foreground mb-2">
            {t('time')} *
          </label>
          <select
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
            data-testid="select-reservation-time"
          >
            <option value="">{t('select_time')}</option>
            <option value="17:00">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
            <option value="21:30">21:30</option>
          </select>
        </div>

        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-2">
            {t('guests')} *
          </label>
          <select
            id="guests"
            name="guests"
            required
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
            data-testid="select-reservation-guests"
          >
            {Array.from({length: 100}, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num} {num === 1 ? t('person') : t('people')}</option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${message.includes('erfolgreich') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-destructive/10 text-destructive'}`}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-md hover:bg-primary/90 transition-colors text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="button-submit-reservation"
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}