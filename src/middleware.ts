import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validLocales, defaultLocale } from '@/lib/i18n';

// Parse Accept-Language header from client's browser/device and match with supported locales
function getPreferredLocale(request: NextRequest): string {
  // 1. Check if user already has an explicit saved preference in cookie
  const cookieLang = request.cookies.get('preferred_lang')?.value;
  if (cookieLang && validLocales.includes(cookieLang as any)) {
    return cookieLang;
  }

  // 2. Parse Accept-Language header from client's browser/device
  const acceptLang = request.headers.get('accept-language');
  if (acceptLang) {
    const parts = acceptLang.split(',').map((part) => {
      const [langCode, qPart] = part.trim().split(';');
      const q = qPart ? parseFloat(qPart.replace('q=', '')) || 0 : 1.0;
      return { code: langCode.trim().toLowerCase(), q };
    });
    // Sort descending by q weight
    parts.sort((a, b) => b.q - a.q);
    for (const item of parts) {
      const primary = item.code.split('-')[0];
      if (validLocales.includes(primary as any)) {
        return primary;
      }
    }
  }

  // 3. Default fallback for international visitors
  return 'en';
}

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
    redirectResponse.cookies.set('preferred_lang', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
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

  // Handle root '/' path: detect device language if ?lang is missing
  if (pathname === '/') {
    const hasLangParam = request.nextUrl.searchParams.has('lang');
    const paramLang = request.nextUrl.searchParams.get('lang');

    if (!hasLangParam) {
      const detectedLocale = getPreferredLocale(request);
      const search = request.nextUrl.search;
      const queryJoin = search ? (search.startsWith('?') ? '&' + search.slice(1) : '&' + search) : '';
      const newUrl = new URL(`/?lang=${detectedLocale}${queryJoin}`, request.url);
      const redirectResponse = NextResponse.redirect(newUrl);

      // Persist detected language in cookie
      redirectResponse.cookies.set('preferred_lang', detectedLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
      if (country) {
        redirectResponse.cookies.set('geo_country', country, { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
      }
      if (city) {
        redirectResponse.cookies.set('geo_city', encodeURIComponent(city), { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
      }
      return redirectResponse;
    }

    const response = NextResponse.next();
    if (paramLang && validLocales.includes(paramLang as any)) {
      response.cookies.set('preferred_lang', paramLang, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
    }
    if (country && !request.cookies.get('geo_country')) {
      response.cookies.set('geo_country', country, { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
    }
    if (city && !request.cookies.get('geo_city')) {
      response.cookies.set('geo_city', encodeURIComponent(city), { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
    }
    return response;
  }

  // For other unlocalized routes, determine preferred language from cookie/headers
  const targetLocale = getPreferredLocale(request);
  const newUrl = new URL(
    `/${targetLocale}${pathname}${request.nextUrl.search}`,
    request.url
  );
  const redirectResponse = NextResponse.redirect(newUrl);
  redirectResponse.cookies.set('preferred_lang', targetLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
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
