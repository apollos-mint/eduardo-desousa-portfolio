'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import {
  Globe2,
  Package,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
  Zap,
  BarChart3,
  Container,
  Truck,
  FileCheck2,
  DollarSign,
  Wrench,
  Sparkles,
  ArrowRight,
  Clock,
  Database,
  Sliders,
} from 'lucide-react';

interface SourcingCommandCenterWidgetProps {
  currentLocale: Locale;
}

export default function SourcingCommandCenterWidget({
  currentLocale,
}: SourcingCommandCenterWidgetProps) {
  const [activeTab, setActiveTab] = useState<'sourcing' | 'cmms'>('sourcing');
  const [selectedContainer, setSelectedContainer] = useState<'40hq' | '20std'>('40hq');
  const [selectedHub, setSelectedHub] = useState<number>(0);
  const [activeGate, setActiveGate] = useState<number>(0);

  // Multilingual Strings
  const translations = {
    es: {
      tabSourcing: 'Simulador Sourcing & Contenedores',
      tabCmms: 'Dashboard CMMS & Scoring KPIs',
      headerTitle: 'CENTRO DE CONTROL // SOURCING ASIA-LATAM & LOGÍSTICA MARÍTIMA',
      headerTelemetry: 'VOLUMEN: $800,000 USD/AÑO · 20 CONT/TRIMESTRE',
      containerSelectorTitle: 'Especificación de Contenedor FCL:',
      container40: "40' High Cube (FCL)",
      container20: "20' Standard (FCL)",
      volumeLabel: 'Volumen Útil',
      maxPayloadLabel: 'Carga Máxima',
      turnaroundLabel: 'Frecuencia de Despacho',
      savingsLabel: 'Ahorro Neto vs Mayorista',
      corridorsTitle: 'Corredores Industriales & Auditorías Homologadas:',
      riskProtocolTitle: 'Protocolo de Blindaje de Capital & Mitigación de Riesgo (4 Compuertas):',
      cmmsHeaderTitle: 'SISTEMA PROPIETARIO CMMS // TELEMETRÍA DE ACTIVOS & KPIs',
      cmmsSubtitle: 'Gestión predictiva del ciclo de vida de maquinaria y scoring analítico de productividad',
      fleetStatus: 'Estado de Flota de Maquinaria',
      availability: 'Disponibilidad',
      oeeScore: 'OEE General',
      preventiveRate: 'Mantenimiento Preventivo',
      kpiSectionTitle: 'Matriz de Evaluación de Operarios (KPI Scoring):',
      automationTitle: 'Canales de Automatización iPaaS en Tiempo Real:',
      syncActive: 'SINCRONIZACIÓN ACTIVA',
      webhookStatus: 'Make / Zapier / Asana Webhook: 200 OK · Tiempo Real',
      hubs: [
        {
          name: 'China // Foshan & Shenzhen',
          specialty: 'Materiales Arquitectónicos, Fachadas & Perfiles',
          auditScore: '99/100',
          saving: '-75% vs Mayoristas',
          details: 'Auditoría directa en planta, validación de moldes, pruebas de estrés y verificación de acabado superficial.',
        },
        {
          name: 'India // Morbi, Gujarat',
          specialty: 'Gres Porcelánico & Refractarios Técnicos',
          auditScore: '96/100',
          saving: '15-30% Mejora Margen',
          details: 'Benchmarking de plantas industriales, inspección in situ de calibres y absorción hídrica según ISO 10545.',
        },
        {
          name: 'Hub Europa / LatAm',
          specialty: 'Recepción Aduanera, Consolidación & Despacho',
          auditScore: '100/100',
          saving: 'Cero Disputas',
          details: 'Inspección de doble entrada, concordancia documental BL/Factura y entrega sincronizada en obra.',
        },
      ],
      gates: [
        {
          id: '01',
          title: '30% Anticipo Proforma',
          desc: 'Bloqueo de precio de materia prima y orden de fabricación directa en planta sin intermediarios.',
        },
        {
          id: '02',
          title: 'Auditoría In-Line',
          desc: 'Verificación de tolerancias dimensionales, calibres y especificaciones técnicas antes de ensamble.',
        },
        {
          id: '03',
          title: 'Inspección PSI In Situ',
          desc: 'Muestreo AQL 1.0/2.5 pre-embarque con equipo técnico presencial. Aprobación fotográfica y test de caída.',
        },
        {
          id: '04',
          title: '70% Balance & BL',
          desc: 'Liberación de fondos únicamente tras conformidad total, precinto de contenedor y entrega de Bill of Lading.',
        },
      ],
      employees: [
        { name: 'Operario Técnico 01', score: 98, metric: 'Cumplimiento SOP: 100% · Deriva Cero' },
        { name: 'Operario Técnico 02', score: 95, metric: 'Mantenimiento Autónomo: Al Día' },
        { name: 'Operario Técnico 03', score: 93, metric: 'Tiempo de Intervención: -22% Promedio' },
      ],
    },
    en: {
      tabSourcing: 'Sourcing & Container Simulator',
      tabCmms: 'CMMS & KPI Scoring Dashboard',
      headerTitle: 'COMMAND CENTER // ASIA-LATAM SOURCING & MARITIME LOGISTICS',
      headerTelemetry: 'VOLUME: $800,000 USD/YR · 20 CONT/QUARTER',
      containerSelectorTitle: 'FCL Container Specification:',
      container40: "40' High Cube (FCL)",
      container20: "20' Standard (FCL)",
      volumeLabel: 'Usable Volume',
      maxPayloadLabel: 'Max Payload',
      turnaroundLabel: 'Dispatch Frequency',
      savingsLabel: 'Net Savings vs Wholesale',
      corridorsTitle: 'Industrial Corridors & Audited Manufacturing Plants:',
      riskProtocolTitle: 'Capital Escrow & Risk Mitigation Protocol (4 Gates):',
      cmmsHeaderTitle: 'PROPRIETARY CMMS SYSTEM // ASSET TELEMETRY & KPIs',
      cmmsSubtitle: 'Predictive machinery lifecycle management and analytical employee productivity scoring',
      fleetStatus: 'Machinery Fleet Status',
      availability: 'Availability',
      oeeScore: 'Overall OEE',
      preventiveRate: 'Preventive Compliance',
      kpiSectionTitle: 'Operator Performance Matrix (KPI Scoring):',
      automationTitle: 'Real-Time iPaaS Automation Pipelines:',
      syncActive: 'ACTIVE PIPELINE SYNC',
      webhookStatus: 'Make / Zapier / Asana Webhook: 200 OK · Real Time',
      hubs: [
        {
          name: 'China // Foshan & Shenzhen',
          specialty: 'Architectural Hardware, Facades & Profiles',
          auditScore: '99/100',
          saving: '-75% vs Local Wholesale',
          details: 'Direct factory audit, mold calibration checks, load stress testing, and surface finish verification.',
        },
        {
          name: 'India // Morbi, Gujarat',
          specialty: 'Porcelain Stoneware & Technical Refractories',
          auditScore: '96/100',
          saving: '15-30% Margin Boost',
          details: 'Industrial benchmarking, on-site tile water-absorption testing, and dimensional compliance to ISO 10545.',
        },
        {
          name: 'Hub Europe / LatAm',
          specialty: 'Customs Clearance, Consolidation & Site Delivery',
          auditScore: '100/100',
          saving: 'Zero Commercial Disputes',
          details: 'Double-entry warehouse QA, Bill of Lading matching, and synchronized job site fulfillment.',
        },
      ],
      gates: [
        {
          id: '01',
          title: '30% Proforma Advance',
          desc: 'Raw material cost lock and direct production queue placement with zero intermediary markups.',
        },
        {
          id: '02',
          title: 'In-Line Factory Audit',
          desc: 'Dimensional tolerance checks, mold validation, and technical compliance during active fabrication.',
        },
        {
          id: '03',
          title: 'On-Site PSI Inspection',
          desc: 'Pre-Shipment Inspection (AQL 1.0/2.5) with on-ground inspectors, drop tests, and photographic log.',
        },
        {
          id: '04',
          title: '70% Balance & BL Release',
          desc: 'Payment settlement strictly conditional upon container seal verification and original Bill of Lading release.',
        },
      ],
      employees: [
        { name: 'Lead Operator 01', score: 98, metric: 'SOP Compliance: 100% · Zero Deviation' },
        { name: 'Lead Operator 02', score: 95, metric: 'Autonomous Maintenance: Fully Current' },
        { name: 'Lead Operator 03', score: 93, metric: 'Response Cycle Time: -22% Avg' },
      ],
    },
    pt: {
      tabSourcing: 'Simulador Sourcing & Contentores',
      tabCmms: 'Dashboard CMMS & Scoring KPIs',
      headerTitle: 'CENTRO DE CONTROLO // SOURCING ÁSIA-LATAM & LOGÍSTICA MARÍTIMA',
      headerTelemetry: 'VOLUME: $800,000 USD/ANO · 20 CONT/TRIMESTRE',
      containerSelectorTitle: 'Especificação do Contentor FCL:',
      container40: "40' High Cube (FCL)",
      container20: "20' Standard (FCL)",
      volumeLabel: 'Volume Útil',
      maxPayloadLabel: 'Carga Máxima',
      turnaroundLabel: 'Frequência de Despacho',
      savingsLabel: 'Poupança vs Distribuição',
      corridorsTitle: 'Corredores Industriais & Auditorias Homologadas:',
      riskProtocolTitle: 'Protocolo de Blindagem de Capital & Mitigação de Risco (4 Portas):',
      cmmsHeaderTitle: 'SISTEMA PROPRIETÁRIO CMMS // TELEMETRIA DE ATIVOS & KPIs',
      cmmsSubtitle: 'Gestão preditiva do ciclo de vida de maquinaria e scoring analítico de produtividade',
      fleetStatus: 'Estado da Frota de Maquinaria',
      availability: 'Disponibilidade',
      oeeScore: 'OEE Geral',
      preventiveRate: 'Manutenção Preventiva',
      kpiSectionTitle: 'Matriz de Avaliação de Operadores (KPI Scoring):',
      automationTitle: 'Canais de Automação iPaaS em Tempo Real:',
      syncActive: 'SINCRONIZAÇÃO ATIVA',
      webhookStatus: 'Make / Zapier / Asana Webhook: 200 OK · Tempo Real',
      hubs: [
        {
          name: 'China // Foshan & Shenzhen',
          specialty: 'Materiais Arquitetónicos, Fachadas & Perfis',
          auditScore: '99/100',
          saving: '-75% vs Grossistas',
          details: 'Auditoria direta em fábrica, validação de moldes, testes de esforço e verificação de acabamentos.',
        },
        {
          name: 'Índia // Morbi, Gujarat',
          specialty: 'Grés Porcelânico & Refratários Técnicos',
          auditScore: '96/100',
          saving: '15-30% Margem',
          details: 'Benchmarking de plantas industriais, inspeção in situ de calibres e absorção hídrica ISO 10545.',
        },
        {
          name: 'Hub Europa / LatAm',
          specialty: 'Desembaraço Aduaneiro & Entrega em Obra',
          auditScore: '100/100',
          saving: 'Zero Disputas',
          details: 'Inspeção de dupla entrada, conciliação documental BL e entrega sincronizada.',
        },
      ],
      gates: [
        { id: '01', title: '30% Adiantamento Proforma', desc: 'Bloqueio de preço de matéria-prima e ordem de fabrico direto.' },
        { id: '02', title: 'Auditoria In-Line', desc: 'Verificação de tolerâncias e especificações técnicas durante produção.' },
        { id: '03', title: 'Inspeção PSI In Situ', desc: 'Amostragem AQL 1.0/2.5 pré-embarque com equipa técnica presencial.' },
        { id: '04', title: '70% Liquidação & BL', desc: 'Libertação de fundos após selagem do contentor e Bill of Lading.' },
      ],
      employees: [
        { name: 'Operador Técnico 01', score: 98, metric: 'Conformidade SOP: 100%' },
        { name: 'Operador Técnico 02', score: 95, metric: 'Manutenção Autónoma: Em Dia' },
        { name: 'Operador Técnico 03', score: 93, metric: 'Tempo de Resposta: -22%' },
      ],
    },
    nl: {
      tabSourcing: 'Sourcing & Container Simulator',
      tabCmms: 'CMMS & KPI Scoring Dashboard',
      headerTitle: 'COMMAND CENTER // AZIË-LATAM SOURCING & ZEEVRACHTLOGISTIEK',
      headerTelemetry: 'VOLUME: $800,000 USD/JAAR · 20 CONT/KWARTAAL',
      containerSelectorTitle: 'FCL Container Specificatie:',
      container40: "40' High Cube (FCL)",
      container20: "20' Standard (FCL)",
      volumeLabel: 'Bruikbaar Volume',
      maxPayloadLabel: 'Max Laadvermogen',
      turnaroundLabel: 'Verzendfrequentie',
      savingsLabel: 'Kostenbesparing vs Groothandel',
      corridorsTitle: 'Industriële Corridors & Geauditeerde Fabrieken:',
      riskProtocolTitle: 'Kapitaalbescherming & Risicomitigatieprotocol (4 Poorten):',
      cmmsHeaderTitle: 'EIGEN CMMS SYSTEEM // MACHINE TELEMETRIE & KPIs',
      cmmsSubtitle: 'Voorspellend levenscyclusbeheer van apparatuur en productiviteitsscores van personeel',
      fleetStatus: 'Status Machinepark',
      availability: 'Beschikbaarheid',
      oeeScore: 'Totale OEE',
      preventiveRate: 'Preventief Onderhoud',
      kpiSectionTitle: 'Medewerker Prestatie Matrix (KPI Scoring):',
      automationTitle: 'Real-Time iPaaS Automatisering Pipelines:',
      syncActive: 'ACTIEVE SYNC',
      webhookStatus: 'Make / Zapier / Asana Webhook: 200 OK · Real-Time',
      hubs: [
        { name: 'China // Foshan & Shenzhen', specialty: 'Bouwmaterialen, Gevels & Profielen', auditScore: '99/100', saving: '-75% Kosten', details: 'Directe fabrieksaudits, tolerantiecontroles en oppervlaktekwaliteit.' },
        { name: 'India // Morbi, Gujarat', specialty: 'Porselein & Technische Keramiek', auditScore: '96/100', saving: '15-30% Marge', details: 'Benchmarking van fabrieken en ISO 10545 conformiteitsaudits ter plaatse.' },
        { name: 'Hub Europa / LatAm', specialty: 'Douaneafhandeling & Projectlevering', auditScore: '100/100', saving: 'Nul Geschillen', details: 'Dubbele magazijncontrole en Bill of Lading reconciliatie.' },
      ],
      gates: [
        { id: '01', title: '30% Proforma Voorschot', desc: 'Materiaalprijzen vastgelegd en directe fabrieksopdracht.' },
        { id: '02', title: 'In-Line Productie Audit', desc: 'Dimensionele toleranties en kwaliteitscontroles tijdens productie.' },
        { id: '03', title: 'PSI Inspectie Ter Plaatse', desc: 'Pre-Shipment Inspection (AQL 1.0/2.5) met onafhankelijke controleurs.' },
        { id: '04', title: '70% Saldo & BL Vrijgave', desc: 'Betaling uitsluitend na containerverzegeling en originele Bill of Lading.' },
      ],
      employees: [
        { name: 'Technisch Medewerker 01', score: 98, metric: 'SOP Naleving: 100%' },
        { name: 'Technisch Medewerker 02', score: 95, metric: 'Onderhoud: Volledig Actueel' },
        { name: 'Technisch Medewerker 03', score: 93, metric: 'Interventietijd: -22%' },
      ],
    },
    de: {
      tabSourcing: 'Sourcing & Container Simulator',
      tabCmms: 'CMMS & KPI Scoring Dashboard',
      headerTitle: 'COMMAND CENTER // ASIEN-LATAM SOURCING & SEEFRACHTLOGISTIK',
      headerTelemetry: 'VOLUMEN: $800,000 USD/JAHR · 20 CONT/QUARTAL',
      containerSelectorTitle: 'FCL Container Spezifikation:',
      container40: "40' High Cube (FCL)",
      container20: "20' Standard (FCL)",
      volumeLabel: 'Nutzbares Volumen',
      maxPayloadLabel: 'Maximale Zuladung',
      turnaroundLabel: 'Versandfrequenz',
      savingsLabel: 'Ersparnis vs Großhandel',
      corridorsTitle: 'Industrielle Korridore & Auditierte Fabriken:',
      riskProtocolTitle: 'Kapitalschutz & Risikominderungs-Protokoll (4 Stufen):',
      cmmsHeaderTitle: 'PROPRIETÄRES CMMS // ANLAGEN-TELEMETRIE & KPIs',
      cmmsSubtitle: 'Vorausschauendes Anlagen-Lebenszyklusmanagement und Mitarbeiter-Produktivitätsscoring',
      fleetStatus: 'Status Maschinenpark',
      availability: 'Verfügbarkeit',
      oeeScore: 'Gesamt-OEE',
      preventiveRate: 'Präventive Wartung',
      kpiSectionTitle: 'Mitarbeiter-Leistungsmatrix (KPI Scoring):',
      automationTitle: 'Echtzeit iPaaS Automatisierungs-Pipelines:',
      syncActive: 'AKTIVE SYNCHRONISATION',
      webhookStatus: 'Make / Zapier / Asana Webhook: 200 OK · Echtzeit',
      hubs: [
        { name: 'China // Foshan & Shenzhen', specialty: 'Baumaterialien & Fassadenprofile', auditScore: '99/100', saving: '-75% Kosten', details: 'Direkte Werksaudits, Formkalibrierung und Stresstests vor Ort.' },
        { name: 'Indien // Morbi, Gujarat', specialty: 'Feinsteinzeug & Technische Keramik', auditScore: '96/100', saving: '15-30% Marge', details: 'Benchmarking und ISO 10545 Konformitätsprüfung vor Ort.' },
        { name: 'Hub Europa / LatAm', specialty: 'Zollabfertigung & Baustellenlieferung', auditScore: '100/100', saving: 'Null Streitigkeiten', details: 'Doppelte Eingangsprüfung und Bill of Lading Abgleich.' },
      ],
      gates: [
        { id: '01', title: '30% Proforma Anzahlung', desc: 'Rohstoffpreisfixierung und direkter Produktionsstart im Werk.' },
        { id: '02', title: 'In-Line Werksaudit', desc: 'Dimensionale Toleranzprüfung während der laufenden Fertigung.' },
        { id: '03', title: 'PSI Vor-Ort-Inspektion', desc: 'Pre-Shipment Inspection (AQL 1.0/2.5) durch Prüfer vor Ort.' },
        { id: '04', title: '70% Restzahlung & BL', desc: 'Zahlungsfreigabe erst nach Containerversiegelung und Bill of Lading.' },
      ],
      employees: [
        { name: 'Technischer Bediener 01', score: 98, metric: 'SOP-Einhaltung: 100%' },
        { name: 'Technischer Bediener 02', score: 95, metric: 'Präventive Wartung: Aktuell' },
        { name: 'Technischer Bediener 03', score: 93, metric: 'Reaktionszeit: -22%' },
      ],
    },
    fr: {
      tabSourcing: 'Simulateur Sourcing & Conteneurs',
      tabCmms: 'Dashboard CMMS & Scoring KPIs',
      headerTitle: 'COMMAND CENTER // SOURCING ASIE-LATAM & LOGISTIQUE MARITIME',
      headerTelemetry: 'VOLUME: $800,000 USD/AN · 20 CONT/TRIMESTRE',
      containerSelectorTitle: 'Spécification du Conteneur FCL:',
      container40: "40' High Cube (FCL)",
      container20: "20' Standard (FCL)",
      volumeLabel: 'Volume Utile',
      maxPayloadLabel: 'Charge Utile Max',
      turnaroundLabel: 'Fréquence d’Expédition',
      savingsLabel: 'Économie vs Grossiste',
      corridorsTitle: 'Corridors Industriels & Usines Auditées:',
      riskProtocolTitle: 'Protocole de Sécurisation du Capital (4 Portes):',
      cmmsHeaderTitle: 'SYSTÈME PROPRIÉTAIRE CMMS // TÉLÉMÉTRIE & KPIs',
      cmmsSubtitle: 'Gestion prédictive du cycle de vie des machines et scoring de productivité du personnel',
      fleetStatus: 'État du Parc Machines',
      availability: 'Disponibilité',
      oeeScore: 'OEE Global',
      preventiveRate: 'Maintenance Préventive',
      kpiSectionTitle: 'Matrice de Performance Opérateurs (KPI Scoring):',
      automationTitle: 'Pipelines d’Automatisation iPaaS en Temps Réel:',
      syncActive: 'SYNCHRONISATION ACTIVE',
      webhookStatus: 'Make / Zapier / Asana Webhook: 200 OK · Temps Réel',
      hubs: [
        { name: 'Chine // Foshan & Shenzhen', specialty: 'Matériaux Architecturaux & Profilés', auditScore: '99/100', saving: '-75% vs Grossistes', details: 'Audit d’usine, contrôle dimensionnel des moules et tests de résistance.' },
        { name: 'Inde // Morbi, Gujarat', specialty: 'Grès Cérame & Réfractaires Techniques', auditScore: '96/100', saving: '15-30% Marge', details: 'Benchmarking d’usines et tests de conformité ISO 10545 sur place.' },
        { name: 'Hub Europe / LatAm', specialty: 'Dédouanement & Livraison sur Chantier', auditScore: '100/100', saving: 'Zéro Litige', details: 'Contrôle à double entrée et réconciliation documentaire Bill of Lading.' },
      ],
      gates: [
        { id: '01', title: '30% Acompte Proforma', desc: 'Verrouillage du prix des matières premières et lancement usine.' },
        { id: '02', title: 'Audit In-Line', desc: 'Contrôle des tolérances dimensionnelles pendant la fabrication.' },
        { id: '03', title: 'Inspection PSI sur Site', desc: 'Contrôle avant expédition (AQL 1.0/2.5) avec auditeurs sur place.' },
        { id: '04', title: '70% Solde & BL', desc: 'Paiement débloqué uniquement après scellé et remise du Bill of Lading.' },
      ],
      employees: [
        { name: 'Opérateur Technique 01', score: 98, metric: 'Conformité SOP: 100%' },
        { name: 'Opérateur Technique 02', score: 95, metric: 'Maintenance Autonome: À jour' },
        { name: 'Opérateur Technique 03', score: 93, metric: 'Temps d’Intervention: -22%' },
      ],
    },
  };

  const t = translations[currentLocale] || translations.es;

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border-2 border-cyan-500/40 dark:border-cyan-500/40 light:border-cyan-400 p-4 sm:p-6 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Top Telemetry Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-extrabold text-cyan-400 dark:text-cyan-300 light:text-cyan-700 tracking-wider">
            {t.headerTitle}
          </span>
        </div>
        <div className="inline-flex items-center space-x-2 font-mono text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full">
          <DollarSign className="w-3.5 h-3.5" />
          <span>{t.headerTelemetry}</span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <button
          onClick={() => setActiveTab('sourcing')}
          className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${
            activeTab === 'sourcing'
              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Container className="w-4 h-4" />
          <span className="truncate">{t.tabSourcing}</span>
        </button>

        <button
          onClick={() => setActiveTab('cmms')}
          className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${
            activeTab === 'cmms'
              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span className="truncate">{t.tabCmms}</span>
        </button>
      </div>

      {/* =========================================================================
         TAB 1: SOURCING & CONTAINER LOGISTICS SIMULATOR
         ========================================================================= */}
      {activeTab === 'sourcing' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Container Type Selector & Real-Time Logistics Math */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center space-x-2">
              <Package className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.containerSelectorTitle}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedContainer('40hq')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedContainer === '40hq'
                    ? 'bg-cyan-950/70 border-cyan-400 shadow-md shadow-cyan-500/15'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold font-mono text-cyan-300">{t.container40}</div>
                <div className="text-[11px] text-slate-300 font-mono mt-1">
                  68.0 m³ · 26,000 kg Payload
                </div>
              </button>

              <button
                onClick={() => setSelectedContainer('20std')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedContainer === '20std'
                    ? 'bg-cyan-950/70 border-cyan-400 shadow-md shadow-cyan-500/15'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold font-mono text-cyan-300">{t.container20}</div>
                <div className="text-[11px] text-slate-300 font-mono mt-1">
                  33.2 m³ · 21,500 kg Payload
                </div>
              </button>
            </div>

            {/* Container Telemetry Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
                <div className="text-[10px] text-slate-400">{t.volumeLabel}</div>
                <div className="text-sm sm:text-base font-extrabold text-cyan-400">
                  {selectedContainer === '40hq' ? '68.0 CBM' : '33.2 CBM'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
                <div className="text-[10px] text-slate-400">{t.maxPayloadLabel}</div>
                <div className="text-sm sm:text-base font-extrabold text-cyan-400">
                  {selectedContainer === '40hq' ? '26,000 kg' : '21,500 kg'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
                <div className="text-[10px] text-slate-400">{t.turnaroundLabel}</div>
                <div className="text-sm sm:text-base font-extrabold text-emerald-400">
                  1.67 Cont / Sem
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
                <div className="text-[10px] text-slate-400">{t.savingsLabel}</div>
                <div className="text-sm sm:text-base font-extrabold text-emerald-400">
                  -75% Neto
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Industrial Sourcing Corridors */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center space-x-2">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.corridorsTitle}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {t.hubs.map((hub, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHub(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedHub === idx
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-mono">{hub.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                      {hub.auditScore}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-300 font-medium mt-1">{hub.specialty}</div>
                  <div className="text-[10px] font-mono text-emerald-400 font-bold mt-1">
                    {hub.saving}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Hub Details */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t.hubs[selectedHub].details}</span>
            </div>
          </div>

          {/* 4-Gate Capital Escrow & Risk Mitigation Protocol */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.riskProtocolTitle}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {t.gates.map((gate, gIdx) => (
                <button
                  key={gate.id}
                  onClick={() => setActiveGate(gIdx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeGate === gIdx
                      ? 'bg-emerald-950/70 border-emerald-400 ring-1 ring-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[10px] text-slate-400">GATE {gate.id}</span>
                    <span className="text-[10px] font-bold text-emerald-400">✓ VERIFICADO</span>
                  </div>
                  <div className="text-xs font-bold text-white mt-1 leading-snug">{gate.title}</div>
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-slate-200 font-mono flex items-center space-x-2">
              <span className="font-bold text-emerald-400 shrink-0">
                GATE {t.gates[activeGate].id} //
              </span>
              <span>{t.gates[activeGate].desc}</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         TAB 2: ENTERPRISE CMMS & KPI SCORING DASHBOARD MOCKUP
         ========================================================================= */}
      {activeTab === 'cmms' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white font-mono flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>{t.cmmsHeaderTitle}</span>
            </h4>
            <p className="text-xs text-slate-300">{t.cmmsSubtitle}</p>
          </div>

          {/* Machine Health & OEE Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <div className="text-[10px] text-slate-400">{t.fleetStatus}</div>
              <div className="text-base font-extrabold text-white">24 Equipos Activos</div>
              <div className="text-[10px] text-emerald-400 font-bold mt-0.5">100% Monitoreados</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <div className="text-[10px] text-slate-400">{t.availability}</div>
              <div className="text-base font-extrabold text-cyan-400">98.4%</div>
              <div className="text-[10px] text-cyan-300 mt-0.5">MTTR: 1.2 hrs</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <div className="text-[10px] text-slate-400">{t.oeeScore}</div>
              <div className="text-base font-extrabold text-emerald-400">94.8%</div>
              <div className="text-[10px] text-emerald-300 mt-0.5">World-Class OEE</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <div className="text-[10px] text-slate-400">{t.preventiveRate}</div>
              <div className="text-base font-extrabold text-indigo-400">100%</div>
              <div className="text-[10px] text-indigo-300 mt-0.5">Cero Vencidos</div>
            </div>
          </div>

          {/* Employee KPI Scoring Matrix */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center space-x-2">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.kpiSectionTitle}</span>
            </div>

            <div className="space-y-2">
              {t.employees.map((emp, eIdx) => (
                <div
                  key={eIdx}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-bold text-white">{emp.name}</span>
                    <span className="text-slate-400 text-[11px]">{emp.metric}</span>
                  </div>
                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    <span className="text-[11px] text-slate-400">Score:</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold">
                      {emp.score}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time iPaaS Automation Webhooks Strip */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>{t.automationTitle}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                {t.syncActive}
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-300">
              {t.webhookStatus}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
