import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import CookieConsentBanner from '@/components/ui/CookieConsentBanner';
import JsonLd from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return getAllStaticLocaleParams();
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const cvData = getCVData(lang as Locale);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#07090e]">
      {/* WCAG 2.1 AA Bypass Anchor */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-cyan-500 focus:text-slate-950 focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        Skip to main content
      </a>
      <JsonLd lang={lang as Locale} />
      <InteractiveBackground />
      <Header currentLocale={lang as Locale} cvData={cvData} />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer currentLocale={lang as Locale} cvData={cvData} />
      <CookieConsentBanner currentLocale={lang as Locale} />
    </div>
  );
}
