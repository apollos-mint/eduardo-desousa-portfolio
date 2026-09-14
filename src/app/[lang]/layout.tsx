import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import InteractiveBackground from '@/components/ui/InteractiveBackground';

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
      <InteractiveBackground />
      <Header currentLocale={lang as Locale} cvData={cvData} />
      <main className="flex-grow">{children}</main>
      <Footer currentLocale={lang as Locale} cvData={cvData} />
    </div>
  );
}
