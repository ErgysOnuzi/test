import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from '../i18n/translations'
import { Camera } from 'lucide-react'

interface GalleryImage {
  id: number
  imageUrl: string
  title: string
  description?: string
  altText?: string
  category?: string
}

export default function GalleryPage() {
  const { locale = 'de' } = useParams<{ locale: string }>()
  const { t } = useTranslation(locale as 'de' | 'en')
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery')
        if (!response.ok) {
          throw new Error('Failed to fetch gallery')
        }
        const data = await response.json()
        
        // Filter out invalid images
        const validImages = data.filter((img: GalleryImage) => 
          img.imageUrl && 
          img.imageUrl.trim() !== '' &&
          !img.imageUrl.includes('test1.jpg') &&
          !img.imageUrl.includes('test2.jpg')
        )
        
        setImages(validImages)
      } catch (err) {
        console.error('Gallery fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load gallery')
      } finally {
        setIsLoading(false)
      }
    }
    fetchGallery()
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('pages.gallery.loading')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-destructive/10 rounded-lg p-8 border border-destructive/20">
            <p className="text-destructive font-medium mb-2">
              {locale === 'de' ? 'Fehler beim Laden der Galerie' : 'Error loading gallery'}
            </p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Camera className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
            {locale === 'de' ? 'Galerie kommt bald' : 'Gallery Coming Soon'}
          </h2>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
            {locale === 'de' 
              ? 'Wir bereiten wunderschöne Fotos unserer Restaurantatmosphäre, köstlichen Gerichte und authentischen italienischen Speiseerlebnis vor. Schauen Sie bald wieder vorbei!'
              : 'We\'re preparing beautiful photos of our restaurant atmosphere, delicious dishes, and authentic Italian dining experience. Please check back soon!'
            }
          </p>
        </div>
      </div>
    )
  }

  const displayedImages = showAll ? images : images.slice(0, 30)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
          {t('pages.gallery.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {locale === 'de' 
            ? 'Erleben Sie die Atmosphäre von La Cantina Berlin'
            : 'Experience the atmosphere of La Cantina Berlin'
          }
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedImages.map((image, index) => (
          <div 
            key={image.id} 
            className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
            }}
          >
            <div className="relative overflow-hidden">
              <img 
                src={image.imageUrl} 
                alt={image.altText || image.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                loading={index < 6 ? 'eager' : 'lazy'}
                onError={(e) => {
                  const target = e.currentTarget
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="sans-serif" font-size="18"%3EImage not available%3C/text%3E%3C/svg%3E'
                  target.className = "w-full h-64 object-cover"
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-card-foreground mb-2">
                {image.title}
              </h3>
              {image.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {image.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {images.length > 30 && (
        <div className="mt-16 text-center">
          <div className="bg-card rounded-lg p-6 border mb-6">
            <p className="text-muted-foreground mb-4">
              {locale === 'de' 
                ? `Zeige ${displayedImages.length} von ${images.length} Bildern`
                : `Showing ${displayedImages.length} of ${images.length} images`
              }
            </p>
            {!showAll ? (
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                {locale === 'de' ? `Alle ${images.length} Fotos anzeigen` : `Show All ${images.length} Photos`}
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowAll(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                {locale === 'de' ? 'Weniger anzeigen' : 'Show Less'}
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </div>
  )
}
