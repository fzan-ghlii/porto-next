// File: src/app/[locale]/layout.tsx

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// PERBAIKAN 1: Terima 'params' sebagai objek utuh
export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  // PERBAIKAN 2: Ambil 'locale' di dalam fungsi
  const locale = params.locale;

  // Sekarang 'getMessages' akan secara otomatis menemukan
  // file 'next-intl.config.ts' di root.
  const messages = await getMessages({locale});

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="fauzan-portfolio-theme"
      >
        <Header />
        <main>
          {children}
        </main>
        <LanguageSwitcher />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}