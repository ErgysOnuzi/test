export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}