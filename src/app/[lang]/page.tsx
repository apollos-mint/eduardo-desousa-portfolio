import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import SwissB2BAdvisory, { SupportedLanguage } from '@/components/b2b/SwissB2BAdvisory';

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
    title: `${cvData.personal.fullName} | Senior Operations & Supply Chain Advisory`,
    description: cvData.personal.summary.replace(/\n+/g, ' '),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        es: '/es',
        pt: '/pt',
        de: '/de',
        fr: '/fr',
        nl: '/nl',
        'x-default': '/en',
      },
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  if (!isValidLocale(lang)) {
    notFound();
  }

  return <SwissB2BAdvisory initialLanguage={lang as SupportedLanguage} />;
}
