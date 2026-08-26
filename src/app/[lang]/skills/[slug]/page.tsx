import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getAllSkillStaticParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import TopicVisualizer from '@/components/3d/TopicVisualizer';
import {
  ArrowLeft,
  ArrowRight,
  Sliders,
  Wrench,
  Layers,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export function generateStaticParams() {
  return getAllSkillStaticParams();
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
  const skill = cvData.skills.find((s) => s.id === slug);
  if (!skill) return {};

  return {
    title: `${skill.name} | Eduardo de Sousa Technical Competency`,
    description: skill.description,
  };
}

export default async function SkillDetailPage({
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
  const skillIndex = cvData.skills.findIndex((s) => s.id === slug);

  if (skillIndex === -1) {
    notFound();
  }

  const skill = cvData.skills[skillIndex];
  const prevSkill = skillIndex > 0 ? cvData.skills[skillIndex - 1] : null;
  const nextSkill =
    skillIndex < cvData.skills.length - 1 ? cvData.skills[skillIndex + 1] : null;

  // Find related career experience records
  const relatedExperiences = cvData.experiences.filter((exp) =>
    skill.relatedExperienceIds.includes(exp.id)
  );

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${lang}#skills`}
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{cvData.navigation.backToHome}</span>
          </Link>
          <span className="text-xs font-mono text-cyan-400">
            COMPETENCY {skillIndex + 1} / {cvData.skills.length}
          </span>
        </div>

        {/* Skill Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300 uppercase">
              {skill.category.replace('-', ' ')}
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-300">
              Mastery: {skill.level}%
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {skill.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            {skill.description}
          </p>
        </div>

        {/* 3D Visualizer */}
        <div>
          <TopicVisualizer
            type={
              skill.category === 'technical-engineering'
                ? 'cleanroom'
                : skill.category === 'quality-compliance'
                ? 'automotive'
                : 'consulting'
            }
            title={skill.name}
          />
        </div>

        {/* Methodology & Practical Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Methodology */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Theoretical & Methodological Framework
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {skill.methodology}
            </p>
          </div>

          {/* Practical Application */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Real-World Industrial Execution
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {skill.practicalApplication}
            </p>
          </div>
        </div>

        {/* Tools & Frameworks */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-cyan-400" />
            <span>Industrial Tools, Instrumentation & Standards</span>
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {skill.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Connected Experiences */}
        {relatedExperiences.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Applied In Career Roles</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedExperiences.map((exp) => (
                <Link
                  key={exp.id}
                  href={`/${lang}/experience/${exp.id}`}
                  className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </div>
                    <div className="text-xs text-cyan-400 font-mono">{exp.company}</div>
                    <div className="text-[11px] text-slate-400">{exp.period}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Pagination */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevSkill ? (
            <Link
              href={`/${lang}/skills/${prevSkill.id}`}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {cvData.common.previousMilestone}: {prevSkill.name}
              </span>
            </Link>
          ) : (
            <div />
          )}

          <a
            href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}?text=${encodeURIComponent(
              `Hello Eduardo, I reviewed your expertise in ${skill.name} and would like to discuss an opportunity.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consult on {skill.name}</span>
          </a>

          {nextSkill ? (
            <Link
              href={`/${lang}/skills/${nextSkill.id}`}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              <span>
                {cvData.common.nextMilestone}: {nextSkill.name}
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
