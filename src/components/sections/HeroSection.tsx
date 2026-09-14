'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, CVContent } from '@/types';
import HeroScene from '@/components/3d/HeroScene';
import InfiniteBrandMarquee from '@/components/ui/InfiniteBrandMarquee';
import { generateVCard } from '@/lib/utils';
import { renderFormattedText } from '@/lib/formatter';
import {
  Sparkles,
  Download,
  FileDown,
  ArrowRight,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Car,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
  ChevronDown,
  Code2,
  Award,
  Cpu,
} from 'lucide-react';

interface HeroSectionProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function HeroSection({ currentLocale, cvData }: HeroSectionProps) {
  return (
    <section className="relative flex items-center justify-center pt-24 pb-7 sm:pt-28 sm:pb-8 md:pt-32 overflow-hidden">
      {/* 3D Scene Layer */}
      <HeroScene />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Grid: Headline & Executive Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column (7 Cols): Headline & Executive Actions */}
          <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
            {/* Self-Development & Availability Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-md shadow-cyan-500/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] sm:text-xs font-mono font-bold text-cyan-800 dark:text-cyan-300 tracking-wider">
                  {cvData.hero.badge}
                </span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>{cvData.hero.developedBySelfBadge}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              <span>{cvData.hero.titleLine1}</span>{' '}
              <span className="gradient-text-cyan">{cvData.hero.titleLine2}</span>
            </h1>

            {/* Subtitle with High-Contrast Bold Parentheses */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {renderFormattedText(cvData.hero.subtitle)}
            </p>

            {/* Executive Contact Pills Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <a
                href={`mailto:${cvData.personal.email}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-700 dark:border-slate-700 light:border-slate-300 text-xs text-slate-200 dark:text-slate-200 light:text-slate-700 hover:text-cyan-300 transition-colors shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{cvData.personal.email}</span>
              </a>

              <a
                href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-50 border border-emerald-500/40 text-xs text-emerald-300 dark:text-emerald-300 light:text-emerald-700 transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>{cvData.personal.phones.callsAndWhatsApp} (WhatsApp)</span>
              </a>

              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-700 dark:border-slate-700 light:border-slate-300 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{cvData.personal.location}</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              <a
                href={`/Eduardo_de_Sousa_Resume_${currentLocale}.pdf`}
                download={`Eduardo_de_Sousa_Resume_${currentLocale.toUpperCase()}.pdf`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all duration-200"
              >
                <FileDown className="w-4 h-4 text-slate-950" />
                <span>{cvData.hero.downloadCvBtn || 'Download Official CV (PDF)'}</span>
              </a>

              <a
                href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}?text=${encodeURIComponent(
                  'Hello Eduardo, I am reviewing your profile and would like to arrange a call.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 sm:py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>{cvData.hero.contactBtn}</span>
              </a>

              <button
                onClick={() => generateVCard(cvData.personal.roleTitle, cvData.personal.headline)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-3 rounded-xl bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm transition-all duration-200 shadow-sm"
              >
                <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{cvData.navigation.downloadVCard}</span>
              </button>

              <Link
                href={`/${currentLocale}#specialization`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white/80 dark:bg-slate-950/60 hover:bg-cyan-50 dark:hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-500 text-cyan-800 dark:text-cyan-300 font-medium text-xs sm:text-sm transition-all duration-200 shadow-sm"
              >
                <span>{cvData.hero.exploreBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column (5 Cols): High-Tech Executive Portrait with Holographic Frame & Floating Chips */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] group">
              {/* Outer Ambient Glow Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500 via-emerald-500 to-indigo-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse-subtle" />

              {/* Card Container */}
              <div className="relative rounded-3xl bg-white dark:bg-slate-950 border-2 border-cyan-500/40 p-2 shadow-2xl overflow-hidden">
                {/* Portrait Image */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src="/images/eduardo-hero.jpg"
                    alt="Eduardo de Sousa - Operations & Quality Leader"
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                    className="object-cover object-top filter brightness-[1.02] contrast-[1.03] group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Gradient Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* High-Tech HUD Scanlines & Target Corners */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                  {/* Live Status Tag */}
                  <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 p-2 sm:p-2.5 rounded-xl bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 shadow-lg space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-950 dark:text-white text-xs sm:text-sm whitespace-nowrap">Eduardo de Sousa</span>
                      <span className="flex items-center space-x-1 text-[9px] sm:text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>{cvData.common.verifiedLead}</span>
                      </span>
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono font-medium text-cyan-800 dark:text-cyan-300 leading-snug">
                      {cvData.common.portraitSubtitle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Credential Tag Top-Left */}
              <div className="absolute -top-3 -left-3 sm:-left-4 px-3 py-1 rounded-xl bg-white dark:bg-slate-900/95 border border-cyan-500/40 shadow-xl flex items-center space-x-1.5 text-xs font-mono text-cyan-800 dark:text-cyan-300 backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span className="font-bold">{cvData.common.leanSixSigmaBadge}</span>
              </div>

              {/* Floating Technology Tag Bottom-Right */}
              <div className="absolute -bottom-3 -right-3 sm:-right-4 px-3 py-1 rounded-xl bg-white dark:bg-slate-900/95 border border-emerald-500/40 shadow-xl flex items-center space-x-1.5 text-xs font-mono text-emerald-800 dark:text-emerald-300 backdrop-blur-md">
                <Cpu className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span className="font-bold">{cvData.common.asmlSupplyChainBadge}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Scrolling Brand & Technology Showcase */}
        <div className="mt-5 sm:mt-6 max-w-6xl mx-auto">
          <InfiniteBrandMarquee currentLocale={currentLocale} />
        </div>
      </div>
    </section>
  );
}
