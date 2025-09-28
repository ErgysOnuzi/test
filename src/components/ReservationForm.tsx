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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor='name' className="block text-sm font-medium text-foreground mb-2">
          Name *
        </label>
        <input
          type='text'
          id='name'
          name='name'
          required
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
            errors.name 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-input focus:border-primary focus:ring-primary'
          } focus:outline-none focus:ring-1`}
          placeholder="Your full name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          data-testid='input-reservation-name'
        />
        {errors.name && (
          <p id='name-error' className="mt-1 text-sm text-red-600" role='alert'>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor='phone' className="block text-sm font-medium text-foreground mb-2">
          Phone *
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          required
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
            errors.phone 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-input focus:border-primary focus:ring-primary'
          } focus:outline-none focus:ring-1`}
          placeholder="+49 30 123 456 78"
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          data-testid='input-reservation-phone'
        />
        {errors.phone && (
          <p id='phone-error' className="mt-1 text-sm text-red-600" role='alert'>
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor='email' className="block text-sm font-medium text-foreground mb-2">
          Email *
        </label>
        <input
          type='email'
          id='email'
          name='email'
          required
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
            errors.email 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-input focus:border-primary focus:ring-primary'
          } focus:outline-none focus:ring-1`}
          placeholder="your@email.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          data-testid='input-reservation-email'
        />
        {errors.email && (
          <p id='email-error' className="mt-1 text-sm text-red-600" role='alert'>
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor='date' className="block text-sm font-medium text-foreground mb-2">
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
            className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
              errors.date 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-input focus:border-primary focus:ring-primary'
            } focus:outline-none focus:ring-1`}
            aria-invalid={errors.date ? 'true' : 'false'}
            aria-describedby={errors.date ? 'date-error' : undefined}
            data-testid='input-reservation-date'
          />
          {errors.date && (
            <p id='date-error' className="mt-1 text-sm text-red-600" role='alert'>
              {errors.date}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='time' className="block text-sm font-medium text-foreground mb-2">
            Time *
          </label>
          <select
            id='time'
            name='time'
            required
            value={formData.time}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
              errors.time 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-input focus:border-primary focus:ring-primary'
            } focus:outline-none focus:ring-1 bg-background`}
            aria-invalid={errors.time ? 'true' : 'false'}
            aria-describedby={errors.time ? 'time-error' : undefined}
            data-testid='select-reservation-time'
          >
            <option value=''>Select a time</option>
            <option value='17:00'>17:00 (5:00 PM)</option>
            <option value='17:30'>17:30 (5:30 PM)</option>
            <option value='18:00'>18:00 (6:00 PM)</option>
            <option value='18:30'>18:30 (6:30 PM)</option>
            <option value='19:00'>19:00 (7:00 PM)</option>
            <option value='19:30'>19:30 (7:30 PM)</option>
            <option value='20:00'>20:00 (8:00 PM)</option>
            <option value='20:30'>20:30 (8:30 PM)</option>
            <option value='21:00'>21:00 (9:00 PM)</option>
            <option value='21:30'>21:30 (9:30 PM)</option>
          </select>
          {errors.time && (
            <p id='time-error' className="mt-1 text-sm text-red-600" role='alert'>
              {errors.time}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='guests' className="block text-sm font-medium text-foreground mb-2">
            Guests *
          </label>
          <select
            id='guests'
            name='guests'
            required
            value={formData.guests}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
              errors.guests 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-input focus:border-primary focus:ring-primary'
            } focus:outline-none focus:ring-1 bg-background`}
            aria-invalid={errors.guests ? 'true' : 'false'}
            aria-describedby={errors.guests ? 'guests-error' : undefined}
            data-testid='select-reservation-guests'
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'person' : 'people'}
              </option>
            ))}
            <option value={15}>15+ people (Large Group)</option>
          </select>
          {errors.guests && (
            <p id='guests-error' className="mt-1 text-sm text-red-600" role='alert'>
              {errors.guests}
            </p>
          )}
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg border ${isSuccess 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-start gap-2">
            {isSuccess ? (
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-sm font-medium">{message}</span>
          </div>
        </div>
      )}

      {/* Special Requests Field */}
      <div>
        <label htmlFor='specialRequests' className="block text-sm font-medium text-foreground mb-2">
          Special Requests <span className="text-muted-foreground">(Optional)</span>
        </label>
        <textarea
          id='specialRequests'
          name='specialRequests'
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-primary focus:outline-none focus:ring-1 transition-colors duration-200 resize-none"
          placeholder="Dietary restrictions, birthday celebration, specific table preferences..."
        />
      </div>
      
      <button
        type='submit'
        disabled={isSubmitting}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
          isSubmitting
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm hover:shadow-md'
        }`}
        data-testid='button-submit-reservation'
      >
        <div className="flex items-center justify-center gap-2">
          {isSubmitting && (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isSubmitting ? 'Submitting Reservation...' : 'Reserve Your Table'}
        </div>
      </button>
    </form>
  );
}
