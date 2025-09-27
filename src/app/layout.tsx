import './globals.css';
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  variable: '--font-inter' 
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  display: 'swap',
  variable: '--font-playfair' 
});

const dancing = Dancing_Script({ 
  subsets: ['latin'], 
  display: 'swap',
  variable: '--font-dancing' 
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
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
