import React from 'react'

export default function AdminLoginPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F9FAFB', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '448px', 
        width: '100%', 
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#111827', 
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            Admin Login
          </h1>
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '48px', paddingBottom: '48px' }}>
          <p style={{ color: '#6B7280', fontSize: '16px', margin: 0 }}>Coming Soon</p>
        </div>
      </div>
    </div>
  )
}