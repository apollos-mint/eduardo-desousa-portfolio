'use client';

import React from 'react';
import Link from 'next/link';
import { Locale, CVContent } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';
import {
  Briefcase,
  Sliders,
  GraduationCap,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Car,
  TrendingUp,
  Award,
  CheckCircle2,
} from 'lucide-react';

interface HomeHubPortalsProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function HomeHubPortals({ currentLocale, cvData }: HomeHubPortalsProps) {
  const portals = [
    {
      id: 'experience',
      href: `/${currentLocale}/experience`,
      badge: 'CAREER TRACK RECORD',
      title: 'Professional Experience Hub',
      description:
        'Detailed case studies on ASML cleanroom packaging (HQ Pack), BMW & MINI Cooper OEM assembly lines (VDL Nedcar), and global industrial supplier audits.',
      icon: Briefcase,
      accentColor: 'from-cyan-500 to-blue-500',
      badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30',
      highlights: ['HQ Pack (ASML Supply Chain)', 'VDL Nedcar (BMW / MINI)', 'Global Factory Sourcing (China/India)'],
      brands: ['ASML', 'BMW', 'MINI', 'BOSCH'],
      cta: 'Explore Experiences',
    },
    {
      id: 'skills',
      href: `/${currentLocale}/skills`,
      badge: 'COMPETENCIES MATRIX',
      title: 'Visual Dynamic Skills Matrix',
      description:
        'Interactive filtering across 16 technical competencies: DMAIC, Root Cause Analysis, ISO 9001 compliance, ISAH ERP systems, and cleanroom mechanics.',
      icon: Sliders,
      accentColor: 'from-emerald-500 to-teal-500',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
      highlights: ['DMAIC 5-Phase Framework', 'ISAH ERP 100% Traceability', 'Statistical Process Control (SPC)'],
      brands: ['ISO 9001', 'TÜV', 'GOOGLE'],
      cta: 'Open Skills Matrix',
    },
    {
      id: 'certifications',
      href: `/${currentLocale}/certifications`,
      badge: 'VERIFIED CREDENTIALS',
      title: 'Certifications & DMAIC Roadmap',
      description:
        'Accredited credentials including Lean Six Sigma Black Belt, ISO 9001:2015 Lead Auditor, Google Data Analytics, Dutch VCA VOL, and Operations Degree.',
      icon: GraduationCap,
      accentColor: 'from-indigo-500 to-purple-500',
      badgeColor: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30',
      highlights: ['Lean Six Sigma Black Belt', 'ISO 9001:2015 Lead Auditor', 'Bachelor in Operations Management'],
      brands: ['TÜV', 'GOOGLE', 'ISO 9001'],
      cta: 'View Credentials & Gantt',
    },
  ];

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 bg-subtle-grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/60 dark:bg-cyan-950/60 light:bg-cyan-100 border border-cyan-500/30 text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">EXECUTIVE DIRECTORY &bull; DEDICATED SECTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore Dedicated Specialized Hubs
          </h2>
          <p className="text-sm text-slate-200">
            Access in-depth case studies, the interactive visual skills matrix, and accredited credentials on dedicated pages.
          </p>
        </div>

        {/* 3 Executive Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.id}
                href={portal.href}
                className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col justify-between group cursor-pointer transition-all duration-300 relative overflow-hidden shadow-xl"
              >
                {/* Top Glowing Accent Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${portal.accentColor} opacity-70 group-hover:opacity-100 transition-opacity`}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-md border ${portal.badgeColor} whitespace-nowrap`}>
                      {portal.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {portal.title}
                    </h3>
                    <p className="text-xs text-slate-200 leading-relaxed mt-2 line-clamp-3">
                      {portal.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-2">
                    {portal.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-slate-200 min-w-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA & Brand Strip */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-1.5 shrink-0">
                    {portal.brands.slice(0, 2).map((b) => (
                      <div key={b} className="h-5 flex items-center">
                        <BrandLogo name={b} className="h-4 w-auto max-w-[50px]" />
                      </div>
                    ))}
                  </div>

                  <div className="inline-flex items-center space-x-1 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 whitespace-nowrap">
                    <span>{portal.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
