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
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'center' }}>
        Gallery
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Experience the atmosphere of La Cantina Berlin
      </p>
      
      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Loading gallery...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {images.slice(0, 12).map((image) => (
            <div key={image.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src={image.url} 
                alt={image.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '10px' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{image.title}</h3>
                {image.description && <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{image.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <p style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
        Showing {Math.min(images.length, 12)} of {images.length} images
      </p>
    </div>
  )
}