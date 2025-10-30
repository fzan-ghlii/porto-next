import {notFound} from 'next/navigation'; // PERBAIKAN 1: Import notFound
import {getRequestConfig} from 'next-intl/server';
import {locales} from './navigation'; // PERBAIKAN 2: Impor dari navigation.ts

export default getRequestConfig(async ({locale}) => {
  // Validasi locale
  const baseLocale = new Intl.Locale(locale).baseName;
  if (!locales.includes(baseLocale as any)) {
    notFound(); // PERBAIKAN 3: Gunakan notFound()
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

