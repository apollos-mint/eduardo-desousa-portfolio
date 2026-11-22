import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import ContactSection from '@/components/sections/ContactSection';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return getAllStaticLocaleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  if (!isValidLocale(lang)) return {};

  const cvData = getCVData(lang as Locale);
  return {
    title: `Contact & Executive Booking | ${cvData.personal.fullName}`,
    description: cvData.common.contactSubtitle,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const cvData = getCVData(lang as Locale);

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{cvData.navigation.backToHome}</span>
        </Link>
      </div>
      <ContactSection currentLocale={lang as Locale} cvData={cvData} />
    </div>
  );
}
