'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale, CVContent, SkillItem } from '@/types';
import {
  Sliders,
  Search,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Database,
  Wrench,
  Sparkles,
  Layers,
  X,
  Eye,
  ExternalLink,
} from 'lucide-react';

interface DynamicSkillMatrixWidgetProps {
  currentLocale: Locale;
  cvData: CVContent;
}

const widgetI18n = {
  es: {
    searchPlaceholder: 'Buscar competencias, herramientas o metodologías (ej. DMAIC, ISAH, ISO 9001)...',
    showing: 'Mostrando:',
    competencies: 'competencias',
    verified: 'verificadas',
    mastery: 'Dominio',
    quickInspect: 'Inspección Rápida',
    openDedicatedPage: 'Abrir Página Completa',
    methodology: 'Metodología & Marco de Trabajo',
    application: 'Aplicación Práctica & Entregables',
    toolsTitle: 'Herramientas & Tecnologías Clave',
    relatedExperience: 'Experiencia Profesional Relacionada',
    close: 'Cerrar',
    categories: {
      'problem-solving': 'DMAIC y Resolución de Problemas',
      'quality-compliance': 'Calidad y Cumplimiento ISO',
      'systems-data': 'ERP (ISAH) y Analítica de Datos',
      'technical-engineering': 'Sala Limpia y Mecánica Industrial',
    } as Record<string, string>,
  },
  en: {
    searchPlaceholder: 'Search skills, tools, or methodologies (e.g. DMAIC, ISAH, ISO 9001)...',
    showing: 'Showing:',
    competencies: 'competencies',
    verified: 'verified',
    mastery: 'Mastery',
    quickInspect: 'Quick Inspect',
    openDedicatedPage: 'Open Dedicated Case Study',
    methodology: 'Methodology & Framework',
    application: 'Practical Application & Deliverables',
    toolsTitle: 'Key Tools & Technologies',
    relatedExperience: 'Related Professional Experience',
    close: 'Close',
    categories: {
      'problem-solving': 'DMAIC & Problem Solving',
      'quality-compliance': 'Quality & ISO Compliance',
      'systems-data': 'ERP (ISAH) & Data Analytics',
      'technical-engineering': 'Cleanroom & Mechanics',
    } as Record<string, string>,
  },
  de: {
    searchPlaceholder: 'Kompetenzen, Werkzeuge oder Methoden suchen (z.B. DMAIC, ISAH, ISO 9001)...',
    showing: 'Angezeigt:',
    competencies: 'Kompetenzen',
    verified: 'verifiziert',
    mastery: 'Kompetenz',
    quickInspect: 'Schnellansicht',
    openDedicatedPage: 'Vollständige Seite öffnen',
    methodology: 'Methodik & Framework',
    application: 'Praktische Anwendung & Ergebnisse',
    toolsTitle: 'Wichtigste Tools & Technologien',
    relatedExperience: 'Zugehörige Berufserfahrung',
    close: 'Schließen',
    categories: {
      'problem-solving': 'DMAIC & Problemlösung',
      'quality-compliance': 'Qualität & ISO-Konformität',
      'systems-data': 'ERP (ISAH) & Datenanalyse',
      'technical-engineering': 'Reinraum & Industriemechanik',
    } as Record<string, string>,
  },
  fr: {
    searchPlaceholder: 'Rechercher compétences, outils ou méthodologies (ex. DMAIC, ISAH, ISO 9001)...',
    showing: 'Affichage :',
    competencies: 'compétences',
    verified: 'vérifiées',
    mastery: 'Maîtrise',
    quickInspect: 'Aperçu Rapide',
    openDedicatedPage: 'Ouvrir la Page Dédiée',
    methodology: 'Méthodologie & Cadre',
    application: 'Application Pratique & Livrables',
    toolsTitle: 'Outils & Technologies Clés',
    relatedExperience: 'Expérience Professionnelle Associée',
    close: 'Fermer',
    categories: {
      'problem-solving': 'DMAIC & Résolution de Problèmes',
      'quality-compliance': 'Qualité & Conformité ISO',
      'systems-data': 'ERP (ISAH) & Analyse de Données',
      'technical-engineering': 'Salle Blanche & Mécanique',
    } as Record<string, string>,
  },
  pt: {
    searchPlaceholder: 'Pesquisar competências, ferramentas ou metodologias (ex. DMAIC, ISAH, ISO 9001)...',
    showing: 'Mostrando:',
    competencies: 'competências',
    verified: 'verificadas',
    mastery: 'Domínio',
    quickInspect: 'Inspeção Rápida',
    openDedicatedPage: 'Abrir Página Completa',
    methodology: 'Metodologia & Estrutura',
    application: 'Aplicação Prática & Entregáveis',
    toolsTitle: 'Ferramentas & Tecnologias Principais',
    relatedExperience: 'Experiência Profissional Relacionada',
    close: 'Fechar',
    categories: {
      'problem-solving': 'DMAIC e Resolução de Problemas',
      'quality-compliance': 'Qualidade e Conformidade ISO',
      'systems-data': 'ERP (ISAH) e Análise de Dados',
      'technical-engineering': 'Sala Limpa e Mecânica Industrial',
    } as Record<string, string>,
  },
  nl: {
    searchPlaceholder: 'Zoek vaardigheden, tools of methodologieën (bijv. DMAIC, ISAH, ISO 9001)...',
    showing: 'Weergave:',
    competencies: 'competenties',
    verified: 'geverifieerd',
    mastery: 'Beheersing',
    quickInspect: 'Snelle Inspectie',
    openDedicatedPage: 'Volledige Pagina Openen',
    methodology: 'Methodologie & Kader',
    application: 'Praktische Toepassing & Opleveringen',
    toolsTitle: 'Belangrijkste Tools & Technologieën',
    relatedExperience: 'Gerelateerde Werkervaring',
    close: 'Sluiten',
    categories: {
      'problem-solving': 'DMAIC & Probleemoplossing',
      'quality-compliance': 'Kwaliteit & ISO-Naleving',
      'systems-data': 'ERP (ISAH) & Data-analyse',
      'technical-engineering': 'Cleanroom & Industriële Mechanica',
    } as Record<string, string>,
  },
};

