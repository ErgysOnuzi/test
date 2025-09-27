'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Lock, Key, LogOut } from 'lucide-react';
import { adminAuth } from '@/lib/adminAuth';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const t = useTranslations('admin');

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isLoggedIn = await adminAuth.checkAuth();
        setIsAuthenticated(isLoggedIn);
      } catch (error) {
        setIsAuthenticated(false);
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const success = await adminAuth.login(password);
      if (success) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setError(t('wrong_password'));
      }
    } catch (error) {
      setError(t('wrong_password'));
    }

    setIsLoading(false);
  };

  const handleLogout = async () => {
    await adminAuth.logout();
    setIsAuthenticated(false);
  };

  if (checkingAuth) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
          <p className='mt-2 text-muted-foreground'>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center px-4'>
        <div className='w-full max-w-md'>
          <div className='bg-card rounded-xl shadow-2xl p-8 border border-border'>
            {/* Logo/Icon */}
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Lock className='w-8 h-8 text-primary' />
            </div>

            <h1 className='text-3xl font-serif font-bold mb-2 text-center text-foreground'>
              Ristorante La Cantina Bleibtreu
            </h1>
            <p className='text-center text-muted-foreground mb-8'>
              {t('admin_area')}
            </p>

            <form onSubmit={handleLogin} className='space-y-6'>
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-foreground mb-2'
                >
                  {t('password')}
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Key className='h-5 w-5 text-muted-foreground' />
                  </div>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
                    placeholder={t('enter_password')}
                    required
                    data-testid='input-admin-password'
                  />
                </div>
              </div>

              {error && (
                <div className='bg-destructive/10 border border-destructive/20 rounded-lg p-3'>
                  <p className='text-destructive text-sm font-medium'>
                    {error}
                  </p>
                </div>
              )}

              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                data-testid='button-admin-login'
              >
                {isLoading ? t('logging_in') : t('login_button')}
              </button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-xs text-muted-foreground'>
                {t('password_hint')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Add logout button to authenticated admin interface */}
      <div className='bg-card border-b border-border px-6 py-3'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <h2 className='font-semibold text-foreground'>{t('admin_area')}</h2>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to logout?')) {
                handleLogout();
              }
            }}
            className='flex items-center gap-2 text-foreground/70 hover:text-destructive transition-colors text-sm font-medium px-3 py-1 rounded hover:bg-destructive/10'
            data-testid='button-admin-logout'
          >
            <LogOut className='w-4 h-4' />
            Logout
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
