'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import {
  Award,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Cpu,
  BarChart3,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

interface DMAICGanttWidgetProps {
  currentLocale: Locale;
}

export default function DMAICGanttWidget({ currentLocale }: DMAICGanttWidgetProps) {
  const [activePhase, setActivePhase] = useState<number>(3); // Default to Improve

  const phases = [
    {
      id: 0,
      phase: 'DEFINE (D)',
      duration: 'Weeks 1-2',
      focus: 'Project Charter & Value Stream Mapping',
      deliverables: 'SIPOC matrix, Voice of the Customer (VOC), Critical to Quality (CTQ) flowdowns.',
      tools: ['SIPOC', 'VOC Analysis', 'Project Charter', 'Stakeholder Radar'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 1,
      phase: 'MEASURE (M)',
      duration: 'Weeks 3-5',
      focus: 'Baseline Capability & Metrology MSA',
      deliverables: 'Gage R&R (Crossed), Baseline Cp/Cpk indices, Process Capability Study.',
      tools: ['Gage R&R', 'Cp/Cpk Capability', 'SPC Control Charts', 'Pareto Analysis'],
      color: 'from-blue-500 to-indigo-500',
    },
    {
      id: 2,
      phase: 'ANALYZE (A)',
      duration: 'Weeks 6-8',
      focus: 'Root Cause & Statistical Hypothesis',
      deliverables: 'Ishikawa Root Cause verification, 2-Sample t-Test, ANOVA, FMEA Risk scoring.',
      tools: ['Ishikawa / 5 Whys', 'ANOVA', 'PFMEA Risk Matrix', 'Multi-Vari Charts'],
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 3,
      phase: 'IMPROVE (I)',
      duration: 'Weeks 9-12',
      focus: 'Design of Experiments (DOE) & Poka-Yoke',
      deliverables: 'Full Factorial DOE optimization, fail-safe SOP rollout, Kaizen blitz execution.',
      tools: ['DOE (Design of Experiments)', 'Kaizen Blitz', 'Poka-Yoke Error Proofing', 'Workstation 5S'],
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 4,
      phase: 'CONTROL (C)',
      duration: 'Weeks 13-16',
      focus: 'SPC Governance & Financial Audit',
      deliverables: 'X-bar / R Charts, Standard Operating Procedures (SOP) training matrix, ROI sign-off.',
      tools: ['Statistical Process Control (SPC)', 'SOP Control Plan', 'Training Matrix', 'Financial ROI Audit'],
      color: 'from-teal-500 to-cyan-500',
    },
  ];

  const current = phases[activePhase];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-950/95 dark:bg-slate-950/95 light:bg-white border-2 border-cyan-500/40 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-4 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-950 dark:bg-cyan-950 light:bg-cyan-100 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-cyan-400 dark:text-cyan-400 light:text-cyan-700 tracking-wider">
              INTERACTIVE DMAIC GANTT MATRIX // LEAN SIX SIGMA BLACK BELT
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 light:text-slate-600">
              Quantitative Variance Reduction & Statistical Process Control Engine
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 dark:bg-emerald-950/80 light:bg-emerald-100 border border-emerald-500/40 text-emerald-400 font-bold">
            -30% Repair Cycle Time
          </span>
          <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 dark:bg-cyan-950/80 light:bg-cyan-100 border border-cyan-500/40 text-cyan-300 font-bold">
            -22% Recurring Defects
          </span>
        </div>
      </div>

      {/* Interactive Gantt Timeline Roadbars */}
      <div className="space-y-2.5 relative z-10">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Click on any DMAIC milestone to inspect statistical deliverables:</span>
          <span className="text-cyan-400 font-bold">5-Phase Standardized Roadmap</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {phases.map((p) => {
            const isSelected = activePhase === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePhase(p.id)}
                className={`p-2.5 sm:p-3.5 rounded-2xl border text-center transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/90 to-slate-900/90 dark:from-cyan-950/90 dark:to-slate-900/90 light:bg-cyan-50 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.03]'
                    : 'bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-cyan-500/50'
                }`}
              >
                <div className="font-mono font-black text-xs sm:text-sm text-white truncate">
                  {p.phase}
                </div>
                <div className="text-[10px] text-cyan-400 font-mono hidden sm:block mt-1">
                  {p.duration}
                </div>

                {/* Progress Visual Bar */}
                <div className="w-full h-1.5 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-full mt-2.5 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${p.color} w-full`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Phase Detail & Statistical Tools Breakdown */}
      <div className="p-5 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-cyan-500/30 grid grid-cols-1 md:grid-cols-2 gap-5 text-xs relative z-10">
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase text-slate-300 font-bold">
            Phase Deliverable & Scope // {current.phase}
          </div>
          <div className="text-sm font-bold text-white">{current.focus}</div>
          <p className="text-slate-200 text-xs leading-relaxed">
            {current.deliverables}
          </p>
        </div>

        <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-800 dark:border-slate-800 light:border-slate-300 pt-4 md:pt-0 md:pl-5">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
            Statistical Tools & Lean Frameworks Utilized
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {current.tools.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-950 dark:bg-slate-950 light:bg-white border border-cyan-500/30 font-mono text-[11px] text-cyan-400 font-semibold shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
