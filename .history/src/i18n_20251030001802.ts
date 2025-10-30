import {getRequestConfig} from 'next-intl/server';
 
export const locales = ['en', 'id'];
export const defaultLocale = 'en';

// Biarkan TypeScript menangani tipe 'locale' (string | undefined)
export default getRequestConfig(async ({locale}) => {
  
  // PERBAIKAN SEBENARNYA:
  // Validasi 'locale'. Jika 'locale' adalah 'undefined' (tidak ada) 
  // ATAU 'locale' tidak ada di dalam daftar 'locales' kita,
  // maka kita paksa gunakan 'defaultLocale'.
  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

