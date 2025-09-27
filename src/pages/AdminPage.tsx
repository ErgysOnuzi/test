import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface MenuItem {
  id: number
  title: string
  description: string
  price: number
  category: string
  isAvailable: boolean
}

interface GalleryImage {
  id: number
  imageUrl: string
  title: string
  description?: string
}

export default function AdminPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<'menu' | 'gallery' | 'reservations'>('menu')
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  // Handle authentication redirect more gracefully
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Use a more gentle redirect approach
      setTimeout(() => {
        window.location.href = "/api/login"
      }, 1000)
      return
    }
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    if (isAuthenticated) {
      fetchMenuItems()
      fetchGalleryImages()
    }
  }, [isAuthenticated])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu')
      const data = await response.json()
      setMenuItems(data)
    } catch (error) {
      console.error('Failed to fetch menu items:', error)
    }
  }

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery')
      const data = await response.json()
      setGalleryImages(data)
    } catch (error) {
      console.error('Failed to fetch gallery images:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Access Required</h1>
          <p className="text-muted-foreground mb-6">Please log in to access the admin panel.</p>
          <a 
            href="/api/login"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Log In
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-serif font-bold text-foreground">La Cantina Admin</h1>
              {user && (
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.firstName || user.email}
                </span>
              )}
            </div>
            <a
              href="/api/logout"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Log Out
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'menu', label: 'Menu Management', icon: '🍝' },
              { id: 'gallery', label: 'Gallery Management', icon: '📸' },
              { id: 'reservations', label: 'Reservations', icon: '📅' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Menu Items</h2>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Add New Item
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.slice(0, 12).map((item) => (
                <div key={item.id} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif font-semibold text-lg text-card-foreground">{item.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold">€{item.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Gallery Images</h2>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Upload Image
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryImages.slice(0, 12).map((image) => (
                <div key={image.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-card-foreground mb-2">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Reservations</h2>
            <div className="bg-card rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">Reservation management coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}