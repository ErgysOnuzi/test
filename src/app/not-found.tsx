'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl font-serif font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/de"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Zur Startseite
          </Link>
          
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Oder besuchen Sie unsere{' '}
              <Link href="/de/menu" className="text-primary hover:text-primary/80 underline">
                Speisekarte
              </Link>{' '}
              oder{' '}
              <Link href="/de/contact" className="text-primary hover:text-primary/80 underline">
                Kontakt
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}