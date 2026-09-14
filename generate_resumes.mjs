import fs from 'fs';
import { execSync } from 'child_process';

const languages = {
  en: {
    lang: 'en',
    title: 'Eduardo de Sousa - Executive Resume | Operations, Management & Digital',
    subTitle: 'DIRECTOR OF DIGITAL OPERATIONS, QUALITY SYSTEMS & GLOBAL SOURCING',
    certBadges: 'Lean Six Sigma Black Belt (DMAIC) · ISO 9001:2015 Lead Auditor · CMMS Software Architect',
    location: 'Valencia, Spain (100% Remote / Global Mobility)',
    livePortfolio: 'Live Portfolio ↗',
    execSummaryTitle: 'Executive Summary',
    execSummarySubtitle: 'Operations · Digital Architecture · Global Leadership',
    execSummaryText: 'Cross-functional <strong>Operations, Digital Transformation, and Quality Leader</strong> with <strong>Lean Six Sigma Black Belt</strong> certification and 10+ years of documented execution across <strong>global supply chain sourcing, high-precision semiconductor manufacturing, automotive OEM assembly, and enterprise software engineering</strong>. Expert in directing international procurement accounts (<strong class="text-slate-900">$800,000 USD/year portfolio, 20 maritime containers/quarter</strong>), achieving <strong>up to 75% direct cost reduction</strong> in China and India through factory disintermediation while <strong>remotely hiring, vetting, and directing on-site technical inspection teams</strong>. Concurrently architecting proprietary <strong>CMMS platforms with automated employee productivity KPI scoring</strong>, full-stack B2B web portals, and event-driven iPaaS pipelines. Proven remote leader combining rigorous data governance with quantitative defect eradication. Trilingual: <strong>English (C1 - Full Professional)</strong>, <strong>Spanish (Native)</strong>, and <strong>Portuguese (C1 - Full Professional)</strong>.',
    matrixTitle: 'Core Competencies & Technical Stack',
    matrixSubtitle: 'Multi-Disciplinary ATS Keyword Matrix',
    col1Title: 'Operations & Quality Leadership',
    col1Text: 'Lean Six Sigma Black Belt (DMAIC), Root Cause Analysis (RCA, 5 Whys), 8D Problem Solving, FMEA / PFMEA, CAPA Governance, Statistical Process Control (SPC, Cp/Cpk), Kaizen Blitz, Poka-Yoke, ISO 9001:2015 Auditing, TÜV Standards.',
    col2Title: 'Software & Digital Architecture',
    col2Text: 'Next.js, React, TypeScript, Node.js, Python, Tailwind CSS, PostgreSQL, REST APIs, Webhooks, Git/GitHub, Agentic AI Workflows, CMMS Architecture, Employee Productivity KPI Scoring Engines, B2B Web Portals.',
    col3Title: 'Global Sourcing & Supply Chain',
    col3Text: 'Direct Factory Sourcing (China/India), Supply Chain Disintermediation (-75% costs), On-Site Quality Teams (CLI/PSI), Incoterms (FOB/CIF), 30/70 Milestone Contracts, TCO Modeling, WMS Inventory (99.5% Accuracy).',
    col4Title: 'Automation, ERP & Telemetry',
    col4Text: 'iPaaS (Make / Zapier / Asana), ERP ISAH Data Governance, SAP Concepts, Google Data Analytics (SQL, Spreadsheets, Dashboards), Quantitative Telemetry, High-Volume Shift Control (120 units/shift).',
    expTitle: 'Professional Experience',
    expSubtitle: 'Demonstrated Leadership & Measurable ROI',
    role1Title: 'Independent Consultant — Digital Operations, Global Sourcing & Software Architecture',
    role1Date: '11/2024 – Present',
    role1Scope: 'Remote Global Operations · Managing Portfolios across Asia, Europe & the Americas',
    role1Autonomy: '100% Remote Autonomy',
    pillar1Title: 'Pillar 1: Strategic Global Sourcing & Remote Team Leadership',
    role1Bullet1: '<strong>$800K USD/Year Portfolio & 20 Containers/Quarter:</strong> Direct end-to-end international procurement for an enterprise architectural & construction supply account, managing a continuous maritime freight pipeline of 20 containers per quarter ($200,000 USD/quarter).',
    role1Bullet2: '<strong>Direct Factory Disintermediation (-75% Acquisition Cost):</strong> Restructured the client\'s procurement model by eliminating domestic trading intermediaries, establishing direct manufacturer agreements with plants in China, achieving an authenticated <strong>75% net unit cost reduction</strong>.',
    role1Bullet3: '<strong>Remote Technical Team Recruitment & Leadership (China & India):</strong> Remotely sourced, technically vetted, and managed distributed on-site inspection teams and quality engineers in mainland China and India, executing standardized Container Loading Inspections (CLI) and Pre-Shipment Inspections (PSI).',
    role1Bullet4: '<strong>India Strategic Sourcing Benchmark (15%–30% Margin Gains):</strong> Spearheaded direct factory qualification across Indian manufacturing hubs, executing multi-vendor RFQ benchmarking and defect audits, securing <strong>15% to 30% margin improvements</strong>.',
    role1Bullet5: '<strong>International Trade Governance & Milestone Contracts:</strong> Engineered purchase agreements with milestone payment structures (<strong>30% proforma advance / 70% against certified PSI inspection and original Bill of Lading</strong>), shielding working capital against default risks.',
    pillar2Title: 'Pillar 2: Custom CMMS Architecture, B2B Web Systems & Automation',
    role1Bullet6: '<strong>Proprietary CMMS & Employee KPI Scoring Engine:</strong> Architected and developed a full-stack Computerized Maintenance Management System for industrial machinery lifecycle tracking, preventive schedules, operational budgets, and an <strong>integrated employee performance KPI scoring module</strong>.',
    role1Bullet7: '<strong>Transactional B2B Platforms & Cloud Architecture:</strong> Engineered secure web applications (Next.js, TypeScript, PostgreSQL, Tailwind) with role-based access control, automated digital quote generation, and payment gateway integration.',
    role1Bullet8: '<strong>iPaaS Workflow Pipelines (Make, Zapier, Asana):</strong> Built automated event-driven webhook workflows connecting CRM, ERP, and project tracking tools, eliminating manual data entry bottlenecks and auto-generating daily operational summaries.',
    footerText: 'Eduardo de Sousa · Executive Resume (Operations, Management, Digital & Remote)',
    page1Of2: 'Page 1 of 2',
    page2Of2: 'Page 2 of 2',
    expContTitle: 'Professional Experience (Continued)',
    expContSubtitle: 'High-Tech Semiconductor Cleanrooms & Automotive OEM',
    role2Title: 'Operations Process, Quality & Data Specialist · HQ Pack',
    role2Date: '06/2025 – 07/2026',
    role2Scope: 'Eindhoven, Netherlands (Brainport High-Tech Ecosystem)',
    role2Sub: 'Semiconductor Lithography Packaging (ASML Specs)',
    role2Bullet1: '<strong>Cleanroom Data Governance in ERP ISAH:</strong> Managed end-to-end digital diagnostic logs, routing sheets, and bill-of-materials (BOM) traceability workflows across 150+ monthly packaging modules for lithography systems (ASML, Zeiss, Boeing).',
    role2Bullet2: '<strong>-30% Turnaround Cycle Time via DMAIC:</strong> Formulated standard operating procedures (SOPs), redesigned workstation ergonomic layouts, and applied 5S principles, <strong>reducing average turnaround cycle times by 30%</strong>.',
    role2Bullet3: '<strong>-22% Recurring Defect Elimination:</strong> Led cross-functional root cause investigations (RCA, 5 Whys, Ishikawa) and deployed CAPA/FMEA controls to eliminate particulate contamination under strict <strong>ISO Class 5 cleanroom standards</strong>, passing TÜV Rheinland audits with 0 critical non-conformities.',
    role3Title: 'Quality, Process & Data Analytics Specialist · VDL Nedcar',
    role3Date: '04/2022 – 05/2025',
    role3Scope: 'Born, Netherlands · Automotive OEM Manufacturing',
    role3Sub: 'BMW Group / MINI Cooper Platforms',
    role3Bullet1: '<strong>High-Volume Statistical Process Control (SPC):</strong> Monitored automated vehicle assembly conformity at production cadence of <strong>110–120 vehicles per shift</strong>, analyzing electronic torque telemetry, geometric clearances, and optical sensor feeds.',
    role3Bullet2: '<strong>-15% Systemic Assembly Defect Reduction:</strong> Directed cross-functional 8D problem-solving squads and process capability studies (Cp/Cpk), driving a <strong>15% reduction in systemic line deviations</strong> with 100% audit conformity.',
    priorTrackTitle: 'Earlier Progressive Operations & Supply Chain Track Record',
    priorRole1: 'Logistics Coordinator',
    priorRole1Company: 'Arkcohogar · 2020–2022 | Spain',
    priorRole1Text: 'Multi-site warehouse inventory oversight, cycle counts maintaining <strong>99.5% stock accuracy</strong>, ERP stock reconciliation, and dispatch routing.',
    priorRole2: 'Operations Supervisor',
    priorRole2Company: "Ed's Paixão · 2018–2020 | Portugal",
    priorRole2Text: 'Operational shift throughput, multi-tier procurement, food waste minimization, strict HACCP compliance, and cross-cultural team management.',
    priorRole3: 'Commercial & Supply Specialist',
    priorRole3Company: 'E-Ceramic · 2013–2018 | Venezuela',
    priorRole3Text: 'Industrial finishing materials cost estimation, direct factory orders, freight volumetric calculations, and B2B client relationship management.',
    eduTitle: 'Education & Certified Accreditations',
    eduSubtitle: 'Academic Degrees & International Credentials',
    degreeTitle: "Bachelor's Degree in Operations & Managerial Processes",
    degreeInst: 'University Higher Education · Comprehensive Operational Leadership, Supply Chain Modeling & Process Engineering',
    officialDegreeBadge: 'Official Degree',
    cert1Title: 'Lean Six Sigma Black Belt (DMAIC)',
    cert1Verify: 'Verify Badge ↗',
    cert1Desc: 'International Operational Excellence Certification · Statistical Variation Reduction, DOE, SPC & Kaizen Execution.',
    cert2Title: 'ISO 9001:2015 Lead Quality Auditor',
    cert2Badge: 'Certified Auditor',
    cert2Desc: 'Quality Management Certification Board · Formal planning, audit execution, risk-based thinking & CAPA tracking.',
    cert3Title: 'Google Data Analytics Professional',
    cert3Badge: 'Google / Coursera',
    cert3Desc: 'Data manipulation, SQL querying, statistical spreadsheets, and executive visualization for evidence-based decisions.',
    cert4Title: 'VCA VOL Industrial Safety & Leadership',
    cert4Badge: 'Dutch Registry',
    cert4Desc: 'Official Dutch regulatory safety accreditation for operational leaders in high-risk plant and cleanroom environments.',
    specializationsText: 'Specializations: Strategic Supply Chain Management (LMU Munich) · Communication Science (Erasmus University Rotterdam)',
    infraTitle: 'Remote Infrastructure & Digital Tooling Stack',
    infraSubtitle: 'Tools, Collaboration & Distributed Systems',
    infraCol1Title: 'Developer & Cloud Stack',
    infraCol1Text: 'Git, GitHub Actions, Linux CLI, Docker, Vercel, Node.js, Next.js, TypeScript, RESTful APIs, Webhook integrations, Agentic AI tooling.',
    infraCol2Title: 'Automation & iPaaS Stack',
    infraCol2Text: 'Make (Integromat), Zapier, Asana API, Webhook Data Pipelines, ERP ISAH, SAP GUI Concepts, PostgreSQL, Airtable, Minitab.',
    infraCol3Title: 'Remote Team Leadership',
    infraCol3Text: 'Asynchronous documentation, remote on-site inspection teams (China & India), multi-timezone coordination (CET & EST), Jira / Notion.',
    langTitle: 'Languages & Availability',
    langSubtitle: 'International Executive Communication',
    trilingualLabel: 'Trilingual Fluency:',
    lang1: 'English', lang1Level: '(C1 - Full Professional)',
    lang2: 'Spanish', lang2Level: '(Native)',
    lang3: 'Portuguese', lang3Level: '(C1 - Full Professional)',
    authLabel: 'Work Authorization:',
    authStatus: 'EU Citizen (No Visa Required)'
  },
  es: {
    lang: 'es',
    title: 'Eduardo de Sousa - Currículum Ejecutivo | Operaciones, Gestión y Digital',
    subTitle: 'DIRECTOR DE OPERACIONES DIGITALES, SISTEMAS DE CALIDAD Y COMPRAS GLOBALES',
    certBadges: 'Lean Six Sigma Black Belt (DMAIC) · Auditor Líder ISO 9001:2015 · Arquitecto de Software CMMS',
    location: 'Valencia, España (100% Remoto / Movilidad Global)',
    livePortfolio: 'Portafolio Web ↗',
    execSummaryTitle: 'Resumen Ejecutivo',
    execSummarySubtitle: 'Operaciones · Arquitectura Digital · Liderazgo Global',
    execSummaryText: 'Líder multidisciplinar de <strong>Operaciones, Transformación Digital y Calidad</strong> con certificación <strong>Lean Six Sigma Black Belt</strong> y más de 10 años de trayectoria demostrada en <strong>aprovisionamiento internacional, manufactura de semiconductores en salas blancas, ensamblaje de automoción OEM e ingeniería de software empresarial</strong>. Especialista en la dirección de cuentas internacionales de compras (<strong class="text-slate-900">cartera de $800.000 USD/año, 20 contenedores marítimos/trimestre</strong>), logrando <strong>hasta un 75% de ahorro directo</strong> en China e India mediante desintermediación de fábrica, a la vez que <strong>contrata, audita y dirige remotamente equipos técnicos de inspección in situ</strong>. Arquitectura concurrente de plataformas <strong>CMMS propietarias con puntuación automatizada de KPI de productividad</strong>, portales web B2B e integraciones iPaaS orientadas a eventos. Liderazgo remoto probado combinando estricta gobernanza de datos y erradicación cuantitativa de defectos. Trilingüe: <strong>Inglés (C1 - Profesional Completo)</strong>, <strong>Español (Nativo)</strong> y <strong>Portugués (C1 - Profesional Completo)</strong>.',
    matrixTitle: 'Competencias Clave y Stack Tecnológico',
    matrixSubtitle: 'Matriz Multidisciplinar de Palabras Clave ATS',
    col1Title: 'Liderazgo de Operaciones y Calidad',
    col1Text: 'Lean Six Sigma Black Belt (DMAIC), Análisis de Causa Raíz (RCA, 5 Porqués), Resolución de Problemas 8D, FMEA / PFMEA, Gobernanza CAPA, Control Estadístico de Procesos (SPC, Cp/Cpk), Kaizen Blitz, Poka-Yoke, Auditorías ISO 9001:2015, Normas TÜV.',
    col2Title: 'Arquitectura de Software y Digital',
    col2Text: 'Next.js, React, TypeScript, Node.js, Python, Tailwind CSS, PostgreSQL, APIs REST, Webhooks, Git/GitHub, Flujos de IA Agéntica, Arquitectura CMMS, Motores de KPI de Productividad de Empleados, Portales Web B2B.',
    col3Title: 'Aprovisionamiento Global y Cadena de Suministro',
    col3Text: 'Compras Directas en Fábrica (China/India), Desintermediación (-75% costes), Equipos de Calidad In Situ (CLI/PSI), Incoterms (FOB/CIF), Contratos por Hitos 30/70, Modelado TCO, Inventario WMS (99.5% precisión).',
    col4Title: 'Automatización, ERP y Telemetría',
    col4Text: 'iPaaS (Make / Zapier / Asana), Gobernanza de Datos ERP ISAH, Conceptos SAP, Google Data Analytics (SQL, Hojas de Cálculo, Dashboards), Telemetría Cuantitativa, Control de Turno de Alto Volumen (120 uds/turno).',
    expTitle: 'Experiencia Profesional',
    expSubtitle: 'Liderazgo Demostrado y Retorno de Inversión Medible',
    role1Title: 'Consultor Independiente — Operaciones Digitales, Compras Globales y Arquitectura de Software',
    role1Date: '11/2024 – Presente',
    role1Scope: 'Operaciones Globales Remotas · Gestión de Carteras en Asia, Europa y América',
    role1Autonomy: '100% Autonomía Remota',
    pillar1Title: 'Pilar 1: Compras Estratégicas Globales y Liderazgo de Equipos Remotos',
    role1Bullet1: '<strong>Cartera de $800K USD/Año y 20 Contenedores/Trimestre:</strong> Dirección integral de compras internacionales para cuenta empresarial de construcción y arquitectura, gestionando flujo constante de 20 contenedores marítimos por trimestre ($200.000 USD/trimestre).',
    role1Bullet2: '<strong>Desintermediación Directa con Fábricas (-75% Coste de Adquisición):</strong> Reestructuración del modelo de compras eliminando intermediarios locales y firmando contratos directos con fabricantes en China, alcanzando un <strong>75% de reducción neta unitaria</strong>.',
    role1Bullet3: '<strong>Selección y Dirección Remota de Equipos Técnicos (China e India):</strong> Búsqueda, evaluación técnica y gestión de inspectores de control de calidad in situ e ingenieros en China e India, ejecutando inspecciones estandarizadas de carga (CLI) y pre-embarque (PSI).',
    role1Bullet4: '<strong>Evaluación Comparativa Estratégica en India (15%–30% Mejora de Margen):</strong> Homologación de fábricas en centros industriales de India mediante RFQ y auditorías de defectos, asegurando <strong>mejoras de margen del 15% al 30%</strong>.',
    role1Bullet5: '<strong>Gobernanza del Comercio Internacional y Contratos por Hitos:</strong> Redacción de acuerdos con esquemas de pago por hitos (<strong>30% anticipo proforma / 70% contra inspección PSI certificada y Conocimiento de Embarque original B/L</strong>), protegiendo el capital de trabajo.',
    pillar2Title: 'Pilar 2: Arquitectura CMMS Propietaria, Sistemas Web B2B y Automatización',
    role1Bullet6: '<strong>CMMS Propietario y Motor de Puntuación KPI de Empleados:</strong> Diseño y desarrollo full-stack de un Sistema de Gestión de Mantenimiento Computarizado para seguimiento de maquinaria industrial, calendarios preventivos, presupuestos y <strong>módulo integrado de evaluación KPI de rendimiento de operarios</strong>.',
    role1Bullet7: '<strong>Plataformas Transaccionales B2B y Arquitectura Cloud:</strong> Desarrollo de aplicaciones web seguras (Next.js, TypeScript, PostgreSQL, Tailwind) con control de accesos RBAC, cotizaciones automatizadas e integración de pasarelas de pago.',
    role1Bullet8: '<strong>Pipelines de Automatización iPaaS (Make, Zapier, Asana):</strong> Creación de flujos basados en webhooks conectando CRM, ERP y herramientas de gestión, eliminando cuellos de botella manuales y generando resúmenes operativos diarios.',
    footerText: 'Eduardo de Sousa · Currículum Ejecutivo (Operaciones, Gestión, Digital y Remoto)',
    page1Of2: 'Página 1 de 2',
    page2Of2: 'Página 2 de 2',
    expContTitle: 'Experiencia Profesional (Continuación)',
    expContSubtitle: 'Salas Blancas de Semiconductores de Alta Tecnología y Automoción OEM',
    role2Title: 'Especialista en Procesos Operativos, Calidad y Datos · HQ Pack',
    role2Date: '06/2025 – 07/2026',
    role2Scope: 'Eindhoven, Países Bajos (Ecosistema Tecnológico de Brainport)',
    role2Sub: 'Embalaje de Litografía de Semiconductores (Especificaciones ASML)',
    role2Bullet1: '<strong>Gobernanza de Datos de Sala Blanca en ERP ISAH:</strong> Gestión de registros de diagnóstico digital, rutas de fabricación y trazabilidad de listas de materiales (BOM) en más de 150 módulos mensuales para sistemas de litografía (ASML, Zeiss, Boeing).',
    role2Bullet2: '<strong>-30% Tiempo de Ciclo mediante DMAIC:</strong> Estandarización de procedimientos operativos (SOP), rediseño ergonómico de puestos de trabajo y metodología 5S, <strong>reduciendo los tiempos de ciclo en un 30%</strong>.',
    role2Bullet3: '<strong>-22% Eliminación de Defectos Recurrentes:</strong> Liderazgo de investigaciones de causa raíz (RCA, 5 Porqués, Ishikawa) y controles CAPA/FMEA contra contaminación por partículas bajo estrictas <strong>normas de Sala Blanca ISO Clase 5</strong>, superando auditorías de TÜV Rheinland con 0 no conformidades críticas.',
    role3Title: 'Especialista en Calidad, Procesos y Analítica de Datos · VDL Nedcar',
    role3Date: '04/2022 – 05/2025',
    role3Scope: 'Born, Países Bajos · Fabricación Automotriz OEM',
    role3Sub: 'Plataformas BMW Group / MINI Cooper',
    role3Bullet1: '<strong>Control Estadístico de Procesos (SPC) en Alto Volumen:</strong> Monitorización de conformidad en líneas automatizadas a cadencia de <strong>110–120 vehículos por turno</strong>, analizando telemetría de torque y sensores ópticos.',
    role3Bullet2: '<strong>-15% Reducción de Defectos Sistémicos de Ensamblaje:</strong> Dirección de equipos multidisciplinares 8D y estudios de capacidad (Cp/Cpk), logrando una <strong>reducción del 15% en desviaciones de línea</strong> con 100% de conformidad en auditoría.',
    priorTrackTitle: 'Trayectoria Profesional Anterior en Operaciones y Cadena de Suministro',
    priorRole1: 'Coordinador de Logística',
    priorRole1Company: 'Arkcohogar · 2020–2022 | España',
    priorRole1Text: 'Supervisión de inventario multi-almacén, recuentos cíclicos manteniendo <strong>99.5% de precisión de stock</strong>, conciliación ERP y rutas de expedición.',
    priorRole2: 'Supervisor de Operaciones',
    priorRole2Company: "Ed's Paixão · 2018–2020 | Portugal",
    priorRole2Text: 'Rendimiento de turno operativo, compras multinivel, minimización de desperdicio, cumplimiento riguroso de APPCC (HACCP) y gestión de equipos interculturales.',
    priorRole3: 'Especialista Comercial y de Suministros',
    priorRole3Company: 'E-Ceramic · 2013–2018 | Venezuela',
    priorRole3Text: 'Estimación de costes de materiales industriales, pedidos directos a fábrica, cubicaje de fletes y gestión de relaciones B2B.',
    eduTitle: 'Educación y Acreditaciones Certificadas',
    eduSubtitle: 'Títulos Académicos y Credenciales Internacionales',
    degreeTitle: 'Licenciatura / Grado en Operaciones y Procesos Gerenciales',
    degreeInst: 'Educación Superior Universitaria · Liderazgo Operativo Integral, Modelado de Cadena de Suministro e Ingeniería de Procesos',
    officialDegreeBadge: 'Título Oficial',
    cert1Title: 'Lean Six Sigma Black Belt (DMAIC)',
    cert1Verify: 'Verificar Credencial ↗',
    cert1Desc: 'Certificación Internacional de Excelencia Operativa · Reducción Estadística de Variación, DOE, SPC y Ejecución Kaizen.',
    cert2Title: 'Auditor Líder de Sistemas de Calidad ISO 9001:2015',
    cert2Badge: 'Auditor Certificado',
    cert2Desc: 'Junta de Certificación de Gestión de Calidad · Planificación formal, ejecución de auditorías, pensamiento basado en riesgos y seguimiento CAPA.',
    cert3Title: 'Google Data Analytics Professional',
    cert3Badge: 'Google / Coursera',
    cert3Desc: 'Manipulación de datos, consultas SQL, análisis estadístico y visualización ejecutiva para decisiones basadas en evidencia.',
    cert4Title: 'Seguridad Industrial y Liderazgo VCA VOL',
    cert4Badge: 'Registro Holandés',
    cert4Desc: 'Acreditación oficial neerlandesa para líderes operativos en entornos industriales de alto riesgo y salas blancas.',
    specializationsText: 'Especializaciones: Gestión Estratégica de Cadena de Suministro (LMU Múnich) · Ciencias de la Comunicación (Universidad Erasmus de Róterdam)',
    infraTitle: 'Infraestructura Remota y Herramientas Digitales',
    infraSubtitle: 'Herramientas, Colaboración y Sistemas Distribuidos',
    infraCol1Title: 'Stack de Desarrollo y Cloud',
    infraCol1Text: 'Git, GitHub Actions, Linux CLI, Docker, Vercel, Node.js, Next.js, TypeScript, APIs RESTful, Integraciones Webhook, Herramientas de IA Agéntica.',
    infraCol2Title: 'Automatización y Stack iPaaS',
    infraCol2Text: 'Make (Integromat), Zapier, Asana API, Pipelines de Datos Webhook, ERP ISAH, Conceptos SAP GUI, PostgreSQL, Airtable, Minitab.',
    infraCol3Title: 'Liderazgo de Equipos Remotos',
    infraCol3Text: 'Documentación asíncrona, equipos de inspección in situ (China e India), coordinación multi-zona horaria (CET y EST), Jira / Notion.',
    langTitle: 'Idiomas y Disponibilidad',
    langSubtitle: 'Comunicación Ejecutiva Internacional',
    trilingualLabel: 'Fluidez Trilingüe:',
    lang1: 'Inglés', lang1Level: '(C1 - Profesional Completo)',
    lang2: 'Español', lang2Level: '(Nativo)',
    lang3: 'Portugués', lang3Level: '(C1 - Profesional Completo)',
    authLabel: 'Autorización Laboral:',
    authStatus: 'Ciudadano de la Unión Europea (Sin Visado)'
  },
  de: {
    lang: 'de',
    title: 'Eduardo de Sousa - Führungskräfte-Lebenslauf | Operations, Management & Digital',
    subTitle: 'LEITER DIGITALE OPERATIONEN, QUALITÄTSSYSTEME & GLOBALE BESCHAFFUNG',
    certBadges: 'Lean Six Sigma Black Belt (DMAIC) · ISO 9001:2015 Leitender Auditor · CMMS Software-Architekt',
    location: 'Valencia, Spanien (100% Remote / Globale Mobilität)',
    livePortfolio: 'Web-Portfolio ↗',
    execSummaryTitle: 'Executive Summary',
    execSummarySubtitle: 'Operations · Digitale Architektur · Globale Führung',
    execSummaryText: 'Fachübergreifende <strong>Führungskraft für Operations, digitale Transformation und Qualität</strong> mit <strong>Lean Six Sigma Black Belt</strong>-Zertifizierung und über 10 Jahren nachweislicher Erfahrung in <strong>globaler Beschaffung, Halbleiter-Reinraumfertigung, Automobil-OEM-Montage und Unternehmenssoftware-Entwicklung</strong>. Experte in der Leitung internationaler Beschaffungskonten (<strong class="text-slate-900">800.000 USD/Jahr Portfolio, 20 Seefrachtcontainer/Quartal</strong>), Erzielung von <strong>bis zu 75% direkter Kostensenkung</strong> in China und Indien durch Werksdisintermediation bei <strong>Remote-Rekrutierung, Auditierung und Leitung von Vor-Ort-Inspektionsteams</strong>. Parallele Architektur proprietärer <strong>CMMS-Plattformen mit automatisierter Mitarbeiter-KPI-Leistungsbewertung</strong>, B2B-Webportalen und ereignisgesteuerten iPaaS-Pipelines. Bewährte Remote-Führungskraft, die strenge Daten-Governance mit quantitativer Fehlerbeseitigung vereint. Dreisprachig: <strong>Englisch (C1 - Verhandlungssicher)</strong>, <strong>Spanisch (Muttersprache)</strong> und <strong>Portugiesisch (C1 - Verhandlungssicher)</strong>.',
    matrixTitle: 'Kernkompetenzen & Technologiestack',
    matrixSubtitle: 'Multidisziplinäre ATS-Schlüsselwort-Matrix',
    col1Title: 'Operations & Qualitätsführung',
    col1Text: 'Lean Six Sigma Black Belt (DMAIC), Ursachenanalyse (RCA, 5 Whys), 8D-Problemlösung, FMEA / PFMEA, CAPA-Governance, Statistische Prozesslenkung (SPC, Cp/Cpk), Kaizen Blitz, Poka-Yoke, ISO 9001:2015 Audits, TÜV-Standards.',
    col2Title: 'Software & Digitale Architektur',
    col2Text: 'Next.js, React, TypeScript, Node.js, Python, Tailwind CSS, PostgreSQL, REST-APIs, Webhooks, Git/GitHub, Agentische KI-Workflows, CMMS-Architektur, Mitarbeiter-KPI-Scoring-Engines, B2B-Webportale.',
    col3Title: 'Globale Beschaffung & Lieferkette',
    col3Text: 'Direkte Werksbeschaffung (China/Indien), Disintermediation (-75% Kosten), Vor-Ort-Qualitätsteams (CLI/PSI), Incoterms (FOB/CIF), 30/70-Meilensteinverträge, TCO-Modellierung, WMS-Bestand (99,5% Genauigkeit).',
    col4Title: 'Automatisierung, ERP & Telemetrie',
    col4Text: 'iPaaS (Make / Zapier / Asana), ERP ISAH Daten-Governance, SAP-Konzepte, Google Data Analytics (SQL, Dashboards), Quantitative Telemetrie, Hochvolumen-Schichtsteuerung (120 Einheiten/Schicht).',
    expTitle: 'Berufliche Erfahrung',
    expSubtitle: 'Nachgewiesene Führung & Messbarer ROI',
    role1Title: 'Unabhängiger Berater — Digitale Operationen, Globale Beschaffung & Software-Architektur',
    role1Date: '11/2024 – Heute',
    role1Scope: 'Remote Global Operations · Portfoliosteuerung über Asien, Europa & Amerika',
    role1Autonomy: '100% Remote-Autonomie',
    pillar1Title: 'Säule 1: Strategische globale Beschaffung & Remote-Teamführung',
    role1Bullet1: '<strong>800.000 USD/Jahr Portfolio & 20 Container/Quartal:</strong> Direkte internationale End-to-End-Beschaffung für Großkunden im Architektur- und Bausektor mit kontinuierlicher Seefracht-Pipeline von 20 Containern pro Quartal (200.000 USD/Quartal).',
    role1Bullet2: '<strong>Direkte Werksdisintermediation (-75% Anschaffungskosten):</strong> Neustrukturierung des Beschaffungsmodells durch Eliminierung lokaler Handelsvermittler und direkte Herstellerverträge in China mit <strong>75% Netto-Stückkostensenkung</strong>.',
    role1Bullet3: '<strong>Remote-Rekrutierung & Führung technischer Teams (China & Indien):</strong> Remote-Auswahl, technische Qualifizierung und Steuerung verteilter Vor-Ort-Inspektionsteams für Container Loading Inspections (CLI) und Pre-Shipment Inspections (PSI).',
    role1Bullet4: '<strong>Strategisches Sourcing-Benchmarking Indien (15%–30% Margensteigerung):</strong> Werksqualifizierung in indischen Industriezentren durch Multi-Vendor-RFQs und Defektaudits mit <strong>15% bis 30% Margenverbesserung</strong>.',
    role1Bullet5: '<strong>Außenhandels-Governance & Meilensteinverträge:</strong> Strukturierung von Kaufverträgen mit Meilensteinzahlungen (<strong>30% Anzahlung / 70% nach zertifizierter PSI-Inspektion und Original-Konnossement B/L</strong>) zum Schutz des Betriebskapitals.',
    pillar2Title: 'Säule 2: Proprietäre CMMS-Architektur, B2B-Websysteme & Automatisierung',
    role1Bullet6: '<strong>Proprietäres CMMS & Mitarbeiter-KPI-Scoring-System:</strong> Konzeption und Full-Stack-Entwicklung eines Instandhaltungsmanagementsystems (CMMS) für Maschinen-Lebenszyklus, Wartungspläne und <strong>integriertes Modul zur KPI-Leistungsbewertung</strong>.',
    role1Bullet7: '<strong>Transaktionale B2B-Plattformen & Cloud-Architektur:</strong> Entwicklung sicherer Webanwendungen (Next.js, TypeScript, PostgreSQL, Tailwind) mit RBAC-Zugriffskontrolle, digitaler Angebotserstellung und Zahlungsintegration.',
    role1Bullet8: '<strong>iPaaS-Workflow-Pipelines (Make, Zapier, Asana):</strong> Automatisierte ereignisgesteuerte Webhook-Workflows zwischen CRM, ERP und Projekttools zur Beseitigung manueller Engpässe und Erstellung täglicher Statusberichte.',
    footerText: 'Eduardo de Sousa · Führungskräfte-Lebenslauf (Operations, Management, Digital & Remote)',
    page1Of2: 'Seite 1 von 2',
    page2Of2: 'Seite 2 von 2',
    expContTitle: 'Berufliche Erfahrung (Fortsetzung)',
    expContSubtitle: 'High-Tech-Halbleiter-Reinräume & Automobil-OEM',
    role2Title: 'Spezialist für Betriebsprozesse, Qualität & Daten · HQ Pack',
    role2Date: '06/2025 – 07/2026',
    role2Scope: 'Eindhoven, Niederlande (Brainport High-Tech-Ökosystem)',
    role2Sub: 'Halbleiter-Lithographie-Verpackung (ASML-Spezifikationen)',
    role2Bullet1: '<strong>Reinraum-Daten-Governance im ERP ISAH:</strong> Verwaltung digitaler Diagnoseprotokolle, Arbeitspläne und Stücklisten-Rückverfolgbarkeit (BOM) für über 150 monatliche Lithographie-Module (ASML, Zeiss, Boeing).',
    role2Bullet2: '<strong>-30% Durchlaufzeitverkürzung via DMAIC:</strong> Erstellung standardisierter Arbeitsanweisungen (SOPs), ergonomische Arbeitsplatzgestaltung und 5S-Einführung mit <strong>30% Reduzierung der Durchlaufzeiten</strong>.',
    role2Bullet3: '<strong>-22% Beseitigung wiederkehrender Fehler:</strong> Leitung funktionsübergreifender Ursachenanalysen (RCA, 5 Whys, Ishikawa) und CAPA/FMEA-Maßnahmen unter strengen <strong>ISO-Klasse-5-Reinraumstandards</strong> (0 kritische Abweichungen im TÜV-Audit).',
    role3Title: 'Spezialist für Qualität, Prozesse & Datenanalyse · VDL Nedcar',
    role3Date: '04/2022 – 05/2025',
    role3Scope: 'Born, Niederlande · Automobil-OEM-Fertigung',
    role3Sub: 'Plattformen BMW Group / MINI Cooper',
    role3Bullet1: '<strong>Statistische Prozesslenkung (SPC) im Hochvolumen:</strong> Überwachung der automatisierten Fahrzeugmontage bei einer Kadenz von <strong>110–120 Fahrzeugen pro Schicht</strong> mittels Drehmoment-Telemetrie und optischer Sensorik.',
    role3Bullet2: '<strong>-15% Reduzierung systemischer Montagefehler:</strong> Leitung von 8D-Problemlösungsteams und Prozessfähigkeitsanalysen (Cp/Cpk) mit <strong>15% Reduzierung von Linienabweichungen</strong> bei 100% Audit-Konformität.',
    priorTrackTitle: 'Frühere Laufbahn in Operations & Lieferkette',
    priorRole1: 'Logistikkoordinator',
    priorRole1Company: 'Arkcohogar · 2020–2022 | Spanien',
    priorRole1Text: 'Lagerbestandsüberwachung mehrerer Standorte, zyklische Inventuren mit <strong>99,5% Bestandsgenauigkeit</strong>, ERP-Abgleich und Versanddisposition.',
    priorRole2: 'Operations Supervisor',
    priorRole2Company: "Ed's Paixão · 2018–2020 | Portugal",
    priorRole2Text: 'Schichtdurchsatz, mehrstufige Beschaffung, Abfallminimierung, strikte HACCP-Einhaltung und interkulturelle Teamführung.',
    priorRole3: 'Spezialist für Handel & Beschaffung',
    priorRole3Company: 'E-Ceramic · 2013–2018 | Venezuela',
    priorRole3Text: 'Kalkulation industrieller Veredelungsmaterialien, direkte Werksaufträge, Frachtvolumenberechnungen und B2B-Kundenbetreuung.',
    eduTitle: 'Ausbildung & Zertifizierte Qualifikationen',
    eduSubtitle: 'Akademische Abschlüsse & Internationale Zertifikate',
    degreeTitle: 'Bachelor-Abschluss in Betriebs- & Managementprozessen',
    degreeInst: 'Akademische Hochschulausbildung · Umfassende Betriebsführung, Lieferkettenmodellierung & Prozessingenieurwesen',
    officialDegreeBadge: 'Offizieller Abschluss',
    cert1Title: 'Lean Six Sigma Black Belt (DMAIC)',
    cert1Verify: 'Zertifikat Prüfen ↗',
    cert1Desc: 'Internationale Zertifizierung für Operational Excellence · Statistische Variationsreduzierung, DoE, SPC & Kaizen.',
    cert2Title: 'ISO 9001:2015 Leitender Qualitätsauditor',
    cert2Badge: 'Zertifizierter Auditor',
    cert2Desc: 'Quality Management Certification Board · Auditplanung, Risikobasiertes Denken und CAPA-Steuerung.',
    cert3Title: 'Google Data Analytics Professional',
    cert3Badge: 'Google / Coursera',
    cert3Desc: 'Datenmanipulation, SQL-Abfragen, statistische Tabellenkalkulation und datenbasierte Management-Visualisierung.',
    cert4Title: 'VCA VOL Arbeitssicherheit & Führung',
    cert4Badge: 'Niederländisches Register',
    cert4Desc: 'Offizielle niederländische Sicherheitszertifizierung für Führungskräfte in Industrieanlagen und Reinräumen.',
    specializationsText: 'Spezialisierungen: Strategisches Supply Chain Management (LMU München) · Kommunikationswissenschaft (Erasmus-Universität Rotterdam)',
    infraTitle: 'Remote-Infrastruktur & Digitales Tooling',
    infraSubtitle: 'Werkzeuge, Zusammenarbeit & Verteilte Systeme',
    infraCol1Title: 'Entwickler & Cloud-Stack',
    infraCol1Text: 'Git, GitHub Actions, Linux CLI, Docker, Vercel, Node.js, Next.js, TypeScript, RESTful APIs, Webhook-Integrationen, Agentische KI.',
    infraCol2Title: 'Automatisierung & iPaaS-Stack',
    infraCol2Text: 'Make (Integromat), Zapier, Asana API, Webhook-Datenpipelines, ERP ISAH, SAP GUI Konzepte, PostgreSQL, Airtable, Minitab.',
    infraCol3Title: 'Remote-Teamführung',
    infraCol3Text: 'Asynchrone Dokumentation, Vor-Ort-Inspektionsteams (China & Indien), Zeitzonen-Koordination (MEZ & EST), Jira / Notion.',
    langTitle: 'Sprachen & Verfügbarkeit',
    langSubtitle: 'Internationale Führungskommunikation',
    trilingualLabel: 'Dreisprachig Verhandlungssicher:',
    lang1: 'Englisch', lang1Level: '(C1 - Verhandlungssicher)',
    lang2: 'Spanisch', lang2Level: '(Muttersprache)',
    lang3: 'Portugiesisch', lang3Level: '(C1 - Verhandlungssicher)',
    authLabel: 'Arbeitserlaubnis:',
    authStatus: 'EU-Bürger (Kein Visum erforderlich)'
  },
  fr: {
    lang: 'fr',
    title: 'Eduardo de Sousa - CV Exécutif | Opérations, Management & Numérique',
    subTitle: 'DIRECTEUR DES OPÉRATIONS NUMÉRIQUES, SYSTÈMES QUALITÉ & SOURCING MONDIAL',
    certBadges: 'Lean Six Sigma Black Belt (DMAIC) · Auditeur Principal ISO 9001:2015 · Architecte Logiciel CMMS',
    location: 'Valence, Espagne (100% Télétravail / Mobilité Mondiale)',
    livePortfolio: 'Portfolio Web ↗',
    execSummaryTitle: 'Résumé Exécutif',
    execSummarySubtitle: 'Opérations · Architecture Numérique · Leadership Mondial',
    execSummaryText: 'Leader pluridisciplinaire des <strong>Opérations, de la Transformation Numérique et de la Qualité</strong>, certifié <strong>Lean Six Sigma Black Belt</strong> avec plus de 10 ans d\'expérience dans <strong>le sourcing mondial, la fabrication de semi-conducteurs en salle blanche, l\'assemblage automobile OEM et l\'ingénierie logicielle d\'entreprise</strong>. Expert dans la direction de comptes d\'achats internationaux (<strong class="text-slate-900">portefeuille de 800 000 USD/an, 20 conteneurs maritimes/trimestre</strong>), atteignant <strong>jusqu\'à 75% de réduction des coûts directs</strong> en Chine et en Inde par désintermédiation directe en usine tout en <strong>recrutant, auditant et dirigeant à distance des équipes techniques d\'inspection sur site</strong>. Architecte en parallèle de plateformes <strong>CMMS propriétaires avec notation automatisée des KPI de productivité</strong>, portails web B2B et pipelines iPaaS événementiels. Leader à distance reconnu alliant gouvernance rigoureuse des données et élimination quantitative des défauts. Trilingue : <strong>Anglais (C1 - Professionnel Complet)</strong>, <strong>Espagnol (Natif)</strong> et <strong>Portugais (C1 - Professionnel Complet)</strong>.',
    matrixTitle: 'Compétences Clés & Stack Technique',
    matrixSubtitle: 'Matrice de Mots-Clés ATS Multidisciplinaire',
    col1Title: 'Leadership Opérations & Qualité',
    col1Text: 'Lean Six Sigma Black Belt (DMAIC), Analyse des Causes Racines (RCA, 5 Pourquoi), Résolution 8D, FMEA / PFMEA, Gouvernance CAPA, Maîtrise Statistique des Procédés (SPC, Cp/Cpk), Kaizen Blitz, Poka-Yoke, Audits ISO 9001:2015, Normes TÜV.',
    col2Title: 'Architecture Logicielle & Numérique',
    col2Text: 'Next.js, React, TypeScript, Node.js, Python, Tailwind CSS, PostgreSQL, APIs REST, Webhooks, Git/GitHub, Workflows IA Agentique, Architecture CMMS, Moteurs de Scoring KPI de Productivité, Portails Web B2B.',
    col3Title: 'Sourcing Mondial & Chaîne Logistique',
    col3Text: 'Sourcing Direct Usine (Chine/Inde), Désintermédiation (-75% coûts), Équipes Qualité sur Site (CLI/PSI), Incoterms (FOB/CIF), Contrats par Jalons 30/70, Modélisation TCO, Inventaire WMS (99,5% précision).',
    col4Title: 'Automatisation, ERP & Télémétrie',
    col4Text: 'iPaaS (Make / Zapier / Asana), Gouvernance des Données ERP ISAH, Notions SAP, Google Data Analytics (SQL, Tableurs, Tableaux de Bord), Télémétrie Quantitative, Contrôle de Poste Haute Cadence (120 unités/poste).',
    expTitle: 'Expérience Professionnelle',
    expSubtitle: 'Leadership Démontré & ROI Mesurable',
    role1Title: 'Consultant Indépendant — Opérations Numériques, Sourcing Mondial & Architecture Logicielle',
    role1Date: '11/2024 – Présent',
    role1Scope: 'Opérations Mondiales à Distance · Gestion de Portefeuilles en Asie, Europe & Amériques',
    role1Autonomy: '100% Autonomie en Télétravail',
    pillar1Title: 'Pilier 1 : Sourcing Mondial Stratégique & Direction d\'Équipes à Distance',
    role1Bullet1: '<strong>Portefeuille de 800K USD/an & 20 Conteneurs/Trimestre :</strong> Direction de bout en bout des achats internationaux pour un compte d\'équipements d\'architecture et de construction, avec flux continu de 20 conteneurs par trimestre (200 000 USD/trimestre).',
    role1Bullet2: '<strong>Désintermédiation Directe en Usine (-75% Coût d\'Acquisition) :</strong> Refonte du modèle d\'achat en éliminant les intermédiaires de négoce et en contractant directement avec les usines en Chine, générant <strong>75% de réduction nette unitaire</strong>.',
    role1Bullet3: '<strong>Recrutement & Management d\'Équipes Techniques (Chine & Inde) :</strong> Sélection à distance, validation technique et encadrement d\'équipes d\'inspecteurs qualité sur site pour inspections de chargement (CLI) et avant expédition (PSI).',
    role1Bullet4: '<strong>Benchmarking Stratégique en Inde (Gains de Marge de 15% à 30%) :</strong> Qualification d\'usines dans les pôles industriels indiens via RFQ multi-fournisseurs et audits de défauts, assurant <strong>15% à 30% de marge additionnelle</strong>.',
    role1Bullet5: '<strong>Gouvernance du Commerce International & Contrats par Jalons :</strong> Élaboration de contrats avec paiements échelonnés (<strong>30% d\'acompte proforma / 70% contre inspection certifiée PSI et connaissement original B/L</strong>), protégeant le fonds de roulement.',
    pillar2Title: 'Pilier 2 : Architecture CMMS Propriétaire, Systèmes Web B2B & Automatisation',
    role1Bullet6: '<strong>CMMS Propriétaire & Moteur de Notation KPI des Collaborateurs :</strong> Architecture et développement full-stack d\'un progiciel de GMAO (CMMS) pour suivi des équipements, maintenance préventive et <strong>module intégré de scoring KPI de performance</strong>.',
    role1Bullet7: '<strong>Plateformes Transactionnelles B2B & Cloud :</strong> Ingénierie d\'applications web sécurisées (Next.js, TypeScript, PostgreSQL, Tailwind) avec contrôle RBAC, devis numériques automatisés et paiement en ligne.',
    role1Bullet8: '<strong>Pipelines d\'Automatisation iPaaS (Make, Zapier, Asana) :</strong> Création de flux automatisés basés sur webhooks unifiant CRM, ERP et suivi de projet, supprimant la saisie manuelle et générant les rapports quotidiens.',
    footerText: 'Eduardo de Sousa · CV Exécutif (Opérations, Management, Numérique & Télétravail)',
    page1Of2: 'Page 1 sur 2',
    page2Of2: 'Page 2 sur 2',
    expContTitle: 'Expérience Professionnelle (Suite)',
    expContSubtitle: 'Salles Blanches Semi-Conducteurs Haute Technologie & Automobile OEM',
    role2Title: 'Spécialiste Processus Opérationnels, Qualité & Données · HQ Pack',
    role2Date: '06/2025 – 07/2026',
    role2Scope: 'Eindhoven, Pays-Bas (Écosystème Technologique de Brainport)',
    role2Sub: 'Emballage pour Lithographie de Semi-Conducteurs (Cahier des Charges ASML)',
    role2Bullet1: '<strong>Gouvernance des Données en Salle Blanche dans ERP ISAH :</strong> Pilotage des registres de diagnostic numérique, fiches suiveuses et nomenclatures (BOM) sur plus de 150 modules mensuels (ASML, Zeiss, Boeing).',
    role2Bullet2: '<strong>-30% de Réduction du Temps de Cycle via DMAIC :</strong> Rédaction des procédures opérationnelles (SOP), réaménagement ergonomique des postes et méthode 5S, <strong>réduisant les cycles de 30%</strong>.',
    role2Bullet3: '<strong>-22% d\'Élimination des Défauts Récurrents :</strong> Conduite d\'analyses de causes racines (RCA, 5 Pourquoi, Ishikawa) et plans CAPA/FMEA sous strictes <strong>normes de Salle Blanche ISO Classe 5</strong> (0 non-conformité critique à l\'audit TÜV).',
    role3Title: 'Spécialiste Qualité, Processus & Analyse de Données · VDL Nedcar',
    role3Date: '04/2022 – 05/2025',
    role3Scope: 'Born, Pays-Bas · Assemblage Automobile OEM',
    role3Sub: 'Plateformes BMW Group / MINI Cooper',
    role3Bullet1: '<strong>Maîtrise Statistique des Procédés (SPC) Haute Cadence :</strong> Contrôle de conformité de l\'assemblage à une cadence de <strong>110–120 véhicules par poste</strong> via télémétrie de couple et capteurs optiques.',
    role3Bullet2: '<strong>-15% de Réduction des Défauts d\'Assemblage Systémiques :</strong> Pilotage de groupes 8D et études de capabilité (Cp/Cpk), permettant une <strong>baisse de 15% des écarts de ligne</strong> avec conformité totale aux audits.',
    priorTrackTitle: 'Parcours Antérieur en Opérations & Chaîne Logistique',
    priorRole1: 'Coordinateur Logistique',
    priorRole1Company: 'Arkcohogar · 2020–2022 | Espagne',
    priorRole1Text: 'Gestion des stocks multi-entrepôts, inventaires tournants avec <strong>99,5% de précision de stock</strong>, réconciliation ERP et plans de livraison.',
    priorRole2: 'Superviseur des Opérations',
    priorRole2Company: "Ed's Paixão · 2018–2020 | Portugal",
    priorRole2Text: 'Débit opérationnel par poste, approvisionnement multi-niveaux, réduction du gaspillage, conformité HACCP stricte et gestion d\'équipes multiculturelles.',
    priorRole3: 'Spécialiste Commercial & Approvisionnement',
    priorRole3Company: 'E-Ceramic · 2013–2018 | Venezuela',
    priorRole3Text: 'Chiffrage des matériaux industriels, commandes directes d\'usine, cubage du fret maritime et relations commerciales B2B.',
    eduTitle: 'Formation & Certifications Validées',
    eduSubtitle: 'Diplômes Universitaires & Titres Internationaux',
    degreeTitle: 'Licence en Gestion des Opérations & Processus Managériaux',
    degreeInst: 'Enseignement Supérieur Universitaire · Direction des Opérations, Modélisation Logistique & Ingénierie des Processus',
    officialDegreeBadge: 'Diplôme Officiel',
    cert1Title: 'Lean Six Sigma Black Belt (DMAIC)',
    cert1Verify: 'Vérifier la Certification ↗',
    cert1Desc: 'Certification Internationale d\'Excellence Opérationnelle · Réduction de la Dispersion, Plans d\'Expériences (DOE), SPC & Déploiement Kaizen.',
    cert2Title: 'Auditeur Principal Systèmes Qualité ISO 9001:2015',
    cert2Badge: 'Auditeur Certifié',
    cert2Desc: 'Organisme de Certification en Management de la Qualité · Planification formelle, audits, approche par les risques et suivi CAPA.',
    cert3Title: 'Google Data Analytics Professional',
    cert3Badge: 'Google / Coursera',
    cert3Desc: 'Traitement des données, requêtes SQL, tableurs d\'analyse et restitution visuelle pour la prise de décision factuelle.',
    cert4Title: 'Sécurité Industrielle & Leadership VCA VOL',
    cert4Badge: 'Registre Néerlandais',
    cert4Desc: 'Accréditation officielle néerlandaise pour responsables opérationnels en environnements industriels à risque et salles blanches.',
    specializationsText: 'Spécialisations : Gestion Stratégique de la Chaîne Logistique (LMU Munich) · Sciences de la Communication (Université Érasme de Rotterdam)',
    infraTitle: 'Infrastructure Télétravail & Stack Numérique',
    infraSubtitle: 'Outils, Travail Collaboratif & Systèmes Distribués',
    infraCol1Title: 'Stack Développement & Cloud',
    infraCol1Text: 'Git, GitHub Actions, Linux CLI, Docker, Vercel, Node.js, Next.js, TypeScript, APIs RESTful, Webhooks, Outils d\'IA Agentique.',
    infraCol2Title: 'Automatisation & Stack iPaaS',
    infraCol2Text: 'Make (Integromat), Zapier, Asana API, Pipelines Webhooks, ERP ISAH, Concepts SAP GUI, PostgreSQL, Airtable, Minitab.',
    infraCol3Title: 'Leadership d\'Équipes à Distance',
    infraCol3Text: 'Documentation asynchrone, équipes d\'inspection sur site (Chine & Inde), coordination multi-fuseaux horaires (CET & EST), Jira / Notion.',
    langTitle: 'Langues & Disponibilité',
    langSubtitle: 'Communication Exécutive Internationale',
    trilingualLabel: 'Trilingue Courant :',
    lang1: 'Anglais', lang1Level: '(C1 - Professionnel Complet)',
    lang2: 'Espagnol', lang2Level: '(Natif)',
    lang3: 'Portugais', lang3Level: '(C1 - Professionnel Complet)',
    authLabel: 'Autorisation de Travail :',
    authStatus: 'Citoyen de l\'Union Européenne (Sans Visa Requis)'
  },
  nl: {
    lang: 'nl',
    title: 'Eduardo de Sousa - Executive CV | Operations, Management & Digital',
    subTitle: 'DIRECTEUR DIGITALE OPERATIES, KWALITEITSSYSTEMEN & GLOBALE SOURCING',
    certBadges: 'Lean Six Sigma Black Belt (DMAIC) · ISO 9001:2015 Lead Auditor · CMMS Software Architect',
    location: 'Valencia, Spanje (100% Remote / Wereldwijde Mobiliteit)',
    livePortfolio: 'Web Portfolio ↗',
    execSummaryTitle: 'Managementsamenvatting',
    execSummarySubtitle: 'Operations · Digitale Architectuur · Globaal Leiderschap',
    execSummaryText: 'Multidisciplinair <strong>Operations-, Digitale Transformatie- en Kwaliteitsleider</strong> met <strong>Lean Six Sigma Black Belt</strong>-certificering en ruim 10 jaar gedocumenteerde ervaring in <strong>internationale sourcing, cleanroomproductie van halfgeleiders, automotive OEM-assemblage en bedrijfssoftware-engineering</strong>. Ervaren in het aansturen van internationale inkoopaccounts (<strong class="text-slate-900">$800.000 USD/jaar portfolio, 20 zeevrachtcontainers/kwartaal</strong>), met <strong>tot 75% directe kostenbesparing</strong> in China en India via fabrieksdisintermediatie en het <strong>op afstand werven, auditeren en aansturen van technische inspectieteams ter plaatse</strong>. Parallel ontwerper van eigen <strong>CMMS-platformen met geautomatiseerde medewerker-KPI-beoordeling</strong>, B2B-webportalen en event-driven iPaaS-pijplijnen. Bewezen remote leider die datagovernance combineert met kwantitatieve foutreductie. Drietalig: <strong>Engels (C1 - Vloeiend Professioneel)</strong>, <strong>Spaans (Moedertaal)</strong> en <strong>Portugees (C1 - Vloeiend Professioneel)</strong>.',
    matrixTitle: 'Kerncompetenties & Technische Stack',
    matrixSubtitle: 'Multidisciplinaire ATS-Trefwoordenmatrix',
    col1Title: 'Operations & Kwaliteitsleiderschap',
    col1Text: 'Lean Six Sigma Black Belt (DMAIC), Oorzakenanalyse (RCA, 5 Whys), 8D-probleemoplossing, FMEA / PFMEA, CAPA-governance, Statistische Procesbeheersing (SPC, Cp/Cpk), Kaizen Blitz, Poka-Yoke, ISO 9001:2015 Audits, TÜV-normen.',
    col2Title: 'Software & Digitale Architectuur',
    col2Text: 'Next.js, React, TypeScript, Node.js, Python, Tailwind CSS, PostgreSQL, REST API\'s, Webhooks, Git/GitHub, Agentic AI Workflows, CMMS-architectuur, Medewerker-KPI-scoringssystemen, B2B-webportalen.',
    col3Title: 'Globale Sourcing & Supply Chain',
    col3Text: 'Directe Fabriekssourcing (China/India), Supply Chain Disintermediatie (-75% kosten), Kwaliteitsteams ter Plaatse (CLI/PSI), Incoterms (FOB/CIF), 30/70 Mijlpaalcontracten, TCO-modellering, WMS (99,5% Nauwkeurigheid).',
    col4Title: 'Automatisering, ERP & Telemetrie',
    col4Text: 'iPaaS (Make / Zapier / Asana), ERP ISAH Datagovernance, SAP-concepten, Google Data Analytics (SQL, Dashboards), Kwantitatieve Telemetrie, Hoge Ploegencadans (120 eenheden/ploeg).',
    expTitle: 'Professionele Ervaring',
    expSubtitle: 'Aantoonbaar Leiderschap & Meetbare ROI',
    role1Title: 'Onafhankelijk Consultant — Digitale Operaties, Globale Sourcing & Software Architectuur',
    role1Date: '11/2024 – Heden',
    role1Scope: 'Remote Globale Operaties · Beheer van Portfolio\'s in Azië, Europa & Amerika',
    role1Autonomy: '100% Remote Autonomie',
    pillar1Title: 'Pijler 1: Strategische Globale Sourcing & Remote Teamleiderschap',
    role1Bullet1: '<strong>$800K USD/Jaar Portfolio & 20 Containers/Kwartaal:</strong> Directe internationale inkoop van A tot Z voor een account in bouw- en architectuurmaterialen, met een continue zeevrachtstroom van 20 containers per kwartaal ($200.000 USD/kwartaal).',
    role1Bullet2: '<strong>Directe Fabrieksdisintermediatie (-75% Aanschafkosten):</strong> Herstructurering van het inkoopmodel door uitschakeling van lokale tussenpersonen en directe fabrikantencontracten in China, wat een <strong>netto kostenbesparing van 75%</strong> opleverde.',
    role1Bullet3: '<strong>Werving & Leiding van Technische Inspectieteams (China & India):</strong> Op afstand selecteren, technisch valideren en aansturen van lokale kwaliteitsingenieurs voor Container Loading Inspections (CLI) en Pre-Shipment Inspections (PSI).',
    role1Bullet4: '<strong>Strategische Sourcing Benchmark India (15%–30% Margeverbetering):</strong> Fabriekskwalificatie in Indiase industriële hubs via vergelijkende RFQ\'s en defectaudits, wat <strong>15% tot 30% margewinst</strong> opleverde.',
    role1Bullet5: '<strong>Handelsgovernance & Mijlpaalcontracten:</strong> Ontwerp van inkoopovereenkomsten met betaling op basis van mijlpalen (<strong>30% proforma voorschot / 70% tegen gecertificeerde PSI-inspectie en originele Bill of Lading</strong>), ter bescherming van werkkapitaal.',
    pillar2Title: 'Pijler 2: Eigen CMMS-Architectuur, B2B-Websystemen & Automatisering',
    role1Bullet6: '<strong>Eigen CMMS & Medewerker-KPI-Scoring Engine:</strong> Ontwerp en full-stack ontwikkeling van een Computerized Maintenance Management System voor machinelifecycle, preventieve schema\'s en een <strong>geïntegreerde module voor KPI-prestatiebeoordeling</strong>.',
    role1Bullet7: '<strong>Transactionele B2B-Platformen & Cloud Architectuur:</strong> Bouw van beveiligde webapplicaties (Next.js, TypeScript, PostgreSQL, Tailwind) met RBAC-toegangsbeheer, geautomatiseerde offertes en betalingskoppeling.',
    role1Bullet8: '<strong>iPaaS Workflow Pijplijnen (Make, Zapier, Asana):</strong> Geautomatiseerde webhook-workflows tussen CRM, ERP en projecttools ter eliminatie van handmatige invoer en voor automatische dagelijkse managementrapportages.',
    footerText: 'Eduardo de Sousa · Executive CV (Operations, Management, Digital & Remote)',
    page1Of2: 'Pagina 1 van 2',
    page2Of2: 'Pagina 2 van 2',
    expContTitle: 'Professionele Ervaring (Vervolg)',
    expContSubtitle: 'High-Tech Semiconductor Cleanrooms & Automotive OEM',
    role2Title: 'Operations Proces-, Kwaliteits- & Dataspecialist · HQ Pack',
    role2Date: '06/2025 – 07/2026',
    role2Scope: 'Eindhoven, Nederland (Brainport High-Tech Ecosysteem)',
    role2Sub: 'Semiconductor Lithografie Verpakking (ASML Specificaties)',
    role2Bullet1: '<strong>Cleanroom Datagovernance in ERP ISAH:</strong> Beheer van digitale diagnostische logboeken, routekaarten en stuklijsten (BOM) voor meer dan 150 maandelijkse modules voor lithografiesystemen (ASML, Zeiss, Boeing).',
    role2Bullet2: '<strong>-30% Doorlooptijdverkorting via DMAIC:</strong> Ontwerp van standaard werkinstructies (SOP\'s), ergonomische werkplekherinrichting en 5S-methodiek, wat leidde tot <strong>30% kortere doorlooptijden</strong>.',
    role2Bullet3: '<strong>-22% Vermindering van Terugkerende Fouten:</strong> Leiding van multidisciplinair oorzakenonderzoek (RCA, 5 Whys, Ishikawa) en CAPA/FMEA-beheersmaatregelen onder strikte <strong>ISO Klasse 5 cleanroomnormen</strong> (0 kritieke afwijkingen bij TÜV Rheinland-audit).',
    role3Title: 'Kwaliteits-, Proces- & Data-Analytics Specialist · VDL Nedcar',
    role3Date: '04/2022 – 05/2025',
    role3Scope: 'Born, Nederland · Automotive OEM Productie',
    role3Sub: 'BMW Group / MINI Cooper Platformen',
    role3Bullet1: '<strong>High-Volume Statistische Procesbeheersing (SPC):</strong> Bewaking van assemblageconformiteit bij een cadans van <strong>110–120 voertuigen per ploeg</strong> met koppeltelemetrie en optische meetsystemen.',
    role3Bullet2: '<strong>-15% Reductie van Systemische Assemblagefouten:</strong> Leiding over multidisciplinaire 8D-teams en procesbekwaamheidsstudies (Cp/Cpk), resulterend in <strong>15% minder lijndeviaties</strong> met 100% auditconformiteit.',
    priorTrackTitle: 'Eerdere Loopbaan in Operations & Toeleveringsketen',
    priorRole1: 'Logistiek Coördinator',
    priorRole1Company: 'Arkcohogar · 2020–2022 | Spanje',
    priorRole1Text: 'Voorraadbeheer van meerdere magazijnen, cyclische tellingen met <strong>99,5% voorraadnauwkeurigheid</strong>, ERP-reconciliatie en transportplanning.',
    priorRole2: 'Operations Supervisor',
    priorRole2Company: "Ed's Paixão · 2018–2020 | Portugal",
    priorRole2Text: 'Ploegrendement, meerstapsinkoop, afvalreductie, strikte HACCP-naleving en aansturing van interculturele teams.',
    priorRole3: 'Commercieel & Sourcing Specialist',
    priorRole3Company: 'E-Ceramic · 2013–2018 | Venezuela',
    priorRole3Text: 'Kostenraming van industriële afwerkingsmaterialen, directe fabrieksorders, zeevrachtberekeningen en B2B-klantbeheer.',
    eduTitle: 'Opleiding & Gecertificeerde Kwalificaties',
    eduSubtitle: 'Academische Titels & Internationale Certificaten',
    degreeTitle: 'Bachelor in Operationeel & Bedrijfsmatig Management',
    degreeInst: 'Hoger Universitair Onderwijs · Integraal Operationeel Leiderschap, Supply Chain Modellering & Procesengineering',
    officialDegreeBadge: 'Officieel Diploma',
    cert1Title: 'Lean Six Sigma Black Belt (DMAIC)',
    cert1Verify: 'Verifieer Certificaat ↗',
    cert1Desc: 'Internationale Certificering in Operational Excellence · Statistische Variatiereductie, DOE, SPC & Kaizen.',
    cert2Title: 'ISO 9001:2015 Lead Kwaliteitsauditor',
    cert2Badge: 'Gecertificeerd Auditor',
    cert2Desc: 'Quality Management Certification Board · Auditplanning, risicogebaseerd denken en CAPA-opvolging.',
    cert3Title: 'Google Data Analytics Professional',
    cert3Badge: 'Google / Coursera',
    cert3Desc: 'Dataverwerking, SQL-queries, statistische spreadsheets en visualisaties voor feitelijke besluitvorming.',
    cert4Title: 'VCA VOL Veiligheid & Leiderschap',
    cert4Badge: 'Nederlands Register',
    cert4Desc: 'Officiële Nederlandse veiligheidskwalificatie voor operationeel leidinggevenden in risicovolle fabrieken en cleanrooms.',
    specializationsText: 'Specialisaties: Strategisch Supply Chain Management (LMU München) · Communicatiewetenschappen (Erasmus Universiteit Rotterdam)',
    infraTitle: 'Remote Infrastructuur & Digitale Toolstack',
    infraSubtitle: 'Tools, Samenwerking & Gedistribueerde Systemen',
    infraCol1Title: 'Ontwikkelaars- & Cloudstack',
    infraCol1Text: 'Git, GitHub Actions, Linux CLI, Docker, Vercel, Node.js, Next.js, TypeScript, RESTful API\'s, Webhook-koppelingen, Agentic AI.',
    infraCol2Title: 'Automatisering & iPaaS Stack',
    infraCol2Text: 'Make (Integromat), Zapier, Asana API, Webhook Datapijplijnen, ERP ISAH, SAP GUI Concepten, PostgreSQL, Airtable, Minitab.',
    infraCol3Title: 'Remote Teamleiderschap',
    infraCol3Text: 'Asynchrone documentatie, inspectieteams ter plaatse (China & India), tijdzonecoördinatie (CET & EST), Jira / Notion.',
    langTitle: 'Talen & Beschikbaarheid',
    langSubtitle: 'Internationale Zakelijke Communicatie',
    trilingualLabel: 'Drietalig Vloeiend:',
    lang1: 'Engels', lang1Level: '(C1 - Vloeiend Professioneel)',
    lang2: 'Spaans', lang2Level: '(Moedertaal)',
    lang3: 'Portugees', lang3Level: '(C1 - Vloeiend Professioneel)',
    authLabel: 'Werkvergunning:',
    authStatus: 'EU-Burger (Geen visum vereist)'
  },
  pt: {
    lang: 'pt',
    title: 'Eduardo de Sousa - Currículo Executivo | Operações, Gestão e Digital',
    subTitle: 'DIRETOR DE OPERAÇÕES DIGITAIS, SISTEMAS DE QUALIDADE E SOURCING GLOBAL',
    certBadges: 'Lean Six Sigma Black Belt (DMAIC) · Auditor Líder ISO 9001:2015 · Arquiteto de Software CMMS',
    location: 'Valência, Espanha (100% Remoto / Mobilidade Global)',
    livePortfolio: 'Portfólio Web ↗',
    execSummaryTitle: 'Resumo Executivo',
    execSummarySubtitle: 'Operações · Arquitetura Digital · Liderança Global',
    execSummaryText: 'Líder multidisciplinar de <strong>Operações, Transformação Digital e Qualidade</strong> com certificação <strong>Lean Six Sigma Black Belt</strong> e mais de 10 anos de experiência comprovada em <strong>compras globais, fabricação de semicondutores em salas limpas, montagem automotiva OEM e engenharia de software empresarial</strong>. Especialista na gestão de contas internacionais de compras (<strong class="text-slate-900">portfólio de $800.000 USD/ano, 20 contentores marítimos/trimestre</strong>), alcançando <strong>até 75% de redução de custos diretos</strong> na China e Índia através de desintermediação direta de fábrica enquanto <strong>recruta, avalia e lidera remotamente equipas técnicas de inspeção no local</strong>. Arquiteto concorrente de plataformas <strong>CMMS proprietárias com pontuação automatizada de KPI de produtividade</strong>, portais web B2B e pipelines iPaaS baseados em eventos. Liderança remota comprovada aliando rigorosa governança de dados à eliminação quantitativa de defeitos. Trilingue: <strong>Inglês (C1 - Profissional Completo)</strong>, <strong>Espanhol (Nativo)</strong> e <strong>Português (C1 - Profissional Completo)</strong>.',
    matrixTitle: 'Competências Principais e Stack Tecnológico',
    matrixSubtitle: 'Matriz Multidisciplinar de Palavras-Chave ATS',
    col1Title: 'Liderança de Operações e Qualidade',
    col1Text: 'Lean Six Sigma Black Belt (DMAIC), Análise de Causa Raiz (RCA, 5 Porquês), Resolução 8D, FMEA / PFMEA, Governança CAPA, Controlo Estatístico de Processos (SPC, Cp/Cpk), Kaizen Blitz, Poka-Yoke, Auditorias ISO 9001:2015, Normas TÜV.',
    col2Title: 'Arquitetura de Software e Digital',
    col2Text: 'Next.js, React, TypeScript, Node.js, Python, Tailwind CSS, PostgreSQL, APIs REST, Webhooks, Git/GitHub, Fluxos de IA Agêntica, Arquitetura CMMS, Motores de Pontuação KPI de Produtividade, Portais Web B2B.',
    col3Title: 'Sourcing Global e Cadeia de Abastecimento',
    col3Text: 'Sourcing Direto de Fábrica (China/Índia), Desintermediação (-75% custos), Equipas de Qualidade no Local (CLI/PSI), Incoterms (FOB/CIF), Contratos por Marcos 30/70, Modelação TCO, Inventário WMS (99.5% precisão).',
    col4Title: 'Automação, ERP e Telemetria',
    col4Text: 'iPaaS (Make / Zapier / Asana), Governança de Dados ERP ISAH, Conceitos SAP, Google Data Analytics (SQL, Dashboards), Telemetria Quantitativa, Controlo de Turno de Alto Volume (120 unidades/turno).',
    expTitle: 'Experiência Profissional',
    expSubtitle: 'Liderança Comprovada e ROI Mensurável',
    role1Title: 'Consultor Independente — Operações Digitais, Sourcing Global e Arquitetura de Software',
    role1Date: '11/2024 – Presente',
    role1Scope: 'Operações Globais Remotas · Gestão de Portfólios na Ásia, Europa e Américas',
    role1Autonomy: '100% Autonomia Remota',
    pillar1Title: 'Pilar 1: Sourcing Estratégico Global e Liderança de Equipas Remotas',
    role1Bullet1: '<strong>Portfólio de $800K USD/Ano e 20 Contentores/Trimestre:</strong> Gestão integral de compras internacionais para conta corporativa de construção e arquitetura, coordenando fluxo marítimo contínuo de 20 contentores por trimestre ($200.000 USD/trimestre).',
    role1Bullet2: '<strong>Desintermediação Direta com Fábricas (-75% Custo de Aquisição):</strong> Reestruturação do modelo de aprovisionamento, eliminando intermediários comerciais e contratando diretamente fábricas na China, com <strong>75% de poupança líquida unitária</strong>.',
    role1Bullet3: '<strong>Recrutamento e Gestão Remota de Equipas Técnicas (China e Índia):</strong> Seleção remota, avaliação técnica e coordenação de inspetores de qualidade no local e engenheiros na China e Índia para inspeções de carregamento (CLI) e pré-embarque (PSI).',
    role1Bullet4: '<strong>Benchmarking Estratégico na Índia (Ganhos de Margem de 15% a 30%):</strong> Qualificação de fábricas em polos industriais indianos com RFQs multi-fornecedor e auditorias de defeitos, garantindo <strong>15% a 30% de melhoria de margem</strong>.',
    role1Bullet5: '<strong>Governança de Comércio Internacional e Contratos por Marcos:</strong> Negociação de acordos com pagamentos faseados (<strong>30% adiantamento proforma / 70% contra inspeção PSI certificada e Conhecimento de Embarque original B/L</strong>), protegendo o fundo de maneio.',
    pillar2Title: 'Pilar 2: Arquitetura CMMS Proprietária, Sistemas Web B2B e Automação',
    role1Bullet6: '<strong>CMMS Proprietário e Motor de Pontuação KPI de Colaboradores:</strong> Arquitetura e desenvolvimento full-stack de Sistema de Gestão de Manutenção Computorizada para acompanhamento de maquinário, planos preventivos e <strong>módulo integrado de avaliação KPI de desempenho</strong>.',
    role1Bullet7: '<strong>Plataformas Transacionais B2B e Arquitetura Cloud:</strong> Desenvolvimento de aplicações web seguras (Next.js, TypeScript, PostgreSQL, Tailwind) com controlo de acessos RBAC, orçamentação automática e integração de gateways de pagamento.',
    role1Bullet8: '<strong>Pipelines de Automação iPaaS (Make, Zapier, Asana):</strong> Criação de fluxos automáticos baseados em webhooks integrando CRM, ERP e ferramentas de projeto, eliminando processos manuais e gerando relatórios diários.',
    footerText: 'Eduardo de Sousa · Currículo Executivo (Operações, Gestão, Digital e Remoto)',
    page1Of2: 'Página 1 de 2',
    page2Of2: 'Página 2 de 2',
    expContTitle: 'Experiência Profissional (Continuação)',
    expContSubtitle: 'Salas Limpas de Semicondutores de Alta Tecnologia e Automóvel OEM',
    role2Title: 'Especialista em Processos Operacionais, Qualidade e Dados · HQ Pack',
    role2Date: '06/2025 – 07/2026',
    role2Scope: 'Eindhoven, Países Baixos (Ecossistema Tecnológico de Brainport)',
    role2Sub: 'Embalamento para Litografia de Semicondutores (Especificações ASML)',
    role2Bullet1: '<strong>Governança de Dados de Sala Limpa em ERP ISAH:</strong> Gestão de registos de diagnóstico digital, folhas de rota e rastreabilidade de listas de materiais (BOM) em mais de 150 módulos mensais (ASML, Zeiss, Boeing).',
    role2Bullet2: '<strong>-30% no Tempo de Ciclo via DMAIC:</strong> Definição de procedimentos padrão (SOPs), redesenho ergonómico de postos e metodologia 5S, <strong>reduzindo tempos médios de ciclo em 30%</strong>.',
    role2Bullet3: '<strong>-22% na Eliminação de Defeitos Recorrentes:</strong> Liderança de investigações de causa raiz (RCA, 5 Porquês, Ishikawa) e controlos CAPA/FMEA sob estritas <strong>normas de Sala Limpa ISO Classe 5</strong> (0 não conformidades críticas em auditoria TÜV Rheinland).',
    role3Title: 'Especialista em Qualidade, Processos e Análise de Dados · VDL Nedcar',
    role3Date: '04/2022 – 05/2025',
    role3Scope: 'Born, Países Baixos · Fabrico Automóvel OEM',
    role3Sub: 'Plataformas BMW Group / MINI Cooper',
    role3Bullet1: '<strong>Controlo Estatístico de Processos (SPC) em Alto Volume:</strong> Monitorização da conformidade de montagem a uma cadência de <strong>110–120 veículos por turno</strong> através de telemetria de binário e sensores óticos.',
    role3Bullet2: '<strong>-15% na Redução de Defeitos Sistémicos de Montagem:</strong> Coordenação de equipas 8D e estudos de capacidade (Cp/Cpk), alcançando uma <strong>redução de 15% nas variações de linha</strong> com 100% de conformidade em auditoria.',
    priorTrackTitle: 'Trajetória Anterior em Operações e Cadeia de Abastecimento',
    priorRole1: 'Coordenador de Logística',
    priorRole1Company: 'Arkcohogar · 2020–2022 | Espanha',
    priorRole1Text: 'Supervisão de inventário multi-armazém, contagens cíclicas mantendo <strong>99.5% de precisão de stock</strong>, reconciliação ERP e rotas de expedição.',
    priorRole2: 'Supervisor de Operações',
    priorRole2Company: "Ed's Paixão · 2018–2020 | Portugal",
    priorRole2Text: 'Desempenho operacional de turno, compras multinível, minimização de desperdício, cumprimento rigoroso de HACCP e liderança de equipas multiculturais.',
    priorRole3: 'Especialista Comercial e de Fornecimento',
    priorRole3Company: 'E-Ceramic · 2013–2018 | Venezuela',
    priorRole3Text: 'Estimativa de custos de materiais industriais, encomendas diretas de fábrica, cubicagem de frete marítimo e gestão de relações B2B.',
    eduTitle: 'Educação e Qualificações Certificadas',
    eduSubtitle: 'Graus Académicos e Credenciais Internacionais',
    degreeTitle: 'Licenciatura em Operações e Processos de Gestão',
    degreeInst: 'Ensino Superior Universitário · Liderança Operacional Integral, Modelação de Cadeia de Abastecimento e Engenharia de Processos',
    officialDegreeBadge: 'Grau Oficial',
    cert1Title: 'Lean Six Sigma Black Belt (DMAIC)',
    cert1Verify: 'Verificar Credencial ↗',
    cert1Desc: 'Certificação Internacional em Excelência Operacional · Redução Estatística de Variação, DOE, SPC e Execução Kaizen.',
    cert2Title: 'Auditor Líder de Sistemas de Qualidade ISO 9001:2015',
    cert2Badge: 'Auditor Certificado',
    cert2Desc: 'Quality Management Certification Board · Planeamento formal, auditorias, pensamento baseado em risco e acompanhamento CAPA.',
    cert3Title: 'Google Data Analytics Professional',
    cert3Badge: 'Google / Coursera',
    cert3Desc: 'Tratamento de dados, consultas SQL, análise estatística e visualização executiva para tomadas de decisão baseadas em evidências.',
    cert4Title: 'Segurança Industrial e Liderança VCA VOL',
    cert4Badge: 'Registo Holandês',
    cert4Desc: 'Acreditação oficial de segurança holandesa para líderes operacionais em fábricas e salas limpas de alto risco.',
    specializationsText: 'Especializações: Gestão Estratégica da Cadeia de Abastecimento (LMU Munique) · Ciências da Comunicação (Universidade Erasmus de Roterdão)',
    infraTitle: 'Infraestrutura Remota e Ferramentas Digitais',
    infraSubtitle: 'Ferramentas, Trabalho Colaborativo e Sistemas Distribuídos',
    infraCol1Title: 'Stack de Desenvolvimento e Cloud',
    infraCol1Text: 'Git, GitHub Actions, Linux CLI, Docker, Vercel, Node.js, Next.js, TypeScript, APIs RESTful, Integrações Webhook, IA Agêntica.',
    infraCol2Title: 'Automação e Stack iPaaS',
    infraCol2Text: 'Make (Integromat), Zapier, Asana API, Pipelines Webhook, ERP ISAH, Conceitos SAP GUI, PostgreSQL, Airtable, Minitab.',
    infraCol3Title: 'Liderança de Equipas Remotas',
    infraCol3Text: 'Documentação assíncrona, equipas de inspeção no local (China e Índia), coordenação multi-fuso horário (CET e EST), Jira / Notion.',
    langTitle: 'Idiomas e Disponibilidade',
    langSubtitle: 'Comunicação Executiva Internacional',
    trilingualLabel: 'Fluência Trilingue:',
    lang1: 'Inglês', lang1Level: '(C1 - Profissional Completo)',
    lang2: 'Espanhol', lang2Level: '(Nativo)',
    lang3: 'Português', lang3Level: '(C1 - Profissional Completo)',
    authLabel: 'Autorização de Trabalho:',
    authStatus: 'Cidadão da União Europeia (Sem Necessidade de Visto)'
  }
};

