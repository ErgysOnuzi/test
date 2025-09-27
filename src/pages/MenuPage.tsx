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

  // Organize menu items by main categories
  const foodItems = menuItems.filter(item => 
    !item.category.toLowerCase().includes('drink') && 
    !item.category.toLowerCase().includes('beverage') &&
    !item.category.toLowerCase().includes('wine') &&
    !item.category.toLowerCase().includes('beer') &&
    !item.category.toLowerCase().includes('cocktail')
  )
  
  const drinkItems = menuItems.filter(item => 
    item.category.toLowerCase().includes('drink') || 
    item.category.toLowerCase().includes('beverage') ||
    item.category.toLowerCase().includes('wine') ||
    item.category.toLowerCase().includes('beer') ||
    item.category.toLowerCase().includes('cocktail')
  )

  // Group food by categories
  const foodCategories = Array.from(new Set(foodItems.map(item => item.category)))
  
  // Group drinks by alcoholic/non-alcoholic
  const alcoholicDrinks = drinkItems.filter(item => 
    item.category.toLowerCase().includes('wine') ||
    item.category.toLowerCase().includes('beer') ||
    item.category.toLowerCase().includes('cocktail') ||
    item.category.toLowerCase().includes('alcoholic')
  )
  
  const nonAlcoholicDrinks = drinkItems.filter(item => 
    !item.category.toLowerCase().includes('wine') &&
    !item.category.toLowerCase().includes('beer') &&
    !item.category.toLowerCase().includes('cocktail') &&
    !item.category.toLowerCase().includes('alcoholic')
  )

  const renderMenuItems = (items: MenuItem[]) => (
    <div className="grid gap-6">
      {items.map(item => (
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
  )

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
      
      {/* Food Categories */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 text-center">
          🍝 Food
        </h2>
        {foodCategories.map(category => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 pb-2 border-b-2 border-primary">
              {category}
            </h3>
            {renderMenuItems(foodItems.filter(item => item.category === category))}
          </div>
        ))}
      </div>

      {/* Drinks Categories */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 text-center">
          🍷 Drinks
        </h2>
        
        {/* Alcoholic Drinks */}
        {alcoholicDrinks.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 pb-2 border-b-2 border-primary">
              🍸 Alcoholic Beverages
            </h3>
            {renderMenuItems(alcoholicDrinks)}
          </div>
        )}
        
        {/* Non-Alcoholic Drinks */}
        {nonAlcoholicDrinks.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 pb-2 border-b-2 border-primary">
              🥤 Non-Alcoholic Beverages
            </h3>
            {renderMenuItems(nonAlcoholicDrinks)}
          </div>
        )}
      </div>
      
      <div className="mt-16 text-center bg-card rounded-lg p-6 border">
        <p className="text-muted-foreground mb-2">
          Total menu items: {menuItems.length} | Food items: {foodItems.length} | Drink items: {drinkItems.length}
        </p>
      </div>
    </div>
  )
}