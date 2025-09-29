'use client';
import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters long';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Thank you! Your message has been sent successfully.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'There was an error sending your message. Please try again.');
      }
    } catch (error) {
      setMessage('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          data-testid='input-contact-name'
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
          data-testid='input-contact-email'
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

      <div>
        <label
          htmlFor='subject'
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#111827',
            marginBottom: '8px'
          }}
        >
          Subject *
        </label>
        <input
          type='text'
          id='subject'
          name='subject'
          required
          value={formData.subject}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `1px solid ${errors.subject ? '#dc2626' : '#d1d5db'}`,
            borderRadius: '6px',
            fontSize: '16px',
            backgroundColor: '#ffffff',
            color: '#111827',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#2563eb'}
          onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = errors.subject ? '#dc2626' : '#d1d5db'}
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          data-testid='input-contact-subject'
        />
        {errors.subject && (
          <p
            id='subject-error'
            style={{
              color: '#dc2626',
              fontSize: '14px',
              marginTop: '4px'
            }}
            role='alert'
          >
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='message'
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#111827',
            marginBottom: '8px'
          }}
        >
          Message *
        </label>
        <textarea
          id='message'
          name='message'
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: `1px solid ${errors.message ? '#dc2626' : '#d1d5db'}`,
            borderRadius: '6px',
            fontSize: '16px',
            backgroundColor: '#ffffff',
            color: '#111827',
            outline: 'none',
            transition: 'border-color 0.2s',
            resize: 'vertical'
          }}
          onFocus={(e) => (e.target as HTMLTextAreaElement).style.borderColor = '#2563eb'}
          onBlur={(e) => (e.target as HTMLTextAreaElement).style.borderColor = errors.message ? '#dc2626' : '#d1d5db'}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          data-testid='textarea-contact-message'
        />
        {errors.message && (
          <p
            id='message-error'
            style={{
              color: '#dc2626',
              fontSize: '14px',
              marginTop: '4px'
            }}
            role='alert'
          >
            {errors.message}
          </p>
        )}
      </div>

      {message && (
        <div
          style={{
            padding: '16px',
            borderRadius: '6px',
            backgroundColor: message === 'Thank you! Your message has been sent successfully.' ? '#dcfce7' : '#fef2f2',
            color: message === 'Thank you! Your message has been sent successfully.' ? '#166534' : '#dc2626',
            border: `1px solid ${message === 'Thank you! Your message has been sent successfully.' ? '#bbf7d0' : '#fecaca'}`
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
        data-testid='button-submit-contact'
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
