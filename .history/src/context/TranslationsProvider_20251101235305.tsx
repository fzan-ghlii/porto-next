'use client';

import React, { createContext, useContext } from 'react';
import dlv from 'dlv'; // Kita perlu library kecil ini untuk mengambil nested key

// 1. Definisikan tipe rekursif untuk messages (menggantikan 'any')
type Messages = {
  [key: string]: string | Messages;
};

// 2. Buat Context dengan tipe yang benar
const TranslationsContext = createContext<Messages | null>(null);

// 3. Buat Provider
export function TranslationsProvider({
  children,
  messages
}: {
  children: React.ReactNode;
  messages: Messages; // <-- Gunakan tipe 'Messages' di sini
}) {
  return (
    <TranslationsContext.Provider value={messages}>
      {children}
    </TranslationsContext.Provider>
  );
}

// 4. Buat Hook kustom pengganti useTranslations
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