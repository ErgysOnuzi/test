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
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}