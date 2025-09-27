import React, { useState, useEffect } from 'react'

interface GalleryImage {
  id: number
  url: string
  title: string
  description?: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery')
        if (!response.ok) throw new Error('Failed to fetch gallery')
        const data = await response.json()
        setImages(data)
      } catch (err) {
        console.error('Gallery fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGallery()
  }, [])

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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.slice(0, 12).map((image) => (
            <div key={image.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-64 object-cover"
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