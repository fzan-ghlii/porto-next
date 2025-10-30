import {createNavigation} from 'next-intl/navigation';
import {locales, defaultLocale} from './i18n';

export const {Link, getPathname, usePathname, useRouter} =
  createNavigation({
    locales,
    defaultLocale,
    // Kita set 'as-needed' di middleware,
    // tapi kita juga bisa menambahkannya di sini untuk konsistensi
    localePrefix: 'as-needed',
  });
