import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'id'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cek apakah pathname sudah memiliki prefix locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Jika tidak ada locale, redirect ke locale default
  // (Anda bisa menambahkan deteksi dari 'Accept-Language' di sini jika mau)
  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Hanya jalankan middleware untuk path yang tidak termasuk asset
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|cvpojan.pdf).*)']
};