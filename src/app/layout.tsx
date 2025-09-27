import './globals.css';

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
    <html data-scroll-behavior='smooth' suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        {/* Preload critical fonts */}
        <link
          rel='preload'
          href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&family=Dancing+Script:wght@400&display=swap'
          as='style'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&family=Dancing+Script:wght@400&display=swap'
          rel='stylesheet'
        />

        {/* DNS prefetch for other domains */}
        <link rel='dns-prefetch' href='//fonts.googleapis.com' />
        <link rel='dns-prefetch' href='//fonts.gstatic.com' />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
