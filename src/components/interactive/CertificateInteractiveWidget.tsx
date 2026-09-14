'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';
import {
  Award,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Database,
  BarChart3,
  BookOpen,
} from 'lucide-react';

interface CertificateInteractiveWidgetProps {
  itemId: string;
  title: string;
  currentLocale: Locale;
}

export default function CertificateInteractiveWidget({
  itemId,
  title,
  currentLocale,
}: CertificateInteractiveWidgetProps) {
  const labels = {
    es: {
      ganttTitle: 'HOJA DE RUTA INTERACTIVA DMAIC // MOTOR ESTADÍSTICO 6σ',
      ganttSubtitle: 'REDUCCIÓN DE VARIACIÓN: -30% TIEMPO DE CICLO / -22% DEFECTOS',
      inspectPhase: 'Haz clic en una fase para inspeccionar entregables y herramientas estadísticas:',
      phaseDeliverable: 'Entregable de la Fase',
      toolsUtilized: 'Herramientas Estadísticas & Lean Utilizadas',
      isoTitle: 'MATRIZ DE CONFORMIDAD Y AUDITORÍA ISO 9001:2015',
      isoCompliant: '100% CONFORME',
      googleTitle: 'PIPELINE DE ANÁLISIS DE DATOS, SQL & TELEMETRÍA',
      googleCertified: 'CERTIFICACIÓN PROFESIONAL GOOGLE',
    },
    en: {
      ganttTitle: 'INTERACTIVE DMAIC GANTT ROADMAP // 6σ STATISTICAL ENGINE',
      ganttSubtitle: 'VARIATION REDUCTION: -30% CYCLE TIME / -22% DEFECTS',
      inspectPhase: 'Click on a phase to inspect industrial execution & statistical tools:',
      phaseDeliverable: 'Phase Deliverable',
      toolsUtilized: 'Statistical & Lean Tools Utilized',
      isoTitle: 'ISO 9001:2015 AUDIT READINESS & COMPLIANCE MATRIX',
      isoCompliant: '100% COMPLIANT',
      googleTitle: 'DATA ANALYTICS, SQL & TELEMETRY PIPELINE',
      googleCertified: 'GOOGLE PROFESSIONAL CERTIFIED',
    },
    pt: {
      ganttTitle: 'ROTEIRO INTERATIVO DMAIC // MOTOR ESTATÍSTICO 6σ',
      ganttSubtitle: 'REDUÇÃO DE VARIAÇÃO: -30% TEMPO DE CICLO / -22% DEFEITOS',
      inspectPhase: 'Clique numa fase para inspecionar entregáveis e ferramentas estatísticas:',
      phaseDeliverable: 'Entregável da Fase',
      toolsUtilized: 'Ferramentas Estatísticas & Lean Utilizadas',
      isoTitle: 'MATRIZ DE CONFORMIDADE E AUDITORIA ISO 9001:2015',
      isoCompliant: '100% CONFORME',
      googleTitle: 'PIPELINE DE ANÁLISE DE DADOS, SQL & TELEMETRIA',
      googleCertified: 'CERTIFICAÇÃO PROFISSIONAL GOOGLE',
    },
    nl: {
      ganttTitle: 'INTERACTIEVE DMAIC GANTT ROADMAP // 6σ STATISTISCHE ENGINE',
      ganttSubtitle: 'VARIATIEREDUCTIE: -30% DOORLOOPTIJD / -22% DEFECTEN',
      inspectPhase: 'Klik op een fase om resultaten en statistische tools te bekijken:',
      phaseDeliverable: 'Fase Resultaat',
      toolsUtilized: 'Statistische & Lean Tools Toegepast',
      isoTitle: 'ISO 9001:2015 AUDIT-READINESS & COMPLIANCE MATRIX',
      isoCompliant: '100% CONFORM',
      googleTitle: 'DATA ANALYTICS, SQL & TELEMETRIE PIPELINE',
      googleCertified: 'GOOGLE PROFESSIONEEL GECERTIFICEERD',
    },
    de: {
      ganttTitle: 'INTERAKTIVE DMAIC-GANTT-ROADMAP // 6σ STATISTIK-ENGINE',
      ganttSubtitle: 'VARIATIONSREDUZIERUNG: -30% DURCHLAUFZEIT / -22% FEHLER',
      inspectPhase: 'Klicken Sie auf eine Phase zur Anzeige von Ergebnissen und Tools:',
      phaseDeliverable: 'Phasen-Ergebnis',
      toolsUtilized: 'Eingesetzte Statistik- & Lean-Werkzeuge',
      isoTitle: 'ISO 9001:2015 AUDIT-READINESS- & COMPLIANCE-MATRIX',
      isoCompliant: '100% KONFORM',
      googleTitle: 'DATENANALYSE, SQL- & TELEMETRIE-PIPELINE',
      googleCertified: 'GOOGLE ZERTIFIZIERT',
    },
    fr: {
      ganttTitle: 'FEUILLE DE ROUTE INTERACTIVE DMAIC // MOTEUR STATISTIQUE 6σ',
      ganttSubtitle: 'RÉDUCTION DE VARIABILITÉ: -30% TEMPS DE CYCLE / -22% DÉFAUTS',
      inspectPhase: 'Cliquez sur une phase pour afficher les livrables et outils statistiques:',
      phaseDeliverable: 'Livrable de la Phase',
      toolsUtilized: 'Outils Statistiques & Lean Utilisés',
      isoTitle: 'MATRICE DE CONFORMITÉ & D’AUDIT ISO 9001:2015',
      isoCompliant: '100% CONFORME',
      googleTitle: 'PIPELINE D’ANALYSE DE DONNÉES, SQL & TÉLÉMÉTRIE',
      googleCertified: 'CERTIFIÉ PROFESSIONNEL GOOGLE',
    },
  };

  const t = labels[currentLocale] || labels.es;

  // =========================================================================
  // 1. LEAN SIX SIGMA BLACK BELT: Interactive Gantt & DMAIC Roadmap
  // =========================================================================
  if (itemId === 'lean-six-sigma-black-belt') {
    const [activePhase, setActivePhase] = useState<number>(3); // Default to Improve
    const dmaicPhases = [
      {
        id: 0,
        phase: 'DEFINE',
        duration: 'W1-W2',
        deliverable: 'Project Charter, VOC, SIPOC & Value Stream Mapping (VSM)',
        tools: 'SIPOC, VOC, Stakeholder Matrix, Process Boundary Definition',
      },
      {
        id: 1,
        phase: 'MEASURE',
        duration: 'W3-W5',
        deliverable: 'Baseline Cp/Cpk & Gage R&R Metrology System Analysis (MSA)',
        tools: 'Gage R&R (Crossed), SPC Control Charts, Pareto Analysis',
      },
      {
        id: 2,
        phase: 'ANALYZE',
        duration: 'W6-W8',
        deliverable: 'Root Cause Verification (RCA, 5 Whys, Hypothesis Testing)',
        tools: 'Ishikawa Diagrams, 2-Sample t-Test, ANOVA, FMEA Risk Scoring',
      },
      {
        id: 3,
        phase: 'IMPROVE',
        duration: 'W9-W12',
        deliverable: 'Design of Experiments (DOE) & Poka-Yoke SOP Implementation',
        tools: 'DOE (Full Factorial), Kaizen Blitz, Workstation Ergonomics',
      },
      {
        id: 4,
        phase: 'CONTROL',
        duration: 'W13-W16',
        deliverable: 'Statistical Process Control (SPC) & Standardized SOP Governance',
        tools: 'X-bar / R Charts, Training Matrices, Financial ROI Audit',
      },
    ];

    const current = dmaicPhases[activePhase];

    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/90 border border-cyan-500/40 space-y-4 shadow-lg relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-cyan-300 tracking-wider">
              {t.ganttTitle}
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 shadow-sm">
            {t.ganttSubtitle}
          </span>
        </div>

        {/* Interactive Gantt Timeline Bars */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-slate-400">
            {t.inspectPhase}
          </div>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {dmaicPhases.map((p) => {
              const isSelected = activePhase === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePhase(p.id)}
                  className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all cursor-pointer backdrop-blur-md ${
                    isSelected
                      ? 'bg-cyan-950/90 border-2 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/25 scale-[1.03]'
                      : 'cyber-button-glass text-slate-200 hover:text-cyan-200 hover:border-cyan-400'
                  }`}
                >
                  <div className="font-mono font-black text-xs sm:text-sm">
                    {p.phase}
                  </div>
                  <div className={`text-[10px] font-mono hidden sm:block mt-0.5 ${isSelected ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}>
                    {p.duration}
                  </div>
                  {/* Visual Gantt Bar */}
                  <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden border border-slate-700/50">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-full" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Detail Box */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
              {t.phaseDeliverable} // {current.phase}
            </div>
            <div className="font-bold text-white">{current.deliverable}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
              {t.toolsUtilized}
            </div>
            <div className="font-mono text-cyan-300 font-semibold">{current.tools}</div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. ISO 9001:2015 AUDITOR: Interactive Compliance Radar & Checklist
  // =========================================================================
  if (itemId === 'iso9001-auditor') {
    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border border-cyan-500/40 dark:border-cyan-500/40 light:border-cyan-400 space-y-4 text-xs shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-mono font-bold text-emerald-400 dark:text-emerald-300 light:text-emerald-700">
              {t.isoTitle}
            </span>
          </div>
          <span className="font-mono text-cyan-500 dark:text-cyan-400 font-bold">{t.isoCompliant}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <div className="font-mono text-cyan-500 dark:text-cyan-400 font-bold">CLAUSE 6 // RISKS</div>
            <div className="text-slate-600 dark:text-slate-300 text-[11px] mt-1">Risk-based thinking & preventive mitigation</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <div className="font-mono text-emerald-500 dark:text-emerald-400 font-bold">CLAUSE 8 // OPERATIONS</div>
            <div className="text-slate-600 dark:text-slate-300 text-[11px] mt-1">Standardized SOPs & trace control in ERP</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <div className="font-mono text-indigo-500 dark:text-indigo-400 font-bold">CLAUSE 9/10 // CAPA</div>
            <div className="text-slate-600 dark:text-slate-300 text-[11px] mt-1">Closed-loop corrective actions & Kaizen</div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. GOOGLE DATA ANALYTICS: Interactive Query & KPI Pipeline
  // =========================================================================
  if (itemId === 'google-data-analytics') {
    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border border-cyan-500/40 dark:border-cyan-500/40 light:border-cyan-400 space-y-3 text-xs shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-2.5 font-mono">
          <span className="text-cyan-500 dark:text-cyan-400 font-bold">{t.googleTitle}</span>
          <span className="text-emerald-500 dark:text-emerald-400 font-bold">{t.googleCertified}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 font-mono text-[11px] text-cyan-600 dark:text-cyan-300">
          SELECT plant_section, AVG(cycle_time_min), SUM(defect_count) FROM manufacturing_logs GROUP BY plant_section;
        </div>
      </div>
    );
  }

  // Default fallback for other certs
  return (
    <div className="p-4 rounded-xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2 text-xs shadow-md">
      <div className="flex items-center justify-between">
        <span className="font-mono text-cyan-500 dark:text-cyan-400 font-bold">{title}</span>
        <span className="font-mono text-emerald-500 dark:text-emerald-400">ACCREDITED</span>
      </div>
      <div className="text-slate-600 dark:text-slate-300">
        Formal academic and professional curriculum with verified institutional credentialing.
      </div>
    </div>
  );
}
