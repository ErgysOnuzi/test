import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Hero() {
  const { locale } = useParams<{ locale: string }>()
  const currentLocale = locale || 'de'

  const isGerman = currentLocale === 'de'

  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <img
          src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070'
          alt='Elegant restaurant interior with warm lighting and traditional Italian atmosphere'
          className='absolute inset-0 w-full h-full object-cover object-center'
        />
        {/* Dark wash overlay for text readability */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50' />
      </div>

      {/* Content */}
      <div className='relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='hero-title font-serif font-bold mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
          {isGerman ? 'Ristorante La Cantina Bleibtreu' : 'La Cantina Berlin'}
        </h1>
        <p className='text-xl md:text-2xl mb-4 font-script'>
          {isGerman ? 'Authentische italienische Küche in Berlin' : 'Authentic Italian Cuisine near Ku\'damm'}
        </p>
        <p className='text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
          {isGerman 
            ? 'Erleben Sie traditionelle Aromen im Herzen Berlins. Seit März 2025 mit frischer Energie und unserem Motto: bleiben, genießen, verweilen.' 
            : 'Experience traditional flavors in the heart of Berlin. Since March 2025 with fresh energy and our philosophy: stay, enjoy, linger.'}
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link to={`/${currentLocale}/reservations`}>
            <button className='px-8 py-3 text-lg border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 rounded-md font-medium'>
              {isGerman ? 'Tisch Reservieren' : 'Make Reservation'}
            </button>
          </Link>
          <Link to={`/${currentLocale}/menu`}>
            <button className='border-white/80 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm px-8 py-3 text-lg border-2 hover:border-white rounded-md font-medium transition-colors duration-200'>
              {isGerman ? 'Speisekarte Ansehen' : 'View Menu'}
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce'>
        <div className='w-6 h-10 border-2 border-white rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-white rounded-full mt-2'></div>
        </div>
      </div>
    </section>
  )
}