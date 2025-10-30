import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Fauzan Al Gholi | Portfolio",
  description: "Personal portfolio of Fauzan Al Gholi, a digital business student.",
};

// Root layout ini sekarang sangat sederhana
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'lang' akan di-set oleh layout di dalam [locale]
    // Kita set default 'en' di sini
    <html lang="en" className={`${poppins.variable} font-sans`} suppressHydrationWarning>
      <body>
        {/* Tidak ada provider, tidak ada header. Hanya children. */}
        {children}
      </body>
    </html>
  );
}

