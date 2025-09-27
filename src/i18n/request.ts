import { getRequestConfig } from 'next-intl/server';
import { locales } from './routing';
 
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
 
  if (!locale || !locales.includes(locale as any)) {
    locale = 'de';
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});