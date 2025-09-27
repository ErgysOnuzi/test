import React from 'react'
import { useParams } from 'react-router-dom'
import Hero from '@/components/Hero'

export default function HomePage() {
  const { locale } = useParams<{ locale: string }>()
  const currentLocale = locale || 'de'
  const isGerman = currentLocale === 'de'

  return (
    <>
      <Hero />
      
      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {isGerman ? 'Das Original!' : 'The Original!'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {isGerman 
                ? 'Es gibt viele Cantinas in Berlin – aber es gibt nur ein Ristorante La Cantina Bleibtreu. Seit März 2025 hat unser traditionelles Restaurant ein neues Kapitel mit frischer Energie, einem neuen Team und unserer Philosophie begonnen: bleiben, genießen, verweilen.'
                : 'There are many cantinas in Berlin – but there is only one Ristorante La Cantina Bleibtreu. Since March 2025, our traditional restaurant has started a new chapter with fresh energy, a new team, and our philosophy: stay, enjoy, linger.'}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="text-4xl mb-4">🍝</div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {isGerman ? 'Hausgemachte Pasta' : 'Homemade Pasta'}
              </h3>
              <p className="text-muted-foreground">
                {isGerman
                  ? 'Täglich frisch zubereitete Pasta mit Leidenschaft und traditionellen italienischen Rezepten, genau wie in Italien'
                  : 'Fresh pasta prepared daily with passion and traditional Italian recipes, just like in Italy'}
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="text-4xl mb-4">🐟</div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {isGerman ? 'Frischer Mittelmeerfisch' : 'Fresh Mediterranean Fish'}
              </h3>
              <p className="text-muted-foreground">
                {isGerman
                  ? 'Frisch gefangener Mittelmeerfisch, zubereitet mit authentischen italienischen Techniken und feinsten Zutaten'
                  : 'Fresh-caught Mediterranean fish prepared with authentic Italian techniques and finest ingredients'}
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {isGerman ? 'Flambiert am Tisch' : 'Tableside Flambéed'}
              </h3>
              <p className="text-muted-foreground">
                {isGerman
                  ? 'Erleben Sie unser charakteristisches Rinderfilet, das direkt an Ihrem Tisch flambiert wird – für ein unvergessliches Erlebnis'
                  : 'Experience our signature beef tenderloin flambéed at your table for an unforgettable dining experience'}
              </p>
            </div>
          </div>

          {/* Promise Section */}
          <div className="text-center bg-card rounded-lg p-8 border">
            <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
              {isGerman ? 'Unser Versprechen' : 'Our Promise'}
            </h3>
            <p className="text-lg text-muted-foreground">
              {isGerman
                ? 'Ristorante La Cantina Bleibtreu ist mehr als ein Name. Es ist ein Versprechen: Wer einmal da war, kommt wieder.'
                : 'Ristorante La Cantina Bleibtreu is more than a name. It is a promise: whoever has been there once, comes back.'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}