'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale, CVContent } from '@/types';
import CertificateInteractiveWidget from '@/components/interactive/CertificateInteractiveWidget';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
} from 'lucide-react';

interface EducationCertificatesSectionProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function EducationCertificatesSection({
  currentLocale,
  cvData,
}: EducationCertificatesSectionProps) {
  // Start all cards closed by default
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/70 dark:bg-cyan-950/70 light:bg-cyan-100 border border-cyan-500/30 text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">
              {cvData.navigation.certifications} // Verified Credentials
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & International Certifications
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            Click any credential to unfold its interactive DMAIC Gantt roadmap or audit compliance radar.
          </p>
        </div>

        {/* Credentials Accordion Grid */}
        <div className="space-y-5">
          {cvData.educationAndCertifications.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`glass-panel rounded-2xl sm:rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                  isExpanded
                    ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/10 bg-slate-950/90 dark:bg-slate-950/90 light:bg-white'
                    : 'border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-cyan-500/30 bg-slate-950/60 dark:bg-slate-950/60 light:bg-white/80'
                }`}
              >
                {/* 1st Click Header Target */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-2 lg:max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-cyan-950/80 dark:bg-cyan-950/80 light:bg-cyan-100 border border-cyan-500/40 text-cyan-300 dark:text-cyan-300 light:text-cyan-700">
                        {item.credentialBadge}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 font-semibold">
                        {item.institution}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
                      <span>{item.title}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Expand Prompt Button */}
                  <div className="flex items-center justify-between lg:justify-end space-x-3 shrink-0 pt-2 lg:pt-0">
                    <div className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-cyan-950/60 dark:bg-cyan-950/60 light:bg-cyan-50 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold">
                      <span>{isExpanded ? cvData.navigation.clickToCollapse : cvData.navigation.clickToExpand}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded State (Unfolds on 1st click) */}
                {isExpanded && (
                  <div className="px-5 sm:px-7 pb-7 pt-2 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 space-y-6 animate-in slide-in-from-top-4 duration-300">
                    {/* Embedded Dynamic Widget (e.g. DMAIC Gantt Chart) */}
                    <div className="mt-2">
                      <CertificateInteractiveWidget itemId={item.id} title={item.title} currentLocale={currentLocale} />
                    </div>

                    {/* Key Curriculum Takeaways */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                        Curriculum Highlights & Applied Competencies:
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {item.keyTakeaways.map((takeaway, idx) => (
                          <div
                            key={idx}
                            className="flex items-start space-x-2.5 text-xs text-slate-600 dark:text-slate-300"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2nd Click Target: Dedicated Page */}
                    <div className="pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.skillsAcquired.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-[11px] font-mono text-emerald-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/${currentLocale}/education/${item.id}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/20 shrink-0"
                      >
                        <span>{cvData.navigation.openDedicatedPage}</span>
                        <ArrowUpRight className="w-4 h-4" />
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
