'use client';

import React from 'react';
import Link from 'next/link';
import { Locale, CVContent } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';
import CyberTechBackground, { telemetryTranslations } from '@/components/ui/CyberTechBackground';
import { renderFormattedText } from '@/lib/formatter';
import {
  Cpu,
  ShieldCheck,
  Globe2,
  ArrowRight,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';

interface SpecialFeatureSectionProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function SpecialFeatureSection({
  currentLocale,
  cvData,
}: SpecialFeatureSectionProps) {
  const telemetry =
    telemetryTranslations[currentLocale] || telemetryTranslations.es;

  const sourcingPillar = {
    id: 'sourcing',
    icon: Globe2,
    title: cvData.highlights.pillars[0].title,
    description: cvData.highlights.pillars[0].description,
    companies: ['HAPAG-LLOYD', 'MAERSK', 'MSC', 'ISO 9001', 'MAKE', 'ZAPIER'],
    keyPoints: [
      cvData.common.achievement3,
      cvData.common.sourcingPill2,
      cvData.common.sourcingPill3,
    ],
    href: `/${currentLocale}/experience/independent-consultant`,
  };

  const secondaryPillars = [
    {
      id: 'hqpack',
      icon: Cpu,
      title: cvData.highlights.pillars[1].title,
      description: cvData.highlights.pillars[1].description,
      companies: ['HQPACK', 'ASML', 'ZEISS', 'FRENCKEN', 'NEWAYS', 'ISO 9001', 'TÜV'],
      achievement: cvData.common.achievement1,
      href: `/${currentLocale}/experience/hq-pack`,
    },
    {
      id: 'vdl',
      icon: ShieldCheck,
      title: cvData.highlights.pillars[2].title,
      description: cvData.highlights.pillars[2].description,
      companies: ['BMW', 'MINI', 'BOSCH', 'ZF', 'BROSE', 'VDL'],
      achievement: cvData.common.achievement2,
      href: `/${currentLocale}/experience/vdl-nedcar`,
    },
  ];

  return (
    <section id="specialization" className="pt-1 sm:pt-2 pb-6 sm:pb-8 relative overflow-hidden">
      {/* High-Tech Blueprint Matrix Background */}
      <CyberTechBackground currentLocale={currentLocale} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 sm:space-y-6">
        {/* =========================================================================
           TOP ENGINEERING TELEMETRY HUD BAR (CLEAN DEDICATED POSITION ABOVE BANNER)
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[10px] tracking-wider px-2">
          {/* Left Telemetry (Node & Sourcing Metrics) */}
          <div className="flex items-center space-x-2 text-cyan-700 dark:text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-sm shadow-cyan-500/50 shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-bold text-cyan-800 dark:text-cyan-300">{telemetry.node}</span>
              <span className="hidden sm:inline text-slate-400 dark:text-slate-600">·</span>
              <span className="text-[9px] text-slate-600 dark:text-slate-400">{telemetry.metrics}</span>
            </div>
          </div>

          {/* Right Telemetry (Cleanroom & Automotive OEM Specs) */}
          <div className="flex items-center space-x-2 sm:text-right sm:ml-auto text-emerald-700 dark:text-emerald-400">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">{telemetry.spec}</span>
              <span className="hidden sm:inline text-slate-400 dark:text-slate-500">·</span>
              <span className="text-[9px] text-slate-600 dark:text-slate-400">{telemetry.cadence}</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 shrink-0 hidden sm:inline-block" />
          </div>
        </div>

        {/* =========================================================================
           EXECUTIVE LEADERSHIP SUMMARY BANNER (HIGH-CONTRAST COMMAND MODULE)
           ========================================================================= */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl executive-summary-banner border-2 border-cyan-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          {/* High-tech corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

          {/* Glowing blue light in the corner ("una luz azul en la esquina") */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/25 dark:bg-cyan-500/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-cyan-500/40 transition-all duration-500" />
          {/* Secondary ambient highlight */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-xs font-mono font-bold text-cyan-300 shadow-sm">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span className="uppercase tracking-wider">{cvData.personal.roleTitle}</span>
            </div>
            <div className="space-y-3.5 text-sm sm:text-base text-slate-100 font-normal">
              {cvData.personal.summary.split(/\n\s*\n/).filter(Boolean).map((paragraph, idx) => (
                <p key={idx} className="text-justify leading-relaxed sm:leading-7">
                  {renderFormattedText(paragraph)}
                </p>
              ))}
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto relative z-10">
            <Link
              href={`/${currentLocale}/contact`}
              className="w-full md:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-cyan-500/25 whitespace-nowrap hover:scale-[1.02]"
            >
              <span>{cvData.common.contactTitle}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
          </div>
        </div>

        {/* Section Title Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 pt-2 sm:pt-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-800 dark:text-cyan-400">
            <span className="uppercase tracking-wider">{cvData.highlights.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {cvData.highlights.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {renderFormattedText(cvData.highlights.subtitle)}
          </p>
        </div>

        {/* =========================================================================
           STRATEGIC VALUE PROPOSITION ARCHITECTURE
           PRIMARY: OPERACIONES DIGITALES & SOURCING GLOBAL (FULL WIDTH + 3 KEY BADGES)
           SECONDARY: ASML SEMICONDUCTORS & BMW OEM (2 COLUMNS SIDE-BY-SIDE)
           ========================================================================= */}
        <div className="space-y-6">
          {/* PRIMARY FEATURED CARD: FULL WIDTH */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/40 bg-white dark:bg-slate-900/80 shadow-xl hover:shadow-2xl transition-all duration-300 relative group overflow-hidden">
            {/* Subtle high-tech highlight glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-cyan-500/20 transition-all duration-500" />

            <div className="relative z-10 space-y-5">
              {/* Top Header Row: Icon + Title + 3 Key Metric Buttons */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <Link
                  href={sourcingPillar.href}
                  className="flex items-start sm:items-center space-x-3.5 group/link"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 group-hover/link:scale-110 group-hover:scale-110 transition-all duration-300 shadow-md shadow-cyan-500/10">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase text-cyan-800 dark:text-cyan-400">
                        Pilar Principal
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover/link:text-cyan-600 dark:group-hover/link:text-cyan-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug mt-0.5">
                      {sourcingPillar.title}
                    </h3>
                  </div>
                </Link>

                {/* 3 COMPLETE UNTRUNCATED KEY BUTTONS WITH CONSISTENT HOVER & NAVIGATION */}
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={sourcingPillar.href}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:bg-emerald-100 dark:hover:bg-emerald-900/90 cursor-pointer"
                  >
                    ✓ {sourcingPillar.keyPoints[0]}
                  </Link>
                  <Link
                    href={sourcingPillar.href}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 font-mono text-xs font-bold text-cyan-800 dark:text-cyan-300 shadow-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:bg-cyan-100 dark:hover:bg-cyan-900/90 cursor-pointer"
                  >
                    ✓ {sourcingPillar.keyPoints[1]}
                  </Link>
                  <Link
                    href={sourcingPillar.href}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-500/40 hover:border-indigo-400 font-mono text-xs font-bold text-indigo-800 dark:text-indigo-300 shadow-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:bg-indigo-100 dark:hover:bg-indigo-900/90 cursor-pointer"
                  >
                    ✓ {sourcingPillar.keyPoints[2]}
                  </Link>
                </div>
              </div>

              {/* Description with Clean Paragraph Separation & Justified Alignment */}
              <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-normal max-w-5xl">
                {sourcingPillar.description.split(/\n\s*\n/).filter(Boolean).map((p, pIdx) => (
                  <p key={pIdx} className="text-justify leading-relaxed sm:leading-7">
                    {renderFormattedText(p)}
                  </p>
                ))}
              </div>

              {/* Ecosystem Company Logotypes */}
              <div className="pt-1">
                <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold mb-2">
                  {cvData.common.ecosystemLabel}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {sourcingPillar.companies.map((company) => (
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
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-800 dark:text-cyan-400 font-bold uppercase">
                  {cvData.common.coreCompetencies}: Global Sourcing & Supply Chain
                </span>
                <Link
                  href={sourcingPillar.href}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-200 transition-all hover:scale-105 shadow-sm"
                >
                  <span>{cvData.navigation.viewDeepDive}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* SECONDARY PILLARS: 2 COLUMNS (50% WIDTH EACH) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/75 relative group overflow-hidden flex flex-col justify-between shadow-lg hover:border-cyan-500/40 transition-all duration-300"
                >
                  {/* Subtle high-tech highlight glow in upper right corner on hover */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-cyan-500/25 transition-all duration-500" />

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Link
                        href={pillar.href}
                        className="w-11 h-11 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-all duration-300 shadow-md shadow-cyan-500/10 cursor-pointer"
                      >
                        <Icon className="w-5 h-5" />
                      </Link>

                      {/* UNTRUNCATED ACHIEVEMENT BADGE WITH CONSISTENT HOVER */}
                      <Link
                        href={pillar.href}
                        className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 font-mono text-[11px] font-bold text-emerald-800 dark:text-emerald-300 shadow-sm whitespace-nowrap transition-all duration-200 hover:scale-105 hover:bg-emerald-100 dark:hover:bg-emerald-900/90 cursor-pointer"
                      >
                        ✓ {pillar.achievement}
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <Link href={pillar.href} className="block group/title cursor-pointer">
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                          {pillar.title}
                        </h3>
                      </Link>
                      <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                        {pillar.description.split(/\n\s*\n/).filter(Boolean).map((p, pIdx) => (
                          <p key={pIdx} className="text-justify leading-relaxed">
                            {renderFormattedText(p)}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Direct Company Range Badges */}
                    <div className="pt-2">
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold mb-2">
                        {cvData.common.ecosystemLabel}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {pillar.companies.map((company) => (
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

                  <div className="mt-6 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-800 dark:text-cyan-400 font-bold uppercase">
                      {cvData.common.coreCompetencies}
                    </span>
                    <Link
                      href={pillar.href}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-200 transition-all hover:scale-105 shadow-sm"
                    >
                      <span>{cvData.navigation.viewDeepDive}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footnote on Sanitized Illustrative Metrics */}
          <div className="pt-2 flex flex-wrap items-center justify-center text-[11px] font-mono text-slate-500 space-x-1 text-center">
            <span>* Performance metrics, throughput, and tolerances represent sanitized illustrative approximations under NDA covenants.</span>
            <Link href={`/${currentLocale}/legal`} className="text-cyan-500/80 hover:text-cyan-400 underline ml-1">
              [Legal Dossier]
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
