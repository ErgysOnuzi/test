import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Toaster } from '@/components/ui/toaster'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import MenuPage from '@/pages/MenuPage'
import GalleryPage from '@/pages/GalleryPage'
import ReservationsPage from '@/pages/ReservationsPage'
import EventsPage from '@/pages/EventsPage'
import EventDetailPage from '@/pages/EventDetailPage'
import ContactPage from '@/pages/ContactPage'
import BlogPage from '@/pages/BlogPage'
import AdminPage from '@/pages/AdminPage'
import AdminLoginPage from '@/pages/AdminLoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProtectedRoute from '@/components/ProtectedRoute'

function App() {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language || 'de'

  return (
    <>
      <Routes>
        {/* Default route redirects to current locale */}
        <Route path="/" element={<Navigate to={`/${currentLocale}`} replace />} />
        
        {/* Locale-based routes */}
        <Route path="/:locale" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          
          {/* Admin routes */}
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route 
            path="admin/*" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App