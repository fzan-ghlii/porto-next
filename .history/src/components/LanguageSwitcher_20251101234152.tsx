'use client';

import { useState } from 'react';
// PERBAIKAN IMPORT: Gunakan 'next/navigation'
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; // <-- Import useParams
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, X } from 'lucide-react';

// Definisikan locales di sini secara manual
const locales = ['en', 'id'];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Ini akan mengembalikan /en/about
  const params = useParams(); // Ini akan memberi kita { locale: 'en' }
  
  // Dapatkan locale saat ini dari params
  const locale = params.locale as string || 'en';

  const handleLanguageChange = (newLocale: string) => {
    // Buat path baru secara manual
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    
    router.replace(newPath);
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
              {/* Ini sekarang sudah benar */}
              {locales.map((loc) => (
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