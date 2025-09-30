import React, { useState } from 'react'
import { adminAuth } from '@/lib/adminAuth'

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    identifier: '', // Can be email or username
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await adminAuth.login(formData.identifier, formData.password)
      if (result.success) {
        // Use server-provided redirect URL or fallback to current locale
        const redirectTo = result.redirectTo || `/${window.location.pathname.split('/')[1] || 'de'}/admin/dashboard`
        window.location.href = redirectTo
      } else {
        setError('Invalid credentials. Please check your email/username and password.')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FEF9F3', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '448px', 
        width: '100%', 
        padding: '32px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#1F2937', 
            marginBottom: '8px',
            margin: '0 0 8px 0',
            fontFamily: 'Playfair Display, serif'
          }}>
            La Cantina Berlin
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6B7280',
            margin: 0
          }}>
            Admin Panel Access
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label 
              htmlFor="identifier" 
              style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '6px' 
              }}
            >
              Email or Username
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'white',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#C4834C'
                e.target.style.boxShadow = '0 0 0 3px rgba(196, 131, 76, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB'
                e.target.style.boxShadow = 'none'
              }}
              placeholder="Enter your email or username"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '6px' 
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'white',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#C4834C'
                e.target.style.boxShadow = '0 0 0 3px rgba(196, 131, 76, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB'
                e.target.style.boxShadow = 'none'
              }}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div style={{
              padding: '12px',
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              color: '#B91C1C',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: isLoading ? '#9CA3AF' : '#C4834C',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s ease-in-out',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.backgroundColor = '#A16A35'
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.backgroundColor = '#C4834C'
              }
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}