'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, CVContent } from '@/types';
import HeroScene from '@/components/3d/HeroScene';
import InfiniteBrandMarquee from '@/components/ui/InfiniteBrandMarquee';
import { generateVCard } from '@/lib/utils';
import {
  Sparkles,
  Download,
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
    <section className="relative flex items-center justify-center pt-20 pb-8 sm:pt-24 sm:pb-8 overflow-hidden">
      {/* 3D Scene Layer */}
      <HeroScene />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Grid: Headline & Executive Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (7 Cols): Headline & Executive Actions */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            {/* Self-Development & Availability Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-cyan-50 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/10">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] sm:text-xs font-mono font-medium text-cyan-300 dark:text-cyan-300 light:text-cyan-700 tracking-wider">
                  {cvData.hero.badge}
                </span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-700/80 text-[11px] font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{cvData.hero.developedBySelfBadge}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              <span>{cvData.hero.titleLine1}</span>{' '}
              <span className="gradient-text-cyan">{cvData.hero.titleLine2}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {cvData.hero.subtitle}
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
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <a
                href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}?text=${encodeURIComponent(
                  'Hello Eduardo, I am reviewing your profile and would like to arrange a call.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 text-slate-950" />
                <span>{cvData.hero.contactBtn}</span>
              </a>

              <button
                onClick={generateVCard}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 border border-slate-700 hover:border-slate-600 text-white font-semibold text-sm transition-all duration-200 shadow-md"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>{cvData.navigation.downloadVCard}</span>
              </button>

              <Link
                href={`/${currentLocale}#experience`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-white/80 hover:bg-slate-900 dark:hover:bg-slate-900 light:hover:bg-cyan-50 border border-cyan-500/30 hover:border-cyan-500 text-cyan-400 dark:text-cyan-300 light:text-cyan-700 font-semibold text-sm transition-all duration-200"
              >
                <span>{cvData.hero.exploreBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column (5 Cols): High-Tech Executive Portrait with Holographic Frame & Floating Chips */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] group">
              {/* Outer Ambient Glow Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500 via-emerald-500 to-indigo-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse-subtle" />

              {/* Card Container */}
              <div className="relative rounded-3xl bg-slate-950 dark:bg-slate-950 light:bg-white border-2 border-cyan-500/40 p-2.5 shadow-2xl overflow-hidden">
                {/* Portrait Image */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src="/images/eduardo-desousa.jpg"
                    alt="Eduardo de Sousa - Operations & Quality Leader"
                    fill
                    priority
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 400px"
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
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-slate-950/85 dark:bg-slate-950/85 light:bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">Eduardo de Sousa</span>
                      <span className="flex items-center space-x-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>{cvData.common.verifiedLead}</span>
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-cyan-300 truncate">
                      {cvData.common.portraitSubtitle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Credential Tag Top-Left */}
              <div className="absolute -top-3 -left-3 sm:-left-4 px-3 py-1.5 rounded-xl bg-slate-900/95 dark:bg-slate-900/95 light:bg-white border border-cyan-500/40 shadow-xl flex items-center space-x-2 text-xs font-mono text-cyan-300 dark:text-cyan-300 light:text-cyan-700 backdrop-blur-md">
                <Award className="w-4 h-4 text-cyan-400" />
                <span className="font-bold">{cvData.common.leanSixSigmaBadge}</span>
              </div>

              {/* Floating Technology Tag Bottom-Right */}
              <div className="absolute -bottom-3 -right-3 sm:-right-4 px-3 py-1.5 rounded-xl bg-slate-900/95 dark:bg-slate-900/95 light:bg-white border border-emerald-500/40 shadow-xl flex items-center space-x-2 text-xs font-mono text-emerald-300 dark:text-emerald-300 light:text-emerald-700 backdrop-blur-md">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">{cvData.common.asmlSupplyChainBadge}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Scrolling Brand & Technology Showcase */}
        <div className="mt-10 max-w-6xl mx-auto">
          <InfiniteBrandMarquee currentLocale={currentLocale} />
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none text-slate-500 flex flex-col items-center">
        <ChevronDown className="w-5 h-5 animate-bounce text-cyan-400" />
      </div>
    </section>
  );
}
