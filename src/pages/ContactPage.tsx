import React from 'react'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-12">
            Contact Us
          </h1>
          <div className="space-y-8">
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                Address
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Bleibtreustraße 49<br />
                10623 Berlin<br />
                Deutschland
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                Phone
              </h3>
              <p className="text-muted-foreground">
                +49 30 881 6562
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                Email
              </h3>
              <p className="text-muted-foreground">
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