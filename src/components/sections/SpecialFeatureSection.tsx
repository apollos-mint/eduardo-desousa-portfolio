'use client';

import React from 'react';
import Link from 'next/link';
import { Locale, CVContent } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';
import {
  Cpu,
  ShieldCheck,
  Globe2,
  ArrowRight,
  Award,
} from 'lucide-react';

interface SpecialFeatureSectionProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function SpecialFeatureSection({
  currentLocale,
  cvData,
}: SpecialFeatureSectionProps) {
  const pillarDetails = [
    {
      id: 'sourcing',
      icon: Globe2,
      title: cvData.highlights.pillars[0].title,
      description: cvData.highlights.pillars[0].description,
      companies: ['HAPAG-LLOYD', 'MAERSK', 'MSC', 'ISO 9001', 'MAKE', 'ZAPIER'],
      achievement: cvData.common.achievement3,
      href: `/${currentLocale}/experience/independent-consultant`,
    },
    {
      id: 'hqpack',
      icon: Cpu,
      title: cvData.highlights.pillars[1].title,
      description: cvData.highlights.pillars[1].description,
      companies: ['HQPACK', 'ASML', 'ZEISS', 'BOEING', 'AIRBUS', 'SAMSUNG', 'FRENCKEN', 'NEWAYS'],
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
    <section id="specialization" className="pt-14 sm:pt-20 pb-2 sm:pb-4 relative overflow-hidden">
      {/* Dynamic Background Mesh & Glowing Orbits (Removed to keep background black as requested) */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* =========================================================================
           FIRST THING IN SECTION: EXECUTIVE LEADERSHIP SUMMARY BANNER
           ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-950 dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-950 light:bg-white border-2 border-cyan-500/40 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 dark:bg-cyan-950/80 light:bg-cyan-100 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
              <Award className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">{cvData.personal.roleTitle}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 dark:text-slate-200 light:text-slate-800 leading-relaxed font-normal">
              {cvData.personal.summary}
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              href={`/${currentLocale}/contact`}
              className="w-full md:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-cyan-500/25 whitespace-nowrap hover:scale-[1.02]"
            >
              <span>{cvData.common.contactTitle}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
          </div>
        </div>

        {/* Section Title Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 pt-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/70 dark:bg-cyan-950/70 light:bg-cyan-100 border border-cyan-500/30 text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
            <span className="uppercase tracking-wider">{cvData.highlights.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {cvData.highlights.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            {cvData.highlights.subtitle}
          </p>
        </div>

        {/* =========================================================================
           3 MAIN PILLARS IN EXACT REQUESTED ORDER:
           1st: HQ PACK | 2nd: VDL NEDCAR (BMW/MINI) | 3rd: GLOBAL SOURCING & AUDITING
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillarDetails.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 relative group overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-11 h-11 rounded-2xl bg-cyan-950/80 dark:bg-cyan-950/80 light:bg-cyan-100 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/10">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Highlight Achievement Badge */}
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 dark:bg-emerald-950/80 light:bg-emerald-100 border border-emerald-500/40 font-mono text-[10px] font-bold text-emerald-400 dark:text-emerald-400 light:text-emerald-700 truncate max-w-[190px]">
                      ✓ {pillar.achievement}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Direct Company Range Badges */}
                  <div className="pt-2">
                    <div className="text-[10px] font-mono uppercase text-slate-300 font-bold mb-2">
                      {cvData.common.ecosystemLabel}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {pillar.companies.map((company) => (
                        <div
                          key={company}
                          className="px-2 py-0.5 rounded-lg bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center space-x-1.5"
                        >
                          <div className="h-5 flex items-center">
                            <BrandLogo name={company} className="h-5 w-auto max-w-[60px]" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-slate-200 dark:text-slate-200">
                            {company}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-700 font-bold uppercase">
                    {cvData.common.coreCompetencies}
                  </span>
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
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
    </section>
  );
}
