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

  // Edge Geolocation Enrichment from Vercel
  const country = request.headers.get('x-vercel-ip-country') || (request as any).geo?.country || '';
  const city = request.headers.get('x-vercel-ip-city') || (request as any).geo?.city || '';

  // If visiting a language root like /en, /es, /nl, /de, /fr, /pt, route to Swiss B2B advisory with lang param
  const isLanguageRoot = validLocales.some((locale) => pathname === `/${locale}`);
  if (isLanguageRoot) {
    const locale = pathname.slice(1);
    const search = request.nextUrl.search;
    const queryJoin = search ? (search.startsWith('?') ? '&' + search.slice(1) : '&' + search) : '';
    const newUrl = new URL(`/?lang=${locale}${queryJoin}`, request.url);
    const redirectResponse = NextResponse.redirect(newUrl);
    if (country) {
      redirectResponse.cookies.set('geo_country', country, { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
    }
    if (city) {
      redirectResponse.cookies.set('geo_city', encodeURIComponent(city), { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
    }
    return redirectResponse;
  }

  // Check if pathname starts with a valid locale subpath (e.g. /es/skills)
  const pathnameHasLocale = validLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    if (country && !request.cookies.get('geo_country')) {
      response.cookies.set('geo_country', country, { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
    }
    if (city && !request.cookies.get('geo_city')) {
      response.cookies.set('geo_city', encodeURIComponent(city), { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
    }
    return response;
  }

  // Allow root '/' to serve the Swiss Industrial Precision B2B Advisory landing page directly
  if (pathname === '/') {
    const response = NextResponse.next();
    if (country && !request.cookies.get('geo_country')) {
      response.cookies.set('geo_country', country, { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
    }
    if (city && !request.cookies.get('geo_city')) {
      response.cookies.set('geo_city', encodeURIComponent(city), { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
    }
    return response;
  }

  // For other unlocalized routes, determine preferred language from headers or default to 'es'
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
    `/${targetLocale}${pathname}${request.nextUrl.search}`,
    request.url
  );
  const redirectResponse = NextResponse.redirect(newUrl);
  if (country) {
    redirectResponse.cookies.set('geo_country', country, { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
  }
  if (city) {
    redirectResponse.cookies.set('geo_city', encodeURIComponent(city), { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
  }
  return redirectResponse;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
