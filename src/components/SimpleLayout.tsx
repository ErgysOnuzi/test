import React, { useState, useTransition, useEffect } from 'react'
import { Outlet, Link, useParams, useLocation } from 'react-router-dom'

export default function SimpleLayout() {
  const { locale } = useParams<{ locale: string }>()
  const location = useLocation()
  const currentLocale = locale || 'de'
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

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

  // Close mobile menu on route change
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

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex xl:space-x-8 lg:space-x-6 flex-wrap' role="navigation" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={`/${currentLocale}/${item.href}`}
                  className={`text-foreground hover:text-primary transition-colors duration-200 ${
                    pathWithoutLocale === `/${item.href}` || (item.href === '' && pathWithoutLocale === '')
                      ? 'text-primary font-medium'
                      : ''
                  } ${isPending ? 'opacity-50' : ''}`}
                  onClick={() => startTransition(() => {})}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Tablet Navigation - Simplified */}
            <nav className='hidden md:flex lg:hidden space-x-4 text-sm' role="navigation" aria-label="Main navigation">
              {navigation.slice(0, 5).map((item) => (
                <Link
                  key={item.name}
                  to={`/${currentLocale}/${item.href}`}
                  className={`text-foreground hover:text-primary transition-colors duration-200 ${
                    pathWithoutLocale === `/${item.href}` || (item.href === '' && pathWithoutLocale === '')
                      ? 'text-primary font-medium'
                      : ''
                  } ${isPending ? 'opacity-50' : ''}`}
                  onClick={() => startTransition(() => {})}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA & Language Toggle */}
            <div className='hidden lg:flex items-center gap-4'>
              <div className="flex items-center gap-2">
                <Link 
                  to="/de" 
                  className={`px-2 py-1 text-sm transition-colors ${currentLocale === 'de' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}
                >
                  DE
                </Link>
                <span className="text-muted-foreground">|</span>
                <Link 
                  to="/en" 
                  className={`px-2 py-1 text-sm transition-colors ${currentLocale === 'en' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}
                >
                  EN
                </Link>
              </div>
              <Link to={`/${currentLocale}/reservations`}>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors">
                  {isGerman ? 'Reservieren' : 'Reserve'}
                </button>
              </Link>
            </div>

            {/* Tablet CTA & Language Toggle */}
            <div className='hidden md:flex lg:hidden items-center gap-2'>
              <div className="flex items-center gap-1">
                <Link 
                  to="/de" 
                  className={`px-1 py-1 text-xs transition-colors ${currentLocale === 'de' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}
                >
                  DE
                </Link>
                <span className="text-muted-foreground text-xs">|</span>
                <Link 
                  to="/en" 
                  className={`px-1 py-1 text-xs transition-colors ${currentLocale === 'en' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}
                >
                  EN
                </Link>
              </div>
              <Link to={`/${currentLocale}/reservations`}>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 rounded text-sm font-medium transition-colors">
                  {isGerman ? 'Reservieren' : 'Reserve'}
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden flex items-center gap-2'>
              <div className="flex items-center gap-2">
                <Link 
                  to="/de" 
                  className={`px-2 py-1 text-sm transition-colors ${currentLocale === 'de' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}
                >
                  DE
                </Link>
                <span className="text-muted-foreground">|</span>
                <Link 
                  to="/en" 
                  className={`px-2 py-1 text-sm transition-colors ${currentLocale === 'en' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}`}
                >
                  EN
                </Link>
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 text-foreground hover:text-primary transition-all duration-200 rounded-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onKeyDown={(e) => {
                  if (e.key === 'Escape' && isMenuOpen) {
                    setIsMenuOpen(false)
                  }
                }}
              >
                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                  <span 
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-0'}`}
                  />
                  <span 
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100 translate-y-1'}`}
                  />
                  <span 
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-2'}`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div 
            id="mobile-menu"
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
            aria-hidden={!isMenuOpen}
          >
            {/* Overlay */}
            {isMenuOpen && (
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" 
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
              />
            )}
            <div className='relative z-50 bg-background border-t shadow-lg'>
              <div className='px-4 pt-4 pb-6 space-y-2'>
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={`/${currentLocale}/${item.href}`}
                    className={`block px-4 py-3 text-lg font-medium transition-all duration-200 rounded-lg touch-manipulation ${
                      pathWithoutLocale === `/${item.href}` || (item.href === '' && pathWithoutLocale === '')
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:text-primary hover:bg-primary/5 active:bg-primary/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsMenuOpen(false)
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-4 py-4 border-t border-border/50 mt-4">
                  <Link to={`/${currentLocale}/reservations`}>
                    <button className="w-full bg-primary hover:bg-primary/90 active:bg-primary/95 text-primary-foreground px-6 py-4 rounded-lg font-medium text-lg transition-all duration-200 touch-manipulation shadow-sm hover:shadow-md">
                      {isGerman ? 'Reservieren' : 'Reserve'}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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