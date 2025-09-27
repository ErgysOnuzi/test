export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}