'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Globe2,
  Package,
  Wrench,
  BarChart3,
  Search,
  Car,
} from 'lucide-react';

interface ExperienceInteractiveWidgetProps {
  experienceId: string;
  company: string;
  currentLocale: Locale;
}

export default function ExperienceInteractiveWidget({
  experienceId,
  company,
  currentLocale,
}: ExperienceInteractiveWidgetProps) {
  // Multilingual UI strings for widgets
  const labels = {
    es: {
      cleanroomHeader: 'ECOSISTEMA DE SALAS LIMPIAS ASML // CLASE ISO 5',
      erpSync: 'ISAH ERP: 150+ MENSUALES',
      cycleTimeRed: 'TIEMPO DE CICLO: -30%',
      inspectPartner: 'Haz clic en cualquier líder de la industria para inspeccionar especificaciones:',
      activeStandard: 'Estándar Activo:',
      cleanroomVerified: 'Certificado TÜV & Desgasificación Cero Verificada',
      automotiveHeader: 'ECOSISTEMA AUTOMOTRIZ OEM // BMW GROUP, MINI COOPER, BOSCH & ZF',
      throughput: 'CADENCIA: 110-120 VEHÍCULOS / TURNO',
      gate1: 'Alineación de Chasis & Bastidor',
      gate2: 'Batería Alto Voltaje & Propulsión EV',
      gate3: 'Torque Dinámico & Sensores Bosch',
      gate4: 'Control Final de Calidad BMW/MINI',
      rcaProtocol: 'Protocolo 8D / RCA: -15% Defectos Repetidos',
      multiPlatform: 'Multiplataforma BMW X1, MINI Cooper, EV e Híbridos',
      sourcingHeader: 'CORREDOR INTERNACIONAL DE AUDITORÍA DE FÁBRICAS',
      riskMitigation: '100% MITIGACIÓN DE RIESGO',
      stockAccuracy: '99.5% PRECISIÓN DE STOCK',
      auditScore: 'Puntuación de Auditoría',
      validatedTier1: 'Ecosistema de Suministro Automotriz Nivel-1 Validado:',
      hqPackPartners: [
        { id: 'ASML', name: 'ASML', tag: 'Litografía EUV/DUV' },
        { id: 'ZEISS', name: 'Zeiss', tag: 'Óptica High-NA' },
        { id: 'BOEING', name: 'Boeing', tag: 'Embalaje Aeroespacial' },
        { id: 'AIRBUS', name: 'Airbus', tag: 'Especificaciones de Defensa' },
        { id: 'SAMSUNG', name: 'Samsung', tag: 'Módulos de Fundición' },
        { id: 'NEWAYS', name: 'Neways', tag: 'Electrónica de Sala Limpia' },
        { id: 'FRENCKEN', name: 'Frencken', tag: 'Mecánica de Precisión' },
        { id: 'VDL', name: 'VDL', tag: 'Sistemas Mecatrónicos' },
      ],
      autoPartners: [
        { id: 'BMW', name: 'BMW', tag: 'BMW X1 & Multiplataforma' },
        { id: 'MINI', name: 'MINI', tag: 'Cooper, Cabrio & Countryman' },
        { id: 'BOSCH', name: 'BOSCH', tag: 'Sensores & Frenos ECUs' },
        { id: 'ZF', name: 'ZF', tag: 'Transmisiones & Dirección' },
        { id: 'BROSE', name: 'BROSE', tag: 'Módulos Mecatrónicos' },
        { id: 'VDL', name: 'VDL', tag: 'Fabricación OEM' },
      ],
      stations: [
        { id: 1, status: 'PASS 100%', spec: '±0.05 mm' },
        { id: 2, status: 'ISO 6469', spec: '100% Interlock' },
        { id: 3, status: '8D / RCA', spec: '120 Nm Dinámico' },
        { id: 4, status: '110-120/turno', spec: 'Cero Defectos OEM' },
      ],
      hubs: [
        { country: 'China (Shenzhen/Shanghai)', role: 'Auditorías de Capacidad de Producción y Maquinaria', score: '98/100' },
        { country: 'India (Pune/Bengaluru)', role: 'Inspecciones de Ingeniería y Metrología in situ', score: '95/100' },
        { country: 'Países Bajos (Eindhoven)', role: 'Revisión de Suministro de Alta Tecnología y Salas Limpias', score: '99/100' },
        { country: 'España (Valencia)', role: 'Logística de Importación y Protección de Capital', score: '100/100' },
      ],
      arkcohogarStats: [
        { title: 'FLUJO DE ENTRADA', desc: 'Auditoría de doble entrada' },
        { title: 'AUDITORÍA CÍCLICA', desc: 'Protocolo de deriva cero' },
        { title: 'DESPACHO', desc: 'Rutas optimizadas' },
      ]
    },
    en: {
      cleanroomHeader: 'ASML CLEANROOM ECOSYSTEM // ISO CLASS 5',
      erpSync: 'ISAH ERP: 150+ MONTHLY',
      cycleTimeRed: 'CYCLE TIME: -30%',
      inspectPartner: 'Click any industry leader node to inspect cleanroom interface specifications:',
      activeStandard: 'Active Standard:',
      cleanroomVerified: 'TÜV Certified & Zero Outgassing Verified',
      automotiveHeader: 'OEM AUTOMOTIVE ECOSYSTEM // BMW GROUP, MINI COOPER, BOSCH & ZF',
      throughput: 'THROUGHPUT: 110-120 VEHICLES / SHIFT',
      gate1: 'Chassis & Subframe Laser Alignment',
      gate2: 'High-Voltage EV Battery & Inverter',
      gate3: 'Dynamic Torque & Bosch Subsystems',
      gate4: 'Final OEM Quality Gate BMW/MINI',
      rcaProtocol: '8D / RCA Protocol: -15% Repeat Defect Reduction',
      multiPlatform: 'Multi-platform BMW X1, MINI Cooper, EV & Hybrid',
      sourcingHeader: 'INTERNATIONAL FACTORY AUDIT & SOURCING CORRIDOR',
      riskMitigation: '100% RISK MITIGATION',
      stockAccuracy: '99.5% STOCK ACCURACY',
      auditScore: 'Audit Score',
      validatedTier1: '{t.validatedTier1}',
      hqPackPartners: [
        { id: 'ASML', name: 'ASML', tag: 'Lithography EUV/DUV' },
        { id: 'ZEISS', name: 'Zeiss', tag: 'High-NA Optics' },
        { id: 'BOEING', name: 'Boeing', tag: 'Aerospace Packaging' },
        { id: 'AIRBUS', name: 'Airbus', tag: 'Defense Specifications' },
        { id: 'SAMSUNG', name: 'Samsung', tag: 'Foundry Modules' },
        { id: 'NEWAYS', name: 'Neways', tag: 'Cleanroom Electronics' },
        { id: 'FRENCKEN', name: 'Frencken', tag: 'Precision Mechanics' },
        { id: 'VDL', name: 'VDL', tag: 'Mechatronic Systems' },
      ],
      autoPartners: [
        { id: 'BMW', name: 'BMW', tag: 'BMW X1 & Multi-Platform' },
        { id: 'MINI', name: 'MINI', tag: 'Cooper, Cabrio & Countryman' },
        { id: 'BOSCH', name: 'BOSCH', tag: 'Sensors & Braking ECUs' },
        { id: 'ZF', name: 'ZF', tag: 'Transmissions & Steering' },
        { id: 'BROSE', name: 'BROSE', tag: 'Mechatronic Modules' },
        { id: 'VDL', name: 'VDL', tag: 'Contract Manufacturing OEM' },
      ],
      stations: [
        { id: 1, status: 'PASS 100%', spec: '±0.05 mm' },
        { id: 2, status: 'ISO 6469', spec: '100% Interlock' },
        { id: 3, status: '8D / RCA', spec: '120 Nm Dynamic' },
        { id: 4, status: '110-120/shift', spec: 'Zero Defect OEM' },
      ],
      hubs: [
        { country: 'China (Shenzhen/Shanghai)', role: 'Machinery Tooling & Production Capacity Audits', score: '98/100' },
        { country: 'India (Pune/Bengaluru)', role: 'On-Ground Engineering & Metrology Inspections', score: '95/100' },
        { country: 'Netherlands (Eindhoven)', role: 'Cleanroom Packaging & High-Tech Supply Review', score: '99/100' },
        { country: 'Spain (Valencia)', role: 'Import Logistics & Client Capital Protection', score: '100/100' },
      ],
      arkcohogarStats: [
        { title: 'INBOUND FLOW', desc: 'Double-entry audit' },
        { title: 'CYCLIC AUDITING', desc: 'Zero drift protocol' },
        { title: 'DISPATCH', desc: 'Optimized routing' },
      ]
    },
    pt: {
      cleanroomHeader: 'ECOSSISTEMA DE SALA LIMPA ASML // CLASSE ISO 5',
      erpSync: 'ISAH ERP: 150+ MENSAIS',
      cycleTimeRed: 'TEMPO DE CICLO: -30%',
      inspectPartner: 'Clique em qualquer líder industrial para inspecionar especificações:',
      activeStandard: 'Padrão Ativo:',
      cleanroomVerified: 'Certificado TÜV & Desgaseificação Zero Verificada',
      automotiveHeader: 'ECOSSISTEMA AUTOMÓVEL OEM // BMW GROUP, MINI COOPER, BOSCH & ZF',
      throughput: 'CADÊNCIA: 110-120 VEÍCULOS / TURNO',
      gate1: 'Alinhamento de Chassi & Estrutura',
      gate2: 'Bateria de Alta Tensão & Propulsão EV',
      gate3: 'Binário Dinâmico & Sensores Bosch',
      gate4: 'Controlo Final de Qualidade BMW/MINI',
      rcaProtocol: 'Protocolo 8D / RCA: -15% Defeitos Repetitivos',
      multiPlatform: 'Multiplataforma BMW X1, MINI Cooper, EV e Híbridos',
      sourcingHeader: 'CORREDOR INTERNACIONAL DE AUDITORIA DE FÁBRICAS',
      riskMitigation: '100% MITIGAÇÃO DE RISCO',
      stockAccuracy: '99.5% PRECISÃO DE STOCK',
      auditScore: 'Pontuação de Auditoria',
      validatedTier1: 'Ecossistema de Fornecimento Automóvel Nível-1 Validado:',
      hqPackPartners: [
        { id: 'ASML', name: 'ASML', tag: 'Litografia EUV/DUV' },
        { id: 'ZEISS', name: 'Zeiss', tag: 'Óptica High-NA' },
        { id: 'BOEING', name: 'Boeing', tag: 'Embalagem Aeroespacial' },
        { id: 'AIRBUS', name: 'Airbus', tag: 'Especificações de Defesa' },
        { id: 'SAMSUNG', name: 'Samsung', tag: 'Módulos de Fundição' },
        { id: 'NEWAYS', name: 'Neways', tag: 'Eletrónica de Sala Limpa' },
        { id: 'FRENCKEN', name: 'Frencken', tag: 'Mecânica de Precisão' },
        { id: 'VDL', name: 'VDL', tag: 'Sistemas Mecatrônicos' },
      ],
      autoPartners: [
        { id: 'BMW', name: 'BMW', tag: 'BMW X1 & Multiplataforma' },
        { id: 'MINI', name: 'MINI', tag: 'Cooper, Cabrio & Countryman' },
        { id: 'BOSCH', name: 'BOSCH', tag: 'Sensores & Travões ECUs' },
        { id: 'ZF', name: 'ZF', tag: 'Transmissões & Direção' },
        { id: 'BROSE', name: 'BROSE', tag: 'Módulos Mecatrônicos' },
        { id: 'VDL', name: 'VDL', tag: 'Fabricação OEM' },
      ],
      stations: [
        { id: 1, status: 'PASS 100%', spec: '±0.05 mm' },
        { id: 2, status: 'ISO 6469', spec: '100% Interlock' },
        { id: 3, status: '8D / RCA', spec: '120 Nm Dinâmico' },
        { id: 4, status: '110-120/turno', spec: 'Zero Defeitos OEM' },
      ],
      hubs: [
        { country: 'China (Shenzhen/Shanghai)', role: 'Auditorias de Capacidade de Produção e Maquinaria', score: '98/100' },
        { country: 'Índia (Pune/Bengaluru)', role: 'Inspeções de Engenharia e Metrologia no local', score: '95/100' },
        { country: 'Holanda (Eindhoven)', role: 'Revisão de Fornecimento de Alta Tecnologia e Salas Limpas', score: '99/100' },
        { country: 'Espanha (Valência)', role: 'Logística de Importação e Proteção de Capital', score: '100/100' },
      ],
      arkcohogarStats: [
        { title: 'FLUXO DE ENTRADA', desc: 'Auditoria de entrada dupla' },
        { title: 'AUDITORIA CÍCLICA', desc: 'Protocolo de deriva zero' },
        { title: 'DESPACHO', desc: 'Rotas otimizadas' },
      ]
    },
    nl: {
      cleanroomHeader: 'ASML CLEANROOM ECOSYSTEEM // ISO KLASSE 5',
      erpSync: 'ISAH ERP: 150+ MAANDELIJKS',
      cycleTimeRed: 'DOORLOOPTIJD: -30%',
      inspectPartner: 'Klik op een industriële partner om interfacespecificaties te bekijken:',
      activeStandard: 'Actieve Standaard:',
      cleanroomVerified: 'TÜV Gecertificeerd & Nul Uitgassing Borging',
      automotiveHeader: 'AUTOMOTIVE OEM ECOSYSTEEM // BMW GROUP, MINI COOPER, BOSCH & ZF',
      throughput: 'CAPACITEIT: 110-120 VOERTUIGEN / PLOEG',
      gate1: 'Chassis & Subframe Laser Uitlijning',
      gate2: 'Hoogvoltage EV Batterij & Aandrijving',
      gate3: 'Dynamisch Koppel & Bosch Sensoren',
      gate4: 'Eindcontrole OEM Kwaliteit BMW/MINI',
      rcaProtocol: '8D / RCA Protocol: -15% Herhaalde Defecten',
      multiPlatform: 'Multi-platform BMW X1, MINI Cooper, EV & Hybride',
      sourcingHeader: 'INTERNATIONAAL FABRIEKSAUDIT & SOURCING CORRIDOR',
      riskMitigation: '100% RISICOMITIGATIE',
      stockAccuracy: '99.5% VOORRAADNAUWKEURIGHEID',
      auditScore: 'Auditscore',
      validatedTier1: 'Gevalideerd Automotive Tier-1 Supply Ecosysteem:',
      hqPackPartners: [
        { id: 'ASML', name: 'ASML', tag: 'Lithografie EUV/DUV' },
        { id: 'ZEISS', name: 'Zeiss', tag: 'High-NA Optica' },
        { id: 'BOEING', name: 'Boeing', tag: 'Luchtvaart Verpakking' },
        { id: 'AIRBUS', name: 'Airbus', tag: 'Defensie Specificaties' },
        { id: 'SAMSUNG', name: 'Samsung', tag: 'Foundry Modules' },
        { id: 'NEWAYS', name: 'Neways', tag: 'Cleanroom Elektronica' },
        { id: 'FRENCKEN', name: 'Frencken', tag: 'Fijnmechanica' },
        { id: 'VDL', name: 'VDL', tag: 'Mechatronische Systemen' },
      ],
      autoPartners: [
        { id: 'BMW', name: 'BMW', tag: 'BMW X1 & Multi-platform' },
        { id: 'MINI', name: 'MINI', tag: 'Cooper, Cabrio & Countryman' },
        { id: 'BOSCH', name: 'BOSCH', tag: 'Sensoren & Remmen ECUs' },
        { id: 'ZF', name: 'ZF', tag: 'Transmissies & Besturing' },
        { id: 'BROSE', name: 'BROSE', tag: 'Mechatronica Modules' },
        { id: 'VDL', name: 'VDL', tag: 'OEM Fabricage' },
      ],
      stations: [
        { id: 1, status: 'PASS 100%', spec: '±0.05 mm' },
        { id: 2, status: 'ISO 6469', spec: '100% Interlock' },
        { id: 3, status: '8D / RCA', spec: '120 Nm Dynamisch' },
        { id: 4, status: '110-120/ploeg', spec: 'Zero Defect OEM' },
      ],
      hubs: [
        { country: 'China (Shenzhen/Shanghai)', role: 'Productiecapaciteit & Machine Audits', score: '98/100' },
        { country: 'India (Pune/Bengaluru)', role: 'On-site Engineering & Metrologie Inspecties', score: '95/100' },
        { country: 'Nederland (Eindhoven)', role: 'High-Tech & Cleanroom Supply Review', score: '99/100' },
        { country: 'Spanje (Valencia)', role: 'Import Logistiek & Klantkapitaal Bescherming', score: '100/100' },
      ],
      arkcohogarStats: [
        { title: 'INKOMENDE STROOM', desc: 'Dubbele invoer audit' },
        { title: 'CYCLIISCHE AUDITING', desc: 'Zero drift protocol' },
        { title: 'VERZENDING', desc: 'Geoptimaliseerde routes' },
      ]
    },
    de: {
      cleanroomHeader: 'ASML REINRAUM-ÖKOSYSTEM // ISO KLASSE 5',
      erpSync: 'ISAH ERP: 150+ MONATLICH',
      cycleTimeRed: 'DURCHLAUFZEIT: -30%',
      inspectPartner: 'Klicken Sie auf einen Industriepartner zur Anzeige von Spezifikationen:',
      activeStandard: 'Aktiver Standard:',
      cleanroomVerified: 'TÜV-zertifiziert & Ausgasungsfreiheit verifiziert',
      automotiveHeader: 'AUTOMOBIL-OEM-ÖKOSYSTEM // BMW GROUP, MINI COOPER, BOSCH & ZF',
      throughput: 'TAKTZEIT: 110-120 FAHRZEUGE / SCHICHT',
      gate1: 'Chassis- & Karosserie-Laserausrichtung',
      gate2: 'Hochvolt-EV-Batterie & Inverter',
      gate3: 'Drehmomentkontrolle & Bosch-Sensorik',
      gate4: 'Finale OEM-Qualitätsabnahme BMW/MINI',
      rcaProtocol: '8D / RCA Protokoll: -15% Wiederholfehler',
      multiPlatform: 'Multi-Plattform BMW X1, MINI Cooper, EV & Hybrid',
      sourcingHeader: 'INTERNATIONALER WERKS- & SOURCING-KORRIDOR',
      riskMitigation: '100% RISIKOMINIMIERUNG',
      stockAccuracy: '99.5% BESTANDSGENAUIGKEIT',
      auditScore: 'Audit-Ergebnis',
      validatedTier1: 'Validiertes Tier-1 Automotive-Ökosystem:',
      hqPackPartners: [
        { id: 'ASML', name: 'ASML', tag: 'Lithographie EUV/DUV' },
        { id: 'ZEISS', name: 'Zeiss', tag: 'High-NA Optik' },
        { id: 'BOEING', name: 'Boeing', tag: 'Luft- und Raumfahrtverpackung' },
        { id: 'AIRBUS', name: 'Airbus', tag: 'Verteidigungsspezifikationen' },
        { id: 'SAMSUNG', name: 'Samsung', tag: 'Gießerei-Module' },
        { id: 'NEWAYS', name: 'Neways', tag: 'Reinraum-Elektronik' },
        { id: 'FRENCKEN', name: 'Frencken', tag: 'Feinmechanik' },
        { id: 'VDL', name: 'VDL', tag: 'Mechatronische Systeme' },
      ],
      autoPartners: [
        { id: 'BMW', name: 'BMW', tag: 'BMW X1 & Multi-Plattform' },
        { id: 'MINI', name: 'MINI', tag: 'Cooper, Cabrio & Countryman' },
        { id: 'BOSCH', name: 'BOSCH', tag: 'Sensoren & Brems-ECUs' },
        { id: 'ZF', name: 'ZF', tag: 'Getriebe & Lenkung' },
        { id: 'BROSE', name: 'BROSE', tag: 'Mechatronik-Module' },
        { id: 'VDL', name: 'VDL', tag: 'OEM-Fertigung' },
      ],
      stations: [
        { id: 1, status: 'PASS 100%', spec: '±0.05 mm' },
        { id: 2, status: 'ISO 6469', spec: '100% Interlock' },
        { id: 3, status: '8D / RCA', spec: '120 Nm Dynamisch' },
        { id: 4, status: '110-120/schicht', spec: 'Zero Defect OEM' },
      ],
      hubs: [
        { country: 'China (Shenzhen/Shanghai)', role: 'Maschinen- & Produktionskapazitätsprüfungen', score: '98/100' },
        { country: 'Indien (Pune/Bengaluru)', role: 'Vor-Ort-Engineering & Messtechnik-Inspektionen', score: '95/100' },
        { country: 'Niederlande (Eindhoven)', role: 'Reinraum- & High-Tech-Lieferkettenbewertung', score: '99/100' },
        { country: 'Spanien (Valencia)', role: 'Importlogistik & Kapitalschutz des Kunden', score: '100/100' },
      ],
      arkcohogarStats: [
        { title: 'EINGANGSFLUSS', desc: 'Doppelbuchungs-Audit' },
        { title: 'ZYKLISCHE PRÜFUNG', desc: 'Null-Drift-Protokoll' },
        { title: 'VERSAND', desc: 'Optimierte Routen' },
      ]
    },
    fr: {
      cleanroomHeader: 'ÉCOSYSTÈME SALLE BLANCHE ASML // CLASSE ISO 5',
      erpSync: 'ISAH ERP: 150+ MENSUELS',
      cycleTimeRed: 'TEMPS DE CYCLE: -30%',
      inspectPartner: 'Cliquez sur un partenaire industriel pour afficher les spécifications:',
      activeStandard: 'Standard Actif:',
      cleanroomVerified: 'Certifié TÜV & Dégazage Zéro Vérifié',
      automotiveHeader: 'ÉCOSYSTÈME AUTOMOBILE OEM // BMW GROUP, MINI COOPER, BOSCH & ZF',
      throughput: 'CADENCE: 110-120 VÉHICULES / ÉQUIPE',
      gate1: 'Alignement Laser Châssis & Berceau',
      gate2: 'Batterie Haute Tension & Traction EV',
      gate3: 'Contrôle Couple & Capteurs Bosch',
      gate4: 'Contrôle Final Qualité OEM BMW/MINI',
      rcaProtocol: 'Protocole 8D / RCA: -15% Défauts Répétés',
      multiPlatform: 'Multi-plateforme BMW X1, MINI Cooper, EV & Hybride',
      sourcingHeader: 'CORRIDOR INTERNATIONAL D’AUDIT D’USINES',
      riskMitigation: '100% ATTÉNUATION DES RISQUES',
      stockAccuracy: '99.5% EXACTITUDE DES STOCKS',
      auditScore: 'Score d’Audit',
      validatedTier1: 'Écosystème Automobile Tier-1 Validé:',
      hqPackPartners: [
        { id: 'ASML', name: 'ASML', tag: 'Lithographie EUV/DUV' },
        { id: 'ZEISS', name: 'Zeiss', tag: 'Optique High-NA' },
        { id: 'BOEING', name: 'Boeing', tag: 'Emballage Aérospatial' },
        { id: 'AIRBUS', name: 'Airbus', tag: 'Spécifications de Défense' },
        { id: 'SAMSUNG', name: 'Samsung', tag: 'Modules de Fonderie' },
        { id: 'NEWAYS', name: 'Neways', tag: 'Électronique Salle Blanche' },
        { id: 'FRENCKEN', name: 'Frencken', tag: 'Mécanique de Précision' },
        { id: 'VDL', name: 'VDL', tag: 'Systèmes Mécatroniques' },
      ],
      autoPartners: [
        { id: 'BMW', name: 'BMW', tag: 'BMW X1 & Multi-plateforme' },
        { id: 'MINI', name: 'MINI', tag: 'Cooper, Cabrio & Countryman' },
        { id: 'BOSCH', name: 'BOSCH', tag: 'Capteurs & Freins ECUs' },
        { id: 'ZF', name: 'ZF', tag: 'Transmissions & Direction' },
        { id: 'BROSE', name: 'BROSE', tag: 'Modules Mécatroniques' },
        { id: 'VDL', name: 'VDL', tag: 'Fabrication OEM' },
      ],
      stations: [
        { id: 1, status: 'PASS 100%', spec: '±0.05 mm' },
        { id: 2, status: 'ISO 6469', spec: '100% Interlock' },
        { id: 3, status: '8D / RCA', spec: '120 Nm Dynamique' },
        { id: 4, status: '110-120/équipe', spec: 'Zéro Défaut OEM' },
      ],
      hubs: [
        { country: 'Chine (Shenzhen/Shanghai)', role: 'Audits de Capacité de Production et Machines', score: '98/100' },
        { country: 'Inde (Pune/Bengaluru)', role: 'Inspections d\'Ingénierie et de Métrologie sur site', score: '95/100' },
        { country: 'Pays-Bas (Eindhoven)', role: 'Examen de Fourniture High-Tech & Salle Blanche', score: '99/100' },
        { country: 'Espagne (Valence)', role: 'Logistique d\'Importation et Protection du Capital Client', score: '100/100' },
      ],
      arkcohogarStats: [
        { title: 'FLUX ENTRANT', desc: 'Audit à double entrée' },
        { title: 'AUDIT CYCLIQUE', desc: 'Protocole dérive zéro' },
        { title: 'EXPÉDITION', desc: 'Itinéraires optimisés' },
      ]
    }
  };

  const t = labels[currentLocale] || labels.es;

  // =========================================================================
  // 1. HQ PACK: Cleanroom with ASML, Zeiss, Boeing, Airbus, Samsung, etc.
  // =========================================================================
  if (experienceId === 'hq-pack') {
    const partners = t.hqPackPartners;

    const [activePartner, setActivePartner] = useState<string>('ASML');

    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border border-cyan-500/40 dark:border-cyan-500/40 light:border-cyan-400 space-y-4 relative overflow-hidden shadow-lg">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-cyan-400 dark:text-cyan-300 light:text-cyan-700 tracking-wider">
              {t.cleanroomHeader}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 light:text-slate-600">
            <strong className="text-emerald-500 dark:text-emerald-400">{t.erpSync}</strong>
            <span>&bull;</span>
            <strong className="text-cyan-500 dark:text-cyan-400">{t.cycleTimeRed}</strong>
          </div>
        </div>

        {/* Interactive Partner Logo Grid */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 light:text-slate-600">
            {t.inspectPartner}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {partners.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePartner(p.id)}
                className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  activePartner === p.id
                    ? 'bg-cyan-950/80 dark:bg-cyan-950/80 light:bg-cyan-50 border-cyan-400 shadow-md shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-cyan-500/40 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-cyan-50/50'
                }`}
              >
                <div className="h-7 flex items-center">
                  <BrandLogo name={p.name} className="h-6 w-auto max-w-[90px]" />
                </div>
                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 mt-2 truncate">
                  {p.tag}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Partner Telemetry Footer */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{t.activeStandard} </span>
              <span className="text-cyan-500 dark:text-cyan-300 font-bold">{activePartner} Precision Cleanroom Interface</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 font-mono text-[11px] text-emerald-500 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.cleanroomVerified}</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. VDL NEDCAR: Automotive OEM Ecosystem (BMW, MINI Cooper, Bosch, ZF, Brose)
  // =========================================================================
  if (experienceId === 'vdl-nedcar') {
    const autoPartners = t.autoPartners;

    const [activeAuto, setActiveAuto] = useState<string>('BMW');

    const stations = [
      { id: 1, name: t.gate1, status: t.stations[0].status, spec: t.stations[0].spec },
      { id: 2, name: t.gate2, status: t.stations[1].status, spec: t.stations[1].spec },
      { id: 3, name: t.gate3, status: t.stations[2].status, spec: t.stations[2].spec },
      { id: 4, name: t.gate4, status: t.stations[3].status, spec: t.stations[3].spec },
    ];

    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border border-cyan-500/40 dark:border-cyan-500/40 light:border-cyan-400 space-y-4 shadow-lg">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <Car className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-400 dark:text-emerald-300 light:text-emerald-700 tracking-wider">
              {t.automotiveHeader}
            </span>
          </div>
          <div className="text-[11px] font-mono text-cyan-500 dark:text-cyan-400 font-bold">
            {t.throughput}
          </div>
        </div>

        {/* Automotive OEM Brand Logos Strip */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 light:text-slate-600">
            Validated Automotive Tier-1 Supply Ecosystem:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {autoPartners.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveAuto(p.id)}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  activeAuto === p.id
                    ? 'bg-slate-900 dark:bg-slate-900 light:bg-cyan-50 border-cyan-400 shadow-md scale-[1.02]'
                    : 'bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="h-6 flex items-center">
                  <BrandLogo name={p.name} className="h-5 w-auto max-w-[80px]" />
                </div>
                <div className="text-[9px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1 truncate">
                  {p.tag}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Quality Gate Validation Stations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {stations.map((st) => (
            <div
              key={st.id}
              className="p-3 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">GATE 0{st.id}</span>
                <span className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400 font-bold">{st.status}</span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">{st.name}</div>
              <div className="text-[10px] font-mono text-cyan-500 dark:text-cyan-400 mt-0.5">{st.spec}</div>
            </div>
          ))}
        </div>

        {/* Telemetry Bar */}
        <div className="p-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs font-mono text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>{t.rcaProtocol}</span>
          <span className="text-cyan-500 dark:text-cyan-400 font-semibold">{t.multiPlatform}</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. INDEPENDENT CONSULTANT: Global Sourcing Map
  // =========================================================================
  if (experienceId === 'independent-consultant') {
    const hubs = t.hubs;

    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border border-cyan-500/40 dark:border-cyan-500/40 light:border-cyan-400 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <Globe2 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-400 dark:text-cyan-300 light:text-cyan-700">
              {t.sourcingHeader}
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-500 dark:text-emerald-400 font-bold">{t.riskMitigation}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hubs.map((hub, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{hub.country}</span>
                <span className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400 bg-emerald-950/80 dark:bg-emerald-950/80 light:bg-emerald-100 px-2 py-0.5 rounded font-bold">
                  {hub.score} {t.auditScore}
                </span>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">{hub.role}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. ARKCOHOGAR: Warehouse Logistics Flow
  // =========================================================================
  if (experienceId === 'arkcohogar') {
    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border border-cyan-500/40 dark:border-cyan-500/40 light:border-cyan-400 space-y-3 text-xs shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-2.5 font-mono">
          <span className="font-bold text-cyan-500 dark:text-cyan-400">{t.stockAccuracy.replace(/[0-9.%]*/, '').trim() || 'INVENTORY CONTROL & LOGISTICS AUDITING'}</span>
          <span className="text-emerald-500 dark:text-emerald-400 font-bold">{t.stockAccuracy}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 font-mono">
            <div className="text-cyan-400 font-bold">{t.arkcohogarStats[0].title}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.arkcohogarStats[0].desc}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 font-mono">
            <div className="text-emerald-400 font-bold">{t.arkcohogarStats[1].title}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.arkcohogarStats[1].desc}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 font-mono">
            <div className="text-indigo-400 font-bold">{t.arkcohogarStats[2].title}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">{t.arkcohogarStats[2].desc}</div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="p-4 rounded-xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-mono text-cyan-400 font-bold">{company} // OPERATIONAL EXCELLENCE</span>
        <span className="font-mono text-emerald-400">VERIFIED TRACK RECORD</span>
      </div>
    </div>
  );
}
