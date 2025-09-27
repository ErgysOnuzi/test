export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}