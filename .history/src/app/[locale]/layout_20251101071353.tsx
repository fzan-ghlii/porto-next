import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// PERBAIKAN 1: Terima 'params' sebagai objek utuh, jangan destructure 'locale' di sini.
export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  // PERBAIKAN 2: Akses 'locale' dari 'params' di DALAM fungsi.
  // Ini akan menyelesaikan error "params should be awaited".
  const locale = params.locale;

  // Baris ini akan memuat pesan.
  // Jika ini masih error, itu karena Langkah 2 di bawah belum selesai.
  const messages = await getMessages({locale});

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