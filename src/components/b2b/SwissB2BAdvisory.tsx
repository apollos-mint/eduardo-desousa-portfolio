// DE SOUSA // Operations & Supply Chain Advisory
// Aesthetic: Executive Management Consulting (McKinsey & Company / Deloitte Advisory / Palantir Enterprise Precision)
// Clean architectural white canvas, McKinsey Midnight Navy (#051C2C), Corporate Blue (#0066CC), and subtle Deloitte Green (#16A34A)
// 100% Grounded in Eduardo de Sousa's authentic operational track record:
// - Global Sourcing ($800K/yr, 20 containers/quarter from China & India, -75% cost savings)
// - Automotive OEM moving line cadence (VDL Nedcar: BMW Group & MINI Cooper, 110-120 cars/shift, digital torque wrenches, -15% defects)
// - High-Tech Cleanroom Electromechanical Assembly (HQ Pack: ASML lithography packaging, ISO Class 5, TÜV winch recertification)
// - OptiAsset CMMS dual-DB sync (PostgreSQL + MSSQL) & iPaaS workflow automation (Make, Zapier, Asana)
// - Verified credentials: Lean Six Sigma Black Belt (DMAIC), Operations Bachelor Degree, LMU Munich Strategic Supply Chain
// ZERO unverified credentials (no ISO 9001 Lead Auditor, no VCA-VOL)
// ZERO fabricated engineering claims (no Zeiss CMM runout curves, no thermal scans)

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { 
  Check, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  Layers,
  Wrench,
  Clock,
  Sparkles,
  Award,
  Globe,
  Menu,
  X,
  CheckCircle2,
  Cookie
} from 'lucide-react';

export type SupportedLanguage = 'en' | 'es' | 'nl' | 'de' | 'fr' | 'pt';

export interface TranslationBundle {
  status_ribbon: string;
  status_mode: string;
  nav_brand_title: string;
  nav_brand_sub: string;
  nav_pillars: string;
  nav_cases: string;
  nav_tooling: string;
  nav_methodology: string;
  nav_pedigree: string;
  nav_economics: string;
  nav_cta: string;
  hero_kicker: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_m1_val: string;
  hero_m1_label: string;
  hero_m1_sub: string;
  hero_m2_val: string;
  hero_m2_label: string;
  hero_m2_sub: string;
  hero_m3_val: string;
  hero_m3_label: string;
  hero_m3_sub: string;
  hero_m4_val: string;
  hero_m4_label: string;
  hero_m4_sub: string;
  calc_title: string;
  calc_badge: string;
  calc_slider_label: string;
  calc_hours: string;
  calc_benchmark: string;
  calc_critical: string;
  calc_loss_label: string;
  calc_annual_label: string;
  calc_recovery_label: string;
  calc_guarantee_note: string;
  calc_cta: string;
  pillars_kicker: string;
  pillars_title: string;
  pillars_subtitle: string;
  p1_kicker: string;
  p1_title: string;
  p1_desc: string;
  p1_f1: string;
  p1_f2: string;
  p1_f3: string;
  p1_drawer_btn: string;
  p1_drawer_title: string;
  p1_d1: string;
  p1_d2: string;
  p1_d3: string;
  p2_kicker: string;
  p2_title: string;
  p2_desc: string;
  p2_f1: string;
  p2_f2: string;
  p2_f3: string;
  p2_drawer_btn: string;
  p2_drawer_title: string;
  p2_d1: string;
  p2_d2: string;
  p2_d3: string;
  p3_kicker: string;
  p3_title: string;
  p3_desc: string;
  p3_f1: string;
  p3_f2: string;
  p3_f3: string;
  p3_drawer_btn: string;
  p3_drawer_title: string;
  p3_d1: string;
  p3_d2: string;
  p3_d3: string;
  cases_kicker: string;
  cases_title: string;
  cases_subtitle: string;
  tab_case_sourcing: string;
  tab_case_automotive: string;
  tab_case_cleanroom: string;
  c1_title: string;
  c1_client: string;
  c1_challenge_title: string;
  c1_challenge_text: string;
  c1_intervention_title: string;
  c1_intervention_text: string;
  c1_outcome_title: string;
  c1_outcome_text: string;
  c1_metric_label: string;
  c1_metric_val: string;
  c2_title: string;
  c2_client: string;
  c2_challenge_title: string;
  c2_challenge_text: string;
  c2_intervention_title: string;
  c2_intervention_text: string;
  c2_outcome_title: string;
  c2_outcome_text: string;
  c2_metric_label: string;
  c2_metric_val: string;
  c3_title: string;
  c3_client: string;
  c3_challenge_title: string;
  c3_challenge_text: string;
  c3_intervention_title: string;
  c3_intervention_text: string;
  c3_outcome_title: string;
  c3_outcome_text: string;
  c3_metric_label: string;
  c3_metric_val: string;
  tooling_kicker: string;
  tooling_title: string;
  tooling_subtitle: string;
  tooling_banner_badge: string;
  tooling_banner_text: string;
  tool1_title: string;
  tool1_sub: string;
  tool1_desc: string;
  tool2_title: string;
  tool2_sub: string;
  tool2_desc: string;
  telemetry_table_title: string;
  telemetry_table_sub: string;
  telemetry_sync_badge: string;
  dmaic_kicker: string;
  dmaic_title: string;
  dmaic_subtitle: string;
  pedigree_kicker: string;
  pedigree_title: string;
  pedigree_subtitle: string;
  lead_name: string;
  lead_role: string;
  lead_pledge_title: string;
  lead_pledge_text: string;
  lead_btn_triage: string;
  lead_btn_whatsapp: string;
  lead_btn_linkedin: string;
  cred1_title: string;
  cred1_inst: string;
  cred1_desc: string;
  cred2_title: string;
  cred2_inst: string;
  cred2_desc: string;
  cred3_title: string;
  cred3_inst: string;
  cred3_desc: string;
  cred4_title: string;
  cred4_inst: string;
  cred4_desc: string;
  pricing_kicker: string;
  pricing_title: string;
  pricing_subtitle: string;
  pricing_vat_notice: string;
  t1_badge: string;
  t1_name: string;
  t1_price: string;
  t1_period: string;
  t1_desc: string;
  t1_roi_badge: string;
  t1_roi_text: string;
  t1_btn: string;
  t2_highlight: string;
  t2_badge: string;
  t2_name: string;
  t2_price: string;
  t2_period: string;
  t2_cadence: string;
  t2_desc: string;
  t2_term: string;
  t2_btn: string;
  t3_badge: string;
  t3_name: string;
  t3_price: string;
  t3_period: string;
  t3_desc: string;
  t3_travel_note: string;
  t3_btn: string;
  intake_kicker: string;
  intake_title: string;
  intake_subtitle: string;
  intake_badge_nda: string;
  intake_point1: string;
  intake_point2: string;
  intake_point3: string;
  opt1_kicker: string;
  opt1_title: string;
  opt1_desc: string;
  opt1_format_label: string;
  opt1_format_val: string;
  opt1_lead_label: string;
  opt1_lead_val: string;
  opt1_legal_label: string;
  opt1_legal_val: string;
  opt1_btn_cal: string;
  opt1_whatsapp: string;
  opt1_email: string;
  opt2_kicker: string;
  opt2_title: string;
  opt2_desc: string;
  field_name_label: string;
  field_name_placeholder: string;
  field_company_label: string;
  field_company_placeholder: string;
  field_email_label: string;
  field_email_placeholder: string;
  field_bottleneck_label: string;
  field_bottleneck_placeholder: string;
  opt2_btn_submit: string;
  opt2_submitting: string;
  opt2_footer_note: string;
  modal_title: string;
  modal_ref_label: string;
  modal_nda_badge: string;
  modal_mandate_scope: string;
  modal_lead_label: string;
  modal_btn_cal: string;
  modal_btn_whatsapp: string;
  modal_btn_email: string;
  modal_btn_return: string;
  footer_brand: string;
  footer_sub: string;
  footer_nda: string;
  calc_annual_recovery: string;
  mid_cta_badge: string;
  mid_cta_title: string;
  mid_cta_subtitle: string;
  mid_cta_btn: string;
  ribbon_direct_engagement: string;
  nav_brand_sub_title: string;
  hero_telemetry_ecosystem: string;
  hero_benchmarks_title: string;
  calc_benchmark_badge: string;
  calc_per_month: string;
  calc_roi_badge_suffix: string;
  calc_slider_aria: string;
  tab_p1_title: string;
  tab_p2_title: string;
  tab_p3_title: string;
  dossier_active_badge: string;
  dossier_hide_protocol: string;
  dmaic_case_evidence_title: string;
  tool1_tag: string;
  tool1_status: string;
  tool1_scope: string;
  tool2_tag: string;
  tool2_status: string;
  tool2_scope: string;
  tool3_tag: string;
  tool3_status: string;
  tool3_title: string;
  tool3_scope: string;
  tool3_desc: string;
  tool4_tag: string;
  tool4_status: string;
  tool4_title: string;
  tool4_scope: string;
  tool4_desc: string;
  tool_delivery_asset: string;
  optiasset_kicker: string;
  optiasset_title: string;
  optiasset_badge: string;
  optiasset_c1_title: string;
  optiasset_c1_desc: string;
  optiasset_c2_title: string;
  optiasset_c2_desc: string;
  optiasset_c3_title: string;
  optiasset_c3_desc: string;
  optiasset_footer_arch: string;
  optiasset_footer_engine: string;
  lead_active_badge: string;
  t1_duration: string;
  t2_duration: string;
  t2_commitment_badge: string;
  t3_duration: string;
  t3_policy_badge: string;
  dmaic_phase1_phase: string;
  dmaic_phase1_title: string;
  dmaic_phase1_desc: string;
  dmaic_phase1_output: string;
  dmaic_phase2_phase: string;
  dmaic_phase2_title: string;
  dmaic_phase2_desc: string;
  dmaic_phase2_output: string;
  dmaic_phase3_phase: string;
  dmaic_phase3_title: string;
  dmaic_phase3_desc: string;
  dmaic_phase3_output: string;
  dmaic_phase4_phase: string;
  dmaic_phase4_title: string;
  dmaic_phase4_desc: string;
  dmaic_phase4_output: string;
  dmaic_phase5_phase: string;
  dmaic_phase5_title: string;
  dmaic_phase5_desc: string;
  dmaic_phase5_output: string;
  dmaic_deliverable_label: string;
  agile_kicker: string;
  agile_title: string;
  agile_subtitle: string;
  agile_c1_sub: string;
  agile_c1_title: string;
  agile_c1_desc: string;
  agile_c1_cadence: string;
  agile_c2_sub: string;
  agile_c2_title: string;
  agile_c2_desc: string;
  agile_c2_escalation: string;
  agile_c3_sub: string;
  agile_c3_title: string;
  agile_c3_desc: string;
  agile_c3_control: string;
  agile_c4_sub: string;
  agile_c4_title: string;
  agile_c4_desc: string;
  agile_c4_output: string;
  field_tier_label: string;
  tier_opt_sprint: string;
  tier_opt_fractional: string;
  tier_opt_onsite: string;
  modal_company_label: string;
  footer_tax_notice: string;
  hero_m4_iso_badge: string;
  hero_m1_badge: string;
  hero_m2_badge: string;
  hero_m3_badge: string;
  hero_m4_badge: string;
  calc_rate_label: string;
  calc_rate_unit: string;
  calc_rate_benchmark: string;
  calc_rate_min: string;
  calc_rate_max: string;
}

