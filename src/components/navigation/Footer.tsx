'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, CVContent } from '@/types';
import { locales } from '@/data/cv-data';
import { getLocalizedPath } from '@/lib/i18n';
import { generateVCard } from '@/lib/utils';
import {
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  Award,
  Cpu,
  Download,
  FileDown,
  ArrowUpRight,
  Code2,
  Heart,
} from 'lucide-react';

interface FooterProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function Footer({ currentLocale, cvData }: FooterProps) {
  return (
    <footer className="border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/90 dark:bg-slate-950/90 light:bg-slate-50 relative overflow-hidden pt-16 pb-12">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Creator Highlight Banner */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-cyan-950/40 dark:bg-cyan-950/40 light:bg-cyan-50 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
            <Code2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>
              <strong>{cvData.common.craftedBySelf}</strong>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{cvData.common.techStackBadge}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
          {/* Col 1: Executive Profile */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-[1.5px] shadow-lg shadow-cyan-500/20 shrink-0">
                <div className="w-full h-full rounded-[10px] overflow-hidden relative bg-slate-900">
                  <Image
                    src="/images/eduardo-desousa.jpg"
                    alt="Eduardo de Sousa"
                    fill
                    sizes="40px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <span className="font-bold text-white text-lg">Eduardo de Sousa</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {cvData.personal.headline}
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{cvData.common.operationalReady}</span>
            </div>
          </div>

          {/* Col 2: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              {cvData.common.contactTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{cvData.personal.location}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${cvData.personal.email}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {cvData.personal.email}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`tel:${cvData.personal.phones.callsOnly.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {cvData.personal.phones.callsOnly} (Calls)
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {cvData.personal.phones.callsAndWhatsApp} (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Credentials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              {cvData.navigation.certifications} {cvData.common.andStandards}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>{cvData.common.leanSixSigmaBadge}</span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{cvData.common.iso9001Auditor}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>{cvData.common.asmlCleanroom}</span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{cvData.common.vcaVol}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Actions & i18n */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold">
              {cvData.navigation.switchLanguage}
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {locales.map((loc) => (
                <Link
                  key={loc.code}
                  href={`/${loc.code}`}
                  className={`flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-md text-[11px] font-mono border transition-all ${
                    loc.code === currentLocale
                      ? 'bg-cyan-950/60 dark:bg-cyan-950/60 light:bg-cyan-100 border-cyan-500/50 text-cyan-400 font-bold'
                      : 'bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{loc.flag}</span>
                  <span>{loc.code.toUpperCase()}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={`/Eduardo_de_Sousa_Resume_${currentLocale}.pdf`}
                download={`Eduardo_de_Sousa_Resume_${currentLocale.toUpperCase()}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border border-cyan-500/40 text-xs font-semibold text-cyan-300 dark:text-cyan-300 light:text-cyan-700 transition-colors shadow-sm"
              >
                <FileDown className="w-3.5 h-3.5 text-cyan-400" />
                <span>{cvData.navigation.downloadPdf || 'Download Executive CV (PDF)'}</span>
              </a>

              <button
                onClick={() => generateVCard(cvData.personal.roleTitle, cvData.personal.headline)}
                className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-white hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 border border-slate-700 dark:border-slate-700 light:border-slate-300 text-xs font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>{cvData.navigation.downloadVCard}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Eduardo de Sousa. {cvData.common.allRightsReserved}
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <span>{cvData.common.locations}</span>
            </span>
            <span>&bull;</span>
            <span className="text-cyan-400 font-medium">{cvData.common.fullStackArchitecture}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
