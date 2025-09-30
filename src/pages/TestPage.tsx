import React from 'react'

export default function TestPage() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', color: '#333' }}>
        🎉 Vite + React Migration Successful!
      </h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        La Cantina Berlin is now running on Vite + React + Express
      </p>
      <div style={{ marginTop: '20px' }}>
        <p>✅ Frontend: Vite + React (Port 5000)</p>
        <p>✅ Backend: Express API (Port 3001)</p>
        <p>✅ Database: PostgreSQL with Drizzle ORM</p>
      </div>
    </div>
  )
}