import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import {
  ShieldCheck,
  Scale,
  Lock,
  ArrowLeft,
  Building2,
  FileText,
  CheckCircle2,
  Ship,
  Terminal,
  Cpu,
  Cookie,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import ManageCookiesButton from '@/components/ui/ManageCookiesButton';

export function generateStaticParams() {
  return getAllStaticLocaleParams();
}

interface CookieItem {
  name: string;
  provider: string;
  type: string;
  purpose: string;
  expiry: string;
  basis: string;
}

interface LegalContent {
  metaTitle: string;
  metaDesc: string;
  badge: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  backHome: string;
  sections: {
    providerTitle: string;
    providerSubtitle: string;
    providerLegalName: string;
    providerActivity: string;
    providerLocation: string;
    providerContact: string;

    trademarkTitle: string;
    trademarkSubtitle: string;
    trademarkP1: string;
    trademarkP2: string;
    brandCat1Title: string;
    brandsCat1: string[];
    brandCat2Title: string;
    brandsCat2: string[];
    brandCat3Title: string;
    brandsCat3: string[];

    ndaTitle: string;
    ndaSubtitle: string;
    ndaP1: string;
    ndaP2: string;
    metricsList: string[];

    cleanroomTitle: string;
    cleanroomSubtitle: string;
    cleanroomP1: string;
    cleanroomP2: string;

    disclaimerTitle: string;
    disclaimerSubtitle: string;
    disclaimerP1: string;
    disclaimerP2: string;

    cookiesTitle: string;
    cookiesSubtitle: string;
    cookiesP1: string;
    cookiesTableHead: {
      name: string;
      provider: string;
      type: string;
      purpose: string;
      expiry: string;
      basis: string;
    };
    cookiesList: CookieItem[];
    cookiesBtnManage: string;

    privacyTitle: string;
    privacySubtitle: string;
    privacyController: string;
    privacyTelemetry: string;
    privacyClarity: string;
    privacyRights: string;
    privacyAepd: string;

    copyrightTitle: string;
    copyrightBody: string;
  };
}

const legalContent: Record<Locale, LegalContent> = {
  "en": {
    "metaTitle": "Legal, Compliance, Trademark & Privacy Disclosures | Eduardo de Sousa",
    "metaDesc": "Complete legal disclosures, nominative fair use trademark statements, trade secret NDA illustrative metrics compliance, and GDPR/ePrivacy data governance for Eduardo de Sousa.",
    "badge": "LEGAL & REGULATORY DOSSIER // COMPLIANCE AUDIT",
    "title": "Legal, Trademark, Confidentiality & Cookie Governance Disclosures",
    "subtitle": "Institutional legal transparency regarding corporate marks, trade secret protection, technical scopes, and GDPR / ePrivacy compliance.",
    "lastUpdated": "Effective Date: November 2026",
    "backHome": "Back to Advisory Practice",
    "sections": {
      "providerTitle": "0. Service Provider Identification & Regulatory Notice",
      "providerSubtitle": "Statutory information pursuant to Spanish LSSI-CE Law 34/2002 Art. 10 and GDPR (EU) 2016/679 Art. 13",
      "providerLegalName": "Operator / Professional: Eduardo de Sousa · De Sousa Industrial Operations Advisory",
      "providerActivity": "Professional Practice: Independent Industrial Operations & Supply Chain Advisory, Direct Factory Sourcing (China/India), Quality Eradication, and CMMS Implementation.",
      "providerLocation": "Tax Identification & Operating Hubs: Registered European VAT / Tax Operator · Valencia, Spain · Brainport Eindhoven Corridor, Netherlands.",
      "providerContact": "Official Legal Notice Channel: desousaejai@gmail.com · Direct WhatsApp / Tel: +34 661 440 045",
      "trademarkTitle": "1. Nominative Fair Use Trademark Notice",
      "trademarkSubtitle": "Third-party brand marks, corporate emblems, and certification insignias (Reg. EU 2017/1001 Art. 14 · US Lanham Act § 1115(b)(4))",
      "trademarkP1": "All third-party trademarks, registered service marks, corporate names, and brand emblems displayed across this advisory portfolio (including but not limited to ASML, VDL Nedcar, BMW Group, MINI, Carl Zeiss, Robert Bosch GmbH, TÜV NORD, A.P. Møller – Maersk, Hapag-Lloyd, MSC, COSCO SHIPPING, CMA CGM, Evergreen, ONE, Kuehne+Nagel, and APM Terminals) are the exclusive intellectual property of their respective trademark proprietors.",
      "trademarkP2": "The display of these logos and names is made strictly under the international doctrine of Nominative Fair Use (Article 14 of Regulation (EU) 2017/1001 on the European Union trade mark, Spanish Trademark Law 17/2001 Article 37, and US Lanham Act 15 U.S.C. § 1115(b)(4)). Their sole and explicit function is the truthful, historical identification of industrial facilities operated, client supply chains managed, cleanroom shop-floor assembly performed, and international maritime carriers contracted. Under no circumstances does this website claim ownership, agency, formal affiliation, commercial sponsorship, or endorsement by any of these entities.",
      "brandCat1Title": "A. Tier-1 Manufacturing Plants, High-Tech Ecosystems & Automotive OEM:",
      "brandsCat1": [
        "ASML Netherlands B.V. (Semiconductor Supply Chain)",
        "HQ Pack B.V. (Brainport Eindhoven Cleanroom Assembly)",
        "VDL Nedcar B.V. (Automotive Moving Assembly Line)",
        "BMW Group (Bayerische Motoren Werke AG)",
        "MINI (BMW Group Assembly Quality Cadence)",
        "Carl Zeiss AG (Semiconductor Optics Packaging)",
        "Robert Bosch GmbH (Industrial Electronics)",
        "TÜV NORD Group (Lifting & Winch Safety Certification)"
      ],
      "brandCat2Title": "B. Global Maritime Carriers, Ports & Intermodal Freight Networks:",
      "brandsCat2": [
        "A.P. Møller – Maersk A/S (Global Container Freight)",
        "Hapag-Lloyd AG (Transatlantic & Intercontinental Logistics)",
        "Mediterranean Shipping Company (MSC)",
        "COSCO SHIPPING Lines Co., Ltd. (China Ocean Shipping)",
        "CMA CGM Group (Transpacific & Europe-Asia Shipping)",
        "Evergreen Marine Corporation (APAC & Americas Carrier)",
        "Ocean Network Express (ONE - Container Shipping)",
        "Kuehne+Nagel International AG (Freight Forwarding)",
        "APM Terminals (Rotterdam / Valencia Hub Operations)",
        "Zapier Inc. (Automated Logistics Telemetry Webhooks)"
      ],
      "brandCat3Title": "C. Quality Standards, Technical Software & Database Architecture:",
      "brandsCat3": [
        "Lean Six Sigma (IASSC / ASQ DMAIC Black Belt Framework)",
        "TypeScript (Microsoft Corporation)",
        "Python (Python Software Foundation)",
        "PostgreSQL (PostgreSQL Global Development Group)",
        "Next.js / Edge Architecture (Vercel Inc.)",
        "OptiAsset CMMS (Proprietary Industrial Dual-DB System)"
      ],
      "ndaTitle": "2. Non-Disclosure & Illustrative Metrics Compliance",
      "ndaSubtitle": "Protection of industrial know-how and proprietary trade secrets (EU Directive 2016/943 · Spanish Law 1/2019)",
      "ndaP1": "Eduardo de Sousa is governed by strict, indefinite professional Non-Disclosure Agreements (NDAs) and statutory secrecy covenants protecting the trade secrets, technical drawings, and operational methodologies of previous clients and employers.",
      "ndaP2": "Accordingly, all quantitative metrics, sub-micron tolerances, assembly cadence figures, defect ratios, and procurement landed-cost representations displayed on this website represent sanitized, aggregated, and illustrative approximations. They are engineered to demonstrate problem-solving scope, scale, and empirical methodology without disclosing actual confidential commercial figures, proprietary drawings, or customer production schedules.",
      "metricsList": [
        "Cleanroom optical tolerances (<0.1 µm): Normalized approximation demonstrating precision assembly protocols.",
        "Automotive OEM cadence (110–120 units/shift): Scaled representation of high-speed moving line throughput.",
        "Quality defect reduction (15%): Representative magnitude of DMAIC and 8D defect eradication.",
        "Procurement landed-cost optimization (-75% / $800,000 USD/yr): Normalized figures illustrating direct factory homologation impact.",
        "Maritime freight dispatch (20 containers/quarter): Approximate volume representation for intercontinental containerized shipping."
      ],
      "cleanroomTitle": "3. Strict Professional Engineering Demarcation & Cleanroom Assembly Ground Truth",
      "cleanroomSubtitle": "Absence of ISO 14644 auditor or certification body services",
      "cleanroomP1": "Eduardo de Sousa performed high-tech electromechanical packaging assembly inside cleanroom environments (at HQ Pack within the ASML semiconductor lithography ecosystem in Brainport Eindhoven).",
      "cleanroomP2": "Neither Eduardo de Sousa nor this website claim, offer, certify, or engineer ISO 14644 cleanroom facilities. Eduardo de Sousa is NOT an ISO 14644 cleanroom lead auditor, certifier, cleanroom HVAC commissioning engineer, or facility builder. All references to ISO Class 5 cleanrooms describe practical shop-floor electromechanical assembly discipline, gowning protocols, and particulate-controlled packaging execution, not certification or facility-building services.",
      "disclaimerTitle": "4. Professional Non-Reliance & Advisory Scope Disclaimer",
      "disclaimerSubtitle": "Exploratory technical diagnostic models and absence of pre-contractual warranty",
      "disclaimerP1": "All diagnostic instruments, interactive cost calculators (such as the Dual-Variable Unplanned Stoppage Cost / COPQ Simulator), case studies, and technical briefings available on this website are provided solely for illustrative, exploratory, and technical qualification purposes.",
      "disclaimerP2": "They do not constitute binding engineering opinions, certified audits, or contractual guarantees of financial savings. A formal advisory or consulting engagement is established strictly upon the bilateral execution of a written Advisory Mandate, Master Services Agreement (MSA), or Statement of Work (SOW) defining customized deliverables, SLAs, and liability terms.",
      "cookiesTitle": "5. Comprehensive Cookie Governance & Technical Inventory",
      "cookiesSubtitle": "Full compliance with ePrivacy Directive 2002/58/EC and Spanish LSSI-CE 34/2002 Article 22.2",
      "cookiesP1": "This portal utilizes strictly necessary technical cookies to guarantee platform stability, edge network routing, and language preference retention. Optional session telemetry and interaction heatmaps (Microsoft Clarity) are strictly gated behind an affirmative opt-in consent banner and remain completely blocked until user authorization.",
      "cookiesTableHead": {
        "name": "Cookie Identifier",
        "provider": "Provider / Domain",
        "type": "Classification",
        "purpose": "Technical Function & Purpose",
        "expiry": "Duration",
        "basis": "Legal Basis"
      },
      "cookiesList": [
        {
          "name": "preferred_lang",
          "provider": "First-party (desousaops.vercel.app)",
          "type": "Technical / Essential",
          "purpose": "Stores the user's selected language preference (es, en, de, nl, fr, pt).",
          "expiry": "1 Year",
          "basis": "Art. 6.1.f GDPR (Exempt from consent)"
        },
        {
          "name": "cookie-consent",
          "provider": "First-party (desousaops.vercel.app)",
          "type": "Technical / Essential",
          "purpose": "Records affirmative or essential-only cookie consent choices.",
          "expiry": "1 Year",
          "basis": "Art. 6.1.f GDPR (Exempt from consent)"
        },
        {
          "name": "geo_country / geo_city",
          "provider": "First-party (Vercel Edge)",
          "type": "Technical / Routing",
          "purpose": "Geolocation headers for edge server routing and regional latency optimization without advertising profiling.",
          "expiry": "30 Days",
          "basis": "Art. 6.1.f GDPR (Exempt from consent)"
        },
        {
          "name": "_clck / _clsk",
          "provider": "Third-party (Microsoft Clarity)",
          "type": "Analytics / Usability",
          "purpose": "Records anonymous interaction heatmaps, scroll depth, and UI bottleneck telemetry with automatic form input masking. Blocked by default.",
          "expiry": "1 Year / 1 Day",
          "basis": "Art. 6.1.a GDPR (Explicit Consent)"
        },
        {
          "name": "Vercel Analytics",
          "provider": "Vercel Inc. (Edge Telemetry)",
          "type": "Performance / Telemetry",
          "purpose": "Cookieless aggregated measurement of Core Web Vitals, page rendering latency, and DNS performance at the edge.",
          "expiry": "Session",
          "basis": "Art. 6.1.f GDPR (Cookieless Edge)"
        }
      ],
      "cookiesBtnManage": "Configure Cookie Preferences (GDPR)",
      "privacyTitle": "6. Data Privacy, Processing Principles & GDPR Subject Rights",
      "privacySubtitle": "Compliance with EU General Data Protection Regulation (EU) 2016/679 and Spanish LOPDGDD 3/2018",
      "privacyController": "Data Controller: Eduardo de Sousa · De Sousa Industrial Operations Advisory · Valencia, Spain · Contact: desousaejai@gmail.com",
      "privacyTelemetry": "Infrastructure Telemetry: Operating on Vercel's global edge network. No advertising tracking pixels, cross-site trackers, or third-party profiling systems are active.",
      "privacyClarity": "Behavioral Telemetry (Microsoft Clarity): Interaction tracking is strictly conditioned on affirmative user approval via the consent banner. All text inputs and personal identity strings are obfuscated in-browser before transmission.",
      "privacyRights": "Data Subject Rights (GDPR Articles 15 to 22): You hold the full right to access, rectify, restrict processing of, port, or request the erasure of any corporate contact details submitted through our scoping forms or correspondence channels.",
      "privacyAepd": "Supervisory Authority: In the event of an unresolved dispute regarding data processing, you have the statutory right to lodge a formal complaint with the Spanish Data Protection Agency (Agencia Española de Protección de Datos - AEPD, C/ Jorge Juan 6, 28001 Madrid, aepd.es) or the competent supervisory authority within your EU Member State.",
      "copyrightTitle": "7. Intellectual Property & Copyright Notice",
      "copyrightBody": "© 2026 Eduardo de Sousa. All rights reserved. The visual architecture, software design, proprietary algorithms, custom React components, CAD styling, and curated texts are the protected intellectual property of Eduardo de Sousa. Unauthorized automated scraping, reproduction, or redistribution is strictly prohibited."
    }
  },
  "es": {
    "metaTitle": "Aviso Legal, Marcas, Confidencialidad & Privacidad | Eduardo de Sousa",
    "metaDesc": "Aviso legal integral, uso nominativo legítimo de marcas registradas, secreto industrial y cumplimiento de acuerdos NDA, política de cookies e inventario RGPD para Eduardo de Sousa.",
    "badge": "DOSSIER LEGAL Y REGULATORIO // AUDITORÍA DE COMPLIANCE",
    "title": "Aviso Legal, Marcas, Confidencialidad & Política de Cookies",
    "subtitle": "Transparencia jurídica institucional respecto a marcas registradas de terceros, protección de secretos empresariales, alcance técnico y gobernanza RGPD / ePrivacy.",
    "lastUpdated": "Fecha de vigencia: Noviembre 2026",
    "backHome": "Volver a la Práctica de Asesoría",
    "sections": {
      "providerTitle": "0. Identificación del Prestador de Servicios y Aviso Regulatorio",
      "providerSubtitle": "Información preceptiva conforme al Art. 10 de la Ley 34/2002 (LSSI-CE) y Art. 13 del RGPD (UE) 2016/679",
      "providerLegalName": "Titular / Profesional: Eduardo de Sousa · De Sousa Industrial Operations Advisory",
      "providerActivity": "Actividad Profesional: Asesoría técnica industrial en operaciones y aprovisionamiento directo de fábrica (China/India), optimización de compras y sistemas CMMS.",
      "providerLocation": "NIF / Operador Intracomunitario: Operador europeo con NIF intracomunitario · Valencia, España · Corredor Brainport Eindhoven, Países Bajos.",
      "providerContact": "Canal de Notificaciones Legales: desousaejai@gmail.com · Teléfono / WhatsApp: +34 661 440 045",
      "trademarkTitle": "1. Declaración de Uso Nominativo Legítimo de Marcas Registradas",
      "trademarkSubtitle": "Marcas de terceros, logotipos corporativos y emblemas de certificación (Reglamento UE 2017/1001 Art. 14 · Ley 17/2001 Art. 37)",
      "trademarkP1": "Todas las marcas registradas, nombres comerciales, logotipos, enseñas y signos distintivos de terceros exhibidos en este portal (incluyendo, entre otros, ASML, VDL Nedcar, BMW Group, MINI, Carl Zeiss, Robert Bosch GmbH, TÜV NORD, A.P. Møller – Maersk, Hapag-Lloyd, MSC, COSCO SHIPPING, CMA CGM, Evergreen, ONE, Kuehne+Nagel y APM Terminals) son propiedad exclusiva de sus respectivos titulares.",
      "trademarkP2": "La inclusión de dichos logotipos y nombres comerciales se efectúa estrictamente al amparo de la doctrina internacional de Uso Nominativo Legítimo (Nominative Fair Use), conforme al Artículo 14 del Reglamento (UE) 2017/1001 sobre la marca de la Unión Europea, el Artículo 37 de la Ley Española 17/2001 de Marcas y la sección 1115(b)(4) del Lanham Act de EE.UU. Su único y exclusivo fin es la identificación histórica y veraz de plantas fabriles donde el titular ha operado directamente, cadenas de suministro gestionadas, tareas de montaje en sala blanca realizadas y líneas navieras fletadas. En ningún caso se expresa, sugiere o insinúa propiedad, relación societaria, filial, patrocinio, aval comercial ni autorización por parte de dichas corporaciones.",
      "brandCat1Title": "A. Plantas Industriales, Fabricantes de Alta Tecnología y OEM Automotriz:",
      "brandsCat1": [
        "ASML Netherlands B.V. (Cadena de Suministro de Litografía)",
        "HQ Pack B.V. (Montaje en Sala Blanca Brainport Eindhoven)",
        "VDL Nedcar B.V. (Línea de Ensamblaje Automotriz en Cadencia)",
        "BMW Group (Bayerische Motoren Werke AG)",
        "MINI (Cadencia de Calidad de Ensamblaje BMW Group)",
        "Carl Zeiss AG (Empaquetado de Ópticas de Semiconductores)",
        "Robert Bosch GmbH (Electrónica Industrial)",
        "TÜV NORD Group (Certificación de Seguridad de Polipastos y Cabrestantes)"
      ],
      "brandCat2Title": "B. Líneas Navieras Globales, Puertos y Operadores Intermodales:",
      "brandsCat2": [
        "A.P. Møller – Maersk A/S (Flete Marítimo de Contenedores)",
        "Hapag-Lloyd AG (Logística Transatlántica e Intercontinental)",
        "Mediterranean Shipping Company (MSC)",
        "COSCO SHIPPING Lines Co., Ltd. (Líneas Navieras de China)",
        "CMA CGM Group (Transporte Transpacífico y Asia-Europa)",
        "Evergreen Marine Corporation (Naviera APAC y Américas)",
        "Ocean Network Express (ONE - Transporte Marítimo)",
        "Kuehne+Nagel International AG (Transitaria e Intermodal)",
        "APM Terminals (Operaciones Portuarias Rotterdam / Valencia)",
        "Zapier Inc. (Telemetría y Webhooks de Automatización Logística)"
      ],
      "brandCat3Title": "C. Estándares de Calidad, Arquitectura de Datos y Software:",
      "brandsCat3": [
        "Lean Six Sigma (Marco Metodológico DMAIC Black Belt IASSC / ASQ)",
        "TypeScript (Microsoft Corporation)",
        "Python (Python Software Foundation)",
        "PostgreSQL (PostgreSQL Global Development Group)",
        "Next.js / Arquitectura Edge (Vercel Inc.)",
        "OptiAsset CMMS (Sistema Industrial Propietario de Doble Base de Datos)"
      ],
      "ndaTitle": "2. Cumplimiento de Confidencialidad, Métricas Ilustrativas y Secreto Industrial",
      "ndaSubtitle": "Protección de secretos comerciales e industriales (Directiva UE 2016/943 · Ley Española 1/2019)",
      "ndaP1": "Eduardo de Sousa se encuentra sujeto a estrictos acuerdos de confidencialidad (NDA) de carácter indefinido respecto a los procesos industriales, planos técnicos y metodologías operativas de sus clientes y empleadores anteriores.",
      "ndaP2": "En consecuencia, todas las cifras cuantitativas, tolerancias submicrónicas, cadencias de producción, ratios de defectos y métricas económicas expuestas en este sitio constituyen aproximaciones ilustrativas, agregadas y normalizadas. Fueron elaboradas para evidenciar capacidad metodológica, rigor analítico y escala operativa sin revelar cifras confidenciales reales, planos comerciales protegidos ni secretos empresariales de ningún cliente.",
      "metricsList": [
        "Tolerancias ópticas de sala blanca (<0.1 µm): Aproximación representativa de protocolos de precisión sin desvelar tolerancias de clientes.",
        "Cadencia automotriz OEM (110–120 unidades/turno): Representación normalizada del ritmo de línea de montaje.",
        "Reducción de defectos de calidad (15%): Magnitud ilustrativa de erradicación mediante DMAIC y 8D.",
        "Optimización de compras (75% / $800.000 USD/año): Cifras normalizadas que demuestran el impacto de la desintermediación en fábrica.",
        "Flete marítimo (20 contenedores/trimestre): Representación aproximada del volumen de expedición intercontinental."
      ],
      "cleanroomTitle": "3. Delimitación Estricta de Competencias Técnicas y Salas Blancas (Ground Truth)",
      "cleanroomSubtitle": "Ausencia de servicios de auditoría, comisionamiento o certificación ISO 14644",
      "cleanroomP1": "Eduardo de Sousa desempeñó su actividad profesional técnica como montador electromecánico y de embalaje de alta tecnología en el interior de salas blancas (en HQ Pack dentro del ecosistema de semiconductores de ASML en Brainport Eindhoven).",
      "cleanroomP2": "Ni Eduardo de Sousa ni este sitio web ofrecen, prestan, diseñan, comisionan ni auditan certificaciones oficiales de salas blancas bajo la norma ISO 14644. Eduardo de Sousa NO es auditor jefe, certificador ni empresa de ingeniería de habilitación de salas blancas. Cualquier mención a entornos ISO Clase 5 se refiere exclusivamente a la disciplina operativa de taller, protocolos de vestimenta y empaquetado libre de partículas ejecutados directamente como operario de montaje.",
      "disclaimerTitle": "4. Descargo de Responsabilidad Profesional y Ausencia de Vínculo Vinculante",
      "disclaimerSubtitle": "Modelos diagnósticos de exploración técnica y ausencia de compromiso precontractual",
      "disclaimerP1": "Todos los instrumentos diagnósticos interactivos (incluido el Simulador de Doble Variable de Coste de Parada de Planta / COPQ), estimadores y dossieres informativos de esta web son modelos matemáticos teóricos orientativos.",
      "disclaimerP2": "No constituyen dictámenes periciales vinculantes, auditorías formalizadas ni garantías de ahorro económico. Toda relación contractual de asesoría nace exclusivamente tras la firma bilateral de un Mandato de Asesoría, Acuerdo Marco o Statement of Work (SOW) formal con términos, entregables y responsabilidades individualizadas.",
      "cookiesTitle": "5. Política Integral de Cookies e Inventario Técnico Exhaustivo",
      "cookiesSubtitle": "Conforme a la Directiva ePrivacy 2002/58/CE y Art. 22.2 de la Ley 34/2002 (LSSI-CE)",
      "cookiesP1": "Este portal emplea cookies técnicas estrictamente necesarias para el enrutamiento de red perimetral, la seguridad y la memorización del idioma. La telemetría de comportamiento y analítica visual (Microsoft Clarity) está estrictamente condicionada a la aceptación previa y expresa del usuario mediante el banner de consentimiento, manteniéndose completamente inactiva por defecto.",
      "cookiesTableHead": {
        "name": "Identificador",
        "provider": "Proveedor / Dominio",
        "type": "Tipología",
        "purpose": "Finalidad Técnica",
        "expiry": "Caducidad",
        "basis": "Base Jurídica"
      },
      "cookiesList": [
        {
          "name": "preferred_lang",
          "provider": "Propia (desousaops.vercel.app)",
          "type": "Técnica / Esencial",
          "purpose": "Memoriza la preferencia idiomática seleccionada por el usuario (es, en, de, nl, fr, pt).",
          "expiry": "1 Año",
          "basis": "Art. 6.1.f RGPD (Exenta de consentimiento)"
        },
        {
          "name": "cookie-consent",
          "provider": "Propia (desousaops.vercel.app)",
          "type": "Técnica / Esencial",
          "purpose": "Registra las opciones de consentimiento otorgadas en el banner de cookies.",
          "expiry": "1 Año",
          "basis": "Art. 6.1.f RGPD (Exenta de consentimiento)"
        },
        {
          "name": "geo_country / geo_city",
          "provider": "Propia (Vercel Edge)",
          "type": "Técnica / Enrutamiento",
          "purpose": "Cabeceras de geolocalización perimetral para optimizar latencia sin fines publicitarios.",
          "expiry": "30 Días",
          "basis": "Art. 6.1.f RGPD (Exenta de consentimiento)"
        },
        {
          "name": "_clck / _clsk",
          "provider": "Terceros (Microsoft Clarity)",
          "type": "Analítica / Usabilidad",
          "purpose": "Registro anónimo de patrones de navegación, scroll y mapas de calor con enmascaramiento estricto de texto. Bloqueada por defecto.",
          "expiry": "1 Año / 1 Día",
          "basis": "Art. 6.1.a RGPD (Consentimiento Expreso)"
        },
        {
          "name": "Vercel Analytics",
          "provider": "Vercel Inc. (Telemetría Edge)",
          "type": "Rendimiento / Telemetría",
          "purpose": "Medición agregada y anónima cookieless de Core Web Vitals y velocidad de carga de red.",
          "expiry": "Sesión",
          "basis": "Art. 6.1.f RGPD (Cookieless Edge)"
        }
      ],
      "cookiesBtnManage": "Abrir Panel de Configuración de Cookies (RGPD)",
      "privacyTitle": "6. Privacidad de Datos, Tratamiento y Derechos del Interesado (RGPD)",
      "privacySubtitle": "Reglamento General de Protección de Datos (UE) 2016/679 y Ley Orgánica 3/2018 (LOPDGDD)",
      "privacyController": "Responsable del Tratamiento: Eduardo de Sousa · De Sousa Industrial Operations Advisory · Valencia, España · Contacto: desousaejai@gmail.com",
      "privacyTelemetry": "Telemetría de Infraestructura: Operación en la red perimetral global de Vercel. No se activan píxeles publicitarios, trackers entre sitios ni sistemas de perfilado comercial.",
      "privacyClarity": "Analítica de Experiencia (Microsoft Clarity): La telemetría de interacción está estrictamente condicionada a la aceptación afirmativa del usuario. Todos los datos sensibles son ofuscados en local antes de su envío.",
      "privacyRights": "Derechos del Interesado (Arts. 15 a 22 RGPD): Puede ejercitar sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición contactando a desousaejai@gmail.com.",
      "privacyAepd": "Autoridad de Control: Si considera que el tratamiento de sus datos infringe la normativa europea, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD, C/ Jorge Juan 6, 28001 Madrid, aepd.es) o ante la autoridad de control de su Estado miembro.",
      "copyrightTitle": "7. Derechos de Autor y Propiedad Intelectual",
      "copyrightBody": "© 2026 Eduardo de Sousa. Todos los derechos reservados. La arquitectura visual, el diseño de software, componentes React, modelos algorítmicos y textos redactados son obras intelectuales originales y protegidas por la Ley de Propiedad Intelectual. Queda terminantemente prohibida su reproducción, raspado automatizado (scraping) o redistribución no autorizada."
    }
  },
  "nl": {
    "metaTitle": "Juridische Mededelingen, Merken, Geheimhouding & Privacy | Eduardo de Sousa",
    "metaDesc": "Integrale juridische mededelingen, nominatief eerlijk gebruik van merken, naleving van fabrieksgeheimen en NDA, cookiebeleid en AVG-inventarisatie voor Eduardo de Sousa.",
    "badge": "JURIDISCH & REGELGEVEND DOSSIER // COMPLIANCE AUDIT",
    "title": "Juridische Mededelingen, Merken, Geheimhouding & Cookiebeleid",
    "subtitle": "Institutionele juridische transparantie inzake handelsmerken, bescherming van bedrijfsgeheimen, technische reikwijdte en AVG / ePrivacy-naleving.",
    "lastUpdated": "Ingangsdatum: November 2026",
    "backHome": "Terug naar Adviespraktijk",
    "sections": {
      "providerTitle": "0. Identificatie van de Dienstverlener en Toezichtinformatie",
      "providerSubtitle": "Wettelijk verplichte informatie conform Spaanse LSSI-CE Wet 34/2002 Art. 10 en AVG (EU) 2016/679 Art. 13",
      "providerLegalName": "Uitvoerder / Beroepsbeoefenaar: Eduardo de Sousa · De Sousa Industrial Operations Advisory",
      "providerActivity": "Beroepsactiviteit: Onafhankelijk operationeel advies voor industriële productie en directe fabriekssourcing (China/India), inkoopoptimalisatie en CMMS-implementatie.",
      "providerLocation": "Fiscaal nummer & Locaties: Europees btw-operator · Valencia, Spanje · Brainport Eindhoven Corridor, Nederland.",
      "providerContact": "Officieel juridisch contact: desousaejai@gmail.com · Telefoon / WhatsApp: +34 661 440 045",
      "trademarkTitle": "1. Kennisgeving van Nominatief Handelsmerkgebruik",
      "trademarkSubtitle": "Merken van derden, bedrijfslogo's en certificeringsemblemen (Verordening EU 2017/1001 Art. 14 · US Lanham Act § 1115(b)(4))",
      "trademarkP1": "Alle handelsmerken, servicemerken, handelsnamen en bedrijfslogo's van derden die in dit adviesportfolio worden getoond (waaronder ASML, VDL Nedcar, BMW Group, MINI, Carl Zeiss, Robert Bosch GmbH, TÜV NORD, A.P. Møller – Maersk, Hapag-Lloyd, MSC, COSCO SHIPPING, CMA CGM, Evergreen, ONE, Kuehne+Nagel en APM Terminals) zijn het exclusieve intellectuele eigendom van hun respectievelijke houders.",
      "trademarkP2": "De weergave van deze logo's en namen geschiedt strikt onder de internationale doctrine van Nominatief Eerlijk Gebruik (Artikel 14 van Verordening (EU) 2017/1001 inzake het Uniemerk, de Spaanse Merkenwet 17/2001 Art. 37 en US Lanham Act 15 U.S.C. § 1115(b)(4)). Het enige doel is de waarheidsgetrouwe, historische identificatie van geëxploiteerde productiefaciliteiten, beheerde toeleveringsketens, uitgevoerde cleanroomassemblage en gecontracteerde maritieme rederijen. In geen enkel geval impliceert of suggereert deze website eigendom, agentschap, formeel partnerschap, sponsoring of goedkeuring door deze entiteiten.",
      "brandCat1Title": "A. Tier-1 Productiebedrijven, Hightech Ecosysteemen & Automotive OEM:",
      "brandsCat1": [
        "ASML Netherlands B.V. (Halfgeleider Lithografie Toeleveringsketen)",
        "HQ Pack B.V. (Brainport Eindhoven Cleanroom Assemblage)",
        "VDL Nedcar B.V. (Automotive Lijnmontage)",
        "BMW Group (Bayerische Motoren Werke AG)",
        "MINI (BMW Group Kwaliteitscadans)",
        "Carl Zeiss AG (Optiekverpakking voor Halfgeleiders)",
        "Robert Bosch GmbH (Industriële Elektronica)",
        "TÜV NORD Group (Veiligheidscertificering voor Hijsmiddelen en Lieren)"
      ],
      "brandCat2Title": "B. Wereldwijde Rederijen, Zeehavens & Intermodale Vrachtnetwerken:",
      "brandsCat2": [
        "A.P. Møller – Maersk A/S (Wereldwijde Containervaart)",
        "Hapag-Lloyd AG (Trans-Atlantische & Intercontinentale Logistiek)",
        "Mediterranean Shipping Company (MSC)",
        "COSCO SHIPPING Lines Co., Ltd. (China Ocean Shipping)",
        "CMA CGM Group (Trans-Pacifisch & Europa-Azië Transport)",
        "Evergreen Marine Corporation (APAC & Americas Carrier)",
        "Ocean Network Express (ONE - Containervervoer)",
        "Kuehne+Nagel International AG (Expediteur & Intermodaal)",
        "APM Terminals (Havenoperaties Rotterdam / Valencia)",
        "Zapier Inc. (Logistieke Telemetrie & Automatisering Webhooks)"
      ],
      "brandCat3Title": "C. Kwaliteitsnormen, Technische Software & Database Architectuur:",
      "brandsCat3": [
        "Lean Six Sigma (IASSC / ASQ DMAIC Black Belt Methodologie)",
        "TypeScript (Microsoft Corporation)",
        "Python (Python Software Foundation)",
        "PostgreSQL (PostgreSQL Global Development Group)",
        "Next.js / Edge Architectuur (Vercel Inc.)",
        "OptiAsset CMMS (Propriëtair Industrieel Dubbel-DB Systeem)"
      ],
      "ndaTitle": "2. Naleving van Geheimhouding en Illustratieve Cijfers (NDA)",
      "ndaSubtitle": "Bescherming van fabrieks- en bedrijfsgeheimen (EU-Richtlijn 2016/943 · Spaanse Wet 1/2019)",
      "ndaP1": "Eduardo de Sousa is gebonden aan strikte, doorlopende professionele geheimhoudingsovereenkomsten (NDA's) en wettelijke geheimhoudingsplichten ter bescherming van bedrijfsgeheimen, technische tekeningen en operationele werkwijzen van eerdere cliënten en werkgevers.",
      "ndaP2": "Dientengevolge zijn alle kwantitatieve cijfers, submicron-toleranties, montageritmes, defectpercentages en inkoopbesparingen op deze website gesaneerde, geaggregeerde en illustratieve benaderingen. Ze zijn uitsluitend ontworpen om methodologische bekwaamheid en schaalgrootte aan te tonen zonder vertrouwelijke bedrijfscijfers, bedrijfstekeningen of productieplanningen van cliënten openbaar te maken.",
      "metricsList": [
        "Cleanroom optische toleranties (<0.1 µm): Genormaliseerde weergave van precisie-assemblageprotocollen.",
        "Automotive OEM doorvoer (110–120 eenheden/ploeg): Geschaalde weergave van productielijncadans.",
        "Kwaliteitsverbetering (15% defectreductie): Representatieve omvang van DMAIC en 8D probleemoplossing.",
        "Inkoopoptimalisatie (-75% / $800.000 USD/jaar): Genormaliseerde waarden ter illustratie van directe fabriekshomologatie.",
        "Zeevrachtlogistiek (20 containers/kwartaal): Benadering van intercontinentaal vrachtvolume."
      ],
      "cleanroomTitle": "3. Strikte Beroepsafbakening & Cleanroompraktijk (Ground Truth)",
      "cleanroomSubtitle": "Geen ISO 14644 lead auditor-, certificerings- of installatiebouwactiviteiten",
      "cleanroomP1": "Eduardo de Sousa voerde technische elektromechanische verpakkingsassemblage uit binnen cleanroomomgevingen (bij HQ Pack binnen het ASML halfgeleiderlithografie-ecosysteem in Brainport Eindhoven).",
      "cleanroomP2": "Noch Eduardo de Sousa noch deze website claimen, leveren, ontwerpen of certificeren officiële ISO 14644 cleanrooms. Eduardo de Sousa is GEEN ISO 14644 lead auditor, certificeerder of cleanroom-HVAC-installateur. Alle verwijzingen naar ISO Klasse 5-omgevingen beschrijven uitsluitend praktische werkvloerdiscipline, kledingprotocollen en partikelvrije assemblage, en geenszins officiële certificeringsdiensten.",
      "disclaimerTitle": "4. Professionele Afwijzing van Aansprakelijkheid & Advieskader",
      "disclaimerSubtitle": "Verkennende technische diagnosemodellen en afwezigheid van precontractuele garantie",
      "disclaimerP1": "Alle interactieve diagnosetools (inclusief de Twee-Variabelen Stilstandkost / COPQ Simulator), rekenmodellen en technische documenten op deze website zijn uitsluitend bedoeld voor oriënterende en methodologische doeleinden.",
      "disclaimerP2": "Zij vormen geen bindende technische rapporten, formele audits of garanties voor kostenbesparing. Een formele adviesrelatie ontstaat uitsluitend na de wederzijdse ondertekening van een schriftelijk Adviesmandaat, Raamovereenkomst of Statement of Work (SOW) met afgebakende prestaties en aansprakelijkheid.",
      "cookiesTitle": "5. Integraal Cookiebeleid & Technische Inventarisatie",
      "cookiesSubtitle": "Conform de ePrivacy-richtlijn 2002/58/EG en de Spaanse LSSI-CE 34/2002 Artikel 22.2",
      "cookiesP1": "Dit portaal maakt gebruik van strikt noodzakelijke technische cookies voor netwerkroutering, edge-beveiliging en taalvoorkeuren. Optionele sessietechnologie en interactiewarmtekaarten (Microsoft Clarity) zijn strikt afhankelijk van een voorafgaande, uitdrukkelijke toestemming via de consent-banner en blijven standaard volledig geblokkeerd.",
      "cookiesTableHead": {
        "name": "Cookie-identificatie",
        "provider": "Aanbieder / Domein",
        "type": "Classificatie",
        "purpose": "Technische Functie & Doel",
        "expiry": "Bewaartermijn",
        "basis": "Juridische Grondslag"
      },
      "cookiesList": [
        {
          "name": "preferred_lang",
          "provider": "Eerste partij (desousaops.vercel.app)",
          "type": "Technisch / Essentieel",
          "purpose": "Onthoudt de gekozen taalvoorkeur van de gebruiker (es, en, de, nl, fr, pt).",
          "expiry": "1 Jaar",
          "basis": "Art. 6.1.f AVG (Vrijgesteld van toestemming)"
        },
        {
          "name": "cookie-consent",
          "provider": "Eerste partij (desousaops.vercel.app)",
          "type": "Technisch / Essentieel",
          "purpose": "Registreert de gemaakte cookiekeuzes in de consent banner.",
          "expiry": "1 Jaar",
          "basis": "Art. 6.1.f AVG (Vrijgesteld van toestemming)"
        },
        {
          "name": "geo_country / geo_city",
          "provider": "Eerste partij (Vercel Edge)",
          "type": "Technisch / Routing",
          "purpose": "Geolocatieheaders voor serverroutering en latency-optimalisatie zonder advertentieprofilering.",
          "expiry": "30 Dagen",
          "basis": "Art. 6.1.f AVG (Vrijgesteld van toestemming)"
        },
        {
          "name": "_clck / _clsk",
          "provider": "Derde partij (Microsoft Clarity)",
          "type": "Analytisch / Bruikbaarheid",
          "purpose": "Anonieme registratie van warmtekaarten, scroldiepte en gebruikerservaring met automatische tekstmaskering. Standaard geblokkeerd.",
          "expiry": "1 Jaar / 1 Dag",
          "basis": "Art. 6.1.a AVG (Uitdrukkelijke Toestemming)"
        },
        {
          "name": "Vercel Analytics",
          "provider": "Vercel Inc. (Edge Telemetrie)",
          "type": "Prestatie / Telemetrie",
          "purpose": "Cookieloze geaggregeerde meting van Core Web Vitals en responstijden aan de netwerkgrens.",
          "expiry": "Sessie",
          "basis": "Art. 6.1.f AVG (Cookieless Edge)"
        }
      ],
      "cookiesBtnManage": "Cookievoorkeuren Beheren (AVG)",
      "privacyTitle": "6. Gegevensbescherming, Verwerking & Rechten van Betrokkenen (AVG)",
      "privacySubtitle": "Algemene Verordening Gegevensbescherming (EU) 2016/679 en relevante uitvoeringswetten",
      "privacyController": "Verwerkingsverantwoordelijke: Eduardo de Sousa · De Sousa Industrial Operations Advisory · Valencia, Spanje · Contact: desousaejai@gmail.com",
      "privacyTelemetry": "Infrastructuur telemetrie: Operationeel op Vercel's edge-netwerk. Geen advertentietrackers of commerciële profileringssystemen actief.",
      "privacyClarity": "Gedragstelemetrie (Microsoft Clarity): Sessie-analyse is strikt onderworpen aan toestemming. Gevoelige invoervelden worden lokaal in de browser gemaskeerd vóór verzending.",
      "privacyRights": "Rechten van Betrokkenen (Art. 15 tot 22 AVG): U heeft het recht op inzage, rectificatie, gegevenswissing, beperking van verwerking en bezwaar via desousaejai@gmail.com.",
      "privacyAepd": "Toezichthoudende Autoriteit: Bij geschillen over gegevensverwerking heeft u het recht een klacht in te dienen bij de Spaanse gegevensbeschermingsautoriteit (AEPD, aepd.es) of bij de toezichthouder in uw EU-lidstaat (zoals de Autoriteit Persoonsgegevens).",
      "copyrightTitle": "7. Intellectueel Eigendom & Auteursrecht",
      "copyrightBody": "© 2026 Eduardo de Sousa. Alle rechten voorbehouden. De visuele architectuur, softwareontwerp, React-componenten, algoritmische modellen en opgestelde documentatie zijn beschermd intellectueel eigendom. Ongeautoriseerde geautomatiseerde gegevenswinning (scraping) of overname is verboden."
    }
  },
  "de": {
    "metaTitle": "Impressum, Markenhinweise, Geheimhaltung & Datenschutz | Eduardo de Sousa",
    "metaDesc": "Vollständige rechtliche Hinweise, nominative Markennutzung, Einhaltung von Geschäftsgeheimnissen und NDA, Cookie-Richtlinie und DSGVO-Inventar für Eduardo de Sousa.",
    "badge": "RECHTS- UND REGULIERUNGSDOSSIER // COMPLIANCE-AUDIT",
    "title": "Rechtliche Hinweise, Markenrecht, Geheimhaltung & Cookie-Richtlinie",
    "subtitle": "Institutionelle juristische Transparenz bezüglich Drittmarken, Schutz von Betriebsgeheimnissen, technischem Leistungsumfang und DSGVO / ePrivacy.",
    "lastUpdated": "Gültig ab: November 2026",
    "backHome": "Zurück zur Beratungspraxis",
    "sections": {
      "providerTitle": "0. Angaben zum Diensteanbieter & Aufsichtsrechtliche Hinweise",
      "providerSubtitle": "Pflichtangaben gemäß spanischem Gesetz LSSI-CE 34/2002 Art. 10 und DSGVO (EU) 2016/679 Art. 13",
      "providerLegalName": "Verantwortlicher / Berater: Eduardo de Sousa · De Sousa Industrial Operations Advisory",
      "providerActivity": "Berufliche Tätigkeit: Freiberufliche Beratung für industrielle Betriebsabläufe, direkte Werksbeschaffung (China/Indien), Fehlerbeseitigung und CMMS-Einführung.",
      "providerLocation": "Steuer-ID & Standorte: Europäischer USt-Operator · Valencia, Spanien · Brainport Eindhoven Korridor, Niederlande.",
      "providerContact": "Offizieller rechtlicher Kontakt: desousaejai@gmail.com · Telefon / WhatsApp: +34 661 440 045",
      "trademarkTitle": "1. Hinweis zur nominativen Markennutzung (Nominative Fair Use)",
      "trademarkSubtitle": "Drittmarken, Unternehmenslogos und Zertifizierungsembleme (Art. 14 Verordnung (EU) 2017/1001 · US Lanham Act § 1115(b)(4))",
      "trademarkP1": "Alle auf dieser Website dargestellten Warenzeichen, eingetragenen Marken, Firmennamen und Unternehmenslogos (unter anderem ASML, VDL Nedcar, BMW Group, MINI, Carl Zeiss, Robert Bosch GmbH, TÜV NORD, A.P. Møller – Maersk, Hapag-Lloyd, MSC, COSCO SHIPPING, CMA CGM, Evergreen, ONE, Kuehne+Nagel und APM Terminals) sind das ausschließliche geistige Eigentum der jeweiligen Markeninhaber.",
      "trademarkP2": "Die Nennung und Abbildung dieser Marken erfolgt strikt im Rahmen der internationalen Doktrin der nominativen fairen Nutzung (Art. 14 der Verordnung (EU) 2017/1001 über die Unionsmarke, spanisches Markengesetz 17/2001 Art. 37 und US Lanham Act 15 U.S.C. § 1115(b)(4)). Ihr ausschließlicher Zweck ist die wahrheitsgemäße, historische Identifikation der betreuten Industrieanlagen, Lieferketten, ausgeführten Reinraummontagen und beauftragten Reedereien. Zu keinem Zeitpunkt werden Eigentumsansprüche, Agenturbeziehungen, offizielle Partnerschaften, Sponsoring oder Autorisierungen durch diese Unternehmen begründet oder suggeriert.",
      "brandCat1Title": "A. Industrieanlagen, High-Tech-Hersteller & Automobil-OEM:",
      "brandsCat1": [
        "ASML Netherlands B.V. (Halbleiter-Lithografie-Lieferkette)",
        "HQ Pack B.V. (Reinraummontage Brainport Eindhoven)",
        "VDL Nedcar B.V. (Automobil-Fließfertigung im Takt)",
        "BMW Group (Bayerische Motoren Werke AG)",
        "MINI (BMW Group Qualitätskadenz)",
        "Carl Zeiss AG (Optikverpackung für Halbleiter)",
        "Robert Bosch GmbH (Industrieelektronik)",
        "TÜV NORD Group (Sicherheitsprüfung von Hebezeugen und Winden)"
      ],
      "brandCat2Title": "B. Globale Reedereien, Seehäfen & Intermodale Frachtnetzwerke:",
      "brandsCat2": [
        "A.P. Møller – Maersk A/S (Globaler Containerfrachtverkehr)",
        "Hapag-Lloyd AG (Transatlantische & Interkontinentale Logistik)",
        "Mediterranean Shipping Company (MSC)",
        "COSCO SHIPPING Lines Co., Ltd. (China Ocean Shipping)",
        "CMA CGM Group (Transpazifische & Europa-Asien-Verkehre)",
        "Evergreen Marine Corporation (APAC & Americas Carrier)",
        "Ocean Network Express (ONE - Containerschifffahrt)",
        "Kuehne+Nagel International AG (Spedition & Intermodal)",
        "APM Terminals (Hafenbetrieb Rotterdam / Valencia)",
        "Zapier Inc. (Logistik-Telemetrie & Webhook-Automatisierung)"
      ],
      "brandCat3Title": "C. Qualitätsstandards, Technische Software & Datenbank-Architektur:",
      "brandsCat3": [
        "Lean Six Sigma (IASSC / ASQ DMAIC Black Belt Methodik)",
        "TypeScript (Microsoft Corporation)",
        "Python (Python Software Foundation)",
        "PostgreSQL (PostgreSQL Global Development Group)",
        "Next.js / Edge-Architektur (Vercel Inc.)",
        "OptiAsset CMMS (Proprietäres industrielles Dual-DB-System)"
      ],
      "ndaTitle": "2. Vertraulichkeit, illustrative Kennzahlen & Geschäftsgeheimnisse (NDA)",
      "ndaSubtitle": "Schutz von Betriebs- und Geschäftsgeheimnissen (EU-Richtlinie 2016/943 · Spanisches Gesetz 1/2019)",
      "ndaP1": "Eduardo de Sousa unterliegt strengen, unbefristeten Vertraulichkeitsvereinbarungen (NDAs) bezüglich industrieller Prozesse, Konstruktionszeichnungen und betrieblicher Methoden früherer Auftraggeber und Arbeitgeber.",
      "ndaP2": "Folglich stellen sämtliche auf dieser Website genannten quantitativen Kennzahlen, Submikron-Toleranzen, Taktzeiten, Fehlerraten und Kostensenkungen bereinigte, aggregierte und illustrative Näherungswerte dar. Sie veranschaulichen methodische Kompetenz und industrielle Dimensionen, ohne vertrauliche Kundenoriginaldaten, geschützte Zeichnungen oder Produktionszeitpläne preiszugeben.",
      "metricsList": [
        "Reinraum-Toleranzen (<0.1 µm): Bereinigte Näherung zur Demonstration präziser Montageprotokolle.",
        "Automobil-OEM-Takt (110–120 Einheiten/Schicht): Skalierte Darstellung des Produktionsflusses.",
        "Fehlerreduktion (15%): Repräsentative Dimension systematischer DMAIC- und 8D-Beseitigung.",
        "Einkaufsoptimierung (-75% / 800.000 USD/Jahr): Normalisierte Zahlen zum Nachweis direkter Werksverhandlungen.",
        "Seefracht (20 Container/Quartal): Annäherung interkontinentaler Containerversandvolumina."
      ],
      "cleanroomTitle": "3. Strikte fachliche Abgrenzung & Reinraum-Praxis (Ground Truth)",
      "cleanroomSubtitle": "Keine Tätigkeiten als ISO 14644 Auditor, Zertifizierer oder Reinraumbauer",
      "cleanroomP1": "Eduardo de Sousa war als elektromechanischer Montagespezialist für High-Tech-Verpackungen im Inneren von Reinräumen tätig (bei HQ Pack im ASML-Halbleiterlithografie-Ökosystem in Brainport Eindhoven).",
      "cleanroomP2": "Weder Eduardo de Sousa noch diese Website bieten offizielle Zertifizierungen nach ISO 14644 an, noch planen oder errichten sie Reinraumanlagen. Eduardo de Sousa ist KEIN ISO 14644 Lead-Auditor, Zertifizierer oder Reinraum-HLK-Planer. Alle Angaben zu ISO-Klasse-5-Umgebungen beschreiben ausschließlich praktische Werkstattdisziplin, Schleusenprotokolle und partikelfreie Montage, keine Zertifizierungsdienstleistungen.",
      "disclaimerTitle": "4. Haftungsausschluss & Beratungsrahmen",
      "disclaimerSubtitle": "Explorative technische Diagnosemodelle und Ausschluss vorvertraglicher Zusicherungen",
      "disclaimerP1": "Alle interaktiven Diagnosetools (einschließlich des Zwei-Variablen-Stillstandskosten-Simulators / COPQ), Rechner und Fachbeiträge dieser Website dienen ausschließlich explorativen und technischen Orientierungszwecken.",
      "disclaimerP2": "Sie stellen keine verbindlichen Gutachten, zertifizierten Audits oder vertraglichen Einsparungsgarantien dar. Ein formelles Beratungsverhältnis kommt ausschließlich durch die beiderseitige Unterzeichnung eines schriftlichen Beratungsmandats oder Rahmenvertrags (SOW/MSA) zustande.",
      "cookiesTitle": "5. Umfassende Cookie-Richtlinie & Technische Bestandsaufnahme",
      "cookiesSubtitle": "Konform mit der ePrivacy-Richtlinie 2002/58/EG und spanischem Recht LSSI-CE 34/2002 Art. 22.2",
      "cookiesP1": "Dieses Portal verwendet technisch zwingend erforderliche Cookies für Netzwerk-Routing, Edge-Sicherheit und Sprachpräferenzen. Optionale Sitzungsanalysen und Interaktions-Heatmaps (Microsoft Clarity) sind strikt an eine vorherige, ausdrückliche Einwilligung über das Consent-Banner gebunden und bleiben standardmäßig vollständig blockiert.",
      "cookiesTableHead": {
        "name": "Cookie-Kennung",
        "provider": "Anbieter / Domain",
        "type": "Klassifizierung",
        "purpose": "Technische Funktion & Zweck",
        "expiry": "Speicherdauer",
        "basis": "Rechtsgrundlage"
      },
      "cookiesList": [
        {
          "name": "preferred_lang",
          "provider": "Erstanbieter (desousaops.vercel.app)",
          "type": "Technisch / Notwendig",
          "purpose": "Speichert die gewählte Sprachauswahl des Nutzers (es, en, de, nl, fr, pt).",
          "expiry": "1 Jahr",
          "basis": "Art. 6 Abs. 1 lit. f DSGVO (Einwilligungsfrei)"
        },
        {
          "name": "cookie-consent",
          "provider": "Erstanbieter (desousaops.vercel.app)",
          "type": "Technisch / Notwendig",
          "purpose": "Dokumentiert die getroffenen Auswahlen im Cookie-Einwilligungsbanner.",
          "expiry": "1 Jahr",
          "basis": "Art. 6 Abs. 1 lit. f DSGVO (Einwilligungsfrei)"
        },
        {
          "name": "geo_country / geo_city",
          "provider": "Erstanbieter (Vercel Edge)",
          "type": "Technisch / Routing",
          "purpose": "Geolokalisierungs-Header zur Latenzoptimierung am Edge ohne Erstellung von Werbeprofilen.",
          "expiry": "30 Tage",
          "basis": "Art. 6 Abs. 1 lit. f DSGVO (Einwilligungsfrei)"
        },
        {
          "name": "_clck / _clsk",
          "provider": "Drittanbieter (Microsoft Clarity)",
          "type": "Analyse / Usability",
          "purpose": "Anonyme Erfassung von Heatmaps und Interaktionsdaten mit automatischer Textmaskierung. Standardmäßig blockiert.",
          "expiry": "1 Jahr / 1 Tag",
          "basis": "Art. 6 Abs. 1 lit. a DSGVO (Ausdrückliche Einwilligung)"
        },
        {
          "name": "Vercel Analytics",
          "provider": "Vercel Inc. (Edge-Telemetrie)",
          "type": "Leistung / Telemetrie",
          "purpose": "Cookielose, aggregierte Erfassung von Core Web Vitals und Edge-Ladezeiten.",
          "expiry": "Sitzung",
          "basis": "Art. 6 Abs. 1 lit. f DSGVO (Cookieless Edge)"
        }
      ],
      "cookiesBtnManage": "Cookie-Einstellungen anpassen (DSGVO)",
      "privacyTitle": "6. Datenschutz, Verarbeitungsgrundsätze & Betroffenenrechte (DSGVO)",
      "privacySubtitle": "Datenschutz-Grundverordnung (EU) 2016/679 und ergänzende nationale Gesetze",
      "privacyController": "Verantwortlicher: Eduardo de Sousa · De Sousa Industrial Operations Advisory · Valencia, Spanien · Kontakt: desousaejai@gmail.com",
      "privacyTelemetry": "Infrastruktur-Telemetrie: Betrieb im globalen Edge-Netzwerk von Vercel. Keine Werbe-Pixel oder Cross-Site-Tracker aktiv.",
      "privacyClarity": "Verhaltensanalyse (Microsoft Clarity): Sitzungsmessungen erfordern eine ausdrückliche Zustimmung. Sensible Formulardaten werden clientseitig unkenntlich gemacht.",
      "privacyRights": "Rechte der betroffenen Personen (Art. 15 bis 22 DSGVO): Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung und Widerspruch über desousaejai@gmail.com.",
      "privacyAepd": "Aufsichtsbehörde: Im Falle datenschutzrechtlicher Beschwerden haben Sie das Recht, sich an die spanische Datenschutzbehörde (AEPD, aepd.es) oder an die zuständige Aufsichtsbehörde Ihres EU-Mitgliedstaates zu wenden.",
      "copyrightTitle": "7. Urheberrecht & Geistiges Eigentum",
      "copyrightBody": "© 2026 Eduardo de Sousa. Alle Rechte vorbehalten. Die visuelle Architektur, Softwarekomponenten, algorithmischen Modelle und Texte sind urheberrechtlich geschützt. Automatisierte Extraktion (Scraping) oder unberechtigte Vervielfältigung sind untersagt."
    }
  },
  "fr": {
    "metaTitle": "Mentions Légales, Marques, Confidentialité & Données | Eduardo de Sousa",
    "metaDesc": "Mentions légales complètes, usage nominatif des marques de tiers, protection du secret des affaires et des accords NDA, politique des cookies et inventaire RGPD.",
    "badge": "DOSSIER JURIDIQUE ET RÉGLEMENTAIRE // AUDIT DE CONFORMITÉ",
    "title": "Mentions Légales, Marques, Confidentialité & Gestion des Cookies",
    "subtitle": "Transparence juridique institutionnelle concernant les marques déposées, la protection du secret d'affaires, le périmètre technique et le respect du RGPD / ePrivacy.",
    "lastUpdated": "Date d'effet : Novembre 2026",
    "backHome": "Retour au Cabinet de Conseil",
    "sections": {
      "providerTitle": "0. Identification du Prestataire et Mentions Réglementaires",
      "providerSubtitle": "Informations obligatoires selon l'Art. 10 de la Loi espagnole LSSI-CE 34/2002 et l'Art. 13 du RGPD (UE) 2016/679",
      "providerLegalName": "Titulaire / Consultant : Eduardo de Sousa · De Sousa Industrial Operations Advisory",
      "providerActivity": "Activité Professionnelle : Conseil technique en opérations industrielles, approvisionnement direct usine (Chine/Inde), éradication des défauts et déploiement de GMAO.",
      "providerLocation": "Identification Fiscale & Implantation : Opérateur européen avec numéro de TVA intracommunautaire · Valence, Espagne · Corridor Brainport Eindhoven, Pays-Bas.",
      "providerContact": "Canal Officiel des Notifications : desousaejai@gmail.com · Téléphone / WhatsApp : +34 661 440 045",
      "trademarkTitle": "1. Déclaration d'Usage Nominatif Légitime des Marques",
      "trademarkSubtitle": "Marques de tiers, logotypes d'entreprises et emblèmes de certification (Règlement UE 2017/1001 Art. 14 · US Lanham Act § 1115(b)(4))",
      "trademarkP1": "Toutes les marques déposées, marques de service, noms commerciaux et logotypes d'entreprises figurant sur ce portfolio (notamment ASML, VDL Nedcar, BMW Group, MINI, Carl Zeiss, Robert Bosch GmbH, TÜV NORD, A.P. Møller – Maersk, Hapag-Lloyd, MSC, COSCO SHIPPING, CMA CGM, Evergreen, ONE, Kuehne+Nagel et APM Terminals) sont la propriété exclusive de leurs titulaires respectifs.",
      "trademarkP2": "L'affichage de ces marques et logos est strictement effectué au titre de la doctrine internationale de l'Usage Nominatif Légitime (Article 14 du Règlement (UE) 2017/1001 sur la marque de l'Union européenne, Loi espagnole sur les marques 17/2001 Art. 37 et Lanham Act américain 15 U.S.C. § 1115(b)(4)). Leur unique objet est l'identification historique et factuelle des usines exploitées, des chaînes d'approvisionnement pilotées, des assemblages réalisés en salle blanche et des transporteurs maritimes mandatés. En aucun cas ce site ne revendique de droit de propriété, d'affiliation commerciale, de parrainage ou d'agrément par ces entreprises.",
      "brandCat1Title": "A. Usines de Fabrication, Écosystèmes Haute Technologie & OEM Automobile :",
      "brandsCat1": [
        "ASML Netherlands B.V. (Chaîne d'approvisionnement en lithographie)",
        "HQ Pack B.V. (Assemblage en salle blanche Brainport Eindhoven)",
        "VDL Nedcar B.V. (Ligne de montage automobile cadencée)",
        "BMW Group (Bayerische Motoren Werke AG)",
        "MINI (Cadence qualité d'assemblage BMW Group)",
        "Carl Zeiss AG (Conditionnement d'optiques pour semi-conducteurs)",
        "Robert Bosch GmbH (Électronique industrielle)",
        "TÜV NORD Group (Certification de sécurité des engins de levage et treuils)"
      ],
      "brandCat2Title": "B. Compagnies Maritimes Globales, Ports & Réseaux Intermodaux :",
      "brandsCat2": [
        "A.P. Møller – Maersk A/S (Fret maritime par conteneurs)",
        "Hapag-Lloyd AG (Logistique transatlantique et intercontinentale)",
        "Mediterranean Shipping Company (MSC)",
        "COSCO SHIPPING Lines Co., Ltd. (Lignes maritimes de Chine)",
        "CMA CGM Group (Transport transpacifique et Europe-Asie)",
        "Evergreen Marine Corporation (Compagnie maritime APAC et Amériques)",
        "Ocean Network Express (ONE - Transport de conteneurs)",
        "Kuehne+Nagel International AG (Commissionnaire de transport et intermodal)",
        "APM Terminals (Opérations portuaires Rotterdam / Valence)",
        "Zapier Inc. (Télémétrie logistique et automatisation par webhooks)"
      ],
      "brandCat3Title": "C. Standards Qualité, Logiciels Techniques & Architecture de Données :",
      "brandsCat3": [
        "Lean Six Sigma (Cadre méthodologique DMAIC Black Belt IASSC / ASQ)",
        "TypeScript (Microsoft Corporation)",
        "Python (Python Software Foundation)",
        "PostgreSQL (PostgreSQL Global Development Group)",
        "Next.js / Architecture Edge (Vercel Inc.)",
        "OptiAsset CMMS (Système industriel propriétaire à double base de données)"
      ],
      "ndaTitle": "2. Respect de la Confidentialité, Métriques Illustratives & Secret d'Affaires",
      "ndaSubtitle": "Protection du secret des affaires et du savoir-faire industriel (Directive UE 2016/943 · Loi espagnole 1/2019)",
      "ndaP1": "Eduardo de Sousa est tenu par des accords stricts et indéfinis de non-divulgation (NDA) protégeant les secrets commerciaux, plans techniques et méthodologies opérationnelles de ses clients et employeurs précédents.",
      "ndaP2": "Par conséquent, l'ensemble des données quantitatives, tolérances submicroniques, cadences de montage, taux de rebuts et gains d'achats présentés sur ce site constituent des approximations sanitaires, agrégées et illustratives. Elles sont destinées à exposer une compétence méthodologique sans jamais dévoiler de données industrielles confidentielles ou de calendriers de production réels.",
      "metricsList": [
        "Tolérances optiques en salle blanche (<0.1 µm) : Approximation illustrant la rigueur d'assemblage de précision.",
        "Cadence automobile OEM (110–120 unités/poste) : Représentation normalisée du flux de production en chaîne continue.",
        "Éradication des défauts (15%) : Ampleur représentative des démarches DMAIC et 8D.",
        "Optimisation des coûts d'achat (-75% / 800 000 USD/an) : Chiffres normalisés illustrant l'impact du sourcing direct en usine.",
        "Fret maritime (20 conteneurs/trimestre) : Estimation illustrative de volume de transport international."
      ],
      "cleanroomTitle": "3. Délimitation Professionnelle Stricte & Réalité des Salles Blanches (Ground Truth)",
      "cleanroomSubtitle": "Absence d'activité d'auditeur principal, d'organisme certificateur ou de constructeur ISO 14644",
      "cleanroomP1": "Eduardo de Sousa a exercé des fonctions techniques de monteur électromécanique et de conditionnement de haute technologie au sein de salles blanches (chez HQ Pack au cœur de l'écosystème ASML à Brainport Eindhoven).",
      "cleanroomP2": "Ni Eduardo de Sousa ni ce site internet ne revendiquent, ne proposent, ne conçoivent ni ne certifient des installations de salles blanches selon la norme ISO 14644. Eduardo de Sousa n'est PAS un auditeur de certification ISO 14644 ni un ingénieur d'installations CVC de salles blanches. Toute mention d'environnements ISO Classe 5 renvoie exclusivement à la discipline d'atelier, aux protocoles de sas et au montage sans poussière réalisés en production.",
      "disclaimerTitle": "4. Clause de Non-Engagement Professionnel & Périmètre de Conseil",
      "disclaimerSubtitle": "Outils de diagnostic exploratoires et absence de garantie précontractuelle",
      "disclaimerP1": "Tous les simulateurs interactifs (notamment le Simulateur de Coût d'Arrêt Imprévu / COPQ à Double Variable), calculateurs et synthèses techniques disponibles sur ce site ont une valeur purement indicative.",
      "disclaimerP2": "Ils ne constituent en aucun cas des avis d'expertise contractuels ou des garanties d'économies financières. Tout engagement de conseil prend effet exclusivement après la signature bilatérale d'un Mandat de Conseil, Contrat-Cadre ou Cahier des Charges (SOW/MSA) définissant les livrables précis.",
      "cookiesTitle": "5. Politique Globale des Cookies & Inventaire Technique Exhaustif",
      "cookiesSubtitle": "Conformité à la Directive ePrivacy 2002/58/CE et à l'Art. 22.2 de la Loi espagnole LSSI-CE 34/2002",
      "cookiesP1": "Ce site utilise des cookies techniques strictement nécessaires au routage réseau, à la sécurité et à la mémorisation de la langue. Les mesures d'interaction facultatives (Microsoft Clarity) sont strictement conditionnées au consentement exprès et préalable via le bandeau dédié et demeurent totalement bloquées par défaut.",
      "cookiesTableHead": {
        "name": "Identifiant",
        "provider": "Émetteur / Domaine",
        "type": "Classification",
        "purpose": "Finalité Technique",
        "expiry": "Durée",
        "basis": "Base Juridique"
      },
      "cookiesList": [
        {
          "name": "preferred_lang",
          "provider": "Interne (desousaops.vercel.app)",
          "type": "Technique / Essentiel",
          "purpose": "Conserve la langue sélectionnée par l'utilisateur (es, en, de, nl, fr, pt).",
          "expiry": "1 An",
          "basis": "Art. 6.1.f RGPD (Dispensé de consentement)"
        },
        {
          "name": "cookie-consent",
          "provider": "Interne (desousaops.vercel.app)",
          "type": "Technique / Essentiel",
          "purpose": "Enregistre les choix exprimés dans le bandeau de consentement.",
          "expiry": "1 An",
          "basis": "Art. 6.1.f RGPD (Dispensé de consentement)"
        },
        {
          "name": "geo_country / geo_city",
          "provider": "Interne (Vercel Edge)",
          "type": "Technique / Routage",
          "purpose": "En-têtes de géolocalisation pour optimiser la latence réseau sans profilage publicitaire.",
          "expiry": "30 Jours",
          "basis": "Art. 6.1.f RGPD (Dispensé de consentement)"
        },
        {
          "name": "_clck / _clsk",
          "provider": "Tiers (Microsoft Clarity)",
          "type": "Analytique / Ergonomie",
          "purpose": "Enregistrement anonyme de cartes thermiques et parcours utilisateurs avec masquage automatique des formulaires. Bloqué par défaut.",
          "expiry": "1 An / 1 Jour",
          "basis": "Art. 6.1.a RGPD (Consentement Exprès)"
        },
        {
          "name": "Vercel Analytics",
          "provider": "Vercel Inc. (Télémétrie Edge)",
          "type": "Performance / Télémétrie",
          "purpose": "Mesure agrégée et anonyme sans cookies des métriques Core Web Vitals au niveau du serveur percuté.",
          "expiry": "Session",
          "basis": "Art. 6.1.f RGPD (Cookieless Edge)"
        }
      ],
      "cookiesBtnManage": "Gérer les Préférences de Cookies (RGPD)",
      "privacyTitle": "6. Protection des Données Personnelles & Droits des Personnes (RGPD)",
      "privacySubtitle": "Règlement Général sur la Protection des Données (UE) 2016/679 et lois nationales applicables",
      "privacyController": "Responsable du Traitement : Eduardo de Sousa · De Sousa Industrial Operations Advisory · Valence, Espagne · Contact : desousaejai@gmail.com",
      "privacyTelemetry": "Télémétrie d'infrastructure : Fonctionnement sur le réseau edge de Vercel. Aucun pixel publicitaire ou traceur intrusif déployé.",
      "privacyClarity": "Télémétrie comportementale (Microsoft Clarity) : Le suivi d'interaction exige une autorisation explicite. Tous les contenus textuels sont obfusqués localement.",
      "privacyRights": "Droits des personnes concernées (Art. 15 à 22 du RGPD) : Droit d'accès, de rectification, d'effacement, de limitation et d'opposition par message à desousaejai@gmail.com.",
      "privacyAepd": "Autorité de Contrôle : En cas de litige, vous disposez du droit d'introduire une réclamation auprès de l'Agence espagnole de protection des données (AEPD, aepd.es) ou de l'autorité compétente de votre État membre (telle que la CNIL).",
      "copyrightTitle": "7. Propriété Intellectuelle & Droits d'Auteur",
      "copyrightBody": "© 2026 Eduardo de Sousa. Tous droits réservés. L'architecture graphique, les composants logiciels, algorithmes et textes éditoriaux constituent des créations protégées par le droit d'auteur. Tout moissonnage automatisé (scraping) ou réutilisation non autorisée est prohibé."
    }
  },
  "pt": {
    "metaTitle": "Aviso Legal, Marcas, Confidencialidade & Privacidade | Eduardo de Sousa",
    "metaDesc": "Aviso legal integral, uso nominativo legítimo de marcas registradas, proteção de segredo industrial e acordos NDA, política de cookies e inventário RGPD.",
    "badge": "DOSSIÊ LEGAL E REGULATÓRIO // AUDITORIA DE CONFORMIDADE",
    "title": "Aviso Legal, Marcas, Confidencialidade & Política de Cookies",
    "subtitle": "Transparência jurídica institucional relativa a marcas corporativas de terceiros, proteção de segredos comerciais, âmbito técnico e conformidade com o RGPD / ePrivacy.",
    "lastUpdated": "Data de vigência: Novembro de 2026",
    "backHome": "Voltar à Prática de Assessoria",
    "sections": {
      "providerTitle": "0. Identificação do Prestador de Serviços e Enquadramento Regulamentar",
      "providerSubtitle": "Informações estatutárias nos termos do Art. 10 da Lei Espanhola LSSI-CE 34/2002 e do Art. 13 do RGPD (UE) 2016/679",
      "providerLegalName": "Titular / Profissional: Eduardo de Sousa · De Sousa Industrial Operations Advisory",
      "providerActivity": "Atividade Profissional: Assessoria técnica independente em operações industriais, aquisições diretas de fábrica (China/Índia), erradicação de defeitos e implementação de CMMS.",
      "providerLocation": "NIF & Sedes de Operação: Operador europeu com NIF intracomunitário · Valência, Espanha · Corredor Brainport Eindhoven, Países Baixos.",
      "providerContact": "Canal Oficial de Contacto Jurídico: desousaejai@gmail.com · Telefone / WhatsApp: +34 661 440 045",
      "trademarkTitle": "1. Declaração de Uso Nominativo Legítimo de Marcas Registadas",
      "trademarkSubtitle": "Marcas de terceiros, logótipos corporativos e emblemas de certificação (Regulamento UE 2017/1001 Art. 14 · US Lanham Act § 1115(b)(4))",
      "trademarkP1": "Todas as marcas registadas, nomes comerciais, logótipos e sinais distintivos de terceiros exibidos neste portfólio de assessoria (incluindo, entre outros, ASML, VDL Nedcar, BMW Group, MINI, Carl Zeiss, Robert Bosch GmbH, TÜV NORD, A.P. Møller – Maersk, Hapag-Lloyd, MSC, COSCO SHIPPING, CMA CGM, Evergreen, ONE, Kuehne+Nagel e APM Terminals) são propriedade exclusiva dos seus respetivos titulares.",
      "trademarkP2": "A inclusão destes logótipos e marcas é realizada estritamente sob a doutrina internacional de Uso Nominativo Legítimo (Nominative Fair Use), em cumprimento do Artigo 14 do Regulamento (UE) 2017/1001 sobre a marca da União Europeia, do Artigo 37 da Lei Espanhola de Marcas 17/2001 e do Lanham Act dos EUA 15 U.S.C. § 1115(b)(4). O seu exclusivo propósito é a identificação factual e histórica das fábricas operadas, cadeias de abastecimento geridas, montagem executada em salas limpas e armadores marítimos contratados. Em nenhuma circunstância este portal expressa ou implica propriedade, agência, parceria societária, patrocínio ou aval por parte destas organizações.",
      "brandCat1Title": "A. Fábricas Industriais, Ecossistemas de Alta Tecnologia & OEM Automóvel:",
      "brandsCat1": [
        "ASML Netherlands B.V. (Cadeia de Abastecimento de Litografia)",
        "HQ Pack B.V. (Montagem em Sala Limpa Brainport Eindhoven)",
        "VDL Nedcar B.V. (Linha de Montagem Automóvel em Cadência)",
        "BMW Group (Bayerische Motoren Werke AG)",
        "MINI (Cadência de Qualidade de Montagem BMW Group)",
        "Carl Zeiss AG (Acondicionamento de Ópticas para Semicondutores)",
        "Robert Bosch GmbH (Eletrónica Industrial)",
        "TÜV NORD Group (Certificação de Segurança para Equipamentos de Elevação e Guincho)"
      ],
      "brandCat2Title": "B. Armadores Marítimos Globais, Portos & Redes Intermodais:",
      "brandsCat2": [
        "A.P. Møller – Maersk A/S (Frete Marítimo de Contentores)",
        "Hapag-Lloyd AG (Logística Transatlântica e Intercontinental)",
        "Mediterranean Shipping Company (MSC)",
        "COSCO SHIPPING Lines Co., Ltd. (Linhas Marítimas da China)",
        "CMA CGM Group (Transporte Transpacífico e Europa-Ásia)",
        "Evergreen Marine Corporation (Operador Marítimo APAC e Américas)",
        "Ocean Network Express (ONE - Transporte de Contentores)",
        "Kuehne+Nagel International AG (Transitário e Intermodal)",
        "APM Terminals (Operações Portuárias Roterdão / Valência)",
        "Zapier Inc. (Telemetria Logística e Webhooks de Automação)"
      ],
      "brandCat3Title": "C. Padrões de Qualidade, Software Técnico & Arquitetura de Dados:",
      "brandsCat3": [
        "Lean Six Sigma (Metodologia DMAIC Black Belt IASSC / ASQ)",
        "TypeScript (Microsoft Corporation)",
        "Python (Python Software Foundation)",
        "PostgreSQL (PostgreSQL Global Development Group)",
        "Next.js / Arquitetura Edge (Vercel Inc.)",
        "OptiAsset CMMS (Sistema Industrial Proprietário de Dupla Base de Dados)"
      ],
      "ndaTitle": "2. Cumprimento de Confidencialidade, Métricas Ilustrativas & Segredo Industrial",
      "ndaSubtitle": "Proteção de segredos comerciais e industriais (Diretiva UE 2016/943 · Lei Espanhola 1/2019)",
      "ndaP1": "Eduardo de Sousa encontra-se sujeito a rigorosos acordos de confidencialidade (NDA) de vigência permanente respeitantes a processos fabris, especificações técnicas e metodologias operacionais de anteriores clientes e empregadores.",
      "ndaP2": "Consequentemente, todos os valores quantitativos, tolerâncias submicrométricas, cadências de produção, taxas de defeitos e reduções de custos apresentados no sítio representam aproximações agregadas, ilustrativas e normalizadas. Destinam-se exclusivamente a evidenciar capacidade analítica e escala técnica sem divulgar valores confidenciais reais ou segredos comerciais.",
      "metricsList": [
        "Tolerâncias ópticas em sala limpa (<0.1 µm): Aproximação representativa de protocolos de alta precisão.",
        "Cadência automóvel OEM (110–120 unidades/turno): Representação normalizada de fluxo produtivo em linha móvel.",
        "Redução de defeitos (15%): Dimensão ilustrativa de resolução de problemas via DMAIC e 8D.",
        "Otimização em compras (-75% / 800.000 USD/ano): Valores representativos do impacto da homologação direta em fábrica.",
        "Frete marítimo (20 contentores/trimestre): Estimativa ilustrativa do volume expedido em rotas internacionais."
      ],
      "cleanroomTitle": "3. Delimitação Rigorosa de Competências Técnicas & Salas Limpas (Ground Truth)",
      "cleanroomSubtitle": "Ausência de serviços de auditoria, comissionamento ou certificação ISO 14644",
      "cleanroomP1": "Eduardo de Sousa exerceu atividade técnica prática como montador eletromecânico e de embalagem de alta tecnologia no interior de salas limpas (na HQ Pack, no ecossistema de litografia da ASML em Brainport Eindhoven).",
      "cleanroomP2": "Nem Eduardo de Sousa nem este portal comercializam, oferecem, projetam ou certificam instalações de salas limpas sob a norma ISO 14644. Eduardo de Sousa NÃO é auditor de certificação, comissionador nem engenheiro de instalações AVAC de salas limpas. As referências a ambientes ISO Classe 5 dizem respeito unicamente à disciplina operacional de chão de fábrica, protocolos de vestimenta e embalagem sem partículas executados na linha.",
      "disclaimerTitle": "4. Exoneração de Responsabilidade Profissional & Âmbito da Assessoria",
      "disclaimerSubtitle": "Instrumentos diagnósticos orientativos e ausência de garantia pré-contratual",
      "disclaimerP1": "Todas as ferramentas interativas (incluindo o Simulador de Dupla Variável de Custos de Paragem / COPQ), estimadores e relatórios disponibilizados neste sítio destinam-se unicamente a exploração e enquadramento técnico preliminar.",
      "disclaimerP2": "Não consubstanciam pareceres periciais vinculativos, auditorias oficiais ou garantia de poupanças financeiras. Uma relação profissional de consultoria constitui-se unicamente após a assinatura bilateral de um Mandato de Assessoria ou Statement of Work (SOW) com entregáveis e responsabilidades contratuais formais.",
      "cookiesTitle": "5. Política Integral de Cookies & Inventário Técnico Detalhado",
      "cookiesSubtitle": "Conformidade com a Diretiva ePrivacy 2002/58/CE e Art. 22.2 da Lei Espanhola LSSI-CE 34/2002",
      "cookiesP1": "Este portal utiliza cookies técnicos estritamente necessários para o encaminhamento de rede, segurança e memorização da preferência de idioma. A telemetria de navegação e mapas de calor (Microsoft Clarity) depende estritamente do consentimento prévio e explícito do utilizador através do banner, mantendo-se totalmente desativada por predefinição.",
      "cookiesTableHead": {
        "name": "Identificador",
        "provider": "Fornecedor / Domínio",
        "type": "Classificação",
        "purpose": "Finalidade Técnica",
        "expiry": "Duração",
        "basis": "Base Jurídica"
      },
      "cookiesList": [
        {
          "name": "preferred_lang",
          "provider": "Próprio (desousaops.vercel.app)",
          "type": "Técnico / Essencial",
          "purpose": "Guarda o idioma preferido do utilizador (es, en, de, nl, fr, pt).",
          "expiry": "1 Ano",
          "basis": "Art. 6.1.f RGPD (Isento de consentimento)"
        },
        {
          "name": "cookie-consent",
          "provider": "Próprio (desousaops.vercel.app)",
          "type": "Técnico / Essencial",
          "purpose": "Regista as preferências recolhidas através do banner de consentimento.",
          "expiry": "1 Ano",
          "basis": "Art. 6.1.f RGPD (Isento de consentimento)"
        },
        {
          "name": "geo_country / geo_city",
          "provider": "Próprio (Vercel Edge)",
          "type": "Técnico / Roteamento",
          "purpose": "Cabeçalhos de geolocalização na rede perimetral para redução de latência sem perfilamento publicitário.",
          "expiry": "30 Dias",
          "basis": "Art. 6.1.f RGPD (Isento de consentimento)"
        },
        {
          "name": "_clck / _clsk",
          "provider": "Terceiros (Microsoft Clarity)",
          "type": "Analítica / Usabilidade",
          "purpose": "Registo anónimo de mapas de calor e profundidade de navegação com ocultação de dados de formulário. Bloqueado por defeito.",
          "expiry": "1 Ano / 1 Dia",
          "basis": "Art. 6.1.a RGPD (Consentimento Expresso)"
        },
        {
          "name": "Vercel Analytics",
          "provider": "Vercel Inc. (Telemetria Edge)",
          "type": "Desempenho / Telemetria",
          "purpose": "Medição sem cookies e agregada de métricas Core Web Vitals e velocidade de resposta na rede perimetral.",
          "expiry": "Sessão",
          "basis": "Art. 6.1.f RGPD (Cookieless Edge)"
        }
      ],
      "cookiesBtnManage": "Gerir Preferências de Cookies (RGPD)",
      "privacyTitle": "6. Privacidade de Dados, Tratamento & Direitos dos Titulares (RGPD)",
      "privacySubtitle": "Regulamento Geral sobre a Proteção de Dados (UE) 2016/679 e legislação nacional aplicável",
      "privacyController": "Responsável pelo Tratamento: Eduardo de Sousa · De Sousa Industrial Operations Advisory · Valência, Espanha · Contacto: desousaejai@gmail.com",
      "privacyTelemetry": "Telemetria de infraestrutura: Processamento na rede perimetral global da Vercel. Não são utilizados píxeis publicitários de conversão ou sistemas de perfilamento comercial.",
      "privacyClarity": "Telemetria comportamental (Microsoft Clarity): A recolha de dados analíticos requer autorização explícita do utilizador. As strings de texto e campos de formulário são anonimizados localmente.",
      "privacyRights": "Direitos dos Titulares (Artigos 15 a 22 do RGPD): Direito de acesso, retificação, eliminação, limitação e oposição ao tratamento mediante solicitação para desousaejai@gmail.com.",
      "privacyAepd": "Autoridade de Controlo: Em caso de litígio não resolvido, tem o direito de apresentar reclamação junto da Agência Espanhola de Proteção de Dados (AEPD, aepd.es) ou da autoridade de controlo competente do seu Estado-Membro (tal como a CNPD).",
      "copyrightTitle": "7. Propriedade Intelectual & Direitos de Autor",
      "copyrightBody": "© 2026 Eduardo de Sousa. Todos os direitos reservados. A conceção gráfica, estrutura de software, modelos algorítmicos e conteúdos textuais constituem propriedade intelectual protegida. É proibida qualquer raspagem automatizada (scraping) ou reutilização sem consentimento expresso."
    }
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (isValidLocale(resolvedParams.lang) ? resolvedParams.lang : 'en') as Locale;
  const content = legalContent[lang] || legalContent.en;

  return {
    title: content.metaTitle,
    description: content.metaDesc,
    alternates: {
      canonical: `/${lang}/legal`,
      languages: {
        en: '/en/legal',
        es: '/es/legal',
        pt: '/pt/legal',
        de: '/de/legal',
        fr: '/fr/legal',
        nl: '/nl/legal',
      },
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const t = legalContent[lang as Locale] || legalContent.en;

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Top Breadcrumb / Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors py-2 px-3.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backHome}</span>
        </Link>
        <span className="text-xs font-mono text-slate-500">{t.lastUpdated}</span>
      </div>

      {/* Hero Header */}
      <div className="space-y-3 border-b border-slate-800/80 pb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
          <Scale className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {t.title}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Content Cards */}
      <div className="space-y-8">
        {/* 0. Service Provider Identification */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
              <FileCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t.sections.providerTitle}
              </h2>
              <p className="text-xs font-mono text-cyan-400">
                {t.sections.providerSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 space-y-1">
              <span className="text-slate-500 block uppercase text-[10px]">OPERATOR / TITULAR:</span>
              <span className="text-white font-semibold block">{t.sections.providerLegalName}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 space-y-1">
              <span className="text-slate-500 block uppercase text-[10px]">ACTIVITY / ALCANCE:</span>
              <span className="text-slate-300 block">{t.sections.providerActivity}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 space-y-1">
              <span className="text-slate-500 block uppercase text-[10px]">TAX ID & LOCATIONS:</span>
              <span className="text-slate-300 block">{t.sections.providerLocation}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 space-y-1">
              <span className="text-cyan-400 font-semibold block">{t.sections.providerContact}</span>
            </div>
          </div>
        </section>

        {/* 1. Trademark Fair Use */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t.sections.trademarkTitle}
              </h2>
              <p className="text-xs font-mono text-cyan-400">
                {t.sections.trademarkSubtitle}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed text-justify">
            {t.sections.trademarkP1}
          </p>

          <p className="text-sm text-slate-300 leading-relaxed text-justify">
            {t.sections.trademarkP2}
          </p>

          {/* Category 1: Plants & OEM */}
          <div className="pt-2 space-y-2.5">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.sections.brandCat1Title}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {t.sections.brandsCat1.map((brand, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category 2: Shipping & Logistics */}
          <div className="pt-2 space-y-2.5">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Ship className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.sections.brandCat2Title}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {t.sections.brandsCat2.map((brand, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category 3: Standards & Software */}
          <div className="pt-2 space-y-2.5">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.sections.brandCat3Title}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {t.sections.brandsCat3.map((brand, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. NDA & Synthetic Metrics */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t.sections.ndaTitle}
              </h2>
              <p className="text-xs font-mono text-indigo-400">
                {t.sections.ndaSubtitle}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed text-justify">
            {t.sections.ndaP1}
          </p>

          <p className="text-sm text-slate-300 leading-relaxed text-justify">
            {t.sections.ndaP2}
          </p>

          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Illustrative Metric Notations:
            </h3>
            {t.sections.metricsList.map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-start space-x-2"
              >
                <span className="text-indigo-400 font-mono font-bold shrink-0">•</span>
                <span className="leading-relaxed">{metric}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Strict Engineering Ground Truth Demarcation */}
        <section className="p-6 sm:p-8 rounded-2xl bg-amber-950/20 border border-amber-500/30 backdrop-blur-sm space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t.sections.cleanroomTitle}
              </h2>
              <p className="text-xs font-mono text-amber-400">
                {t.sections.cleanroomSubtitle}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed text-justify">
            {t.sections.cleanroomP1}
          </p>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
            {t.sections.cleanroomP2}
          </div>
        </section>

        {/* 4. Professional Non-Reliance & Advisory Scope Disclaimer */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
              <Scale className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t.sections.disclaimerTitle}
              </h2>
              <p className="text-xs font-mono text-cyan-400">
                {t.sections.disclaimerSubtitle}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed text-justify">
            {t.sections.disclaimerP1}
          </p>

          <p className="text-sm text-slate-300 leading-relaxed text-justify">
            {t.sections.disclaimerP2}
          </p>
        </section>

        {/* 5. Comprehensive Cookie Policy & Technical Inventory */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t.sections.cookiesTitle}
              </h2>
              <p className="text-xs font-mono text-emerald-400">
                {t.sections.cookiesSubtitle}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed text-justify">
            {t.sections.cookiesP1}
          </p>

          {/* Responsive Cookie Table */}
          <div className="overflow-x-auto border border-slate-800 rounded-xl">
            <table className="min-w-full divide-y divide-slate-800 text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">{t.sections.cookiesTableHead.name}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{t.sections.cookiesTableHead.provider}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{t.sections.cookiesTableHead.type}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{t.sections.cookiesTableHead.purpose}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{t.sections.cookiesTableHead.expiry}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{t.sections.cookiesTableHead.basis}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 text-slate-300 font-mono text-[11px]">
                {t.sections.cookiesList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-emerald-400 whitespace-nowrap">{item.name}</td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{item.provider}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[10px]">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-xs text-slate-300 max-w-xs">{item.purpose}</td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{item.expiry}</td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{item.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Trigger to open GDPR preferences modal */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="text-xs text-slate-300">
              {lang === 'es' && 'Puede modificar o revocar sus preferencias de cookies en cualquier momento.'}
              {lang === 'en' && 'You may modify or withdraw your cookie consent preferences at any time.'}
              {lang === 'de' && 'Sie können Ihre Cookie-Präferenzen jederzeit anpassen oder widerrufen.'}
              {lang === 'nl' && 'U kunt uw cookievoorkeuren op elk moment wijzigen of intrekken.'}
              {lang === 'fr' && 'Vous pouvez modifier ou retirer votre consentement aux cookies à tout moment.'}
              {lang === 'pt' && 'Pode modificar ou revogar as suas preferências de cookies a qualquer momento.'}
            </div>
            <ManageCookiesButton
              currentLocale={lang as Locale}
              label={t.sections.cookiesBtnManage}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 transition-colors shadow-md font-mono shrink-0 cursor-pointer"
            />
          </div>
        </section>

        {/* 6. GDPR Data Privacy & Rights */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t.sections.privacyTitle}
              </h2>
              <p className="text-xs font-mono text-emerald-400">
                {t.sections.privacySubtitle}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-300 leading-relaxed text-justify">
            <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              {t.sections.privacyController}
            </div>
            <p>{t.sections.privacyTelemetry}</p>
            <p>{t.sections.privacyClarity}</p>
            <p>{t.sections.privacyRights}</p>
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              {t.sections.privacyAepd}
            </div>
          </div>
        </section>

        {/* 7. Copyright */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {t.sections.copyrightTitle}
              </h2>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed text-justify">
            {t.sections.copyrightBody}
          </p>
        </section>
      </div>

      {/* Footer Back Action */}
      <div className="pt-8 border-t border-slate-800/80 flex justify-center">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:from-cyan-400 hover:to-emerald-400 transition-all shadow-lg shadow-cyan-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backHome}</span>
        </Link>
      </div>
    </div>
  );
}
