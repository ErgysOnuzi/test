import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F9FAFB', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '72px', 
          fontWeight: 'bold', 
          color: '#111827', 
          marginBottom: '16px',
          margin: '0 0 16px 0'
        }}>
          404
        </h1>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '16px',
          margin: '0 0 16px 0'
        }}>
          Page Not Found
        </h2>
        <p style={{ 
          color: '#4B5563', 
          marginBottom: '32px',
          margin: '0 0 32px 0',
          fontSize: '16px'
        }}>
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px 24px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            borderRadius: '6px',
            color: 'white',
            backgroundColor: '#d4a574',
            textDecoration: 'none',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c19658'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#d4a574'}
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}