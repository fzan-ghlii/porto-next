import { NextIntlClientProvider } from 'next-intl';
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
  // Sekarang 'getMessages' dipanggil dengan 'locale' yang valid
  const messages = await getMessages({locale});

  return (
    // 'NextIntlClientProvider' sekarang membungkus 'ThemeProvider'
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        // PERBAIKAN: Hapus 'attribute="class"' dan 'enableSystem'
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

