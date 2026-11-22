import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import ExperienceSection from '@/components/sections/ExperienceSection';
import { Briefcase, ArrowLeft } from 'lucide-react';

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
    title: `Career Experiences | ${cvData.personal.fullName}`,
    description: 'High-Tech semiconductor cleanrooms (ASML), automotive OEM production (BMW/MINI), and global factory sourcing audits.',
  };
}

export default async function ExperiencesHubPage({
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
    <>
      <div className="pt-24 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb & Return Nav */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{cvData.navigation.backToHome}</span>
          </Link>
          <span className="text-xs font-mono text-slate-500">
            {cvData.common.careerMilestoneDossier.replace('6', String(cvData.experiences.length))}
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/70 dark:bg-cyan-950/70 light:bg-cyan-100 border border-cyan-500/30 text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">{cvData.common.careerTrackRecord}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {cvData.common.careerExperiencesTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {cvData.common.careerExperiencesSubtitle}
          </p>
        </div>
      </div>

      {/* 2-Step Interactive Experiences List (All cards start closed by default) */}
      <ExperienceSection currentLocale={lang as Locale} cvData={cvData} />
    </>
  );
}
