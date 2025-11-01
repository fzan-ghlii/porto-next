import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from './navigation'; // Impor dari navigation.ts
 
export default getRequestConfig(async ({locale}) => {
  // Validasi locale
  
  // PERBAIKAN:
  // Kita ubah `locales as any` menjadi `(locales as readonly string[])`.
  // Ini memberi tahu TypeScript agar memperlakukan 'locales' sebagai
  // array string biasa saat memanggil `.includes()`,
  // sehingga cocok dengan tipe 'locale' (string).
  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});