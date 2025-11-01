import { NextIntlClientProvider } from 'next-intl';
// Impor getMessages dari 'next-intl/server'
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  // Baris ini sudah benar, dan akan berfungsi setelah alias tsconfig diatur
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