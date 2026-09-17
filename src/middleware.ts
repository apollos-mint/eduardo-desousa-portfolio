import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validLocales, defaultLocale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static files, images, api, metadata routes, and next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/opengraph-image') ||
    pathname.startsWith('/twitter-image') ||
    pathname.startsWith('/icon') ||
    pathname.startsWith('/apple-icon')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a valid locale
  const pathnameHasLocale = validLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // If visiting the root '/', determine preferred language from headers or default to 'es'
  let targetLocale = defaultLocale;
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLanguages = acceptLanguage
      .split(',')
      .map((l) => l.split(';')[0].trim().toLowerCase().slice(0, 2));

    for (const pref of preferredLanguages) {
      if (validLocales.includes(pref as any)) {
        targetLocale = pref as any;
        break;
      }
    }
  }

  // Preserve search parameters (UTM tags, ref query strings, etc.)
  const newUrl = new URL(
    `/${targetLocale}${pathname === '/' ? '' : pathname}${request.nextUrl.search}`,
    request.url
  );
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
