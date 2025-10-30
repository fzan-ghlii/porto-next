import {createLocalizedNavigation} from 'next-intl/navigation';

// PERBAIKAN 1: Definisikan locales di sini
export const locales = ['en', 'id'] as const;
export const defaultLocale = 'en';

// PERBAIKAN 2: Gunakan `createNavigation` (sesuai build error sebelumnya)
export const {Link, getPathname, usePathname, useRouter} = createLocalizedNavigation({
  locales,
  defaultLocale
});

