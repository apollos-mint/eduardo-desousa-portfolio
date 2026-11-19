'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';
import { Building2, ChevronLeft, ChevronRight, Pause, Play, Ship } from 'lucide-react';

interface InfiniteBrandMarqueeProps {
  currentLocale: Locale;
}

interface MarqueeItem {
  name: string;
  category: string;
}

interface MarqueeLocaleData {
  titleRow1: string;
  titleRow2: string;
  controls: {
    scrollLeft: string;
    scrollRight: string;
    pause: string;
    play: string;
  };
  row1: MarqueeItem[];
  row2: MarqueeItem[];
}

const marqueeData: Record<Locale, MarqueeLocaleData> = {
  es: {
    titleRow1: 'PLANTAS INDUSTRIALES, ESTÁNDARES Y ARQUITECTURA TÉCNICA:',
    titleRow2: 'RED GLOBAL DE LOGÍSTICA, LÍNEAS MARÍTIMAS Y SUPPLY CHAIN (APAC / AMÉRICAS / EUROPA):',
    controls: {
      scrollLeft: 'Desplazar a la izquierda',
      scrollRight: 'Desplazar a la derecha',
      pause: 'Pausar desplazamiento',
      play: 'Reanudar desplazamiento',
    },
    row1: [
      { name: 'ASML', category: 'Litografía de Semiconductores' },
      { name: 'HQ PACK', category: 'Ensamblaje y Embalaje High-Tech' },
      { name: 'VDL NEDCAR', category: 'Línea Móvil de Montaje Automoción' },
      { name: 'BMW', category: 'Calidad OEM Automoción' },
      { name: 'MINI', category: 'Control de Calidad de Montaje' },
      { name: 'TÜV NORD', category: 'Seguridad de Equipos y Cabrestantes' },
      { name: 'Lean Six Sigma', category: 'Black Belt (DMAIC)' },
      { name: 'TypeScript', category: 'Sistemas Web y Datos Empresariales' },
      { name: 'Python', category: 'Telemetría de Datos y Pipelines' },
      { name: 'PostgreSQL', category: 'Arquitectura CMMS OptiAsset' },
      { name: 'Next.js', category: 'Arquitectura Web Edge y Rendimiento' },
      { name: 'ZEISS', category: 'Embalaje Óptico High-NA' },
      { name: 'BOSCH', category: 'Electrónica Industrial Tier-1' },
    ],
    row2: [
      { name: 'HAPAG-LLOYD', category: 'Naviera Global (Alemania / Transatlántico)' },
      { name: 'MAERSK', category: 'Flete Integral de Contenedores (Global)' },
      { name: 'MSC', category: 'Línea de Contenedores y Terminales Portuarias' },
      { name: 'COSCO', category: 'Naviera Oceánica China (Ningbo / Shenzhen / Global)' },
      { name: 'CMA CGM', category: 'Líneas Transpacífico y Asia-Europa' },
      { name: 'EVERGREEN', category: 'Operador Global de Contenedores (APAC / América)' },
      { name: 'ONE', category: 'Ocean Network Express (Japón / Rutas Globales)' },
      { name: 'KUEHNE+NAGEL', category: 'Transitario Global y Logística Intermodal' },
      { name: 'APM TERMINALS', category: 'Operaciones Portuarias (Róterdam / Valencia)' },
      { name: 'ZAPIER', category: 'Webhooks y Automatización Logística' },
    ],
  },
  en: {
    titleRow1: 'TIER-1 MANUFACTURING PLANTS, QUALITY STANDARDS & TECH STACK:',
    titleRow2: 'GLOBAL LOGISTICS NETWORK, MARITIME CARRIERS & SUPPLY CHAIN (APAC / AMERICAS / EUROPE):',
    controls: {
      scrollLeft: 'Scroll Left',
      scrollRight: 'Scroll Right',
      pause: 'Pause scrolling',
      play: 'Resume scrolling',
    },
    row1: [
      { name: 'ASML', category: 'Semiconductor Lithography' },
      { name: 'HQ PACK', category: 'High-Tech Packaging Assembly' },
      { name: 'VDL NEDCAR', category: 'Automotive Moving Line' },
      { name: 'BMW', category: 'Automotive OEM Quality' },
      { name: 'MINI', category: 'Assembly Quality Control' },
      { name: 'TÜV NORD', category: 'Equipment & Winch Safety' },
      { name: 'Lean Six Sigma', category: 'Black Belt (DMAIC)' },
      { name: 'TypeScript', category: 'Enterprise Web & Data Systems' },
      { name: 'Python', category: 'Data Telemetry & Pipelines' },
      { name: 'PostgreSQL', category: 'OptiAsset CMMS Architecture' },
      { name: 'Next.js', category: 'Edge Web Architecture & Speed' },
      { name: 'ZEISS', category: 'High-NA Optics Packaging' },
      { name: 'BOSCH', category: 'Tier-1 Industrial Electronics' },
    ],
    row2: [
      { name: 'HAPAG-LLOYD', category: 'Global Maritime Carrier (Germany / Transatlantic)' },
      { name: 'MAERSK', category: 'Integrated Container Freight (Global)' },
      { name: 'MSC', category: 'Container Shipping & Port Terminals' },
      { name: 'COSCO', category: 'China Ocean Shipping (Ningbo / Shenzhen / Global)' },
      { name: 'CMA CGM', category: 'Transpacific & Asia-Europe Shipping' },
      { name: 'EVERGREEN', category: 'Global Container Carrier (APAC / Americas)' },
      { name: 'ONE', category: 'Ocean Network Express (Japan / Global Routes)' },
      { name: 'KUEHNE+NAGEL', category: 'Global Freight Forwarding & Intermodal' },
      { name: 'APM TERMINALS', category: 'Port Operations (Rotterdam / Valencia)' },
      { name: 'ZAPIER', category: 'Logistics Webhooks & Data Automation' },
    ],
  },
  pt: {
    titleRow1: 'PLANTAS INDUSTRIAIS, PADRÕES DE QUALIDADE E ARQUITETURA TÉCNICA:',
    titleRow2: 'REDE GLOBAL DE LOGÍSTICA, LINHAS MARÍTIMAS E SUPPLY CHAIN (APAC / AMÉRICAS / EUROPA):',
    controls: {
      scrollLeft: 'Mover para a esquerda',
      scrollRight: 'Mover para a direita',
      pause: 'Pausar deslocamento',
      play: 'Retomar deslocamento',
    },
    row1: [
      { name: 'ASML', category: 'Litografia de Semicondutores' },
      { name: 'HQ PACK', category: 'Montagem e Embalagem High-Tech' },
      { name: 'VDL NEDCAR', category: 'Linha Móvel de Montagem Automotiva' },
      { name: 'BMW', category: 'Qualidade OEM Automóvel' },
      { name: 'MINI', category: 'Controlo de Qualidade de Montagem' },
      { name: 'TÜV NORD', category: 'Segurança de Equipamentos e Tornos' },
      { name: 'Lean Six Sigma', category: 'Black Belt (DMAIC)' },
      { name: 'TypeScript', category: 'Sistemas Web e Dados Empresariais' },
      { name: 'Python', category: 'Telemetria de Dados e Pipelines' },
      { name: 'PostgreSQL', category: 'Arquitetura CMMS OptiAsset' },
      { name: 'Next.js', category: 'Arquitetura Web Edge e Desempenho' },
      { name: 'ZEISS', category: 'Embalagem Óptica High-NA' },
      { name: 'BOSCH', category: 'Eletrónica Industrial Tier-1' },
    ],
    row2: [
      { name: 'HAPAG-LLOYD', category: 'Linha Marítima Global (Alemanha / Transatlântico)' },
      { name: 'MAERSK', category: 'Frete Integrado de Contentores (Global)' },
      { name: 'MSC', category: 'Transporte de Contentores e Terminais Portuários' },
      { name: 'COSCO', category: 'Transporte Oceânico China (Ningbo / Shenzhen / Global)' },
      { name: 'CMA CGM', category: 'Rotas Transpacífico e Ásia-Europa' },
      { name: 'EVERGREEN', category: 'Operador Global de Contentores (APAC / Américas)' },
      { name: 'ONE', category: 'Ocean Network Express (Japão / Rotas Globais)' },
      { name: 'KUEHNE+NAGEL', category: 'Transitário Global e Logística Intermodal' },
      { name: 'APM TERMINALS', category: 'Operações Portuárias (Roterdão / Valência)' },
      { name: 'ZAPIER', category: 'Webhooks e Automação de Dados Logísticos' },
    ],
  },
  nl: {
    titleRow1: 'INDUSTRIËLE PRODUCTIELOCATIES, KWALITEITSNORMEN EN TECH ARCHITECTUUR:',
    titleRow2: 'WERELDWIJD LOGISTIEK NETWERK, REDERIJSYSTEMEN EN SUPPLY CHAIN (APAC / AMERIKA / EUROPA):',
    controls: {
      scrollLeft: 'Naar links schuiven',
      scrollRight: 'Naar rechts schuiven',
      pause: 'Pauzeren',
      play: 'Afspelen',
    },
    row1: [
      { name: 'ASML', category: 'Halfgeleiderlithografie' },
      { name: 'HQ PACK', category: 'High-Tech Verpakkingsassemblage' },
      { name: 'VDL NEDCAR', category: 'Automotive Assemblagelijn' },
      { name: 'BMW', category: 'Automotive OEM Kwaliteit' },
      { name: 'MINI', category: 'Kwaliteitscontrole Assemblage' },
      { name: 'TÜV NORD', category: 'Machine- en Lierveiligheid' },
      { name: 'Lean Six Sigma', category: 'Black Belt (DMAIC)' },
      { name: 'TypeScript', category: 'Enterprise Web- en Datasystemen' },
      { name: 'Python', category: 'Datatelemetrie en Pijplijnen' },
      { name: 'PostgreSQL', category: 'OptiAsset CMMS Architectuur' },
      { name: 'Next.js', category: 'Edge Web Architectuur en Snelheid' },
      { name: 'ZEISS', category: 'High-NA Optiekverpakking' },
      { name: 'BOSCH', category: 'Tier-1 Industriële Elektronica' },
    ],
    row2: [
      { name: 'HAPAG-LLOYD', category: 'Mondiale Rederij (Duitsland / Trans-Atlantisch)' },
      { name: 'MAERSK', category: 'Geïntegreerde Containervaart (Mondiaal)' },
      { name: 'MSC', category: 'Containervaart en Haventerminals' },
      { name: 'COSCO', category: 'China Ocean Shipping (Ningbo / Shenzhen / Mondiaal)' },
      { name: 'CMA CGM', category: 'Trans-Pacifische en Azië-Europa Vaarroutes' },
      { name: 'EVERGREEN', category: 'Mondiale Containervervoerder (APAC / Amerika)' },
      { name: 'ONE', category: 'Ocean Network Express (Japan / Mondiale Routes)' },
      { name: 'KUEHNE+NAGEL', category: 'Mondiale Expeditie en Intermodaal Transport' },
      { name: 'APM TERMINALS', category: 'Havenoperaties (Rotterdam / Valencia)' },
      { name: 'ZAPIER', category: 'Logistieke Webhooks en Data-automatisering' },
    ],
  },
  de: {
    titleRow1: 'FERTIGUNGSWERKE, QUALITÄTSSTANDARDS & TECHNISCHE ARCHITEKTUR:',
    titleRow2: 'GLOBALES LOGISTIKNETZWERK, REEDEREIEN & SUPPLY CHAIN (APAC / AMERIKA / EUROPA):',
    controls: {
      scrollLeft: 'Nach links scrollen',
      scrollRight: 'Nach rechts scrollen',
      pause: 'Pausieren',
      play: 'Fortsetzen',
    },
    row1: [
      { name: 'ASML', category: 'Halbleiter-Lithographie' },
      { name: 'HQ PACK', category: 'High-Tech Verpackungsmontage' },
      { name: 'VDL NEDCAR', category: 'Automobil-Montagelinie' },
      { name: 'BMW', category: 'Automotive OEM-Qualität' },
      { name: 'MINI', category: 'Montage-Qualitätskontrolle' },
      { name: 'TÜV NORD', category: 'Ausrüstungs- und Windensicherheit' },
      { name: 'Lean Six Sigma', category: 'Black Belt (DMAIC)' },
      { name: 'TypeScript', category: 'Enterprise Web- und Datensysteme' },
      { name: 'Python', category: 'Datentelemetrie & Pipelines' },
      { name: 'PostgreSQL', category: 'OptiAsset CMMS-Architektur' },
      { name: 'Next.js', category: 'Edge-Webarchitektur & Performance' },
      { name: 'ZEISS', category: 'High-NA Optikverpackung' },
      { name: 'BOSCH', category: 'Tier-1 Industrieelektronik' },
    ],
    row2: [
      { name: 'HAPAG-LLOYD', category: 'Globale Reederei (Deutschland / Transatlantik)' },
      { name: 'MAERSK', category: 'Integrierter Containertransport (Global)' },
      { name: 'MSC', category: 'Containerschifffahrt & Hafenterminals' },
      { name: 'COSCO', category: 'China Ocean Shipping (Ningbo / Shenzhen / Global)' },
      { name: 'CMA CGM', category: 'Transpazifik & Asien-Europa Seewege' },
      { name: 'EVERGREEN', category: 'Globaler Container-Carrier (APAC / Amerika)' },
      { name: 'ONE', category: 'Ocean Network Express (Japan / Globale Routen)' },
      { name: 'KUEHNE+NAGEL', category: 'Globale Spedition & Intermodale Logistik' },
      { name: 'APM TERMINALS', category: 'Hafenbetrieb (Rotterdam / Valencia)' },
      { name: 'ZAPIER', category: 'Logistik-Webhooks & Datenautomatisierung' },
    ],
  },
  fr: {
    titleRow1: 'SITES INDUSTRIELS, STANDARDS DE QUALITÉ ET ARCHITECTURE TECHNIQUE:',
    titleRow2: 'RÉSEAU LOGISTIQUE MONDIAL, COMPAGNIES MARITIMES & SUPPLY CHAIN (APAC / AMÉRIQUES / EUROPE):',
    controls: {
      scrollLeft: 'Faire défiler vers la gauche',
      scrollRight: 'Faire défiler vers la droite',
      pause: 'Suspendre le défilement',
      play: 'Reprendre le défilement',
    },
    row1: [
      { name: 'ASML', category: 'Lithographie pour Semi-conducteurs' },
      { name: 'HQ PACK', category: 'Assemblage et Emballage Haute Technologie' },
      { name: 'VDL NEDCAR', category: 'Ligne Mobile de Montage Automobile' },
      { name: 'BMW', category: 'Qualité OEM Automobile' },
      { name: 'MINI', category: "Contrôle Qualité d'Assemblage" },
      { name: 'TÜV NORD', category: 'Sécurité des Équipements et Treuils' },
      { name: 'Lean Six Sigma', category: 'Black Belt (DMAIC)' },
      { name: 'TypeScript', category: 'Systèmes Web & Données Entreprise' },
      { name: 'Python', category: 'Télémétrie de Données & Pipelines' },
      { name: 'PostgreSQL', category: 'Architecture CMMS OptiAsset' },
      { name: 'Next.js', category: 'Architecture Web Edge & Performance' },
      { name: 'ZEISS', category: 'Conditionnement Optique High-NA' },
      { name: 'BOSCH', category: 'Électronique Industrielle Tier-1' },
    ],
    row2: [
      { name: 'HAPAG-LLOYD', category: 'Armateur Mondial (Allemagne / Transatlantique)' },
      { name: 'MAERSK', category: 'Fret Intégré de Conteneurs (Mondial)' },
      { name: 'MSC', category: 'Transport Maritime & Terminaux Portuaires' },
      { name: 'COSCO', category: 'China Ocean Shipping (Ningbo / Shenzhen / Mondial)' },
      { name: 'CMA CGM', category: 'Lignes Maritimes Transpacifique & Asie-Europe' },
      { name: 'EVERGREEN', category: 'Transporteur Mondial de Conteneurs (APAC / Amériques)' },
      { name: 'ONE', category: 'Ocean Network Express (Japon / Lignes Mondiales)' },
      { name: 'KUEHNE+NAGEL', category: 'Transitaire Mondial & Logistique Intermodale' },
      { name: 'APM TERMINALS', category: 'Exploitation Portuaire (Rotterdam / Valence)' },
      { name: 'ZAPIER', category: 'Webhooks Logistiques & Automatisation des Données' },
    ],
  },
};

