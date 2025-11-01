// File: next-intl.config.ts (di folder root)

import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from './src/navigation'; // <-- PERBARUI PATH INI

export default getRequestConfig(async ({locale}) => {
  // Validasi locale
  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }
 
  return {
    // PERBARUI PATH INI untuk menambahkan 'src'
    messages: (await import(`./src/messages/${locale}.json`)).default
  };
});