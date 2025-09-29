import React, { useState, useEffect } from 'react'
import { Outlet, Link, useParams, useLocation } from 'react-router-dom'

export default function SimpleLayout() {
  const { locale } = useParams<{ locale: string }>()
  const location = useLocation()
  const currentLocale = locale || 'de'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isGerman = currentLocale === 'de'

  const navigation = [
    { name: isGerman ? 'Startseite' : 'Home', href: '', key: 'home' },
    { name: isGerman ? 'Speisekarte' : 'Menu', href: 'menu', key: 'menu' },
    { name: isGerman ? 'Galerie' : 'Gallery', href: 'gallery', key: 'gallery' },
    { name: isGerman ? 'Reservierungen' : 'Reservations', href: 'reservations', key: 'reservations' },
    { name: isGerman ? 'Veranstaltungen' : 'Events', href: 'events', key: 'events' },
    { name: isGerman ? 'Kontakt' : 'Contact', href: 'contact', key: 'contact' },
    { name: isGerman ? 'Feedback' : 'Feedback', href: 'feedback', key: 'feedback' },
    { name: isGerman ? 'Rechtliches' : 'Legal', href: 'legal', key: 'legal' },
    { name: 'Blog', href: 'blog', key: 'blog' },
    { name: 'Instagram', href: 'instagram', key: 'instagram' },
  ]

  const pathWithoutLocale = location.pathname.replace(`/${currentLocale}`, '') || ''

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className='bg-background/90 backdrop-blur-sm border-b sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo */}
            <div className='flex-shrink-0'>
              <Link
                to={`/${currentLocale}`}
                className='block'
              >
                <h1 className='text-2xl font-serif font-bold text-primary'>
                  La Cantina
                </h1>
                <p className='text-xs text-foreground/70 font-script'>Berlin</p>
              </Link>
            </div>

            {/* Right Side: Language Switcher + Hamburger */}
            <div className='flex items-center gap-4'>
              {/* Language Toggle */}
              <div className="flex items-center gap-2">
                <Link 
                  to={`/de${pathWithoutLocale}`}
                  className={`px-2 py-1 text-sm transition-colors ${currentLocale === 'de' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}
                >
                  DE
                </Link>
                <span className="text-muted-foreground">|</span>
                <Link 
                  to={`/en${pathWithoutLocale}`}
                  className={`px-2 py-1 text-sm transition-colors ${currentLocale === 'en' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}
                >
                  EN
                </Link>
              </div>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-foreground hover:text-primary transition-all duration-200 rounded-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Escape' && isMenuOpen) {
                    setIsMenuOpen(false)
                  }
                }}
              >
                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                  <span 
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-0'
                    }`}
                  />
                  <span 
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100 translate-y-1'
                    }`}
                  />
                  <span 
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-2'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Hamburger Navigation Panel */}
          {isMenuOpen && (
            <>
              {/* Backdrop Overlay */}
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
              />
              
              {/* Navigation Panel with Scrolling */}
              <div 
                className={`absolute top-full right-0 z-50 bg-background border border-border/50 shadow-xl rounded-lg min-w-64 max-w-sm w-full sm:w-auto max-h-[80vh] ${
                  // Mobile: Full width panel with height limit
                  'sm:max-w-sm'
                }`}
                role="menu"
                aria-orientation="vertical"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsMenuOpen(false)
                  }
                }}
              >
                {/* Scrollable Content Area */}
                <div className='p-4 overflow-y-auto max-h-[70vh]'>
                  <div className="grid gap-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.key}
                        to={`/${currentLocale}/${item.href}`}
                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                          pathWithoutLocale === `/${item.href}` || (item.href === '' && pathWithoutLocale === '')
                            ? 'text-primary bg-primary/10 border border-primary/20'
                            : 'text-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                        role="menuitem"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Fixed CTA at Bottom */}
                <div className="p-4 border-t border-border/50 bg-background/95 backdrop-blur-sm rounded-b-lg">
                  <Link 
                    to={`/${currentLocale}/reservations`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-lg font-medium transition-colors">
                      {isGerman ? 'Tisch Reservieren' : 'Make Reservation'}
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
      
      {/* Click outside handler for menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-card border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-serif font-semibold text-primary mb-4">La Cantina Berlin</h3>
              <p className="text-muted-foreground mb-2">Bleibtreustraße 49</p>
              <p className="text-muted-foreground mb-2">10623 Berlin</p>
              <p className="text-muted-foreground">Deutschland</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{isGerman ? 'Kontakt' : 'Contact'}</h4>
              <p className="text-muted-foreground mb-2">+49 30 881 6562</p>
              <p className="text-muted-foreground">info@lacantina-berlin.de</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{isGerman ? 'Öffnungszeiten' : 'Opening Hours'}</h4>
              <p className="text-muted-foreground mb-2">{isGerman ? 'Montag - Samstag: 15:00 - 23:00' : 'Monday - Saturday: 15:00 - 23:00'}</p>
              <p className="text-muted-foreground">{isGerman ? 'Sonntag: Geschlossen' : 'Sunday: Closed'}</p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 La Cantina Berlin. {isGerman ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}