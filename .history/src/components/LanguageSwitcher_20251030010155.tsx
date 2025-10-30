'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
// PERBAIKAN 1: Impor dari 'navigation.ts' yang kita buat
import { usePathname, useRouter, locales } from '@/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, X } from 'lucide-react';
// PERBAIKAN 2: Hapus impor dari '@i18n' karena sudah ada di atas
// import { locales } from '@/i18n'; // <-- INI YANG MENYEBABKAN BUILD ERROR

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    // Ganti locale sambil tetap di halaman yang sama
    router.replace(pathname, { locale: newLocale, scroll: false });
    setIsOpen(false);
  };

  const getLanguageName = (loc: string) => {
    switch (loc) {
      case 'en':
        return 'English';
      case 'id':
        return 'Indonesia';
      default:
        return loc;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-36 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
          >
            <ul className="py-1">
              {locales.map((loc) (
                <li key={loc}>
                  <button
                    onClick={() => handleLanguageChange(loc)}
                    disabled={locale === loc}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      locale === loc
                        ? 'font-bold text-primary'
                        : 'text-foreground hover:bg-border'
                    } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                  >
                    {getLanguageName(loc)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full shadow-lg"
        aria-label="Toggle language menu"
      >
        {isOpen ? <X size={24} /> : <Globe size={24} />}
      </motion.button>
    </div>
  );
}

