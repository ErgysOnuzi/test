import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className='min-h-screen flex items-center justify-center px-6 bg-background text-foreground'>
      <div className='text-center max-w-md mx-auto'>
        <h1 className='text-8xl font-serif font-bold text-primary mb-4'>404</h1>
        <h2 className='text-3xl font-serif font-semibold mb-4'>
          Seite nicht gefunden
        </h2>
        <p className='text-muted-foreground text-lg leading-relaxed mb-8'>
          Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
        </p>
        <Link
          href='/de'
          className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium'
        >
          <Home className='w-4 h-4' />
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
