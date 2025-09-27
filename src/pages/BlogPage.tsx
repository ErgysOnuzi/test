import React from 'react'

export default function BlogPage() {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px 16px 32px', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#111827', 
          marginBottom: '16px',
          margin: '0 0 16px 0'
        }}>
          Blog
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#4B5563',
          margin: 0
        }}>
          Stories from La Cantina Berlin
        </p>
      </div>
      
      <div style={{ textAlign: 'center', paddingTop: '48px', paddingBottom: '48px' }}>
        <p style={{ color: '#6B7280', fontSize: '16px', margin: 0 }}>Coming Soon</p>
      </div>
    </div>
  )
}