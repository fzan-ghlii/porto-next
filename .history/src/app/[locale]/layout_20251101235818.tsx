// 1. Hapus semua import 'next-intl'
import { TranslationsProvider } from '@/context/TranslationsProvider';
import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// 2. Buat fungsi sederhana untuk memuat JSON secara manual
async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Could not load messages:', error);
    // Kembalikan objek kosong jika file tidak ditemukan
    return {};
  }
}

// PERBAIKAN 1: Terima 'params' sebagai objek utuh
export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  // PERBAIKAN 2: Ambil 'locale' DARI DALAM body fungsi
  const locale = params.locale;

  // 4. Panggil fungsi loader kita
  const messages = await getMessages(locale);

  return (
    // 5. Gunakan Provider baru kita
    <TranslationsProvider messages={messages}>
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
    </TranslationsProvider>
  );
}