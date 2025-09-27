import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SimpleLayout from '@/components/SimpleLayout'
import HomePage from '@/pages/HomePage'
import TestPage from '@/pages/TestPage'
import MenuPage from '@/pages/MenuPage'
import GalleryPage from '@/pages/GalleryPage'
import ReservationsPage from '@/pages/ReservationsPage'
import EventsPage from '@/pages/EventsPage'
import EventDetailPage from '@/pages/EventDetailPage'
import ContactPage from '@/pages/ContactPage'
import FeedbackPage from '@/pages/FeedbackPage'
import LegalPage from '@/pages/LegalPage'
import BlogPage from '@/pages/BlogPage'
import AdminPage from '@/pages/AdminPage'
import AdminLoginPage from '@/pages/AdminLoginPage'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  return (
    <Routes>
      {/* Default route redirects to German locale */}
      <Route path="/" element={<Navigate to="/de" replace />} />
      
      {/* Direct admin route */}
      <Route path="/admin" element={<AdminPage />} />
      
      {/* Locale-based routes */}
      <Route path="/:locale" element={<SimpleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="legal" element={<LegalPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="admin/login" element={<AdminLoginPage />} />
        <Route path="admin/*" element={<AdminPage />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App