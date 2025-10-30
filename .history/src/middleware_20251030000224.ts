import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Daftar semua bahasa yang didukung
  locales: locales,
 
  // Bahasa default
  defaultLocale: defaultLocale,
  
  // Opsi ini akan membuat URL tidak menampilkan /en
  // /en/about -> /about
  // /id/about -> /id/about
  localePrefix: 'as-needed'
});
 
export const config = {
  // Hanya jalankan middleware untuk path yang tidak termasuk asset
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|cvpojan.pdf).*)']
};
