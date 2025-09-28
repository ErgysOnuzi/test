import React, { useState, useEffect, useCallback } from 'react'

interface GalleryImage {
  id: number
  imageUrl: string
  title: string
  description?: string
  altText?: string
  category?: string
}

interface CachedImage extends GalleryImage {
  cachedAt: number
  blob?: string
}

const CACHE_KEY = 'la-cantina-gallery-cache'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cachedImages, setCachedImages] = useState<Map<number, string>>(new Map())
  const [showAll, setShowAll] = useState(false)

  // Check if cache is valid
  const isCacheValid = useCallback((cachedAt: number) => {
    return Date.now() - cachedAt < CACHE_DURATION
  }, [])

  // Load images from cache
  const loadFromCache = useCallback((): GalleryImage[] => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsedCache: CachedImage[] = JSON.parse(cached)
        return parsedCache.filter(img => isCacheValid(img.cachedAt))
      }
    } catch (error) {
      console.warn('Failed to load gallery cache:', error)
    }
    return []
  }, [isCacheValid])

  // Save images to cache
  const saveToCache = useCallback((galleryImages: GalleryImage[]) => {
    try {
      const cacheData: CachedImage[] = galleryImages.map(img => ({
        ...img,
        cachedAt: Date.now()
      }))
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.warn('Failed to save gallery cache:', error)
    }
  }, [])

  // Pre-load and cache image blobs
  const preloadImage = useCallback((imageUrl: string, imageId: number) => {
    if (!imageUrl || cachedImages.has(imageId)) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      // Create a canvas to convert image to blob
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            const blobUrl = URL.createObjectURL(blob)
            setCachedImages(prev => new Map(prev.set(imageId, blobUrl)))
          }
        }, 'image/jpeg', 0.8)
      }
    }
    img.src = imageUrl
  }, [cachedImages])

  useEffect(() => {
    const fetchGallery = async () => {
      // First, try to load from cache
      const cachedGallery = loadFromCache()
      if (cachedGallery.length > 0) {
        const validImages = cachedGallery.filter((img: GalleryImage) => img.imageUrl && img.imageUrl.trim() !== '')
        setImages(validImages)
        setIsLoading(false)
        
        // Pre-load cached images
        validImages.forEach(img => preloadImage(img.imageUrl, img.id))
        return
      }

      // If no valid cache, fetch from API
      try {
        const response = await fetch('/api/gallery')
        if (!response.ok) throw new Error('Failed to fetch gallery')
        const data = await response.json()
        
        console.log('Gallery API response:', data.length, 'images')
        console.log('Sample image:', data[0])
        
        // Filter out images without URLs - be more lenient with the filtering
        const validImages = data.filter((img: GalleryImage) => {
          const hasUrl = img.imageUrl && img.imageUrl.trim() !== ''
          if (!hasUrl) {
            console.log('Filtered out image without URL:', img)
          }
          return hasUrl
        })
        
        console.log('Valid images after filtering:', validImages.length)
        setImages(validImages)
        
        // Save to cache
        saveToCache(validImages)
        
        // Pre-load images
        validImages.forEach((img: GalleryImage) => preloadImage(img.imageUrl, img.id))
      } catch (err) {
        console.error('Gallery fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGallery()
  }, [loadFromCache, saveToCache, preloadImage])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
          Gallery
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience the atmosphere of La Cantina Berlin
        </p>
      </div>
      
      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading gallery...</p>
      ) : images.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-card rounded-lg border p-8">
            <h3 className="text-xl font-serif font-medium text-card-foreground mb-4">Gallery Coming Soon</h3>
            <p className="text-muted-foreground">
              We're preparing beautiful photos of our restaurant atmosphere, delicious dishes, and authentic Italian dining experience. 
              Please check back soon to see our gallery!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.slice(0, showAll ? images.length : 30).map((image) => (
            <div key={image.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={cachedImages.get(image.id) || image.imageUrl} 
                  alt={image.altText || image.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-serif font-medium text-card-foreground mb-2">{image.title}</h3>
                {image.description && <p className="text-sm text-muted-foreground leading-relaxed">{image.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-16 text-center">
        <div className="bg-card rounded-lg p-6 border mb-6">
          <p className="text-muted-foreground mb-4">
            Showing {Math.min(images.length, showAll ? images.length : 30)} of {images.length} images
          </p>
          {!showAll && images.length > 30 && (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Show All {images.length} Photos
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          {showAll && (
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Show Less
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}