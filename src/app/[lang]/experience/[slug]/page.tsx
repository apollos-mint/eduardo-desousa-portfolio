import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getAllExperienceStaticParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import TopicVisualizer from '@/components/3d/TopicVisualizer';
import HQPackWidget from '@/components/3d/HQPackWidget';
import VDLWidget from '@/components/3d/VDLWidget';
import ConsultantWidget from '@/components/3d/ConsultantWidget';
import ExperienceInteractiveWidget from '@/components/interactive/ExperienceInteractiveWidget';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building,
  Calendar,
  MapPin,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ShieldAlert,
  Lightbulb,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';

export function generateStaticParams() {
  return getAllExperienceStaticParams();
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
  const experience = cvData.experiences.find((e) => e.id === slug);
  if (!experience) return {};

  return {
    title: `${experience.role} at ${experience.company} | Eduardo de Sousa`,
    description: experience.summary,
  };
}

export default async function ExperienceDetailPage({
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
  const experienceIndex = cvData.experiences.findIndex((e) => e.id === slug);

  if (experienceIndex === -1) {
    notFound();
  }

  const experience = cvData.experiences[experienceIndex];
  const prevExp = experienceIndex > 0 ? cvData.experiences[experienceIndex - 1] : null;
  const nextExp =
    experienceIndex < cvData.experiences.length - 1
      ? cvData.experiences[experienceIndex + 1]
      : null;

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${lang}#experience`}
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{cvData.navigation.backToHome}</span>
          </Link>
          <span className="text-xs font-mono text-cyan-400">
            RECORD {experienceIndex + 1} / {cvData.experiences.length}
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
              {experience.period}
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{experience.location}</span>
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400">
              {experience.industry}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {experience.role}
          </h1>

          <div className="text-xl sm:text-2xl font-bold text-cyan-400 flex items-center space-x-2.5">
            <Building className="w-6 h-6" />
            <span>{experience.company}</span>
          </div>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            {experience.summary}
          </p>
        </div>

        {/* 3D Visual Telemetry Matrix */}
        <div>
          {experience.id === 'hq-pack' ? (
            <HQPackWidget title={`${experience.company} // ${experience.industry}`} />
          ) : experience.id === 'vdl-nedcar' ? (
            <VDLWidget title={`${experience.company} // ${experience.industry}`} />
          ) : experience.id === 'independent-consultant' ? (
            <ConsultantWidget title={`${experience.company} // ${experience.industry}`} />
          ) : (
            <TopicVisualizer
              type={experience.visualType}
              title={`${experience.company} // ${experience.industry}`}
            />
          )}
        </div>

        {/* Numerical Impact Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {experience.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-slate-800 text-center space-y-1"
            >
              <div className="font-mono text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-slate-200">{metric.label}</div>
              {metric.subtext && (
                <div className="text-[11px] font-mono text-slate-400">{metric.subtext}</div>
              )}
            </div>
          ))}
        </div>

        {/* Specialized Interactive Command Center & Blueprint Hub */}
        <div className="pt-2 pb-2">
          <ExperienceInteractiveWidget
            experienceId={experience.id}
            company={experience.company}
            currentLocale={lang as Locale}
          />
        </div>

        {/* Operational Challenge, Solution & Impact Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Challenge */}
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-amber-200">
              {cvData.common.operationalChallenge}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {experience.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-cyan-200">
              {cvData.common.engineeredSolution}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {experience.solution}
            </p>
          </div>

          {/* Impact */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-emerald-200">
              {cvData.common.measurableImpact}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {experience.impact}
            </p>
          </div>
        </div>

        {/* Detailed Responsibilities */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>Full Operational Responsibilities</span>
          </h3>

          <div className="grid grid-cols-1 gap-3.5">
            {experience.responsibilities.map((resp, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies & Industry Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tech */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              {cvData.common.technologiesAndFrameworks}
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Partners */}
          {experience.partners && experience.partners.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                {cvData.common.industryPartners}
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.partners.map((partner, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-xs font-semibold text-emerald-300"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Pagination / Milestone Switcher */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevExp ? (
            <Link
              href={`/${lang}/experience/${prevExp.id}`}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {cvData.common.previousMilestone}: {prevExp.company}
              </span>
            </Link>
          ) : (
            <div />
          )}

          <a
            href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}?text=${encodeURIComponent(
              `Hello Eduardo, I reviewed your experience at ${experience.company} and would like to discuss a project.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discuss This Case Study</span>
          </a>

          {nextExp ? (
            <Link
              href={`/${lang}/experience/${nextExp.id}`}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <span>
                {cvData.common.nextMilestone}: {nextExp.company}
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
