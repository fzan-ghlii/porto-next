import { NextIntlClientProvider } from 'next-intl';
// PERBAIKAN DI SINI:
// Hapus {locale} dari parameter getMessages
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Layout ini akan menerima 'locale' dari URL
export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  // KITA PINDAHKAN LOGIKA INI KE SINI
  // PERBAIKAN DI SINI:
  // Panggil getMessages() tanpa argumen.
  // Ia akan secara otomatis menemukan 'locale' dari request.
  const messages = await getMessages();

  return (
    // 'NextIntlClientProvider' sekarang membungkus 'ThemeProvider'
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