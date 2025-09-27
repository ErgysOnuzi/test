export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}