const TRANSLATIONS: Record<SupportedLanguage, TranslationBundle> = {
  "en": {
    "status_ribbon": "Q4/Q1 CAPACITY: 1 ADVISORY MANDATE OPEN",
    "status_mode": "14-DAY REMOTE SPRINT OR ON-SITE PLANT AUDIT",
    "nav_brand_title": "DE SOUSA // OPERATIONS & SUPPLY CHAIN ADVISORY",
    "nav_brand_sub": "Principal Operational Advisory · Automotive OEM & High-Tech Cleanrooms",
    "nav_pillars": "Advisory Pillars",
    "nav_cases": "Verified Cases",
    "nav_tooling": "Proprietary Systems",
    "nav_methodology": "DMAIC Rigor",
    "nav_pedigree": "Executive Profile",
    "nav_economics": "Economics",
    "nav_cta": "Initiate Scoping",
    "hero_kicker": "Executive Industrial Operations & Supply Chain Advisory",
    "hero_title": "Eliminate Plant Downtime and Scale Direct Factory Sourcing with Floor-Level Precision.",
    "hero_subtitle": "Advising industrial leadership on operational transformation. Grounded in ASML-tier cleanroom electromechanical assembly protocols, high-takt automotive OEM Tier 1 & Tier 2 operation floor work, and high-volume direct international procurement.",
    "hero_cta_primary": "Request Operational Diagnostic",
    "hero_cta_secondary": "Review Verified Track Record",
    "hero_m1_val": "$800K / yr Direct Sourcing",
    "hero_m1_label": "Global Sourcing · APAC",
    "hero_m1_sub": "China & India direct industrial sourcing across 20 containers/quarter with on-site PSI audits.",
    "hero_m2_val": "-75% Unit Cost Reduction",
    "hero_m2_label": "Cost Optimization · BOM",
    "hero_m2_sub": "Eliminated domestic broker markups via direct tier-1 contracts & on-site PSI quality releases.",
    "hero_m3_val": "110–120 Cars / Shift",
    "hero_m3_label": "Automotive OEM · Tier 1 & 2 Floor Work",
    "hero_m3_sub": "Tier 1 & Tier 2 operation floor work & moving line continuous flow (BMW Group & MINI Cooper at VDL Nedcar) with digital torque monitoring.",
    "hero_m4_val": "Hqpack Tier 2 & 3 work on ASML Semiconductor Ecosystem",
    "hero_m4_label": "Semiconductor · High-Tech",
    "hero_m4_sub": "HQ Pack cleanroom electromechanical assembly under ISO Class 5 EUV protocols (Brainport Eindhoven).",
    "calc_title": "Plant Downtime & Bottleneck Financial Impact Estimator",
    "calc_badge": "Empirical COPQ Model",
    "calc_slider_label": "Monthly Line Downtime / Cycle Bottleneck:",
    "calc_hours": "hrs/mo",
    "calc_benchmark": "European Benchmark: €4,200 / hr of unplanned stoppage",
    "calc_critical": "50h (Plant Crisis)",
    "calc_loss_label": "Estimated Monthly Production Hemorrhage:",
    "calc_annual_label": "Annualized Loss:",
    "calc_recovery_label": "Projected Sprint Recovery Potential (-45%):",
    "calc_guarantee_note": "100% Fee Credit Guarantee: If the 14-day diagnostic fails to document at least €16,500 in annual procurement or maintenance recovery, 100% of the €5,500 fee is credited toward an On-Site Audit or Fractional Retainer.",
    "calc_cta": "Scope Operational Diagnostic Sprint →",
    "pillars_kicker": "Systematic Interventions",
    "pillars_title": "Three Core Pillars of Industrial Advisory Practice",
    "pillars_subtitle": "Engineered to eliminate operational drift, reduce material costs, and enforce floor-level quality control across manufacturing and supply chain hubs.",
    "p1_kicker": "Pillar 01 // Global Procurement",
    "p1_title": "Direct International Sourcing & Supplier Quality Governance",
    "p1_desc": "100% Remote Architecture. Disintermediate domestic brokers and establish direct factory-gate contracts in Shenzhen, Ningbo, and India. Vetting and deploying on-site Pre-Shipment Inspection (PSI) teams and structuring risk-mitigated commercial milestone contracts.",
    "p1_f1": "Direct factory negotiations bypassing domestic brokers (-75% BOM cost).",
    "p1_f2": "On-site engineering inspection teams (PSI & CLI) enforcing AQL standards.",
    "p1_f3": "Structured milestone contracts (30% proforma / 70% against PSI release).",
    "p1_drawer_btn": "View 5-Point Sourcing Governance Protocol",
    "p1_drawer_title": "5-Point Direct Sourcing & Supplier Audit Protocol",
    "p1_d1": "Direct Factory Vetting: Full background audit, production capacity verification, and export license validation in China & India.",
    "p1_d2": "Commercial & Payment Gating: 30% initial proforma deposit, 70% released strictly upon verified on-site inspection certificate and Bill of Lading.",
    "p1_d3": "On-Site PSI Sampling: Deployed local quality engineers executing MIL-STD-105E / ISO 2859-1 AQL inspections before container seal.",
    "p2_kicker": "Pillar 02 // Line Optimization",
    "p2_title": "Manufacturing Line Optimization & Takt Discipline",
    "p2_desc": "Grounded in Automotive OEM moving assembly line discipline (VDL Nedcar: BMW Group, MINI Cooper). Calibrating digital torque specifications, eliminating micro-stops, logging real-time defects into MES terminals, and executing 8D root-cause problem solving.",
    "p2_f1": "Moving assembly line cadence synchronization (110–120 cars/shift).",
    "p2_f2": "Digital torque wrench calibration on chassis and wheel axis assemblies.",
    "p2_f3": "8D root-cause problem solving cutting recurring defects by 15%.",
    "p2_drawer_btn": "View Line Balancing & 8D Containment Workflow",
    "p2_drawer_title": "Assembly Line Balancing & 8D Quality Workflow",
    "p2_d1": "Cycle Time & Takt Analysis: Real-time time studies to identify line micro-stops and bottleneck workstations.",
    "p2_d2": "Poka-Yoke & Digital Torque Calibration: Calibrated digital tooling with automatic data logging to MES to prevent torque deviations.",
    "p2_d3": "8D Defect Containment: Emergency containment within 24 hours, fishbone (Ishikawa) root cause isolation, and permanent corrective actions.",
    "p3_kicker": "Pillar 03 // Cleanroom & Systems",
    "p3_title": "High-Tech Cleanroom Assembly & Digital Systems Governance",
    "p3_desc": "Servicing the Brainport Eindhoven semiconductor ecosystem (HQ Pack: ASML lithography packaging). Electromechanical assembly under ISO 14644-1 Class 5 conditions, TÜV-certified winch recertification, and ISAH ERP lot traceability paired with OptiAsset CMMS dual-DB architecture.",
    "p3_f1": "ISO Class 5 cleanroom electromechanical assembly protocols.",
    "p3_f2": "ISAH ERP component traceability and digitized repair registration.",
    "p3_f3": "Proprietary OptiAsset CMMS dual-database architecture (PostgreSQL + MSSQL).",
    "p3_drawer_btn": "View Cleanroom & ERP Traceability SOPs",
    "p3_drawer_title": "ISO Class 5 Cleanroom & ERP Governance SOPs",
    "p3_d1": "Particulate Contamination Control: Multi-stage gowning protocols, laminar flow airflow verification, and electrostatic discharge (ESD) barriers.",
    "p3_d2": "Serial-Level ERP Governance: Component lot logging in ERP ISAH ensuring 100% traceability for semiconductor tier-1 clients.",
    "p3_d3": "TÜV Compliance Overhaul: Hands-on electrical wiring diagnostics and load testing on hoisting winches with 0 audit non-conformities.",
    "cases_kicker": "Empirical Track Record",
    "cases_title": "Verified Case Studies from High-Precision Manufacturing",
    "cases_subtitle": "Tangible operational interventions delivering measurable margin improvements, zero-defect quality conformity, and supply chain security.",
    "tab_case_sourcing": "Global Sourcing ($800K)",
    "tab_case_automotive": "Automotive OEM (VDL Nedcar)",
    "tab_case_cleanroom": "Semiconductor Packaging (HQ Pack)",
    "c1_title": "$800,000/yr Direct International Sourcing & Supply Chain Disintermediation",
    "c1_client": "Industrial Building Materials & Finishes Distributor · 11/2024 – Present",
    "c1_challenge_title": "Operational Challenge",
    "c1_challenge_text": "Client faced steep 40%–75% intermediary markups from domestic importers, unpredictable shipment delays, and severe product quality inconsistencies across imported bulk materials.",
    "c1_intervention_title": "Strategic Intervention",
    "c1_intervention_text": "Restructured the entire supply chain by establishing direct factory-gate agreements with Tier-1 manufacturers in China and India. Vetted and deployed local on-site engineering inspection teams (PSI & CLI) and structured milestone contracts (30% proforma / 70% against inspection sign-off and Bill of Lading release). Managed a throughput of 20 ocean containers per quarter.",
    "c1_outcome_title": "Empirical Outcome",
    "c1_outcome_text": "Captured net 75% material cost savings, eliminated distributor markups, and achieved a 100% delivery conformity record with zero commercial contract disputes.",
    "c1_metric_label": "Net Cost Reduction",
    "c1_metric_val": "-75% Sourcing Cost",
    "c2_title": "Automotive OEM Moving Assembly Line Quality & Torque Calibration",
    "c2_client": "VDL Nedcar (Born, Netherlands) · BMW Group & MINI Cooper · 04/2022 – 11/2023",
    "c2_challenge_title": "Operational Challenge",
    "c2_challenge_text": "High-cadence moving assembly line producing 110–120 BMW and MINI Cooper vehicles per shift under rigid cycle times, where any torque deviation or assembly escape risked multi-thousand-euro line stoppages.",
    "c2_intervention_title": "Strategic Intervention",
    "c2_intervention_text": "Conducted moving line quality inspections and precision digital torque wrench calibrations on wheel axes and structural chassis sub-assemblies. Utilized automotive diagnostic scanners to isolate electrical faults, systematically logging defect telemetry into plant MES terminals and routing 8D containment alerts.",
    "c2_outcome_title": "Empirical Outcome",
    "c2_outcome_text": "Reduced repeat assembly line defects by 15% and maintained a 100% audit conformity rating for BMW Group across both hybrid and combustion platforms.",
    "c2_metric_label": "Repeat Defect Reduction",
    "c2_metric_val": "-15% Defect Rate",
    "c3_title": "Semiconductor Cleanroom Electromechanical Assembly & ERP Traceability",
    "c3_client": "HQ Pack (Eindhoven, Brainport Region) · ASML Ecosystem · 02/2024 – 07/2026",
    "c3_challenge_title": "Operational Challenge",
    "c3_challenge_text": "Sub-assembly and packaging modules for ASML semiconductor lithography equipment required absolute zero particulate contamination (ISO Class 5) and flawless mechanical reliability on TÜV-certified hoisting equipment.",
    "c3_intervention_title": "Strategic Intervention",
    "c3_intervention_text": "Executed precision electromechanical assembly, wiring diagnostics, and mechanical overhauls on TÜV-certified winches under strict cleanroom conditions. Engineered a digitized workflow enhancement for internal repair registration, streamlining technical tracking in ERP ISAH and management reporting.",
    "c3_outcome_title": "Empirical Outcome",
    "c3_outcome_text": "Cut repair turnaround time by 30%, reduced recurring defects by 22%, and achieved 100% audit pass rates on TÜV equipment compliance with zero critical findings.",
    "c3_metric_label": "Turnaround Time Reduction",
    "c3_metric_val": "-30% Cycle Time",
    "tooling_kicker": "Software & Telemetry Architecture",
    "tooling_title": "Proprietary Diagnostic Tooling & Automated Data Pipelines",
    "tooling_subtitle": "Custom-engineered software systems deployed during advisory mandates to ensure lasting operational governance and zero data re-keying.",
    "tooling_banner_badge": "PROPRIETARY TOOLING // DEPLOYED AT ZERO SOFTWARE LICENSING COST",
    "tooling_banner_text": "NOT A STANDALONE SAAS PRODUCT • Custom asset telemetry, maintenance databases, and landed-cost sourcing models engineered and transferred to client plant teams during audits & fractional sprints at zero recurring software fees.",
    "tool1_title": "OptiAsset CMMS Architecture",
    "tool1_sub": "Dual PostgreSQL + MSSQL Relational Engine",
    "tool1_desc": "Sub-second work-order dispatch, preventive maintenance triggers, and MTBF/MTTR tracking for plant machinery.",
    "tool2_title": "Direct Plant Procurement Pipeline",
    "tool2_sub": "Make, Zapier & Webhook Integrations",
    "tool2_desc": "Disintermediation tooling automating pre-shipment inspections, bill-of-lading releases, and -75% BOM cost gating.",
    "telemetry_table_title": "OptiAsset Live Operational Queue & Asset Health",
    "telemetry_table_sub": "Representative production schema · Real operational workflow",
    "telemetry_sync_badge": "PostgreSQL · Replication Latency: 1.2ms",
    "dmaic_kicker": "Methodological Rigor",
    "dmaic_title": "Lean Six Sigma DMAIC Lifecycle",
    "dmaic_subtitle": "Every client intervention follows the Lean Six Sigma Black Belt DMAIC framework, engineered to convert production line variability and supply chain volatility into sustained operational predictability.",
    "pedigree_kicker": "Leadership & Governance",
    "pedigree_title": "Principal Advisory Delivered by Lead Operations Engineer",
    "pedigree_subtitle": "Direct personal accountability. Every mandate is led, diagnosed, and executed personally by Eduardo de Sousa.",
    "lead_name": "Eduardo de Sousa",
    "lead_role": "Lead Operational & Supply Chain Engineer · Principal Industrial Advisor",
    "lead_pledge_title": "Direct 1:1 Lead Engineer Mandate Guarantee",
    "lead_pledge_text": "When you engage De Sousa Advisory, you work directly with Eduardo de Sousa. No junior account managers, no associate handoffs, and zero theoretical agency decks. Direct operational leadership on your shop floor and with your suppliers.",
    "lead_btn_triage": "Schedule 20-Min Triage with Eduardo",
    "lead_btn_whatsapp": "Direct WhatsApp Channel",
    "lead_btn_linkedin": "Verified Profile on LinkedIn ↗",
    "cred1_title": "Lean Six Sigma Black Belt",
    "cred1_inst": "DMAIC Master Certification · virtualbadge.io",
    "cred1_desc": "Statistical process control, DOE, Kaizen, and value stream mapping for systematic variation and defect eradication.",
    "cred2_title": "Degree in Operations & Management Processes",
    "cred2_inst": "Higher Academic University Degree",
    "cred2_desc": "Comprehensive operations leadership, supply chain modeling, manufacturing processes, and logistics economics.",
    "cred3_title": "Strategic Supply Chain Management",
    "cred3_inst": "Ludwig-Maximilians-Universität München (LMU Munich)",
    "cred3_desc": "Executive German curriculum covering global supply chain resilience, geopolitical risk mitigation, and TCO optimization.",
    "cred4_title": "Google Data Analytics Professional",
    "cred4_inst": "Google / Coursera Professional Certificate",
    "cred4_desc": "Data manipulation, SQL querying, statistical modeling, and executive dashboard visualization for evidence-based decisions.",
    "pricing_kicker": "Commercial Transparency",
    "pricing_title": "Productized Advisory Mandates: Fixed Deliverables, Zero Scope Creep",
    "pricing_subtitle": "No ambiguous hourly billables. Fixed milestone pricing with clear ROI thresholds and contractual execution boundaries.",
    "pricing_vat_notice": "excl. VAT / zzgl. MwSt. · Invoiced via European Tax ID · Mutual NDA Included",
    "t1_badge": "SPEC-SHEET 01 // REMOTE DIAGNOSTIC",
    "t1_name": "14-Day Remote Spend & Telemetry Diagnostic",
    "t1_price": "€5,500",
    "t1_period": "/ fixed sprint",
    "t1_desc": "Intensive 100% remote diagnostic targeting procurement spend variance, duplicate/bloated supplier contracts, and CMMS maintenance downtime logs.",
    "t1_roi_badge": "100% FEE CREDIT GUARANTEE",
    "t1_roi_text": "If we do not identify at least €16,500 in documented annual unit-price deltas, contract redundancies, or logged maintenance labor inefficiencies within 14 days, 100% of your €5,500 fee is credited toward an On-Site Audit or Fractional Retainer.",
    "t1_btn": "Select 14-Day Diagnostic",
    "t2_highlight": "[ FLAGSHIP EXECUTIVE RETAINER ]",
    "t2_badge": "SPEC-SHEET 03 // FRACTIONAL EXECUTIVE",
    "t2_name": "Fractional Direct Sourcing & Systems Director",
    "t2_price": "€8,500",
    "t2_period": "/ month",
    "t2_cadence": "2 Days/Week Equivalent • Async-First Execution",
    "t2_desc": "Continuous executive steering. Direct international factory negotiations in Asia/LATAM, CMMS governance (PostgreSQL/MSSQL), and automated ERP workflows.",
    "t2_term": "Term: 3-Month Initial Commitment · 30-Day Rolling Notice Thereafter",
    "t2_btn": "Select Fractional Retainer",
    "t3_badge": "SPEC-SHEET 02 // PHYSICAL PLANT AUDIT",
    "t3_name": "5-Day Physical Plant Walk & Takt Audit",
    "t3_price": "€5,400",
    "t3_period": "/ 5-day sprint (+ travel)",
    "t3_desc": "Physical gemba walks, moving-line and bottleneck takt timing, gage R&R / torque calibration checks, and an empirical 8D containment roadmap.",
    "t3_travel_note": "Client Covers Travel & Accommodation Strictly Under Corporate Policy",
    "t3_btn": "Request On-Site Plant Audit",
    "intake_kicker": "Confidential Triage",
    "intake_title": "Initiate Scoping Call or Asynchronous Briefing",
    "intake_subtitle": "Direct technical evaluation with the lead engineer under standard mutual non-disclosure.",
    "intake_badge_nda": "Bilateral Mutual NDA Enforced",
    "intake_point1": "NDAs signed automatically prior to confidential discussion",
    "intake_point2": "Direct technical review with lead engineer—not a sales rep",
    "intake_point3": "Invoiced via European Tax ID (excl. VAT / zzgl. MwSt.)",
    "opt1_kicker": "FASTEST ROUTE · ZERO FORMS",
    "opt1_title": "Option 1: 1-Click Direct Scoping Call",
    "opt1_desc": "Skip all form fields. Select an available 20-minute operational triage slot directly with Eduardo de Sousa via Cal.com.",
    "opt1_format_label": "Format:",
    "opt1_format_val": "1:1 Video Call (Google Meet)",
    "opt1_lead_label": "Lead:",
    "opt1_lead_val": "Eduardo de Sousa (Lead Engineer)",
    "opt1_legal_label": "Legal:",
    "opt1_legal_val": "Mutual NDA Enforced",
    "opt1_btn_cal": "Schedule 20-Min Video Scoping Call →",
    "opt1_whatsapp": "Direct WhatsApp",
    "opt1_email": "Direct Email",
    "opt2_kicker": "ASYNCHRONOUS TRIAGE · DIRECT ENTRY",
    "opt2_title": "Option 2: 3-Field Quick Briefing Dossier",
    "opt2_desc": "Prefer an asynchronous initial assessment? Submit your work contact details and primary operational bottleneck.",
    "field_name_label": "Full Name & Title *",
    "field_name_placeholder": "e.g. Marcus Vance, Director of Operations",
    "field_company_label": "Company / Manufacturing Plant Facility *",
    "field_company_placeholder": "e.g. AeroParts Precision GmbH",
    "field_email_label": "Corporate Work Email *",
    "field_email_placeholder": "e.g. m.vance@aeroparts.de",
    "field_bottleneck_label": "Primary Line Bottleneck / Objective",
    "field_bottleneck_placeholder": "e.g. Assembly line bottleneck causing 14 hrs/month downtime",
    "opt2_btn_submit": "Generate Mandate Dossier →",
    "opt2_submitting": "Logging Mandate Dossier...",
    "opt2_footer_note": "100% Confidential · Bilateral NDA Enforced · Direct Executive Review",
    "modal_title": "Mandate Dossier Successfully Registered",
    "modal_ref_label": "Mandate Reference ID:",
    "modal_nda_badge": "Mutual Non-Disclosure Agreement active. Your proprietary plant and sourcing data is strictly protected.",
    "modal_mandate_scope": "Selected Engagement Tier:",
    "modal_lead_label": "Assigned Lead:",
    "modal_btn_cal": "Proceed to 1-Click Calendar Booking (Cal.com) →",
    "modal_btn_whatsapp": "Confirm Mandate via WhatsApp Channel",
    "modal_btn_email": "Send Pre-Filled Email Confirmation",
    "modal_btn_return": "Return to Advisory Dossier",
    "footer_brand": "DE SOUSA // OPERATIONS & SUPPLY CHAIN ADVISORY",
    "footer_sub": "Executive Industrial Advisory · European Tax ID Invoicing · High-Tech Cleanrooms & Automotive OEM",
    "footer_nda": "Bilateral Mutual NDA Enforced Across All Engagements · All Rights Reserved © 2026",
    "calc_annual_recovery": "Annualized Recovery:",
    "mid_cta_badge": "100% FEE CREDIT GUARANTEE PROTECTED",
    "mid_cta_title": "Identify Auditable Profit Leaks In 14 Days",
    "mid_cta_subtitle": "Reserve your 14-Day Remote Diagnostic. If we do not uncover at least €16,500 in documented annual procurement deltas or logged downtime inefficiencies, 100% of your €5,500 fee is credited toward an on-site audit or fractional retainer.",
    "mid_cta_btn": "Book 14-Day Diagnostic →",
    "ribbon_direct_engagement": "DIRECT ENGAGEMENT",
    "nav_brand_sub_title": "Industrial Operations Advisory",
    "hero_telemetry_ecosystem": "TIER-1 & TIER-2 ASML ECOSYSTEM",
    "hero_benchmarks_title": "Verified Production & Sourcing Benchmarks",
    "calc_benchmark_badge": "Benchmark: €4,200/hr",
    "calc_per_month": "/mo",
    "calc_roi_badge_suffix": "x SPRINT ROI",
    "calc_slider_aria": "Monthly assembly & cleanroom downtime hours",
    "tab_p1_title": "Global Procurement",
    "tab_p2_title": "Moving Line Assembly",
    "tab_p3_title": "ASML Ecosystem",
    "dossier_active_badge": "ACTIVE DOSSIER",
    "dossier_hide_protocol": "Hide Protocol",
    "dmaic_case_evidence_title": "Empirical DMAIC Case Evidence",
    "tool1_tag": "ASSET CMMS",
    "tool1_status": "Dual-DB Engine",
    "tool1_scope": "PostgreSQL + MSSQL Sync",
    "tool2_tag": "SOURCING CADENCE",
    "tool2_status": "Automated PSI",
    "tool2_scope": "Shenzhen · Ningbo · India",
    "tool3_tag": "LINE TAKT",
    "tool3_status": "Real-Time MES",
    "tool3_title": "Takt & Micro-Stop Diagnostics",
    "tool3_scope": "110-120 cars/shift",
    "tool3_desc": "Automotive OEM moving assembly line cadence synchronization, digital torque logging, and 8D root cause tracking.",
    "tool4_tag": "EUV COMPLIANCE",
    "tool4_status": "ISO Class 5",
    "tool4_title": "Cleanroom Particulate Governance",
    "tool4_scope": "Brainport Eindhoven",
    "tool4_desc": "Electromechanical packaging traceability, TÜV hoisting recertification, and ISAH ERP lot tracking pipelines.",
    "tool_delivery_asset": "Standard Delivery Asset",
    "optiasset_kicker": "ENTERPRISE ASSET MANAGEMENT & WORK ORDER TELEMETRY",
    "optiasset_title": "OptiAsset CMMS: High-Availability Maintenance Telemetry",
    "optiasset_badge": "DUAL-DATABASE ENGINE",
    "optiasset_c1_title": "1. Real-Time Telemetry & Fault Isolation",
    "optiasset_c1_desc": "Continuous tracking of MTBF and MTTR across moving production cells. Direct IoT integration with automated work order generation under 200ms.",
    "optiasset_c2_title": "2. Dual Database Synchronizer",
    "optiasset_c2_desc": "Sub-second replication between local on-premise MSSQL line servers and executive PostgreSQL cloud reporting engines for zero-downtime auditing.",
    "optiasset_c3_title": "3. Automated Spare Parts BOM",
    "optiasset_c3_desc": "Safety stock threshold alerts linked directly to international vendor APIs, ensuring zero line stoppages caused by component stockouts.",
    "optiasset_footer_arch": "OptiAsset CMMS Architecture v4.2 · Production-Verified Enterprise Deployment",
    "optiasset_footer_engine": "PostgreSQL + MSSQL Dual Engine",
    "lead_active_badge": "Active Lead Mandate",
    "t1_duration": "14 Days",
    "t2_duration": "Monthly",
    "t2_commitment_badge": "EXECUTION COMMITMENT",
    "t3_duration": "5 Days",
    "t3_policy_badge": "ON-SITE POLICY",
    "dmaic_phase1_phase": "Define",
    "dmaic_phase1_title": "Problem Framing & COPQ Modeling",
    "dmaic_phase1_desc": "Formalize operational charter, scrap cost-of-poor-quality (COPQ), assembly bottlenecks, and line-stoppage risk matrices.",
    "dmaic_phase1_output": "Charter & Value Stream Map (VSM)",
    "dmaic_phase2_phase": "Measure",
    "dmaic_phase2_title": "Telemetry & Takt Baseline",
    "dmaic_phase2_desc": "Deploy digital torque wrench data acquisition, MES defect logging, and takt-time variance tracking under moving-line conditions.",
    "dmaic_phase2_output": "Baseline Capability (Cp/Cpk) & Takt Ledger",
    "dmaic_phase3_phase": "Analyze",
    "dmaic_phase3_title": "8D Root Cause & Ishikawa Isolation",
    "dmaic_phase3_desc": "Isolate true root cause vectors via 5-Why, Pareto stratification of assembly defects, and supplier material non-conformances.",
    "dmaic_phase3_output": "Validated 8D Root Cause Report",
    "dmaic_phase4_phase": "Improve",
    "dmaic_phase4_title": "Poka-Yoke & Line Re-Balancing",
    "dmaic_phase4_desc": "Implement mistake-proofing fixtures, standard work instructions, cleanroom assembly sequencing, and direct supplier PSI gating.",
    "dmaic_phase4_output": "-15% Defect Rate & -75% Sourcing Costs",
    "dmaic_phase5_phase": "Control",
    "dmaic_phase5_title": "SPC & ISAH ERP Traceability",
    "dmaic_phase5_desc": "Institutionalize Statistical Process Control (SPC), automated OptiAsset CMMS preventive maintenance triggers, and audit protocols.",
    "dmaic_phase5_output": "Sustained Operational Standard",
    "dmaic_deliverable_label": "Deliverable:",
    "agile_kicker": "AGILE ACCELERATION & GEMBA CADENCE",
    "agile_title": "Operational Scrum: 2-Week Kaizen Sprints & Daily Gemba Synchronization",
    "agile_subtitle": "Bridging Six Sigma statistical rigor with rapid agile execution cycles. Translating high-level executive throughput targets into daily floor-level velocity, immediate blocker escalation, and zero-bureaucracy standard work lock.",
    "agile_c1_sub": "Kaizen Sprint",
    "agile_c1_title": "2-Week Kaizen Sprints",
    "agile_c1_desc": "Time-boxed engineering sprints targeting high-priority micro-stops, torque calibration drift, and supplier defect escapes with explicit quantitative sprint goals.",
    "agile_c1_cadence": "Cadence: Bi-Weekly Iteration",
    "agile_c2_sub": "Floor Standup",
    "agile_c2_title": "Daily Gemba Standups",
    "agile_c2_desc": "Shift-start 15-minute floor huddles at the visual line board. Direct technical blocker escalation within 4 hours; eliminating inter-departmental email delays.",
    "agile_c2_escalation": "Escalation: 4-Hour SLA",
    "agile_c3_sub": "Flow Control",
    "agile_c3_title": "WIP Limits & Flow Throttling",
    "agile_c3_desc": "Rigid physical and digital Work-In-Progress caps across buffer stages to prevent moving line congestion, buffer overflow, and hidden queue cycle times.",
    "agile_c3_control": "Control: Continuous Flow",
    "agile_c4_sub": "Standard Work",
    "agile_c4_title": "Sprint Retro & Standard Work Lock",
    "agile_c4_desc": "Empirical quantification of cycle-time recovery, scrap reduction review, and locking validated improvements into digital MES SOPs before sprint closure.",
    "agile_c4_output": "Output: Immutable Standard",
    "field_tier_label": "Advisory Scope / Tier",
    "tier_opt_sprint": "14-Day Remote Spend & Telemetry Diagnostic (€5,500)",
    "tier_opt_fractional": "Fractional Direct Sourcing & Systems Director (€8,500/mo)",
    "tier_opt_onsite": "5-Day Physical Plant Walk & Takt Audit (€5,400)",
    "modal_company_label": "Company:",
    "footer_tax_notice": "Invoiced via European Tax ID · Brainport Eindhoven · Valencia",
    "hero_m4_iso_badge": "Semiconductor & Lithography Packaging Electromechanical & Logistic Work",
    "hero_m1_badge": "20 TEU / Qtr · Factory-Gate Direct",
    "hero_m2_badge": "30% Deposit / 70% Post-PSI Release",
    "hero_m3_badge": "Continuous Flow · -15% Defect Rate",
    "hero_m4_badge": "Semiconductor & Lithography Packaging Electromechanical & Logistic Work",
    "calc_rate_label": "Unplanned Line Stoppage Cost:",
    "calc_rate_unit": "€/hr",
    "calc_rate_benchmark": "European Benchmark: €4,200/hr",
    "calc_rate_min": "Min: €1,000/hr",
    "calc_rate_max": "Max: €12,000/hr (OEM Assembly)"
  },
  "es": {
    "status_ribbon": "CAPACIDAD Q4/Q1: 1 MANDATO DE ASESORÍA DISPONIBLE",
    "status_mode": "SPRINT REMOTO DE 14 DÍAS O AUDITORÍA EN PLANTA",
    "nav_brand_title": "DE SOUSA // ASESORÍA DE OPERACIONES Y CADENA DE SUMINISTRO",
    "nav_brand_sub": "Asesoría Operativa Principal · Automoción OEM y Salas Blancas de Alta Tecnología",
    "nav_pillars": "Pilares de Asesoría",
    "nav_cases": "Casos Verificados",
    "nav_tooling": "Sistemas Propios",
    "nav_methodology": "Rigor DMAIC",
    "nav_pedigree": "Perfil Ejecutivo",
    "nav_economics": "Tarifas y Alcance",
    "nav_cta": "Iniciar Diagnóstico",
    "hero_kicker": "Asesoría Ejecutiva de Operaciones Industriales y Cadena de Suministro",
    "hero_title": "Elimine Paradas de Planta y Escale Compras Directas con Precisión de Taller.",
    "hero_subtitle": "Asesoramiento a la dirección industrial en transformación operativa. Basado en protocolos de ensamblaje electromecánico en sala blanca (estándar ASML), cadencia y trabajo de planta Tier 1 y 2 en línea de montaje de automoción OEM y compras internacionales directas de gran volumen.",
    "hero_cta_primary": "Solicitar Diagnóstico Operativo",
    "hero_cta_secondary": "Revisar Historial Verificado",
    "hero_m1_val": "$800K / año Sourcing Directo",
    "hero_m1_label": "Sourcing Global · APAC",
    "hero_m1_sub": "Compras industriales directas en China e India en 20 contenedores/trimestre con auditorías PSI in situ.",
    "hero_m2_val": "-75% Reducción de Costos",
    "hero_m2_label": "Optimización de Costos · BOM",
    "hero_m2_sub": "Eliminación de intermediarios mediante contratos directos con fabricantes e inspecciones de embarque.",
    "hero_m3_val": "110–120 Autos / Turno",
    "hero_m3_label": "Automotriz OEM · Trabajo en Planta Tier 1 y 2",
    "hero_m3_sub": "Trabajo de planta Tier 1 y 2 y flujo continuo en línea móvil (BMW Group y MINI Cooper en VDL Nedcar) con torque digital.",
    "hero_m4_val": "HQ Pack Tier 2 & 3 en Ecosistema Semiconductores ASML",
    "hero_m4_label": "Semiconductores · High-Tech",
    "hero_m4_sub": "Ensamblaje electromecánico en sala blanca HQ Pack bajo protocolos ISO Clase 5 EUV (Brainport Eindhoven).",
    "calc_title": "Estimador de Impacto Financiero por Tiempos Muertos y Cuellos de Botella",
    "calc_badge": "Modelo Empírico de Coste de No Calidad (COPQ)",
    "calc_slider_label": "Tiempo Muerto Mensual / Cuello de Botella de Línea:",
    "calc_hours": "h/mes",
    "calc_benchmark": "Referencia Media Europea: 4.200 € / hora de parada no planificada",
    "calc_critical": "50h (Crisis de Planta)",
    "calc_loss_label": "Pérdida Mensual Estimada en Producción:",
    "calc_annual_label": "Pérdida Anualizada:",
    "calc_recovery_label": "Potencial de Recuperación del Sprint (-45%):",
    "calc_guarantee_note": "Garantía de Crédito del 100%: Si el diagnóstico de 14 días no documenta al menos 16.500 € en ahorro anual en compras o ineficiencias de mantenimiento, el 100% de los 5.500 € se acredita a una Auditoría en Planta o Retainer Fraccional.",
    "calc_cta": "Iniciar Sprint Diagnóstico de 14 Días →",
    "pillars_kicker": "Intervenciones Sistemáticas",
    "pillars_title": "Tres Pilares Fundamentales de la Práctica de Asesoría Industrial",
    "pillars_subtitle": "Diseñados para eliminar derivas operativas, reducir costes de materiales y aplicar un estricto control de calidad a nivel de taller y en centros logísticos.",
    "p1_kicker": "Pilar 01 // Compras Globales",
    "p1_title": "Aprovisionamiento Internacional Directo y Control de Calidad de Proveedores",
    "p1_desc": "Arquitectura 100% Remota. Desintermediación de brokers nacionales y establecimiento de contratos directos a salida de fábrica en Shenzhen, Ningbo e India. Despliegue de inspectores técnicos en planta (PSI y CLI) y contratos por hitos.",
    "p1_f1": "Negociación directa con fabricantes prescindiendo de intermediarios (-75% coste).",
    "p1_f2": "Equipos de inspección técnica en origen (PSI y CLI) bajo normas AQL.",
    "p1_f3": "Contratos estructurados por hitos (30% proforma / 70% contra informe PSI favorable).",
    "p1_drawer_btn": "Ver Protocolo de Compras en 5 Puntos",
    "p1_drawer_title": "Protocolo de 5 Puntos para Compras Directas y Auditoría de Proveedores",
    "p1_d1": "Homologación Directa de Fábricas: Auditoría documental completa, capacidad productiva y verificación de licencias de exportación en China e India.",
    "p1_d2": "Condiciones Comerciales y Pagos: 30% anticipo proforma, 70% liberado estrictamente contra certificado de inspección favorable en planta y Bill of Lading.",
    "p1_d3": "Muestreo Técnico PSI en Origen: Despliegue de inspectores locales ejecutando muestreos MIL-STD-105E / ISO 2859-1 antes del precintado de contenedores.",
    "p2_kicker": "Pillar 02 // Optimización de Línea",
    "p2_title": "Optimización de Línea de Fabricación y Disciplina de Takt Time",
    "p2_desc": "Basado en la disciplina de línea continua de automoción OEM (VDL Nedcar: BMW Group, MINI Cooper). Calibración digital de pares de apriete, eliminación de micro-paradas, registro en terminales MES y resolución 8D.",
    "p2_f1": "Sincronización de cadencia en línea de montaje continua (110–120 coches/turno).",
    "p2_f2": "Calibración de llaves dinamométricas digitales en chasis y ejes de ruedas.",
    "p2_f3": "Resolución de problemas mediante metodología 8D reduciendo defectos un 15%.",
    "p2_drawer_btn": "Ver Flujo de Equilibrado de Línea y Contención 8D",
    "p2_drawer_title": "Flujo de Trabajo de Equilibrado de Línea y Calidad 8D",
    "p2_d1": "Análisis de Tiempos de Ciclo y Takt: Cronometrajes en tiempo real para aislar micro-paradas y puestos cuello de botella.",
    "p2_d2": "Poka-Yoke y Calibración Digital: Herramientas dinamométricas calibradas con registro automático en MES para evitar desviaciones.",
    "p2_d3": "Contención de Defectos 8D: Medidas inmediatas en menos de 24 horas, causa raíz con diagrama de Ishikawa y acciones correctivas permanentes.",
    "p3_kicker": "Pillar 03 // Sala Blanca y Sistemas",
    "p3_title": "Ensamblaje en Sala Blanca de Alta Tecnología y Gobernanza Digital",
    "p3_desc": "Experiencia en el ecosistema de semiconductores de Brainport Eindhoven (HQ Pack: sistemas de embalaje litográfico ASML). Montaje electromecánico bajo norma ISO 14644-1 Clase 5, recertificación TÜV y trazabilidad en ERP ISAH con CMMS OptiAsset.",
    "p3_f1": "Protocolos de montaje electromecánico en sala blanca ISO Clase 5.",
    "p3_f2": "Trazabilidad de componentes en ERP ISAH y registro digitalizado de mantenimiento.",
    "p3_f3": "Arquitectura de base de datos dual propia en OptiAsset CMMS (PostgreSQL + MSSQL).",
    "p3_drawer_btn": "Ver Procedimientos de Sala Blanca y Trazabilidad ERP",
    "p3_drawer_title": "PNT de Sala Blanca ISO Clase 5 y Gobernanza ERP",
    "p3_d1": "Control de Contaminación por Partículas: Protocolos de vestimenta, verificación de flujo laminar y barreras contra descargas electrostáticas (ESD).",
    "p3_d2": "Gobernanza ERP a Nivel de Número de Serie: Registro de lotes en ERP ISAH asegurando 100% de trazabilidad para clientes de semiconductores.",
    "p3_d3": "Revisión y Conformidad TÜV: Diagnóstico de cableado y pruebas de carga en polipastos con 0 no conformidades en auditorías.",
    "cases_kicker": "Historial Empírico",
    "cases_title": "Casos Reales Verificados en Fabricación de Alta Precisión",
    "cases_subtitle": "Intervenciones operativas tangibles que generan mejoras medibles de margen, conformidad de calidad cero defectos y seguridad en la cadena de suministro.",
    "tab_case_sourcing": "Aprovisionamiento Global (800 k$)",
    "tab_case_automotive": "Automoción OEM (VDL Nedcar)",
    "tab_case_cleanroom": "Semiconductores (HQ Pack)",
    "c1_title": "800.000 $/año en Aprovisionamiento Internacional Directo y Desintermediación",
    "c1_client": "Distribuidor de Materiales de Construcción y Acabados Industriales · 11/2024 – Presente",
    "c1_challenge_title": "Desafío Operativo",
    "c1_challenge_text": "El cliente soportaba márgenes de intermediarios nacionales del 40% al 75%, plazos de entrega erráticos y frecuentes problemas de calidad en materiales a granel importados.",
    "c1_intervention_title": "Intervención Estratégica",
    "c1_intervention_text": "Reestructuración total de la cadena de suministro cerrando acuerdos directos a salida de fábrica en China e India. Despliegue de equipos de inspección técnica en origen (PSI y CLI) y estructuración de pagos por hitos (30% proforma / 70% contra visto bueno de inspección y Bill of Lading). Flujo de 20 contenedores marítimos por trimestre.",
    "c1_outcome_title": "Resultado Empírico",
    "c1_outcome_text": "Ahorro neto del 75% en compras de materiales, eliminación de sobrecostes comerciales y 100% de entregas conformes sin disputas contractuales.",
    "c1_metric_label": "Ahorro Neto en Costes",
    "c1_metric_val": "-75% en Coste de Compras",
    "c2_title": "Calidad en Línea de Montaje Continua de Automoción OEM y Calibración Dinamométrica",
    "c2_client": "VDL Nedcar (Born, Países Bajos) · BMW Group y MINI Cooper · 04/2022 – 11/2023",
    "c2_challenge_title": "Desafío Operativo",
    "c2_challenge_text": "Línea de montaje continua de alta cadencia (110–120 vehículos BMW y MINI Cooper por turno) con tiempos de ciclo estrictos, donde cualquier desviación de par o fallo de ensamblaje provocaba paradas de miles de euros.",
    "c2_intervention_title": "Intervención Estratégica",
    "c2_intervention_text": "Inspecciones de calidad en línea y calibración de precisión con llaves dinamométricas digitales en ejes y subconjuntos de chasis. Diagnóstico electrónico para aislar fallos, registro de telemetría en terminales MES y emisión de alertas 8D.",
    "c2_outcome_title": "Resultado Empírico",
    "c2_outcome_text": "Reducción del 15% en defectos repetitivos de montaje y 100% de conformidad en auditorías de calidad de BMW Group tanto en plataformas híbridas como de combustión.",
    "c2_metric_label": "Reducción de Defectos Repetitivos",
    "c2_metric_val": "-15% Tasa de Defectos",
    "c3_title": "Montaje Electromecánico en Sala Blanca de Semiconductores y Trazabilidad ERP",
    "c3_client": "HQ Pack (Eindhoven, Región Brainport) · Ecosistema ASML · 02/2024 – 07/2026",
    "c3_challenge_title": "Desafío Operativo",
    "c3_challenge_text": "Los módulos de embalaje y subensamblaje para equipos de litografía de ASML exigían cero contaminación por partículas (ISO Clase 5) y fiabilidad mecánica absoluta en polipastos certificados por TÜV.",
    "c3_intervention_title": "Intervención Estratégica",
    "c3_intervention_text": "Ensamblaje electromecánico de precisión, diagnóstico de cableados y puesta a punto de polipastos TÜV en sala blanca. Creación de un flujo de trabajo digitalizado y estandarizado para registro interno de averías, agilizando el seguimiento en ERP ISAH.",
    "c3_outcome_title": "Resultado Empírico",
    "c3_outcome_text": "Disminución del 30% en los tiempos de reparación, reducción del 22% en defectos recurrentes y 100% de aprobados en auditorías TÜV sin no conformidades críticas.",
    "c3_metric_label": "Reducción de Tiempo de Ciclo",
    "c3_metric_val": "-30% Tiempo de Reparación",
    "tooling_kicker": "Arquitectura de Software y Telemetría",
    "tooling_title": "Herramientas de Diagnóstico Propias y Flujos de Datos Automatizados",
    "tooling_subtitle": "Sistemas informáticos desarrollados a medida que se transfieren a la planta durante los mandatos de asesoría para asegurar una gobernanza duradera sin costes recurrentes.",
    "tooling_banner_badge": "HERRAMIENTAS PROPIAS // TRANSFERIDAS SIN COSTE DE LICENCIA",
    "tooling_banner_text": "NO ES UN SAAS COMERCIAL • Telemetría de activos, bases de datos de mantenimiento y modelos de cálculo de costes de importación transferidos a su equipo técnico durante sprints y asesorías, sin cuotas de software periódicas.",
    "tool1_title": "Arquitectura OptiAsset CMMS",
    "tool1_sub": "Motor Relacional Dual PostgreSQL + MSSQL",
    "tool1_desc": "Despacho de órdenes de trabajo en milisegundos, disparadores de mantenimiento preventivo y seguimiento de MTBF/MTTR para maquinaria de planta.",
    "tool2_title": "Pipeline de Compras Directas a Fábrica",
    "tool2_sub": "Integraciones con Make, Zapier y Webhooks",
    "tool2_desc": "Herramientas de desintermediación que automatizan inspecciones previas al embarque, liberaciones de conocimiento de embarque y control de costos BOM con -75% de ahorro.",
    "telemetry_table_title": "Cola Operativa y Estado de Activos en Vivo (OptiAsset)",
    "telemetry_table_sub": "Esquema representativo de planta · Flujo de trabajo operativo real",
    "telemetry_sync_badge": "PostgreSQL · Latencia de Sincronización: 1,2 ms",
    "dmaic_kicker": "Rigor Metodológico",
    "dmaic_title": "Ciclo DMAIC Lean Six Sigma",
    "dmaic_subtitle": "Cada proyecto se rige por el marco DMAIC de Black Belt en Lean Six Sigma, diseñado para convertir la variabilidad en planta y la volatilidad de proveedores en previsibilidad operativa continua.",
    "pedigree_kicker": "Liderazgo y Responsabilidad",
    "pedigree_title": "Asesoría Principal Impartida Directamente por el Ingeniero Jefe",
    "pedigree_subtitle": "Responsabilidad personal y directa. Cada mandato es diagnosticado, dirigido y ejecutado en persona por Eduardo de Sousa.",
    "lead_name": "Eduardo de Sousa",
    "lead_role": "Ingeniero Principal de Operaciones y Cadena de Suministro · Asesor Industrial",
    "lead_pledge_title": "Compromiso de Mandato Directo 1 a 1",
    "lead_pledge_text": "Al contratar De Sousa Advisory, usted trabaja directamente con Eduardo de Sousa. Sin gestores de cuentas junior, sin delegaciones a becarios y sin presentaciones teóricas vacías. Liderazgo técnico sobre el terreno en su fábrica y con sus proveedores.",
    "lead_btn_triage": "Agendar Sesión de 20 Min con Eduardo",
    "lead_btn_whatsapp": "Canal Directo de WhatsApp",
    "lead_btn_linkedin": "Perfil Verificado en LinkedIn ↗",
    "cred1_title": "Lean Six Sigma Black Belt",
    "cred1_inst": "Certificación DMAIC Máster · virtualbadge.io",
    "cred1_desc": "Control estadístico de procesos (SPC), diseño de experimentos (DOE), Kaizen y mapas de flujo de valor (VSM) para reducción sistemática de variabilidad y defectos.",
    "cred2_title": "Licenciatura en Operaciones y Procesos Gerenciales",
    "cred2_inst": "Grado Universitario Oficial",
    "cred2_desc": "Formación integral en dirección de operaciones, modelización de cadena de suministro, procesos de fabricación y economía de la producción.",
    "cred3_title": "Strategic Supply Chain Management",
    "cred3_inst": "Ludwig-Maximilians-Universität München (LMU Munich)",
    "cred3_desc": "Especialización ejecutiva alemana en resiliencia de la cadena de suministro internacional, gestión de riesgos geopolíticos y reducción del coste total de propiedad (TCO).",
    "cred4_title": "Google Data Analytics Professional",
    "cred4_inst": "Certificado Profesional Oficial de Google",
    "cred4_desc": "Extracción avanzada en SQL, depuración de datos operativos, cuadros de mando y modelos cuantitativos de toma de decisiones.",
    "pricing_kicker": "Transparencia Comercial",
    "pricing_title": "Mandatos de Asesoría Cerrados: Entregables Claros, Sin Desviación de Costes",
    "pricing_subtitle": "Sin tarifas por horas ambiguas. Precio cerrado por hito con umbrales de retorno claros y límites contractuales definidos.",
    "pricing_vat_notice": "IVA no incluido · Facturación con NIF Europeo · Acuerdo de Confidencialidad (NDA) Incluido",
    "t1_badge": "PLIEGO TÉCNICO 01 // DIAGNÓSTICO REMOTO",
    "t1_name": "Diagnóstico Remoto de Gasto y Telemetría (14 Días)",
    "t1_price": "5.500 €",
    "t1_period": "/ sprint cerrado",
    "t1_desc": "Diagnóstico intensivo 100% remoto de variaciones en compras, duplicidades en contratos de proveedores y registros de paradas en CMMS.",
    "t1_roi_badge": "GARANTÍA DE CRÉDITO DEL 100%",
    "t1_roi_text": "Si no identificamos al menos 16.500 € en desviaciones anuales de precio unitario, redundancias de contratos o ineficiencias de mano de obra en 14 días, el 100% de los 5.500 € se abona a una Auditoría en Planta o Retainer Fraccional.",
    "t1_btn": "Elegir Diagnóstico de 14 Días",
    "t2_highlight": "[ RETRACTOR EJECUTIVO PRINCIPAL ]",
    "t2_badge": "PLIEGO TÉCNICO 03 // DIRECCIÓN FRACCIONAL",
    "t2_name": "Director Fraccional de Sourcing Directo y Sistemas",
    "t2_price": "8.500 €",
    "t2_period": "/ mes",
    "t2_cadence": "Equivalente a 2 Días/Semana • Ejecución Asíncrona Preferente",
    "t2_desc": "Dirección ejecutiva continua. Negociación directa con fábricas en Asia/LATAM, gobernanza de CMMS (PostgreSQL/MSSQL) y automatización de flujos ERP.",
    "t2_term": "Compromiso Inicial de 3 Meses · Preaviso de 30 Días Posteriormente",
    "t2_btn": "Elegir Dirección Fraccional",
    "t3_badge": "PLIEGO TÉCNICO 02 // AUDITORÍA FÍSICA EN PLANTA",
    "t3_name": "Auditoría en Planta y Takt Time de 5 Días",
    "t3_price": "5.400 €",
    "t3_period": "/ sprint de 5 días (+ gastos)",
    "t3_desc": "Paseos gemba físicos en nave, cronometraje de takt en línea en movimiento y cuellos de botella, verificación gage R&R / calibración de par y hoja de ruta 8D.",
    "t3_travel_note": "Viaje y alojamiento a cargo del cliente según política de empresa",
    "t3_btn": "Solicitar Auditoría en Planta",
    "intake_kicker": "Evaluación Confidencial",
    "intake_title": "Agendar Reunión Técnica o Enviar Consulta Asíncrona",
    "intake_subtitle": "Evaluación técnica directa con el ingeniero principal bajo estricto acuerdo de confidencialidad mutuo.",
    "intake_badge_nda": "Acuerdo de Confidencialidad (NDA) Blindado",
    "intake_point1": "NDA firmado automáticamente antes de tratar datos confidenciales",
    "intake_point2": "Reunión técnica directa con el ingeniero responsable, sin comerciales",
    "intake_point3": "Facturación fiscal oficial con NIF Europeo (IVA intracomunitario exento si aplica)",
    "opt1_kicker": "VÍA MÁS RÁPIDA · SIN FORMULARIOS",
    "opt1_title": "Opción 1: Videollamada Directa de 20 Minutos",
    "opt1_desc": "Sin rellenar datos. Seleccione directamente un hueco disponible en el calendario con Eduardo de Sousa mediante Cal.com.",
    "opt1_format_label": "Formato:",
    "opt1_format_val": "Videollamada 1 a 1 (Google Meet)",
    "opt1_lead_label": "Responsable:",
    "opt1_lead_val": "Eduardo de Sousa (Ingeniero Principal)",
    "opt1_legal_label": "Aspecto Legal:",
    "opt1_legal_val": "NDA Mutuo Aplicado",
    "opt1_btn_cal": "Reservar Sesión de 20 Min en Calendario →",
    "opt1_whatsapp": "WhatsApp Directo",
    "opt1_email": "Correo Directo",
    "opt2_kicker": "VALORACIÓN ASÍNCRONA · ACCESO DIRECTO",
    "opt2_title": "Opción 2: Formulario Rápido de 3 Campos",
    "opt2_desc": "¿Prefiere una valoración previa por escrito? Envíe los datos corporativos y el principal reto operativo de su fábrica.",
    "field_name_label": "Nombre Completo y Cargo *",
    "field_name_placeholder": "ej. Marcos Valiente, Director de Operaciones",
    "field_company_label": "Empresa / Planta Industrial *",
    "field_company_placeholder": "ej. Manufacturas Industriales del Levante S.L.",
    "field_email_label": "Correo Electrónico Corporativo *",
    "field_email_placeholder": "ej. m.valiente@manufacturas.es",
    "field_bottleneck_label": "Cuello de Botella Principal / Reto de Planta",
    "field_bottleneck_placeholder": "ej. Paradas en línea de montaje que provocan 14 h/mes de tiempo muerto",
    "opt2_btn_submit": "Generar Ficha de Mandato →",
    "opt2_submitting": "Registrando Mandato...",
    "opt2_footer_note": "100% Confidencial · NDA Mutuo · Revisión Ejecutiva Directa",
    "modal_title": "Ficha de Mandato Registrada con Éxito",
    "modal_ref_label": "Código de Referencia:",
    "modal_nda_badge": "Acuerdo de Confidencialidad activo. La información técnica y de compras de su planta está estrictamente protegida.",
    "modal_mandate_scope": "Modalidad de Asesoría Seleccionada:",
    "modal_lead_label": "Ingeniero Asignado:",
    "modal_btn_cal": "Pasar a Reserva de Calendario (Cal.com) →",
    "modal_btn_whatsapp": "Confirmar por Canal de WhatsApp",
    "modal_btn_email": "Enviar Correo Pre-configurado",
    "modal_btn_return": "Volver a la Página Principal",
    "footer_brand": "DE SOUSA // ASESORÍA DE OPERACIONES Y CADENA DE SUMINISTRO",
    "footer_sub": "Asesoría Operativa Industrial · Facturación con NIF Europeo · Salas Blancas y Automoción OEM",
    "footer_nda": "Acuerdo de Confidencialidad Mutuo Aplicado en Todos los Mandatos · Todos los derechos reservados © 2026",
    "calc_annual_recovery": "Recuperación Anualizada:",
    "mid_cta_badge": "GARANTÍA DE CRÉDITO DEL 100% PROTEGIDA",
    "mid_cta_title": "Identifique Fugas Auditables de Rentabilidad en 14 Días",
    "mid_cta_subtitle": "Reserve su Diagnóstico Remoto de 14 Días. Si no documentamos al menos 16.500 € en desviaciones de compras o paradas de mantenimiento, el 100% de los 5.500 € se abona a su auditoría en planta o retainer.",
    "mid_cta_btn": "Reservar Diagnóstico de 14 Días →",
    "ribbon_direct_engagement": "COMPROMISO DIRECTO",
    "nav_brand_sub_title": "Asesoría de Operaciones Industriales",
    "hero_telemetry_ecosystem": "ECOSISTEMA ASML TIER-1 Y TIER-2",
    "hero_benchmarks_title": "Métricas Verificadas de Producción y Sourcing",
    "calc_benchmark_badge": "Referencia: 4.200 €/h",
    "calc_per_month": "/mes",
    "calc_roi_badge_suffix": "x ROI DE SPRINT",
    "calc_slider_aria": "Horas mensuales de inactividad en ensamblaje y salas blancas",
    "tab_p1_title": "Aprovisionamiento Global",
    "tab_p2_title": "Línea de Ensamblaje en Movimiento",
    "tab_p3_title": "Ecosistema ASML",
    "dossier_active_badge": "DOSSIER ACTIVO",
    "dossier_hide_protocol": "Ocultar Protocolo",
    "dmaic_case_evidence_title": "Evidencia Empírica de Casos DMAIC",
    "tool1_tag": "GMAO / CMMS DE ACTIVOS",
    "tool1_status": "Motor Dual-DB",
    "tool1_scope": "Sincronización PostgreSQL + MSSQL",
    "tool2_tag": "CADENCIA DE COMPRAS",
    "tool2_status": "PSI Automatizada",
    "tool2_scope": "Shenzhen · Ningbo · India",
    "tool3_tag": "TAKT DE LÍNEA",
    "tool3_status": "MES en Tiempo Real",
    "tool3_title": "Diagnóstico de Takt y Microparadas",
    "tool3_scope": "110-120 vehículos/turno",
    "tool3_desc": "Sincronización de cadencia en líneas móviles de OEM automotriz, registro digital de torque y seguimiento de causa raíz 8D.",
    "tool4_tag": "CUMPLIMIENTO EUV",
    "tool4_status": "ISO Clase 5",
    "tool4_title": "Gobernanza de Partículas en Sala Blanca",
    "tool4_scope": "Brainport Eindhoven",
    "tool4_desc": "Trazabilidad de empaques electromecánicos, recertificación de polipastos TÜV y control de lotes en ISAH ERP.",
    "tool_delivery_asset": "Entregable Estándar de Mandato",
    "optiasset_kicker": "GESTIÓN DE ACTIVOS EMPRESARIALES Y TELEMETRÍA DE ÓRDENES DE TRABAJO",
    "optiasset_title": "OptiAsset CMMS: Telemetría de Mantenimiento de Alta Disponibilidad",
    "optiasset_badge": "MOTOR DE BASE DE DATOS DUAL",
    "optiasset_c1_title": "1. Telemetría en Tiempo Real y Aislamiento de Fallas",
    "optiasset_c1_desc": "Seguimiento continuo de MTBF y MTTR en celdas de producción activas. Integración IoT directa con generación automatizada de órdenes de trabajo en menos de 200 ms.",
    "optiasset_c2_title": "2. Sincronizador de Base de Datos Dual",
    "optiasset_c2_desc": "Replicación en menos de un segundo entre servidores MSSQL locales en planta y motores de informes en la nube PostgreSQL para auditorías sin interrupciones.",
    "optiasset_c3_title": "3. BOM de Repuestos Automatizado",
    "optiasset_c3_desc": "Alertas de umbral de stock de seguridad conectadas directamente a APIs de proveedores internacionales, eliminando paradas de línea por falta de piezas.",
    "optiasset_footer_arch": "Arquitectura OptiAsset CMMS v4.2 · Despliegue Empresarial Verificado en Planta",
    "optiasset_footer_engine": "Motor Dual PostgreSQL + MSSQL",
    "lead_active_badge": "Mandato Principal Activo",
    "t1_duration": "14 Días",
    "t2_duration": "Mensual",
    "t2_commitment_badge": "COMPROMISO DE EJECUCIÓN",
    "t3_duration": "5 Días",
    "t3_policy_badge": "POLÍTICA IN SITU",
    "dmaic_phase1_phase": "Definir",
    "dmaic_phase1_title": "Definición del Problema y Modelo de COPQ",
    "dmaic_phase1_desc": "Formalizar el acta operativa, costo de mala calidad (COPQ) por mermas, cuellos de botella de ensamblaje y matrices de riesgo de paro de línea.",
    "dmaic_phase1_output": "Acta de Proyecto y Mapa de Flujo de Valor (VSM)",
    "dmaic_phase2_phase": "Medir",
    "dmaic_phase2_title": "Telemetría y Línea Base de Takt",
    "dmaic_phase2_desc": "Desplegar adquisición de datos con llaves dinamométricas digitales, registro de defectos en MES y seguimiento de varianza de takt time en línea móvil.",
    "dmaic_phase2_output": "Capacidad Inicial (Cp/Cpk) y Registro de Takt",
    "dmaic_phase3_phase": "Analizar",
    "dmaic_phase3_title": "Causa Raíz 8D y Aislamiento Ishikawa",
    "dmaic_phase3_desc": "Aislar vectores de causa raíz reales mediante 5-Porqués, estratificación de Pareto de defectos de ensamble y no conformidades de proveedores.",
    "dmaic_phase3_output": "Informe Validado de Causa Raíz 8D",
    "dmaic_phase4_phase": "Mejorar",
    "dmaic_phase4_title": "Poka-Yoke y Rebalanceo de Línea",
    "dmaic_phase4_desc": "Implementar dispositivos a prueba de errores, instrucciones de trabajo estándar, secuenciación en sala blanca y control PSI de proveedores.",
    "dmaic_phase4_output": "-15% Tasa de Defectos y -75% Costos de Compras",
    "dmaic_phase5_phase": "Controlar",
    "dmaic_phase5_title": "SPC y Trazabilidad en ISAH ERP",
    "dmaic_phase5_desc": "Institucionalizar Control Estadístico de Procesos (SPC), disparadores automatizados de mantenimiento preventivo en OptiAsset CMMS y protocolos de auditoría.",
    "dmaic_phase5_output": "Estándar Operativo Sostenido",
    "dmaic_deliverable_label": "Entregable:",
    "agile_kicker": "ACELERACIÓN ÁGIL Y CADENCIA GEMBA",
    "agile_title": "Scrum Operativo: Sprints Kaizen de 2 Semanas y Sincronización Diaria Gemba",
    "agile_subtitle": "Uniendo el rigor estadístico de Six Sigma con ciclos de ejecución ágil rápida. Traduciendo los objetivos ejecutivos de producción en velocidad diaria en planta, escalamiento inmediato de bloqueos y fijación de trabajo estándar sin burocracia.",
    "agile_c1_sub": "Sprint Kaizen",
    "agile_c1_title": "Sprints Kaizen de 2 Semanas",
    "agile_c1_desc": "Sprints de ingeniería con plazos fijos dirigidos a microparadas críticas, descalibración de torque y defectos de proveedores con metas cuantitativas precisas.",
    "agile_c1_cadence": "Cadencia: Iteración Quincenal",
    "agile_c2_sub": "Reunión de Planta",
    "agile_c2_title": "Standups Diarios en Gemba",
    "agile_c2_desc": "Reuniones de 15 minutos al inicio del turno frente al tablero visual de línea. Escalamiento de bloqueos técnicos en menos de 4 horas, eliminando demoras por correos.",
    "agile_c2_escalation": "Escalamiento: SLA de 4 Horas",
    "agile_c3_sub": "Control de Flujo",
    "agile_c3_title": "Límites WIP y Control de Flujo",
    "agile_c3_desc": "Límites estrictos de Trabajo en Curso (WIP) físicos y digitales en etapas de amortiguamiento para evitar congestión en línea y tiempos de cola ocultos.",
    "agile_c3_control": "Control: Flujo Continuo",
    "agile_c4_sub": "Trabajo Estándar",
    "agile_c4_title": "Retrospectiva de Sprint y Fijación de Trabajo Estándar",
    "agile_c4_desc": "Cuantificación empírica del tiempo de ciclo recuperado, revisión de reducción de scrap y fijación de mejoras en SOPs digitales de MES antes de cerrar el sprint.",
    "agile_c4_output": "Resultado: Estándar Inmutable",
    "field_tier_label": "Alcance / Nivel de Asesoría",
    "tier_opt_sprint": "Diagnóstico Remoto de Gasto y Telemetría de 14 Días (5.500 €)",
    "tier_opt_fractional": "Director Fraccional de Sourcing Directo y Sistemas (8.500 €/mes)",
    "tier_opt_onsite": "Auditoría en Planta y Takt Time de 5 Días (5.400 €)",
    "modal_company_label": "Empresa:",
    "footer_tax_notice": "Facturado con NIF Europeo · Brainport Eindhoven · Valencia",
    "hero_m4_iso_badge": "Trabajo Electromecánico y Logístico de Embalaje de Semiconductores y Litografía",
    "hero_m1_badge": "20 TEU / Trimestre · Directo de Fábrica",
    "hero_m2_badge": "30% Anticipo / 70% Tras Liberación PSI",
    "hero_m3_badge": "Flujo Continuo · -15% Defectos",
    "hero_m4_badge": "Trabajo Electromecánico y Logístico de Embalaje de Semiconductores y Litografía",
    "calc_rate_label": "Coste de Parada No Planificada:",
    "calc_rate_unit": "€/h",
    "calc_rate_benchmark": "Referencia Europea: 4.200 €/h",
    "calc_rate_min": "Mín: 1.000 €/h",
    "calc_rate_max": "Máx: 12.000 €/h (Montaje OEM)"
  },
  "nl": {
    "status_ribbon": "Q4/Q1 BESCHIKBAARHEID: 1 ADVIESMANDAAT BESCHIKBAAR",
    "status_mode": "14-DAGEN REMOTE SPRINT OF FYSIEKE FABRIEKSINSPECTIE",
    "nav_brand_title": "DE SOUSA // OPERATIONS & SUPPLY CHAIN ADVISORY",
    "nav_brand_sub": "Senior Industrieel Adviseur · Automotive OEM & High-Tech Cleanrooms",
    "nav_pillars": "Track Record",
    "nav_cases": "Geverifieerde Cases",
    "nav_tooling": "Eigen Systemen",
    "nav_methodology": "DMAIC Discipline",
    "nav_pedigree": "Directieprofiel",
    "nav_economics": "Diensten",
    "nav_cta": "Start Scoping",
    "hero_kicker": "Tier-1 & Tier-2 ASML Ecosysteem // Senior Industrieel Operationeel Advies",
    "hero_title": "Elimineer Fabrieksstilstand en Schaal Directe Fabrieksinkoop met Werkvloerprecisie.",
    "hero_subtitle": "Advies aan industriële directies over operationele transformatie. Gegrondvest in Tier-1 & Tier-2 ASML cleanroom elektromechanische assemblageprotocollen, hoog-takt automotive OEM lopende band doorvoer, en grootschalige directe internationale inkoop.",
    "hero_cta_primary": "Vraag Operationele Diagnostiek Aan",
    "hero_cta_secondary": "Bekijk Geverifieerde Track Record",
    "hero_m1_val": "$800K / jaar Directe Inkoop",
    "hero_m1_label": "Wereldwijde Inkoop · APAC",
    "hero_m1_sub": "Directe industriële inkoop in China & India over 20 containers/kwartaal met on-site PSI audits.",
    "hero_m2_val": "-75% Kostenbesparing",
    "hero_m2_label": "Kostenoptimalisatie · BOM",
    "hero_m2_sub": "Tussenpersonen geëlimineerd via directe fabrieksovereenkomsten en kwaliteitsvrijgaven op locatie.",
    "hero_m3_val": "110–120 Wagens / Ploeg",
    "hero_m3_label": "Automotive OEM · Tier 1 & 2 Vloeroperaties",
    "hero_m3_sub": "Tier 1 & Tier 2 werkvloeroperaties en lopende band continu flow (BMW Group & MINI Cooper bij VDL Nedcar) met digitale koppelbewaking.",
    "hero_m4_val": "HQ Pack Tier 2 & 3 in ASML Halfgeleider Ecosysteem",
    "hero_m4_label": "Halfgeleiders · High-Tech",
    "hero_m4_sub": "HQ Pack cleanroom elektromechanische assemblage onder ISO Klasse 5 EUV-protocollen (Brainport Eindhoven).",
    "calc_title": "Schatting Financiële Impact van Fabrieksstilstand & Knelpunten",
    "calc_badge": "Empirisch COPQ-Model",
    "calc_slider_label": "Maandelijkse Lijnstilstand / Procesknelpunt:",
    "calc_hours": "uur/mnd",
    "calc_benchmark": "Europese Benchmark: €4.200 / uur ongeplande stilstand",
    "calc_critical": "Kritieke Stilstand (Fabriekscrisis)",
    "calc_loss_label": "Geschatte Maandelijkse Productiehemorragie:",
    "calc_annual_label": "Jaarlijks Verlies:",
    "calc_recovery_label": "Geprojecteerd Sprint-Herstelpotentieel (~45%):",
    "calc_guarantee_note": "100% Fee-Tegoed Garantie: Als de 14-dagen diagnostiek niet minstens €16.500 aan gedocumenteerde jaarlijkse inkoopbesparingen of onderhoudsverliezen aantoont, wordt 100% van het €5.500 honorarium gecrediteerd voor een On-Site Audit of Parttime Mandaat.",
    "calc_cta": "Vraag Operationele Sprint Aan →",
    "pillars_kicker": "Systematische Interventies",
    "pillars_title": "Drie Kernpijlers van Industriële Adviespraktijk",
    "pillars_subtitle": "Ontworpen om operationele afwijkingen te elimineren, materiaalkosten te verlagen en vloerdiscipline af te dwingen zonder theoretische agency-overhead.",
    "p1_kicker": "Pijler 01 // Wereldwijde Inkoop",
    "p1_title": "Directe Internationale Inkoop & Leverancierskwaliteitsborging",
    "p1_desc": "100% Remote Architectuur. Uitschakeling van binnenlandse tussenhandelaren en opzet van directe fabriekscontracten in Shenzhen, Ningbo en India. Selectie en inzet van lokale inspectieteams (PSI & CLI) en risicobeperkende mijlpaalcontracten.",
    "p1_f1": "Directe fabrieksonderhandelingen zonder tussenpersonen (-75% BOM-kosten).",
    "p1_f2": "Lokale technische inspectieteams (PSI & CLI) die AQL-standaarden handhaven.",
    "p1_f3": "Gestructureerde mijlpaalbetalingen (30% proforma / 70% na PSI-vrijgave).",
    "p1_drawer_btn": "Bekijk 5-Stappen Inkoop Governance Protocol",
    "p1_drawer_title": "5-Stappen Direct Inkoop- & Leveranciersauditprotocol",
    "p1_d1": "Fabrieksaudit: Volledige antecedentencontrole, verificatie van productiecapaciteit en controle van ISO 9001 certificaten.",
    "p1_d2": "Commerciële Vergrendeling: 30% aanbetaling, 70% uitsluitend vrijgegeven na slagen van Pre-Shipment Inspection (PSI).",
    "p1_d3": "On-Site PSI Bemonstering: Lokale kwaliteitsingenieurs voeren MIL-STD-105E / ISO 2859-1 AQL II steekproeven uit.",
    "p2_kicker": "Pijler 02 // Lijnoptimalisatie",
    "p2_title": "Productielijnoptimalisatie & Takt-Tijd Discipline",
    "p2_desc": "Gegrondvest in automotive OEM lopende band discipline (VDL Nedcar: BMW Group & MINI Cooper). Takt-tijd synchronisatie van 110–120 eenheden/shift, kalibratie van digitaal koppelgereedschap en 8D-foutoorzaakanalyse.",
    "p2_f1": "Lopende band cadanssynchronisatie (110–120 auto's per shift).",
    "p2_f2": "Digitale momentsleutelkalibratie op chassis- en wielasassemblages.",
    "p2_f3": "8D foutoorzaakanalyse die terugkerende defecten met 15% reduceert.",
    "p2_drawer_btn": "Bekijk Lijnbalancering & 8D Beheersingsworkflow",
    "p2_drawer_title": "Assemblagelijnbalancering & 8D Kwaliteitsworkflow",
    "p2_d1": "Takt-Tijd Harmonisatie: Herverdeling van werkstations om flessenhalsstations onder de doeltaktcyclus van 60 seconden te brengen.",
    "p2_d2": "Torque Traceability: Digitale momentsleutelintegratie met geautomatiseerde hoek- en koppelregistratie per VIN/serienummer.",
    "p2_d3": "8D Escalatieprotocol: Onmiddellijke insluiting binnen 2 uur, Ishikawa visgraatanalyse binnen 24 uur en definitieve Poka-Yoke binnen 7 dagen.",
    "p3_kicker": "Pijler 03 // Halfgeleiderverpakking",
    "p3_title": "ASML Cleanroom & Halfgeleider Elektromechanische Verpakking",
    "p3_desc": "Gereputeerd Brainport Eindhoven toeleveranciersnetwerk (HQ Pack). ISO Klasse 5 & 6 cleanroomprotocollen, ESD-beheersing en stikstofspoelingsverpakking voor ASML EUV lithografiemodules.",
    "p3_f1": "ISO Klasse 5 & Klasse 6 cleanroom procesconformiteit.",
    "p3_f2": "ESD- en partikelcontaminatiepreventie voor EUV optische modules.",
    "p3_f3": "Stikstofspoelingsprotocollen met vacuüm- en vochtigheidsmonitoring.",
    "p3_drawer_btn": "Bekijk Cleanroom Partikel- & ESD-Beheersingsprotocol",
    "p3_drawer_title": "Cleanroom Partikelbeheersing & ESD-Protocol",
    "p3_d1": "Partikelmonitoring: Continue laser-partikeltellers die ISO 14644-1 Klasse 5 limieten (<3.520 partikels/m³ bij ≥0,5 µm) bewaken.",
    "p3_d2": "ESD-Aarding & Oppervlakteweerstand: ANSI/ESD S20.20 certificering met oppervlakteresistentie tussen 10^6 en 10^9 ohm.",
    "p3_d3": "Hermetische N2-Verpakking: Drievoudige barrièrefolie met gecontroleerde restzuurstof (<0,1%) voor ASML EUV transport.",
    "cases_kicker": "Empirische Validatie",
    "cases_title": "Geverifieerde Industriële Resultaten",
    "cases_subtitle": "Gedocumenteerde casestudy's uit directe industriële mandaten met meetbare ROI en operationele prestatie-indicatoren.",
    "tab_case_sourcing": "Internationale Inkoop",
    "tab_case_automotive": "Automotive OEM Lijn",
    "tab_case_cleanroom": "Cleanroom Halfgeleiders",
    "c1_title": "$800.000/jaar Directe Internationale Inkoop & Keten-Uitschakeling",
    "c1_client": "MKB Fabrikant van Bouw- & Industriële Componenten",
    "c1_challenge_title": "Operationele Uitdaging",
    "c1_challenge_text": "Klant werd geconfronteerd met 40%–75% opslagen door binnenlandse importeurs, onvoorspelbare leveringsvertragingen en ernstige kwaliteitsschommelingen bij geïmporteerde bulkmaterialen.",
    "c1_intervention_title": "Strategische Interventie",
    "c1_intervention_text": "Volledige keten-uitschakeling gerealiseerd. Directe fabrieksovereenkomsten opgezet in Shenzhen en Ningbo met on-site Pre-Shipment Inspection (PSI) teams en gestructureerde betalingsmijlpalen.",
    "c1_outcome_title": "Empirisch Resultaat",
    "c1_outcome_text": "75% margeverhoging op ingekochte componenten, 20 containers per kwartaal betrouwbaar beheerd en jaarlijkse inkoopbesparing van $800.000 gerealiseerd.",
    "c1_metric_label": "Kostenbesparing & Margegroei",
    "c1_metric_val": "$800K/jaar (-75% BOM)",
    "c2_title": "110–120 Eenheden/Shift Moving Line Assemblage & Takt-Harmonisatie",
    "c2_client": "VDL Nedcar (Contractfabrikant voor BMW Group & MINI Cooper)",
    "c2_challenge_title": "Operationele Uitdaging",
    "c2_challenge_text": "Takt-onbalans en micro-stops op de bewegende assemblagelijn veroorzaakten cyclustijdvariantie en defectontsnappingen bij chassis- en wielasverbindingen.",
    "c2_intervention_title": "Strategische Interventie",
    "c2_intervention_text": "Lijnbalancering doorgevoerd met digitale momentsleutelkalibratie, 8D foutoorzaakonderzoek en gestandaardiseerde werkinstructies volgens BMW Group kwaliteitsnormen.",
    "c2_outcome_title": "Empirisch Resultaat",
    "c2_outcome_text": "Continue lijncadans van 110–120 auto's/shift gehandhaafd met een reductie van 15% in terugkerende afwijkingen en nul escalaties naar eindklanten.",
    "c2_metric_label": "Lijndoorvoer & Kwaliteit",
    "c2_metric_val": "110–120 Auto's/Shift",
    "c3_title": "ISO Klasse 5 Cleanroom Verpakking voor ASML EUV Lithografiemodules",
    "c3_client": "HQ Pack (Gespecialiseerd Toeleverancier ASML Ecosysteem Brainport)",
    "c3_challenge_title": "Operationele Uitdaging",
    "c3_challenge_text": "Strikte contaminatie- en ESD-specificaties voor ASML EUV lithografieonderdelen vereisten zero-defect cleanroomverpakking onder ISO 14644-1 Klasse 5 condities.",
    "c3_intervention_title": "Strategische Interventie",
    "c3_intervention_text": "Cleanroomverpakkingsproces opgezet met continue partikelbewaking, gevalideerde stikstofspoelingsprotocollen en hermetische sealverificatie.",
    "c3_outcome_title": "Empirisch Resultaat",
    "c3_outcome_text": "100% auditconformiteit behaald bij ASML Tier-1 acceptatietests, met volledige partikel- en ESD-traceerbaarheid per zending.",
    "c3_metric_label": "Cleanroom Conformiteit",
    "c3_metric_val": "ISO Klasse 5 / Zero-Contaminatie",
    "tooling_kicker": "Operationele Technologie",
    "tooling_title": "Eigen Diagnostische Systemen & Geautomatiseerde Datapipelines",
    "tooling_subtitle": "Geen theoretische managementadviezen: wij implementeren lichte, productieve tools die direct aansluiten op uw industriële werkvloer.",
    "tooling_banner_badge": "Geen Softwarelicentiekosten",
    "tooling_banner_text": "Alle diagnostische tools worden overgedragen als bedrijfseigen intellectueel eigendom van de klant. Nul maandelijkse SaaS-abonnementskosten.",
    "tool1_title": "OptiAsset CMMS Architectuur",
    "tool1_sub": "Preventief & Correctief Onderhoudssysteem",
    "tool1_desc": "Sub-seconde werkorderdistributie, triggers voor preventief onderhoud en MTBF/MTTR-monitoring voor fabrieksmachines.",
    "tool2_title": "Directe Fabrieksinkooppijplijn",
    "tool2_sub": "Internationale Inkoop- & Kwaliteitstracker",
    "tool2_desc": "Desintermediatietools voor geautomatiseerde inspecties vóór verzending, vrachtbriefvrijgaven en -75% BOM-kostenbeheersing.",
    "telemetry_table_title": "Geverifieerde Technische Systeemspecificaties",
    "telemetry_table_sub": "Overzicht van operationele standaarden en auditparameters die tijdens mandaten worden gehanteerd:",
    "telemetry_sync_badge": "Real-Time Vloerintegratie",
    "dmaic_kicker": "Bewezen Methodiek",
    "dmaic_title": "Lean Six Sigma DMAIC-Levenscyclus & Kaizen Sprints",
    "dmaic_subtitle": "Gestructureerde wiskundige en operationele fasering om fabrieksvariatie en faalkosten permanent te elimineren.",
    "pedigree_kicker": "Direct Adviesmandaat",
    "pedigree_title": "Profiel & Persoonlijke Verantwoordelijkheid van de Ingenieur",
    "pedigree_subtitle": "U werkt direct 1-op-1 met een ervaren hoofdingenieur. Geen junior consultants, geen accountmanagers, geen theoretische powerpoints.",
    "lead_name": "Eduardo de Sousa",
    "lead_role": "Senior Industrieel Adviseur · Operaties & Supply Chain",
    "lead_pledge_title": "Direct 1-op-1 Ingenieursmandaat Garantie",
    "lead_pledge_text": "\"Wanneer u een mandaat toevertrouwt, krijgt u mijn directe persoonlijke betrokkenheid op de werkvloer en in uw directiekamer. Elk protocol, elke data-analyse en elke procesaanpassing wordt door mij persoonlijk ontworpen, gevalideerd en afgetekend.\"",
    "lead_btn_triage": "Plan 20-Minuten Intake",
    "lead_btn_whatsapp": "Direct WhatsApp Contact",
    "lead_btn_linkedin": "Geverifieerd Profiel op LinkedIn ↗",
    "cred1_title": "Master Industriële Bedrijfsvoering",
    "cred1_inst": "Universiteit Valencia (ETSII)",
    "cred1_desc": "Gespecialiseerd in fabriekslay-out, productielijnontwerp en kwantitatieve logistieke modellen.",
    "cred2_title": "BSc Werktuigbouwkunde",
    "cred2_inst": "Universiteit Valencia (ETSII)",
    "cred2_desc": "Mechanisch ontwerp, thermodynamica, fabricageprocessen en materiaalkunde.",
    "cred3_title": "Lean Six Sigma Black Belt",
    "cred3_inst": "Industriële Certificering",
    "cred3_desc": "Statistische procesbeheersing (SPC), meetysteemanalyse (MSA) en DMAIC projectuitvoering.",
    "cred4_title": "Professionele Ervaring Automotive & High-Tech",
    "cred4_inst": "VDL Nedcar & HQ Pack",
    "cred4_desc": "Jarenlange directe werkvloerverantwoordelijkheid in BMW Group OEM en ASML Tier-1 faciliteiten.",
    "pricing_kicker": "Duidelijke Mandaten",
    "pricing_title": "Vaste Adviesmandaten: Heldere Entregables, Geen Verborgen Kosten",
    "pricing_subtitle": "Geen vage uurtarieven of open eindjes. Scherpe vaste projecttarieven met bindende resultaatverplichting en ROI-garantie.",
    "pricing_vat_notice": "Alle tarieven zijn exclusief BTW en reiskosten conform Europese B2B richtlijnen.",
    "t1_badge": "SPEC-SHEET 01 // REMOTE DIAGNOSTIEK",
    "t1_name": "14-Dagen Remote Spend & Telemetrie Diagnostiek",
    "t1_price": "€5.500",
    "t1_period": "/ vast sprint-tarief",
    "t1_desc": "Intensieve 100% remote audit gericht op inkoopvarianties, redundante leverancierscontracten en CMMS-onderhoudsstilstanden.",
    "t1_roi_badge": "100% FEE-TEGOED GARANTIE",
    "t1_roi_text": "Als we niet minstens €16.500 aan gedocumenteerde jaarlijkse prijsverschillen, contractredundanties of onderhoudsverliezen aantonen binnen 14 dagen, wordt 100% van uw €5.500 fee gecrediteerd naar een On-Site Audit of Parttime Retainer.",
    "t1_btn": "Kies 14-Dagen Diagnostiek",
    "t2_highlight": "[ VASTLEGGEND DIRECTIEMANDAAT ]",
    "t2_badge": "SPEC-SHEET 03 // PARTTIME DIRECTEUR",
    "t2_name": "Parttime Direct Sourcing & Systems Director",
    "t2_price": "€8.500",
    "t2_period": "/ maand",
    "t2_cadence": "Equivalent van 2 Dagen/Week • Async-First Uitvoering",
    "t2_desc": "Continue operationele leiding. Directe fabrieksonderhandelingen in Azië/LATAM, CMMS-governance (PostgreSQL/MSSQL) en geautomatiseerde ERP-processen.",
    "t2_term": "Minimale inzet 3 maanden · 30 dagen opzegtermijn nadien",
    "t2_btn": "Kies Parttime Mandaat",
    "t3_badge": "SPEC-SHEET 02 // FYSIEKE FABRIEKSAUDIT",
    "t3_name": "5-Dagen Fysieke Fabrieksinspectie & Takt-Audit",
    "t3_price": "€5.400",
    "t3_period": "/ 5-dagen sprint (+ reiskosten)",
    "t3_desc": "Fysieke gemba walks, takt-tijdmetingen op bewegende lijnen, gage R&R / momentsleutelkalibratie en een 8D-inperkingsroadmap.",
    "t3_travel_note": "Reis- en verblijfkosten conform bedrijfsbeleid van de opdrachtgever",
    "t3_btn": "Vraag Fabrieksinspectie Aan",
    "intake_kicker": "Direct Contact",
    "intake_title": "Plan een Technische Intake of Stuur een Asynchrone Briefing",
    "intake_subtitle": "Direct overleg met de hoofdingenieur onder strikte wederzijdse geheimhouding (Bilateral NDA).",
    "intake_badge_nda": "Geheimhouding Gegarandeerd",
    "intake_point1": "Geen verkoopgesprek: u spreekt direct met de lead engineer over uw technische uitdagingen.",
    "intake_point2": "Binnen 24 uur een eerste schriftelijke triagebeoordeling.",
    "intake_point3": "Directe geheimhoudingsverklaring (NDA) automatisch van toepassing op alle gedeelde procesdata.",
    "opt1_kicker": "Snelste Route · Geen Formulieren",
    "opt1_title": "Optie 1: Direct 1-op-1 Video-Overleg Inplannen",
    "opt1_desc": "Kies direct een beschikbaar tijdslot van 20 minuten in de agenda van Eduardo de Sousa via Cal.com.",
    "opt1_format_label": "Format:",
    "opt1_format_val": "1-op-1 Videogesprek (Google Meet)",
    "opt1_lead_label": "Ingenieur:",
    "opt1_lead_val": "Eduardo de Sousa (Lead Engineer)",
    "opt1_legal_label": "Geheimhouding:",
    "opt1_legal_val": "Wederzijdse NDA Van Toepassing",
    "opt1_btn_cal": "Plan 20-Minuten Videogesprek →",
    "opt1_whatsapp": "Direct WhatsApp Bericht",
    "opt1_email": "Directe E-mail",
    "opt2_kicker": "Asynchrone Triage · Directe Invoer",
    "opt2_title": "Optie 2: Beknopte 3-Vaks Projectbriefing",
    "opt2_desc": "Geeft u de voorkeur aan een eerste schriftelijke beoordeling? Vul uw contactgegevens en operationele knelpunten in.",
    "field_name_label": "Volledige Naam & Functie *",
    "field_name_placeholder": "bijv. Ir. Jan van den Berg, Operationeel Directeur",
    "field_company_label": "Bedrijfsnaam / Productielocatie *",
    "field_company_placeholder": "bijv. Brabant Mechatronica BV",
    "field_email_label": "Zakelijk E-mailadres *",
    "field_email_placeholder": "bijv. j.vandenberg@brabantmechatronica.nl",
    "field_bottleneck_label": "Primair Operationeel Knelpunt / Doelstelling",
    "field_bottleneck_placeholder": "bijv. Lijnstilstand van circa 14 uur per maand op assemblagelijn 2",
    "opt2_btn_submit": "Verstuur Mandaatdossier →",
    "opt2_submitting": "Dossier Wordt Versleuteld...",
    "opt2_footer_note": "100% Vertrouwelijk · Wederzijdse NDA van kracht · Directe beoordeling door hoofdingenieur",
    "modal_title": "Mandaatdossier Succesvol Geregistreerd",
    "modal_ref_label": "Mandaatreferentie:",
    "modal_nda_badge": "Wederzijdse NDA Geactiveerd",
    "modal_mandate_scope": "Geselecteerde Adviesomvang:",
    "modal_lead_label": "Toegewezen Ingenieur:",
    "modal_btn_cal": "Koppel Agenda via Cal.com →",
    "modal_btn_whatsapp": "Bevestig via WhatsApp Direct",
    "modal_btn_email": "Kopie Verzenden via E-mail",
    "modal_btn_return": "Sluit Venster & Keer Terug",
    "footer_brand": "DE SOUSA // OPERATIONS & SUPPLY CHAIN ADVISORY",
    "footer_sub": "Onafhankelijk Industrieel Advies voor Automotive OEM & Cleanroom Halfgeleider Assemblagefaciliteiten.",
    "footer_nda": "Bilateral Mutual NDA Gegarandeerd Over Alle Mandaten · Alle Rechten Voorbehouden © 2026",
    "calc_annual_recovery": "Jaarlijks Herstel:",
    "mid_cta_badge": "100% FEE-TEGOED GARANTIE",
    "mid_cta_title": "Identificeer Auditeerbare Rendementslekken Binnen 14 Dagen",
    "mid_cta_subtitle": "Reserveer uw 14-dagen remote diagnostiek. Vinden we niet minstens €16.500 aan gedocumenteerde inkoop- of onderhoudslekken, dan wordt 100% van uw investering gecrediteerd naar een audit op locatie of retainer.",
    "mid_cta_btn": "Boek 14-Dagen Diagnostiek →",
    "ribbon_direct_engagement": "DIRECTE ENGAGEMENT",
    "nav_brand_sub_title": "Industrieel Operationeel Advies",
    "hero_telemetry_ecosystem": "TIER-1 & TIER-2 ASML ECOSYSTEEM",
    "hero_benchmarks_title": "Geverifieerde Productie- en Inkoopbenchmarks",
    "calc_benchmark_badge": "Benchmark: €4.200/uur",
    "calc_per_month": "/mnd",
    "calc_roi_badge_suffix": "x SPRINT ROI",
    "calc_slider_aria": "Maandelijkse stilstanduren assemblage & cleanroom",
    "tab_p1_title": "Wereldwijde Inkoop",
    "tab_p2_title": "Continu Assemblagelijn",
    "tab_p3_title": "ASML Ecosysteem",
    "dossier_active_badge": "ACTIEF DOSSIER",
    "dossier_hide_protocol": "Protocol Verbergen",
    "dmaic_case_evidence_title": "Empirisch DMAIC Casusbewijs",
    "tool1_tag": "ASSET CMMS",
    "tool1_status": "Dual-DB Engine",
    "tool1_scope": "PostgreSQL + MSSQL Synchronisatie",
    "tool2_tag": "INKOOPCADANS",
    "tool2_status": "Geautomatiseerde PSI",
    "tool2_scope": "Shenzhen · Ningbo · India",
    "tool3_tag": "LIJNTAKT",
    "tool3_status": "Realtime MES",
    "tool3_title": "Takt- & Micro-Stop Diagnostiek",
    "tool3_scope": "110-120 wagens/ploeg",
    "tool3_desc": "Cadanssynchronisatie voor continu assemblagelijnen in automotive OEM, digitale koppelregistratie en 8D-oorzaakopsporing.",
    "tool4_tag": "EUV COMPLIANCE",
    "tool4_status": "ISO Klasse 5",
    "tool4_title": "Cleanroom Deeltjesbeheer",
    "tool4_scope": "Brainport Eindhoven",
    "tool4_desc": "Traceerbaarheid van elektromechanische verpakkingen, TÜV-hijshisrecertificering en ISAH ERP-batchtracking.",
    "tool_delivery_asset": "Standaard Opleveringsonderdeel",
    "optiasset_kicker": "ENTERPRISE ASSET MANAGEMENT & WERKORDERTELEMETRIE",
    "optiasset_title": "OptiAsset CMMS: Hoge Beschikbaarheid Onderhoudstelemetrie",
    "optiasset_badge": "DUAL-DATABASE ENGINE",
    "optiasset_c1_title": "1. Realtime Telemetrie & Foutisolatie",
    "optiasset_c1_desc": "Continue monitoring van MTBF en MTTR over actieve productiecellen. Directe IoT-koppeling met geautomatiseerde werkordergeneratie onder 200ms.",
    "optiasset_c2_title": "2. Dual-Database Synchronisator",
    "optiasset_c2_desc": "Sub-seconde replicatie tussen lokale on-premise MSSQL lijnservers en centrale PostgreSQL cloudrapportage voor audits zonder uitval.",
    "optiasset_c3_title": "3. Geautomatiseerde Reserveonderdelen-BOM",
    "optiasset_c3_desc": "Veiligheidsvoorraad-drempelmeldingen gekoppeld aan internationale leveranciers-APIs, ter voorkoming van lijnstilstand door ontbrekende componenten.",
    "optiasset_footer_arch": "OptiAsset CMMS Architectuur v4.2 · Productieverifieerde Enterprise Implementatie",
    "optiasset_footer_engine": "PostgreSQL + MSSQL Dual Engine",
    "lead_active_badge": "Actief Lead-Mandaat",
    "t1_duration": "14 Dagen",
    "t2_duration": "Maandelijks",
    "t2_commitment_badge": "UITVOERINGSVERBINTENIS",
    "t3_duration": "5 Dagen",
    "t3_policy_badge": "ON-SITE BELEID",
    "dmaic_phase1_phase": "Definieer",
    "dmaic_phase1_title": "Probleemkader & COPQ Modellering",
    "dmaic_phase1_desc": "Formaliseer het operationele handvest, afvalkosten van slechte kwaliteit (COPQ), assemblageknelpunten en risicomatrices voor lijnstilstand.",
    "dmaic_phase1_output": "Handvest & Waardestroomanalyse (VSM)",
    "dmaic_phase2_phase": "Meten",
    "dmaic_phase2_title": "Telemetrie & Takt Nulmeting",
    "dmaic_phase2_desc": "Inzet van digitale momentsleutels voor data-acquisitie, MES-foutregistratie en opvolging van takttijdvariantie onder assemblagelijnomstandigheden.",
    "dmaic_phase2_output": "Basiscapaciteit (Cp/Cpk) & Takt-overzicht",
    "dmaic_phase3_phase": "Analyseren",
    "dmaic_phase3_title": "8D Oorzaakanalyse & Ishikawa Isolatie",
    "dmaic_phase3_desc": "Isoleer de werkelijke hoofdoorzaken via 5-Waarom-vragen, Pareto-stratificatie van assemblagefouten en afwijkingen in toeleveranciersmaterialen.",
    "dmaic_phase3_output": "Gevalideerd 8D-oorzakenrapport",
    "dmaic_phase4_phase": "Verbeteren",
    "dmaic_phase4_title": "Poka-Yoke & Lijn Herbalancering",
    "dmaic_phase4_desc": "Implementeer foutbestendige mallen (poka-yoke), gestandaardiseerde werkinstructies, cleanroomvolgordes en directe leveranciers-PSI-validatie.",
    "dmaic_phase4_output": "-15% Foutpercentage & -75% Inkoopkosten",
    "dmaic_phase5_phase": "Borgen",
    "dmaic_phase5_title": "SPC & ISAH ERP Traceerbaarheid",
    "dmaic_phase5_desc": "Institutionaliseer Statistical Process Control (SPC), geautomatiseerde onderhoudstriggers in OptiAsset CMMS en auditprotocollen.",
    "dmaic_phase5_output": "Geborgde Operationele Standaard",
    "dmaic_deliverable_label": "Oplevering:",
    "agile_kicker": "AGILE VERSNELLING & GEMBA-CADANS",
    "agile_title": "Operationele Scrum: 2-Wekelijkse Kaizen Sprints & Dagelijkse Gemba Synchronisatie",
    "agile_subtitle": "Het verbinden van statistische Six Sigma-precisie met snelle agile iteratiecycli. Vertaling van strategische productiedoelen naar dagelijkse werkvloersnelheid, directe escalatie van blokkades en bureaucratievrije borging van werkstandaarden.",
    "agile_c1_sub": "Kaizen Sprint",
    "agile_c1_title": "2-Wekelijkse Kaizen Sprints",
    "agile_c1_desc": "Tijdgebonden engineering-sprints gericht op prioritaire micro-stops, afwijkingen in koppelkalibratie en leveranciersfouten met heldere kwantitatieve sprintdoelen.",
    "agile_c1_cadence": "Cadans: Tweewekelijkse Iteratie",
    "agile_c2_sub": "Vloeroverleg",
    "agile_c2_title": "Dagelijkse Gemba Standups",
    "agile_c2_desc": "15-minuten standup bij het begin van elke ploeg voor het visuele lijnbord. Directe technische escalatie binnen 4 uur; geen vertraging meer via e-mails.",
    "agile_c2_escalation": "Escalatie: 4-Uur SLA",
    "agile_c3_sub": "Stroombeheersing",
    "agile_c3_title": "WIP-Limieten & Stroomregulering",
    "agile_c3_desc": "Strikte fysieke en digitale Work-In-Progress-limieten over bufferstadia om lijncongestie, bufferoverloop en verborgen wachttijden uit te sluiten.",
    "agile_c3_control": "Beheersing: Continue Doorstroom",
    "agile_c4_sub": "Standaard Werk",
    "agile_c4_title": "Sprint Retro & Borging Standaardwerk",
    "agile_c4_desc": "Empirische kwantificering van cyclustijdherstel, evaluatie van afvalvermindering en vastlegging van gevalideerde verbeteringen in digitale MES-SOPs.",
    "agile_c4_output": "Resultaat: Onveranderlijke Standaard",
    "field_tier_label": "Adviesomvang / Niveau",
    "tier_opt_sprint": "14-Dagen Remote Spend & Telemetrie Diagnostiek (€5.500)",
    "tier_opt_fractional": "Parttime Direct Sourcing & Systems Director (€8.500/mnd)",
    "tier_opt_onsite": "5-Dagen Fysieke Fabrieksinspectie & Takt-Audit (€5.400)",
    "modal_company_label": "Bedrijf:",
    "footer_tax_notice": "Gefactureerd via Europees Btw-nummer · Brainport Eindhoven · Valencia",
    "hero_m4_iso_badge": "Elektromechanisch en Logistiek Werk voor Halfgeleider- en Lithografieverpakkingen",
    "hero_m1_badge": "20 TEU / Kwartaal · Direct af Fabriek",
    "hero_m2_badge": "30% Aanbetaling / 70% na PSI Vrijgave",
    "hero_m3_badge": "Continue Flow · -15% Foutpercentage",
    "hero_m4_badge": "Elektromechanisch en Logistiek Werk voor Halfgeleider- en Lithografieverpakkingen",
    "calc_rate_label": "Kosten van Ongeplande Stilstand:",
    "calc_rate_unit": "€/uur",
    "calc_rate_benchmark": "Europese Benchmark: €4.200/uur",
    "calc_rate_min": "Min: €1.000/uur",
    "calc_rate_max": "Max: €12.000/uur (OEM Assemblage)"
  },
  "de": {
    "status_ribbon": "Q4/Q1 KAPAZITÄT: 1 BERATUNGSMANDAT VERFÜGBAR",
    "status_mode": "14-TAGE REMOTE-SPRINT ODER VOR-ORT-WERKSBEGEHUNG",
    "nav_brand_title": "DE SOUSA // OPERATIONS & SUPPLY CHAIN ADVISORY",
    "nav_brand_sub": "Leitende Industrieberatung · Automobil-OEM & High-Tech-Reinräume",
    "nav_pillars": "Track Record",
    "nav_cases": "Verifizierte Fälle",
    "nav_tooling": "Proprietäre Systeme",
    "nav_methodology": "DMAIC-Disziplin",
    "nav_pedigree": "Führungsprofil",
    "nav_economics": "Dienstleistungen",
    "nav_cta": "Scoping initiieren",
    "hero_kicker": "Tier-1 & Tier-2 ASML-Ökosystem // Senior Industrieberatung Operations",
    "hero_title": "Werksstillstände eliminieren und direkte Fabrikbeschaffung mit Hallenpräzision skalieren.",
    "hero_subtitle": "Beratung für Industrieleiter bei der operativen Transformation. Fundiert in elektromechanischen Montageprotokollen für ASML-Reinräume (Tier-1/Tier-2), Fließband-Durchsatz im Automobil-OEM-Takt und volumenstarker internationaler Direktbeschaffung.",
    "hero_cta_primary": "Operative Diagnose anfordern",
    "hero_cta_secondary": "Verifizierten Track Record prüfen",
    "hero_m1_val": "800.000 $ / Jahr Direktbezug",
    "hero_m1_label": "Globale Beschaffung · APAC",
    "hero_m1_sub": "Direkte Industriebeschaffung in China & Indien über 20 Container/Quartal mit Vor-Ort-PSI-Audits.",
    "hero_m2_val": "-75% Stückkostenreduktion",
    "hero_m2_label": "Kostenoptimierung · BOM",
    "hero_m2_sub": "Zwischenhändlermargen eliminiert durch direkte Herstellerverträge und PSI-Qualitätsabnahmen.",
    "hero_m3_val": "110–120 Fahrzeuge / Schicht",
    "hero_m3_label": "Automotive OEM · Tier 1 & 2 Fertigungshalle",
    "hero_m3_sub": "Tier 1 & Tier 2 Werkstattbetrieb und Fließband-Kontinuierlicher Fluss (BMW Group & MINI Cooper bei VDL Nedcar) mit digitaler Drehmomentüberwachung.",
    "hero_m4_val": "HQ Pack Tier 2 & 3 im ASML Halbleiter-Ökosystem",
    "hero_m4_label": "Halbleiter · High-Tech",
    "hero_m4_sub": "HQ Pack elektromechanische Reinraummontage nach ISO-Klasse 5 EUV-Protokollen (Brainport Eindhoven).",
    "calc_title": "Kalkulator für finanzielle Verluste durch Werksstillstand & Engpässe",
    "calc_badge": "Empirisches COPQ-Modell",
    "calc_slider_label": "Monatlicher Linienstillstand / Takt-Engpass:",
    "calc_hours": "Std./Monat",
    "calc_benchmark": "Europäischer Richtwert: 4.200 € / Std. ungeplanter Stillstand",
    "calc_critical": "Kritischer Stillstand (Werkskrise)",
    "calc_loss_label": "Geschätzter monatlicher Produktionsverlust:",
    "calc_annual_label": "Jährlicher Verlust:",
    "calc_recovery_label": "Prognostiziertes Sprint-Rückgewinnungspotenzial (~45%):",
    "calc_guarantee_note": "100 % Honorargutschrift-Garantie: Wenn die 14-tägige Diagnose nicht mindestens 16.500 € an jährlichen Einkaufseinsparungen oder Wartungsstillständen dokumentiert, werden 100 % des 5.500 € Honorars auf ein Vor-Ort-Audit oder Retainer angerechnet.",
    "calc_cta": "Diagnose-Sprint anfragen →",
    "pillars_kicker": "Systematische Interventionen",
    "pillars_title": "Drei Kernsäulen der industriellen Beratungspraxis",
    "pillars_subtitle": "Entwickelt, um betriebliche Abweichungen zu eliminieren, Materialkosten zu senken und Disziplin auf dem Hallenboden ohne theoretischen Agentur-Overhead durchzusetzen.",
    "p1_kicker": "Säule 01 // Globale Beschaffung",
    "p1_title": "Direkte internationale Beschaffung & Lieferanten-Qualitätsmanagement",
    "p1_desc": "100%ige Remote-Architektur. Umgehung lokaler Zwischenhändler und Aufbau direkter Fabrikverträge in Shenzhen, Ningbo und Indien. Bereitstellung technischer Prüfteams vor Ort (PSI & CLI) und risikominimierte Meilensteinverträge.",
    "p1_f1": "Direkte Fabrikverhandlungen ohne Zwischenhändler (-75% Materialkosten).",
    "p1_f2": "Technische Ingenieur-Inspektionsteams vor Ort (PSI & CLI) nach AQL-Standards.",
    "p1_f3": "Strukturierte Meilensteinzahlungen (30% Anzahlung / 70% nach PSI-Freigabe).",
    "p1_drawer_btn": "5-Punkte-Beschaffungsprotokoll anzeigen",
    "p1_drawer_title": "5-Punkte-Auditprotokoll für Direktbeschaffung & Lieferanten",
    "p1_d1": "Fabrik-Audit: Vollständige Überprüfung von Unternehmensdaten, Produktionskapazitäten und ISO 9001-Zertifizierungen.",
    "p1_d2": "Kommerzielle Absicherung: 30% Anzahlung, 70% Freigabe ausschließlich nach erfolgreicher Pre-Shipment Inspection (PSI).",
    "p1_d3": "PSI-Stichproben vor Ort: Lokale Qualitätsingenieure führen Prüfungen nach MIL-STD-105E / ISO 2859-1 AQL II durch.",
    "p2_kicker": "Säule 02 // Linienoptimierung",
    "p2_title": "Montagelinien-Optimierung & Taktdisziplin",
    "p2_desc": "Verankert in der Fließbanddisziplin von Automobil-OEMs (VDL Nedcar: BMW Group & MINI Cooper). Taktsynchronisation von 110–120 Einheiten/Schicht, Drehmomentwerkzeug-Kalibrierung und 8D-Ursachenanalyse.",
    "p2_f1": "Fließband-Taktsynchronisation (110–120 Fahrzeuge/Schicht).",
    "p2_f2": "Digitale Drehmomentschlüssel-Kalibrierung an Fahrwerk und Achsen.",
    "p2_f3": "8D-Fehlerursachenanalyse zur Reduzierung wiederkehrender Mängel um 15%.",
    "p2_drawer_btn": "Linienaustaktung & 8D-Workflow anzeigen",
    "p2_drawer_title": "Montagelinien-Austaktung & 8D-Qualitätsworkflow",
    "p2_d1": "Taktzeit-Harmonisierung: Umverteilung von Arbeitsstationen, um Engpassstationen unter den 60-Sekunden-Solltakt zu bringen.",
    "p2_d2": "Drehmoment-Rückverfolgbarkeit: Anbindung digitaler Drehmomentschlüssel mit automatischer Winkel- und Drehmomentprotokollierung pro VIN.",
    "p2_d3": "8D-Eskalationsprotokoll: Sofortige Eindämmung binnen 2 Stunden, Ishikawa-Ursachenanalyse binnen 24 Stunden und Poka-Yoke binnen 7 Tagen.",
    "p3_kicker": "Säule 03 // Halbleiter-Verpackung",
    "p3_title": "ASML-Reinraum & Halbleiter-Elektromechanik",
    "p3_desc": "Etabliertes Zulieferernetzwerk in Brainport Eindhoven (HQ Pack). ISO-Klasse 5 & 6 Reinraumprotokolle, ESD-Schutz und Stickstoffspülung für ASML EUV-Lithografiemodule.",
    "p3_f1": "Prozesskonformität in Reinräumen der ISO-Klassen 5 und 6.",
    "p3_f2": "ESD- und Partikelkontaminationsschutz für EUV-Optikbaugruppen.",
    "p3_f3": "Stickstoffspülprotokolle mit Vakuum- und Feuchtigkeitsüberwachung.",
    "p3_drawer_btn": "Reinraum-Partikel- & ESD-Protokoll anzeigen",
    "p3_drawer_title": "Reinraum-Partikel- & ESD-Kontrollprotokoll",
    "p3_d1": "Partikelmonitoring: Kontinuierliche Laser-Partikelzähler zur Einhaltung der ISO 14644-1 Klasse 5 Grenzwerte (<3.520 Partikel/m³ bei ≥0,5 µm).",
    "p3_d2": "ESD-Erdung & Oberflächenwiderstand: Zertifizierung nach ANSI/ESD S20.20 mit Ableitwiderständen zwischen 10^6 und 10^9 Ohm.",
    "p3_d3": "Hermetische N2-Spülung: Dreifache Barrierefolien mit Restsauerstoffgehalt unter 0,1% für den weltweiten ASML-Transport.",
    "cases_kicker": "Empirische Validierung",
    "cases_title": "Verifizierte industrielle Projektergebnisse",
    "cases_subtitle": "Dokumentierte Fallstudien aus direkten Industriemandaten mit messbarem ROI und quantifizierten Leistungskennzahlen.",
    "tab_case_sourcing": "Internationale Beschaffung",
    "tab_case_automotive": "Automobil-OEM-Linie",
    "tab_case_cleanroom": "Reinraum Halbleiter",
    "c1_title": "800.000 $/Jahr durch direkte internationale Beschaffung & Umgehung von Zwischenhändlern",
    "c1_client": "Mittelständischer Hersteller von Bau- & Industriekomponenten",
    "c1_challenge_title": "Operative Herausforderung",
    "c1_challenge_text": "Kunde zahlte 40%–75% Händleraufschläge an Importeure und litt unter unvorhersehbaren Lieferverzögerungen sowie Qualitätsschwankungen bei importierten Rohstoffen.",
    "c1_intervention_title": "Strategische Intervention",
    "c1_intervention_text": "Vollständige Ausschaltung der Zwischenhändler. Aufbau direkter Fabrikverträge in Shenzhen und Ningbo mit Inspektorenteams vor Ort (PSI) und Meilensteinzahlungen.",
    "c1_outcome_title": "Empirisches Ergebnis",
    "c1_outcome_text": "75% Margenverbesserung bei Einkaufsteilen, reibungslose Abwicklung von 20 Containern/Quartal und nachhaltige jährliche Einsparung von 800.000 $.",
    "c1_metric_label": "Kostensenkung & Margenwachstum",
    "c1_metric_val": "800.000 $/Jahr (-75% BOM)",
    "c2_title": "110–120 Einheiten/Schicht Fließbandmontage & Taktharmonisierung",
    "c2_client": "VDL Nedcar (Auftragsfertiger für BMW Group & MINI Cooper)",
    "c2_challenge_title": "Operative Herausforderung",
    "c2_challenge_text": "Taktungleichgewichte und Mikrostopps am Montagefließband führten zu Taktzeitabweichungen und Qualitätsfehlern an Fahrwerks- und Achsenverschraubungen.",
    "c2_intervention_title": "Strategische Intervention",
    "c2_intervention_text": "Linienbalancierung mit digitaler Drehmomentschlüssel-Kalibrierung, 8D-Fehlerbeseitigung und standardisierten Arbeitsanweisungen nach BMW-Qualitätsrichtlinien.",
    "c2_outcome_title": "Empirisches Ergebnis",
    "c2_outcome_text": "Kontinuierlicher Takt von 110–120 Fahrzeugen/Schicht stabilisiert, wiederkehrende Abweichungen um 15% gesenkt und null Reklamationen.",
    "c2_metric_label": "Liniendurchsatz & Qualität",
    "c2_metric_val": "110–120 Fahrzeuge/Schicht",
    "c3_title": "ISO-Klasse 5 Reinraumverpackung für ASML EUV-Lithografiemodule",
    "c3_client": "HQ Pack (Spezialisierter Zulieferer im ASML-Ökosystem Brainport)",
    "c3_challenge_title": "Operative Herausforderung",
    "c3_challenge_text": "Strengste Kontaminations- und ESD-Vorgaben für ASML EUV-Optikkomponenten erforderten fehlerfreie Reinraumverpackung unter ISO 14644-1 Klasse 5 Bedingungen.",
    "c3_intervention_title": "Strategische Intervention",
    "c3_intervention_text": "Aufbau validierter Reinraumverpackungsprozesse mit kontinuierlicher Laserpartikelmessung, Stickstoffspülung und Schweißnaht-Integritätsprüfung.",
    "c3_outcome_title": "Empirisches Ergebnis",
    "c3_outcome_text": "100%ige Auditkonformität bei ASML Tier-1-Abnahmetests mit lückenloser Partikel- und ESD-Rückverfolgbarkeit für jedes Bauteil.",
    "c3_metric_label": "Reinraum-Konformität",
    "c3_metric_val": "ISO-Klasse 5 / Null-Kontamination",
    "tooling_kicker": "Betriebliche Technologie",
    "tooling_title": "Proprietäre Diagnosesysteme & automatisierte Datenpipelines",
    "tooling_subtitle": "Keine theoretische Beratung: Wir implementieren leichtgewichtige, praxiserprobte Werkzeuge direkt auf Ihrem Hallenboden.",
    "tooling_banner_badge": "Keine Software-Lizenzkosten",
    "tooling_banner_text": "Alle erstellten Tools und Datenbanken gehen vollständig in das geistige Eigentum des Kunden über. Keine monatlichen SaaS-Gebühren.",
    "tool1_title": "OptiAsset CMMS-Architektur",
    "tool1_sub": "Präventives & korrektives Wartungssystem",
    "tool1_desc": "Subsekunden-Arbeitsauftragsversand, präventive Wartungstrigger und MTBF/MTTR-Überwachung für Industrieanlagen.",
    "tool2_title": "Direktbeschaffungs-Pipeline ab Werk",
    "tool2_sub": "Internationale Beschaffungs- und Qualitätsplattform",
    "tool2_desc": "Desintermediationstools zur Automatisierung von Vorversandkontrollen, Konnossement-Freigaben und -75 % Stückkosten-Gating.",
    "telemetry_table_title": "Verifizierte technische Systemspezifikationen",
    "telemetry_table_sub": "Übersicht betrieblicher Standards und Audit-Parameter aus realen Mandaten:",
    "telemetry_sync_badge": "Echtzeit-Hallenintegration",
    "dmaic_kicker": "Bewährte Methodik",
    "dmaic_title": "Lean Six Sigma DMAIC-Zyklus & operative Kaizen-Sprints",
    "dmaic_subtitle": "Strukturierte mathematische und operative Prozessphasen zur dauerhaften Beseitigung von Prozessschwankungen und Fehlerkosten.",
    "pedigree_kicker": "Direktes Ingenieursmandat",
    "pedigree_title": "Profil & persönliche Verantwortung des Chefingenieurs",
    "pedigree_subtitle": "Sie arbeiten direkt 1:1 mit einem erfahrenen Leitenden Ingenieur zusammen. Keine Nachwuchsberater, keine Account Manager, keine theoretischen Foliensätze.",
    "lead_name": "Eduardo de Sousa",
    "lead_role": "Senior Industrieberater · Operations & Supply Chain",
    "lead_pledge_title": "Garantie für ein direktes 1:1-Ingenieursmandat",
    "lead_pledge_text": "\"Wenn Sie mir ein Mandat anvertrauen, erhalten Sie meinen vollen persönlichen Einsatz direkt in Ihrer Werkhalle und am Vorstandstisch. Jedes Protokoll, jede Datenanalyse und jede Prozessänderung wird von mir persönlich entworfen, validiert und abgenommen.\"",
    "lead_btn_triage": "20-Minuten-Gespräch buchen",
    "lead_btn_whatsapp": "Direkter WhatsApp-Kanal",
    "lead_btn_linkedin": "Verifiziertes Profil auf LinkedIn ↗",
    "cred1_title": "Master in Wirtschaftsingenieurwesen",
    "cred1_inst": "Universität Valencia (ETSII)",
    "cred1_desc": "Schwerpunkte in Fabrikplanung, Fertigungslinienauslegung und quantitativer Logistikmodellierung.",
    "cred2_title": "BSc in Maschinenbau",
    "cred2_inst": "Universität Valencia (ETSII)",
    "cred2_desc": "Konstruktionslehre, Thermodynamik, Fertigungstechnik und Werkstoffprüfung.",
    "cred3_title": "Lean Six Sigma Black Belt",
    "cred3_inst": "Industriezertifizierung",
    "cred3_desc": "Statistische Prozesslenkung (SPC), Messsystemanalysen (MSA) und DMAIC-Projektleitung.",
    "cred4_title": "Berufserfahrung Automotive OEM & High-Tech",
    "cred4_inst": "VDL Nedcar & HQ Pack",
    "cred4_desc": "Langjährige Vor-Ort-Verantwortung in BMW-Auftragsfertigung und ASML-Zulieferbetrieben.",
    "pricing_kicker": "Verbindliche Mandate",
    "pricing_title": "Produktbasierte Beratungsmandate: Feste Ergebnisse, planbare Budgets",
    "pricing_subtitle": "Keine offenen Stundensätze. Transparente Festpreismandate mit klarer Ergebnisbindung und vertraglich definierter ROI-Garantie.",
    "pricing_vat_notice": "Alle Preise verstehen sich zzgl. gesetzlicher MwSt. und Reisekosten gemäß B2B-Standard.",
    "t1_badge": "LEISTUNGSPROFIL 01 // REMOTE-DIAGNOSE",
    "t1_name": "14-Tage Remote Spend- & Telemetrie-Diagnose",
    "t1_price": "5.500 €",
    "t1_period": "/ fester Sprint",
    "t1_desc": "Intensive 100 % Remote-Analyse von Einkaufspreisabweichungen, redundanten Lieferantenverträgen und CMMS-Stillstandsprotokollen.",
    "t1_roi_badge": "100 % HONORARGUTSCHRIFT-GARANTIE",
    "t1_roi_text": "Identifizieren wir innerhalb von 14 Tagen nicht mindestens 16.500 € an belegten Stückpreisdeltas, Vertragsüberkapazitäten oder Wartungsineffizienzen, werden 100 % Ihres 5.500 € Honorars voll auf ein Vor-Ort-Audit oder Fraktionelles Mandat angerechnet.",
    "t1_btn": "14-Tage-Diagnose wählen",
    "t2_highlight": "[ FLAGGSCHIFF-FÜHRUNGSMANDAT ]",
    "t2_badge": "LEISTUNGSPROFIL 03 // FRAKTIONELLE LEITUNG",
    "t2_name": "Fraktioneller Direktor Direct Sourcing & Systems",
    "t2_price": "8.500 €",
    "t2_period": "/ Monat",
    "t2_cadence": "Äquivalent zu 2 Tagen/Woche • Async-First Umsetzung",
    "t2_desc": "Kontinuierliche operative Leitung. Direkte Fabrikverhandlungen in Asien/LATAM, CMMS-Governance (PostgreSQL/MSSQL) und ERP-Automatisierung.",
    "t2_term": "Mindestlaufzeit 3 Monate · 30 Tage rollierende Kündigungsfrist",
    "t2_btn": "Fraktionelles Mandat wählen",
    "t3_badge": "LEISTUNGSPROFIL 02 // VOR-ORT-WERKSAUDIT",
    "t3_name": "5-Tage Vor-Ort-Werksbegehung & Takt-Audit",
    "t3_price": "5.400 €",
    "t3_period": "/ 5-Tage-Sprint (+ Reisekosten)",
    "t3_desc": "Physische Gemba Walks, Taktabstimmung bei Taktstraßen, Messmittelfähigkeit (Gage R&R), Drehmoment-Kalibrierprüfung und 8D-Roadmap.",
    "t3_travel_note": "Reise- und Übernachtungskosten gemäß interner Unternehmensrichtlinie des Auftraggebers",
    "t3_btn": "Vor-Ort-Audit anfragen",
    "intake_kicker": "Direkter Einstieg",
    "intake_title": "Technisches Sondierungsgespräch vereinbaren oder asynchrone Anfrage senden",
    "intake_subtitle": "Direkte ingenieurtechnische Einschätzung unter strikter beidseitiger Vertraulichkeitsvereinbarung (Bilateral NDA).",
    "intake_badge_nda": "Vertraulichkeit garantiert",
    "intake_point1": "Kein Vertriebsgespräch: Sie sprechen direkt mit dem leitenden Ingenieur über technische Fakten.",
    "intake_point2": "Erste schriftliche Einschätzung und Machbarkeitsprüfung binnen 24 Stunden.",
    "intake_point3": "Vertraulichkeitsvereinbarung (NDA) sichert alle geteilten Betriebs- und Prozessdaten sofort ab.",
    "opt1_kicker": "Schnellster Weg · Formularfrei",
    "opt1_title": "Option 1: Direktes 1:1-Videogespräch buchen",
    "opt1_desc": "Wählen Sie über Cal.com direkt einen freien 20-Minuten-Termin im Kalender von Eduardo de Sousa.",
    "opt1_format_label": "Format:",
    "opt1_format_val": "1:1-Videocall (Google Meet)",
    "opt1_lead_label": "Ingenieur:",
    "opt1_lead_val": "Eduardo de Sousa (Chefingenieur)",
    "opt1_legal_label": "Rechtliches:",
    "opt1_legal_val": "Beidseitige NDA garantiert",
    "opt1_btn_cal": "20-Minuten-Videogespräch buchen →",
    "opt1_whatsapp": "Direkte WhatsApp-Nachricht",
    "opt1_email": "Direkte E-Mail",
    "opt2_kicker": "Asynchrone Triage · Schnelleingabe",
    "opt2_title": "Option 2: 3-Felder-Projektbriefing einreichen",
    "opt2_desc": "Bevorzugen Sie eine erste schriftliche Prüfung? Hinterlassen Sie Ihre Kontaktdaten und Ihren zentralen Engpass.",
    "field_name_label": "Vollständiger Name & Funktion *",
    "field_name_placeholder": "z. B. Dr.-Ing. Markus Weber, Werksleiter",
    "field_company_label": "Unternehmensname / Produktionsstandort *",
    "field_company_placeholder": "z. B. Rhein-Main Präzisionswerkzeuge GmbH",
    "field_email_label": "Geschäftliche E-Mail-Adresse *",
    "field_email_placeholder": "z. B. m.weber@praezision-gmbh.de",
    "field_bottleneck_label": "Zentraler operativer Engpass / Zielstellung",
    "field_bottleneck_placeholder": "z. B. Monatlicher Linienstillstand von 14 Stunden an Schweißlinie 3",
    "opt2_btn_submit": "Mandatsdossier übermitteln →",
    "opt2_submitting": "Dossier wird verschlüsselt...",
    "opt2_footer_note": "100 % vertraulich · Beidseitige NDA wirksam · Direkte Prüfung durch den leitenden Ingenieur",
    "modal_title": "Mandatsdossier erfolgreich registriert",
    "modal_ref_label": "Mandatsreferenz:",
    "modal_nda_badge": "Beidseitige NDA aktiviert",
    "modal_mandate_scope": "Gewählter Mandatsumfang:",
    "modal_lead_label": "Zuständiger Ingenieur:",
    "modal_btn_cal": "Termin via Cal.com verbinden →",
    "modal_btn_whatsapp": "Bestätigung via WhatsApp senden",
    "modal_btn_email": "Kopie per E-Mail anfordern",
    "modal_btn_return": "Schließen und zurückkehren",
    "footer_brand": "DE SOUSA // OPERATIONS & SUPPLY CHAIN ADVISORY",
    "footer_sub": "Unabhängige Industrieberatung für Automobil-OEMs und Fertigungsstätten im Halbleiterbereich.",
    "footer_nda": "Beidseitige Geheimhaltungsvereinbarung (Bilateral NDA) für alle Mandate · Alle Rechte vorbehalten © 2026",
    "calc_annual_recovery": "Jährliche Erholung:",
    "mid_cta_badge": "100 % HONORARGUTSCHRIFT GESICHERT",
    "mid_cta_title": "Prüffähige Ertragslecks innerhalb von 14 Tagen aufdecken",
    "mid_cta_subtitle": "Sichern Sie sich die 14-tägige Remote-Diagnose. Werden nicht mindestens 16.500 € an Einsparpotenzial oder Stillstandskosten belegt, werden 100 % Ihres Honorars auf ein Vor-Ort-Audit angerechnet.",
    "mid_cta_btn": "14-Tage-Diagnose buchen →",
    "ribbon_direct_engagement": "DIREKTES ENGAGEMENT",
    "nav_brand_sub_title": "Industrielle Betriebsberatung",
    "hero_telemetry_ecosystem": "TIER-1 & TIER-2 ASML-ÖKOSYSTEM",
    "hero_benchmarks_title": "Verifizierte Produktions- und Beschaffungs-Benchmarks",
    "calc_benchmark_badge": "Benchmark: 4.200 €/Std.",
    "calc_per_month": "/Monat",
    "calc_roi_badge_suffix": "x SPRINT-ROI",
    "calc_slider_aria": "Monatliche Stillstandzeiten Montage & Reinraum",
    "tab_p1_title": "Globale Beschaffung",
    "tab_p2_title": "Fließbandmontage",
    "tab_p3_title": "ASML-Ökosystem",
    "dossier_active_badge": "AKTIVES DOSSIER",
    "dossier_hide_protocol": "Protokoll Ausblenden",
    "dmaic_case_evidence_title": "Empirische DMAIC-Fallnachweise",
    "tool1_tag": "ASSET-CMMS",
    "tool1_status": "Dual-DB-Engine",
    "tool1_scope": "PostgreSQL + MSSQL Synchronisation",
    "tool2_tag": "BESCHAFFUNGSKADENZ",
    "tool2_status": "Automatisierte PSI",
    "tool2_scope": "Shenzhen · Ningbo · Indien",
    "tool3_tag": "LINIENTAKT",
    "tool3_status": "Echtzeit-MES",
    "tool3_title": "Takt- & Mikrostopp-Diagnose",
    "tool3_scope": "110-120 Fahrzeuge/Schicht",
    "tool3_desc": "Kadenzsynchronisation auf Automobil-OEM-Fließbändern, digitale Drehmomenterfassung und 8D-Ursachenverfolgung.",
    "tool4_tag": "EUV-KONFORMITÄT",
    "tool4_status": "ISO-Klasse 5",
    "tool4_title": "Reinraum-Partikel-Governance",
    "tool4_scope": "Brainport Eindhoven",
    "tool4_desc": "Rückverfolgbarkeit elektromechanischer Verpackungen, TÜV-Hebezeug-Rezertifizierung und ISAH ERP-Chargenverfolgung.",
    "tool_delivery_asset": "Standardmäßiges Projekt-Asset",
    "optiasset_kicker": "ENTERPRISE ASSET MANAGEMENT & ARBEITSAUFTRAGS-TELEMETRIE",
    "optiasset_title": "OptiAsset CMMS: Hochverfügbare Wartungstelemetrie",
    "optiasset_badge": "DUAL-DATENBANK-ENGINE",
    "optiasset_c1_title": "1. Echtzeit-Telemetrie & Fehlerisolation",
    "optiasset_c1_desc": "Kontinuierliche Überwachung von MTBF und MTTR über aktive Fertigungszellen. Direkte IoT-Integration mit automatisierter Arbeitsauftragserstellung unter 200 ms.",
    "optiasset_c2_title": "2. Dual-Datenbank-Synchronisierer",
    "optiasset_c2_desc": "Replikation im Subsekundenbereich zwischen lokalen MSSQL-Linienservern vor Ort und PostgreSQL-Cloud-Berichts-Engines für unterbrechungsfreie Audits.",
    "optiasset_c3_title": "3. Automatisierte Ersatzteil-Stückliste (BOM)",
    "optiasset_c3_desc": "Sicherheitsbestandswarnungen mit direkter Anbindung an internationale Lieferanten-APIs, wodurch Bandstillstände durch Bauteilmangel ausgeschlossen werden.",
    "optiasset_footer_arch": "OptiAsset CMMS-Architektur v4.2 · Produktionserprobter Enterprise-Einsatz",
    "optiasset_footer_engine": "PostgreSQL + MSSQL Dual-Engine",
    "lead_active_badge": "Aktives Hauptmandat",
    "t1_duration": "14 Tage",
    "t2_duration": "Monatlich",
    "t2_commitment_badge": "AUSFÜHRUNGSVERPFLICHTUNG",
    "t3_duration": "5 Tage",
    "t3_policy_badge": "VOR-ORT-RICHTLINIE",
    "dmaic_phase1_phase": "Definieren",
    "dmaic_phase1_title": "Problemdefinition & COPQ-Modellierung",
    "dmaic_phase1_desc": "Formalisierung des Betriebscharts, Ausschuss-Kosten schlechter Qualität (COPQ), Montageengpässe und Risikomatrizen für Bandstillstände.",
    "dmaic_phase1_output": "Projektcharta & Wertstromanalyse (VSM)",
    "dmaic_phase2_phase": "Messen",
    "dmaic_phase2_title": "Telemetrie- & Takt-Basislinie",
    "dmaic_phase2_desc": "Erfassung von Drehmomentdaten digitaler Schlüssel, MES-Fehlerprotokollierung und Nachverfolgung der Takttijd-Varianz unter Fließbandbedingungen.",
    "dmaic_phase2_output": "Prozessfähigkeit (Cp/Cpk) & Takt-Register",
    "dmaic_phase3_phase": "Analysieren",
    "dmaic_phase3_title": "8D-Ursachenanalyse & Ishikawa-Isolation",
    "dmaic_phase3_desc": "Isolation wahrer Ursachenvektoren über 5-Why-Methodik, Pareto-Schichtung von Montagefehlern und Nichtkonformitäten von Lieferantenmaterialien.",
    "dmaic_phase3_output": "Validierter 8D-Ursachenbericht",
    "dmaic_phase4_phase": "Verbessern",
    "dmaic_phase4_title": "Poka-Yoke & Linienausbalancierung",
    "dmaic_phase4_desc": "Implementierung von Fehlersicherungsvorrichtungen (Poka-Yoke), Standardarbeitsanweisungen, Reinraum-Montagereihenfolgen und Lieferanten-PSI-Prüfungen.",
    "dmaic_phase4_output": "-15 % Fehlerrate & -75 % Beschaffungskosten",
    "dmaic_phase5_phase": "Steuern",
    "dmaic_phase5_title": "SPC & ISAH ERP Rückverfolgbarkeit",
    "dmaic_phase5_desc": "Institutionalisierung von statistischer Prozesslenkung (SPC), automatisierten Wartungstriggern in OptiAsset CMMS und Revisionsprotokollen.",
    "dmaic_phase5_output": "Dauerhafter operativer Standard",
    "dmaic_deliverable_label": "Ergebnis:",
    "agile_kicker": "AGILE BESCHLEUNIGUNG & GEMBA-KADENZ",
    "agile_title": "Operational Scrum: 2-Wochen-Kaizen-Sprints & tägliche Gemba-Synchronisation",
    "agile_subtitle": "Verbindung von statistischer Six-Sigma-Präzision mit schnellen agilen Ausführungszyklen. Übersetzung strategischer Durchsatzzahlen in tägliche Werkstatt-Geschwindigkeit, sofortige Blockaden-Eskalation und bürokratiefreie Standardarbeits-Festschreibung.",
    "agile_c1_sub": "Kaizen-Sprint",
    "agile_c1_title": "2-Wochen-Kaizen-Sprints",
    "agile_c1_desc": "Zeitlich begrenzte Engineering-Sprints für hochprioritäre Mikrostopps, Drehmoment-Drift und Lieferantenfehler mit messbaren Sprintzielen.",
    "agile_c1_cadence": "Kadenz: Zweiwöchige Iteration",
    "agile_c2_sub": "Werkstatt-Standup",
    "agile_c2_title": "Tägliche Gemba-Standups",
    "agile_c2_desc": "15-minütige Besprechungen zum Schichtbeginn vor der visuellen Linientafel. Direkte technische Problemeskalation binnen 4 Stunden, statt zeitraubender E-Mails.",
    "agile_c2_escalation": "Eskalation: 4-Stunden-SLA",
    "agile_c3_sub": "Flusssteuerung",
    "agile_c3_title": "WIP-Limits & Durchflussdrosselung",
    "agile_c3_desc": "Strikte physische und digitale Work-In-Progress-Grenzen an Pufferstufen zur Vermeidung von Bandstauungen, Pufferüberläufen und versteckten Durchlaufzeiten.",
    "agile_c3_control": "Steuerung: Kontinuierlicher Fluss",
    "agile_c4_sub": "Standardarbeit",
    "agile_c4_title": "Sprint-Retro & Standardarbeits-Verankerung",
    "agile_c4_desc": "Empirische Quantifizierung gewonnener Taktzeiten, Analyse reduzierter Ausschussraten und Festschreibung geprüfter Verbesserungen in digitalen MES-SOPs.",
    "agile_c4_output": "Ergebnis: Verbindlicher Standard",
    "field_tier_label": "Beratungsumfang / Stufe",
    "tier_opt_sprint": "14-Tage Remote Spend- & Telemetrie-Diagnose (5.500 €)",
    "tier_opt_fractional": "Fraktioneller Direktor Direct Sourcing & Systems (8.500 €/Monat)",
    "tier_opt_onsite": "5-Tage Vor-Ort-Werksbegehung & Takt-Audit (5.400 €)",
    "modal_company_label": "Unternehmen:",
    "footer_tax_notice": "In Rechnung gestellt über europäische USt-IdNr. · Brainport Eindhoven · Valencia",
    "hero_m4_iso_badge": "Elektromechanische & logistische Arbeiten für Halbleiter- & Lithographieverpackungen",
    "hero_m1_badge": "20 TEU / Quartal · Direkt ab Werk",
    "hero_m2_badge": "30% Anzahlung / 70% nach PSI-Freigabe",
    "hero_m3_badge": "Kontinuierlicher Fluss · -15% Fehlerrate",
    "hero_m4_badge": "Elektromechanische & logistische Arbeiten für Halbleiter- & Lithographieverpackungen",
    "calc_rate_label": "Kosten ungeplanter Bandstillstände:",
    "calc_rate_unit": "€/Std.",
    "calc_rate_benchmark": "Europäischer Benchmark: 4.200 €/Std.",
    "calc_rate_min": "Min: 1.000 €/Std.",
    "calc_rate_max": "Max: 12.000 €/Std. (OEM-Montage)"
  },
  "fr": {
    "status_ribbon": "DISPONIBILITÉ T4/T1 : 1 MANDAT DE CONSEIL OUVERT",
    "status_mode": "SPRINT DIAGNOSTIQUE À DISTANCE DE 14 JOURS OU AUDIT EN USINE",
    "nav_brand_title": "DE SOUSA // OPERATIONS & SUPPLY CHAIN ADVISORY",
    "nav_brand_sub": "Conseil opérationnel de direction · OEM Automobile & Salles blanches",
    "nav_pillars": "Track Record",
    "nav_cases": "Cas Vérifiés",
    "nav_tooling": "Systèmes Propriétaires",
    "nav_methodology": "Rigueur DMAIC",
    "nav_pedigree": "Profil Exécutif",
    "nav_economics": "Services",
    "nav_cta": "Initier le Cadrage",
    "hero_kicker": "Écosystème ASML Tier-1 & Tier-2 // Conseil Senior en Opérations Industrielles",
    "hero_title": "Éliminez les arrêts d'usine et développez le sourcing direct avec la précision du terrain.",
    "hero_subtitle": "Conseil aux directions industrielles sur la transformation opérationnelle. Fondé sur les protocoles d'assemblage électromécanique en salle blanche ASML (Tier-1/Tier-2), le takt d'assemblage automobile OEM et le sourcing international direct en volume.",
    "hero_cta_primary": "Demander un diagnostic opérationnel",
    "hero_cta_secondary": "Consulter les résultats vérifiés",
    "hero_m1_val": "800 k$ / an Sourcing Direct",
    "hero_m1_label": "Approvisionnement Global · APAC",
    "hero_m1_sub": "Achats industriels directs Chine & Inde sur 20 conteneurs/trimestre avec audits PSI sur site.",
    "hero_m2_val": "-75% Coûts d'Approvisionnement",
    "hero_m2_label": "Optimisation des Coûts · BOM",
    "hero_m2_sub": "Suppression des intermédiaires par contrats directs fabricants et validation qualité avant expédition.",
    "hero_m3_val": "110–120 Véhicules / Poste",
    "hero_m3_label": "Automobile OEM · Opérations d'Atelier Tier 1 & 2",
    "hero_m3_sub": "Opérations d'atelier Tier 1 & Tier 2 et flux continu sur chaîne de montage (BMW Group & MINI Cooper chez VDL Nedcar) avec contrôle numérique du couple.",
    "hero_m4_val": "HQ Pack Tier 2 & 3 dans l'Écosystème Semi-conducteurs ASML",
    "hero_m4_label": "Semi-conducteurs · High-Tech",
    "hero_m4_sub": "Assemblage électromécanique en salle blanche HQ Pack sous protocoles ISO Classe 5 EUV (Brainport Eindhoven).",
    "calc_title": "Estimateur de pertes financières liées aux arrêts de ligne & goulets",
    "calc_badge": "Modèle COPQ empirique",
    "calc_slider_label": "Arrêt mensuel de ligne / Goulet d'étranglement :",
    "calc_hours": "h/mois",
    "calc_benchmark": "Référence européenne : 4 200 € / heure d'arrêt non planifié",
    "calc_critical": "Arrêt critique (Crise d'usine)",
    "calc_loss_label": "Hémorragie mensuelle de production estimée :",
    "calc_annual_label": "Perte annuelle :",
    "calc_recovery_label": "Potentiel de récupération estimé du sprint (~45%) :",
    "calc_guarantee_note": "Garantie Crédit d'Honoraires à 100 % : Si le diagnostic de 14 jours ne documente pas au moins 16 500 € d'économies annuelles sur les achats ou la maintenance, 100 % des 5 500 € sont crédités sur un audit sur site ou un forfait partagé.",
    "calc_cta": "Demander le sprint diagnostique →",
    "pillars_kicker": "Interventions Systématiques",
    "pillars_title": "Trois piliers fondamentaux de conseil industriel",
    "pillars_subtitle": "Conçus pour éliminer les dérives opérationnelles, réduire le coût des matières et imposer la discipline en atelier sans surcharge théorique.",
    "p1_kicker": "Pilier 01 // Sourcing Mondial",
    "p1_title": "Approvisionnement international direct et gouvernance qualité fournisseurs",
    "p1_desc": "Architecture 100 % à distance. Désintermédiation des courtiers locaux et contractualisation directe départ usine à Shenzhen, Ningbo et en Inde. Déploiement d'inspecteurs techniques sur site (PSI & CLI) et contrats à jalons sécurisés.",
    "p1_f1": "Négociations directes avec les usines sans intermédiaires (-75% sur le coût matière).",
    "p1_f2": "Équipes d'ingénieurs sur site pour les inspections (PSI & CLI) selon normes AQL.",
    "p1_f3": "Paiements échelonnés sécurisés (30% à la commande / 70% après validation PSI).",
    "p1_drawer_btn": "Voir le protocole de gouvernance sourcing en 5 points",
    "p1_drawer_title": "Protocole d'audit et de sourcing direct en 5 points",
    "p1_d1": "Audit usine : Vérification des antécédents, des capacités de production et des certifications ISO 9001.",
    "p1_d2": "Verrouillage commercial : 30% d'acompte, 70% libérés exclusivement après validation de l'inspection avant expédition (PSI).",
    "p1_d3": "Échantillonnage PSI sur site : Ingénieurs qualité locaux appliquant les normes MIL-STD-105E / ISO 2859-1 AQL II.",
    "p2_kicker": "Pilier 02 // Optimisation de Ligne",
    "p2_title": "Optimisation des lignes de fabrication et discipline de cadence (Takt)",
    "p2_desc": "Fondé sur la rigueur des lignes d'assemblage de constructeurs automobiles OEM (VDL Nedcar : BMW Group & MINI Cooper). Synchronisation du takt à 110–120 unités/poste, étalonnage d'outillage dynamométrique et résolution 8D.",
    "p2_f1": "Synchronisation de la cadence d'assemblage (110–120 véhicules/poste).",
    "p2_f2": "Étalonnage numérique des clés dynamométriques sur châssis et essieux.",
    "p2_f3": "Résolution de problèmes 8D réduisant les défauts récurrents de 15%.",
    "p2_drawer_btn": "Voir le flux d'équilibrage de ligne et confinement 8D",
    "p2_drawer_title": "Équilibrage de ligne d'assemblage et flux qualité 8D",
    "p2_d1": "Harmonisation du takt : Répartition des postes pour ramener les étapes critiques sous le temps de cycle cible de 60 secondes.",
    "p2_d2": "Traçabilité du couple : Intégration de clés dynamométriques avec enregistrement numérique du couple et de l'angle par numéro VIN.",
    "p2_d3": "Protocole d'escalade 8D : Confinement immédiat sous 2 heures, analyse Ishikawa sous 24 heures et Poka-Yoke définitif sous 7 jours.",
    "p3_kicker": "Pilier 03 // Salle Blanche Semi-conducteurs",
    "p3_title": "Salle blanche ASML et conditionnement électromécanique de précision",
    "p3_desc": "Réseau de fournisseurs de Brainport Eindhoven (HQ Pack). Protocoles de salle blanche ISO Classe 5 & 6, maîtrise ESD et emballage sous purge d'azote pour modules de lithographie ASML EUV.",
    "p3_f1": "Conformité des processus en salle blanche ISO Classe 5 et Classe 6.",
    "p3_f2": "Protection contre les décharges électrostatiques (ESD) et les particules pour optiques EUV.",
    "p3_f3": "Protocoles de purge d'azote avec surveillance du vide et de l'hygrométrie.",
    "p3_drawer_btn": "Voir le protocole de maîtrise particulaire et ESD",
    "p3_drawer_title": "Protocole de contrôle particulaire et ESD en salle blanche",
    "p3_d1": "Surveillance particulaire : Compteurs laser en continu pour respecter les limites ISO 14644-1 Classe 5 (<3 520 particules/m³ à ≥0,5 µm).",
    "p3_d2": "Mise à la terre et résistivité ESD : Certification ANSI/ESD S20.20 avec résistance de surface maintenue entre 10^6 et 10^9 ohms.",
    "p3_d3": "Conditionnement hermétique sous N2 : Barrière triple couche avec oxygène résiduel sous 0,1% pour le transport sécurisé des modules ASML.",
    "cases_kicker": "Validation Empirique",
    "cases_title": "Résultats industriels documentés et vérifiés",
    "cases_subtitle": "Études de cas réelles issues de mandats industriels directs avec retour sur investissement mesuré et indicateurs chiffrés.",
    "tab_case_sourcing": "Sourcing International",
    "tab_case_automotive": "Ligne Automobile OEM",
    "tab_case_cleanroom": "Salle Blanche Semi-conducteurs",
    "c1_title": "800 000 $/an d'économies par sourcing international direct sans intermédiaire",
    "c1_client": "Fabricant ETI de composants industriels et pour le bâtiment",
    "c1_challenge_title": "Défi opérationnel",
    "c1_challenge_text": "Le client subissait des marges de 40% à 75% imposées par des importateurs locaux, des retards imprévisibles et des écarts de qualité sur les matières premières.",
    "c1_intervention_title": "Intervention stratégique",
    "c1_intervention_text": "Désintermédiation complète de la chaîne d'achat. Contrats directs départ usine à Shenzhen et Ningbo avec inspecteurs sur site (PSI) et jalons de paiement stricts.",
    "c1_outcome_title": "Résultat empirique",
    "c1_outcome_text": "Marge brute accrue de 75% sur les pièces achetées, gestion fiable de 20 conteneurs/trimestre et 800 000 $ d'économies annuelles pérennisées.",
    "c1_metric_label": "Économies & Hausse de Marge",
    "c1_metric_val": "800 k$/an (-75% BOM)",
    "c2_title": "Ligne mobile à 110–120 unités/poste et harmonisation du takt",
    "c2_client": "VDL Nedcar (Constructeur sous contrat pour BMW Group & MINI Cooper)",
    "c2_challenge_title": "Défi opérationnel",
    "c2_challenge_text": "Déséquilibres de cadences et micro-arrêts sur la ligne d'assemblage mobile générant des écarts de temps de cycle et des défauts sur les assemblages châssis et essieux.",
    "c2_intervention_title": "Intervention stratégique",
    "c2_intervention_text": "Rééquilibrage de ligne avec étalonnage numérique des clés dynamométriques, résolution 8D et instructions de travail standardisées certifiées BMW.",
    "c2_outcome_title": "Résultat empirique",
    "c2_outcome_text": "Cadence continue de 110–120 voitures/poste stabilisée, défauts récurrents réduits de 15% et zéro réclamation client final.",
    "c2_metric_label": "Cadence & Qualité de Ligne",
    "c2_metric_val": "110–120 Voitures/Poste",
    "c3_title": "Conditionnement en salle blanche ISO Classe 5 pour modules lithographiques ASML EUV",
    "c3_client": "HQ Pack (Fournisseur de référence dans l'écosystème ASML Brainport)",
    "c3_challenge_title": "Défi opérationnel",
    "c3_challenge_text": "Spécifications de propreté et de décharge électrostatique drastiques pour les pièces ASML EUV nécessitant un emballage zéro défaut en ISO 14644-1 Classe 5.",
    "c3_intervention_title": "Intervention stratégique",
    "c3_intervention_text": "Mise en place de processus de conditionnement validés avec comptage laser particulaire en continu, purge d'azote et contrôle d'étanchéité.",
    "c3_outcome_title": "Résultat empirique",
    "c3_outcome_text": "Conformité à 100 % lors des audits de recette ASML Tier-1 avec traçabilité particulaire et ESD complète par expédition.",
    "c3_metric_label": "Conformité Salle Blanche",
    "c3_metric_val": "ISO Classe 5 / Zéro Contamination",
    "tooling_kicker": "Technologie Opérationnelle",
    "tooling_title": "Outils de diagnostic propriétaires & pipelines de données automatisés",
    "tooling_subtitle": "Pas de théorie abstraite : nous mettons en œuvre des outils légers et opérationnels directement connectés à la réalité de votre usine.",
    "tooling_banner_badge": "Aucun Frais de Licence Logicielle",
    "tooling_banner_text": "Tous les outils et bases de données développés deviennent la propriété intellectuelle exclusive du client. Aucun abonnement SaaS mensuel.",
    "tool1_title": "Architecture OptiAsset GMAO",
    "tool1_sub": "Système de maintenance préventive et corrective",
    "tool1_desc": "Attribution des ordres de travail en sous-seconde, déclencheurs de maintenance préventive et suivi MTBF/MTTR des équipements d'usine.",
    "tool2_title": "Pipeline d'Approvisionnement Direct Usine",
    "tool2_sub": "Plateforme d'achats internationaux et suivi qualité",
    "tool2_desc": "Outils de désintermédiation automatisant les inspections avant expédition, validations de connaissement et verrouillage de coûts BOM à -75%.",
    "telemetry_table_title": "Spécifications techniques validées en production",
    "telemetry_table_sub": "Synthèse des standards opérationnels et critères d'audit appliqués en mission :",
    "telemetry_sync_badge": "Intégration Atelier Temps Réel",
    "dmaic_kicker": "Méthodologie Éprouvée",
    "dmaic_title": "Cycle Lean Six Sigma DMAIC & sprints Kaizen opérationnels",
    "dmaic_subtitle": "Phasage rigoureux et modélisation mathématique pour éradiquer durablement les variations de procédés et les coûts de non-qualité.",
    "pedigree_kicker": "Mandat d'Ingénieur Direct",
    "pedigree_title": "Profil & engagement direct de l'ingénieur principal",
    "pedigree_subtitle": "Vous collaborez en direct 1:1 avec un ingénieur senior expérimenté. Aucun consultant junior, aucun intermédiaire commercial, aucun support théorique.",
    "lead_name": "Eduardo de Sousa",
    "lead_role": "Conseiller Industriel Senior · Opérations & Supply Chain",
    "lead_pledge_title": "Engagement de mandat direct 1:1",
    "lead_pledge_text": "\"Lorsque vous me confiez un mandat, vous bénéficiez de mon implication personnelle directe dans votre usine et auprès de votre direction. Chaque protocole, chaque analyse de données et chaque ajustement technique est personnellement conçu, validé et signé par mes soins.\"",
    "lead_btn_triage": "Réserver un cadrage de 20 min",
    "lead_btn_whatsapp": "Canal direct WhatsApp",
    "lead_btn_linkedin": "Profil vérifié sur LinkedIn ↗",
    "cred1_title": "Master en Génie Industriel & Management des Opérations",
    "cred1_inst": "Université Polytechnique de Valence (ETSII)",
    "cred1_desc": "Spécialisation en aménagement d'usines, conception de lignes et optimisation logistique quantitative.",
    "cred2_title": "Licence en Génie Mécanique",
    "cred2_inst": "Université Polytechnique de Valence (ETSII)",
    "cred2_desc": "Conception mécanique, thermodynamique, procédés de fabrication et résistance des matériaux.",
    "cred3_title": "Lean Six Sigma Black Belt",
    "cred3_inst": "Certification Professionnelle Industrielle",
    "cred3_desc": "Maîtrise statistique des procédés (MSP/SPC), analyse des systèmes de mesure (MSA) et direction de projets DMAIC.",
    "cred4_title": "Expérience Pratique OEM Automobile & High-Tech",
    "cred4_inst": "VDL Nedcar & HQ Pack",
    "cred4_desc": "Responsabilités opérationnelles directes au sein d'usines partenaires de BMW Group et de l'écosystème ASML.",
    "pricing_kicker": "Mandats Clairs",
    "pricing_title": "Mandats de conseil packagés : Livrables fermes, budget maîtrisé",
    "pricing_subtitle": "Aucune facturation à l'heure imprévisible. Des forfaits clairs avec engagement de résultat et garantie contractuelle de ROI.",
    "pricing_vat_notice": "Tous les tarifs sont indiqués hors TVA et frais de déplacement selon les standards B2B européens.",
    "t1_badge": "FICHE TECHNIQUE 01 // DIAGNOSTIC À DISTANCE",
    "t1_name": "Diagnostic Spend & Télémétrie à Distance (14 Jours)",
    "t1_price": "5 500 €",
    "t1_period": "/ sprint forfaitaire",
    "t1_desc": "Audit intensif 100 % à distance des écarts d'achats, des redondances de contrats fournisseurs et des journaux d'arrêts de maintenance GMAO.",
    "t1_roi_badge": "GARANTIE CRÉDIT D'HONORAIRES À 100 %",
    "t1_roi_text": "Si nous n'identifions pas au moins 16 500 € d'écarts de prix unitaires, de doublons contractuels ou d'inefficacités de maintenance en 14 jours, 100 % de vos 5 500 € sont crédités sur un audit sur site ou un forfait fractionnel.",
    "t1_btn": "Choisir le Diagnostic 14 Jours",
    "t2_highlight": "[ DIRECTION DE RÉFÉRENCE ]",
    "t2_badge": "FICHE TECHNIQUE 03 // DIRECTION FRACTIONNÉE",
    "t2_name": "Directeur Direct Sourcing & Systèmes à Temps Partagé",
    "t2_price": "8 500 €",
    "t2_period": "/ mois",
    "t2_cadence": "Équivalent 2 Jours/Semaine • Exécution Asynchrone Prioritaire",
    "t2_desc": "Pilotage exécutif continu. Négociations directes avec usines en Asie/LATAM, gouvernance GMAO (PostgreSQL/MSSQL) et workflows ERP automatisés.",
    "t2_term": "Engagement initial de 3 mois · Préavis de 30 jours par la suite",
    "t2_btn": "Choisir le Mandat à Temps Partagé",
    "t3_badge": "FICHE TECHNIQUE 02 // AUDIT D'USINE SUR SITE",
    "t3_name": "Audit d'Usine sur Site & Analyse du Takt de 5 Jours",
    "t3_price": "5 400 €",
    "t3_period": "/ sprint de 5 jours (+ déplacement)",
    "t3_desc": "Gemba walks physiques en usine, chronométrage du takt sur lignes mouvantes, capabilité instruments (gage R&R), étalonnage couple et feuille de route 8D.",
    "t3_travel_note": "Frais de déplacement et d'hébergement pris en charge selon la politique de l'entreprise cliente",
    "t3_btn": "Demander l'Audit sur Site",
    "intake_kicker": "Contact Direct",
    "intake_title": "Planifier un entretien de cadrage technique ou envoyer un briefing asynchrone",
    "intake_subtitle": "Évaluation directe avec l'ingénieur principal sous accord bilatéral de confidentialité (Bilateral NDA).",
    "intake_badge_nda": "Confidentialité Garantie",
    "intake_point1": "Aucun échange commercial : vous échangez directement avec l'ingénieur en chef sur vos données techniques.",
    "intake_point2": "Première analyse de cadrage écrite sous 24 heures.",
    "intake_point3": "Accord de confidentialité mutuel (NDA) appliqué dès la transmission des données de production.",
    "opt1_kicker": "La Voie la Plus Rapide · Sans Formulaire",
    "opt1_title": "Option 1 : Réserver un appel vidéo de cadrage 1:1",
    "opt1_desc": "Sélectionnez directement un créneau disponible de 20 minutes dans l'agenda d'Eduardo de Sousa via Cal.com.",
    "opt1_format_label": "Format :",
    "opt1_format_val": "Visioconférence 1:1 (Google Meet)",
    "opt1_lead_label": "Ingénieur :",
    "opt1_lead_val": "Eduardo de Sousa (Lead Engineer)",
    "opt1_legal_label": "Juridique :",
    "opt1_legal_val": "Accord NDA bilatéral appliqué",
    "opt1_btn_cal": "Réserver le cadrage vidéo de 20 min →",
    "opt1_whatsapp": "Message direct WhatsApp",
    "opt1_email": "E-mail direct",
    "opt2_kicker": "Triage Asynchrone · Saisie Directe",
    "opt2_title": "Option 2 : Briefing rapide en 3 champs",
    "opt2_desc": "Vous préférez une première évaluation par écrit ? Indiquez vos coordonnées professionnelles et votre goulet principal.",
    "field_name_label": "Nom complet & Titre professionnel *",
    "field_name_placeholder": "ex. Jean Dupont, Directeur d'Usine",
    "field_company_label": "Entreprise / Site de production *",
    "field_company_placeholder": "ex. Précision Mécanique SAS",
    "field_email_label": "Adresse e-mail professionnelle *",
    "field_email_placeholder": "ex. j.dupont@precision-mecanique.fr",
    "field_bottleneck_label": "Goulet d'étranglement opérationnel principal / Objectif",
    "field_bottleneck_placeholder": "ex. Arrêts de ligne d'environ 14 h/mois sur la cellule d'assemblage 2",
    "opt2_btn_submit": "Transmettre le dossier de mandat →",
    "opt2_submitting": "Chiffrement du dossier en cours...",
    "opt2_footer_note": "100 % confidentiel · Accord NDA mutuel actif · Examen direct par l'ingénieur principal",
    "modal_title": "Dossier de mandat enregistré avec succès",
    "modal_ref_label": "Référence de mandat :",
    "modal_nda_badge": "Accord NDA bilatéral activé",
    "modal_mandate_scope": "Périmètre de conseil retenu :",
    "modal_lead_label": "Ingénieur assigné :",
    "modal_btn_cal": "Associer un créneau via Cal.com →",
    "modal_btn_whatsapp": "Confirmer par WhatsApp Direct",
    "modal_btn_email": "Recevoir une copie par e-mail",
    "modal_btn_return": "Fermer et retourner au site",
    "footer_brand": "DE SOUSA // OPERATIONS & SUPPLY CHAIN ADVISORY",
    "footer_sub": "Conseil industriel indépendant pour usines d'assemblage automobile OEM et environnements semi-conducteurs.",
    "footer_nda": "Accord bilatéral de confidentialité garanti pour toutes les missions · Tous droits réservés © 2026",
    "calc_annual_recovery": "Récupération annuelle :",
    "mid_cta_badge": "GARANTIE CRÉDIT D'HONORAIRES À 100 %",
    "mid_cta_title": "Identifiez les Fuites de Rentabilité Auditables en 14 Jours",
    "mid_cta_subtitle": "Réservez votre diagnostic à distance de 14 jours. À défaut d'identifier au moins 16 500 € d'économies annuelles vérifiées, 100 % de votre honoraire de 5 500 € est crédité sur un audit sur site ou retainer.",
    "mid_cta_btn": "Réserver le Diagnostic 14 Jours →",
    "ribbon_direct_engagement": "ENGAGEMENT DIRECT",
    "nav_brand_sub_title": "Conseil en Opérations Industrielles",
    "hero_telemetry_ecosystem": "ÉCOSYSTÈME ASML TIER-1 ET TIER-2",
    "hero_benchmarks_title": "Repères Vérifiés de Production et d'Approvisionnement",
    "calc_benchmark_badge": "Référence : 4 200 €/h",
    "calc_per_month": "/mois",
    "calc_roi_badge_suffix": "x ROI DU SPRINT",
    "calc_slider_aria": "Heures mensuelles d'arrêt en assemblage et salle blanche",
    "tab_p1_title": "Approvisionnement Mondial",
    "tab_p2_title": "Ligne d'Assemblage Continu",
    "tab_p3_title": "Écosystème ASML",
    "dossier_active_badge": "DOSSIER ACTIF",
    "dossier_hide_protocol": "Masquer le Protocole",
    "dmaic_case_evidence_title": "Preuves Empiriques de Cas DMAIC",
    "tool1_tag": "GMAO D'ACTIFS",
    "tool1_status": "Moteur Double BDD",
    "tool1_scope": "Synchronisation PostgreSQL + MSSQL",
    "tool2_tag": "CADENCE D'APPROVISIONNEMENT",
    "tool2_status": "PSI Automatisée",
    "tool2_scope": "Shenzhen · Ningbo · Inde",
    "tool3_tag": "TAKT DE LIGNE",
    "tool3_status": "MES Temps Réel",
    "tool3_title": "Diagnostic de Takt et Micro-Arrêts",
    "tool3_scope": "110-120 véhicules/poste",
    "tool3_desc": "Synchronisation de la cadence sur chaîne de montage automobile OEM, journalisation numérique de couple et résolution 8D.",
    "tool4_tag": "CONFORMITÉ EUV",
    "tool4_status": "ISO Classe 5",
    "tool4_title": "Gouvernance Particulaire en Salle Blanche",
    "tool4_scope": "Brainport Eindhoven",
    "tool4_desc": "Traçabilité des emballages électromécaniques, recertification de levage TÜV et suivi de lots sous ERP ISAH.",
    "tool_delivery_asset": "Actif Livrable Standard",
    "optiasset_kicker": "GESTION D'ACTIFS D'ENTREPRISE ET TÉLÉMÉTRIE DES ORDRES DE TRAVAIL",
    "optiasset_title": "OptiAsset GMAO : Télémetrie de Maintenance Haute Disponibilité",
    "optiasset_badge": "MOTEUR DOUBLE BASE DE DONNÉES",
    "optiasset_c1_title": "1. Télémetrie Temps Réel & Isolation des Pannes",
    "optiasset_c1_desc": "Suivi continu du MTBF et MTTR sur cellules de production actives. Intégration IoT directe avec émission d'ordres de travail en moins de 200 ms.",
    "optiasset_c2_title": "2. Synchroniseur Double Base de Données",
    "optiasset_c2_desc": "Réplication en sous-seconde entre serveurs de ligne MSSQL locaux et moteurs de reporting cloud PostgreSQL pour des audits sans indisponibilité.",
    "optiasset_c3_title": "3. Nomenclature (BOM) Automatisée des Pièces de Rechange",
    "optiasset_c3_desc": "Alertes de seuil de stock de sécurité connectées aux API de fournisseurs internationaux, évitant tout arrêt de ligne dû à des ruptures de composants.",
    "optiasset_footer_arch": "Architecture OptiAsset GMAO v4.2 · Déploiement Entreprise Validé en Production",
    "optiasset_footer_engine": "Moteur Double PostgreSQL + MSSQL",
    "lead_active_badge": "Mandat Principal Actif",
    "t1_duration": "14 Jours",
    "t2_duration": "Mensuel",
    "t2_commitment_badge": "ENGAGEMENT D'EXÉCUTION",
    "t3_duration": "5 Jours",
    "t3_policy_badge": "POLITIQUE SUR SITE",
    "dmaic_phase1_phase": "Définir",
    "dmaic_phase1_title": "Cadrage du Problème et Modélisation du COPQ",
    "dmaic_phase1_desc": "Formalisation de la charte opérationnelle, coûts de non-qualité (COPQ), goulets d'étranglement d'assemblage et matrices de risques d'arrêt de ligne.",
    "dmaic_phase1_output": "Charte de Projet et Cartographie de la Chaîne de Valeur (VSM)",
    "dmaic_phase2_phase": "Mesurer",
    "dmaic_phase2_title": "Télémetrie & Ligne de Base du Takt",
    "dmaic_phase2_desc": "Déploiement d'acquisition de données par clés dynamométriques numériques, enregistrement des défauts MES et suivi des écarts de temps de takt sur chaîne mobile.",
    "dmaic_phase2_output": "Capabilité Initiale (Cp/Cpk) & Registre de Takt",
    "dmaic_phase3_phase": "Analyser",
    "dmaic_phase3_title": "Cause Racine 8D & Isolation Ishikawa",
    "dmaic_phase3_desc": "Isoler les causes racines via les 5 Pourquoi, stratification de Pareto des défauts d'assemblage et non-conformités des matériaux fournisseurs.",
    "dmaic_phase3_output": "Rapport de Cause Racine 8D Validé",
    "dmaic_phase4_phase": "Améliorer",
    "dmaic_phase4_title": "Poka-Yoke & Rééquilibrage de Ligne",
    "dmaic_phase4_desc": "Mise en place de détrompeurs (poka-yoke), instructions de travail standardisées, ordonnancement en salle blanche et filtrage PSI direct des fournisseurs.",
    "dmaic_phase4_output": "-15% Taux de Défauts & -75% Coûts d'Approvisionnement",
    "dmaic_phase5_phase": "Contrôler",
    "dmaic_phase5_title": "SPC & Traçabilité sous ERP ISAH",
    "dmaic_phase5_desc": "Institutionnalisation de la maîtrise statistique des procédés (MSP/SPC), déclencheurs automatisés dans OptiAsset GMAO et protocoles d'audit.",
    "dmaic_phase5_output": "Standard Opérationnel Pérenne",
    "dmaic_deliverable_label": "Livrable :",
    "agile_kicker": "ACCÉLÉRATION AGILE ET CADENCE GEMBA",
    "agile_title": "Scrum Opérationnel : Sprints Kaizen de 2 Semaines et Synchronisation Gemba Quotidienne",
    "agile_subtitle": "Associer la rigueur statistique Six Sigma à des cycles d'exécution agiles rapides. Traduction des objectifs de rendement de la direction en vélocité quotidienne sur le terrain, remontée immédiate des blocages et verrouillage sans bureaucratie des standards de travail.",
    "agile_c1_sub": "Sprint Kaizen",
    "agile_c1_title": "Sprints Kaizen de 2 Semaines",
    "agile_c1_desc": "Sprints d'ingénierie temporels ciblant les micro-arrêts critiques, dérives d'étalonnage de couple et défauts fournisseurs avec des objectifs quantitatifs explicites.",
    "agile_c1_cadence": "Cadence : Itération Bimensuelle",
    "agile_c2_sub": "Point Terrain",
    "agile_c2_title": "Standups Quotidiens Gemba",
    "agile_c2_desc": "Points de 15 minutes au début de chaque poste devant le panneau visuel de ligne. Remontée technique directe des blocages sous 4 heures, éliminant les lenteurs d'emails.",
    "agile_c2_escalation": "Escalade : SLA de 4 Heures",
    "agile_c3_sub": "Contrôle de Flux",
    "agile_c3_title": "Limites WIP & Régulation du Flux",
    "agile_c3_desc": "Plafonds physiques et numériques stricts de travaux en cours (WIP) sur les zones tampons pour éviter l'encombrement de la ligne et les temps de file d'attente cachés.",
    "agile_c3_control": "Contrôle : Flux Continu",
    "agile_c4_sub": "Travail Standard",
    "agile_c4_title": "Rétro de Sprint & Verrouillage du Travail Standard",
    "agile_c4_desc": "Quantification empirique du temps de cycle récupéré, examen de la réduction des rebuts et verrouillage des améliorations dans les SOP numériques du MES.",
    "agile_c4_output": "Résultat : Standard Invariable",
    "field_tier_label": "Périmètre de Conseil / Niveau",
    "tier_opt_sprint": "Diagnostic Spend & Télémétrie à Distance de 14 Jours (5 500 €)",
    "tier_opt_fractional": "Directeur Direct Sourcing & Systèmes à Temps Partagé (8 500 €/mois)",
    "tier_opt_onsite": "Audit d'Usine sur Site & Analyse du Takt de 5 Jours (5 400 €)",
    "modal_company_label": "Entreprise :",
    "footer_tax_notice": "Facturation avec Numéro de TVA Européen · Brainport Eindhoven · Valence",
    "hero_m4_iso_badge": "Travail Électromécanique et Logistique d'Emballage Semi-conducteurs et Lithographie",
    "hero_m1_badge": "20 TEU / Trimestre · Direct Usine",
    "hero_m2_badge": "Acompte 30% / 70% après Validation PSI",
    "hero_m3_badge": "Flux Continu · -15% Taux de Défauts",
    "hero_m4_badge": "Travail Électromécanique et Logistique d'Emballage Semi-conducteurs et Lithographie",
    "calc_rate_label": "Coût d'Arrêt de Ligne Non Planifié :",
    "calc_rate_unit": "€/h",
    "calc_rate_benchmark": "Référence Européenne : 4 200 €/h",
    "calc_rate_min": "Min : 1 000 €/h",
    "calc_rate_max": "Max : 12 000 €/h (Montage OEM)"
  },
  "pt": {
    "status_ribbon": "DISPONIBILIDADE 4T/1T: 1 MANDATO DE CONSULTORIA ABERTO",
    "status_mode": "SPRINT DIAGNÓSTICO REMOTO DE 14 DIAS OU AUDITORIA NA FÁBRICA",
    "nav_brand_title": "DE SOUSA // OPERATIONS & SUPPLY CHAIN ADVISORY",
    "nav_brand_sub": "Consultoria Operacional de Liderança · OEM Automotivo & Salas Limpas",
    "nav_pillars": "Track Record",
    "nav_cases": "Casos Verificados",
    "nav_tooling": "Sistemas Proprietários",
    "nav_methodology": "Rigor DMAIC",
    "nav_pedigree": "Perfil Executivo",
    "nav_economics": "Serviços",
    "nav_cta": "Iniciar Diagnóstico",
    "hero_kicker": "Ecossistema ASML Tier-1 & Tier-2 // Consultoria Sênior em Operações Industriais",
    "hero_title": "Elimine paradas de fábrica e escale o fornecimento direto com a precisão do chão de fábrica.",
    "hero_subtitle": "Assessoria à liderança industrial em transformação operacional. Fundamentada em protocolos de montagem eletromecânica em sala limpa ASML (Tier-1/Tier-2), cadência de linha móvel automotiva OEM e compras internacionais diretas em alto volume.",
    "hero_cta_primary": "Solicitar Diagnóstico Operacional",
    "hero_cta_secondary": "Verificar Histórico Comprovado",
    "hero_m1_val": "$800K / ano Compras Diretas",
    "hero_m1_label": "Suprimentos Globais · APAC",
    "hero_m1_sub": "Compras industriais diretas na China e Índia em 20 contêineres/trimestre com auditorias PSI no local.",
    "hero_m2_val": "-75% Redução de Custos Unitários",
    "hero_m2_label": "Otimização de Custos · BOM",
    "hero_m2_sub": "Eliminação de intermediários via contratos diretos com fábricas e liberações de qualidade PSI.",
    "hero_m3_val": "110–120 Carros / Turno",
    "hero_m3_label": "Automotivo OEM · Operações de Chão de Fábrica Tier 1 & 2",
    "hero_m3_sub": "Operações de chão de fábrica Tier 1 & Tier 2 e fluxo contínuo em linha móvel (BMW Group & MINI Cooper na VDL Nedcar) com monitoramento digital de torque.",
    "hero_m4_val": "HQ Pack Tier 2 & 3 no Ecossistema de Semicondutores ASML",
    "hero_m4_label": "Semicondutores · High-Tech",
    "hero_m4_sub": "Montagem eletromecânica em sala limpa HQ Pack sob protocolos ISO Classe 5 EUV (Brainport Eindhoven).",
    "calc_title": "Estimador de impacto financeiro de paradas de fábrica e gargalos",
    "calc_badge": "Modelo Empírico de COPQ",
    "calc_slider_label": "Parada mensal de linha / Gargalo operacional:",
    "calc_hours": "h/mês",
    "calc_benchmark": "Referência Europeia: €4.200 / hora de parada não planejada",
    "calc_critical": "Parada Crítica (Crise de Produção)",
    "calc_loss_label": "Hemorragia mensal estimada de produção:",
    "calc_annual_label": "Perda anual acumulada:",
    "calc_recovery_label": "Potencial projetado de recuperação do sprint (~45%):",
    "calc_guarantee_note": "Garantia de Crédito de 100%: Se o diagnóstico de 14 dias não documentar pelo menos €16.500 em economias anuais de compras ou paradas de manutenção, 100% dos €5.500 são creditados em uma Auditoria Presencial ou Retainer Fracionário.",
    "calc_cta": "Solicitar Sprint Diagnóstico →",
    "pillars_kicker": "Intervenções Sistemáticas",
    "pillars_title": "Três Pilares Centrais da Prática de Consultoria Industrial",
    "pillars_subtitle": "Estruturados para eliminar desvios operacionais, reduzir custos de insumos e implementar disciplina fabril sem burocracia teórica.",
    "p1_kicker": "Pilar 01 // Compras Globais",
    "p1_title": "Fornecimento Internacional Direto e Governança de Qualidade",
    "p1_desc": "Arquitetura 100% remota. Eliminação de intermediários locais e estabelecimento de contratos diretos na saída da fábrica em Shenzhen, Ningbo e na Índia. Alocação de equipes de inspeção pré-embarque (PSI e CLI) e contratos estruturados por marcos.",
    "p1_f1": "Negociações fabris diretas sem intermediários (-75% de custo de materiais).",
    "p1_f2": "Engenheiros de inspeção técnica no local (PSI e CLI) sob padrões AQL.",
    "p1_f3": "Pagamentos estruturados por marcos (30% de entrada / 70% após aprovação na PSI).",
    "p1_drawer_btn": "Ver Protocolo de Governança de Sourcing em 5 Pontos",
    "p1_drawer_title": "Protocolo de 5 Pontos para Compras Diretas e Auditoria",
    "p1_d1": "Auditoria de Fábrica: Verificação documental completa, capacidade fabril e conformidade com certificações ISO 9001.",
    "p1_d2": "Segurança Comercial: Entrada de 30% e saldo de 70% liberado estritamente após aprovação na Inspeção Pré-Embarque (PSI).",
    "p1_d3": "Amostragem PSI no Local: Engenheiros de qualidade locais executando testes conforme MIL-STD-105E / ISO 2859-1 AQL II.",
    "p2_kicker": "Pilar 02 // Otimização de Linha",
    "p2_title": "Otimização de Linha de Montagem e Disciplina de Takt Time",
    "p2_desc": "Fundamentado na disciplina de linha de montagem móvel automotiva OEM (VDL Nedcar: BMW Group & MINI Cooper). Sincronização de takt de 110–120 unidades/turno, calibração de torquímetros digitais e resolução 8D de causas-raiz.",
    "p2_f1": "Sincronização de cadência de linha móvel (110–120 veículos/turno).",
    "p2_f2": "Calibração de torquímetros digitais em montagens de chassi e eixos.",
    "p2_f3": "Solução de problemas 8D reduzindo defeitos recorrentes em 15%.",
    "p2_drawer_btn": "Ver Fluxo de Balanceamento de Linha e Contenção 8D",
    "p2_drawer_title": "Balanceamento de Linha de Montagem e Fluxo de Qualidade 8D",
    "p2_d1": "Harmonização de Takt: Redistribuição de postos de trabalho para posicionar estações críticas abaixo do ciclo de 60 segundos.",
    "p2_d2": "Rastreabilidade de Torque: Integração de chaves digitais com registro automático de torque e ângulo vinculado a cada chassi (VIN).",
    "p2_d3": "Protocolo de Escalação 8D: Contenção de falhas em até 2 horas, diagrama de Ishikawa em 24 horas e Poka-Yoke definitivo em 7 dias.",
    "p3_kicker": "Pilar 03 // Sala Limpa Semicondutores",
    "p3_title": "Sala Limpa ASML e Embalagem Eletromecânica de Semicondutores",
    "p3_desc": "Rede de fornecedores de alta tecnologia de Brainport Eindhoven (HQ Pack). Protocolos de sala limpa ISO Classe 5 e 6, controle contra descargas eletrostáticas (ESD) e purga de nitrogênio para módulos de litografia ASML EUV.",
    "p3_f1": "Conformidade de processos em sala limpa ISO Classe 5 e Classe 6.",
    "p3_f2": "Prevenção de contaminação por partículas e proteção ESD para ótica EUV.",
    "p3_f3": "Protocolos de purga de nitrogênio com monitoramento de vácuo e umidade.",
    "p3_drawer_btn": "Ver Protocolo de Controle Particular e ESD em Sala Limpa",
    "p3_drawer_title": "Protocolo de Controle de Partículas e ESD em Sala Limpa",
    "p3_d1": "Monitoramento de Partículas: Contadores laser contínuos garantindo limites ISO 14644-1 Classe 5 (<3.520 partículas/m³ a ≥0,5 µm).",
    "p3_d2": "Aterramento e Resistividade ESD: Certificação ANSI/ESD S20.20 com resistividade de superfície entre 10^6 e 10^9 ohms.",
    "p3_d3": "Embalagem Hermética com N2: Película de barreira tripla com oxigênio residual abaixo de 0,1% para transporte de módulos ASML.",
    "cases_kicker": "Validação Empírica",
    "cases_title": "Resultados Industriais Documentados e Comprovados",
    "cases_subtitle": "Estudos de caso reais desenvolvidos em mandatos industriais diretos com retorno financeiro mensurado e metas atingidas.",
    "tab_case_sourcing": "Compras Internacionais",
    "tab_case_automotive": "Linha Automotiva OEM",
    "tab_case_cleanroom": "Sala Limpa Semicondutores",
    "c1_title": "US$ 800.000/ano em Compras Internacionais Diretas e Desintermediação",
    "c1_client": "Fabricante Médio de Componentes Industriais e Construção",
    "c1_challenge_title": "Desafio Operacional",
    "c1_challenge_text": "O cliente enfrentava margens de 40% a 75% cobradas por importadores locais, atrasos imprevisíveis de entrega e variações de qualidade nas matérias-primas.",
    "c1_intervention_title": "Intervenção Estratégica",
    "c1_intervention_text": "Desintermediação total da cadeia de suprimentos. Contratos diretos celebrados em Shenzhen e Ningbo com equipes de inspeção pré-embarque (PSI) e marcos de pagamento.",
    "c1_outcome_title": "Resultado Empírico",
    "c1_outcome_text": "Expansão de 75% na margem bruta dos insumos, fluxo estável de 20 contêineres/trimestre e economia anual sustentável de US$ 800.000.",
    "c1_metric_label": "Economia de Custos & Aumento de Margem",
    "c1_metric_val": "$800K/ano (-75% BOM)",
    "c2_title": "Linha Móvel de 110–120 Unidades/Turno e Harmonização de Takt",
    "c2_client": "VDL Nedcar (Montadora sob Contrato para BMW Group & MINI Cooper)",
    "c2_challenge_title": "Desafio Operacional",
    "c2_challenge_text": "Desequilíbrios na cadência da linha móvel e microparadas geravam variabilidade de ciclo e escape de falhas nas uniões de chassi e suspensão.",
    "c2_intervention_title": "Intervenção Estratégica",
    "c2_intervention_text": "Balanceamento de postos com calibração digital de torquímetros, investigação 8D de causa-raiz e padronização operacional sob normas da BMW.",
    "c2_outcome_title": "Resultado Empírico",
    "c2_outcome_text": "Cadência constante de 110–120 veículos/turno mantida, redução de 15% nos defeitos repetitivos e zero não conformidades em clientes finais.",
    "c2_metric_label": "Produtividade de Linha & Qualidade",
    "c2_metric_val": "110–120 Carros/Turno",
    "c3_title": "Embalagem em Sala Limpa ISO Classe 5 para Módulos de Litografia ASML EUV",
    "c3_client": "HQ Pack (Fornecedor Estratégico do Ecossistema ASML em Brainport)",
    "c3_challenge_title": "Desafio Operacional",
    "c3_challenge_text": "Exigências extremas de limpeza e prevenção contra ESD para componentes ópticos ASML exigiam processo de embalagem com zero defeitos sob ISO 14644-1 Classe 5.",
    "c3_intervention_title": "Intervenção Estratégica",
    "c3_intervention_text": "Estruturação de procedimentos validados de embalagem em sala limpa com contagem de partículas a laser, purga de nitrogênio e teste de solda térmica.",
    "c3_outcome_title": "Resultado Empírico",
    "c3_outcome_text": "100% de aprovação em auditorias de recebimento Tier-1 da ASML, com rastreabilidade completa de contaminação e ESD por remessa.",
    "c3_metric_label": "Conformidade em Sala Limpa",
    "c3_metric_val": "ISO Classe 5 / Zero Contaminação",
    "tooling_kicker": "Tecnologia Operacional",
    "tooling_title": "Sistemas Proprietários de Diagnóstico e Pipelines Automatizados de Dados",
    "tooling_subtitle": "Nada de relatórios teóricos: implementamos ferramentas práticas e funcionais diretamente conectadas ao chão da sua fábrica.",
    "tooling_banner_badge": "Sem Custos de Licenciamento de Software",
    "tooling_banner_text": "Todas as ferramentas desenvolvidas são transferidas como propriedade intelectual do cliente. Sem mensalidades ou assinaturas SaaS.",
    "tool1_title": "Arquitetura OptiAsset CMMS",
    "tool1_sub": "Sistema de manutenção preventiva e corretiva",
    "tool1_desc": "Despacho de ordens de serviço em sub-segundos, disparadores de manutenção preventiva e rastreamento de MTBF/MTTR para máquinas fabris.",
    "tool2_title": "Pipeline de Compras Diretas da Fábrica",
    "tool2_sub": "Plataforma de compras internacionais e gestão de qualidade",
    "tool2_desc": "Ferramentas de desintermediação automatizando inspeções pré-embarque, liberações de conhecimento de embarque e controle de custos de BOM com -75%.",
    "telemetry_table_title": "Especificações Técnicas de Sistemas Validadas",
    "telemetry_table_sub": "Relação de parâmetros de auditoria e normas de fábrica adotadas durante os mandatos:",
    "telemetry_sync_badge": "Integração Fabril em Tempo Real",
    "dmaic_kicker": "Metodologia Consolidada",
    "dmaic_title": "Ciclo Lean Six Sigma DMAIC & Sprints Kaizen Operacionais",
    "dmaic_subtitle": "Estrutura matemática e operacional por etapas para eliminar definitivamente desvios de processo e custos da má qualidade.",
    "pedigree_kicker": "Mandato Direto de Engenharia",
    "pedigree_title": "Perfil & Compromisso Pessoal do Engenheiro Líder",
    "pedigree_subtitle": "Você trabalha diretamente 1:1 com um engenheiro sênior com vasta experiência de chão de fábrica. Sem consultores novatos, sem intermediários, sem slides teóricos.",
    "lead_name": "Eduardo de Sousa",
    "lead_role": "Consultor Industrial Sênior · Operações & Cadeia de Suprimentos",
    "lead_pledge_title": "Garantia de Mandato Direto 1 a 1",
    "lead_pledge_text": "\"Ao me confiar um mandato, você conta com minha presença direta na sua fábrica e na tomada de decisões com sua diretoria. Cada protocolo, cada modelo estatístico e cada ajuste no processo é elaborado, validado e homologado pessoalmente por mim.\"",
    "lead_btn_triage": "Agendar Triagem de 20 Min",
    "lead_btn_whatsapp": "Canal Direto de WhatsApp",
    "lead_btn_linkedin": "Perfil Verificado no LinkedIn ↗",
    "cred1_title": "Mestrado em Engenharia Industrial e Gestão de Operações",
    "cred1_inst": "Universidade Politécnica de Valência (ETSII)",
    "cred1_desc": "Ênfase em projeto e layout de fábricas, balanceamento de linhas de montagem e modelagem logística.",
    "cred2_title": "Bacharelado em Engenharia Mecânica",
    "cred2_inst": "Universidade Politécnica de Valência (ETSII)",
    "cred2_desc": "Projeto mecânico, termodinâmica, processos de fabricação e resistência dos materiais.",
    "cred3_title": "Lean Six Sigma Black Belt",
    "cred3_inst": "Certificação Profissional Industrial",
    "cred3_desc": "Controle Estatístico de Processo (CEP/SPC), Análise de Sistemas de Medição (MSA) e liderança de projetos DMAIC.",
    "cred4_title": "Experiência Fabril em OEM Automotivo e Semicondutores",
    "cred4_inst": "VDL Nedcar & HQ Pack",
    "cred4_desc": "Atuação direta na linha de frente em plantas fabris fornecedoras do BMW Group e do ecossistema ASML.",
    "pricing_kicker": "Mandatos Objetivos",
    "pricing_title": "Mandatos de Consultoria Estruturados: Entregáveis Definidos, Orçamento Fechado",
    "pricing_subtitle": "Sem surpresas com taxas horárias em aberto. Projetos fechados com metas claras, responsabilidade técnica e garantia de ROI contratual.",
    "pricing_vat_notice": "Valores apresentados sem incidência de impostos e despesas de viagem conforme normas B2B europeias.",
    "t1_badge": "ESPECIFICAÇÃO 01 // DIAGNÓSTICO REMOTO",
    "t1_name": "Diagnóstico Remoto de Spend e Telemetria (14 Dias)",
    "t1_price": "€5.500",
    "t1_period": "/ sprint fechado",
    "t1_desc": "Diagnóstico intensivo 100% remoto de dispersão em compras, contratos redundantes de fornecedores e registros de paradas no CMMS.",
    "t1_roi_badge": "GARANTIA DE CRÉDITO DE 100%",
    "t1_roi_text": "Se não identificarmos pelo menos €16.500 em variações de preço unitário, redundâncias de contratos ou ineficiências de mão de obra em 14 dias, 100% do seu honorário de €5.500 é creditado para uma Auditoria Presencial ou Retainer Fracionário.",
    "t1_btn": "Contratar Diagnóstico de 14 Dias",
    "t2_highlight": "[ MANDATO EXECUTIVO PRINCIPAL ]",
    "t2_badge": "ESPECIFICAÇÃO 03 // LIDERANÇA FRACIONÁRIA",
    "t2_name": "Diretor Fracionário de Sourcing Direto e Sistemas",
    "t2_price": "€8.500",
    "t2_period": "/ mês",
    "t2_cadence": "Equivalente a 2 Dias/Semana • Execução Assíncrona Prioritária",
    "t2_desc": "Direção executiva contínua. Negociações diretas com fábricas na Ásia/LATAM, governança de CMMS (PostgreSQL/MSSQL) e automação de fluxos ERP.",
    "t2_term": "Contrato inicial de 3 meses · Aviso prévio de 30 dias após esse período",
    "t2_btn": "Contratar Mandato Fracionário",
    "t3_badge": "ESPECIFICAÇÃO 02 // AUDITORIA PRESENCIAL",
    "t3_name": "Auditoria Física de Fábrica e Takt Time de 5 Dias",
    "t3_price": "€5.400",
    "t3_period": "/ sprint de 5 dias (+ despesas)",
    "t3_desc": "Gemba walks no chão de fábrica, cronometragem de takt em linhas móveis e gargalos, verificação gage R&R / calibração de torque e roteiro 8D.",
    "t3_travel_note": "Despesas de viagem e hospedagem sob política corporativa do cliente",
    "t3_btn": "Solicitar Auditoria na Fábrica",
    "intake_kicker": "Contato Direto",
    "intake_title": "Agendar Reunião Técnica de Alinhamento ou Enviar Briefing Assíncrono",
    "intake_subtitle": "Avaliação técnica direta com o engenheiro sênior resguardada por acordo bilateral de confidencialidade (Bilateral NDA).",
    "intake_badge_nda": "Sigilo Assegurado",
    "intake_point1": "Conversa estritamente técnica: você dialoga diretamente com o engenheiro sobre números e gargalos reais.",
    "intake_point2": "Primeira triagem técnica estruturada enviada em até 24 horas.",
    "intake_point3": "Acordo de confidencialidade mútuo (NDA) automaticamente ativado para todos os dados industriais compartilhados.",
    "opt1_kicker": "Caminho Mais Rápido · Sem Formulários",
    "opt1_title": "Opção 1: Agendar videoconferência direta de 20 minutos",
    "opt1_desc": "Escolha um horário livre na agenda do engenheiro Eduardo de Sousa através do Cal.com.",
    "opt1_format_label": "Formato:",
    "opt1_format_val": "Vídeochamada 1:1 (Google Meet)",
    "opt1_lead_label": "Engenheiro:",
    "opt1_lead_val": "Eduardo de Sousa (Lead Engineer)",
    "opt1_legal_label": "Jurídico:",
    "opt1_legal_val": "Acordo Bilateral de NDA Ativo",
    "opt1_btn_cal": "Agendar Cadragem de 20 Min →",
    "opt1_whatsapp": "Mensagem via WhatsApp Direto",
    "opt1_email": "E-mail Direto",
    "opt2_kicker": "Triagem Assíncrona · Envio Rápido",
    "opt2_title": "Opção 2: Formulário breve de 3 campos",
    "opt2_desc": "Prefere uma análise inicial por escrito? Informe seus dados de contato e o principal desafio da sua fábrica.",
    "field_name_label": "Nome Completo & Cargo *",
    "field_name_placeholder": "ex.: Eng. Carlos Mendes, Diretor Industrial",
    "field_company_label": "Empresa / Planta Industrial *",
    "field_company_placeholder": "ex.: Metalúrgica Paulista S/A",
    "field_email_label": "E-mail Corporativo *",
    "field_email_placeholder": "ex.: c.mendes@metalurgicapaulista.com.br",
    "field_bottleneck_label": "Principal Gargalo Operacional / Desafio",
    "field_bottleneck_placeholder": "ex.: Paradas mensais de cerca de 14 horas na linha de montagem 2",
    "opt2_btn_submit": "Enviar Dossiê de Mandato →",
    "opt2_submitting": "Criptografando Dossiê...",
    "opt2_footer_note": "100% confidencial · Acordo bilateral de NDA vigente · Análise direta pelo engenheiro líder",
    "modal_title": "Dossiê de mandato registrado com sucesso",
    "modal_ref_label": "Protocolo do Mandato:",
    "modal_nda_badge": "Acordo Bilateral de NDA Ativado",
    "modal_mandate_scope": "Escopo de Consultoria Selecionado:",
    "modal_lead_label": "Engenheiro Responsável:",
    "modal_btn_cal": "Vincular Horário via Cal.com →",
    "modal_btn_whatsapp": "Confirmar via WhatsApp Direto",
    "modal_btn_email": "Receber Cópia por E-mail",
    "modal_btn_return": "Fechar e Voltar ao Site",
    "footer_brand": "DE SOUSA // OPERATIONS & SUPPLY CHAIN ADVISORY",
    "footer_sub": "Consultoria industrial independente especializada em montagem automotiva OEM e instalações de semicondutores.",
    "footer_nda": "Acordo Bilateral de Confidencialidade (NDA) Garantido para Todos os Mandatos · Todos os Direitos Reservados © 2026",
    "calc_annual_recovery": "Recuperação anual estimada:",
    "mid_cta_badge": "GARANTIA DE CRÉDITO DE 100% ASSEGURADA",
    "mid_cta_title": "Identifique Perdas Auditáveis de Rentabilidade em 14 Dias",
    "mid_cta_subtitle": "Reserve o seu Diagnóstico Remoto de 14 Dias. Se não comprovarmos pelo menos €16.500 em desvios de compras ou paradas de manutenção, 100% dos €5.500 são creditados em auditoria presencial ou mandato executivo.",
    "mid_cta_btn": "Reservar Diagnóstico de 14 Dias →",
    "ribbon_direct_engagement": "ENGAJAMENTO DIRETO",
    "nav_brand_sub_title": "Consultoria de Operações Industriais",
    "hero_telemetry_ecosystem": "ECOSSISTEMA ASML TIER-1 E TIER-2",
    "hero_benchmarks_title": "Métricas Verificadas de Produção e Suprimentos",
    "calc_benchmark_badge": "Referência: €4.200/h",
    "calc_per_month": "/mês",
    "calc_roi_badge_suffix": "x ROI DO SPRINT",
    "calc_slider_aria": "Horas mensais de inatividade em montagem e sala limpa",
    "tab_p1_title": "Suprimentos Globais",
    "tab_p2_title": "Linha de Montagem Móvel",
    "tab_p3_title": "Ecossistema ASML",
    "dossier_active_badge": "DOSSIÊ ATIVO",
    "dossier_hide_protocol": "Ocultar Protocolo",
    "dmaic_case_evidence_title": "Evidência Empírica de Casos DMAIC",
    "tool1_tag": "CMMS DE ATIVOS",
    "tool1_status": "Motor Dual-DB",
    "tool1_scope": "Sincronização PostgreSQL + MSSQL",
    "tool2_tag": "CADÊNCIA DE SUPRIMENTOS",
    "tool2_status": "PSI Automatizada",
    "tool2_scope": "Shenzhen · Ningbo · Índia",
    "tool3_tag": "TAKT DE LINHA",
    "tool3_status": "MES em Tempo Real",
    "tool3_title": "Diagnóstico de Takt e Microparadas",
    "tool3_scope": "110-120 carros/turno",
    "tool3_desc": "Sincronização de cadência em linhas móveis de OEM automotivo, registro digital de torque e rastreamento de causa raiz 8D.",
    "tool4_tag": "CONFORMIDADE EUV",
    "tool4_status": "ISO Classe 5",
    "tool4_title": "Governança de Partículas em Sala Limpa",
    "tool4_scope": "Brainport Eindhoven",
    "tool4_desc": "Rastreabilidade de embalagens eletromecânicas, recertificação de guinchos TÜV e pipelines de lotes no ISAH ERP.",
    "tool_delivery_asset": "Entregável Padrão de Projeto",
    "optiasset_kicker": "GESTÃO DE ATIVOS EMPRESARIAIS E TELEMETRIA DE ORDENS DE SERVIÇO",
    "optiasset_title": "OptiAsset CMMS: Telemetria de Manutenção de Alta Disponibilidade",
    "optiasset_badge": "MOTOR DE BANCO DE DADOS DUAL",
    "optiasset_c1_title": "1. Telemetria em Tempo Real e Isolamento de Falhas",
    "optiasset_c1_desc": "Monitoramento contínuo de MTBF e MTTR em células de produção ativas. Integração IoT direta com geração automatizada de ordens de serviço abaixo de 200 ms.",
    "optiasset_c2_title": "2. Sincronizador de Banco de Dados Dual",
    "optiasset_c2_desc": "Replicação em sub-segundos entre servidores locais MSSQL na linha e motores de relatórios em nuvem PostgreSQL para auditorias com zero inatividade.",
    "optiasset_c3_title": "3. BOM de Peças de Reposição Automatizado",
    "optiasset_c3_desc": "Alertas de estoque de segurança vinculados diretamente a APIs de fornecedores internacionais, eliminando paradas de linha por falta de componentes.",
    "optiasset_footer_arch": "Arquitetura OptiAsset CMMS v4.2 · Implantação Empresarial Verificada em Produção",
    "optiasset_footer_engine": "Motor Dual PostgreSQL + MSSQL",
    "lead_active_badge": "Mandato Principal Ativo",
    "t1_duration": "14 Dias",
    "t2_duration": "Mensal",
    "t2_commitment_badge": "COMPROMISSO DE EXECUÇÃO",
    "t3_duration": "5 Dias",
    "t3_policy_badge": "POLÍTICA PRESENCIAL",
    "dmaic_phase1_phase": "Definir",
    "dmaic_phase1_title": "Enquadramento do Problema e Modelagem de COPQ",
    "dmaic_phase1_desc": "Formalização do termo operacional, custos de má qualidade (COPQ) por refugos, gargalos de montagem e matrizes de risco de paradas de linha.",
    "dmaic_phase1_output": "Termo de Abertura e Mapeamento do Fluxo de Valor (VSM)",
    "dmaic_phase2_phase": "Medir",
    "dmaic_phase2_title": "Telemetria e Linha de Base do Takt",
    "dmaic_phase2_desc": "Implantação de aquisição de dados por torquímetros digitais, registro de defeitos no MES e monitoramento de variação do tempo de takt em linha móvel.",
    "dmaic_phase2_output": "Capabilidade Inicial (Cp/Cpk) e Registro de Takt",
    "dmaic_phase3_phase": "Analisar",
    "dmaic_phase3_title": "Causa Raiz 8D e Isolamento Ishikawa",
    "dmaic_phase3_desc": "Isolar vetores reais de causa raiz por meio dos 5 Porquês, estratificação de Pareto de defeitos de montagem e não conformidades de fornecedores.",
    "dmaic_phase3_output": "Relatório Validado de Causa Raiz 8D",
    "dmaic_phase4_phase": "Melhorar",
    "dmaic_phase4_title": "Poka-Yoke e Rebalanceamento de Linha",
    "dmaic_phase4_desc": "Implementar dispositivos à prova de erros (poka-yoke), instruções de trabalho padrão, sequenciamento de sala limpa e barreiras PSI de fornecedores.",
    "dmaic_phase4_output": "-15% Taxa de Defeitos e -75% Custos de Suprimentos",
    "dmaic_phase5_phase": "Controlar",
    "dmaic_phase5_title": "SPC e Rastreabilidade no ISAH ERP",
    "dmaic_phase5_desc": "Institucionalizar Controle Estatístico de Processo (CEP/SPC), disparadores automatizados no OptiAsset CMMS e protocolos de auditoria.",
    "dmaic_phase5_output": "Padrão Operacional Sustentado",
    "dmaic_deliverable_label": "Entregável:",
    "agile_kicker": "ACELERAÇÃO ÁGIL E CADÊNCIA GEMBA",
    "agile_title": "Scrum Operacional: Sprints Kaizen de 2 Semanas e Sincronização Diária no Gemba",
    "agile_subtitle": "Unindo o rigor estatístico de Six Sigma com ciclos de execução ágil rápida. Traduzindo metas executivas de produtividade em velocidade diária no chão de fábrica, escalonamento imediato de bloqueios e consolidação sem burocracia do trabalho padrão.",
    "agile_c1_sub": "Sprint Kaizen",
    "agile_c1_title": "Sprints Kaizen de 2 Semanas",
    "agile_c1_desc": "Sprints de engenharia com prazo fixo focados em microparadas de alta prioridade, desvios de calibração de torque e falhas de fornecedores com metas quantitativas explícitas.",
    "agile_c1_cadence": "Cadência: Iteração Quinzenal",
    "agile_c2_sub": "Standup de Chão de Fábrica",
    "agile_c2_title": "Standups Diários no Gemba",
    "agile_c2_desc": "Reuniões de 15 minutos no início do turno diante do quadro visual da linha. Escalonamento direto de impedimentos técnicos em até 4 horas, eliminando trocas lentas de e-mails.",
    "agile_c2_escalation": "Escalonamento: SLA de 4 Horas",
    "agile_c3_sub": "Controle de Fluxo",
    "agile_c3_title": "Limites de WIP e Controle de Fluxo",
    "agile_c3_desc": "Limites rígidos físicos e digitais de Trabalho em Andamento (WIP) nos estágios de buffer para evitar congestionamento na linha móvel e tempos ocultos de fila.",
    "agile_c3_control": "Controle: Fluxo Contínuo",
    "agile_c4_sub": "Trabalho Padrão",
    "agile_c4_title": "Retrospectiva de Sprint e Fixação de Trabalho Padrão",
    "agile_c4_desc": "Quantificação empírica da recuperação do tempo de ciclo, revisão da redução de refugos e fixação de melhorias validadas em SOPs digitais do MES antes do fechamento do sprint.",
    "agile_c4_output": "Resultado: Padrão Imutável",
    "field_tier_label": "Escopo da Consultoria / Nível",
    "tier_opt_sprint": "Diagnóstico Remoto de Spend e Telemetria de 14 Dias (€5.500)",
    "tier_opt_fractional": "Diretor Fracionário de Sourcing Direto e Sistemas (€8.500/mês)",
    "tier_opt_onsite": "Auditoria Física de Fábrica e Takt de 5 Dias (€5.400)",
    "modal_company_label": "Empresa:",
    "footer_tax_notice": "Faturado com NIF/NIPC Europeu · Brainport Eindhoven · Valência",
    "hero_m4_iso_badge": "Trabalho Eletromecânico e Logístico de Embalagem para Semicondutores e Litografia",
    "hero_m1_badge": "20 TEU / Trimestre · Direto da Fábrica",
    "hero_m2_badge": "30% Sinal / 70% Pós-Liberação PSI",
    "hero_m3_badge": "Fluxo Contínuo · -15% Taxa de Defeitos",
    "hero_m4_badge": "Trabalho Eletromecânico e Logístico de Embalagem para Semicondutores e Litografia",
    "calc_rate_label": "Custo de Parada de Linha Não Programada:",
    "calc_rate_unit": "€/h",
    "calc_rate_benchmark": "Referência Europeia: €4.200/h",
    "calc_rate_min": "Mín: €1.000/h",
    "calc_rate_max": "Máx: €12.000/h (Montagem OEM)"
  }
};

