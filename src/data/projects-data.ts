import { Locale } from '@/types';

export interface EngineeringProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  badgeVariant: 'primary' | 'emerald' | 'amber' | 'cyan';
  metrics: string;
  description: string;
  highlights: string[];
  techStack: string[];
  demoUrl: string;
  sourceUrl: string;
  isPrototype?: boolean;
}

export interface ProjectsSectionContent {
  sectionTag: string;
  title: string;
  subtitle: string;
  liveDemoBtn: string;
  sourceCodeBtn: string;
  prototypeNotice: string;
  projects: EngineeringProjectItem[];
}

export const projectsDataByLocale: Record<Locale, ProjectsSectionContent> = {
  en: {
    sectionTag: "Full-Stack Engineering & Automation Showcase",
    title: "Production Architecture & Operational Systems",
    subtitle: "End-to-end full-stack software and automation engineering proving technical depth beyond standard web portfolios. From industrial dual-database CMMS platforms to high-performance e-commerce engines.",
    liveDemoBtn: "Live Interactive Demo",
    sourceCodeBtn: "View Source Code",
    prototypeNotice: "Automation Proof-of-Concept",
    projects: [
      {
        id: "optiasset-cmms",
        title: "OptiAsset CMMS",
        subtitle: "Enterprise Asset Management & Industrial Reliability Architecture",
        category: "Industrial Operations & Enterprise Software",
        badge: "Production Architecture",
        badgeVariant: "primary",
        metrics: "34% Downtime Reduction | Dual DB (PostgreSQL + MSSQL)",
        description: "Industrial asset management platform engineered with Lean Six Sigma principles. Features heterogeneous dual-database synchronization with legacy ERP systems, mobile QR inspection checklists, and automated PDF maintenance work orders.",
        highlights: [
          "Dual-database bridge connecting PostgreSQL 15 and legacy on-premise MSSQL ERP",
          "Append-only immutable audit trail recording every state change and user signature",
          "Automated PDF work orders with frozen historic parts pricing and dynamic labor calculation",
          "Integrated in-memory sandbox engine for instant zero-cloud interactive demo exploration"
        ],
        techStack: ["React 18", "TypeScript", "Node.js", "Express", "PostgreSQL", "MSSQL ERP", "PDFKit", "Docker"],
        demoUrl: "https://optiasset-cmms.vercel.app",
        sourceUrl: "https://github.com/desousaejai/optiasset-cmms"
      },
      {
        id: "kyrios-keys-marketplace",
        title: "Kyrios Marketplace",
        subtitle: "Digital License Distribution Engine & Atomic Fulfillment Hub",
        category: "Full-Stack Web Development & Relational Data",
        badge: "Production Full-Stack",
        badgeVariant: "emerald",
        metrics: "Sub-50ms Edge Queries | Atomic Stock Transactions",
        description: "Full-stack digital commerce engine with Next.js App Router and Prisma ORM. Guarantees concurrency-safe license key fulfillment, loyalty tier spend tracking, and comprehensive admin catalog management.",
        highlights: [
          "Concurrency-safe atomic fulfillment preventing duplicate digital key allocations",
          "Serverless connection pooling with Neon PostgreSQL and PgBouncer",
          "NextAuth role-based access control distinguishing customer orders from admin stock manager",
          "Steam CDN asset pipeline for HD trailers, system specs, and game metadata"
        ],
        techStack: ["Next.js (App Router)", "TypeScript", "Prisma ORM", "PostgreSQL / Neon", "NextAuth", "Tailwind CSS"],
        demoUrl: "https://kyrios-keys-marketplace.vercel.app",
        sourceUrl: "https://github.com/desousaejai/kyrios-keys-marketplace"
      },
      {
        id: "doxa-saas-studio",
        title: "Doxa Studio",
        subtitle: "High-Conversion SaaS Platform & Interactive Simulation Engine",
        category: "UI/UX Architecture & Simulation Logic",
        badge: "Interactive SaaS",
        badgeVariant: "cyan",
        metrics: "CLS 0.00 | Real-time ROI Model | Zero-Config Fallback",
        description: "Digital product agency platform featuring a client-side simulated site generation engine, dynamic conversion ROI calculator, GPU-accelerated dark glassmorphism, and instant multi-language switching (EN/ES/PT).",
        highlights: [
          "Interactive website generation sandbox with zero-config local simulation fallback",
          "Dynamic ROI and conversion modeling sliders calculating real-time revenue uplift",
          "Framer Motion staggered physics animations with 0.00 cumulative layout shift",
          "Edge route handlers for rapid checkout intent and domain verification"
        ],
        techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "i18n Localization"],
        demoUrl: "https://doxa-saas-studio.vercel.app",
        sourceUrl: "https://github.com/desousaejai/doxa-saas-studio"
      },
      {
        id: "jobflow-automation-extension",
        title: "JobFlow Assistant",
        subtitle: "Autonomous Application Assistant (Manifest V3 Prototype)",
        category: "Browser Automation & Pragmatic Scripting",
        badge: "Automation Prototype",
        badgeVariant: "amber",
        metrics: "Fuzzy Form Classifier | 100% Local Privacy | Daily Rate Limit",
        description: "Browser automation prototype demonstrating Chrome Extension Manifest V3 engineering. Features multi-lingual heuristic form-field classification, employer deduplication in local storage, and humanized jitter submission delays.",
        highlights: [
          "Heuristic form-field analyzer mapping multi-lingual prompts to candidate experience matrices",
          "Persistent local deduplication preventing repeated submissions to identical employers",
          "Daily application rate-capping (20/day) with real-time visual progress counter",
          "Zero-server architecture guaranteeing candidate credentials never leave the browser"
        ],
        techStack: ["Chrome Extension MV3", "JavaScript ES2022", "DOM Automation", "Chrome Storage"],
        demoUrl: "https://github.com/desousaejai/jobflow-automation-extension#readme",
        sourceUrl: "https://github.com/desousaejai/jobflow-automation-extension",
        isPrototype: true
      }
    ]
  },
  es: {
    sectionTag: "Portfolio de Ingeniería Full-Stack y Automatización",
    title: "Arquitecturas en Producción y Sistemas Operativos",
    subtitle: "Desarrollo full-stack y sistemas de automatización que demuestran solidez técnica más allá de una web de currículum. Desde plataformas CMMS industriales con doble base de datos hasta motores de comercio electrónico de alto rendimiento.",
    liveDemoBtn: "Demo Interactiva en Vivo",
    sourceCodeBtn: "Ver Código Fuente",
    prototypeNotice: "Prototipo de Automatización",
    projects: [
      {
        id: "optiasset-cmms",
        title: "OptiAsset CMMS",
        subtitle: "Gestión de Activos Industriales y Mantenimiento Empresarial",
        category: "Operaciones Industriales y Software Empresarial",
        badge: "Arquitectura Producción",
        badgeVariant: "primary",
        metrics: "-34% Tiempos de Parada | Doble DB (PostgreSQL + MSSQL)",
        description: "Plataforma de gestión de mantenimiento industrial diseñada bajo metodologías Lean Six Sigma. Sincronización heterogénea con ERP legados, inspecciones técnicas móviles con firma digital y órdenes de trabajo en PDF automatizadas.",
        highlights: [
          "Puente heterogéneo conectando PostgreSQL 15 con base de datos MSSQL de ERP legado",
          "Registro de auditoría inmutable de solo inserción con firmas y estados UTC",
          "Órdenes de servicio en PDF con cálculo automático de horas de taller e insumos",
          "Motor simulador mock en memoria para exploración interactiva directa en Vercel"
        ],
        techStack: ["React 18", "TypeScript", "Node.js", "Express", "PostgreSQL", "MSSQL ERP", "PDFKit", "Docker"],
        demoUrl: "https://optiasset-cmms.vercel.app",
        sourceUrl: "https://github.com/desousaejai/optiasset-cmms"
      },
      {
        id: "kyrios-keys-marketplace",
        title: "Kyrios Marketplace",
        subtitle: "Motor de Distribución de Licencias Digitales y Stock Concurrente",
        category: "Desarrollo Full-Stack y Datos Relacionales",
        badge: "Full-Stack Producción",
        badgeVariant: "emerald",
        metrics: "Consultas Edge <50ms | Transacciones Atómicas",
        description: "Plataforma de comercio digital con Next.js App Router y Prisma ORM. Entrega atómica de claves digitales a prueba de concurrencia, sistema de créditos y panel administrativo de control de inventario.",
        highlights: [
          "Transacciones atómicas en base de datos para evitar duplicación de claves",
          "Pooling de conexiones serverless con Neon PostgreSQL y PgBouncer",
          "Control de acceso por roles con NextAuth distinguiendo clientes y administradores",
          "Canal de activos Steam CDN con trailers HD y especificaciones técnicas"
        ],
        techStack: ["Next.js (App Router)", "TypeScript", "Prisma ORM", "PostgreSQL / Neon", "NextAuth", "Tailwind CSS"],
        demoUrl: "https://kyrios-keys-marketplace.vercel.app",
        sourceUrl: "https://github.com/desousaejai/kyrios-keys-marketplace"
      },
      {
        id: "doxa-saas-studio",
        title: "Doxa Studio",
        subtitle: "Plataforma SaaS de Alta Conversión y Motor de Simulación",
        category: "Arquitectura UI/UX y Lógica de Negocio",
        badge: "SaaS Interactivo",
        badgeVariant: "cyan",
        metrics: "CLS 0.00 | Calculadora ROI en Tiempo Real | Modo Sandbox",
        description: "Estudio digital con simulador de generación de sitios en tiempo real, calculadora dinámica de ROI, diseño dark-glassmorphism con aceleración por hardware y soporte multi-idioma nativo (EN/ES/PT).",
        highlights: [
          "Simulador de generación web con fallback autónomo para modo offline",
          "Calculadora de retorno de inversión interactiva con cálculo de ingresos adicionales",
          "Animaciones fluidas con Framer Motion y cero cambios de diseño acumulados (CLS 0.00)",
          "Endpoints en el Edge para checkout y validación instantánea de dominios"
        ],
        techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "i18n Localization"],
        demoUrl: "https://doxa-saas-studio.vercel.app",
        sourceUrl: "https://github.com/desousaejai/doxa-saas-studio"
      },
      {
        id: "jobflow-automation-extension",
        title: "JobFlow Assistant",
        subtitle: "Asistente Autónomo de Solicitudes (Prototipo Manifest V3)",
        category: "Automatización de Navegador y Scripting Pragmático",
        badge: "Prototipo Demo",
        badgeVariant: "amber",
        metrics: "Clasificador Heurístico | 100% Privacidad Local | Límite Diario",
        description: "Prototipo de automatización web desarrollado bajo Chrome Extensions Manifest V3. Clasificación heurística de preguntas de selección, deduplicación local de empresas y retardos humanizados.",
        highlights: [
          "Analizador heurístico de campos bilingüe que mapea preguntas con años de experiencia",
          "Deduplicación persistente en almacenamiento local para evitar envíos repetidos",
          "Límite diario de seguridad (20 solicitudes/día) con contador visual en tiempo real",
          "Arquitectura con privacidad total: los datos personales nunca salen del navegador local"
        ],
        techStack: ["Chrome Extension MV3", "JavaScript ES2022", "DOM Automation", "Chrome Storage"],
        demoUrl: "https://github.com/desousaejai/jobflow-automation-extension#readme",
        sourceUrl: "https://github.com/desousaejai/jobflow-automation-extension",
        isPrototype: true
      }
    ]
  },
  pt: {
    sectionTag: "Portfólio de Engenharia Full-Stack e Automação",
    title: "Arquiteturas de Produção e Sistemas Operacionais",
    subtitle: "Sistemas full-stack e automação demonstrando profundidade técnica e impacto operacional real.",
    liveDemoBtn: "Demo Interativa ao Vivo",
    sourceCodeBtn: "Ver Código Fonte",
    prototypeNotice: "Protótipo de Automação",
    projects: [
      {
        id: "optiasset-cmms",
        title: "OptiAsset CMMS",
        subtitle: "Gestão de Ativos Industriais e Confiabilidade Operacional",
        category: "Operações Industriais e Software Corporativo",
        badge: "Arquitetura Produção",
        badgeVariant: "primary",
        metrics: "-34% Tempo de Parada | Dual DB (PostgreSQL + MSSQL)",
        description: "Plataforma de manutenção industrial projetada com princípios Lean Six Sigma. Integração com ERP legado, checklists móveis com assinatura digital e ordens de serviço automatizadas.",
        highlights: [
          "Ponte de banco de dados duplo conectando PostgreSQL e MSSQL legado",
          "Trilha de auditoria imutável com carimbo de data/hora UTC",
          "Ordens de serviço em PDF com cálculo dinâmico de horas e peças",
          "Simulador mock em memória para exploração interativa direta na Vercel"
        ],
        techStack: ["React 18", "TypeScript", "Node.js", "Express", "PostgreSQL", "MSSQL ERP", "PDFKit", "Docker"],
        demoUrl: "https://optiasset-cmms.vercel.app",
        sourceUrl: "https://github.com/desousaejai/optiasset-cmms"
      },
      {
        id: "kyrios-keys-marketplace",
        title: "Kyrios Marketplace",
        subtitle: "Motor de Distribuição de Licenças Digitais e Estoque Atômico",
        category: "Desenvolvimento Full-Stack e Dados Relacionais",
        badge: "Full-Stack Produção",
        badgeVariant: "emerald",
        metrics: "Consultas Edge <50ms | Transações Atômicas",
        description: "Plataforma de comércio digital com Next.js App Router e Prisma ORM. Entrega atômica de chaves digitais e controle de inventário.",
        highlights: [
          "Transações atômicas para entrega concorrente de chaves digitais",
          "Conexões serverless pooling com Neon PostgreSQL",
          "Controle de acesso por funções com NextAuth",
          "Integração com CDN Steam para trailers HD e especificações"
        ],
        techStack: ["Next.js (App Router)", "TypeScript", "Prisma ORM", "PostgreSQL / Neon", "NextAuth", "Tailwind CSS"],
        demoUrl: "https://kyrios-keys-marketplace.vercel.app",
        sourceUrl: "https://github.com/desousaejai/kyrios-keys-marketplace"
      },
      {
        id: "doxa-saas-studio",
        title: "Doxa Studio",
        subtitle: "Plataforma SaaS de Alta Conversão e Simulador Interativo",
        category: "Arquitetura UI/UX e Lógica de Negócios",
        badge: "SaaS Interativo",
        badgeVariant: "cyan",
        metrics: "CLS 0.00 | Calculadora ROI em Tempo Real",
        description: "Estúdio digital com simulação interativa de sites, calculadora dinâmica de ROI e design dark glassmorphism.",
        highlights: [
          "Sandbox de geração de sites com fallback determinístico local",
          "Calculadora interativa de ROI com projeção de receita adicional",
          "Animações Framer Motion fluidas com zero deslocamento de layout",
          "Rotas Edge prontas para checkout rápido e verificação de domínios"
        ],
        techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "i18n Localization"],
        demoUrl: "https://doxa-saas-studio.vercel.app",
        sourceUrl: "https://github.com/desousaejai/doxa-saas-studio"
      },
      {
        id: "jobflow-automation-extension",
        title: "JobFlow Assistant",
        subtitle: "Assistente de Candidaturas (Protótipo Manifest V3)",
        category: "Automação de Navegador e Scripting",
        badge: "Protótipo Demo",
        badgeVariant: "amber",
        metrics: "Classificador Heurístico | Privacidade Local | Limite Diário",
        description: "Protótipo de extensão Chrome Manifest V3 para automação de candidaturas com triagem heurística e controle de frequência.",
        highlights: [
          "Classificador de campos com correspondência heurística multilíngue",
          "Deduplicação local no navegador para evitar candidaturas repetidas",
          "Limite diário de 20 candidaturas com contador visual",
          "Zero servidores externos: credenciais e dados mantidos localmente"
        ],
        techStack: ["Chrome Extension MV3", "JavaScript ES2022", "DOM Automation", "Chrome Storage"],
        demoUrl: "https://github.com/desousaejai/jobflow-automation-extension#readme",
        sourceUrl: "https://github.com/desousaejai/jobflow-automation-extension",
        isPrototype: true
      }
    ]
  },
  de: {
    sectionTag: "Full-Stack Engineering & Automatisierungs-Showcase",
    title: "Produktionsarchitektur & Betriebssysteme",
    subtitle: "Enterprise-Full-Stack-Software und Automatisierungssysteme mit nachgewiesener technischer Tiefe und betrieblicher Wertschöpfung.",
    liveDemoBtn: "Interaktive Live-Demo",
    sourceCodeBtn: "Quellcode Anzeigen",
    prototypeNotice: "Automatisierungs-Prototyp",
    projects: [
      {
        id: "optiasset-cmms",
        title: "OptiAsset CMMS",
        subtitle: "Enterprise Asset Management & Industrielle Instandhaltung",
        category: "Industrielle Prozesse & Unternehmenssoftware",
        badge: "Produktionsarchitektur",
        badgeVariant: "primary",
        metrics: "-34% Stillstandszeiten | Dual DB (PostgreSQL + MSSQL)",
        description: "Industrielle Instandhaltungsplattform nach Lean-Six-Sigma-Prinzipien. Heterogene Dual-Database-Synchronisation mit Legacy-ERPs, mobile Checklisten mit digitaler Signatur und automatisierte PDF-Arbeitsaufträge.",
        highlights: [
          "Dual-Database-Bridge zwischen PostgreSQL 15 und Legacy-MSSQL-ERP",
          "Unveränderlicher Audit-Trail mit UTC-Zeitstempeln und Signaturen",
          "Automatisierte PDF-Wartungsberichte mit Material- und Arbeitskostenkalkulation",
          "Integrierte In-Memory-Mock-Engine für sofortige Vercel-Demonstration"
        ],
        techStack: ["React 18", "TypeScript", "Node.js", "Express", "PostgreSQL", "MSSQL ERP", "PDFKit", "Docker"],
        demoUrl: "https://optiasset-cmms.vercel.app",
        sourceUrl: "https://github.com/desousaejai/optiasset-cmms"
      },
      {
        id: "kyrios-keys-marketplace",
        title: "Kyrios Marketplace",
        subtitle: "Digitale Lizenzverteilung & Atomare Bestandsverwaltung",
        category: "Full-Stack-Webentwicklung & Relationale Datenbanken",
        badge: "Produktions-Full-Stack",
        badgeVariant: "emerald",
        metrics: "<50ms Edge-Abfragen | Atomare Transaktionen",
        description: "E-Commerce-Plattform mit Next.js App Router und Prisma ORM. Nebenläufigkeitssichere Lizenzauslieferung und administratives Dashboard.",
        highlights: [
          "Atomare Datenbanktransaktionen verhindern Mehrfachvergaben digitaler Schlüssel",
          "Serverless Connection Pooling mit Neon PostgreSQL und PgBouncer",
          "Rollenbasierte Zugriffskontrolle mit NextAuth",
          "Steam CDN Integration für hochauflösende Spieletrailer und Spezifikationen"
        ],
        techStack: ["Next.js (App Router)", "TypeScript", "Prisma ORM", "PostgreSQL / Neon", "NextAuth", "Tailwind CSS"],
        demoUrl: "https://kyrios-keys-marketplace.vercel.app",
        sourceUrl: "https://github.com/desousaejai/kyrios-keys-marketplace"
      },
      {
        id: "doxa-saas-studio",
        title: "Doxa Studio",
        subtitle: "High-Conversion SaaS-Plattform & Interaktiver Simulator",
        category: "UI/UX-Architektur & Simulationslogik",
        badge: "Interaktives SaaS",
        badgeVariant: "cyan",
        metrics: "CLS 0.00 | Echtzeit-ROI-Rechner | Sandbox-Modus",
        description: "Agenturplattform mit interaktivem Website-Generator, dynamischem ROI-Rechner, GPU-beschleunigtem Dark Glassmorphism und nativer Mehrsprachigkeit.",
        highlights: [
          "Website-Generator-Sandbox mit autonomem Offline-Fallback",
          "Interaktiver ROI-Rechner mit dynamischer Ertragsmodellierung",
          "Flüssige Framer-Motion-Physik mit 0.00 Cumulative Layout Shift",
          "Edge-optimierte Routen für Express-Checkout und Domain-Prüfung"
        ],
        techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "i18n Localization"],
        demoUrl: "https://doxa-saas-studio.vercel.app",
        sourceUrl: "https://github.com/desousaejai/doxa-saas-studio"
      },
      {
        id: "jobflow-automation-extension",
        title: "JobFlow Assistant",
        subtitle: "Autonomer Bewerbungs-Assistent (Manifest V3 Prototyp)",
        category: "Browser-Automatisierung & Scripting",
        badge: "Demo-Prototyp",
        badgeVariant: "amber",
        metrics: "Heuristischer Parser | 100% Lokale Privatsphäre | Tageslimit",
        description: "Automatisierungs-Prototyp auf Basis von Chrome Extension Manifest V3 mit heuristischer Formularerkennung und Duplikatschutz.",
        highlights: [
          "Mehrsprachige heuristische Analyse zur automatischen Feldzuordnung",
          "Lokale Deduplizierung verhindert doppelte Bewerbungen beim selben Arbeitgeber",
          "Sicherheits-Tageslimit (20/Tag) mit visueller Fortschrittsanzeige",
          "Vollständiger Datenschutz: Profildaten verbleiben lokal im Browser"
        ],
        techStack: ["Chrome Extension MV3", "JavaScript ES2022", "DOM Automation", "Chrome Storage"],
        demoUrl: "https://github.com/desousaejai/jobflow-automation-extension#readme",
        sourceUrl: "https://github.com/desousaejai/jobflow-automation-extension",
        isPrototype: true
      }
    ]
  },
  fr: {
    sectionTag: "Portfolio d'Ingénierie Full-Stack & Automatisation",
    title: "Architectures de Production & Systèmes Opérationnels",
    subtitle: "Systèmes full-stack et automatisations démontrant une réelle maîtrise technique et une rigueur opérationnelle.",
    liveDemoBtn: "Démo Interactive en Direct",
    sourceCodeBtn: "Voir le Code Source",
    prototypeNotice: "Prototype d'Automatisation",
    projects: [
      {
        id: "optiasset-cmms",
        title: "OptiAsset CMMS",
        subtitle: "Gestion d'Actifs Industriels & Maintenance d'Entreprise",
        category: "Opérations Industrielles & Logiciel d'Entreprise",
        badge: "Architecture Production",
        badgeVariant: "primary",
        metrics: "-34% Temps d'Arrêt | Double BD (PostgreSQL + MSSQL)",
        description: "Plateforme de maintenance industrielle selon les principes Lean Six Sigma. Synchronisation hétérogène avec les ERPs existants, fiches de contrôle mobiles et ordres de travail automatisés.",
        highlights: [
          "Pont de données reliant PostgreSQL 15 et le système MSSQL de l'ERP existant",
          "Piste d'audit immuable avec horodatage UTC et signatures",
          "Génération automatisée de rapports d'intervention PDF avec coûts des pièces",
          "Moteur mock en mémoire pour une démonstration interactive immédiate sur Vercel"
        ],
        techStack: ["React 18", "TypeScript", "Node.js", "Express", "PostgreSQL", "MSSQL ERP", "PDFKit", "Docker"],
        demoUrl: "https://optiasset-cmms.vercel.app",
        sourceUrl: "https://github.com/desousaejai/optiasset-cmms"
      },
      {
        id: "kyrios-keys-marketplace",
        title: "Kyrios Marketplace",
        subtitle: "Moteur de Distribution de Licences Numériques & Gestion Atomique",
        category: "Développement Full-Stack & Données Relationnelles",
        badge: "Full-Stack Production",
        badgeVariant: "emerald",
        metrics: "Requêtes Edge <50ms | Transactions Atomiques",
        description: "Plateforme e-commerce avec Next.js App Router et Prisma ORM. Attribution atomique de clés numériques et contrôle des stocks.",
        highlights: [
          "Transactions atomiques garantissant l'absence de doublons de clés",
          "Pooling de connexions sans serveur avec Neon PostgreSQL",
          "Contrôle d'accès basé sur les rôles avec NextAuth",
          "Intégration du CDN Steam pour trailers HD et configurations"
        ],
        techStack: ["Next.js (App Router)", "TypeScript", "Prisma ORM", "PostgreSQL / Neon", "NextAuth", "Tailwind CSS"],
        demoUrl: "https://kyrios-keys-marketplace.vercel.app",
        sourceUrl: "https://github.com/desousaejai/kyrios-keys-marketplace"
      },
      {
        id: "doxa-saas-studio",
        title: "Doxa Studio",
        subtitle: "Plateforme SaaS Haute Conversion & Simulateur Interactif",
        category: "Architecture UI/UX & Logique de Simulation",
        badge: "SaaS Interactif",
        badgeVariant: "cyan",
        metrics: "CLS 0.00 | Calculateur de ROI en Temps Réel",
        description: "Plateforme d'agence digitale avec simulateur de génération de sites, calculateur dynamique de ROI et design dark glassmorphism.",
        highlights: [
          "Bac à sable de génération de sites avec fallback déterministe local",
          "Calculateur dynamique de ROI avec projection de revenus additionnels",
          "Animations Framer Motion fluides avec 0.00 de décalage de mise en page",
          "Routes Edge optimisées pour checkout rapide et vérification de domaines"
        ],
        techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "i18n Localization"],
        demoUrl: "https://doxa-saas-studio.vercel.app",
        sourceUrl: "https://github.com/desousaejai/doxa-saas-studio"
      },
      {
        id: "jobflow-automation-extension",
        title: "JobFlow Assistant",
        subtitle: "Assistant Autonome de Candidatures (Prototype Manifest V3)",
        category: "Automatisation de Navigateur & Scripting",
        badge: "Prototype Démo",
        badgeVariant: "amber",
        metrics: "Classificateur Heuristique | Confidentialité Locale | Limite Quotidienne",
        description: "Prototype d'extension Chrome Manifest V3 avec classification heuristique des formulaires et déduplication des candidatures.",
        highlights: [
          "Analyseur heuristique de champs multilingue reliant questions et compétences",
          "Déduplication persistante locale évitant les candidatures répétées",
          "Limite quotidienne de sécurité (20/jour) avec jauge visuelle",
          "Confidentialité absolue : les données du profil ne quittent jamais le navigateur"
        ],
        techStack: ["Chrome Extension MV3", "JavaScript ES2022", "DOM Automation", "Chrome Storage"],
        demoUrl: "https://github.com/desousaejai/jobflow-automation-extension#readme",
        sourceUrl: "https://github.com/desousaejai/jobflow-automation-extension",
        isPrototype: true
      }
    ]
  },
  nl: {
    sectionTag: "Full-Stack Engineering & Automatisering Showcase",
    title: "Productie-Architecturen & Operationele Systemen",
    subtitle: "Enterprise full-stack software en automatiseringssystemen die technische diepgang en operationele impact aantonen.",
    liveDemoBtn: "Interactieve Live Demo",
    sourceCodeBtn: "Bekijk Broncode",
    prototypeNotice: "Automatiseringsprototype",
    projects: [
      {
        id: "optiasset-cmms",
        title: "OptiAsset CMMS",
        subtitle: "Industrieel Activabeheer & Onderhoudsarchitectuur",
        category: "Industriële Operaties & Bedrijfssoftware",
        badge: "Productie Architectuur",
        badgeVariant: "primary",
        metrics: "-34% Downtime | Dual DB (PostgreSQL + MSSQL)",
        description: "Industrieel onderhoudsbeheer volgens Lean Six Sigma principes. Heterogene database-synchronisatie met legacy ERP, mobiele inspectiechecklists en geautomatiseerde werkorders in PDF.",
        highlights: [
          "Dual-database koppeling tussen PostgreSQL 15 en legacy MSSQL ERP",
          "Onveranderlijk audit-logboek met UTC-tijdstempels en handtekeningen",
          "Geautomatiseerde PDF werkorders met historische onderdeelkosten",
          "Ingebouwde mock-engine voor directe interactieve verkenning op Vercel"
        ],
        techStack: ["React 18", "TypeScript", "Node.js", "Express", "PostgreSQL", "MSSQL ERP", "PDFKit", "Docker"],
        demoUrl: "https://optiasset-cmms.vercel.app",
        sourceUrl: "https://github.com/desousaejai/optiasset-cmms"
      },
      {
        id: "kyrios-keys-marketplace",
        title: "Kyrios Marketplace",
        subtitle: "Digitale Licentiedistributie & Atomair Voorraadbeheer",
        category: "Full-Stack Ontwikkeling & Relationele Gegevens",
        badge: "Full-Stack Productie",
        badgeVariant: "emerald",
        metrics: "Edge Query's <50ms | Atomaire Transacties",
        description: "E-commerce platform met Next.js App Router en Prisma ORM. Gelijktijdigheidsveilige sleuteltoewijzing en uitgebreid beheerdersdashboard.",
        highlights: [
          "Atomaire databasetransacties voorkomen dubbele toewijzing van licenties",
          "Serverless connection pooling met Neon PostgreSQL en PgBouncer",
          "Rolgebaseerde toegangscontrole met NextAuth",
          "Steam CDN integratie voor HD-trailers en systeemspecificaties"
        ],
        techStack: ["Next.js (App Router)", "TypeScript", "Prisma ORM", "PostgreSQL / Neon", "NextAuth", "Tailwind CSS"],
        demoUrl: "https://kyrios-keys-marketplace.vercel.app",
        sourceUrl: "https://github.com/desousaejai/kyrios-keys-marketplace"
      },
      {
        id: "doxa-saas-studio",
        title: "Doxa Studio",
        subtitle: "Hoge Conversie SaaS Platform & Interactieve Simulator",
        category: "UI/UX Architectuur & Simulatie-Logica",
        badge: "Interactieve SaaS",
        badgeVariant: "cyan",
        metrics: "CLS 0.00 | Real-time ROI Calculator",
        description: "Digitaal bureauplatform met interactieve websitegenerator, dynamische ROI-calculator en donker glassmorphic design.",
        highlights: [
          "Website-generator sandbox met autonome offline simulatie fallback",
          "Interactieve ROI-calculator met real-time omzetprognose",
          "Vloeiende Framer Motion animaties met 0.00 lay-outverschuiving",
          "Edge route handlers voor snelle checkout en domeinvalidatie"
        ],
        techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "i18n Localization"],
        demoUrl: "https://doxa-saas-studio.vercel.app",
        sourceUrl: "https://github.com/desousaejai/doxa-saas-studio"
      },
      {
        id: "jobflow-automation-extension",
        title: "JobFlow Assistant",
        subtitle: "Autonome Sollicitatie-Assistent (Manifest V3 Prototype)",
        category: "Browserautomatisering & Scripting",
        badge: "Demo Prototype",
        badgeVariant: "amber",
        metrics: "Heuristische Parser | 100% Lokale Privacy | Daglimiet",
        description: "Browserautomatiseringsprototype op basis van Chrome Extension Manifest V3 met heuristische formulierherkenning.",
        highlights: [
          "Meertalige heuristische formulieranalyse voor accurate vraag-antwoordkoppeling",
          "Permanente lokale ontdubbeling voorkomt herhaalde sollicitaties bij hetzelfde bedrijf",
          "Dagelijkse veiligheidslimiet (20/dag) met visuele voortgangsindicator",
          "Volledige privacy: kandidaatprofielgegevens verlaten de browser nooit"
        ],
        techStack: ["Chrome Extension MV3", "JavaScript ES2022", "DOM Automation", "Chrome Storage"],
        demoUrl: "https://github.com/desousaejai/jobflow-automation-extension#readme",
        sourceUrl: "https://github.com/desousaejai/jobflow-automation-extension",
        isPrototype: true
      }
    ]
  }
};

export function getProjectsData(locale: Locale): ProjectsSectionContent {
  return projectsDataByLocale[locale] || projectsDataByLocale.en;
}
