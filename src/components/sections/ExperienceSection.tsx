'use client';

import React from 'react';
import Link from 'next/link';
import { Locale, CVContent } from '@/types';
import ExperienceScene from '@/components/3d/ExperienceScene';
import {
  Briefcase,
  MapPin,
  Calendar,
  Building,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Globe2,
  Package,
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
  const experiences = cvData.experiences;
  const primaryExp = experiences[0]; // Sourcing & Digital Operations (Full Width)
  const secondaryExps = experiences.slice(1, 3); // HQ Pack & VDL Nedcar (2 Columns)
  const tertiaryExps = experiences.slice(3); // Other 3 Experiences (3 Columns)

  return (
    <section
      id="experience"
      className="pt-16 pb-20 sm:pb-24 relative overflow-hidden bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950/80"
    >
      {/* Dynamic WebGL Background for Experience */}
      <div className="absolute inset-0 opacity-100">
        <ExperienceScene />
      </div>
      <div className="absolute inset-0 bg-subtle-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/70 dark:bg-cyan-950/70 light:bg-cyan-100 border border-cyan-500/30 text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">
              {cvData.navigation.experience} // Dossier Profesional
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {cvData.common.keyAchievements}
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {cvData.common.careerExperiencesSubtitle}
          </p>
        </div>

        {/* =========================================================================
           HIERARCHICAL 1 + 2 + 3 EXPERIENCE ARCHITECTURE
           ROW 1: PRIMARY SOURCING & DIGITAL OPERATIONS (FULL WIDTH)
           ROW 2: ASML SEMICONDUCTORS & BMW/MINI OEM (2 COLUMNS - 50% / 50%)
           ROW 3: COMPACT LOGISTICS, QUALITY & COMMERCIAL (3 COLUMNS - 33% / 33% / 33%)
           ========================================================================= */}
        <div className="space-y-6">
          {/* -------------------------------------------------------------
              ROW 1: PRIMARY FEATURED EXPERIENCE (FULL WIDTH)
             ------------------------------------------------------------- */}
          {primaryExp && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/50 bg-white/95 dark:bg-slate-900/85 shadow-2xl relative group overflow-hidden hover:border-cyan-400 transition-all duration-300">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500" />

              <div className="space-y-6">
                {/* Header Meta Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950 border border-cyan-500/40 font-mono text-xs font-black text-cyan-800 dark:text-cyan-400">
                        01 // PILAR PRINCIPAL
                      </span>
                      <span className="px-3 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-cyan-300 whitespace-nowrap">
                        {primaryExp.period}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-1 whitespace-nowrap">
                        <MapPin className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{primaryExp.location}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-800 dark:text-cyan-300">
                        {primaryExp.industry}
                      </span>
                    </div>

                    <Link
                      href={`/${currentLocale}/experience/${primaryExp.id}`}
                      className="block group/title"
                    >
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 transition-colors leading-tight">
                        {primaryExp.role}
                        <span className="text-cyan-600 dark:text-cyan-400 font-normal text-xl sm:text-2xl ml-2">
                          &bull; {primaryExp.company}
                        </span>
                      </h3>
                    </Link>
                  </div>

                  <Link
                    href={`/${currentLocale}/experience/${primaryExp.id}`}
                    className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-emerald-600 to-cyan-600 dark:from-cyan-500 dark:via-emerald-500 dark:to-cyan-500 hover:from-cyan-500 hover:to-emerald-500 text-white dark:text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-cyan-500/25 shrink-0 hover:scale-105"
                  >
                    <span>{cvData.navigation.openDedicatedPage}</span>
                    <ArrowUpRight className="w-4 h-4 text-white dark:text-slate-950" />
                  </Link>
                </div>

                {/* Summary Text */}
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal max-w-5xl">
                  {primaryExp.summary}
                </p>

                {/* 4 Numerical Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  {primaryExp.metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/90 text-center space-y-1 hover:border-cyan-500/40 transition-colors shadow-sm"
                    >
                      <div className="font-mono text-xl sm:text-2xl font-black text-cyan-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-cyan-200 dark:to-cyan-400">
                        {metric.value}
                      </div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {metric.label}
                      </div>
                      {metric.subtext && (
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {metric.subtext}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Technologies Stack Chips */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-200 dark:border-slate-800/80">
                  {primaryExp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              ROW 2: SECONDARY EXPERIENCES (2 COLUMNS - 50% / 50%)
             ------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {secondaryExps.map((exp, index) => {
              const cardNumber = String(index + 2).padStart(2, '0');
              const Icon = exp.id === 'hq-pack' ? Cpu : ShieldCheck;

              return (
                <div
                  key={exp.id}
                  className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/80 hover:border-cyan-500/40 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-4">
                    {/* Meta Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-800 dark:text-cyan-400">
                          {cardNumber}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-300 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span className="truncate max-w-[140px]">{exp.location}</span>
                      </span>
                    </div>

                    {/* Role & Company Header */}
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <Link
                          href={`/${currentLocale}/experience/${exp.id}`}
                          className="block group/title"
                        >
                          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 transition-colors leading-snug">
                            {exp.role}
                          </h3>
                        </Link>
                        <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                          {exp.company}
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {exp.summary}
                    </p>

                    {/* Metrics 4-grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {exp.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-0.5 shadow-sm"
                        >
                          <div className="font-mono text-sm sm:text-base font-extrabold text-cyan-700 dark:text-cyan-400">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-1">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Partners Chips */}
                    {exp.partners && exp.partners.length > 0 && (
                      <div className="pt-1">
                        <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold mb-1.5">
                          {cvData.common.industryPartners}:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.partners.slice(0, 4).map((p, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-800 dark:text-cyan-400 font-semibold">
                      {exp.industry}
                    </span>
                    <Link
                      href={`/${currentLocale}/experience/${exp.id}`}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/90 hover:bg-cyan-100 dark:hover:bg-cyan-900 border border-cyan-500/40 text-xs font-bold text-cyan-800 dark:text-cyan-300 transition-all hover:scale-105"
                    >
                      <span>{cvData.navigation.openDedicatedPage}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* -------------------------------------------------------------
              ROW 3: TERTIARY EXPERIENCES (3 COLUMNS - 33% / 33% / 33%)
             ------------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tertiaryExps.map((exp, index) => {
              const cardNumber = String(index + 4).padStart(2, '0');

              return (
                <div
                  key={exp.id}
                  className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/70 hover:border-cyan-500/40 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-3.5">
                    {/* Meta Top Bar */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-800 dark:text-cyan-400">
                        {cardNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-500/20 font-mono text-[11px] text-cyan-800 dark:text-cyan-300 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    {/* Role & Company Header */}
                    <div>
                      <Link
                        href={`/${currentLocale}/experience/${exp.id}`}
                        className="block group/title"
                      >
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 transition-colors leading-snug">
                          {exp.role}
                        </h3>
                      </Link>
                      <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                        {exp.company}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span className="truncate">{exp.location}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {exp.summary}
                    </p>

                    {/* Metrics Badges */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {exp.metrics.slice(0, 2).map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/70 text-center space-y-0.5 shadow-sm"
                        >
                          <div className="font-mono text-xs sm:text-sm font-extrabold text-cyan-700 dark:text-cyan-400 truncate">
                            {m.value}
                          </div>
                          <div className="text-[9px] text-slate-600 dark:text-slate-400 truncate">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-3.5 mt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                      {exp.industry}
                    </span>
                    <Link
                      href={`/${currentLocale}/experience/${exp.id}`}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 hover:bg-cyan-100 dark:hover:bg-cyan-900 border border-cyan-500/30 text-xs font-bold text-cyan-800 dark:text-cyan-300 transition-all hover:scale-105"
                    >
                      <span>{cvData.navigation.openDedicatedPage}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
