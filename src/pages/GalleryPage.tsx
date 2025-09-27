import React, { useState, useEffect, useCallback } from 'react'

interface GalleryImage {
  id: number
  imageUrl: string
  title: string
  description?: string
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
        
        // Filter out images without URLs
        const validImages = data.filter((img: GalleryImage) => img.imageUrl && img.imageUrl.trim() !== '')
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
          {images.slice(0, 12).map((image) => (
            <div key={image.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img 
                src={cachedImages.get(image.id) || image.imageUrl} 
                alt={image.title}
                className="w-full h-64 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="p-6">
                <h3 className="text-lg font-serif font-medium text-card-foreground mb-2">{image.title}</h3>
                {image.description && <p className="text-sm text-muted-foreground leading-relaxed">{image.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-16 text-center bg-card rounded-lg p-6 border">
        <p className="text-muted-foreground">
          Showing {Math.min(images.length, 12)} of {images.length} images
        </p>
      </div>
    </div>
  )
}