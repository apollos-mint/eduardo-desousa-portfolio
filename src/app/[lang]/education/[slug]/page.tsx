import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getAllEducationStaticParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import TopicVisualizer from '@/components/3d/TopicVisualizer';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Award,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Building,
  MessageSquare,
} from 'lucide-react';

export function generateStaticParams() {
  return getAllEducationStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;
  if (!isValidLocale(lang)) return {};

  const cvData = getCVData(lang as Locale);
  const item = cvData.educationAndCertifications.find((e) => e.id === slug);
  if (!item) return {};

  return {
    title: `${item.title} | Eduardo de Sousa Credential`,
    description: item.description,
  };
}

export default async function EducationDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const cvData = getCVData(lang as Locale);
  const itemIndex = cvData.educationAndCertifications.findIndex((e) => e.id === slug);

  if (itemIndex === -1) {
    notFound();
  }

  const item = cvData.educationAndCertifications[itemIndex];
  const prevItem =
    itemIndex > 0 ? cvData.educationAndCertifications[itemIndex - 1] : null;
  const nextItem =
    itemIndex < cvData.educationAndCertifications.length - 1
      ? cvData.educationAndCertifications[itemIndex + 1]
      : null;

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${lang}#certifications`}
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{cvData.navigation.backToHome}</span>
          </Link>
          <span className="text-xs font-mono text-cyan-400">
            CREDENTIAL {itemIndex + 1} / {cvData.educationAndCertifications.length}
          </span>
        </div>

        {/* Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
              {item.credentialBadge}
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
              {item.institution}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {item.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            {item.description}
          </p>
        </div>

        {/* 3D Visualizer */}
        <div>
          <TopicVisualizer
            type={item.type === 'degree' ? 'commercial' : 'cleanroom'}
            title={`${item.title} // ${item.institution}`}
          />
        </div>

        {/* Official Verification Box */}
        <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-emerald-400 font-bold">
              Official Credential Verification
            </div>
            <div className="text-sm text-slate-200 mt-0.5">{item.verificationNote}</div>
          </div>
        </div>

        {/* Key Takeaways & Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Takeaways */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Core Curriculum & Rigorous Takeaways</span>
            </h3>
            <div className="space-y-3">
              {item.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Acquired Skills */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Demonstrated Competencies</span>
            </h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {item.skillsAcquired.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Pagination */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevItem ? (
            <Link
              href={`/${lang}/education/${prevItem.id}`}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {cvData.common.previousMilestone}: {prevItem.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          <a
            href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}?text=${encodeURIComponent(
              `Hello Eduardo, I reviewed your credential in ${item.title} and would like to connect.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquire About Credential</span>
          </a>

          {nextItem ? (
            <Link
              href={`/${lang}/education/${nextItem.id}`}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <span>
                {cvData.common.nextMilestone}: {nextItem.title}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
