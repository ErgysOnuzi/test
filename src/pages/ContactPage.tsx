import React from 'react'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px 16px 32px', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '48px' 
      }}>
        <div>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#111827', 
            marginBottom: '24px',
            margin: '0 0 24px 0'
          }}>
            Contact Us
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: '#111827'
              }}>
                Address
              </h3>
              <p style={{ 
                color: '#4B5563', 
                margin: 0,
                lineHeight: '1.6'
              }}>
                Bleibtreustraße 49<br />
                10623 Berlin<br />
                Deutschland
              </p>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: '#111827'
              }}>
                Phone
              </h3>
              <p style={{ 
                color: '#4B5563',
                margin: 0
              }}>
                +49 30 881 6562
              </p>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: '#111827'
              }}>
                Email
              </h3>
              <p style={{ 
                color: '#4B5563',
                margin: 0
              }}>
                info@lacantina-berlin.de
              </p>
            </div>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}