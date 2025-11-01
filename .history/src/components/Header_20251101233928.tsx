'use client';

import { useState, useEffect } from 'react';
// PERBAIKAN IMPORT: Gunakan 'next/link' dan 'next/navigation'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeProvider';
// PERBAIKAN IMPORT: Gunakan hook kustom kita
import { useTranslations } from '@/context/TranslationsProvider';
export default function Header() {
  const t = useTranslations('Navigation'); // Inisialisasi terjemahan

  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // Sekarang dari @/navigation

  // Daftar link navigasi
  // Sekarang kita ambil label dari kamus 't'
  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/experience', label: t('experience') },
    { href: '/skills', label: t('skills') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/contact', label: t('contact') },
  ];

  // Efek untuk deteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk mengganti tema
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  // Fungsi untuk menutup menu mobile
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between p-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-foreground shrink-0">
          Fauzan Al Gholi
        </Link>

        {/* Grup Kanan: Menu Desktop + Aksi */}
        <div className="hidden md:flex items-center space-x-8">
            {/* Menu Desktop */}
            <ul className="flex items-center space-x-8">
                {navLinks.map((link) => (
                    <li key={link.href}>
                    {/* Gunakan 'Link' dari @/navigation */}
                    <Link
                        href={link.href}
                        className={`relative font-medium transition-colors duration-300 hover:text-primary ${
                        // 'pathname' sekarang adalah / atau /about, jadi perbandingannya akurat
                        pathname === link.href ? 'text-primary' : 'text-foreground'
                        }`}
                    >
                        {link.label}
                        {pathname === link.href && (
                        <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-primary"></span>
                        )}
                    </Link>
                    </li>
                ))}
            </ul>
        
            {/* Theme Toggle Switch */}
            <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <label className="relative inline-block w-12 h-6 cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="opacity-0 w-0 h-0"
                        checked={theme === 'dark'}
                        onChange={handleThemeChange}
                    />
                    <span className="absolute top-0 left-0 right-0 bottom-0 bg-secondary/30 dark:bg-primary rounded-full transition-colors duration-300
                    before:content-[''] before:absolute before:w-4 before:h-4 before:bottom-1 before:left-1
                    before:bg-white before:rounded-full before:transition-transform before:duration-300
                    dark:before:translate-x-6"></span>
                </label>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </div>
        </div>
           
        {/* Tombol Hamburger (hanya untuk mobile) */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 p-2"
            aria-label="Toggle menu"
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Mobile (Slide dari Kanan) */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-2/3 max-w-sm bg-background/95 backdrop-blur-lg shadow-lg
          transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <ul className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`text-2xl font-semibold transition-colors duration-300 hover:text-primary ${
                    pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Theme Toggle di Menu Mobile */}
            <li className='absolute bottom-10'>
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="opacity-0 w-0 h-0"
                            checked={theme === 'dark'}
                            onChange={handleThemeChange}
                        />
                        <span className="absolute top-0 left-0 right-0 bottom-0 bg-secondary/30 dark:bg-primary rounded-full transition-colors duration-300
                        before:content-[''] before:absolute before:w-4 before:h-4 before:bottom-1 before:left-1
                        before:bg-white before:rounded-full before:transition-transform before:duration-300
                        dark:before:translate-x-6"></span>
                    </label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

