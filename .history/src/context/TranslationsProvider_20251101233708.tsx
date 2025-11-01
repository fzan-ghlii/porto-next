'use client';

import React, { createContext, useContext } from 'react';
import dlv from 'dlv'; // Kita perlu library kecil ini untuk mengambil nested key

// 1. Buat Context
const TranslationsContext = createContext<Record<string, any> | null>(null);

// 2. Buat Provider
export function TranslationsProvider({
  children,
  messages
}: {
  children: React.ReactNode;
  messages: Record<string, any>;
}) {
  return (
    <TranslationsContext.Provider value={messages}>
      {children}
    </TranslationsContext.Provider>
  );
}

// 3. Buat Hook kustom pengganti useTranslations
export function useTranslations(namespace: string) {
  const messages = useContext(TranslationsContext);

  if (!messages) {
    throw new Error('useTranslations must be used within a TranslationsProvider');
  }

  // Fungsi 't' (translate)
  const t = (key: string): string => {
    // dlv(obj, 'key.nested') aman dan mengembalikan undefined jika tidak ada
    const translation = dlv(messages, `${namespace}.${key}`) as string | undefined;
    
    // Jika tidak ditemukan, kembalikan key-nya agar mudah di-debug
    return translation || `${namespace}.${key}`;
  };

  return t;
}

// Kita juga butuh 'dlv' untuk mengakses nested key (e.g., "HomePage.greeting")
// Jalankan di terminal: npm install dlv