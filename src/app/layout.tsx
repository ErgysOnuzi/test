import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap'
});

const dancing = Dancing_Script({ 
  subsets: ['latin'], 
  variable: '--font-dancing',
  display: 'swap'
});

export const metadata = {
  title: 'La Cantina Berlin',
  description: 'Authentic Italian Restaurant in Berlin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-scroll-behavior='smooth' suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}