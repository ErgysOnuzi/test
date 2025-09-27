import './globals.css';

export const metadata = {
  title: 'Ristorante La Cantina Bleibtreu - Italienische Küche nahe Ku\'damm',
  description: 'Ristorante La Cantina Bleibtreu - Authentische italienische Küche in Berlin. Bleiben, genießen, verweilen.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}