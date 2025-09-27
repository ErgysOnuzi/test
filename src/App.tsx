import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SimpleLayout from '@/components/SimpleLayout'
import TestPage from '@/pages/TestPage'
import MenuPage from '@/pages/MenuPage'
import GalleryPage from '@/pages/GalleryPage'

function App() {
  return (
    <Routes>
      {/* Default route redirects to German locale */}
      <Route path="/" element={<Navigate to="/de" replace />} />
      
      {/* Locale-based routes */}
      <Route path="/de" element={<SimpleLayout />}>
        <Route index element={<TestPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="gallery" element={<GalleryPage />} />
      </Route>
    </Routes>
  )
}

export default App