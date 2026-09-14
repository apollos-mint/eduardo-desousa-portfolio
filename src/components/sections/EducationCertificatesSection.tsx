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
  hideHeader?: boolean;
}

const sectionDict: Record<Locale, {
  verifiedCredentialsBadge: string;
  educationTitle: string;
  educationSubtitle: string;
  curriculumHighlights: string;
  validateCredential: string;
}> = {
  es: {
    verifiedCredentialsBadge: 'Credenciales Verificadas',
    educationTitle: 'Educación y Certificaciones Internacionales',
    educationSubtitle: 'Despliega cualquier credencial para inspeccionar su hoja de ruta interactiva DMAIC o matriz de conformidad.',
    curriculumHighlights: 'Puntos Destacados del Plan de Estudios y Competencias Aplicadas:',
    validateCredential: 'VALIDAR CREDENCIAL',
  },
  en: {
    verifiedCredentialsBadge: 'Verified Credentials',
    educationTitle: 'Education & International Certifications',
    educationSubtitle: 'Click any credential to unfold its interactive DMAIC Gantt roadmap or audit compliance radar.',
    curriculumHighlights: 'Curriculum Highlights & Applied Competencies:',
    validateCredential: 'VALIDATE CREDENTIAL',
  },
  de: {
    verifiedCredentialsBadge: 'Verifizierte Qualifikationen',
    educationTitle: 'Ausbildung & Internationale Zertifizierungen',
    educationSubtitle: 'Klicken Sie auf eine Qualifikation, um die interaktive DMAIC-Gantt-Roadmap oder das Audit-Radar anzuzeigen.',
    curriculumHighlights: 'Lehrplan-Highlights & Angewandte Kompetenzen:',
    validateCredential: 'ZERTIFIKAT VERIFIZIEREN',
  },
  fr: {
    verifiedCredentialsBadge: 'Titres Vérifiés',
    educationTitle: 'Éducation & Certifications Internationales',
    educationSubtitle: 'Cliquez sur un titre pour déplier la feuille de route interactive DMAIC ou la matrice de conformité.',
    curriculumHighlights: 'Points Forts du Programme & Compétences Appliquées :',
    validateCredential: 'VÉRIFIER LE TITRE',
  },
  pt: {
    verifiedCredentialsBadge: 'Credenciais Verificadas',
    educationTitle: 'Educação e Certificações Internacionais',
    educationSubtitle: 'Clique em qualquer credencial para ver o roteiro interativo DMAIC ou a matriz de conformidade.',
    curriculumHighlights: 'Destaques do Currículo & Competências Aplicadas:',
    validateCredential: 'VALIDAR CREDENCIAL',
  },
  nl: {
    verifiedCredentialsBadge: 'Geverifieerde Kwalificaties',
    educationTitle: 'Opleiding & Internationale Certificeringen',
    educationSubtitle: 'Klik op een kwalificatie om de interactieve DMAIC-Gantt-roadmap of audit-compliance-matrix te bekijken.',
    curriculumHighlights: 'Curriculum Hoogtepunten & Toegepaste Competenties:',
    validateCredential: 'CERTIFICAAT VERIFIËREN',
  },
};

export default function EducationCertificatesSection({
  currentLocale,
  cvData,
  hideHeader = false,
}: EducationCertificatesSectionProps) {
  const t = sectionDict[currentLocale] || sectionDict.es;
  // Start all cards closed by default
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="certifications" className={`${hideHeader ? 'py-2' : 'py-20'} relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (optional if page provides its own) */}
        {!hideHeader && (
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/15 dark:bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-800 dark:text-cyan-400">
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">
                {cvData.navigation.certifications} // {t.verifiedCredentialsBadge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.educationTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200">
              {t.educationSubtitle}
            </p>
          </div>
        )}

        {/* Credentials Accordion Grid */}
        <div className="space-y-6">
          {cvData.educationAndCertifications.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`cyber-card rounded-2xl sm:rounded-3xl transition-all duration-300 relative overflow-hidden group ${
                  isExpanded
                    ? 'border-cyan-400/80 shadow-2xl shadow-cyan-500/20 bg-slate-950/90'
                    : ''
                }`}
              >
                {/* Cybernetic HUD Corner Brackets */}
                <div className="cyber-corner-tl" />
                <div className="cyber-corner-tr" />
                <div className="cyber-corner-bl" />
                <div className="cyber-corner-br" />

                {/* Subtle Radial Holographic Hover Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 group-hover:bg-cyan-500/25 transition-all duration-500" />

                <button
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer focus:outline-none relative z-10 group/header"
                >
                  <div className="space-y-2.5 lg:max-w-2xl">
                    {/* Telemetry Header */}
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
                      <span className="font-bold tracking-widest text-cyan-400">[DOSSIER // REF-{item.id.toUpperCase()}]</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.verificationUrl ? 'OFFICIAL VIRTUALBADGE VALIDATED' : 'AUDIT VERIFIED'}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-sm">
                        {item.credentialBadge}
                      </span>
                      <span className="text-xs font-mono text-cyan-300 font-semibold px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700/80">
                        {item.institution}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2 group-hover/header:text-cyan-300 transition-colors tracking-tight">
                      <span>{item.title}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal text-justify">
                      {item.description}
                    </p>
                  </div>

                  {/* Expand Prompt Button with Cursor Reactive Glow */}
                  <div className="flex items-center justify-between lg:justify-end space-x-3 shrink-0 pt-2 lg:pt-0">
                    <div className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-md text-xs font-bold uppercase tracking-wider ${
                      isExpanded
                        ? 'bg-cyan-950/90 border-2 border-cyan-400 text-cyan-200 shadow-cyan-500/25'
                        : 'bg-slate-900/90 hover:bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100'
                    }`}>
                      <span>{isExpanded ? cvData.navigation.clickToCollapse : cvData.navigation.clickToExpand}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-300" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
                    </div>
                  </div>
                </button>

                {/* Expanded State (Unfolds on 1st click) */}
                {isExpanded && (
                  <div className="px-5 sm:px-7 pb-7 pt-2 border-t border-slate-800 space-y-6 animate-in slide-in-from-top-4 duration-300 relative z-10">
                    {/* Embedded Dynamic Widget (e.g. DMAIC Gantt Chart) */}
                    <div className="mt-2">
                      <CertificateInteractiveWidget itemId={item.id} title={item.title} currentLocale={currentLocale} />
                    </div>

                    {/* Key Curriculum Takeaways */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                        {t.curriculumHighlights}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {item.keyTakeaways.map((takeaway, idx) => (
                          <div
                            key={idx}
                            className="flex items-start space-x-2.5 text-xs text-slate-300 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80"
                          >
                            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed text-justify">{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2nd Click Target: Dedicated Page */}
                    <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.skillsAcquired.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono text-emerald-400 shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        {item.verificationUrl && (
                          <a
                            href={item.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all shrink-0"
                          >
                            <span>{t.validateCredential}: VirtualBadge</span>
                            <ExternalLink className="w-4 h-4 text-slate-950 shrink-0" />
                          </a>
                        )}

                        <Link
                          href={`/${currentLocale}/education/${item.id}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:scale-105 shrink-0"
                        >
                          <span>{cvData.navigation.openDedicatedPage}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
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
