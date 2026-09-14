'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';
import { Building2, ChevronLeft, ChevronRight, Pause, Play, Award, Cpu } from 'lucide-react';

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
      companies: 'ECOSISTEMAS DE FABRICACIÓN Y LOGÍSTICA TIER-1:',
      techs: 'TECNOLOGÍAS, ESTÁNDARES Y CERTIFICACIONES:',
    },
    en: {
      companies: 'TIER-1 MANUFACTURING & LOGISTICS ECOSYSTEMS:',
      techs: 'TECHNOLOGIES, STANDARDS & CERTIFICATIONS:',
    },
    pt: {
      companies: 'ECOSSISTEMAS DE FABRICAÇÃO E LOGÍSTICA TIER-1:',
      techs: 'TECNOLOGIAS, PADRÕES E CERTIFICAÇÕES:',
    },
    nl: {
      companies: 'TIER-1 PRODUCTIE- EN LOGISTIEKE ECOSYSTEMEN:',
      techs: 'TECHNOLOGIEËN, NORMEN EN CERTIFICERINGEN:',
    },
    de: {
      companies: 'TIER-1 FERTIGUNGS- UND LOGISTIK-ÖKOSYSTEME:',
      techs: 'TECHNOLOGIEN, NORMEN UND ZERTIFIZIERUNGEN:',
    },
    fr: {
      companies: 'ÉCOSYSTÈMES INDUSTRIELS ET LOGISTIQUES TIER-1:',
      techs: 'TECHNOLOGIES, NORMES ET CERTIFICATIONS:',
    },
  };

  const t = titles[currentLocale] || titles.en;

  // Row 1: Companies & Global Maritime / Tier-1 Partners
  const companyList = [
    { name: 'HQ PACK', category: 'Cleanroom Packaging' },
    { name: 'ASML', category: 'Semiconductor Lithography' },
    { name: 'BMW', category: 'Automotive OEM' },
    { name: 'MINI', category: 'Automotive OEM' },
    { name: 'BOSCH', category: 'Tier-1 Electronics' },
    { name: 'ZEISS', category: 'High-NA Optics' },
    { name: 'HAPAG-LLOYD', category: 'Global Maritime Shipping' },
    { name: 'MAERSK', category: 'Integrated Freight' },
    { name: 'MSC', category: 'Container Logistics' },
    { name: 'ZF', category: 'Powertrain & Torque' },
    { name: 'BROSE', category: 'Mechatronic Systems' },
    { name: 'VDL', category: 'Contract Manufacturing OEM' },
    { name: 'NEWAYS', category: 'Cleanroom PCBA' },
    { name: 'FRENCKEN', category: 'Precision Mechanics' },
  ];

  // Row 2: Technologies, Systems & Accredited Standards
  const techList = [
    { name: 'ISO 9001', category: 'Quality Lead Auditor' },
    { name: 'TÜV', category: 'TÜV Rheinland Certified' },
    { name: 'GOOGLE', category: 'Data Analytics Professional' },
    { name: 'Lean Six Sigma', category: 'Black Belt DMAIC' },
    { name: 'ERP ISAH', category: 'Work Order & Supply Chain' },
    { name: 'Cleanroom Class 5', category: 'ISO 14644-1 Packaging' },
    { name: '8D RCA', category: 'Root Cause Problem Solving' },
    { name: 'Gage R&R', category: 'Measurement System Analysis' },
    { name: 'SPC Metrology', category: 'Statistical Process Control' },
    { name: 'VCA VOL', category: 'Safety Leadership & Compliance' },
  ];

  const duplicatedCompanies = [...companyList, ...companyList];
  const duplicatedTechs = [...techList, ...techList];

  return (
    <div className="w-full space-y-2.5 pt-1">
      {/* =========================================================================
         LINE 1: CLIENT COMPANIES & MARITIME/OEM ECOSYSTEMS
         ========================================================================= */}
      <div className="space-y-1.5">
        {/* Row Header + Controls */}
        <div className="flex items-center justify-between text-xs font-mono px-1">
          <div className="flex items-center space-x-2 text-cyan-800 dark:text-cyan-400 font-bold tracking-wider text-[11px] sm:text-xs">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.companies}</span>
          </div>

          {/* Direction & Pause Controls for Line 1 */}
          <div className="flex items-center space-x-1 bg-white dark:bg-slate-900/90 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
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
        <div className="glass-panel p-2 sm:p-2.5 rounded-xl border border-cyan-500/30 dark:border-cyan-500/30 relative overflow-hidden shadow-sm group bg-white/90 dark:bg-slate-900/60">
          {/* Edge Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

          <div
            className={`flex items-center space-x-4 ${
              dirRow1 === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
            }`}
            style={{
              animationDuration: '62s',
              animationPlayState: isPausedRow1 ? 'paused' : undefined,
            }}
          >
            {duplicatedCompanies.map((brand, idx) => (
              <div
                key={`comp-${brand.name}-${idx}`}
                className="flex items-center space-x-2.5 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shrink-0 hover:border-cyan-500/50 transition-colors"
              >
                <div className="h-5 flex items-center justify-center shrink-0">
                  <BrandLogo name={brand.name} className="h-4.5 w-auto max-w-[80px]" />
                </div>
                <div className="border-l border-slate-200 dark:border-slate-800 pl-2">
                  <div className="text-[10px] font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {brand.name}
                  </div>
                  <div className="text-[9px] font-mono text-cyan-700 dark:text-cyan-400 whitespace-nowrap">
                    {brand.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
         LINE 2: TECHNOLOGIES, SYSTEMS & ACCREDITED CERTIFICATIONS
         ========================================================================= */}
      <div className="space-y-1.5">
        {/* Row Header + Controls */}
        <div className="flex items-center justify-between text-xs font-mono px-1">
          <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 font-bold tracking-wider text-[11px] sm:text-xs">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.techs}</span>
          </div>

          {/* Direction & Pause Controls for Line 2 */}
          <div className="flex items-center space-x-1 bg-white dark:bg-slate-900/90 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
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
                  ? 'bg-cyan-500 text-slate-950 font-bold'
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
        <div className="glass-panel p-2 sm:p-2.5 rounded-xl border border-emerald-500/30 dark:border-emerald-500/30 relative overflow-hidden shadow-sm group bg-white/90 dark:bg-slate-900/60">
          {/* Edge Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

          <div
            className={`flex items-center space-x-4 ${
              dirRow2 === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
            }`}
            style={{
              animationDuration: '36s',
              animationPlayState: isPausedRow2 ? 'paused' : undefined,
            }}
          >
            {duplicatedTechs.map((tech, idx) => (
              <div
                key={`tech-${tech.name}-${idx}`}
                className="flex items-center space-x-2.5 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shrink-0 hover:border-emerald-500/50 transition-colors"
              >
                <div className="h-5 flex items-center justify-center shrink-0">
                  <BrandLogo name={tech.name} className="h-4.5 w-auto max-w-[80px]" />
                </div>
                <div className="border-l border-slate-200 dark:border-slate-800 pl-2">
                  <div className="text-[10px] font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {tech.name}
                  </div>
                  <div className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                    {tech.category}
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
