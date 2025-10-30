import {getRequestConfig} from 'next-intl/server';
 
export const locales = ['en', 'id'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({locale}) => {
  // Validasi locale
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