export default function DynamicSkillMatrixWidget({
  currentLocale,
  cvData,
}: DynamicSkillMatrixWidgetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingSkill, setInspectingSkill] = useState<SkillItem | null>(null);

  const loc = widgetI18n[currentLocale as keyof typeof widgetI18n] || widgetI18n.es;

  // Escape key listener for closing inspection modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInspectingSkill(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = [
    { id: 'all', name: cvData.navigation.allSkills, icon: Layers, count: cvData.skills.length },
    { id: 'problem-solving', name: loc.categories['problem-solving'], icon: TrendingUp, count: cvData.skills.filter((s) => s.category === 'problem-solving').length },
    { id: 'quality-compliance', name: loc.categories['quality-compliance'], icon: ShieldCheck, count: cvData.skills.filter((s) => s.category === 'quality-compliance').length },
    { id: 'systems-data', name: loc.categories['systems-data'], icon: Database, count: cvData.skills.filter((s) => s.category === 'systems-data').length },
    { id: 'technical-engineering', name: loc.categories['technical-engineering'], icon: Wrench, count: cvData.skills.filter((s) => s.category === 'technical-engineering').length },
  ];

  const filteredSkills = cvData.skills.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Control Hub */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white/45 dark:bg-slate-900/50 backdrop-blur-md border border-cyan-500/30 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={loc.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 focus:outline-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 shadow-inner"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span>{loc.showing}</span>
            <span className="font-bold text-cyan-700 dark:text-cyan-400">{filteredSkills.length} {loc.competencies}</span>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-center space-x-2.5 cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'bg-cyan-950/85 border-2 border-cyan-400 text-cyan-200 font-bold shadow-lg shadow-cyan-500/25 scale-[1.02]'
                    : 'cyber-button-glass text-slate-200 hover:text-cyan-200'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-300' : 'text-cyan-400'}`} />
                <div className="truncate">
                  <div className="text-xs truncate font-medium">{cat.name}</div>
                  <div className={`text-[10px] font-mono ${isSelected ? 'text-cyan-200 font-bold' : 'text-slate-400'}`}>
                    {cat.count} {loc.verified}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Cybernetic Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, sIdx) => (
          <div
            key={skill.id}
            onClick={() => setInspectingSkill(skill)}
            className="cyber-card p-6 rounded-3xl group cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            {/* Cybernetic HUD Corner Brackets */}
            <div className="cyber-corner-tl" />
            <div className="cyber-corner-tr" />
            <div className="cyber-corner-bl" />
            <div className="cyber-corner-br" />

            {/* Subtle Radial Holographic Hover Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12 group-hover:bg-cyan-500/25 transition-all duration-500" />

            {/* Top Telemetry & Category Header Strip */}
            <div className="space-y-3.5 relative z-10">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
                  <span className="font-bold tracking-widest text-cyan-400">
                    [SYS.ID // SKL-{String(sIdx + 1).padStart(2, '0')}]
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="tracking-wider">{skill.level}% {loc.mastery.toUpperCase()}</span>
                </div>
              </div>

              {/* Category Pill with Semi-transparent Cursor-reactive Glass Design */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300 shadow-sm">
                  <span className="uppercase tracking-wider">
                    {loc.categories[skill.category] || skill.category.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Digital Mastery Segmented HUD Progress Meter */}
              <div className="space-y-1">
                <div className="w-full h-2 bg-slate-950/80 rounded-full border border-slate-700/60 p-0.5 overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-500 shadow-sm shadow-cyan-500/50"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mt-1.5 font-normal">
                  {skill.description}
                </p>
              </div>

              {/* Tools & Framework Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skill.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/50 text-[10px] font-mono text-slate-300 hover:text-cyan-200 transition-colors shadow-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action Row with Semi-Transparent Glassmorphic Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs relative z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setInspectingSkill(skill);
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl cyber-button-glass text-slate-200 hover:text-cyan-300 text-xs font-mono font-medium cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>{loc.quickInspect}</span>
              </button>

              <Link
                href={`/${currentLocale}/skills/${skill.id}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-950/75 hover:bg-cyan-900/90 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-mono font-bold shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/25 hover:scale-105 transition-all"
              >
                <span>{cvData.navigation.viewDeepDive}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Inline Quick-Inspection Modal */}
      {inspectingSkill && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setInspectingSkill(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[calc(100vh-8.5rem)] overflow-y-auto rounded-3xl bg-slate-950/95 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 p-6 sm:p-8 space-y-6 text-white backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HUD Corner Brackets */}
            <div className="cyber-corner-tl" />
            <div className="cyber-corner-tr" />
            <div className="cyber-corner-bl" />
            <div className="cyber-corner-br" />

            {/* Top action row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300 uppercase shadow-sm">
                  {loc.categories[inspectingSkill.category] || inspectingSkill.category.replace('-', ' ')}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-300 shadow-sm">
                  {inspectingSkill.level}% {loc.mastery}
                </span>
              </div>
              <button
                onClick={() => setInspectingSkill(null)}
                className="p-2 rounded-full hover:bg-cyan-950 border border-transparent hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                aria-label={loc.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Short Description */}
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {inspectingSkill.name}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {inspectingSkill.description}
              </p>
            </div>

            {/* Mastery Progress Bar */}
            <div className="space-y-1.5 relative z-10">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>{loc.mastery}</span>
                <span className="font-bold text-cyan-400">{inspectingSkill.level}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full border border-slate-700/80 p-0.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full shadow-sm shadow-cyan-500/50"
                  style={{ width: `${inspectingSkill.level}%` }}
                />
              </div>
            </div>

            {/* Methodology Section */}
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-2 relative z-10">
              <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{loc.methodology}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                {inspectingSkill.methodology}
              </p>
            </div>

            {/* Practical Application Section */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 relative z-10">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold text-xs uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{loc.application}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {inspectingSkill.practicalApplication}
              </p>
            </div>

            {/* Tools tags */}
            <div className="space-y-2 relative z-10">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                {loc.toolsTitle}
              </div>
              <div className="flex flex-wrap gap-2">
                {inspectingSkill.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-mono text-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Career Experiences */}
            {inspectingSkill.relatedExperienceIds.length > 0 && (
              <div className="space-y-2 pt-2 relative z-10">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  {loc.relatedExperience}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cvData.experiences
                    .filter((exp) => inspectingSkill.relatedExperienceIds.includes(exp.id))
                    .map((exp) => (
                      <Link
                        key={exp.id}
                        href={`/${currentLocale}/experience/${exp.id}`}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-xs text-cyan-300 transition-colors"
                      >
                        <span className="font-semibold">{exp.role}</span>
                        <span className="text-slate-400 font-mono text-[10px]">({exp.company})</span>
                        <ArrowRight className="w-3 h-3 ml-0.5" />
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
              <button
                onClick={() => setInspectingSkill(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl cyber-button-glass text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white cursor-pointer"
              >
                {loc.close}
              </button>

              <Link
                href={`/${currentLocale}/skills/${inspectingSkill.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border-2 border-cyan-400/70 text-cyan-200 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
              >
                <span>{loc.openDedicatedPage}</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
