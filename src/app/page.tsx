import { redirect } from 'next/navigation';

/**
 * Root page that redirects users from base URL to default locale
 * This ensures users visiting "/" are automatically redirected to "/de"
 */
export default function RootPage() {
  // Redirect to German locale as the default
  redirect('/de');
}