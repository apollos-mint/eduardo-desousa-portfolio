import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import dynamic from 'next/dynamic';
import EducationCertificatesSection from '@/components/sections/EducationCertificatesSection';
import { GraduationCap, ArrowLeft } from 'lucide-react';

const CertificationsScene = dynamic(() => import('@/components/3d/CertificationsScene'));
const DMAICGanttWidget = dynamic(() => import('@/components/interactive/DMAICGanttWidget'));

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
    <div className="w-full relative min-h-screen overflow-hidden">
      {/* Dynamic 3D Holographic Security Seal Background */}
      <CertificationsScene />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 pt-28 pb-20">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{cvData.navigation.backToHome}</span>
          </Link>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {cvData.common.verifiedCredentialsDossier.replace('7', String(cvData.educationAndCertifications.length))}
          </span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/15 dark:bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-800 dark:text-cyan-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">{cvData.common.credentialsBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {cvData.common.educationAndCertificationsTitle}
          </h1>
          <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            {cvData.common.educationAndCertificationsSubtitle}
          </p>
        </div>

        {/* Featured DMAIC Gantt Interactive Matrix */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
            {cvData.common.dmaicGanttTitle}
          </div>
          <DMAICGanttWidget currentLocale={lang as Locale} />
        </div>

        {/* Full Certifications & Degrees Accordion Section */}
        <div className="pt-6">
          <EducationCertificatesSection currentLocale={lang as Locale} cvData={cvData} hideHeader={true} />
        </div>
      </div>
    </div>
  );
}
