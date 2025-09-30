'use client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Instagram, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { useInstagram } from '../hooks/useInstagram';
import { useTranslation } from '../i18n/translations';
import InstagramEmbed from './InstagramEmbed';

interface InstagramFeedProps {
  showHeader?: boolean;
  maxPosts?: number;
}

function InstagramFeedContent({
  showHeader = true,
  maxPosts = 2,
}: InstagramFeedProps) {
  const { locale = 'de' } = useParams<{ locale: string }>();
  const { t } = useTranslation(locale as 'de' | 'en');
  const { data, isLoading, error, refetch } = useInstagram(maxPosts);

  if (isLoading) {
    return (
      <div className='bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border'>
        {showHeader && (
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <Instagram className='w-8 h-8 text-primary' />
              <h2 className='text-3xl font-serif font-bold text-foreground'>
                {t('instagram.title')}
              </h2>
            </div>
          </div>
        )}
        
        <div className='flex items-center justify-center py-12'>
          <RefreshCw className='w-8 h-8 text-muted-foreground animate-spin' />
          <span className='ml-3 text-muted-foreground'>{t('instagram.loadingPosts')}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border'>
        {showHeader && (
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <Instagram className='w-8 h-8 text-primary' />
              <h2 className='text-3xl font-serif font-bold text-foreground'>
                {t('instagram.title')}
              </h2>
            </div>
          </div>
        )}
        
        <div className='flex items-center justify-center py-12 text-center'>
          <div>
            <AlertCircle className='w-8 h-8 text-orange-500 mx-auto mb-3' />
            <p className='text-muted-foreground mb-4'>{t('instagram.errorLoading')}</p>
            <button
              onClick={() => refetch()}
              className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'
            >
              <RefreshCw className='w-4 h-4' />
              {t('common.tryAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const posts = data?.posts || [];
  const profileUrl = data?.profileUrl || 'https://instagram.com/lacantina.berlin';

  return (
    <div className='bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border'>
      {showHeader && (
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <Instagram className='w-8 h-8 text-primary' />
            <h2 className='text-3xl font-serif font-bold text-foreground'>
              {t('instagram.title')}
            </h2>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => refetch()}
              className='text-muted-foreground hover:text-primary transition-colors p-1'
              title={t('instagram.refreshPosts')}
            >
              <RefreshCw className='w-4 h-4' />
            </button>
            <a
              href={profileUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:text-primary/80 transition-colors'
            >
              <ExternalLink className='w-5 h-5' />
            </a>
          </div>
        </div>
      )}

      {posts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {posts.map((url) => (
            <InstagramEmbed key={url} url={url} />
          ))}
        </div>
      ) : (
        <div className='text-center py-8 text-muted-foreground'>
          <Instagram className='w-12 h-12 mx-auto mb-4 opacity-50' />
          <p>{t('instagram.noPosts')}</p>
        </div>
      )}

      <div className='text-center mt-6 pt-6 border-t border-border/30'>
        <a
          href={profileUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors'
        >
          <Instagram className='w-4 h-4' />
          {t('instagram.followUs')}
        </a>
      </div>
    </div>
  );
}

// Export the main component
export default function InstagramFeed(props: InstagramFeedProps) {
  return <InstagramFeedContent {...props} />;
}
