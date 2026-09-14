'use client';

import React, { useEffect, useState } from 'react';

export interface InvestmentsGanttBackgroundProps {
  currentLocale?: string;
  showCapitalCurve?: boolean;
  showGanttMatrix?: boolean;
  showBlueprintGrid?: boolean;
  capitalOffsetClass?: string;
  ganttOffsetClass?: string;
  className?: string;
}

export function BlueprintGrid({ className = '' }: { className?: string }) {
  return (
    <svg className={`absolute inset-0 w-full h-full opacity-40 dark:opacity-30 pointer-events-none ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gantt-cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            className="text-slate-300 dark:text-cyan-950/60"
          />
          <circle cx="40" cy="40" r="1.0" className="fill-cyan-500/40 dark:fill-cyan-400/40" />
        </pattern>
        <pattern id="gantt-major-grid" width="160" height="160" patternUnits="userSpaceOnUse">
          <rect width="160" height="160" fill="url(#gantt-cyber-grid)" />
          <path
            d="M 160 0 L 0 0 0 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-cyan-600/20 dark:text-cyan-500/25"
          />
          <path
            d="M 155 160 L 165 160 M 160 155 L 160 165"
            stroke="currentColor"
            strokeWidth="1.4"
            className="text-cyan-600/40 dark:text-cyan-400/40"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gantt-major-grid)" />
    </svg>
  );
}

export default function InvestmentsGanttBackground({
  currentLocale = 'es',
  showCapitalCurve = true,
  showGanttMatrix = true,
  showBlueprintGrid = true,
  capitalOffsetClass = '',
  ganttOffsetClass = '',
  className = '',
}: InvestmentsGanttBackgroundProps) {
  const [timelineProgress, setTimelineProgress] = useState(0);

  // 16-second continuous looping timeline (throttled to ~30 FPS for minimal CPU/compositor load)
  useEffect(() => {
    let animFrame: number;
    let start: number | null = null;
    let lastRenderTime = 0;
    const duration = 16000; // 16s loop

    const step = (timestamp: number) => {
      animFrame = requestAnimationFrame(step);
      if (document.hidden) return;
      if (timestamp - lastRenderTime < 33) return; // ~30 FPS clamp
      lastRenderTime = timestamp;

      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = (elapsed % duration) / duration;
      setTimelineProgress(progress);
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const currentWeek = Math.max(1, Math.min(32, Math.floor(timelineProgress * 32) + 1));

  const localeKey = (['es', 'en', 'pt', 'nl', 'de', 'fr'].includes(currentLocale) ? currentLocale : 'en') as 'es' | 'en' | 'pt' | 'nl' | 'de' | 'fr';

  const tDict = {
    es: {
      capitalTitle: 'ASIGNACIÓN DE CAPITAL // CURVA DE INVERSIÓN EN SOURCING Y AUTOMATIZACIÓN',
      yearSpend: '$800K USD / AÑO',
      containersQtr: '20 CONT/TRIMESTRE',
      costReduction: '-75% REDUCCIÓN DE COSTOS',
      netSaved: '+$600K AHORRO NETO',
      directFactory: 'FÁBRICA DIRECTA CHINA/INDIA',
      cleanroomPackaging: 'EMBALAJE SALA LIMPIA ASML CL.5',
      automotiveTooling: 'MATRICERÍA Y QA AUTOMOTRIZ OEM',
      ganttTitle: 'MATRIZ GANTT // CICLO DE DESARROLLO DE PROYECTOS INDUSTRIALES',
      timelineWeek: 'SEMANA',
      status: 'ESTADO',
      onCadence: 'EN CADENCIA',
      kickoff: 'INICIO',
      fullSop: 'SOP TOTAL',
      q1Audit: 'Q1 // AUDITORÍA INICIAL ($200K)',
      q2Tooling: 'Q2 // MATRICERÍA Y ESCALADO ($400K)',
      q3Cleanroom: 'Q3 // EMBALAJE SALA LIMPIA ($600K)',
      q4Peak: 'Q4 // PICO MULTIMODAL ($800K)',
      phases: [
        {
          title: 'Fase 01 // Auditoría de Proveedores y Sourcing (Shenzhen/India)',
          spec: '20 Cont/Trim · Verificación Directa en Planta',
          badge: '100% AUDITADO',
        },
        {
          title: 'Fase 02 // Matricería, Moldeo y APQP/PPAP Nivel 3',
          spec: '-75% Reducción de Costos · Matrices Directas OEM',
          badge: 'PPAP L3 OK',
        },
        {
          title: 'Fase 03 // Validación Sala Limpia ISO 14644-1 Cl.5 (ASML)',
          spec: 'Embalaje Litografía · Particulado <0.1µm',
          badge: 'ISO CL.5 CERT',
        },
        {
          title: 'Fase 04 // SOP Piloto Automotriz y 8D Cero Defectos (VDL/BMW)',
          spec: '110-120 Veh/Turno · Metrología Enrase y Holgura',
          badge: 'CERO DEFECTOS',
        },
        {
          title: 'Fase 05 // SOP Multimodal Global y Despacho CMMS Automatizado',
          spec: 'Rotterdam · Shanghai · Born Integración de Flota',
          badge: '100% SOP ACTIVO',
        },
      ],
      qualityAudit: 'AUDITADO ISO 9001:2015 · ASML ISO 14644-1 CL.5 · BMW OEM VDA 6.3',
      progression: 'PROGRESIÓN DE ETAPAS: SPRINT CONTINUO EN TIEMPO REAL',
    },
    en: {
      capitalTitle: 'CAPITAL ALLOCATION // SOURCING & AUTOMATION INVESTMENT CURVE',
      yearSpend: '$800K USD / YEAR',
      containersQtr: '20 CONT/QTR',
      costReduction: '-75% COST REDUCTION',
      netSaved: '+$600K NET SAVED',
      directFactory: 'CHINA/INDIA FACTORY DIRECT',
      cleanroomPackaging: 'ASML CL.5 CLEANROOM PACKAGING',
      automotiveTooling: 'AUTOMOTIVE OEM TOOLING & QA',
      ganttTitle: 'GANTT MATRIX // MULTI-STAGE PROJECT DEVELOPMENT LIFECYCLE',
      timelineWeek: 'WEEK',
      status: 'STATUS',
      onCadence: 'ON CADENCE',
      kickoff: 'KICKOFF',
      fullSop: 'FULL SOP',
      q1Audit: 'Q1 // INITIAL AUDIT ($200K)',
      q2Tooling: 'Q2 // TOOLING & SCALING ($400K)',
      q3Cleanroom: 'Q3 // CLEANROOM PACKAGING ($600K)',
      q4Peak: 'Q4 // MULTI-MODAL PEAK ($800K)',
      phases: [
        {
          title: 'Phase 01 // Sourcing & Supplier Audit (Shenzhen/India)',
          spec: '20 Cont/Qtr · Direct Factory Verification',
          badge: '100% AUDITED',
        },
        {
          title: 'Phase 02 // Tooling, Moulding & APQP/PPAP Level 3',
          spec: '-75% Cost Reduction · Direct OEM Dies',
          badge: 'PPAP L3 OK',
        },
        {
          title: 'Phase 03 // Cleanroom ISO 14644-1 Cl.5 Validation (ASML)',
          spec: 'Lithography Packaging · <0.1µm Particulates',
          badge: 'ISO CL.5 CERT',
        },
        {
          title: 'Phase 04 // Automotive Pilot SOP & 8D Zero Defects (VDL/BMW)',
          spec: '110-120 Veh/Shift · Metrology Flush & Gap',
          badge: 'ZERO DEFECTS',
        },
        {
          title: 'Phase 05 // Global Multi-Modal SOP & Automated CMMS Dispatch',
          spec: 'Rotterdam · Shanghai · Born Fleet Integration',
          badge: '100% SOP LIVE',
        },
      ],
      qualityAudit: 'ISO 9001:2015 · ASML ISO 14644-1 CL.5 · BMW OEM VDA 6.3 AUDITED',
      progression: 'STAGE PROGRESSION: REAL-TIME CONTINUOUS SPRINT',
    },
    pt: {
      capitalTitle: 'ALOCAÇÃO DE CAPITAL // CURVA DE INVESTIMENTO EM SOURCING E AUTOMAÇÃO',
      yearSpend: '$800K USD / ANO',
      containersQtr: '20 CONT/TRIMESTRE',
      costReduction: '-75% REDUÇÃO DE CUSTOS',
      netSaved: '+$600K ECONOMIA LÍQUIDA',
      directFactory: 'FÁBRICA DIRETA CHINA/ÍNDIA',
      cleanroomPackaging: 'EMBALAGEM SALA LIMPA ASML CL.5',
      automotiveTooling: 'FERRAMENTAS E QA AUTOMOTIVO OEM',
      ganttTitle: 'MATRIZ GANTT // CICLO DE DESENVOLVIMENTO DE PROJETOS INDUSTRIAIS',
      timelineWeek: 'SEMANA',
      status: 'STATUS',
      onCadence: 'EM CADÊNCIA',
      kickoff: 'INÍCIO',
      fullSop: 'SOP COMPLETO',
      q1Audit: 'Q1 // AUDITORIA INICIAL ($200K)',
      q2Tooling: 'Q2 // FERRAMENTARIA E ESCALONAMENTO ($400K)',
      q3Cleanroom: 'Q3 // EMBALAGEM SALA LIMPA ($600K)',
      q4Peak: 'Q4 // PICO MULTIMODAL ($800K)',
      phases: [
        {
          title: 'Fase 01 // Auditoria de Fornecedores e Sourcing (Shenzhen/Índia)',
          spec: '20 Cont/Trim · Verificação Direta na Fábrica',
          badge: '100% AUDITADO',
        },
        {
          title: 'Fase 02 // Ferramentaria, Moldagem e APQP/PPAP Nível 3',
          spec: '-75% Redução de Custos · Moldes Diretos OEM',
          badge: 'PPAP L3 OK',
        },
        {
          title: 'Fase 03 // Validação Sala Limpa ISO 14644-1 Cl.5 (ASML)',
          spec: 'Embalagem Litografia · Particulados <0.1µm',
          badge: 'ISO CL.5 CERT',
        },
        {
          title: 'Fase 04 // SOP Piloto Automotivo e 8D Zero Defeitos (VDL/BMW)',
          spec: '110-120 Veíc/Turno · Metrologia de Alinhamento',
          badge: 'ZERO DEFEITOS',
        },
        {
          title: 'Fase 05 // SOP Multimodal Global e Despacho CMMS Automatizado',
          spec: 'Roterdã · Xangai · Born Integração de Frota',
          badge: '100% SOP ATIVO',
        },
      ],
      qualityAudit: 'AUDITADO ISO 9001:2015 · ASML ISO 14644-1 CL.5 · BMW OEM VDA 6.3',
      progression: 'PROGRESSÃO DE ETAPAS: SPRINT CONTÍNUO EM TEMPO REAL',
    },
    nl: {
      capitalTitle: 'KAPITAALALLOCATIE // INVESTERINGSCURVE SOURCING EN AUTOMATISERING',
      yearSpend: '$800K USD / JAAR',
      containersQtr: '20 CONT/KWARTAAL',
      costReduction: '-75% KOSTENBESPARING',
      netSaved: '+$600K NETTO BESPAARD',
      directFactory: 'DIRECTE FABRIEK CHINA/INDIA',
      cleanroomPackaging: 'ASML CL.5 CLEANROOM VERPAKKING',
      automotiveTooling: 'AUTOMOTIVE OEM TOOLING & QA',
      ganttTitle: 'GANTT-MATRIX // MULTI-FASE INDUSTRIËLE PROJECTONTWIKKELING',
      timelineWeek: 'WEEK',
      status: 'STATUS',
      onCadence: 'OP SCHEMA',
      kickoff: 'KICK-OFF',
      fullSop: 'VOLLEDIGE SOP',
      q1Audit: 'Q1 // EERSTE AUDIT ($200K)',
      q2Tooling: 'Q2 // TOOLING & OPSCူALING ($400K)',
      q3Cleanroom: 'Q3 // CLEANROOM VERPAKKING ($600K)',
      q4Peak: 'Q4 // MULTIMODALE PIEK ($800K)',
      phases: [
        {
          title: 'Fase 01 // Sourcing & Leveranciersaudit (Shenzhen/India)',
          spec: '20 Cont/Kwartaal · Directe Fabrieksverificatie',
          badge: '100% GEAUDITEERD',
        },
        {
          title: 'Fase 02 // Tooling, Spuitgieten & APQP/PPAP Niveau 3',
          spec: '-75% Kostenreductie · Directe OEM Mallen',
          badge: 'PPAP L3 OK',
        },
        {
          title: 'Fase 03 // Cleanroom ISO 14644-1 Kl.5 Validatie (ASML)',
          spec: 'Lithografie Verpakking · <0.1µm Deeltjes',
          badge: 'ISO KL.5 CERT',
        },
        {
          title: 'Fase 04 // Automotive Pilot SOP & 8D Zero Defects (VDL/BMW)',
          spec: '110-120 Voertuigen/Ploeg · Metrologie Pasnaden',
          badge: 'NUL DEFECTEN',
        },
        {
          title: 'Fase 05 // Wereldwijde Multimodale SOP & Geautomatiseerd CMMS Dispatch',
          spec: 'Rotterdam · Shanghai · Born Vlootintegratie',
          badge: '100% SOP LIVE',
        },
      ],
      qualityAudit: 'ISO 9001:2015 · ASML ISO 14644-1 KL.5 · BMW OEM VDA 6.3 GEAUDITEERD',
      progression: 'FASEVOORTGANG: REAL-TIME CONTINU SPRINT',
    },
    de: {
      capitalTitle: 'KAPITALALLOKATION // INVESTITIONSKURVE SOURCING UND AUTOMATISIERUNG',
      yearSpend: '$800K USD / JAHR',
      containersQtr: '20 CONT/QUARTAL',
      costReduction: '-75% KOSTENREDUKTION',
      netSaved: '+$600K NETTO EINGESPART',
      directFactory: 'DIREKT AUS FABRIK CHINA/INDIEN',
      cleanroomPackaging: 'ASML KL.5 REINRAUM-VERPACKUNG',
      automotiveTooling: 'AUTOMOTIVE OEM WERKZEUGBAU & QA',
      ganttTitle: 'GANTT-MATRIX // MEHRSTUFIGER INDUSTRIEPROJEKT-LEBENSZYKLUS',
      timelineWeek: 'WOCHE',
      status: 'STATUS',
      onCadence: 'IM ZEITPLAN',
      kickoff: 'AUFTAKT',
      fullSop: 'VOLLE SOP',
      q1Audit: 'Q1 // INITIALES AUDIT ($200K)',
      q2Tooling: 'Q2 // WERKZEUGBAU & SKALIERUNG ($400K)',
      q3Cleanroom: 'Q3 // REINRAUM-VERPACKUNG ($600K)',
      q4Peak: 'Q4 // MULTIMODALER PEAK ($800K)',
      phases: [
        {
          title: 'Phase 01 // Sourcing & Lieferantenaudit (Shenzhen/Indien)',
          spec: '20 Cont/Quartal · Direkte Fabriküberprüfung',
          badge: '100% AUDITIERT',
        },
        {
          title: 'Phase 02 // Werkzeugbau, Formen & APQP/PPAP Level 3',
          spec: '-75% Kostenreduktion · Direkte OEM-Werkzeuge',
          badge: 'PPAP L3 OK',
        },
        {
          title: 'Phase 03 // Reinraum ISO 14644-1 Kl.5 Validierung (ASML)',
          spec: 'Lithografie-Verpackung · <0.1µm Partikel',
          badge: 'ISO KL.5 ZERT',
        },
        {
          title: 'Phase 04 // Automotive Pilot SOP & 8D Null-Fehler (VDL/BMW)',
          spec: '110-120 Fzg/Schicht · Messtechnik Fugen & Spaltmaße',
          badge: 'NULL FEHLER',
        },
        {
          title: 'Phase 05 // Globale Multimodale SOP & Automatisiertes CMMS Dispatch',
          spec: 'Rotterdam · Shanghai · Born Flottenintegration',
          badge: '100% SOP AKTIV',
        },
      ],
      qualityAudit: 'ISO 9001:2015 · ASML ISO 14644-1 KL.5 · BMW OEM VDA 6.3 AUDITIERT',
      progression: 'PHASENFORTSCHRITT: ECHTZEIT-SPRINT',
    },
    fr: {
      capitalTitle: 'ALLOCATION DE CAPITAL // COURBE D\'INVESTISSEMENT SOURCING ET AUTOMATISATION',
      yearSpend: '$800K USD / AN',
      containersQtr: '20 CONT/TRIMESTRE',
      costReduction: '-75% RÉDUCTION DE COÛTS',
      netSaved: '+$600K ÉCONOMIE NETTE',
      directFactory: 'USINE DIRECTE CHINE/INDE',
      cleanroomPackaging: 'EMBALLAGE SALLE BLANCHE ASML CL.5',
      automotiveTooling: 'OUTILLAGE AUTOMOBILE OEM & QA',
      ganttTitle: 'MATRICE GANTT // CYCLE DE DÉVELOPPEMENT DE PROJET INDUSTRIEL',
      timelineWeek: 'SEMAINE',
      status: 'STATUT',
      onCadence: 'DANS LES DÉLAIS',
      kickoff: 'LANCEMENT',
      fullSop: 'SOP COMPLET',
      q1Audit: 'Q1 // AUDIT INITIAL ($200K)',
      q2Tooling: 'Q2 // OUTILLAGE ET MISE À L\'ÉCHELLE ($400K)',
      q3Cleanroom: 'Q3 // EMBALLAGE SALLE BLANCHE ($600K)',
      q4Peak: 'Q4 // PIC MULTIMODAL ($800K)',
      phases: [
        {
          title: 'Phase 01 // Sourcing & Audit Fournisseurs (Shenzhen/Inde)',
          spec: '20 Cont/Trim · Vérification Directe en Usine',
          badge: '100% AUDITÉ',
        },
        {
          title: 'Phase 02 // Outillage, Moulage & APQP/PPAP Niveau 3',
          spec: '-75% Réduction des Coûts · Moules Directs OEM',
          badge: 'PPAP L3 OK',
        },
        {
          title: 'Phase 03 // Validation Salle Blanche ISO 14644-1 Cl.5 (ASML)',
          spec: 'Emballage Lithographie · <0.1µm Particules',
          badge: 'CERT ISO CL.5',
        },
        {
          title: 'Phase 04 // SOP Pilote Automobile & 8D Zéro Défaut (VDL/BMW)',
          spec: '110-120 Véh/Équipe · Métrologie Affleurement et Jeux',
          badge: 'ZÉRO DÉFAUT',
        },
        {
          title: 'Phase 05 // SOP Multimodal Mondial & Dispatch CMMS Automatisé',
          spec: 'Rotterdam · Shanghai · Born Intégration Flotte',
          badge: '100% SOP EN SERVICE',
        },
      ],
      qualityAudit: 'ISO 9001:2015 · ASML ISO 14644-1 CL.5 · BMW OEM VDA 6.3 AUDITÉ',
      progression: 'PROGRESSION DES ÉTAPES : SPRINT CONTINU EN TEMPS RÉEL',
    },
  };

  const text = tDict[localeKey];

  // 5 Real-world Industrial Development Lifecycle Phases
  const ganttPhases = [
    {
      id: 'p1',
      title: text.phases[0].title,
      startPct: 4,
      widthPct: 22,
      spec: text.phases[0].spec,
      badge: text.phases[0].badge,
      color: 'from-cyan-500 to-emerald-400',
      activeColor: 'shadow-cyan-500/50',
    },
    {
      id: 'p2',
      title: text.phases[1].title,
      startPct: 18,
      widthPct: 28,
      spec: text.phases[1].spec,
      badge: text.phases[1].badge,
      color: 'from-emerald-500 to-teal-400',
      activeColor: 'shadow-emerald-500/50',
    },
    {
      id: 'p3',
      title: text.phases[2].title,
      startPct: 40,
      widthPct: 26,
      spec: text.phases[2].spec,
      badge: text.phases[2].badge,
      color: 'from-cyan-500 to-blue-500',
      activeColor: 'shadow-cyan-500/50',
    },
    {
      id: 'p4',
      title: text.phases[3].title,
      startPct: 58,
      widthPct: 24,
      spec: text.phases[3].spec,
      badge: text.phases[3].badge,
      color: 'from-blue-500 to-indigo-500',
      activeColor: 'shadow-blue-500/50',
    },
    {
      id: 'p5',
      title: text.phases[4].title,
      startPct: 76,
      widthPct: 20,
      spec: text.phases[4].spec,
      badge: text.phases[4].badge,
      color: 'from-emerald-400 to-cyan-400',
      activeColor: 'shadow-emerald-500/50',
    },
  ];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Underlying Blueprint Matrix Grid */}
      {showBlueprintGrid && (
        <svg className="absolute inset-0 w-full h-full opacity-40 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gantt-cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-slate-300 dark:text-cyan-950/60"
              />
              <circle cx="40" cy="40" r="1.0" className="fill-cyan-500/40 dark:fill-cyan-400/40" />
            </pattern>
            <pattern id="gantt-major-grid" width="160" height="160" patternUnits="userSpaceOnUse">
              <rect width="160" height="160" fill="url(#gantt-cyber-grid)" />
              <path
                d="M 160 0 L 0 0 0 160"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-cyan-600/20 dark:text-cyan-500/25"
              />
              <path
                d="M 155 160 L 165 160 M 160 155 L 160 165"
                stroke="currentColor"
                strokeWidth="1.4"
                className="text-cyan-600/40 dark:text-cyan-400/40"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gantt-major-grid)" />
        </svg>
      )}

      {/* 2. Soft Ambient Spotlights (Optimized GPU Radial Gradients) */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,rgba(16,185,129,0.08)_40%,transparent_70%)] transform-gpu" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)] transform-gpu" />
      <div className="absolute bottom-1/10 left-0 w-[600px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_70%)] transform-gpu" />

      {/* Dynamic Cascading Logistics Telemetry Digital Stream (Matrix-inspired Carrier & Port Telemetry) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25 dark:opacity-20 font-mono text-[9px] leading-tight select-none flex justify-around">
        {[
          ['ROTTERDAM GATEWAY // 51.92°N 4.48°E', 'MAERSK LINE // 40HQ FCL', 'CUSTOMS CLEARED: EUR-1', 'BERTH 4 · PORT CRANE STS-02', 'TERMINAL APM ROTTERDAM'],
          ['SHENZHEN SOURCING // 22.54°N', 'DIRECT FACTORY BOM -75%', 'ISO 9001:2015 AUDITED', 'YANTIAN CONTAINER TERMINAL', 'PSI AUDIT: 100% PASS'],
          ['ASML CLEANROOM ISO 14644-1', 'PARTICULATE <0.1µm // PASS', 'HQ PACK EINDHOVEN BRAINPORT', 'HERMETIC N2 PURGE +0.02BAR', 'EUV NXE 3600D OPTIC POD'],
          ['VALENCIA APMT // 39.46°N', 'MEDITERRANEAN LOGISTICS', '48H CUSTOMS RELEASE', 'HAPAG-LLOYD CARRIER ALLIANCE', 'VALENCIAPORT HUB TELEMETRY'],
          ['VDL NEDCAR AUTOMOTIVE OEM', 'CADENCE: 110-120 VEH/SHIFT', 'BMW GROUP · MINI CABRIO', '8D RCA DEFECT RATE: -15%', 'TORQUE & HV INTERLOCK OK'],
          ['CARACAS & LA GUAIRA // 10.48°N', 'LATAM DIRECT SOURCING NODE', 'ZERO DEMURRAGE PROTOCOL', 'CAPITAL ESCROW 4-GATE SHIELD', 'ZAPIER / MAKE IPAAS AUTOMATION'],
        ].map((col, cIdx) => (
          <div
            key={cIdx}
            className="flex flex-col space-y-8 animate-pulse text-cyan-800 dark:text-cyan-400"
            style={{
              animationDuration: `${3.5 + cIdx * 0.8}s`,
              transform: `translateY(${(cIdx * 23) % 70}px)`,
            }}
          >
            {col.map((item, iIdx) => (
              <div key={iIdx} className="tracking-widest flex items-center space-x-1.5 whitespace-nowrap">
                <span className="w-1 h-1 rounded-full bg-cyan-500/60 inline-block" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 3. Main Dashboard Watermark Overlay (Optimized for Readability Behind Cards) */}
      {(showCapitalCurve || showGanttMatrix) && (
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col ${
            showCapitalCurve && showGanttMatrix
              ? 'justify-between pt-16 pb-12'
              : showCapitalCurve
              ? (capitalOffsetClass || 'pt-48 sm:pt-56 lg:pt-60 pb-8')
              : (ganttOffsetClass || 'pt-24 sm:pt-32 pb-12')
          } opacity-85 dark:opacity-80 transition-opacity duration-300`}
        >
          {/* =========================================================================
             TOP WIDGET: $800K CAPITAL SOURCING & INVESTMENT GROWTH CURVE
             ========================================================================= */}
          {showCapitalCurve && (
            <div className="w-full border border-cyan-500/30 dark:border-cyan-500/25 rounded-3xl p-5 sm:p-7 bg-white/28 dark:bg-slate-950/30 backdrop-blur-[2px] shadow-lg space-y-4">
              {/* Header & Metric Readouts */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center space-x-2.5 text-cyan-800 dark:text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                  <span className="font-bold tracking-wider">
                    {text.capitalTitle}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold">
                  <span className="text-emerald-700 dark:text-emerald-400">{text.yearSpend}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-700 dark:text-slate-300">{text.containersQtr}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-cyan-700 dark:text-cyan-400">{text.costReduction}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-amber-700 dark:text-amber-400">{text.netSaved}</span>
                </div>
              </div>

              {/* Animated Investment Growth Chart (SVG Vector Curve) */}
              <div className="relative h-28 sm:h-36 w-full overflow-hidden">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 120">
                  <defs>
                    <linearGradient id="investmentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                      <stop offset="50%" stopColor="#34d399" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="lineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="45%" stopColor="#34d399" />
                      <stop offset="85%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Budget Grid Lines */}
                  <line x1="0" y1="20" x2="1000" y2="20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" className="text-slate-400/25 dark:text-slate-600/30" />
                  <line x1="0" y1="50" x2="1000" y2="50" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" className="text-slate-400/25 dark:text-slate-600/30" />
                  <line x1="0" y1="80" x2="1000" y2="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" className="text-slate-400/25 dark:text-slate-600/30" />
                  <line x1="0" y1="110" x2="1000" y2="110" stroke="currentColor" strokeWidth="1.2" className="text-slate-400/40 dark:text-slate-600/50" />

                  {/* Investment Area Fill */}
                  <path
                    d="M 0 110 L 0 100 Q 250 85, 500 50 T 1000 12 L 1000 110 Z"
                    fill="url(#investmentGradient)"
                  />

                  {/* Glowing Top Trajectory Line */}
                  <path
                    d="M 0 100 Q 250 85, 500 50 T 1000 12"
                    fill="none"
                    stroke="url(#lineStroke)"
                    strokeWidth="2.5"
                  />

                  {/* Milestone Dots */}
                  <circle cx="50" cy="98" r="3.5" className="fill-cyan-400 animate-pulse" />
                  <circle cx="280" cy="80" r="4.0" className="fill-emerald-400 animate-pulse" />
                  <circle cx="520" cy="48" r="4.0" className="fill-cyan-400 animate-pulse" />
                  <circle cx="760" cy="28" r="4.0" className="fill-blue-400 animate-pulse" />
                  <circle cx="960" cy="14" r="5.0" className="fill-emerald-400 animate-ping" />
                </svg>

                {/* Quarter Milestone Labels */}
                <div className="absolute inset-x-0 bottom-0 flex justify-between font-mono text-[9px] text-slate-500 dark:text-slate-400 px-2">
                  <span>{text.q1Audit}</span>
                  <span>{text.q2Tooling}</span>
                  <span>{text.q3Cleanroom}</span>
                  <span>{text.q4Peak}</span>
                </div>
              </div>

              {/* Allocation Distribution Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-400">
                  <span>{text.directFactory}</span>
                  <span className="font-bold">55% ($440K)</span>
                </div>
                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-400">
                  <span>{text.cleanroomPackaging}</span>
                  <span className="font-bold">25% ($200K)</span>
                </div>
                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-blue-950/30 border border-blue-500/20 text-blue-400">
                  <span>{text.automotiveTooling}</span>
                  <span className="font-bold">20% ($160K)</span>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
             BOTTOM WIDGET: INDUSTRIAL PROJECT DEVELOPMENT GANTT MATRIX
             ========================================================================= */}
          {showGanttMatrix && (
            <div className={`w-full border border-emerald-500/30 dark:border-emerald-500/25 rounded-3xl p-5 sm:p-7 bg-white/28 dark:bg-slate-950/30 backdrop-blur-[2px] shadow-lg space-y-4 ${showCapitalCurve ? 'mt-8' : 'mt-4'}`}>
              {/* Gantt Header & Live Timeline Ticker */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center space-x-2.5 text-emerald-800 dark:text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold tracking-wider">
                    {text.ganttTitle}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold">
                    {text.timelineWeek} {currentWeek.toString().padStart(2, '0')} / 32
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {text.status}: <strong className="text-emerald-600 dark:text-emerald-400">{text.onCadence}</strong>
                  </span>
                </div>
              </div>

              {/* Time Axis Axis Header */}
              <div className="relative w-full border-b border-slate-700/40 pb-1.5 flex justify-between font-mono text-[9px] text-slate-500 dark:text-slate-400">
                <span>W01 [{text.kickoff}]</span>
                <span>W08 [Q1 GATE]</span>
                <span>W16 [Q2 PROTO]</span>
                <span>W24 [Q3 PILOT]</span>
                <span>W32 [{text.fullSop}]</span>
              </div>

              {/* 5 Gantt Task Rows */}
              <div className="relative space-y-2.5 pt-1">
                {/* Real-time Vertical Scanning Laser Needle */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-emerald-400 to-transparent shadow-[0_0_12px_rgba(56,189,248,0.9)] z-20 transition-all duration-75"
                  style={{ left: `${timelineProgress * 100}%` }}
                >
                  <div className="w-2.5 h-2.5 -ml-[4px] rounded-full bg-cyan-300 shadow-md animate-ping" />
                </div>

                {ganttPhases.map((phase) => {
                  const isPassed = (timelineProgress * 100) >= (phase.startPct + phase.widthPct * 0.4);
                  const isActive = (timelineProgress * 100) >= phase.startPct && (timelineProgress * 100) <= (phase.startPct + phase.widthPct);

                  return (
                    <div key={phase.id} className="relative h-10 w-full flex items-center bg-slate-950/20 rounded-lg overflow-hidden border border-slate-800/40">
                      {/* Background Track */}
                      <div className="absolute inset-0 flex items-center px-3 justify-between text-[10px] font-mono text-slate-400/80 z-0">
                        <span className="truncate max-w-[60%]">{phase.title}</span>
                        <span className="hidden sm:inline text-[9px] text-slate-500">{phase.spec}</span>
                      </div>

                      {/* Dynamic Progress Bar */}
                      <div
                        className={`absolute top-1 bottom-1 rounded-md bg-gradient-to-r ${phase.color} opacity-45 dark:opacity-40 transition-all duration-200 ${
                          isActive ? 'ring-1 ring-white/60 shadow-lg' : ''
                        }`}
                        style={{
                          left: `${phase.startPct}%`,
                          width: `${phase.widthPct}%`,
                        }}
                      />

                      {/* Status Badge */}
                      <div
                        className="absolute z-10 text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow-sm backdrop-blur-sm border transition-all"
                        style={{
                          left: `${phase.startPct + phase.widthPct - 4}%`,
                        }}
                      >
                        <span
                          className={`${
                            isPassed
                              ? 'text-emerald-300 bg-emerald-950/80 border-emerald-500/40'
                              : 'text-slate-400 bg-slate-900/80 border-slate-700/40'
                          }`}
                        >
                          {phase.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Quality Verification Notes */}
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800/40 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                <span>{text.qualityAudit}</span>
                <span className="text-cyan-400">{text.progression}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
