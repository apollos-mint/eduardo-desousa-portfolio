'use client';

import React from 'react';

interface CyberTechBackgroundProps {
  currentLocale?: string;
}

const telemetryTranslations: Record<
  string,
  {
    node: string;
    metrics: string;
    spec: string;
    cadence: string;
  }
> = {
  es: {
    node: 'SYS.NODO // SOURCING LAT 22.3193° N · LON 114.1694° E',
    metrics: "MÉTRICAS: SOURCING FCL 40'HC · -75% BOM DESINTERMEDIACIÓN NETA",
    spec: 'ESPECIFICACIÓN: HQ PACK ECOSISTEMA ASML PRE-CLEANROOM STAGING',
    cadence: 'CADENCIA: BMW/MINI OEM 110-120 VEH/TURNO · 8D RCA CERO DEFECTOS',
  },
  en: {
    node: 'SYS.NODE // SOURCING LAT 22.3193° N · LON 114.1694° E',
    metrics: "METRICS: TRANSCONTINENTAL FCL 40'HC · -75% BOM DIRECT SOURCING",
    spec: 'SPEC: HQ PACK ASML ECOSYSTEM PRE-CLEANROOM STAGING',
    cadence: 'CADENCE: BMW/MINI OEM 110-120 VEH/SHIFT · 8D RCA ZERO DEFECTS',
  },
  de: {
    node: 'SYS.KNOTEN // BESCHAFFUNG LAT 22.3193° N · LON 114.1694° E',
    metrics: "METRIKEN: FCL 40'HC DIREKTBEZUG · -75% BOM DISINTERMEDIATION",
    spec: 'SPEZ: HQ PACK ASML ÖKOSYSTEM PRE-CLEANROOM STAGING',
    cadence: 'TAKTZEIT: BMW/MINI OEM 110-120 FZG/SCHICHT · 8D RCA NULL FEHLER',
  },
  fr: {
    node: 'SYS.NOEUD // SOURCING LAT 22.3193° N · LON 114.1694° E',
    metrics: "MÉTRIQUES: SOURCING FCL 40'HC · -75% BOM DÉSINTERMÉDIATION NETTE",
    spec: 'SPÉC: HQ PACK ÉCOSYSTÈME ASML PRE-CLEANROOM STAGING',
    cadence: 'CADENCE: BMW/MINI OEM 110-120 VÉH/POSTE · 8D RCA ZÉRO DÉFAUT',
  },
  pt: {
    node: 'SYS.NÓ // SOURCING LAT 22.3193° N · LON 114.1694° E',
    metrics: "MÉTRICAS: SOURCING FCL 40'HC · -75% BOM DESINTERMEDIAÇÃO DIRETA",
    spec: 'ESPEC: HQ PACK ECOSSISTEMA ASML PRE-CLEANROOM STAGING',
    cadence: 'CADÊNCIA: BMW/MINI OEM 110-120 VEÍCULOS/TURNO · 8D RCA ZERO DEFEITOS',
  },
  nl: {
    node: 'SYS.KNOOPPUNT // SOURCING LAT 22.3193° N · LON 114.1694° E',
    metrics: "METRIEKEN: FCL 40'HC DIRECTE INKOOP · -75% BOM DISINTERMEDIATIE",
    spec: 'SPEC: HQ PACK ASML ECOSYSTEEM PRE-CLEANROOM STAGING',
    cadence: 'CADANS: BMW/MINI OEM 110-120 VOERTUIGEN/SHIFT · 8D RCA NUL DEFECTEN',
  },
};

export { telemetryTranslations };

export default function CyberTechBackground({
  currentLocale = 'es',
}: CyberTechBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
      {/* 1. Subtle SVG Technical Matrix Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-60 dark:opacity-45" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 40x40 Blueprint Technical Grid */}
          <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-slate-300 dark:text-cyan-950/70"
            />
            <circle cx="40" cy="40" r="1.2" className="fill-cyan-500/50 dark:fill-cyan-400/50" />
          </pattern>
          {/* 160x160 Major Sector Grid */}
          <pattern id="major-grid" width="160" height="160" patternUnits="userSpaceOnUse">
            <rect width="160" height="160" fill="url(#cyber-grid)" />
            <path
              d="M 160 0 L 0 0 0 160"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              className="text-cyan-600/30 dark:text-cyan-500/35"
            />
            {/* Corner Crosshairs */}
            <path
              d="M 155 160 L 165 160 M 160 155 L 160 165"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-cyan-600/60 dark:text-cyan-400/60"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#major-grid)" />
      </svg>

      {/* 2. Soft High-Tech Ambient Radial Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-indigo-500/10 dark:from-cyan-500/15 dark:via-emerald-500/10 dark:to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* 3. Scanning Telemetry Pulse Lines */}
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/30 to-transparent" />
      <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 dark:via-emerald-400/30 to-transparent" />
    </div>
  );
}