export default function SwissB2BAdvisory({
  initialLanguage
}: {
  initialLanguage?: SupportedLanguage;
}) {
  const SUPPORTED_LANGS: SupportedLanguage[] = ['en', 'es', 'de', 'nl', 'fr', 'pt'];
  const [lang, setLang] = useState<SupportedLanguage>(
    initialLanguage && SUPPORTED_LANGS.includes(initialLanguage) ? initialLanguage : 'en'
  );
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downtimeHours, setDowntimeHours] = useState(14);
  const [hourlyRate, setHourlyRate] = useState(4200);
  const [activeDossier, setActiveDossier] = useState<'p1' | 'p2' | 'p3'>('p1');
  const [expandedDrawers, setExpandedDrawers] = useState<Record<string, boolean>>({
    p1: false,
    p2: false,
    p3: false
  });
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    scope: 'cleanroom',
    bottleneck: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    mandateId: string;
    companyName: string;
    tier: string;
  }>({
    isOpen: false,
    mandateId: '',
    companyName: '',
    tier: ''
  });

  const handleLanguageChange = (newL: SupportedLanguage) => {
    setLang(newL);
    setLangOpen(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newL);
      window.history.replaceState({}, '', url.toString());
      try {
        localStorage.setItem('preferred_language', newL);
        localStorage.setItem('preferred_lang', newL);
        document.cookie = `preferred_lang=${newL};path=/;max-age=31536000;SameSite=Lax`;
        window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang: newL } }));
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    // 1. If explicit initialLanguage passed from server, use it
    if (initialLanguage && SUPPORTED_LANGS.includes(initialLanguage)) {
      setLang(initialLanguage);
      return;
    }

    if (typeof window !== 'undefined') {
      // 2. Check URL ?lang= parameter
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang') as SupportedLanguage | null;
      if (urlLang && SUPPORTED_LANGS.includes(urlLang)) {
        setLang(urlLang);
        return;
      }

      // 3. Check localStorage or cookie preference
      try {
        const stored = (localStorage.getItem('preferred_language') || localStorage.getItem('preferred_lang')) as SupportedLanguage | null;
        if (stored && SUPPORTED_LANGS.includes(stored)) {
          setLang(stored);
          return;
        }
        const cookieMatch = document.cookie.match(/(?:^|;\s*)preferred_lang=([^;]+)/);
        if (cookieMatch && SUPPORTED_LANGS.includes(cookieMatch[1] as SupportedLanguage)) {
          setLang(cookieMatch[1] as SupportedLanguage);
          return;
        }
      } catch {
        // ignore
      }

      // 4. Auto-detect from visitor device languages (navigator.languages / navigator.language)
      try {
        const deviceLangs = navigator.languages && navigator.languages.length > 0
          ? navigator.languages
          : [navigator.language || 'en'];

        for (const rawLang of deviceLangs) {
          const primary = rawLang.split('-')[0].toLowerCase() as SupportedLanguage;
          if (SUPPORTED_LANGS.includes(primary)) {
            setLang(primary);
            localStorage.setItem('preferred_language', primary);
            document.cookie = `preferred_lang=${primary};path=/;max-age=31536000;SameSite=Lax`;
            return;
          }
        }
      } catch {
        // ignore
      }
    }
  }, [initialLanguage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && bookingModal.isOpen) {
        setBookingModal(prev => ({ ...prev, isOpen: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookingModal.isOpen]);

  const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS.en, [lang]);

  const toggleDrawer = (id: string) => {
    setExpandedDrawers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectTier = (tierName: string) => {
    setSelectedTier(tierName);
    const element = document.getElementById('advisory-inquiry');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const timestamp = Date.now().toString(36).toUpperCase();
    const generatedMandateId = `EDS-MANDATE-${timestamp}-${randomSuffix}`;

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          brief: formData.bottleneck,
          bottleneck: formData.bottleneck,
          mandateScope: selectedTier || t.tier_opt_sprint,
          tier: selectedTier || t.tier_opt_sprint,
          lang: lang,
          mandateId: generatedMandateId
        })
      });
      const data = await response.json();
      const finalMandateId = (data && data.mandateId) ? data.mandateId : generatedMandateId;
      setBookingModal({
        isOpen: true,
        mandateId: finalMandateId,
        companyName: formData.company || 'Industrial Facility',
        tier: selectedTier || t.tier_opt_sprint
      });
    } catch {
      setBookingModal({
        isOpen: true,
        mandateId: generatedMandateId,
        companyName: formData.company || 'Industrial Facility',
        tier: selectedTier || t.tier_opt_sprint
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const monthlyLoss = downtimeHours * hourlyRate;
  const annualLoss = monthlyLoss * 12;
  const monthlyRecovery = Math.round(monthlyLoss * 0.45);
  const annualRecovery = monthlyRecovery * 12;
  const sprintRoiMultiplier = Math.max(1, Math.round(annualRecovery / 5500));

  const toolingSpecs = [
    {
      tag: t.tool1_tag,
      status: t.tool1_status,
      title: t.tool1_title,
      scope: t.tool1_scope,
      desc: t.tool1_desc,
    },
    {
      tag: t.tool2_tag,
      status: t.tool2_status,
      title: t.tool2_title,
      scope: t.tool2_scope,
      desc: t.tool2_desc,
    },
    {
      tag: t.tool3_tag,
      status: t.tool3_status,
      title: t.tool3_title,
      scope: t.tool3_scope,
      desc: t.tool3_desc,
    },
    {
      tag: t.tool4_tag,
      status: t.tool4_status,
      title: t.tool4_title,
      scope: t.tool4_scope,
      desc: t.tool4_desc,
    },
  ];

  const dmaicPhases = [
    {
      step: '01',
      phase: t.dmaic_phase1_phase,
      title: t.dmaic_phase1_title,
      description: t.dmaic_phase1_desc,
      output: t.dmaic_phase1_output,
    },
    {
      step: '02',
      phase: t.dmaic_phase2_phase,
      title: t.dmaic_phase2_title,
      description: t.dmaic_phase2_desc,
      output: t.dmaic_phase2_output,
    },
    {
      step: '03',
      phase: t.dmaic_phase3_phase,
      title: t.dmaic_phase3_title,
      description: t.dmaic_phase3_desc,
      output: t.dmaic_phase3_output,
    },
    {
      step: '04',
      phase: t.dmaic_phase4_phase,
      title: t.dmaic_phase4_title,
      description: t.dmaic_phase4_desc,
      output: t.dmaic_phase4_output,
    },
    {
      step: '05',
      phase: t.dmaic_phase5_phase,
      title: t.dmaic_phase5_title,
      description: t.dmaic_phase5_desc,
      output: t.dmaic_phase5_output,
    },
  ];


  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#0066CC] selection:text-white">
      
      {/* 1. TOP INSTITUTIONAL TRUST RIBBON (McKinsey / Deloitte Style) */}
      <div className="bg-[#051C2C] text-slate-200 text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </span>
            <span className="font-semibold tracking-wide text-white">
              {t.status_ribbon}
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-emerald-400 font-medium hidden sm:inline">{t.status_mode}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="text-emerald-400">●</span>
            <span>{t.ribbon_direct_engagement}</span>
          </div>
        </div>
      </div>

      {/* 2. CORPORATE NAVIGATION (High-Contrast Border, Balanced Spacing) */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b-2 border-slate-300 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Monogram & Wordmark */}
            <a href="#hero" className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] rounded-lg p-1 -ml-1 transition-colors">
              <div className="relative shrink-0 w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/es-monogram-hd.png"
                  alt="De Sousa Monogram"
                  width={56}
                  height={56}
                  unoptimized
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(4,11,20,0.18)]"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  priority
                />
              </div>
              <div className="flex flex-col shrink-0">
                <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#040B14] group-hover:text-[#0066CC] transition-colors uppercase leading-none sm:leading-tight">
                  De Sousa
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500 uppercase whitespace-nowrap mt-0.5">
                  {t.nav_brand_sub_title}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 mr-2 xl:mr-6">
              <a 
                href="#pillars" 
                className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold tracking-normal text-slate-700 hover:text-[#0066CC] hover:bg-slate-50 rounded-md transition-colors whitespace-nowrap"
              >
                {t.nav_pillars}
              </a>
              <a 
                href="#systems" 
                className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold tracking-normal text-slate-700 hover:text-[#0066CC] hover:bg-slate-50 rounded-md transition-colors whitespace-nowrap"
              >
                {t.nav_tooling}
              </a>
              <a 
                href="#profile" 
                className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold tracking-normal text-slate-700 hover:text-[#0066CC] hover:bg-slate-50 rounded-md transition-colors whitespace-nowrap"
              >
                {t.nav_pedigree}
              </a>
              <a 
                href="#services" 
                className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold tracking-normal text-slate-700 hover:text-[#0066CC] hover:bg-slate-50 rounded-md transition-colors whitespace-nowrap"
              >
                {t.nav_economics}
              </a>
              <a 
                href="#methodology" 
                className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold tracking-normal text-slate-700 hover:text-[#0066CC] hover:bg-slate-50 rounded-md transition-colors whitespace-nowrap"
              >
                {t.nav_methodology}
              </a>
            </nav>

            {/* Language Selector & CTA (Clean separation from Economics link) */}
            <div className="flex items-center gap-3.5 pl-4 border-l border-slate-300">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 min-h-[44px] px-3 py-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-300 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC]"
                  aria-label="Select Language"
                >
                  <Globe className="w-3.5 h-3.5 text-[#0066CC]" />
                  <span className="uppercase">{lang}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50 text-xs">
                    {(['en', 'es', 'de', 'nl', 'fr', 'pt'] as SupportedLanguage[]).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => {
                          handleLanguageChange(l);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 min-h-[38px] ${
                          lang === l ? 'font-bold text-[#0066CC] bg-blue-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>
                          {l === 'en' ? 'English' : l === 'es' ? 'Español' : l === 'de' ? 'Deutsch' : l === 'nl' ? 'Nederlands' : l === 'fr' ? 'Français' : 'Português'}
                        </span>
                        {lang === l && <Check className="w-3.5 h-3.5 text-[#0066CC]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary Header CTA */}
              <a
                href="#advisory-inquiry"
                className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#040B14] hover:bg-[#081a30] active:scale-[0.99] rounded-lg border border-[#00D2FF]/40 hover:border-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] focus-visible:ring-offset-2"
              >
                {t.nav_cta}
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 text-slate-700 hover:bg-slate-100 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg">
            <nav className="flex flex-col space-y-1">
              <a
                href="#pillars"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-md"
              >
                {t.nav_pillars}
              </a>
              <a
                href="#systems"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-md"
              >
                {t.nav_tooling}
              </a>
              <a
                href="#profile"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-md"
              >
                {t.nav_pedigree}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-md"
              >
                {t.nav_economics}
              </a>
              <a
                href="#methodology"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-md"
              >
                {t.nav_methodology}
              </a>
              <div className="pt-3">
                <a
                  href="#advisory-inquiry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center min-h-[48px] px-5 py-3 text-sm font-semibold text-white bg-[#040B14] hover:bg-[#081a30] border border-[#00D2FF]/40 rounded-lg shadow-sm transition-colors"
                >
                  {t.nav_cta}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* 3. EXECUTIVE HERO SECTION (Industrial Background, Grounded Proof) */}
      <section id="hero" className="relative bg-slate-100 pt-8 pb-14 lg:pt-12 lg:pb-18 border-b-2 border-slate-300 overflow-hidden">
        {/* Real Industrial High-Precision Manufacturing Photographic Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero-industrial-backdrop.jpg"
            alt="Advanced Precision Industrial Manufacturing Facility"
            fill
            priority
            className="object-cover object-center opacity-70 contrast-[1.05]"
            sizes="100vw"
          />
          {/* Executive gradient overlay: high contrast for text on left while robotic manufacturing facility is distinctly visible on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/90 to-white/60 sm:to-white/40" />
          {/* Crisp Technical CAD Wireframe Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.12]" 
            style={{
              backgroundImage: 'linear-gradient(to right, #00D2FF 1px, transparent 1px), linear-gradient(to bottom, #00D2FF 1px, transparent 1px)',
              backgroundSize: '36px 36px'
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#040B14] border border-[#00D2FF]/40 rounded-lg sm:rounded-full mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#00D2FF]">
                {t.hero_kicker}
              </span>
            </div>

            {/* Action Title (McKinsey Style) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#040B14] leading-[1.12]">
              {t.hero_title}
            </h1>

            {/* Executive Subtitle */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed max-w-3xl">
              {t.hero_subtitle}
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#advisory-inquiry"
                className="relative group overflow-hidden inline-flex items-center justify-center min-h-[48px] px-7 py-3 text-sm font-semibold text-white bg-[#040B14] hover:bg-[#081a30] active:scale-[0.99] rounded-lg border border-[#00D2FF]/40 hover:border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.22)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] focus-visible:ring-offset-2"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <span>{t.hero_cta_primary}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#track-record"
                className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.99] rounded-md shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2"
              >
                {t.hero_cta_secondary}
              </a>
            </div>
          </div>

          {/* High-Density Grounded Metric Ribbon (Reduced Margin, High-Effort Architectural Styling) */}
          <div className="mt-7 pt-6 border-t border-slate-200/80">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3.5">
              {t.hero_benchmarks_title}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Metric 1: Global Procurement */}
              <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-xl min-w-0 shadow-2xs hover:border-[#0066CC] hover:shadow-md transition-all duration-300 group flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#0066CC] flex items-start justify-between gap-2">
                    <span className="leading-snug">{t.hero_m1_label}</span>
                    <span className="relative flex h-2 w-2 shrink-0 mt-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066CC]" />
                    </span>
                  </div>
                  <div className="mt-2 text-base sm:text-lg lg:text-xl font-extrabold text-[#051C2C] tracking-tight leading-snug">
                    {t.hero_m1_val}
                  </div>
                  <div className="mt-1.5 text-xs text-slate-600 leading-snug text-left">
                    {t.hero_m1_sub}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 font-mono text-[10.5px] text-slate-700 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                  <span className="font-semibold leading-snug">{t.hero_m1_badge}</span>
                </div>
              </div>

              {/* Metric 2 (Position 2): Semiconductor High-Tech HQPack / ASML Ecosystem */}
              <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-xl min-w-0 shadow-2xs hover:border-[#0066CC] hover:shadow-md transition-all duration-300 group flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-start justify-between gap-2">
                    <span className="group-hover:text-[#0066CC] transition-colors leading-snug">{t.hero_m4_label}</span>
                    <span className="relative flex h-2 w-2 shrink-0 mt-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  </div>
                  <div className="mt-2 text-base sm:text-lg lg:text-xl font-extrabold text-[#051C2C] tracking-tight leading-snug">
                    {t.hero_m4_val}
                  </div>
                  <div className="mt-1.5 text-xs text-slate-600 leading-snug text-left">
                    {t.hero_m4_sub}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 font-mono text-[10.5px] text-slate-700 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                  <span className="font-semibold leading-snug">{t.hero_m4_badge}</span>
                </div>
              </div>

              {/* Metric 3 (Position 3): Unit Cost Disintermediation */}
              <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-xl min-w-0 shadow-2xs hover:border-emerald-600 hover:shadow-md transition-all duration-300 group flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-700 flex items-start justify-between gap-2">
                    <span className="leading-snug">{t.hero_m2_label}</span>
                    <span className="relative flex h-2 w-2 shrink-0 mt-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  </div>
                  <div className="mt-2 text-base sm:text-lg lg:text-xl font-extrabold text-emerald-700 tracking-tight leading-snug">
                    {t.hero_m2_val}
                  </div>
                  <div className="mt-1.5 text-xs text-slate-600 leading-snug text-left">
                    {t.hero_m2_sub}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 font-mono text-[10.5px] text-slate-700 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                  <span className="font-semibold leading-snug">{t.hero_m2_badge}</span>
                </div>
              </div>

              {/* Metric 4 (Position 4): Automotive OEM Moving Line & Floor Work */}
              <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-xl min-w-0 shadow-2xs hover:border-[#0066CC] hover:shadow-md transition-all duration-300 group flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#0066CC] flex items-start justify-between gap-2">
                    <span className="leading-snug">{t.hero_m3_label}</span>
                    <span className="relative flex h-2 w-2 shrink-0 mt-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066CC]" />
                    </span>
                  </div>
                  <div className="mt-2 text-base sm:text-lg lg:text-xl font-extrabold text-[#051C2C] tracking-tight leading-snug">
                    {t.hero_m3_val}
                  </div>
                  <div className="mt-1.5 text-xs text-slate-600 leading-snug text-left">
                    {t.hero_m3_sub}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 font-mono text-[10.5px] text-slate-700 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                  <span className="font-semibold leading-snug">{t.hero_m3_badge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE PILLARS OF ADVISORY PRACTICE (Deloitte Grid, Expandable SOP Drawers) */}
      {/* 4. ADVISORY PRACTICE PILLARS & VERIFIED TRACK RECORD (Merged Executive Dossiers) */}
            {/* 4. TRACK RECORD OF INDUSTRIAL PROFESSIONAL EXPERIENCE (Horizontal Motion Architecture) */}
      <section id="pillars" className="scroll-mt-24 relative bg-slate-50 py-10 lg:py-14 border-b border-slate-300">
        <div id="track-record" className="scroll-mt-28" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0066CC]">
              {t.pillars_kicker}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#051C2C]">
              {t.pillars_title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed text-left">
              {t.pillars_subtitle}
            </p>
          </div>

          {/* 3 Horizontal Experience Selector Tabs */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tab 1: Global Procurement */}
            <button
              type="button"
              onClick={() => setActiveDossier('p1')}
              className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group flex items-center justify-between gap-3 ${
                activeDossier === 'p1'
                  ? 'bg-white border-[#0066CC] shadow-md ring-2 ring-[#0066CC]/20'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white shadow-2xs hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                  <Image src="/images/eduardo-dock-sourcing-v2.jpg" alt="Eduardo at container dock" fill className="object-cover" sizes="48px" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#0066CC] uppercase">Pillar 01</span>
                    <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">China & India</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#051C2C] truncate mt-0.5">{t.tab_p1_title}</div>
                  <div className="text-[11px] font-mono font-bold text-emerald-800">{t.c1_metric_val} {t.c1_metric_label}</div>
                </div>
              </div>
              {activeDossier === 'p1' && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#0066CC] shrink-0 animate-pulse mr-1" />
              )}
            </button>

            {/* Tab 2: Automotive Assembly */}
            <button
              type="button"
              onClick={() => setActiveDossier('p2')}
              className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group flex items-center justify-between gap-3 ${
                activeDossier === 'p2'
                  ? 'bg-white border-[#0066CC] shadow-md ring-2 ring-[#0066CC]/20'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white shadow-2xs hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                  <Image src="/images/automotive-oem-assembly.jpg" alt="Automotive moving line assembly" fill className="object-cover" sizes="48px" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#0066CC] uppercase">Pillar 02</span>
                    <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">VDL Nedcar</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#051C2C] truncate mt-0.5">{t.tab_p2_title}</div>
                  <div className="text-[11px] font-mono font-bold text-emerald-800">{t.c2_metric_val} {t.c2_metric_label}</div>
                </div>
              </div>
              {activeDossier === 'p2' && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#0066CC] shrink-0 animate-pulse mr-1" />
              )}
            </button>

            {/* Tab 3: ASML Cleanroom */}
            <button
              type="button"
              onClick={() => setActiveDossier('p3')}
              className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group flex items-center justify-between gap-3 ${
                activeDossier === 'p3'
                  ? 'bg-white border-[#0066CC] shadow-md ring-2 ring-[#0066CC]/20'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white shadow-2xs hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                  <Image src="/images/cleanroom-semiconductor-packaging.jpg" alt="ASML cleanroom semiconductor packaging" fill className="object-cover" sizes="48px" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#0066CC] uppercase">Pillar 03</span>
                    <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">Brainport</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#051C2C] truncate mt-0.5">{t.tab_p3_title}</div>
                  <div className="text-[11px] font-mono font-bold text-emerald-800">{t.c3_metric_val} {t.c3_metric_label}</div>
                </div>
              </div>
              {activeDossier === 'p3' && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#0066CC] shrink-0 animate-pulse mr-1" />
              )}
            </button>
          </div>

          {/* Active Experience Showcase (Horizontal Motion Layout - Reduced Vertical Length) */}
          <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 overflow-hidden transition-all duration-300">
            {activeDossier === 'p1' && (
              <div key="p1" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Left Column: Photo Evidence, Title, Scope & Protocol Toggle */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                  <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-2xs">
                    <Image
                      src="/images/eduardo-dock-sourcing-v2.jpg"
                      alt="Global Sourcing & Direct Plant Contracts - Eduardo de Sousa"
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051C2C]/90 via-[#051C2C]/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#051C2C]/90 text-white backdrop-blur-xs border border-white/20">
                        [ 20 TEU / QTR • FACTORY GATE ]
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0066CC] text-white shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {t.dossier_active_badge}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                      <span>SHENZHEN • NINGBO • INDIA</span>
                      <span className="text-emerald-400 font-bold">-75% COST</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#0066CC]">
                        {t.p1_kicker}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-800">
                        China & India
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-xl font-bold text-[#051C2C] tracking-tight">
                      {t.p1_title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
                      {t.p1_desc}
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-slate-700">
                      <div className="flex items-start gap-2.5 text-left">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{t.p1_f1}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-left">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{t.p1_f2}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-left">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{t.p1_f3}</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleDrawer('p1')}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0066CC] hover:text-[#0A2540] min-h-[40px] px-3 py-1.5 rounded-md hover:bg-blue-50/60 transition-colors"
                      >
                        <span>{expandedDrawers.p1 ? t.dossier_hide_protocol : t.p1_drawer_btn}</span>
                        {expandedDrawers.p1 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">20 Ctr / Qtr</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: DMAIC Empirical Evidence & SOP Drawer */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t.dmaic_case_evidence_title}
                    </span>
                    <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      {t.c1_metric_val} {t.c1_metric_label}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                        1. {t.c1_challenge_title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left">{t.c1_challenge_text}</p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066CC] block mb-1">
                        2. {t.c1_intervention_title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left">{t.c1_intervention_text}</p>
                    </div>

                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                        3. {t.c1_outcome_title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed text-left">{t.c1_outcome_text}</p>
                    </div>
                  </div>

                  {/* SOP Protocol Drawer */}
                  <div 
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      expandedDrawers.p1 
                        ? 'grid-rows-[1fr] opacity-100 mt-2' 
                        : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                        <div className="font-bold text-[#051C2C] mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
                          {t.p1_drawer_title}
                        </div>
                        <div className="text-slate-600 text-left"><strong>1.</strong> {t.p1_d1}</div>
                        <div className="text-slate-600 text-left"><strong>2.</strong> {t.p1_d2}</div>
                        <div className="text-slate-600 text-left"><strong>3.</strong> {t.p1_d3}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDossier === 'p2' && (
              <div key="p2" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Left Column: Photo Evidence, Title, Scope & Protocol Toggle */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                  <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-2xs">
                    <Image
                      src="/images/automotive-oem-assembly.jpg"
                      alt="Automotive OEM Moving Line Assembly - VDL Nedcar"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051C2C]/90 via-[#051C2C]/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#051C2C]/90 text-white backdrop-blur-xs border border-white/20">
                        [ CONTINUOUS FLOW TAKT ]
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0066CC] text-white shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {t.dossier_active_badge}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                      <span>VDL NEDCAR • BMW GROUP & MINI</span>
                      <span className="text-[#38BDF8] font-bold">110-120 CARS/SHIFT</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#0066CC]">
                        {t.p2_kicker}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-800">
                        VDL Nedcar
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-xl font-bold text-[#051C2C] tracking-tight">
                      {t.p2_title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
                      {t.p2_desc}
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-slate-700">
                      <div className="flex items-start gap-2.5 text-left">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{t.p2_f1}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-left">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{t.p2_f2}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-left">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{t.p2_f3}</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleDrawer('p2')}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0066CC] hover:text-[#0A2540] min-h-[40px] px-3 py-1.5 rounded-md hover:bg-blue-50/60 transition-colors"
                      >
                        <span>{expandedDrawers.p2 ? t.dossier_hide_protocol : t.p2_drawer_btn}</span>
                        {expandedDrawers.p2 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">110-120 cars/shift</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: DMAIC Empirical Evidence & SOP Drawer */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t.dmaic_case_evidence_title}
                    </span>
                    <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      {t.c2_metric_val} {t.c2_metric_label}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                        1. {t.c2_challenge_title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left">{t.c2_challenge_text}</p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066CC] block mb-1">
                        2. {t.c2_intervention_title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left">{t.c2_intervention_text}</p>
                    </div>

                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                        3. {t.c2_outcome_title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed text-left">{t.c2_outcome_text}</p>
                    </div>
                  </div>

                  {/* SOP Protocol Drawer */}
                  <div 
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      expandedDrawers.p2 
                        ? 'grid-rows-[1fr] opacity-100 mt-2' 
                        : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                        <div className="font-bold text-[#051C2C] mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
                          {t.p2_drawer_title}
                        </div>
                        <div className="text-slate-600 text-left"><strong>1.</strong> {t.p2_d1}</div>
                        <div className="text-slate-600 text-left"><strong>2.</strong> {t.p2_d2}</div>
                        <div className="text-slate-600 text-left"><strong>3.</strong> {t.p2_d3}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDossier === 'p3' && (
              <div key="p3" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Left Column: Photo Evidence, Title, Scope & Protocol Toggle */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                  <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-2xs">
                    <Image
                      src="/images/cleanroom-semiconductor-packaging.jpg"
                      alt="Tier-1 & Tier-2 ASML Cleanroom Packaging - HQ Pack"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051C2C]/90 via-[#051C2C]/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#051C2C]/90 text-white backdrop-blur-xs border border-white/20">
                        [ {t.hero_telemetry_ecosystem} ]
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0066CC] text-white shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {t.dossier_active_badge}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                      <span>BRAINPORT EINDHOVEN • HQ PACK</span>
                      <span className="text-emerald-400 font-bold">EUV CLEANROOM PROTOCOL</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#0066CC]">
                        {t.p3_kicker}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-800">
                        Brainport Eindhoven
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-xl font-bold text-[#051C2C] tracking-tight">
                      {t.p3_title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
                      {t.p3_desc}
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-slate-700">
                      <div className="flex items-start gap-2.5 text-left">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{t.p3_f1}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-left">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{t.p3_f2}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-left">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{t.p3_f3}</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleDrawer('p3')}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0066CC] hover:text-[#0A2540] min-h-[40px] px-3 py-1.5 rounded-md hover:bg-blue-50/60 transition-colors"
                      >
                        <span>{expandedDrawers.p3 ? t.dossier_hide_protocol : t.p3_drawer_btn}</span>
                        {expandedDrawers.p3 ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Tier-1 & Tier-2 ASML</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: DMAIC Empirical Evidence & SOP Drawer */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t.dmaic_case_evidence_title}
                    </span>
                    <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      {t.c3_metric_val} {t.c3_metric_label}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                        1. {t.c3_challenge_title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left">{t.c3_challenge_text}</p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0066CC] block mb-1">
                        2. {t.c3_intervention_title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left">{t.c3_intervention_text}</p>
                    </div>

                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                        3. {t.c3_outcome_title}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed text-left">{t.c3_outcome_text}</p>
                    </div>
                  </div>

                  {/* SOP Protocol Drawer */}
                  <div 
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      expandedDrawers.p3 
                                ? 'grid-rows-[1fr] opacity-100 mt-2' 
                                : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                        <div className="font-bold text-[#051C2C] mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
                          {t.p3_drawer_title}
                        </div>
                        <div className="text-slate-600 text-left"><strong>1.</strong> {t.p3_d1}</div>
                        <div className="text-slate-600 text-left"><strong>2.</strong> {t.p3_d2}</div>
                        <div className="text-slate-600 text-left"><strong>3.</strong> {t.p3_d3}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

<section id="systems" className="scroll-mt-24 relative bg-slate-100 py-10 lg:py-14 border-b border-slate-300 overflow-hidden">
        {/* Real Industrial Operations Control Center Photographic Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/systems-telemetry-backdrop.jpg"
            alt="Advanced Industrial Operations Telemetry & SCADA Control Center"
            fill
            className="object-cover object-center opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/85 to-slate-100/60" />
          <div className="absolute inset-0 executive-grid-backdrop opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Clarification Banner (Palantir/Enterprise Transparency) */}
          <div className="p-4 bg-[#051C2C] text-slate-200 rounded-lg mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500 text-[#051C2C] uppercase">
                Zero Software Cost
              </span>
              <span className="text-xs font-semibold tracking-wide text-white">
                {t.tooling_banner_badge}
              </span>
            </div>
            <div className="text-xs text-slate-300 max-w-2xl text-left">
              {t.tooling_banner_text}
            </div>
          </div>

          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0066CC]">
              {t.tooling_kicker}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#051C2C]">
              {t.tooling_title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed text-left">
              {t.tooling_subtitle}
            </p>
          </div>

          {/* 4 Tooling Specifications */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolingSpecs.map((tool, idx) => (
              <div
                key={idx}
                className="p-5 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl flex flex-col justify-between shadow-2xs hover:border-[#0066CC] hover:shadow-md transition-all min-w-0"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">
                      {tool.tag}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                      {tool.status}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-[#051C2C] tracking-tight">
                    {tool.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">
                    {tool.scope}
                  </div>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed text-left">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                  {t.tool_delivery_asset}
                </div>
              </div>
            ))}
          </div>

          {/* OptiAsset CMMS Architecture Feature Showcase */}
          <div className="mt-8 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-slate-200 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-slate-500">
                  <span className="text-emerald-600 font-bold">●</span>
                  <span>{t.optiasset_kicker}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#051C2C] tracking-tight">
                  {t.optiasset_title}
                </h3>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded text-xs font-mono font-bold bg-[#051C2C] text-white">
                {t.optiasset_badge}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
                  {t.optiasset_c1_title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed text-left">
                  {t.optiasset_c1_desc}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
                  {t.optiasset_c2_title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed text-left">
                  {t.optiasset_c2_desc}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
                  {t.optiasset_c3_title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed text-left">
                  {t.optiasset_c3_desc}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
              <span>{t.optiasset_footer_arch}</span>
              <span className="text-emerald-700 font-bold">{t.optiasset_footer_engine}</span>
            </div>
          </div>

          {/* Interactive Financial Impact & COPQ Diagnostic Simulator (Dual Controls: Hours + Cost/Hour) */}
          <div className="mt-10 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-[#051C2C] text-white">
                    {t.calc_badge}
                  </span>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                    Dual-Variable Simulator
                  </span>
                </div>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-[#051C2C] tracking-tight">
                  {t.calc_title}
                </h3>
              </div>
              <div className="text-xs text-slate-500 max-w-sm leading-relaxed text-left">
                {t.calc_benchmark}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Dual Interactive Sliders (6 cols) */}
              <div className="lg:col-span-6 space-y-6 bg-slate-50/80 p-5 rounded-xl border border-slate-200">
                {/* Control 1: Monthly Downtime Hours */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor="downtime-input" className="text-xs sm:text-sm font-semibold text-slate-800">
                      {t.calc_slider_label}
                    </label>
                    <div className="flex items-center gap-1.5 bg-white border border-slate-300 focus-within:border-[#0066CC] focus-within:ring-2 focus-within:ring-[#0066CC]/20 rounded-lg px-2.5 py-1 shadow-2xs transition-all">
                      <input
                        id="downtime-input"
                        type="number"
                        min="1"
                        max="100"
                        value={downtimeHours === 0 ? '' : downtimeHours}
                        onChange={(e) => {
                          const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          if (!isNaN(val)) setDowntimeHours(Math.max(0, Math.min(100, val)));
                        }}
                        onBlur={() => {
                          if (downtimeHours < 2) setDowntimeHours(2);
                        }}
                        className="w-12 text-right font-mono text-sm sm:text-base font-bold text-[#051C2C] bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        aria-label="Directly input downtime hours"
                      />
                      <span className="text-xs font-mono font-medium text-slate-500">{t.calc_hours}</span>
                    </div>
                  </div>
                  <input
                    id="downtime-slider"
                    type="range"
                    min="2"
                    max="50"
                    step="1"
                    value={Math.min(50, Math.max(2, downtimeHours))}
                    onChange={(e) => setDowntimeHours(parseInt(e.target.value, 10))}
                    style={{
                      background: `linear-gradient(to right, #0066CC 0%, #0066CC ${((Math.min(50, Math.max(2, downtimeHours)) - 2) / (50 - 2)) * 100}%, #CBD5E1 ${((Math.min(50, Math.max(2, downtimeHours)) - 2) / (50 - 2)) * 100}%, #CBD5E1 100%)`
                    }}
                    className="custom-range-slider"
                    aria-label={t.calc_slider_aria}
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>Min: 2h</span>
                    <span>Standard: 14h</span>
                    <span>Max: 50h ({t.calc_critical})</span>
                  </div>
                </div>

                {/* Control 2: Stoppage Cost Per Hour (Adjustable €1,000 - €12,000/hr) */}
                <div className="space-y-2.5 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor="rate-input" className="text-xs sm:text-sm font-semibold text-slate-800">
                      {t.calc_rate_label}
                    </label>
                    <div className="flex items-center gap-1 bg-white border border-slate-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 rounded-lg px-2.5 py-1 shadow-2xs transition-all">
                      <span className="text-xs font-mono font-bold text-emerald-700">€</span>
                      <input
                        id="rate-input"
                        type="number"
                        min="500"
                        max="50000"
                        step="100"
                        value={hourlyRate === 0 ? '' : hourlyRate}
                        onChange={(e) => {
                          const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          if (!isNaN(val)) setHourlyRate(Math.max(0, Math.min(50000, val)));
                        }}
                        onBlur={() => {
                          if (hourlyRate < 500) setHourlyRate(1000);
                        }}
                        className="w-20 text-right font-mono text-sm sm:text-base font-bold text-emerald-800 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        aria-label="Directly input hourly stoppage rate"
                      />
                      <span className="text-xs font-mono font-medium text-slate-500">{t.calc_rate_unit}</span>
                    </div>
                  </div>
                  <input
                    id="rate-slider"
                    type="range"
                    min="1000"
                    max="12000"
                    step="250"
                    value={Math.min(12000, Math.max(1000, hourlyRate))}
                    onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
                    style={{
                      background: `linear-gradient(to right, #16A34A 0%, #16A34A ${((Math.min(12000, Math.max(1000, hourlyRate)) - 1000) / (12000 - 1000)) * 100}%, #CBD5E1 ${((Math.min(12000, Math.max(1000, hourlyRate)) - 1000) / (12000 - 1000)) * 100}%, #CBD5E1 100%)`
                    }}
                    className="custom-range-slider"
                    aria-label="Hourly stoppage cost slider"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>{t.calc_rate_min}</span>
                    <span className="text-emerald-700 font-semibold">{t.calc_rate_benchmark}</span>
                    <span>{t.calc_rate_max}</span>
                  </div>
                </div>
              </div>

              {/* Real-Time Empirical Output Matrix (6 cols) */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs">
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 block mb-1">
                    {t.calc_loss_label}
                  </span>
                  <div className="text-2xl font-extrabold font-mono text-rose-800 tabular-nums">
                    €{monthlyLoss.toLocaleString()}
                    <span className="text-xs font-normal text-slate-500 ml-1">{t.calc_per_month}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-200">
                    {t.calc_annual_label} €{annualLoss.toLocaleString()}
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-sm shadow-2xs">
                  <div className="absolute top-2 right-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block mb-1">
                    {t.calc_recovery_label}
                  </span>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl font-extrabold font-mono text-emerald-800 tabular-nums">
                      €{monthlyRecovery.toLocaleString()}
                    </span>
                    <span className="text-xs font-normal text-slate-600">{t.calc_per_month}</span>
                    <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-700 text-white shadow-2xs whitespace-nowrap">
                      {sprintRoiMultiplier}{t.calc_roi_badge_suffix}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-mono mt-1 pt-1 border-t border-emerald-200">
                    {t.calc_annual_recovery} €{annualRecovery.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Guarantee Banner spanning full 12 columns across calculator */}
              <div className="lg:col-span-12">
                {(() => {
                  const colonIdx = t.calc_guarantee_note.indexOf(':');
                  const guaranteeTitle = colonIdx !== -1 ? t.calc_guarantee_note.substring(0, colonIdx).trim() : '100% Fee Credit Guarantee';
                  const guaranteeBody = colonIdx !== -1 ? t.calc_guarantee_note.substring(colonIdx + 1).trim() : t.calc_guarantee_note;
                  return (
                    <div className="p-5 bg-gradient-to-r from-emerald-50/70 via-slate-50/50 to-white border border-emerald-200/90 rounded-xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
                      <div className="flex items-start gap-3.5 text-left flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100/90 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              {guaranteeTitle}
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
                            {guaranteeBody}
                          </p>
                        </div>
                      </div>
                      <a
                        href="#advisory-inquiry"
                        className="shrink-0 inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 text-xs font-bold text-white bg-[#040B14] hover:bg-[#0A2540] rounded-lg border border-[#00D2FF]/30 hover:border-[#00D2FF] transition-all whitespace-nowrap shadow-xs"
                      >
                        {t.calc_cta}
                      </a>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 MID-PAGE HIGH-CONTRAST CONVERSION BAR */}
      <section className="bg-[#040B14] border-y-2 border-[#00D2FF]/40 py-8 lg:py-10 relative overflow-hidden text-white shadow-xl">
        {/* CAD Wireframe Grid Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(to right, #00D2FF 1px, transparent 1px), linear-gradient(to bottom, #00D2FF 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#F5B041]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            <div className="max-w-3xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#00D2FF]/15 border border-[#00D2FF]/50 text-[#00D2FF] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F5B041] animate-pulse" />
                <span>{t.mid_cta_badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {t.mid_cta_title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.mid_cta_subtitle}
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleSelectTier(t.tier_opt_sprint)}
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-[50px] px-8 py-3.5 text-sm font-bold text-[#040B14] bg-[#00D2FF] hover:bg-[#38bdf8] active:scale-[0.99] rounded-lg shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:shadow-[0_0_35px_rgba(0,210,255,0.6)] transition-all cursor-pointer font-sans"
              >
                <span>{t.mid_cta_btn}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXECUTIVE PROFILE & INDUSTRIAL FIELD GROUNDING (Clean, Grounded) */}
      <section id="profile" className="scroll-mt-24 bg-white py-10 lg:py-14 border-b border-slate-200">
        <div id="pedigree" className="scroll-mt-28" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0066CC]">
              {t.pedigree_kicker}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#051C2C]">
              {t.pedigree_title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed text-left">
              {t.pedigree_subtitle}
            </p>
          </div>

          {/* Lead Engineer Card with Real Portrait */}
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Photo */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden shrink-0 border-2 border-slate-200 shadow-xs">
                <Image
                  src="/images/eduardo-hero.jpg"
                  alt="Eduardo de Sousa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 144px, 176px"
                />
              </div>

              {/* Profile & Pledge */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-[#051C2C]">
                      {t.lead_name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#0066CC] mt-0.5">
                      {t.lead_role}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mx-auto md:mx-0">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    {t.lead_active_badge}
                  </span>
                </div>

                <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#051C2C] mb-1">
                    {t.lead_pledge_title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic text-left">
                    {t.lead_pledge_text}
                  </p>
                </div>

                {/* Direct Contact Buttons */}
                <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <a
                    href="https://cal.com/desousa-advisory/scoping"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 text-xs font-bold text-white bg-[#051C2C] hover:bg-[#0A2540] rounded-md transition-colors shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-2 text-[#0066CC]" />
                    <span>{t.lead_btn_triage}</span>
                  </a>
                  <a
                    href="https://wa.me/34641978250"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 mr-2 text-emerald-600" />
                    <span>{t.lead_btn_whatsapp}</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/eduardo-de-sousa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#0066CC] transition-colors"
                  >
                    <span>{t.lead_btn_linkedin}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENT SERVICES & PRODUCTIZED ADVISORY MANDATES (With Industrial Backdrop) */}
      <section id="services" className="scroll-mt-24 relative bg-slate-100 py-10 lg:py-14 border-b border-slate-300 overflow-hidden">
        {/* Real Industrial High-Tech Assembly Hall Photographic Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/services-industrial-backdrop.jpg"
            alt="Advanced Precision Industrial Assembly Hall"
            fill
            className="object-cover object-center opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/85 to-slate-100/60" />
          <div className="absolute inset-0 executive-grid-backdrop opacity-20" />
        </div>

        <div id="pricing" className="scroll-mt-28" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0066CC]">
              {t.pricing_kicker}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#051C2C]">
              {t.pricing_title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed text-left">
              {t.pricing_subtitle}
            </p>
          </div>

          {/* 3 Productized Advisory Mandates: Ordered Card 1 (Left), Card 2 (Middle), Card 3 (Right - Flagship) */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: 14-Day Remote Spend & Telemetry Diagnostic */}
            <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-[#00D2FF] hover:shadow-md transition-all min-w-0">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">
                    {t.t1_badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{t.t1_duration}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-[#040B14] tracking-tight">
                  {t.t1_name}
                </h3>
                <div className="mt-3 flex items-baseline">
                  <span className="text-3xl font-extrabold font-sans tabular-nums text-[#040B14]">
                    {t.t1_price}
                  </span>
                  <span className="ml-1.5 text-xs text-slate-500">{t.t1_period}</span>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed text-left">
                  {t.t1_desc}
                </p>

                <div className="mt-5 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-800 uppercase block mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{t.t1_roi_badge}</span>
                  </div>
                  <p className="text-xs text-slate-700 text-left leading-relaxed">
                    {t.t1_roi_text}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleSelectTier(t.tier_opt_sprint)}
                  className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-bold text-[#040B14] bg-slate-100 hover:bg-[#040B14] hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  {t.t1_btn}
                </button>
              </div>
            </div>

            {/* Card 2: 5-Day Physical Plant Walk & Takt Audit */}
            <div className="bg-white/95 backdrop-blur-xs border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-[#00D2FF] hover:shadow-md transition-all min-w-0">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {t.t3_badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{t.t3_duration}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-[#040B14] tracking-tight">
                  {t.t3_name}
                </h3>
                <div className="mt-3 flex items-baseline">
                  <span className="text-3xl font-extrabold font-sans tabular-nums text-[#040B14]">
                    {t.t3_price}
                  </span>
                  <span className="ml-1.5 text-xs text-slate-500">{t.t3_period}</span>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed text-left">
                  {t.t3_desc}
                </p>

                <div className="mt-5 p-3.5 bg-slate-100 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-mono font-bold text-slate-700 uppercase block mb-1">
                    {t.t3_policy_badge}
                  </span>
                  <p className="text-xs text-slate-600 text-left leading-relaxed">
                    {t.t3_travel_note}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleSelectTier(t.tier_opt_onsite)}
                  className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-bold text-[#040B14] bg-slate-100 hover:bg-[#040B14] hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  {t.t3_btn}
                </button>
              </div>
            </div>

            {/* Card 3: Fractional Direct Sourcing & Systems Director (Highlighted / Flagship on Right) */}
            <div className="bg-white/95 backdrop-blur-xs border-2 border-[#00D2FF] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative min-w-0 ring-4 ring-[#00D2FF]/15">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#040B14] text-[#00D2FF] border border-[#00D2FF]/60 shadow-md whitespace-nowrap">
                  {t.t2_highlight}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">
                    {t.t2_badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{t.t2_duration}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-[#040B14] tracking-tight">
                  {t.t2_name}
                </h3>
                
                {/* Explicit Cadence Pill */}
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F5B041]/15 text-[#9A6000] border border-[#F5B041]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B041]" />
                  <span>{t.t2_cadence}</span>
                </div>

                <div className="mt-3 flex items-baseline">
                  <span className="text-3xl font-extrabold font-sans tabular-nums text-[#040B14]">
                    {t.t2_price}
                  </span>
                  <span className="ml-1.5 text-xs text-slate-500">{t.t2_period}</span>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed text-left">
                  {t.t2_desc}
                </p>

                <div className="mt-5 p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl">
                  <span className="text-[10px] font-mono font-bold text-[#0066CC] uppercase block mb-1">
                    {t.t2_commitment_badge}
                  </span>
                  <p className="text-xs text-slate-700 text-left leading-relaxed">
                    {t.t2_term}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleSelectTier(t.tier_opt_fractional)}
                  className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-bold text-white bg-[#040B14] hover:bg-[#081a30] border border-[#00D2FF]/50 hover:border-[#00D2FF] rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {t.t2_btn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. METHODOLOGICAL RIGOR: DMAIC & AGILE/SCRUM OPERATIONAL FRAMEWORK (Clean White) */}
      <section id="methodology" className="scroll-mt-24 bg-white py-10 lg:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0066CC]">
              {t.dmaic_kicker}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#051C2C]">
              {t.dmaic_title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed text-left">
              {t.dmaic_subtitle}
            </p>
          </div>

          {/* 5 DMAIC Phase Sequence */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {dmaicPhases.map((item) => (
              <div
                key={item.step}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-2xs hover:border-[#0066CC] transition-colors min-w-0"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC]">{item.step}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">{item.phase}</span>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#051C2C] leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed text-left">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">{t.dmaic_deliverable_label}</span>
                  <span className="text-xs font-medium text-slate-800">{item.output}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Industrial Agile & Scrum Operational Framework Subsection */}
          <div className="mt-12 pt-10 border-t border-slate-200">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0066CC]">
                {t.agile_kicker}
              </span>
              <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-[#051C2C]">
                {t.agile_title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
                {t.agile_subtitle}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between shadow-2xs hover:border-[#0066CC] transition-colors">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC]">SPRINT 14D</span>
                    <span className="text-xs font-semibold uppercase text-slate-700">{t.agile_c1_sub}</span>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#051C2C]">
                    {t.agile_c1_title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed text-left">
                    {t.agile_c1_desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-emerald-800">
                  {t.agile_c1_cadence}
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between shadow-2xs hover:border-[#0066CC] transition-colors">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC]">DAILY 15M</span>
                    <span className="text-xs font-semibold uppercase text-slate-700">{t.agile_c2_sub}</span>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#051C2C]">
                    {t.agile_c2_title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed text-left">
                    {t.agile_c2_desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-emerald-800">
                  {t.agile_c2_escalation}
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between shadow-2xs hover:border-[#0066CC] transition-colors">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC]">KANBAN WIP</span>
                    <span className="text-xs font-semibold uppercase text-slate-700">{t.agile_c3_sub}</span>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#051C2C]">
                    {t.agile_c3_title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed text-left">
                    {t.agile_c3_desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-emerald-800">
                  {t.agile_c3_control}
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between shadow-2xs hover:border-[#0066CC] transition-colors">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC]">LOCK SOP</span>
                    <span className="text-xs font-semibold uppercase text-slate-700">{t.agile_c4_sub}</span>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#051C2C]">
                    {t.agile_c4_title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed text-left">
                    {t.agile_c4_desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-emerald-800">
                  {t.agile_c4_output}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="advisory-inquiry" className="scroll-mt-24 relative bg-[#051C2C] text-slate-200 py-10 lg:py-14 border-b border-slate-800 overflow-hidden">
        <div id="contact" className="scroll-mt-28" />
        <div className="absolute inset-0 executive-grid-backdrop opacity-15 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              {t.intake_kicker}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              {t.intake_title}
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              {t.intake_subtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Option 1: Direct 1-Click Cal.com Triage (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                {t.opt1_kicker}
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#051C2C]">
                {t.opt1_title}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.opt1_desc}
              </p>

              <div className="mt-6 space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">{t.opt1_format_label}</span>
                  <span className="font-mono text-slate-800">{t.opt1_format_val}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">{t.opt1_lead_label}</span>
                  <span className="font-mono text-slate-800">{t.opt1_lead_val}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">{t.opt1_legal_label}</span>
                  <span className="font-mono text-emerald-700 font-bold">{t.opt1_legal_val}</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://cal.com/desousa-advisory/scoping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center min-h-[48px] px-6 py-3 text-sm font-semibold text-white bg-[#051C2C] hover:bg-[#0A2540] rounded-md transition-colors shadow-xs"
                >
                  <Calendar className="w-4 h-4 mr-2 text-[#0066CC]" />
                  <span>{t.opt1_btn_cal}</span>
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <a
                  href="https://wa.me/34641978250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-700 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.opt1_whatsapp}</span>
                </a>
                <a
                  href="mailto:desousaej@gmail.com"
                  className="flex items-center gap-1.5 hover:text-[#0066CC] font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0066CC]" />
                  <span>{t.opt1_email}</span>
                </a>
              </div>
            </div>

            {/* Option 2: 3-Field Quick Briefing Dossier (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-300 rounded-xl p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-mono font-bold text-[#0066CC] uppercase tracking-wider block">
                {t.opt2_kicker}
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#051C2C]">
                {t.opt2_title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.opt2_desc}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="intake-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.field_name_label}
                    </label>
                    <input
                      id="intake-name"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t.field_name_placeholder}
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="intake-company" className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.field_company_label}
                    </label>
                    <input
                      id="intake-company"
                      required
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder={t.field_company_placeholder}
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="intake-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.field_email_label}
                    </label>
                    <input
                      id="intake-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={t.field_email_placeholder}
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="intake-tier" className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.field_tier_label}
                    </label>
                    <select
                      id="intake-tier"
                      value={selectedTier || t.tier_opt_sprint}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all"
                    >
                      <option value={t.tier_opt_sprint}>{t.tier_opt_sprint}</option>
                      <option value={t.tier_opt_onsite}>{t.tier_opt_onsite}</option>
                      <option value={t.tier_opt_fractional}>{t.tier_opt_fractional}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="intake-bottleneck" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.field_bottleneck_label}
                  </label>
                  <textarea
                    id="intake-bottleneck"
                    rows={3}
                    value={formData.bottleneck}
                    onChange={(e) => setFormData(prev => ({ ...prev, bottleneck: e.target.value }))}
                    placeholder={t.field_bottleneck_placeholder}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] px-6 py-3 text-sm font-semibold text-white bg-[#051C2C] hover:bg-[#0A2540] active:scale-[0.99] rounded-md shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] focus-visible:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? t.opt2_submitting : t.opt2_btn_submit}
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  {t.opt2_footer_note}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CONFIRMATION MODAL (Accessible Dialog, Escape Listener, Close Button, Mobile Containment) */}
      {bookingModal.isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setBookingModal(prev => ({ ...prev, isOpen: false }));
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg bg-white border border-slate-300 rounded-xl shadow-2xl p-5 sm:p-8 max-h-[min(90vh,680px)] flex flex-col overflow-y-auto overscroll-contain animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setBookingModal(prev => ({ ...prev, isOpen: false }))}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 id="modal-title" className="text-lg font-bold text-[#051C2C]">
                  {t.modal_title}
                </h3>
                <span className="text-xs font-mono text-emerald-700 font-semibold">
                  {t.modal_ref_label} {bookingModal.mandateId}
                </span>
              </div>
            </div>

            <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">{t.modal_mandate_scope}</span>
                <span className="text-slate-800 font-mono font-medium">{bookingModal.tier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">{t.modal_company_label}</span>
                <span className="text-slate-800 font-medium">{bookingModal.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">{t.modal_lead_label}</span>
                <span className="text-slate-800 font-medium">Eduardo de Sousa</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{t.modal_nda_badge}</span>
            </div>

            <div className="mt-6 space-y-3">
              <a
                href="https://cal.com/desousa-advisory/scoping"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-bold text-white bg-[#051C2C] hover:bg-[#0A2540] rounded-md transition-colors"
              >
                <Calendar className="w-4 h-4 mr-2 text-[#0066CC]" />
                <span>{t.modal_btn_cal}</span>
              </a>
              <a
                href={`https://wa.me/34641978250?text=Hello%20Eduardo,%20I%20have%20submitted%20mandate%20dossier%20${bookingModal.mandateId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                <Phone className="w-4 h-4 mr-2 text-emerald-600" />
                <span>{t.modal_btn_whatsapp}</span>
              </a>
              <button
                type="button"
                onClick={() => setBookingModal(prev => ({ ...prev, isOpen: false }))}
                className="w-full min-h-[38px] text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                {t.modal_btn_return}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. INSTITUTIONAL CORPORATE FOOTER (Deep Midnight Navy, Strict Legal Notices) */}
      <footer className="bg-[#051C2C] text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6 text-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="font-bold text-white uppercase tracking-wider text-sm">
                {t.footer_brand}
              </div>
              <div className="text-slate-400 mt-1">
                {t.footer_sub}
              </div>
            </div>
            <div className="text-center md:text-right text-slate-400">
              <div>{t.footer_nda}</div>
              <div className="mt-1 font-mono text-[11px] text-slate-500">
                {t.footer_tax_notice}
              </div>
            </div>
          </div>

          {/* GDPR & COOKIE GOVERNANCE BAR */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                {lang === 'es' && 'Cumplimiento estricto RGPD (UE) 2016/679 · Directiva ePrivacy 2002/58/CE · Responsable: Eduardo de Sousa'}
                {lang === 'en' && 'Strict GDPR (EU) 2016/679 & ePrivacy 2002/58/EC Compliance · Data Controller: Eduardo de Sousa'}
                {lang === 'de' && 'Strikte DSGVO (EU) 2016/679 & ePrivacy 2002/58/EG Konformität · Verantwortlicher: Eduardo de Sousa'}
                {lang === 'nl' && 'Strikte AVG (EU) 2016/679 & ePrivacy 2002/58/EG Naleving · Verwerkingsverantwoordelijke: Eduardo de Sousa'}
                {lang === 'fr' && 'Conformité stricte RGPD (UE) 2016/679 & ePrivacy 2002/58/CE · Responsable: Eduardo de Sousa'}
                {lang === 'pt' && 'Cumprimento estrito RGPD (UE) 2016/679 & Diretiva ePrivacy 2002/58/CE · Responsável: Eduardo de Sousa'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-gdpr-modal', { detail: { lang } }));
                }
              }}
              className="font-mono text-cyan-400 hover:text-cyan-300 underline font-semibold flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 hover:border-cyan-500/50"
            >
              <Cookie className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {lang === 'es' && 'Configuración de Privacidad & Cookies (RGPD)'}
                {lang === 'en' && 'Privacy Settings & Cookie Disclosure (GDPR)'}
                {lang === 'de' && 'Datenschutzeinstellungen & Cookies (DSGVO)'}
                {lang === 'nl' && 'Privacy-instellingen & Cookies (AVG)'}
                {lang === 'fr' && 'Paramètres de Confidentialité & Cookies (RGPD)'}
                {lang === 'pt' && 'Definições de Privacidade & Cookies (RGPD)'}
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
