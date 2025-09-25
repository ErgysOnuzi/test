"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Star, Send, MessageCircle, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface Feedback {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function FeedbackPage() {
  const t = useTranslations('feedback');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const rating = watch('rating');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback');
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        const error = await response.json();
        console.error('Error submitting feedback:', error);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < currentRating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive ? () => setValue('rating', i + 1) : undefined}
        data-testid={interactive ? `star-${i + 1}` : undefined}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Feedback Form */}
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border mb-16">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-primary" />
              {t('share_experience')}
            </h2>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
                {t('thank_you_message')}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('name')} *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('name_placeholder')}
                    data-testid="input-feedback-name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('email')} *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('email_placeholder')}
                    data-testid="input-feedback-email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('rating')} *
                </label>
                <div className="flex gap-1">
                  {renderStars(rating, true)}
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('comment')} *
                </label>
                <textarea
                  {...register('comment')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder={t('comment_placeholder')}
                  data-testid="textarea-feedback-comment"
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                data-testid="button-submit-feedback"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? t('submitting') : t('submit_feedback')}
              </button>
            </form>
          </div>

          {/* Customer Reviews */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
              {t('customer_reviews')}
            </h2>

            {loading ? (
              <div className="text-center text-muted-foreground">
                {t('loading_reviews')}
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center text-muted-foreground">
                {t('no_reviews_yet')}
              </div>
            ) : (
              <div className="grid gap-6">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border"
                    data-testid={`feedback-${feedback.id}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{feedback.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(feedback.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {feedback.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}