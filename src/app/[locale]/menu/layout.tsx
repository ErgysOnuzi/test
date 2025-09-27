export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}