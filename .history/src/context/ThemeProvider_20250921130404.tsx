'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';


// Tipe untuk nilai yang akan disediakan oleh context
type ThemeContextType = {
  theme: string;
  setTheme: (theme: Theme) => void; // Perbaikan ada di sini
};

// Membuat Context dengan nilai default
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props untuk Provider, 'children' adalah komponen yang akan dibungkus
type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  // State untuk menyimpan tema saat ini, defaultnya 'dark'
  const [theme, setTheme] = useState('dark');

  // useEffect untuk menangani perubahan pada elemen <html> dan localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Hapus class tema sebelumnya
    root.classList.remove('light', 'dark');
    
    // Tambahkan class tema yang sekarang
    root.classList.add(theme);
    
    // Simpan tema ke localStorage agar pilihan pengguna diingat
    localStorage.setItem('theme', theme);
  }, [theme]); // Efek ini akan berjalan setiap kali nilai 'theme' berubah

  // Fungsi untuk mengganti tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Nilai yang akan disediakan ke komponen anak
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook untuk mempermudah penggunaan context di komponen lain
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
