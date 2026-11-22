import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { isValidLocale, getAllExperienceStaticParams } from '@/lib/i18n';
import { getCVData } from '@/data/cv-data';
import ExperienceWidgetHost from '@/components/interactive/ExperienceWidgetHost';
import ExperienceDetailBackground from '@/components/ui/ExperienceDetailBackground';
import { renderFormattedText } from '@/lib/formatter';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building,
  Calendar,
  MapPin,
  CheckCircle2,
  Cpu,
  Sparkles,
  ShieldAlert,
  Lightbulb,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';

export function generateStaticParams() {
  return getAllExperienceStaticParams();
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
  const experience = cvData.experiences.find((e) => e.id === slug);
  if (!experience) return {};

  return {
    title: `${experience.role} at ${experience.company} | Eduardo de Sousa`,
    description: experience.summary,
  };
}

export default async function ExperienceDetailPage({
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
  const experienceIndex = cvData.experiences.findIndex((e) => e.id === slug);

  if (experienceIndex === -1) {
    notFound();
  }

  const experience = cvData.experiences[experienceIndex];
  const prevExp = experienceIndex > 0 ? cvData.experiences[experienceIndex - 1] : null;
  const nextExp =
    experienceIndex < cvData.experiences.length - 1
      ? cvData.experiences[experienceIndex + 1]
      : null;

  const isEs = lang === 'es';
  const isPt = lang === 'pt';
  const recordLabel = isEs ? 'REGISTRO' : isPt ? 'REGISTO' : 'RECORD';

  return (
    <div className="pt-28 pb-20 relative overflow-hidden">
      <ExperienceDetailBackground slug={slug} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${lang}/experience`}
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{cvData.navigation.backToExperience || cvData.navigation.backToHome}</span>
          </Link>
          <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold">
            {recordLabel} {experienceIndex + 1} / {cvData.experiences.length}
          </span>
        </div>

        {/* =========================================================================
           1. TOP: 3D INTERACTIVE VISUAL TELEMETRY (GLOBE / VEHICLE / CLEANROOM)
           ========================================================================= */}
        <div className="space-y-3">
          <ExperienceWidgetHost
            experienceId={experience.id}
            company={experience.company}
            industry={experience.industry}
            visualType={experience.visualType}
            lang={lang}
          />
        </div>

        {/* =========================================================================
           2. EXECUTIVE HIGHLIGHTS & MOST IMPORTANT DELIVERABLES BADGES
           ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-800 dark:text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>
                {isEs
                  ? 'Entregables Ejecutivos e Hitos Operativos Clave'
                  : isPt
                  ? 'Entregas Executivas e Marcos Operacionais Principais'
                  : 'Executive Deliverables & Core Operational Milestones'}
              </span>
            </span>
            <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">
              {isEs
                ? 'Estándares Tier-1 Validados y Reducción Directa de Costes'
                : isPt
                ? 'Normas Tier-1 Validadas e Reduções Reais de Custos'
                : 'Validated Tier-1 Standards & Realized Cost Reductions'}
            </span>
          </div>

          {/* Key Deliverables Pills / Badges - Solid Opaque & Proportional (-15%) */}
          <div className="flex flex-wrap items-center gap-2">
            {experience.id === 'independent-consultant' ? (
              <>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950 dark:bg-emerald-950 light:bg-emerald-100 border border-emerald-500/60 light:border-emerald-400 text-[11px] font-mono font-bold text-emerald-300 light:text-emerald-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 light:text-emerald-700 shrink-0" />
                  <span>
                    {isEs
                      ? '$800,000 USD Gestión Anual de Compras'
                      : isPt
                      ? '$800,000 USD Aquisições Anuais Geridas'
                      : '$800,000 USD Annual Spend Sourced'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950 dark:bg-cyan-950 light:bg-cyan-100 border border-cyan-500/60 light:border-cyan-400 text-[11px] font-mono font-bold text-cyan-300 light:text-cyan-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 light:text-cyan-700 shrink-0" />
                  <span>
                    {isEs || isPt
                      ? "20 Cont/Trimestre (40' High Cube FCL)"
                      : "20 Cont/Quarter (40' High Cube FCL)"}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950 dark:bg-indigo-950 light:bg-indigo-100 border border-indigo-500/60 light:border-indigo-400 text-[11px] font-mono font-bold text-indigo-200 light:text-indigo-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400 light:text-indigo-700 shrink-0" />
                  <span>
                    {isEs
                      ? '-75% Reducción Costes Directos Fábrica'
                      : isPt
                      ? '-75% Redução Custos Diretos Fábrica'
                      : '-75% Direct Factory Cost Reduction'}
                  </span>
                </span>
                {/* Solid High-Contrast Amber Risk Escrow Badge */}
                <span className="px-2.5 py-1 rounded-lg bg-amber-950 dark:bg-amber-950 light:bg-amber-100 border-2 border-amber-500/70 light:border-amber-400 text-[11px] font-mono font-black text-amber-200 light:text-amber-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 light:text-amber-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Escudo de Riesgo Escrow en 4 Fases'
                      : isPt
                      ? 'Escudo de Risco Escrow em 4 Fases'
                      : '4-Gate Capital Escrow Risk Shield'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-sky-950 dark:bg-sky-950 light:bg-sky-100 border border-sky-500/60 light:border-sky-400 text-[11px] font-mono font-bold text-sky-200 light:text-sky-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-sky-400 light:text-sky-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Integración iPaaS Make / Zapier'
                      : isPt
                      ? 'Integração iPaaS Make / Zapier'
                      : 'Make / Zapier Automation iPaaS Integration'}
                  </span>
                </span>
              </>
            ) : experience.id === 'vdl-nedcar' ? (
              <>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950 dark:bg-emerald-950 light:bg-emerald-100 border border-emerald-500/60 light:border-emerald-400 text-[11px] font-mono font-bold text-emerald-300 light:text-emerald-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 light:text-emerald-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Cadencia de Línea: 110-120 Vehículos/Turno'
                      : isPt
                      ? 'Cadência de Linha: 110-120 Veículos/Turno'
                      : '110-120 Vehicles/Shift Line Cadence'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950 dark:bg-cyan-950 light:bg-cyan-100 border border-cyan-500/60 light:border-cyan-400 text-[11px] font-mono font-bold text-cyan-300 light:text-cyan-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 light:text-cyan-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Garantía Calidad Multiplataforma BMW y MINI'
                      : isPt
                      ? 'Garantia Qualidade Multiplataforma BMW e MINI'
                      : 'BMW & MINI Multi-Platform Quality Assurance'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950 dark:bg-indigo-950 light:bg-indigo-100 border border-indigo-500/60 light:border-indigo-400 text-[11px] font-mono font-bold text-indigo-200 light:text-indigo-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400 light:text-indigo-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Protocolo RCA 8D: -15% Tasa de Defectos'
                      : isPt
                      ? 'Protocolo RCA 8D: -15% Taxa de Defeitos'
                      : '8D RCA Protocol: -15% Defect Rate'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-950 dark:bg-amber-950 light:bg-amber-100 border-2 border-amber-500/70 light:border-amber-400 text-[11px] font-mono font-black text-amber-200 light:text-amber-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 light:text-amber-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Validación Enclavamiento Batería Alta Tensión EV'
                      : isPt
                      ? 'Validação Interbloqueio Bateria Alta Tensão EV'
                      : 'High-Voltage EV Battery Interlock Validation'}
                  </span>
                </span>
              </>
            ) : experience.id === 'hq-pack' ? (
              <>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950 dark:bg-emerald-950 light:bg-emerald-100 border border-emerald-500/60 light:border-emerald-400 text-[11px] font-mono font-bold text-emerald-300 light:text-emerald-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 light:text-emerald-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Especificación Sala Limpia ASML ISO 14644-1 Clase 5'
                      : isPt
                      ? 'Norma Sala Limpa ASML ISO 14644-1 Classe 5'
                      : 'ASML Cleanroom ISO 14644-1 Class 5 Spec'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950 dark:bg-cyan-950 light:bg-cyan-100 border border-cyan-500/60 light:border-cyan-400 text-[11px] font-mono font-bold text-cyan-300 light:text-cyan-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 light:text-cyan-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Cero Desgasificación y Test Submicrónico Superado'
                      : isPt
                      ? 'Zero Desgaseificação e Teste Submicrónico Aprovado'
                      : 'Zero Outgassing & Sub-Micron Particulate Pass'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950 dark:bg-indigo-950 light:bg-indigo-100 border border-indigo-500/60 light:border-indigo-400 text-[11px] font-mono font-bold text-indigo-200 light:text-indigo-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400 light:text-indigo-700 shrink-0" />
                  <span>
                    {isEs
                      ? '-30% Tiempo de Ciclo Montaje Embalaje'
                      : isPt
                      ? '-30% Tempo Ciclo Montagem Embalagem'
                      : '-30% Packaging Assembly Cycle Time'}
                  </span>
                </span>
              </>
            ) : experience.id === 'arkcohogar' ? (
              <>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950 dark:bg-emerald-950 light:bg-emerald-100 border border-emerald-500/60 light:border-emerald-400 text-[11px] font-mono font-bold text-emerald-300 light:text-emerald-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 light:text-emerald-700 shrink-0" />
                  <span>
                    {isEs
                      ? '99.5% Precisión de Stock en Tiempo Real'
                      : isPt
                      ? '99.5% Precisão de Stock em Tempo Real'
                      : '99.5% Real-Time WMS Stock Accuracy'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950 dark:bg-cyan-950 light:bg-cyan-100 border border-cyan-500/60 light:border-cyan-400 text-[11px] font-mono font-bold text-cyan-300 light:text-cyan-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 light:text-cyan-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Despacho Optimizado de Flujo de Palets'
                      : isPt
                      ? 'Despacho Otimizado de Fluxo de Paletes'
                      : 'Optimized Pallet Flow & Dispatch Cadence'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-950 dark:bg-amber-950 light:bg-amber-100 border-2 border-amber-500/70 light:border-amber-400 text-[11px] font-mono font-black text-amber-200 light:text-amber-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 light:text-amber-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Auditoría Cíclica de Deriva Cero'
                      : isPt
                      ? 'Auditoria Cíclica de Deriva Zero'
                      : 'Zero-Drift Warehouse Cycle Count Protocol'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950 dark:bg-indigo-950 light:bg-indigo-100 border border-indigo-500/60 light:border-indigo-400 text-[11px] font-mono font-bold text-indigo-200 light:text-indigo-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400 light:text-indigo-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Control de Doble Entrada y Registro WMS'
                      : isPt
                      ? 'Controlo de Dupla Entrada e Registo WMS'
                      : 'Dual-Verification Inbound Stock Protocol'}
                  </span>
                </span>
              </>
            ) : experience.id === 'eds-paixao' ? (
              <>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950 dark:bg-emerald-950 light:bg-emerald-100 border border-emerald-500/60 light:border-emerald-400 text-[11px] font-mono font-bold text-emerald-300 light:text-emerald-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 light:text-emerald-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Rediseño de Cocina y Flujo Operativo'
                      : isPt
                      ? 'Redesenho de Cozinha e Fluxo Operacional'
                      : 'Kitchen Layout & Operational Flow Redesign'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950 dark:bg-cyan-950 light:bg-cyan-100 border border-cyan-500/60 light:border-cyan-400 text-[11px] font-mono font-bold text-cyan-300 light:text-cyan-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 light:text-cyan-700 shrink-0" />
                  <span>
                    {isEs
                      ? '-20% Reducción de Mermas de Materia Prima'
                      : isPt
                      ? '-20% Redução de Desperdício de Matéria-Prima'
                      : '-20% Raw Material Waste Reduction'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950 dark:bg-indigo-950 light:bg-indigo-100 border border-indigo-500/60 light:border-indigo-400 text-[11px] font-mono font-bold text-indigo-200 light:text-indigo-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400 light:text-indigo-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Estandarización SOP y Protocolos APPCC/HACCP'
                      : isPt
                      ? 'Normalização SOP e Protocolos HACCP'
                      : 'SOP Standardization & HACCP Food Safety'}
                  </span>
                </span>
              </>
            ) : (
              <>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950 dark:bg-emerald-950 light:bg-emerald-100 border border-emerald-500/60 light:border-emerald-400 text-[11px] font-mono font-bold text-emerald-300 light:text-emerald-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 light:text-emerald-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Gestión Integral de Suministro Cerámico'
                      : isPt
                      ? 'Gestão Integral de Fornecimento Cerâmico'
                      : 'International Ceramic Supply Management'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950 dark:bg-cyan-950 light:bg-cyan-100 border border-cyan-500/60 light:border-cyan-400 text-[11px] font-mono font-bold text-cyan-300 light:text-cyan-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 light:text-cyan-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Auditorías de Conformidad ISO 10545'
                      : isPt
                      ? 'Auditorias de Conformidade ISO 10545'
                      : 'ISO 10545 Factory Quality Audits'}
                  </span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950 dark:bg-indigo-950 light:bg-indigo-100 border border-indigo-500/60 light:border-indigo-400 text-[11px] font-mono font-bold text-indigo-200 light:text-indigo-950 shadow-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400 light:text-indigo-700 shrink-0" />
                  <span>
                    {isEs
                      ? 'Optimización de Fletes Marítimos FCL'
                      : isPt
                      ? 'Otimização de Fretes Marítimos FCL'
                      : 'FCL Container Maritime Freight Optimization'}
                  </span>
                </span>
              </>
            )}
          </div>

          {/* Numerical Impact Metrics Grid (High-Contrast in Light & Dark Mode) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {experience.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-1 bg-white/70 dark:bg-slate-950/50 backdrop-blur-md shadow-lg"
              >
                <div className="font-mono text-2xl sm:text-3xl font-black text-cyan-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-cyan-200 dark:to-cyan-400">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{metric.label}</div>
                {metric.subtext && (
                  <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-semibold">{metric.subtext}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
           3. EXPERIENCE DESCRIPTION & OPERATIONAL NARRATIVE
           ========================================================================= */}
        <div className="space-y-6 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-md bg-cyan-100 dark:bg-cyan-950/90 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-900 dark:text-cyan-300 shadow-sm">
              {experience.period}
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{experience.location}</span>
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-400 shadow-sm">
              {experience.industry}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {experience.role}
          </h1>

          <div className="text-xl sm:text-2xl font-bold text-cyan-700 dark:text-cyan-400 flex items-center space-x-2.5">
            <Building className="w-6 h-6" />
            <span>{experience.company}</span>
          </div>

          <div className="space-y-3.5 text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed max-w-4xl font-normal">
            {experience.summary.split(/\n\s*\n/).filter(Boolean).map((paragraph, idx) => (
              <p key={idx} className="text-justify leading-relaxed sm:leading-8">
                {renderFormattedText(paragraph)}
              </p>
            ))}
          </div>
        </div>

        {/* Operational Challenge, Solution & Impact Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Challenge */}
          <div className="p-6 rounded-2xl border border-amber-500/30 bg-white/75 dark:bg-slate-950/50 backdrop-blur-md shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-amber-900 dark:text-amber-200">
              {cvData.common.operationalChallenge}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal text-justify">
              {renderFormattedText(experience.challenge)}
            </p>
          </div>

          {/* Solution */}
          <div className="p-6 rounded-2xl border border-cyan-500/30 bg-white/75 dark:bg-slate-950/50 backdrop-blur-md shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-cyan-900 dark:text-cyan-200">
              {cvData.common.engineeredSolution}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal text-justify">
              {renderFormattedText(experience.solution)}
            </p>
          </div>

          {/* Impact */}
          <div className="p-6 rounded-2xl border border-emerald-500/30 bg-white/75 dark:bg-slate-950/50 backdrop-blur-md shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
              {cvData.common.measurableImpact}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal text-justify">
              {renderFormattedText(experience.impact)}
            </p>
          </div>
        </div>

        {/* Detailed Responsibilities */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/50 backdrop-blur-md shadow-lg space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span>
              {cvData.common.detailedResponsibilities ||
                (isEs
                  ? 'Responsabilidades Operativas Detalladas'
                  : isPt
                  ? 'Responsabilidades Operacionais Detalhadas'
                  : 'Full Operational Responsibilities')}
            </span>
          </h3>

          <div className="grid grid-cols-1 gap-3.5">
            {experience.responsibilities.map((resp, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed shadow-sm font-normal"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-justify leading-relaxed">{renderFormattedText(resp)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies & Industry Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tech */}
          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/50 backdrop-blur-md shadow-lg space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold">
              {cvData.common.technologiesAndFrameworks}
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-slate-900 border border-cyan-200 dark:border-slate-700 text-xs font-mono font-bold text-cyan-900 dark:text-cyan-300 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Partners */}
          {experience.partners && experience.partners.length > 0 && (
            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/50 backdrop-blur-md shadow-lg space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold">
                {cvData.common.industryPartners}
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.partners.map((partner, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-500/30 text-xs font-semibold text-emerald-900 dark:text-emerald-300 shadow-sm"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Pagination / Milestone Switcher - Proportional & Solid Opaque */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          {prevExp ? (
            <Link
              href={`/${lang}/experience/${prevExp.id}`}
              className="group inline-flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:-translate-x-0.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-200">
                <ArrowLeft className="w-3 h-3" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {cvData.common.previousMilestone}
                </span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {prevExp.company}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <a
            href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}?text=${encodeURIComponent(
              `Hello Eduardo, I reviewed your experience at ${experience.company} and would like to discuss a project.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-950" />
            <span>
              {isEs
                ? 'Consultar este Caso de Estudio'
                : isPt
                ? 'Consultar este Caso de Estudo'
                : 'Discuss This Case Study'}
            </span>
          </a>

          {nextExp ? (
            <Link
              href={`/${lang}/experience/${nextExp.id}`}
              className="group inline-flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {cvData.common.nextMilestone}
                </span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {nextExp.company}
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-200">
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
