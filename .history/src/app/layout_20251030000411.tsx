import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeProvider";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Impor komponen baru kita
import LanguageSwitcher from "@/components/LanguageSwitcher";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Fauzan Al Gholi | Portfolio",
  description: "Personal portfolio of Fauzan Al Gholi, a digital business student.",
};

export default async function RootLayout({
  children,
  params: { locale } 
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${poppins.variable} font-sans`} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="fauzan-portfolio-theme"
          >
            <Header />
            {children}
            <LanguageSwitcher /> {/* Tambahkan di sini */}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

