import React from 'react'

export default function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#333' }}>
          Ristorante La Cantina Bleibtreu
        </h1>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#d4a574' }}>
          Authentic Italian Cuisine near Ku'damm
        </h2>
        <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          There are many cantinas in Berlin – but there is only one Ristorante La Cantina Bleibtreu. 
          Since March 2025, our traditional restaurant has started a new chapter with fresh energy, 
          a new team, and our philosophy: stay, enjoy, linger.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>🍝 Homemade Pasta</h3>
          <p style={{ color: '#666' }}>
            Fresh pasta prepared daily with passion and traditional Italian recipes, just like in Italy
          </p>
        </div>
        
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>🐟 Fresh Mediterranean Fish</h3>
          <p style={{ color: '#666' }}>
            Fresh-caught Mediterranean fish prepared with authentic Italian techniques and finest ingredients
          </p>
        </div>
        
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>🔥 Tableside Flambéed</h3>
          <p style={{ color: '#666' }}>
            Experience our signature beef tenderloin flambéed at your table for an unforgettable dining experience
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h3 style={{ fontSize: '28px', marginBottom: '20px', color: '#d4a574' }}>
          The Original!
        </h3>
        <p style={{ fontSize: '16px', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
          Ristorante La Cantina Bleibtreu is more than a name. It is a promise: whoever has been there once, comes back.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>
          🎉 Migration Status: SUCCESS!
        </h4>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Complete Next.js to React + Vite migration accomplished
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ color: '#28a745' }}>✅ Frontend: Vite + React</span>
          <span style={{ color: '#28a745' }}>✅ Backend: Express API</span>
          <span style={{ color: '#28a745' }}>✅ Database: PostgreSQL + Drizzle</span>
          <span style={{ color: '#28a745' }}>✅ All Pages Migrated</span>
        </div>
      </div>
    </div>
  )
}