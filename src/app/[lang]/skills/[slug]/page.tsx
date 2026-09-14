import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getAllSkillStaticParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import {
  ArrowLeft,
  ArrowRight,
  Sliders,
  Wrench,
  Layers,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import LightweightAnimatedBackground from '@/components/ui/LightweightAnimatedBackground';

export function generateStaticParams() {
  return getAllSkillStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;
  if (!isValidLocale(lang)) return {};

  const cvData = getCVData(lang as Locale);
  const skill = cvData.skills.find((s) => s.id === slug);
  if (!skill) return {};

  return {
    title: `${skill.name} | ${cvData.personal.fullName}`,
    description: skill.description,
  };
}

const skillDetailI18n = {
  es: {
    competencyIndex: 'COMPETENCIA',
    mastery: 'Nivel de Dominio',
    frameworkTitle: 'Marco Teórico y Metodológico',
    executionTitle: 'Ejecución Práctica en Entorno Industrial',
    toolsTitle: 'Herramientas Industriales, Instrumentación y Normas',
    appliedInRoles: 'Aplicado en Roles Profesionales',
    consultOn: 'Consultar sobre',
    categories: {
      'problem-solving': 'Resolución de Problemas y DMAIC',
      'quality-compliance': 'Calidad y Cumplimiento ISO',
      'systems-data': 'Sistemas ERP y Analítica de Datos',
      'technical-engineering': 'Ingeniería Técnica y Sala Limpia',
      'international-sourcing': 'Sourcing Global y Cadena de Suministro',
      'digital-operations': 'Operaciones Digitales',
      'operations-management': 'Gestión de Operaciones',
    } as Record<string, string>,
  },
  en: {
    competencyIndex: 'COMPETENCY',
    mastery: 'Mastery Level',
    frameworkTitle: 'Theoretical & Methodological Framework',
    executionTitle: 'Real-World Industrial Execution',
    toolsTitle: 'Industrial Tools, Instrumentation & Standards',
    appliedInRoles: 'Applied In Career Roles',
    consultOn: 'Consult on',
    categories: {
      'problem-solving': 'DMAIC & Problem Solving',
      'quality-compliance': 'Quality & ISO Compliance',
      'systems-data': 'ERP & Data Analytics',
      'technical-engineering': 'Technical Engineering & Cleanroom',
      'international-sourcing': 'Global Sourcing & Supply Chain',
      'digital-operations': 'Digital Operations',
      'operations-management': 'Operations Management',
    } as Record<string, string>,
  },
  de: {
    competencyIndex: 'KOMPETENZ',
    mastery: 'Kompetenzgrad',
    frameworkTitle: 'Theoretischer & Methodischer Rahmen',
    executionTitle: 'Praktische Industrielle Ausführung',
    toolsTitle: 'Industrielle Werkzeuge, Messtechnik & Normen',
    appliedInRoles: 'Angewandt in Berufsrollen',
    consultOn: 'Beratung anfordern zu',
    categories: {
      'problem-solving': 'DMAIC & Problemlösung',
      'quality-compliance': 'Qualität & ISO-Konformität',
      'systems-data': 'ERP & Datenanalyse',
      'technical-engineering': 'Technische Entwicklung & Reinraum',
      'international-sourcing': 'Globales Sourcing & Lieferkette',
      'digital-operations': 'Digitale Abläufe',
      'operations-management': 'Betriebsleitung',
    } as Record<string, string>,
  },
  fr: {
    competencyIndex: 'COMPÉTENCE',
    mastery: 'Niveau de Maîtrise',
    frameworkTitle: 'Cadre Théorique & Méthodologique',
    executionTitle: 'Exécution Industrielle sur le Terrain',
    toolsTitle: 'Outils Industriels, Instrumentation & Normes',
    appliedInRoles: 'Appliqué dans les Rôles Professionnels',
    consultOn: 'Consulter sur',
    categories: {
      'problem-solving': 'DMAIC & Résolution de Problèmes',
      'quality-compliance': 'Qualité & Conformité ISO',
      'systems-data': 'ERP & Analyse de Données',
      'technical-engineering': 'Ingénierie Technique & Salle Blanche',
      'international-sourcing': 'Sourcing Global & Chaîne Logistique',
      'digital-operations': 'Opérations Numériques',
      'operations-management': 'Direction des Opérations',
    } as Record<string, string>,
  },
  pt: {
    competencyIndex: 'COMPETÊNCIA',
    mastery: 'Nível de Domínio',
    frameworkTitle: 'Estrutura Teórica e Metodológica',
    executionTitle: 'Execução Prática em Ambiente Industrial',
    toolsTitle: 'Ferramentas Industriais, Instrumentação e Normas',
    appliedInRoles: 'Aplicado em Funções Profissionais',
    consultOn: 'Consultar sobre',
    categories: {
      'problem-solving': 'DMAIC e Resolução de Problemas',
      'quality-compliance': 'Qualidade e Conformidade ISO',
      'systems-data': 'ERP e Análise de Dados',
      'technical-engineering': 'Engenharia Técnica e Sala Limpa',
      'international-sourcing': 'Sourcing Global e Cadeia de Suprimentos',
      'digital-operations': 'Operações Digitais',
      'operations-management': 'Gestão de Operações',
    } as Record<string, string>,
  },
  nl: {
    competencyIndex: 'COMPETENTIE',
    mastery: 'Beheersingsniveau',
    frameworkTitle: 'Theoretisch & Methodologisch Kader',
    executionTitle: 'Praktische Industriële Uitvoering',
    toolsTitle: 'Industriële Tools, Instrumentatie & Normen',
    appliedInRoles: 'Toegepast in Loopbaanrollen',
    consultOn: 'Raadpleeg over',
    categories: {
      'problem-solving': 'DMAIC & Probleemoplossing',
      'quality-compliance': 'Kwaliteit & ISO-Naleving',
      'systems-data': 'ERP & Data-analyse',
      'technical-engineering': 'Technische Engineering & Cleanroom',
      'international-sourcing': 'Wereldwijde Inkoop & Toeleveringsketen',
      'digital-operations': 'Digitale Operaties',
      'operations-management': 'Operationeel Beheer',
    } as Record<string, string>,
  },
};

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const cvData = getCVData(lang as Locale);
  const skillIndex = cvData.skills.findIndex((s) => s.id === slug);

  if (skillIndex === -1) {
    notFound();
  }

  const skill = cvData.skills[skillIndex];
  const prevSkill = skillIndex > 0 ? cvData.skills[skillIndex - 1] : null;
  const nextSkill =
    skillIndex < cvData.skills.length - 1 ? cvData.skills[skillIndex + 1] : null;

  // Find related career experience records
  const relatedExperiences = cvData.experiences.filter((exp) =>
    skill.relatedExperienceIds.includes(exp.id)
  );

  const loc = (skillDetailI18n[lang as keyof typeof skillDetailI18n] || skillDetailI18n.es);
  const categoryLabel = loc.categories[skill.category] || skill.category.replace('-', ' ');

  return (
    <div className="pt-28 pb-20 relative min-h-screen">
      <LightweightAnimatedBackground />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${lang}/skills`}
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{cvData.navigation.backToSkills || cvData.navigation.allSkills}</span>
          </Link>
          <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold">
            {loc.competencyIndex} {skillIndex + 1} / {cvData.skills.length}
          </span>
        </div>

        {/* Skill Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/45 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-cyan-500/20 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-md bg-cyan-500/15 dark:bg-cyan-950/90 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-800 dark:text-cyan-300 uppercase shadow-sm">
              {categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-500/15 dark:bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 shadow-sm">
              {loc.mastery}: {skill.level}%
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {skill.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed max-w-4xl font-normal">
            {skill.description}
          </p>
        </div>

        {/* Methodology & Practical Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Methodology */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/45 dark:bg-slate-900/50 backdrop-blur-md border border-cyan-500/30 shadow-lg space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 dark:bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {loc.frameworkTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {skill.methodology}
            </p>
          </div>

          {/* Practical Application */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/45 dark:bg-slate-900/50 backdrop-blur-md border border-emerald-500/30 shadow-lg space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 dark:bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {loc.executionTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {skill.practicalApplication}
            </p>
          </div>
        </div>

        {/* Tools & Frameworks */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/45 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span>{loc.toolsTitle}</span>
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {skill.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-white/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-cyan-800 dark:text-cyan-300 shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Connected Experiences */}
        {relatedExperiences.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span>{loc.appliedInRoles}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedExperiences.map((exp) => (
                <Link
                  key={exp.id}
                  href={`/${lang}/experience/${exp.id}`}
                  className="p-5 rounded-2xl bg-white/45 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 flex items-center justify-between group shadow-sm hover:border-cyan-500/40 transition-all hover:scale-[1.01]"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </div>
                    <div className="text-xs text-cyan-700 dark:text-cyan-400 font-mono font-medium">{exp.company}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{exp.period}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Pagination */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevSkill ? (
            <Link
              href={`/${lang}/skills/${prevSkill.id}`}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/50 dark:bg-slate-900 hover:bg-white/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {cvData.common.previousMilestone}: {prevSkill.name}
              </span>
            </Link>
          ) : (
            <div />
          )}

          <a
            href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}?text=${encodeURIComponent(
              `Hello Eduardo, I reviewed your expertise in ${skill.name} and would like to discuss an opportunity.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{loc.consultOn} {skill.name}</span>
          </a>

          {nextSkill ? (
            <Link
              href={`/${lang}/skills/${nextSkill.id}`}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/50 dark:bg-slate-900 hover:bg-white/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white transition-all shadow-sm"
            >
              <span>
                {cvData.common.nextMilestone}: {nextSkill.name}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
