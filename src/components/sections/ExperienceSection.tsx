'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Locale, CVContent } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';

const ExperienceScene = dynamic(() => import('@/components/3d/ExperienceScene'), {
  ssr: false,
});
import {
  Briefcase,
  MapPin,
  Calendar,
  Building,
  ArrowRight,
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
  showHeader?: boolean;
}

export default function ExperienceSection({
  currentLocale,
  cvData,
  showHeader = false,
}: ExperienceSectionProps) {
  const experiences = cvData.experiences;
  const primaryExp = experiences[0]; // Sourcing & Digital Operations (Full Width)
  const secondaryExps = experiences.slice(1, 3); // HQ Pack & VDL Nedcar (2 Columns)
  const tertiaryExps = experiences.slice(3); // Other 3 Experiences (3 Columns)

  return (
    <section
      id="experience"
      className="pt-6 pb-20 sm:pb-24 relative overflow-hidden bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950/80"
    >
      {/* Dynamic WebGL Background for Experience */}
      <div className="absolute inset-0 opacity-100">
        <ExperienceScene />
      </div>
      <div className="absolute inset-0 bg-subtle-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Section Header (Optional) */}
        {showHeader && (
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
        )}

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
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/40 bg-white dark:bg-slate-900/80 shadow-xl hover:shadow-2xl transition-all duration-300 relative group overflow-hidden">
              {/* Subtle high-tech highlight glow matching Home */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-cyan-500/20 transition-all duration-500" />

              <div className="relative z-10 space-y-5">
                {/* Top Header Row: Icon + Title + 3 Key Metric Buttons */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <Link
                    href={`/${currentLocale}/experience/${primaryExp.id}`}
                    className="flex items-start sm:items-center space-x-3.5 group/link"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 group-hover/link:scale-110 group-hover:scale-110 transition-all duration-300 shadow-md shadow-cyan-500/10">
                      <Globe2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase text-cyan-800 dark:text-cyan-400">
                          01 // Pilar Principal
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-slate-700 dark:text-cyan-300 whitespace-nowrap">
                          {primaryExp.period}
                        </span>
                        <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-700 dark:text-slate-300">
                          <MapPin className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                          <span>{primaryExp.location}</span>
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover/link:text-cyan-600 dark:group-hover/link:text-cyan-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug mt-0.5">
                        {primaryExp.role}
                        <span className="text-cyan-600 dark:text-cyan-400 font-normal text-lg sm:text-xl ml-2">
                          &bull; {primaryExp.company}
                        </span>
                      </h3>
                    </div>
                  </Link>

                  {/* 3 Key Achievement Badges matching Home */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/${currentLocale}/experience/${primaryExp.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:bg-emerald-100 dark:hover:bg-emerald-900/90 cursor-pointer"
                    >
                      ✓ {cvData.common.achievement3 || '$800K/yr · 20 Cont/Quarter'}
                    </Link>
                    <Link
                      href={`/${currentLocale}/experience/${primaryExp.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 font-mono text-xs font-bold text-cyan-800 dark:text-cyan-300 shadow-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:bg-cyan-100 dark:hover:bg-cyan-900/90 cursor-pointer"
                    >
                      ✓ {cvData.common.sourcingPill2 || '-75% Costs · China Factory Direct'}
                    </Link>
                    <Link
                      href={`/${currentLocale}/experience/${primaryExp.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300 shadow-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:bg-indigo-100 dark:hover:bg-indigo-900/90 cursor-pointer"
                    >
                      ✓ {cvData.common.sourcingPill3 || 'Proprietary CMMS & iPaaS'}
                    </Link>
                  </div>
                </div>

                {/* Description with Clean Paragraph Separation & Justified Alignment */}
                <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-normal max-w-5xl">
                  {primaryExp.summary.split(/\n\s*\n/).filter(Boolean).map((p, pIdx) => (
                    <p key={pIdx} className="text-justify leading-relaxed sm:leading-7">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Ecosystem Company Logotypes matching Home */}
                <div className="pt-1">
                  <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold mb-2">
                    {cvData.common.ecosystemLabel}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {['HAPAG-LLOYD', 'MAERSK', 'MSC', 'ISO 9001', 'MAKE', 'ZAPIER'].map((company) => (
                      <div
                        key={company}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 flex items-center space-x-2 shadow-sm"
                      >
                        <div className="h-5 flex items-center">
                          <BrandLogo name={company} className="h-4.5 w-auto max-w-[65px]" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200">
                          {company}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-800 dark:text-cyan-400 font-bold uppercase">
                    {cvData.common.coreCompetencies}: {primaryExp.industry}
                  </span>
                  <Link
                    href={`/${currentLocale}/experience/${primaryExp.id}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-200 transition-all hover:scale-105 shadow-sm shrink-0"
                  >
                    <span>{cvData.navigation.viewDeepDive}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
              const achievement = exp.id === 'hq-pack'
                ? (cvData.common.achievement1 || 'ISO Class 5 Spec <0.1µm & 150+ ISAH Orders/mo')
                : (cvData.common.achievement2 || 'Cadence: 110-120 Cars/Shift & -15% Defect Rate');
              const companies = exp.id === 'hq-pack'
                ? ['HQPACK', 'ASML', 'ZEISS', 'FRENCKEN', 'NEWAYS', 'ISO 9001', 'TÜV']
                : ['BMW', 'MINI', 'BOSCH', 'ZF', 'BROSE', 'VDL'];

              return (
                <div
                  key={exp.id}
                  className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/75 relative group overflow-hidden flex flex-col justify-between shadow-lg hover:border-cyan-500/40 transition-all duration-300"
                >
                  {/* Subtle high-tech highlight glow in upper right corner on hover matching Home */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-cyan-500/25 transition-all duration-500" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/${currentLocale}/experience/${exp.id}`}
                          className="w-11 h-11 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-all duration-300 shadow-md shadow-cyan-500/10 cursor-pointer"
                        >
                          <Icon className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-cyan-500/30 font-mono text-[10px] font-bold text-cyan-800 dark:text-cyan-400">
                            {cardNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-500/30 font-mono text-[10px] text-cyan-800 dark:text-cyan-300">
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      {/* Achievement badge matching Home */}
                      <Link
                        href={`/${currentLocale}/experience/${exp.id}`}
                        className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 font-mono text-[11px] font-bold text-emerald-800 dark:text-emerald-300 shadow-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:bg-emerald-100 dark:hover:bg-emerald-900/90 cursor-pointer"
                      >
                        ✓ {achievement}
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      <Link href={`/${currentLocale}/experience/${exp.id}`} className="block group/title cursor-pointer">
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                          {exp.role}
                        </h3>
                      </Link>
                      <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                        {exp.company} &bull; {exp.location}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-1 line-clamp-3 text-justify">
                        {exp.summary}
                      </p>
                    </div>

                    {/* Direct Company Range Badges matching Home */}
                    <div className="pt-2">
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold mb-2">
                        {cvData.common.ecosystemLabel}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {companies.map((company) => (
                          <div
                            key={company}
                            className="px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 flex items-center space-x-1.5 shadow-sm"
                          >
                            <div className="h-4.5 flex items-center">
                              <BrandLogo name={company} className="h-4 w-auto max-w-[55px]" />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200">
                              {company}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono text-cyan-800 dark:text-cyan-400 font-bold uppercase">
                      {cvData.common.coreCompetencies}
                    </span>
                    <Link
                      href={`/${currentLocale}/experience/${exp.id}`}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-200 transition-all hover:scale-105 shadow-sm shrink-0"
                    >
                      <span>{cvData.navigation.viewDeepDive}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
              const Icon = exp.id === 'arkcohogar' ? Package : exp.id === 'eds-paixao' ? Sparkles : Briefcase;
              const achievement = exp.id === 'arkcohogar'
                ? '99.5% Stock Accuracy & WMS Optimization'
                : exp.id === 'eds-paixao'
                ? '100% HACCP Compliance & Peak Throughput'
                : '5 Years Technical Sales & Direct Factory RFQ';

              return (
                <div
                  key={exp.id}
                  className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/75 relative group overflow-hidden flex flex-col justify-between shadow-lg hover:border-cyan-500/40 transition-all duration-300"
                >
                  {/* Subtle high-tech highlight glow in upper right corner on hover matching Home */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-cyan-500/25 transition-all duration-500" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/${currentLocale}/experience/${exp.id}`}
                          className="w-11 h-11 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-all duration-300 shadow-md shadow-cyan-500/10 cursor-pointer"
                        >
                          <Icon className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-cyan-500/30 font-mono text-[10px] font-bold text-cyan-800 dark:text-cyan-400">
                            {cardNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-500/30 font-mono text-[10px] text-cyan-800 dark:text-cyan-300">
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      {/* Achievement badge matching Home */}
                      <Link
                        href={`/${currentLocale}/experience/${exp.id}`}
                        className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 font-mono text-[10px] font-bold text-emerald-800 dark:text-emerald-300 shadow-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:bg-emerald-100 dark:hover:bg-emerald-900/90 cursor-pointer"
                      >
                        ✓ {achievement}
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      <Link href={`/${currentLocale}/experience/${exp.id}`} className="block group/title cursor-pointer">
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                          {exp.role}
                        </h3>
                      </Link>
                      <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                        {exp.company} &bull; {exp.location}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-1 line-clamp-3 text-justify">
                        {exp.summary}
                      </p>
                    </div>

                    {/* Direct Technologies / Standards Chips matching Home */}
                    <div className="pt-2">
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold mb-2">
                        {cvData.common.technologiesAndFrameworks}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {exp.technologies.slice(0, 4).map((tech, tIdx) => (
                          <div
                            key={tIdx}
                            className="px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 flex items-center space-x-1.5 shadow-sm"
                          >
                            <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono text-cyan-800 dark:text-cyan-400 font-bold uppercase">
                      {cvData.common.coreCompetencies}
                    </span>
                    <Link
                      href={`/${currentLocale}/experience/${exp.id}`}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-200 transition-all hover:scale-105 shadow-sm shrink-0"
                    >
                      <span>{cvData.navigation.viewDeepDive}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
