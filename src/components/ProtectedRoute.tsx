import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { adminAuth } from '@/lib/adminAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await adminAuth.checkAuth()
        setIsAuthenticated(authenticated)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Inter, Arial, sans-serif'
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Extract locale from current path or default to 'de'
    const pathSegments = location.pathname.split('/')
    const locale = pathSegments[1] && ['de', 'en'].includes(pathSegments[1]) ? pathSegments[1] : 'de'
    const loginPath = `/${locale}/admin/login`
    
    return <Navigate to={loginPath} state={{ from: location }} replace />
  }

  return <>{children}</>
}