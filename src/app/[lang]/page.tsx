import React from 'react';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import HeroSection from '@/components/sections/HeroSection';
import SpecialFeatureSection from '@/components/sections/SpecialFeatureSection';
import ContactSection from '@/components/sections/ContactSection';

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
    title: `${cvData.personal.fullName} | ${cvData.personal.roleTitle}`,
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

  const cvData = getCVData(lang as Locale);

  return (
    <div className="flex flex-col">
      {/* 1. Concise High-Impact Hero with Portrait & Infinite Brand Marquee */}
      <HeroSection currentLocale={lang as Locale} cvData={cvData} />

      {/* 2. Core Competencies & Tier-1 Company Ranges (Directly under marquee, 0 gap) */}
      <SpecialFeatureSection currentLocale={lang as Locale} cvData={cvData} />

      {/* 3. Executive Direct Contact & vCard Hub */}
      <div className="mt-8 sm:mt-12">
        <ContactSection currentLocale={lang as Locale} cvData={cvData} />
      </div>
    </div>
  );
}