export default function InfiniteBrandMarquee({ currentLocale }: InfiniteBrandMarqueeProps) {
  // Row 1 Direction & Pause states
  const [dirRow1, setDirRow1] = useState<'left' | 'right'>('left');
  const [isPausedRow1, setIsPausedRow1] = useState(false);

  // Row 2 Direction & Pause states
  const [dirRow2, setDirRow2] = useState<'left' | 'right'>('right');
  const [isPausedRow2, setIsPausedRow2] = useState(false);

  const t = marqueeData[currentLocale] || marqueeData.en;

  const duplicatedRow1 = [...t.row1, ...t.row1];
  const duplicatedRow2 = [...t.row2, ...t.row2];

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
            <span className="truncate">{t.titleRow1}</span>
          </div>

          {/* Direction & Pause Controls for Line 1 */}
          <div className="flex items-center space-x-1 shrink-0 bg-white dark:bg-slate-900/90 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setDirRow1('left')}
              title={t.controls.scrollLeft}
              aria-label={t.controls.scrollLeft}
              className={`p-1 rounded transition-colors cursor-pointer ${
                dirRow1 === 'left'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsPausedRow1(!isPausedRow1)}
              title={isPausedRow1 ? t.controls.play : t.controls.pause}
              aria-label={isPausedRow1 ? t.controls.play : t.controls.pause}
              className={`p-1 rounded transition-colors cursor-pointer ${
                isPausedRow1
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isPausedRow1 ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
            </button>
            <button
              onClick={() => setDirRow1('right')}
              title={t.controls.scrollRight}
              aria-label={t.controls.scrollRight}
              className={`p-1 rounded transition-colors cursor-pointer ${
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
            <span className="truncate">{t.titleRow2}</span>
          </div>

          {/* Direction & Pause Controls for Line 2 */}
          <div className="flex items-center space-x-1 shrink-0 bg-white dark:bg-slate-900/90 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setDirRow2('left')}
              title={t.controls.scrollLeft}
              aria-label={t.controls.scrollLeft}
              className={`p-1 rounded transition-colors cursor-pointer ${
                dirRow2 === 'left'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsPausedRow2(!isPausedRow2)}
              title={isPausedRow2 ? t.controls.play : t.controls.pause}
              aria-label={isPausedRow2 ? t.controls.play : t.controls.pause}
              className={`p-1 rounded transition-colors cursor-pointer ${
                isPausedRow2
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isPausedRow2 ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
            </button>
            <button
              onClick={() => setDirRow2('right')}
              title={t.controls.scrollRight}
              aria-label={t.controls.scrollRight}
              className={`p-1 rounded transition-colors cursor-pointer ${
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
