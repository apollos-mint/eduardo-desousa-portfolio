import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import DMAICGanttWidget from '@/components/interactive/DMAICGanttWidget';
import EducationCertificatesSection from '@/components/sections/EducationCertificatesSection';
import { GraduationCap, ArrowLeft, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
    title: `Certifications & Education | ${cvData.personal.fullName}`,
    description: 'Lean Six Sigma Black Belt, ISO 9001:2015 Lead Auditor, Google Data Analytics, VCA VOL, and Bachelor Degree in Operations Management.',
  };
}

export default async function CertificationsHubPage({
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
          {cvData.common.verifiedCredentialsDossier.replace('7', String(cvData.educationAndCertifications.length))}
        </span>
      </div>

      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/70 dark:bg-cyan-950/70 light:bg-cyan-100 border border-cyan-500/30 text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
          <GraduationCap className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider">{cvData.common.credentialsBadge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {cvData.common.educationAndCertificationsTitle}
        </h1>
        <p className="text-base text-slate-200 leading-relaxed">
          {cvData.common.educationAndCertificationsSubtitle}
        </p>
      </div>

      {/* Featured DMAIC Gantt Interactive Matrix */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
          {cvData.common.dmaicGanttTitle}
        </div>
        <DMAICGanttWidget currentLocale={lang as Locale} />
      </div>

      {/* Full Certifications & Degrees Accordion Section */}
      <div className="pt-6">
        <EducationCertificatesSection currentLocale={lang as Locale} cvData={cvData} />
      </div>
    </div>
  );
}
