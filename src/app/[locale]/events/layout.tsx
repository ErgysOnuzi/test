export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}