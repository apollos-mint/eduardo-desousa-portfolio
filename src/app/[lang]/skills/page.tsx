import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import DynamicSkillMatrixWidget from '@/components/interactive/DynamicSkillMatrixWidget';
import { Sliders, ArrowLeft, Layers, ShieldCheck, Cpu, Database, Wrench } from 'lucide-react';

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
    title: `Skills Matrix & Competencies | ${cvData.personal.fullName}`,
    description: 'Interactive visual skills matrix covering Lean Six Sigma DMAIC, ISO 9001 quality compliance, ISAH ERP systems, and cleanroom engineering.',
  };
}

export default async function SkillsHubPage({
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
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{cvData.navigation.backToHome}</span>
        </Link>
        <span className="text-xs font-mono text-slate-500">
          {cvData.common.visualSkillsMatrix.replace('16', String(cvData.skills.length))}
        </span>
      </div>

      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/70 dark:bg-cyan-950/70 light:bg-cyan-100 border border-cyan-500/30 text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
          <Sliders className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">{cvData.common.visualMatrixBadge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {cvData.common.technicalSkillsTitle}
        </h1>
        <p className="text-base text-slate-200 leading-relaxed">
          {cvData.common.technicalSkillsSubtitle}
        </p>
      </div>

      {/* Full Dynamic Skills Matrix Widget */}
      <DynamicSkillMatrixWidget currentLocale={lang as Locale} cvData={cvData} />
    </div>
  );
}
