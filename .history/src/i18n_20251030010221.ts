import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from './navigation'; // Impor dari navigation.ts
 
// PERBAIKAN: Destructure 'locale' dari OBJEK parameter {locale}
export default getRequestConfig(async ({locale}) => {
  // Validasi locale
  // 'locale' di sini dijamin string, jadi kita bisa pakai 'as any'
  // untuk mencocokkan dengan type readonly dari 'locales'
  if (!locales.includes(locale as loc)) {
    notFound();
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

