'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale, CVContent } from '@/types';
import ExperienceScene from '@/components/3d/ExperienceScene';
import ExperienceInteractiveWidget from '@/components/interactive/ExperienceInteractiveWidget';
import {
  Briefcase,
  MapPin,
  Calendar,
  Building,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ExperienceSectionProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function ExperienceSection({
  currentLocale,
  cvData,
}: ExperienceSectionProps) {
  // All items closed by default - widgets only display upon explicit expand click
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="pt-24 pb-20 sm:pb-24 relative overflow-hidden bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950/80">
      {/* Dynamic WebGL Background for Experience */}
      <div className="absolute inset-0 opacity-100">
        <ExperienceScene />
      </div>
      <div className="absolute inset-0 bg-subtle-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/70 dark:bg-cyan-950/70 light:bg-cyan-100 border border-cyan-500/30 text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">
              {cvData.navigation.experience} // Interactive Dossier
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {cvData.common.keyAchievements}
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Click any career milestone to unfold its specialized interactive telemetry, cleanroom/automotive blueprint widgets, and detailed operational impact.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="space-y-6">
          {cvData.experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const indexNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={exp.id}
                className={`glass-panel rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${
                  isExpanded
                    ? 'border-cyan-500/60 shadow-2xl shadow-cyan-500/20 bg-slate-900/95 dark:bg-slate-900/95 light:bg-white ring-1 ring-cyan-500/30'
                    : 'border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-cyan-500/40 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/90'
                }`}
              >
                {/* Top Distinct Accent Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500 transition-opacity ${
                    isExpanded ? 'opacity-100' : 'opacity-30'
                  }`}
                />

                {/* 1st Interaction Target: Minimized Summary Header */}
                <button
                  onClick={() => toggleExpand(exp.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-3 lg:max-w-2xl min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-900 dark:bg-slate-900 light:bg-slate-200 font-mono text-xs font-black text-cyan-400 dark:text-cyan-400 light:text-cyan-700 border border-cyan-500/30">
                        {indexNumber}
                      </span>
                      <span className="px-3 py-0.5 rounded-md bg-cyan-950/80 dark:bg-cyan-950/80 light:bg-cyan-100 border border-cyan-500/30 font-mono text-xs font-semibold text-cyan-300 dark:text-cyan-300 light:text-cyan-700 whitespace-nowrap">
                        {exp.period}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 flex items-center space-x-1 whitespace-nowrap">
                        <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{exp.location}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 truncate max-w-[160px]">
                        {exp.industry}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span>{exp.role}</span>
                      <span className="text-cyan-400 hidden sm:inline">&bull;</span>
                      <span className="text-cyan-400 font-bold text-lg sm:text-xl block sm:inline">{exp.company}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>

                  {/* Right Side: Key Metrics & Expand Action Prompt Button */}
                  <div className="flex items-center justify-between lg:justify-end space-x-3 shrink-0 pt-2 lg:pt-0">
                    <div className="hidden sm:flex items-center space-x-2">
                      {exp.metrics.slice(0, 2).map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-right font-mono min-w-0"
                        >
                          <div className="text-xs sm:text-sm font-extrabold text-cyan-400 truncate">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-slate-300 dark:text-slate-300 light:text-slate-600 truncate max-w-[90px]">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Expand Toggle Button with Safe Margin & Padding */}
                    <div className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-cyan-950/80 dark:bg-cyan-950/80 light:bg-cyan-100 border border-cyan-500/40 text-cyan-300 dark:text-cyan-300 light:text-cyan-800 text-xs font-mono font-bold shrink-0 shadow-sm hover:bg-cyan-900/90">
                      <span className="whitespace-nowrap">{isExpanded ? cvData.navigation.clickToCollapse : cvData.navigation.clickToExpand}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                    </div>
                  </div>
                </button>

                {/* Expanded State (ONLY rendered upon explicit click) */}
                {isExpanded && (
                  <div className="px-5 sm:px-7 pb-7 pt-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 space-y-6 animate-in slide-in-from-top-4 duration-300">
                    {/* Operational Challenge & Impact Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="p-4 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1.5">
                        <div className="font-mono text-cyan-400 font-bold uppercase text-[11px]">
                          {cvData.common.operationalChallenge}
                        </div>
                        <p className="text-slate-200 leading-relaxed">
                          {exp.challenge}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-950/20 dark:bg-emerald-950/20 light:bg-emerald-50 border border-emerald-500/30 space-y-1.5">
                        <div className="font-mono text-emerald-400 font-bold uppercase text-[11px]">
                          {cvData.common.measurableImpact}
                        </div>
                        <p className="text-slate-200 leading-relaxed">
                          {exp.impact}
                        </p>
                      </div>
                    </div>

                    {/* Responsibilities List */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                        {cvData.common.detailedResponsibilities || "DETAILED OPERATIONAL RESPONSIBILITIES:"}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exp.responsibilities.map((resp, rIdx) => {
                          const colonIdx = resp.indexOf(':');
                          if (colonIdx > 0 && colonIdx < 60) {
                            const title = resp.substring(0, colonIdx);
                            const rest = resp.substring(colonIdx + 1);
                            return (
                              <div
                                key={rIdx}
                                className="p-3.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-start space-x-2.5 text-xs text-slate-200 leading-relaxed shadow-sm hover:border-cyan-500/30 transition-colors"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-mono text-cyan-300 dark:text-cyan-300 light:text-cyan-700 font-bold block sm:inline">
                                    {title}:
                                  </strong>{' '}
                                  <span className="text-slate-200 dark:text-slate-200 light:text-slate-700">{rest}</span>
                                </div>
                              </div>
                            );
                          }
                          return (
                            <div
                              key={rIdx}
                              className="p-3.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-start space-x-2.5 text-xs text-slate-200 leading-relaxed shadow-sm hover:border-cyan-500/30 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="text-slate-200 dark:text-slate-200 light:text-slate-700">{resp}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Embedded Specialized Interactive Widget Moved Below Responsibilities */}
                    <div className="pt-2 pb-2">
                      <ExperienceInteractiveWidget
                        experienceId={exp.id}
                        company={exp.company}
                        currentLocale={currentLocale}
                      />
                    </div>

                    {/* Bottom CTA & Tech Stack */}
                    <div className="pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {exp.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-[11px] font-mono text-slate-400 dark:text-slate-300 light:text-slate-700 whitespace-nowrap"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/${currentLocale}/experience/${exp.id}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/20 shrink-0 whitespace-nowrap"
                      >
                        <span>{cvData.navigation.openDedicatedPage}</span>
                        <ArrowUpRight className="w-4 h-4 shrink-0" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
