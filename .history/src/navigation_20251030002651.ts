import {createLocalizedNavigation} from 'next-intl/navigation';
import {locales, defaultLocale} from './i18n';

export const {Link, getPathname, usePathname, useRouter} =
  createLocalizedNavigation({
    locales,
    defaultLocale,
    // Kita set 'as-needed' di middleware,
    // tapi kita juga bisa menambahkannya di sini untuk konsistensi
    localePrefix: 'as-needed',
  });