function generateHtml(d) {
  return `<!DOCTYPE html>
<html lang="${d.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${d.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
        }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .page {
            width: 210mm;
            height: 297mm;
            margin: 15px auto;
            background: #ffffff;
            padding: 12mm 15mm 10mm 15mm;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1.5px solid #0284c7;
            padding-bottom: 2.5px;
            margin-top: 10px;
            margin-bottom: 7px;
        }

        .section-header h2 {
            font-size: 10.5px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #0f172a;
        }

        .section-header span {
            font-family: 'JetBrains Mono', monospace;
            font-size: 8px;
            font-weight: 600;
            color: #0369a1;
            text-transform: uppercase;
        }

        @page {
            size: A4;
            margin: 0;
        }

        @media print {
            body { background: white; margin: 0; padding: 0 !important; }
            .page {
                width: 210mm;
                height: 297mm;
                margin: 0;
                padding: 12mm 15mm 10mm 15mm;
                box-shadow: none;
                page-break-after: always;
                break-after: page;
            }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body class="py-4">

    <!-- PAGE 1 -->
    <div class="page">
        <div>
            <!-- HEADER -->
            <header class="border-b border-slate-200 pb-2.5 mb-2">
                <div class="flex justify-between items-start">
                    <div>
                        <h1 class="text-2xl font-black tracking-tight text-slate-900 uppercase">
                            Eduardo <span class="text-cyan-700">de Sousa</span>
                        </h1>
                        <p class="text-[11px] font-mono font-bold text-cyan-800 tracking-wide uppercase mt-0.5">
                            ${d.subTitle}
                        </p>
                        <p class="text-[9.5px] text-slate-600 font-medium mt-0.5">
                            ${d.certBadges}
                        </p>
                    </div>
                    <div class="text-right text-[9px] font-mono text-slate-600 space-y-0.5">
                        <div class="font-semibold text-slate-800">${d.location}</div>
                        <div><a href="mailto:desousaejai@gmail.com" class="text-cyan-700 hover:underline">desousaejai@gmail.com</a> · +34 661 440 045</div>
                        <div class="flex justify-end gap-2 text-cyan-800 font-semibold pt-0.5">
                            <a href="https://www.linkedin.com/in/eduardo-desousa/" target="_blank" class="hover:underline">LinkedIn ↗</a> ·
                            <a href="https://github.com/apollos-mint" target="_blank" class="hover:underline">GitHub ↗</a> ·
                            <a href="https://eduardodesousa.vercel.app" target="_blank" class="hover:underline font-bold text-cyan-900">${d.livePortfolio}</a>
                        </div>
                    </div>
                </div>
            </header>

            <!-- EXECUTIVE SUMMARY -->
            <section>
                <div class="section-header">
                    <h2>${d.execSummaryTitle}</h2>
                    <span>${d.execSummarySubtitle}</span>
                </div>
                <p class="text-[10px] leading-relaxed text-slate-700 text-justify">
                    ${d.execSummaryText}
                </p>
            </section>

            <!-- CORE COMPETENCIES & TECHNICAL MATRIX -->
            <section class="mt-1.5">
                <div class="section-header">
                    <h2>${d.matrixTitle}</h2>
                    <span>${d.matrixSubtitle}</span>
                </div>
                <div class="grid grid-cols-2 gap-x-3.5 gap-y-1.5 text-[9px] text-slate-700">
                    <div class="p-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
                        <span class="font-bold text-slate-900 font-mono text-[8.5px] uppercase tracking-wider block text-cyan-900">${d.col1Title}</span>
                        <p class="mt-0.5 leading-snug">${d.col1Text}</p>
                    </div>
                    <div class="p-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
                        <span class="font-bold text-slate-900 font-mono text-[8.5px] uppercase tracking-wider block text-cyan-900">${d.col2Title}</span>
                        <p class="mt-0.5 leading-snug">${d.col2Text}</p>
                    </div>
                    <div class="p-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
                        <span class="font-bold text-slate-900 font-mono text-[8.5px] uppercase tracking-wider block text-cyan-900">${d.col3Title}</span>
                        <p class="mt-0.5 leading-snug">${d.col3Text}</p>
                    </div>
                    <div class="p-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
                        <span class="font-bold text-slate-900 font-mono text-[8.5px] uppercase tracking-wider block text-cyan-900">${d.col4Title}</span>
                        <p class="mt-0.5 leading-snug">${d.col4Text}</p>
                    </div>
                </div>
            </section>

            <!-- PROFESSIONAL EXPERIENCE - ROLE 1 -->
            <section class="mt-2">
                <div class="section-header">
                    <h2>${d.expTitle}</h2>
                    <span>${d.expSubtitle}</span>
                </div>

                <!-- ROLE 1: INDEPENDENT CONSULTANT -->
                <div class="mb-1">
                    <div class="flex justify-between items-baseline">
                        <h3 class="text-[11px] font-bold text-slate-900">
                            ${d.role1Title}
                        </h3>
                        <span class="text-[8.5px] font-mono bg-cyan-50 text-cyan-800 border border-cyan-300 px-1.5 py-0.5 rounded font-bold">${d.role1Date}</span>
                    </div>
                    <div class="flex items-center justify-between text-[9px] font-mono text-cyan-700 font-semibold mb-1">
                        <span>${d.role1Scope}</span>
                        <span class="text-slate-500 font-normal">${d.role1Autonomy}</span>
                    </div>

                    <div class="space-y-1 text-[9.5px] text-slate-700 pl-0.5">
                        <p class="text-[8.5px] font-bold font-mono text-cyan-900 uppercase tracking-wider mt-0.5">${d.pillar1Title}</p>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role1Bullet1}</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role1Bullet2}</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role1Bullet3}</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role1Bullet4}</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role1Bullet5}</p>
                        </div>

                        <p class="text-[8.5px] font-bold font-mono text-cyan-900 uppercase tracking-wider mt-1">${d.pillar2Title}</p>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role1Bullet6}</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role1Bullet7}</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role1Bullet8}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Footer Page 1 -->
        <footer class="pt-2 border-t border-slate-200 flex justify-between items-center text-[8px] font-mono text-slate-400">
            <span>${d.footerText}</span>
            <span>${d.page1Of2}</span>
        </footer>
    </div>

    <!-- PAGE 2 -->
    <div class="page">
        <div>
            <!-- PROFESSIONAL EXPERIENCE (CONTINUED) -->
            <section>
                <div class="section-header mt-0">
                    <h2>${d.expContTitle}</h2>
                    <span>${d.expContSubtitle}</span>
                </div>

                <!-- ROLE 2: HQ PACK -->
                <div class="mb-2.5">
                    <div class="flex justify-between items-baseline">
                        <h3 class="text-[11px] font-bold text-slate-900">
                            ${d.role2Title}
                        </h3>
                        <span class="text-[8.5px] font-mono bg-slate-100 text-slate-700 border border-slate-300 px-1.5 py-0.5 rounded font-bold">${d.role2Date}</span>
                    </div>
                    <div class="flex items-center justify-between text-[9px] font-mono text-cyan-700 font-semibold mb-1">
                        <span>${d.role2Scope}</span>
                        <span class="text-slate-500 font-normal">${d.role2Sub}</span>
                    </div>

                    <div class="space-y-1 text-[9.5px] text-slate-700 pl-0.5">
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role2Bullet1}</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role2Bullet2}</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role2Bullet3}</p>
                        </div>
                    </div>
                </div>

                <!-- ROLE 3: VDL NEDCAR -->
                <div class="mb-2.5">
                    <div class="flex justify-between items-baseline">
                        <h3 class="text-[11px] font-bold text-slate-900">
                            ${d.role3Title}
                        </h3>
                        <span class="text-[8.5px] font-mono bg-slate-100 text-slate-700 border border-slate-300 px-1.5 py-0.5 rounded font-bold">${d.role3Date}</span>
                    </div>
                    <div class="flex items-center justify-between text-[9px] font-mono text-cyan-700 font-semibold mb-1">
                        <span>${d.role3Scope}</span>
                        <span class="text-slate-500 font-normal">${d.role3Sub}</span>
                    </div>

                    <div class="space-y-1 text-[9.5px] text-slate-700 pl-0.5">
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role3Bullet1}</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-cyan-700 font-bold">▪</span>
                            <p>${d.role3Bullet2}</p>
                        </div>
                    </div>
                </div>

                <!-- PRIOR OPERATIONAL TRACK RECORD -->
                <div class="border-t border-slate-200 pt-1.5 mb-1.5">
                    <h4 class="text-[8.5px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-1">${d.priorTrackTitle}</h4>
                    <div class="grid grid-cols-3 gap-2 text-[9px]">
                        <div class="p-1.5 rounded-lg bg-slate-50 border border-slate-200/70">
                            <div class="font-bold text-slate-900 text-[9px]">${d.priorRole1}</div>
                            <div class="text-[8px] font-mono text-cyan-700 font-semibold">${d.priorRole1Company}</div>
                            <p class="text-slate-600 mt-0.5 leading-snug">${d.priorRole1Text}</p>
                        </div>
                        <div class="p-1.5 rounded-lg bg-slate-50 border border-slate-200/70">
                            <div class="font-bold text-slate-900 text-[9px]">${d.priorRole2}</div>
                            <div class="text-[8px] font-mono text-cyan-700 font-semibold">${d.priorRole2Company}</div>
                            <p class="text-slate-600 mt-0.5 leading-snug">${d.priorRole2Text}</p>
                        </div>
                        <div class="p-1.5 rounded-lg bg-slate-50 border border-slate-200/70">
                            <div class="font-bold text-slate-900 text-[9px]">${d.priorRole3}</div>
                            <div class="text-[8px] font-mono text-cyan-700 font-semibold">${d.priorRole3Company}</div>
                            <p class="text-slate-600 mt-0.5 leading-snug">${d.priorRole3Text}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- EDUCATION & VERIFIED ACCREDITATIONS -->
            <section class="mt-2">
                <div class="section-header">
                    <h2>${d.eduTitle}</h2>
                    <span>${d.eduSubtitle}</span>
                </div>

                <div class="space-y-1.5 text-[9.5px] text-slate-700">
                    <div class="flex justify-between items-baseline p-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
                        <div>
                            <span class="font-bold text-slate-900 text-[10px]">${d.degreeTitle}</span>
                            <span class="text-slate-500 font-mono text-[8.5px] block">${d.degreeInst}</span>
                        </div>
                        <span class="text-[8.5px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 rounded shrink-0">${d.officialDegreeBadge}</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-0.5">
                        <div class="p-1.5 rounded-lg border border-cyan-200 bg-cyan-50/50">
                            <div class="flex items-center justify-between">
                                <strong class="text-slate-900 text-[9.5px]">${d.cert1Title}</strong>
                                <a href="https://www.virtualbadge.io/certificate-validator?credential=71751263-69e6-4298-b264-074f1e6fb9e6" target="_blank" class="text-[8px] font-mono text-cyan-800 font-bold underline">${d.cert1Verify}</a>
                            </div>
                            <p class="text-[8px] text-slate-600 mt-0.5">${d.cert1Desc}</p>
                        </div>

                        <div class="p-1.5 rounded-lg border border-slate-200 bg-slate-50">
                            <div class="flex items-center justify-between">
                                <strong class="text-slate-900 text-[9.5px]">${d.cert2Title}</strong>
                                <span class="text-[8px] font-mono text-slate-600 font-bold">${d.cert2Badge}</span>
                            </div>
                            <p class="text-[8px] text-slate-600 mt-0.5">${d.cert2Desc}</p>
                        </div>

                        <div class="p-1.5 rounded-lg border border-slate-200 bg-slate-50">
                            <div class="flex items-center justify-between">
                                <strong class="text-slate-900 text-[9.5px]">${d.cert3Title}</strong>
                                <span class="text-[8px] font-mono text-slate-600 font-bold">${d.cert3Badge}</span>
                            </div>
                            <p class="text-[8px] text-slate-600 mt-0.5">${d.cert3Desc}</p>
                        </div>

                        <div class="p-1.5 rounded-lg border border-slate-200 bg-slate-50">
                            <div class="flex items-center justify-between">
                                <strong class="text-slate-900 text-[9.5px]">${d.cert4Title}</strong>
                                <span class="text-[8px] font-mono text-slate-600 font-bold">${d.cert4Badge}</span>
                            </div>
                            <p class="text-[8px] text-slate-600 mt-0.5">${d.cert4Desc}</p>
                        </div>
                    </div>

                    <div class="text-[8.5px] font-mono text-slate-500 pt-0.5 flex items-center justify-between border-t border-slate-100">
                        <span>${d.specializationsText}</span>
                    </div>
                </div>
            </section>

            <!-- REMOTE OPERATIONS & DIGITAL COLLABORATION STACK -->
            <section class="mt-2">
                <div class="section-header">
                    <h2>${d.infraTitle}</h2>
                    <span>${d.infraSubtitle}</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-[8.5px] text-slate-700">
                    <div class="p-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
                        <span class="font-bold text-slate-900 font-mono text-[8px] uppercase tracking-wider block text-cyan-900">${d.infraCol1Title}</span>
                        <p class="mt-0.5 text-slate-600 leading-tight">${d.infraCol1Text}</p>
                    </div>
                    <div class="p-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
                        <span class="font-bold text-slate-900 font-mono text-[8px] uppercase tracking-wider block text-cyan-900">${d.infraCol2Title}</span>
                        <p class="mt-0.5 text-slate-600 leading-tight">${d.infraCol2Text}</p>
                    </div>
                    <div class="p-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
                        <span class="font-bold text-slate-900 font-mono text-[8px] uppercase tracking-wider block text-cyan-900">${d.infraCol3Title}</span>
                        <p class="mt-0.5 text-slate-600 leading-tight">${d.infraCol3Text}</p>
                    </div>
                </div>
            </section>

            <!-- LANGUAGES & GLOBAL REMOTE GOVERNANCE -->
            <section class="mt-2">
                <div class="section-header">
                    <h2>${d.langTitle}</h2>
                    <span>${d.langSubtitle}</span>
                </div>
                <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[9px] text-slate-700 font-mono">
                    <div>
                        <span class="font-bold text-slate-900">${d.trilingualLabel}</span>
                        <span class="ml-2 font-semibold text-cyan-900">${d.lang1}</span> ${d.lang1Level} · 
                        <span class="font-semibold text-cyan-900">${d.lang2}</span> ${d.lang2Level} · 
                        <span class="font-semibold text-cyan-900">${d.lang3}</span> ${d.lang3Level}
                    </div>
                    <div class="text-slate-500">
                        <span>${d.authLabel}</span> <strong class="text-slate-800">${d.authStatus}</strong>
                    </div>
                </div>
            </section>
        </div>

        <!-- Footer Page 2 -->
        <footer class="pt-2 border-t border-slate-200 flex justify-between items-center text-[8px] font-mono text-slate-400">
            <span>${d.footerText}</span>
            <span>${d.page2Of2}</span>
        </footer>
    </div>

</body>
</html>`;
}

// Generate HTML and PDF for each language
for (const [code, data] of Object.entries(languages)) {
  const html = generateHtml(data);
  const htmlPath = `resume_eduardo_de_sousa_${code}.html`;
  const pdfPath = `public/Eduardo_de_Sousa_Resume_${code}.pdf`;
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`Generated ${htmlPath}`);

  console.log(`Compiling ${pdfPath}...`);
  execSync(`chromium --headless --disable-gpu --no-sandbox --print-to-pdf="${pdfPath}" "${htmlPath}"`);
  console.log(`Done: ${pdfPath}`);
}

// Also update master defaults
fs.copyFileSync('public/Eduardo_de_Sousa_Resume_en.pdf', 'public/Eduardo_de_Sousa_Resume.pdf');
fs.copyFileSync('public/Eduardo_de_Sousa_Resume_en.pdf', 'public/cv_eduardo_de_sousa.pdf');
console.log('All resumes generated successfully!');
