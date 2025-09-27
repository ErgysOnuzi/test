import React, { useState, useEffect } from 'react'
import MenuWithFilters from '../components/MenuWithFilters'

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

  return <MenuWithFilters menuItems={menuItems} locale="en" />
}