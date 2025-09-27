'use client';
import React, { useState } from 'react';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 2,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }

    // Time validation
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    // Guests validation
    if (!formData.guests || formData.guests < 1 || formData.guests > 100) {
      newErrors.guests = 'Please select a valid number of guests (1-100)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage('Thank you! Your reservation has been submitted successfully.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: '',
          time: '',
          guests: 2,
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'There was an error with your reservation. Please try again.');
      }
    } catch (error) {
      setMessage('There was an error with your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Arial, sans-serif' }}>
      <div>
        <label
          htmlFor='name'
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#111827',
            marginBottom: '8px'
          }}
        >
          Name *
        </label>
        <input
          type='text'
          id='name'
          name='name'
          required
          value={formData.name}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `1px solid ${errors.name ? '#dc2626' : '#d1d5db'}`,
            borderRadius: '6px',
            fontSize: '16px',
            backgroundColor: '#ffffff',
            color: '#111827',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
          onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = errors.name ? '#dc2626' : '#d1d5db'}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          data-testid='input-reservation-name'
        />
        {errors.name && (
          <p
            id='name-error'
            style={{
              color: '#dc2626',
              fontSize: '14px',
              marginTop: '4px'
            }}
            role='alert'
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='phone'
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#111827',
            marginBottom: '8px'
          }}
        >
          Phone *
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          required
          value={formData.phone}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `1px solid ${errors.phone ? '#dc2626' : '#d1d5db'}`,
            borderRadius: '6px',
            fontSize: '16px',
            backgroundColor: '#ffffff',
            color: '#111827',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
          onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = errors.phone ? '#dc2626' : '#d1d5db'}
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          data-testid='input-reservation-phone'
        />
        {errors.phone && (
          <p
            id='phone-error'
            style={{
              color: '#dc2626',
              fontSize: '14px',
              marginTop: '4px'
            }}
            role='alert'
          >
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='email'
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#111827',
            marginBottom: '8px'
          }}
        >
          Email *
        </label>
        <input
          type='email'
          id='email'
          name='email'
          required
          value={formData.email}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `1px solid ${errors.email ? '#dc2626' : '#d1d5db'}`,
            borderRadius: '6px',
            fontSize: '16px',
            backgroundColor: '#ffffff',
            color: '#111827',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
          onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = errors.email ? '#dc2626' : '#d1d5db'}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          data-testid='input-reservation-email'
        />
        {errors.email && (
          <p
            id='email-error'
            style={{
              color: '#dc2626',
              fontSize: '14px',
              marginTop: '4px'
            }}
            role='alert'
          >
            {errors.email}
          </p>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <div>
          <label
            htmlFor='date'
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}
          >
            Date *
          </label>
          <input
            type='date'
            id='date'
            name='date'
            required
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.date ? '#dc2626' : '#d1d5db'}`,
              borderRadius: '6px',
              fontSize: '16px',
              backgroundColor: '#ffffff',
              color: '#111827',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
            onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = errors.date ? '#dc2626' : '#d1d5db'}
            aria-invalid={errors.date ? 'true' : 'false'}
            aria-describedby={errors.date ? 'date-error' : undefined}
            data-testid='input-reservation-date'
          />
          {errors.date && (
            <p
              id='date-error'
              style={{
                color: '#dc2626',
                fontSize: '14px',
                marginTop: '4px'
              }}
              role='alert'
            >
              {errors.date}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='time'
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}
          >
            Time *
          </label>
          <select
            id='time'
            name='time'
            required
            value={formData.time}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.time ? '#dc2626' : '#d1d5db'}`,
              borderRadius: '6px',
              fontSize: '16px',
              backgroundColor: '#ffffff',
              color: '#111827',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => (e.target as HTMLSelectElement).style.borderColor = '#2563eb'}
            onBlur={(e) => (e.target as HTMLSelectElement).style.borderColor = errors.time ? '#dc2626' : '#d1d5db'}
            aria-invalid={errors.time ? 'true' : 'false'}
            aria-describedby={errors.time ? 'time-error' : undefined}
            data-testid='select-reservation-time'
          >
            <option value=''>Select a time</option>
            <option value='17:00'>17:00</option>
            <option value='17:30'>17:30</option>
            <option value='18:00'>18:00</option>
            <option value='18:30'>18:30</option>
            <option value='19:00'>19:00</option>
            <option value='19:30'>19:30</option>
            <option value='20:00'>20:00</option>
            <option value='20:30'>20:30</option>
            <option value='21:00'>21:00</option>
            <option value='21:30'>21:30</option>
          </select>
          {errors.time && (
            <p
              id='time-error'
              style={{
                color: '#dc2626',
                fontSize: '14px',
                marginTop: '4px'
              }}
              role='alert'
            >
              {errors.time}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='guests'
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}
          >
            Guests *
          </label>
          <select
            id='guests'
            name='guests'
            required
            value={formData.guests}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${errors.guests ? '#dc2626' : '#d1d5db'}`,
              borderRadius: '6px',
              fontSize: '16px',
              backgroundColor: '#ffffff',
              color: '#111827',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => (e.target as HTMLSelectElement).style.borderColor = '#2563eb'}
            onBlur={(e) => (e.target as HTMLSelectElement).style.borderColor = errors.guests ? '#dc2626' : '#d1d5db'}
            aria-invalid={errors.guests ? 'true' : 'false'}
            aria-describedby={errors.guests ? 'guests-error' : undefined}
            data-testid='select-reservation-guests'
          >
            {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'person' : 'people'}
              </option>
            ))}
          </select>
          {errors.guests && (
            <p
              id='guests-error'
              style={{
                color: '#dc2626',
                fontSize: '14px',
                marginTop: '4px'
              }}
              role='alert'
            >
              {errors.guests}
            </p>
          )}
        </div>
      </div>

      {message && (
        <div
          style={{
            padding: '16px',
            borderRadius: '6px',
            backgroundColor: isSuccess ? '#dcfce7' : '#fef2f2',
            color: isSuccess ? '#166534' : '#dc2626',
            border: `1px solid ${isSuccess ? '#bbf7d0' : '#fecaca'}`
          }}
        >
          {message}
        </div>
      )}

      <button
        type='submit'
        disabled={isSubmitting}
        style={{
          width: '100%',
          backgroundColor: isSubmitting ? '#6b7280' : '#2563eb',
          color: '#ffffff',
          padding: '16px 32px',
          borderRadius: '6px',
          border: 'none',
          fontSize: '18px',
          fontWeight: '600',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
          opacity: isSubmitting ? 0.6 : 1
        }}
        onMouseOver={(e) => {
          if (!isSubmitting) (e.target as HTMLButtonElement).style.backgroundColor = '#1d4ed8';
        }}
        onMouseOut={(e) => {
          if (!isSubmitting) (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
        }}
        data-testid='button-submit-reservation'
      >
        {isSubmitting ? 'Submitting...' : 'Make Reservation'}
      </button>
    </form>
  );
}
