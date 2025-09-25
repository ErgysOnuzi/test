"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Star, Check, X, Trash2, Clock, User, Mail, Eye, EyeOff } from 'lucide-react';
import AdminGate from '../AdminGate';

interface AdminFeedback {
  id: number;
  name: string;
  email: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  isPublic: boolean;
  createdAt: string;
}

export default function AdminFeedbackPage() {
  const t = useTranslations('admin_feedback');
  const [feedbacks, setFeedbacks] = useState<AdminFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<{ [key: number]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/admin/feedback');
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

  const updateFeedbackStatus = async (id: number, status: 'approved' | 'rejected') => {
    setActionLoading(prev => ({ ...prev, [id]: status }));
    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setFeedbacks(prev =>
          prev.map(feedback =>
            feedback.id === id ? { ...feedback, status } : feedback
          )
        );
        setSuccessMessage(status === 'approved' ? t('feedback_approved') : t('feedback_rejected'));
        setError(null);
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setError(t('error_updating_feedback'));
      }
    } catch (error) {
      console.error('Error updating feedback:', error);
      setError(t('error_updating_feedback'));
    } finally {
      setActionLoading(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  const toggleVisibility = async (id: number, currentVisibility: boolean) => {
    const action = currentVisibility ? 'hide' : 'show';
    setActionLoading(prev => ({ ...prev, [id]: action }));
    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublic: !currentVisibility }),
      });

      if (response.ok) {
        setFeedbacks(prev =>
          prev.map(feedback =>
            feedback.id === id ? { ...feedback, isPublic: !currentVisibility } : feedback
          )
        );
        setSuccessMessage(!currentVisibility ? t('feedback_made_visible') : t('feedback_hidden'));
        setError(null);
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setError(t('error_toggling_visibility'));
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
      setError(t('error_toggling_visibility'));
    } finally {
      setActionLoading(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  const deleteFeedback = async (id: number) => {
    if (!confirm(t('confirm_delete'))) return;

    setActionLoading(prev => ({ ...prev, [id]: 'delete' }));
    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFeedbacks(prev => prev.filter(feedback => feedback.id !== id));
        setSuccessMessage(t('feedback_deleted'));
        setError(null);
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setError(t('error_deleting_feedback'));
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setError(t('error_deleting_feedback'));
    } finally {
      setActionLoading(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-300`;
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800 border border-green-300`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800 border border-red-300`;
      default:
        return baseClasses;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const pendingCount = feedbacks.filter(f => f.status === 'pending').length;
  const approvedCount = feedbacks.filter(f => f.status === 'approved').length;
  const rejectedCount = feedbacks.filter(f => f.status === 'rejected').length;

  return (
    <AdminGate>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
                {t('title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('subtitle')}
              </p>
            </div>

            {/* Success/Error Messages */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="bg-green-100 border border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700/50 dark:text-green-400 px-4 py-3 rounded-lg mb-6">
                {successMessage}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border text-center">
                <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
                <div className="text-muted-foreground">{t('pending_reviews')}</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border text-center">
                <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
                <div className="text-muted-foreground">{t('approved_reviews')}</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border text-center">
                <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
                <div className="text-muted-foreground">{t('rejected_reviews')}</div>
              </div>
            </div>

            {/* Feedbacks List */}
            {loading ? (
              <div className="text-center text-muted-foreground">
                {t('loading')}
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center text-muted-foreground">
                {t('no_feedbacks')}
              </div>
            ) : (
              <div className="space-y-6">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border"
                    data-testid={`admin-feedback-${feedback.id}`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      
                      {/* Feedback Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-foreground">{feedback.name}</p>
                              <span className={getStatusBadge(feedback.status)}>
                                {t(feedback.status)}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                feedback.isPublic 
                                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                  : 'bg-gray-100 text-gray-800 border border-gray-300'
                              }`}>
                                {feedback.isPublic ? 'Visible' : 'Hidden'}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {feedback.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {formatDate(feedback.createdAt)}
                              </div>
                              <div className="flex gap-1">
                                {renderStars(feedback.rating)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {feedback.comment}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2">
                        {feedback.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateFeedbackStatus(feedback.id, 'approved')}
                              disabled={actionLoading[feedback.id] === 'approved'}
                              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors disabled:opacity-50 font-medium"
                              data-testid={`button-approve-${feedback.id}`}
                            >
                              <Check className="w-4 h-4" />
                              {actionLoading[feedback.id] === 'approved' ? t('approving') : t('approve')}
                            </button>
                            <button
                              onClick={() => updateFeedbackStatus(feedback.id, 'rejected')}
                              disabled={actionLoading[feedback.id] === 'rejected'}
                              className="flex items-center gap-2 px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md transition-colors disabled:opacity-50 font-medium"
                              data-testid={`button-reject-${feedback.id}`}
                            >
                              <X className="w-4 h-4" />
                              {actionLoading[feedback.id] === 'rejected' ? t('rejecting') : t('reject')}
                            </button>
                          </>
                        )}
                        {feedback.status === 'approved' && (
                          <button
                            onClick={() => updateFeedbackStatus(feedback.id, 'rejected')}
                            disabled={actionLoading[feedback.id] === 'rejected'}
                            className="flex items-center gap-2 px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md transition-colors disabled:opacity-50 font-medium"
                            data-testid={`button-reject-${feedback.id}`}
                          >
                            <X className="w-4 h-4" />
                            {actionLoading[feedback.id] === 'rejected' ? t('rejecting') : t('reject')}
                          </button>
                        )}
                        {feedback.status === 'rejected' && (
                          <button
                            onClick={() => updateFeedbackStatus(feedback.id, 'approved')}
                            disabled={actionLoading[feedback.id] === 'approved'}
                            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors disabled:opacity-50 font-medium"
                            data-testid={`button-approve-${feedback.id}`}
                          >
                            <Check className="w-4 h-4" />
                            {actionLoading[feedback.id] === 'approved' ? t('approving') : t('approve')}
                          </button>
                        )}
                        <button
                          onClick={() => toggleVisibility(feedback.id, feedback.isPublic)}
                          disabled={actionLoading[feedback.id] === 'hide' || actionLoading[feedback.id] === 'show'}
                          className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-md transition-colors disabled:opacity-50 font-medium"
                          data-testid={`button-visibility-${feedback.id}`}
                        >
                          {feedback.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          {actionLoading[feedback.id] === 'hide' 
                            ? 'Hiding...' 
                            : actionLoading[feedback.id] === 'show' 
                            ? 'Showing...' 
                            : feedback.isPublic ? 'Hide' : 'Show'}
                        </button>
                        <button
                          onClick={() => deleteFeedback(feedback.id)}
                          disabled={actionLoading[feedback.id] === 'delete'}
                          className="flex items-center gap-2 px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md transition-colors disabled:opacity-50 font-medium"
                          data-testid={`button-delete-${feedback.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                          {actionLoading[feedback.id] === 'delete' ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminGate>
  );
}