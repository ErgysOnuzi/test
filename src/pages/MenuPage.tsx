import React, { useState, useEffect } from 'react'

interface MenuItem {
  id: number
  title: string
  description: string
  price: number
  category: string
  isAvailable: boolean
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu')
        if (!response.ok) throw new Error('Failed to fetch menu')
        const data = await response.json()
        setMenuItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchMenu()
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-6">Menu</h1>
        <p className="text-muted-foreground">Loading menu items...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-6">Menu</h1>
        <p className="text-destructive">Error: {error}</p>
      </div>
    )
  }

  const categories = Array.from(new Set(menuItems.map(item => item.category)))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
          La Cantina Berlin Menu
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Authentic Italian cuisine in the heart of Berlin
        </p>
      </div>
      
      {categories.map(category => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 pb-2 border-b-2 border-primary">
            {category}
          </h2>
          <div className="grid gap-6">
            {menuItems
              .filter(item => item.category === category)
              .map(item => (
                <div key={item.id} className="bg-card rounded-lg p-6 border hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-medium text-card-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-primary ml-6 flex-shrink-0">
                      €{item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      
      <div className="mt-16 text-center bg-card rounded-lg p-6 border">
        <p className="text-muted-foreground mb-2">Total menu items: {menuItems.length}</p>
        <p className="text-muted-foreground">Categories: {categories.length}</p>
      </div>
    </div>
  )
}