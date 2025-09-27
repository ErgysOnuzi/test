import React from 'react'
import { Outlet, Link, useParams } from 'react-router-dom'

export default function SimpleLayout() {
  const { locale } = useParams<{ locale: string }>()
  const currentLocale = locale || 'de'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1a1a1a', color: 'white', padding: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>La Cantina Berlin - Complete Migration</h1>
        <nav style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <Link to={`/${currentLocale}`} style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to={`/${currentLocale}/test`} style={{ color: 'white', textDecoration: 'none' }}>Test</Link>
          <Link to={`/${currentLocale}/menu`} style={{ color: 'white', textDecoration: 'none' }}>Menu</Link>
          <Link to={`/${currentLocale}/gallery`} style={{ color: 'white', textDecoration: 'none' }}>Gallery</Link>
          <Link to={`/${currentLocale}/reservations`} style={{ color: 'white', textDecoration: 'none' }}>Reservations</Link>
          <Link to={`/${currentLocale}/events`} style={{ color: 'white', textDecoration: 'none' }}>Events</Link>
          <Link to={`/${currentLocale}/contact`} style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
          <Link to={`/${currentLocale}/blog`} style={{ color: 'white', textDecoration: 'none' }}>Blog</Link>
          <Link to={`/${currentLocale}/admin/login`} style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
        </nav>
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          Language: 
          <Link to="/de" style={{ color: '#d4a574', marginLeft: '10px', marginRight: '10px' }}>DE</Link>
          <Link to="/en" style={{ color: '#d4a574' }}>EN</Link>
        </div>
      </header>
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
      <footer style={{ background: '#333', color: 'white', padding: '20px', textAlign: 'center' }}>
        <p>La Cantina Berlin - Complete Migration: Next.js → Vite + React + Express</p>
      </footer>
    </div>
  )
}