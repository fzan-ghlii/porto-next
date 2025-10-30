'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipe untuk tema yang diizinkan
type Theme = 'light' | 'dark';

// Tipe untuk nilai yang akan disediakan oleh Context
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void; // Perbaikan ada di sini
};

// Membuat Context dengan nilai default (yang akan menyebabkan error jika digunakan tanpa Provider)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props untuk Provider
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Cek localStorage saat komponen pertama kali dirender
    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      return (storedTheme as Theme) || defaultTheme;
    } catch (e) {
      // Jika localStorage tidak tersedia (misal di server), gunakan default
      return defaultTheme;
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook untuk menggunakan context dengan lebih mudah dan aman
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

