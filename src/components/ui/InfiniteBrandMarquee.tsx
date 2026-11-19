'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';
import { Building2, ChevronLeft, ChevronRight, Pause, Play, Ship } from 'lucide-react';

interface InfiniteBrandMarqueeProps {
  currentLocale: Locale;
}

export default function InfiniteBrandMarquee({ currentLocale }: InfiniteBrandMarqueeProps) {
  // Row 1 Direction & Pause states
  const [dirRow1, setDirRow1] = useState<'left' | 'right'>('left');
  const [isPausedRow1, setIsPausedRow1] = useState(false);

  // Row 2 Direction & Pause states
  const [dirRow2, setDirRow2] = useState<'left' | 'right'>('right');
  const [isPausedRow2, setIsPausedRow2] = useState(false);

  const titles = {
    es: {
      row1: 'PLANTAS INDUSTRIALES, ESTÁNDARES Y ARQUITECTURA TÉCNICA:',
      row2: 'RED GLOBAL DE LOGÍSTICA, LÍNEAS MARÍTIMAS Y SUPPLY CHAIN (APAC / AMÉRICAS / EUROPA):',
    },
    en: {
      row1: 'TIER-1 MANUFACTURING PLANTS, QUALITY STANDARDS & TECH STACK:',
      row2: 'GLOBAL LOGISTICS NETWORK, MARITIME CARRIERS & SUPPLY CHAIN (APAC / AMERICAS / EUROPE):',
    },
    pt: {
      row1: 'PLANTAS INDUSTRIAIS, PADRÕES DE QUALIDADE E ARQUITETURA TÉCNICA:',
      row2: 'REDE GLOBAL DE LOGÍSTICA, LINHAS MARÍTIMAS E SUPPLY CHAIN (APAC / AMÉRICAS / EUROPA):',
    },
    nl: {
      row1: 'INDUSTRIËLE PRODUCTIELOCATIES, KWALITEITSNORMEN EN TECH ARCHITECTUUR:',
      row2: 'WERELDWIJD LOGISTIEK NETWERK, REDERIJSYSTEMEN EN SUPPLY CHAIN (APAC / AMERIKA / EUROPA):',
    },
    de: {
      row1: 'FERTIGUNGSWERKE, QUALITÄTSSTANDARDS & TECHNISCHE ARCHITEKTUR:',
      row2: 'GLOBALES LOGISTIKNETZWERK, REEDEREIEN & SUPPLY CHAIN (APAC / AMERIKA / EUROPA):',
    },
    fr: {
      row1: 'SITES INDUSTRIELS, STANDARDS DE QUALITÉ ET ARCHITECTURE TECHNIQUE:',
      row2: 'RÉSEAU LOGISTIQUE MONDIAL, COMPAGNIES MARITIMES & SUPPLY CHAIN (APAC / AMÉRIQUES / EUROPE):',
    },
  };

  const t = titles[currentLocale] || titles.en;

  // Row 1: Companies, Standards & Programming Languages
  const row1List = [
    { name: 'ASML', category: 'Semiconductor Lithography' },
    { name: 'HQ PACK', category: 'High-Tech Packaging Assembly' },
    { name: 'VDL NEDCAR', category: 'Automotive Moving Line' },
    { name: 'BMW', category: 'Automotive OEM Quality' },
    { name: 'MINI', category: 'Assembly Quality Control' },
    { name: 'TÜV NORD', category: 'Equipment & Winch Safety' },
    { name: 'Lean Six Sigma', category: 'Black Belt (DMAIC)' },
    { name: 'TypeScript', category: 'Enterprise Web & Data' },
    { name: 'Python', category: 'Data Telemetry & Pipelines' },
    { name: 'PostgreSQL', category: 'OptiAsset CMMS Architecture' },
    { name: 'Next.js', category: 'Edge Web Architecture' },
    { name: 'ZEISS', category: 'High-NA Optics Packaging' },
    { name: 'BOSCH', category: 'Tier-1 Electronics' },
  ];

  // Row 2: Global Maritime Logistics & Supply Chain (India / China / Americas / Europe)
  const row2List = [
    { name: 'HAPAG-LLOYD', category: 'Global Maritime (Germany / Transatlantic)' },
    { name: 'MAERSK', category: 'Integrated Container Freight (Global)' },
    { name: 'MSC', category: 'Container Shipping & Ports (Global)' },
    { name: 'COSCO', category: 'China Ocean Shipping (Ningbo / Shenzhen / Global)' },
    { name: 'CMA CGM', category: 'Transpacific & Asia-Europe Shipping' },
    { name: 'EVERGREEN', category: 'Global Container Carrier (APAC / Americas)' },
    { name: 'ONE', category: 'Ocean Network Express (Japan / Global)' },
    { name: 'KUEHNE+NAGEL', category: 'Global Freight Forwarding & Intermodal' },
    { name: 'APM TERMINALS', category: 'Port Operations (Rotterdam / Valencia)' },
    { name: 'ZAPIER', category: 'Automated Logistics Webhooks' },
  ];

  const duplicatedRow1 = [...row1List, ...row1List];
  const duplicatedRow2 = [...row2List, ...row2List];

  return (
    <div className="w-full max-w-full overflow-hidden space-y-3 pt-2">
      {/* =========================================================================
         ROW 1: CLIENT COMPANIES, QUALITY STANDARDS & TECH STACK
         ========================================================================= */}
      <div className="space-y-1.5">
        {/* Row Header + Controls */}
        <div className="flex items-center justify-between text-xs font-mono px-1 gap-2 min-w-0">
          <div className="flex items-center space-x-2 text-cyan-900 dark:text-cyan-400 font-bold tracking-wider text-[10px] sm:text-xs min-w-0 flex-1">
            <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="truncate">{t.row1}</span>
          </div>

          {/* Direction & Pause Controls for Line 1 */}
          <div className="flex items-center space-x-1 shrink-0 bg-white dark:bg-slate-900/90 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setDirRow1('left')}
              title="Scroll Left"
              className={`p-1 rounded transition-colors ${
                dirRow1 === 'left'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsPausedRow1(!isPausedRow1)}
              title={isPausedRow1 ? 'Play' : 'Pause'}
              className={`p-1 rounded transition-colors ${
                isPausedRow1
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isPausedRow1 ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
            </button>
            <button
              onClick={() => setDirRow1('right')}
              title="Scroll Right"
              className={`p-1 rounded transition-colors ${
                dirRow1 === 'right'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Marquee Row 1 */}
        <div className="glass-panel p-2 sm:p-2.5 rounded-xl border border-cyan-500/20 dark:border-cyan-500/30 relative overflow-hidden shadow-xs group bg-white/95 dark:bg-slate-900/60">
          {/* Edge Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

          <div
            className={`flex items-center space-x-4 ${
              dirRow1 === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
            }`}
            style={{
              animationDuration: '58s',
              animationPlayState: isPausedRow1 ? 'paused' : undefined,
            }}
          >
            {duplicatedRow1.map((item, idx) => (
              <div
                key={`row1-${item.name}-${idx}`}
                className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shrink-0 hover:border-cyan-500/50 hover:shadow-xs transition-all"
              >
                <div className="h-5 flex items-center justify-center shrink-0">
                  <BrandLogo name={item.name} className="h-4.5 w-auto max-w-[85px]" />
                </div>
                <div className="border-l border-slate-200 dark:border-slate-800 pl-2">
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {item.name}
                  </div>
                  <div className="text-[9.5px] font-mono text-cyan-700 dark:text-cyan-400 whitespace-nowrap">
                    {item.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
         ROW 2: GLOBAL LOGISTICS, MARITIME CARRIERS & SUPPLY CHAIN
         ========================================================================= */}
      <div className="space-y-1.5">
        {/* Row Header + Controls */}
        <div className="flex items-center justify-between text-xs font-mono px-1 gap-2 min-w-0">
          <div className="flex items-center space-x-2 text-emerald-900 dark:text-emerald-400 font-bold tracking-wider text-[10px] sm:text-xs min-w-0 flex-1">
            <Ship className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">{t.row2}</span>
          </div>

          {/* Direction & Pause Controls for Line 2 */}
          <div className="flex items-center space-x-1 shrink-0 bg-white dark:bg-slate-900/90 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setDirRow2('left')}
              title="Scroll Left"
              className={`p-1 rounded transition-colors ${
                dirRow2 === 'left'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsPausedRow2(!isPausedRow2)}
              title={isPausedRow2 ? 'Play' : 'Pause'}
              className={`p-1 rounded transition-colors ${
                isPausedRow2
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isPausedRow2 ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
            </button>
            <button
              onClick={() => setDirRow2('right')}
              title="Scroll Right"
              className={`p-1 rounded transition-colors ${
                dirRow2 === 'right'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Marquee Row 2 */}
        <div className="glass-panel p-2 sm:p-2.5 rounded-xl border border-emerald-500/20 dark:border-emerald-500/30 relative overflow-hidden shadow-xs group bg-white/95 dark:bg-slate-900/60">
          {/* Edge Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

          <div
            className={`flex items-center space-x-4 ${
              dirRow2 === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
            }`}
            style={{
              animationDuration: '48s',
              animationPlayState: isPausedRow2 ? 'paused' : undefined,
            }}
          >
            {duplicatedRow2.map((item, idx) => (
              <div
                key={`row2-${item.name}-${idx}`}
                className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shrink-0 hover:border-emerald-500/50 hover:shadow-xs transition-all"
              >
                <div className="h-5 flex items-center justify-center shrink-0">
                  <BrandLogo name={item.name} className="h-4.5 w-auto max-w-[85px]" />
                </div>
                <div className="border-l border-slate-200 dark:border-slate-800 pl-2">
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {item.name}
                  </div>
                  <div className="text-[9.5px] font-mono text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                    {item.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
