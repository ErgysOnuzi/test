export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}