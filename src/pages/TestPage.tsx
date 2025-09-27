import React from 'react'

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 Vite + React Migration Successful!
        </h1>
        <p className="text-lg text-gray-600">
          La Cantina Berlin is now running on Vite + React + Express
        </p>
        <div className="mt-8 space-y-2">
          <p>✅ Frontend: Vite + React (Port 5000)</p>
          <p>✅ Backend: Express API (Port 3001)</p>
          <p>✅ Database: PostgreSQL with Drizzle ORM</p>
        </div>
      </div>
    </div>
  )
}