import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function SimpleLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1a1a1a', color: 'white', padding: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>La Cantina Berlin - Vite Migration</h1>
        <nav style={{ marginTop: '10px' }}>
          <Link to="/de" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Home</Link>
          <Link to="/de/menu" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Menu</Link>
          <Link to="/de/gallery" style={{ color: 'white', textDecoration: 'none' }}>Gallery</Link>
        </nav>
      </header>
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
      <footer style={{ background: '#333', color: 'white', padding: '20px', textAlign: 'center' }}>
        <p>Migration Test - Express + Vite + React</p>
      </footer>
    </div>
  )
}