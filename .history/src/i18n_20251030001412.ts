import {getRequestConfig} from 'next-intl/server';
 
export const locales = ['en', 'id'];
export const defaultLocale = 'en';

// PERBAIKAN 1: Tambahkan tipe '{locale: string}'
export default getRequestConfig(async ({localeocale}: {locale: string}) => {
  
  // PERBAIKAN 2: Hapus 'as any'
  if (!locales.includes(locale)) {
    locale = defaultLocale; // PERBAIKAN 3: Pastikan ini 'locale' (huruf kecil)
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

