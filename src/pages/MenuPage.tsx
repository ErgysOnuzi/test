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
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Menu</h1>
        <p>Loading menu items...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Menu</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    )
  }

  const categories = Array.from(new Set(menuItems.map(item => item.category)))

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'center' }}>
        La Cantina Berlin Menu
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Authentic Italian cuisine in the heart of Berlin
      </p>
      
      {categories.map(category => (
        <div key={category} style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333', borderBottom: '2px solid #d4a574' }}>
            {category}
          </h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            {menuItems
              .filter(item => item.category === category)
              .map(item => (
                <div key={item.id} style={{ 
                  padding: '15px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  backgroundColor: '#fafafa'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>
                        {item.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                        {item.description}
                      </p>
                    </div>
                    <div style={{ 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      color: '#d4a574',
                      marginLeft: '15px'
                    }}>
                      €{item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: '30px', textAlign: 'center', color: '#666' }}>
        <p>Total menu items: {menuItems.length}</p>
        <p>Categories: {categories.length}</p>
      </div>
    </div>
  )
}