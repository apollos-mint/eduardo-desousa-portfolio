import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale } from '@/types';
import { isValidLocale, getAllStaticLocaleParams } from '@/lib/i18n';
import { ShieldCheck, Scale, Lock, Eye, ArrowLeft, Building2, FileText, CheckCircle2 } from 'lucide-react';

export function generateStaticParams() {
  return getAllStaticLocaleParams();
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
    trademarkTitle: string;
    trademarkSubtitle: string;
    trademarkP1: string;
    trademarkP2: string;
    brands: string[];
    ndaTitle: string;
    ndaSubtitle: string;
    ndaP1: string;
    ndaP2: string;
    metricsList: string[];
    privacyTitle: string;
    privacySubtitle: string;
    privacyController: string;
    privacyTelemetry: string;
    privacyClarity: string;
    privacyRights: string;
    copyrightTitle: string;
    copyrightBody: string;
  };
}

const legalContent: Record<Locale, LegalContent> = {
  en: {
    metaTitle: 'Legal, Compliance & Privacy Disclosures | Eduardo de Sousa',
    metaDesc: 'Legal disclosures, nominative fair use trademark statements, NDA synthetic metrics compliance, and GDPR/ePrivacy data privacy notices for Eduardo de Sousa.',
    badge: 'LEGAL & REGULATORY DOSSIER',
    title: 'Legal, Trademark & Privacy Disclosures',
    subtitle: 'Full legal transparency regarding corporate marks, illustrative metrics, telemetry, and data privacy.',
    lastUpdated: 'Effective Date: March 2026',
    backHome: 'Back to Executive Portfolio',
    sections: {
      trademarkTitle: '1. Nominative Fair Use Trademark Notice',
      trademarkSubtitle: 'Third-party brand marks, corporate logos, and certification emblems',
      trademarkP1: 'All third-party trademarks, registered service marks, corporate names, and brand logos displayed across this portfolio (including but not limited to ASML, BMW Group, MINI, Maersk, Hapag-Lloyd, TÜV Rheinland, Carl Zeiss, Robert Bosch GmbH, and Google LLC) are the exclusive intellectual property of their respective trademark holders.',
      trademarkP2: 'The display of these logos and corporate emblems on this site is made strictly under the international doctrine of Nominative Fair Use (Regulation (EU) 2017/1001 Art. 14, and US Lanham Act 15 U.S.C. § 1115(b)(4)). Their sole and explicit purpose is historical factual identification of career engagements, audited fabrication facilities, cleanroom production lines, and verified operational environments. No sponsorship, affiliation, endorsement, or commercial association with these entities is expressed or implied.',
      brands: [
        'ASML Netherlands B.V. & Supply Chain Ecosystem',
        'BMW Group (Bayerische Motoren Werke AG)',
        'MINI (BMW Plant Oxford / VDL Nedcar)',
        'A.P. Møller – Maersk A/S',
        'Hapag-Lloyd AG',
        'TÜV Rheinland Group',
        'Carl Zeiss AG (Semiconductor & Metrology)',
        'Robert Bosch GmbH',
        'Google LLC',
      ],
      ndaTitle: '2. Non-Disclosure & Illustrative Metrics Compliance',
      ndaSubtitle: 'Protection of proprietary industrial trade secrets (EU Directive 2016/943)',
      ndaP1: 'Eduardo de Sousa is bound by strict lifelong professional Non-Disclosure Agreements (NDAs) and confidentiality covenants governing high-tech cleanrooms, automotive manufacturing lines, and proprietary industrial processes.',
      ndaP2: 'Accordingly, all quantitative metrics, manufacturing tolerances, operational throughput numbers, and financial representations appearing on this website are sanitized, rounded illustrative representations engineered to demonstrate problem-solving scope, scale, and operational methodology without disclosing actual confidential figures or proprietary customer data. The actual production and audit figures remain confidential.',
      metricsList: [
        'Cleanroom optical tolerances (<0.1 µm): Illustrative approximation of sub-micron precision standards.',
        'Automotive OEM throughput (110–120 units/shift): Rounded representation of high-speed assembly line cadence.',
        'Quality defect reduction (15%): Scaled representation of DMAIC yield enhancement.',
        'Procurement cost optimization (75% / $800,000 USD/yr): Normalized figures demonstrating strategic multi-sourcing impact.',
        'Maritime container logistics (20 containers/quarter): Approximate volume representation for intercontinental freight dispatch.',
      ],
      privacyTitle: '3. Data Privacy, Telemetry & GDPR / ePrivacy Compliance',
      privacySubtitle: 'Data controller statement and visitor telemetry practices',
      privacyController: 'Data Controller: Eduardo de Sousa (Eindhoven, Netherlands / Valencia, Spain). Direct contact: desousaej@gmail.com.',
      privacyTelemetry: 'Technical Infrastructure Telemetry: This portfolio utilizes privacy-respecting Vercel Analytics and Speed Insights to assess core web vitals and latency. No cross-site tracking, third-party advertising cookies, or personally identifiable tracking pixels are deployed by default.',
      privacyClarity: 'Visual Analytics (Microsoft Clarity): Session diagnostics and anonymized interaction telemetry are powered by Microsoft Clarity. In full adherence to GDPR and the ePrivacy Directive, Clarity cookies and session tracking are strictly gated behind an explicit opt-in consent banner and will never initialize without affirmative user approval.',
      privacyRights: 'User Rights: Under GDPR Articles 15 through 22, you hold the right to access, rectify, or request erasure of any correspondence sent through the contact hub. No contact information or correspondence is ever sold or shared.',
      copyrightTitle: '4. Copyright & Proprietary Design System',
      copyrightBody: '© 2026 Eduardo de Sousa. All rights reserved. The visual architecture, software design, custom CSS animations, 3D WebGL scenes, and curated textual dossier are proprietary intellectual works of Eduardo de Sousa. Unauthorized duplication, automated scraping, or unauthorized redistribution is prohibited.',
    },
  },
  es: {
    metaTitle: 'Aviso Legal, Marcas & Privacidad | Eduardo de Sousa',
    metaDesc: 'Aviso legal, uso nominativo legítimo de marcas registradas, cumplimiento de acuerdos de confidencialidad (NDA) y política de privacidad RGPD.',
    badge: 'DOSSIER LEGAL Y REGULATORIO',
    title: 'Aviso Legal, Marcas & Privacidad',
    subtitle: 'Transparencia jurídica rigurosa sobre marcas corporativas, métricas ilustrativas y privacidad RGPD.',
    lastUpdated: 'Fecha de vigencia: Marzo 2026',
    backHome: 'Volver al Portafolio Principal',
    sections: {
      trademarkTitle: '1. Declaración de Uso Nominativo Legítimo de Marcas',
      trademarkSubtitle: 'Marcas de terceros, logotipos corporativos y emblemas de certificación',
      trademarkP1: 'Todas las marcas registradas, nombres comerciales, logotipos y enseñas comerciales de terceros exhibidos en este portafolio (incluyendo, entre otros, ASML, BMW Group, MINI, Maersk, Hapag-Lloyd, TÜV Rheinland, Carl Zeiss, Robert Bosch GmbH y Google LLC) son propiedad exclusiva de sus respectivos titulares.',
      trademarkP2: 'La inclusión de dichos logotipos se efectúa estrictamente al amparo de la doctrina internacional de Uso Nominativo Legítimo (Reglamento (UE) 2017/1001 Art. 14 y Lanham Act 15 U.S.C. § 1115(b)(4)). Su único objeto es la identificación histórica y veraz de trayectoria profesional, plantas auditadas, salas blancas operadas y entornos industriales verificados. No se expresa ni sugiere patrocinio, vinculación societaria o aval por parte de dichas corporaciones.',
      brands: [
        'ASML Netherlands B.V. y Ecosistema de Cadena de Suministro',
        'BMW Group (Bayerische Motoren Werke AG)',
        'MINI (BMW Plant Oxford / VDL Nedcar)',
        'A.P. Møller – Maersk A/S',
        'Hapag-Lloyd AG',
        'TÜV Rheinland Group',
        'Carl Zeiss AG (Semiconductores y Metrología)',
        'Robert Bosch GmbH',
        'Google LLC',
      ],
      ndaTitle: '2. Cumplimiento de Confidencialidad y Métricas Ilustrativas (NDA)',
      ndaSubtitle: 'Protección de secretos empresariales e industriales (Directiva UE 2016/943)',
      ndaP1: 'Eduardo de Sousa se encuentra sujeto a estrictos acuerdos de confidencialidad (NDA) respecto a los procesos de salas blancas de alta tecnología, plantas de ensamblaje de automoción y metodologías patentadas de sus clientes y empleadores.',
      ndaP2: 'En consecuencia, todas las cifras cuantitativas, tolerancias de fabricación, cadencias de producción y métricas económicas expuestas en este sitio constituyen aproximaciones redondeadas e ilustrativas. Fueron elaboradas para evidenciar capacidad analítica, escala de gestión y metodología resolutiva sin revelar cifras confidenciales reales ni secretos comerciales.',
      metricsList: [
        'Tolerancias ópticas de sala blanca (<0.1 µm): Aproximación representativa de precisión submicrónica.',
        'Cadencia automotriz OEM (110–120 unidades/turno): Representación normalizada del ritmo de línea de producción.',
        'Reducción de defectos de calidad (15%): Magnitud ilustrativa de optimización mediante DMAIC.',
        'Optimización de compras (75% / $800.000 USD/año): Cifras normalizadas que demuestran impacto de homologación alternativa.',
        'Logística marítima (20 contenedores/trimestre): Representación aproximada del volumen de flete intercontinental.',
      ],
      privacyTitle: '3. Privacidad de Datos, Telemetría y Cumplimiento RGPD',
      privacySubtitle: 'Declaración del responsable del tratamiento y política de cookies',
      privacyController: 'Responsable del Tratamiento: Eduardo de Sousa (Eindhoven, Países Bajos / Valencia, España). Contacto directo: desousaej@gmail.com.',
      privacyTelemetry: 'Telemetría de Infraestructura: Este sitio utiliza Vercel Analytics y Speed Insights para evaluar tiempos de respuesta y estabilidad. No se emplean cookies de seguimiento publicitario cruzado.',
      privacyClarity: 'Analítica Visual (Microsoft Clarity): El diagnóstico de experiencia y mapas de interacción se gestionan con Microsoft Clarity. En cumplimiento del RGPD y de la Directiva ePrivacy, el script de Clarity se encuentra estrictamente condicionado a la aceptación previa y expresa del usuario a través del banner de consentimiento.',
      privacyRights: 'Derechos del Interesado: Conforme a los Arts. 15 a 22 del RGPD, usted dispone del derecho de acceso, rectificación y supresión de cualquier información transmitida por el formulario de contacto. Los datos nunca se ceden ni comercializan.',
      copyrightTitle: '4. Derechos de Autor y Propiedad Intelectual',
      copyrightBody: '© 2026 Eduardo de Sousa. Todos los derechos reservados. La arquitectura visual, el diseño de software, animaciones WebGL y textos redactados son obras intelectuales propias y protegidas. Queda prohibida su reproducción no autorizada.',
    },
  },
  pt: {
    metaTitle: 'Avisos Legais, Marcas & Privacidade | Eduardo de Sousa',
    metaDesc: 'Avisos legais, uso nominativo legítimo de marcas, conformidade com acordos de confidencialidade (NDA) e política de privacidade RGPD.',
    badge: 'DOSSIÊ LEGAL E REGULATÓRIO',
    title: 'Avisos Legais, Marcas & Privacidade',
    subtitle: 'Total conformidade jurídica sobre marcas corporativas, métricas ilustrativas e proteção de dados.',
    lastUpdated: 'Data de vigência: Março de 2026',
    backHome: 'Voltar ao Portfólio Executivo',
    sections: {
      trademarkTitle: '1. Aviso de Uso Nominativo Legítimo de Marcas',
      trademarkSubtitle: 'Marcas de terceiros, logotipos empresariais e emblemas de certificação',
      trademarkP1: 'Todas as marcas registradas, denominações comerciais e logotipos de terceiros exibidos neste portfólio (incluindo ASML, BMW Group, MINI, Maersk, Hapag-Lloyd, TÜV Rheinland, Carl Zeiss, Robert Bosch GmbH e Google LLC) são propriedade exclusiva dos respetivos detentores.',
      trademarkP2: 'A exibição destas marcas é efetuada estritamente sob a doutrina de Uso Nominativo Legítimo (Regulamento (UE) 2017/1001 Art. 14). Destina-se exclusivamente à identificação factual do histórico de carreira e ambientes industriais operados. Nenhuma relação de patrocínio ou afiliação é implicada.',
      brands: [
        'ASML Netherlands B.V. & Ecossistema de Fornecedores',
        'BMW Group (Bayerische Motoren Werke AG)',
        'MINI (BMW Plant Oxford / VDL Nedcar)',
        'A.P. Møller – Maersk A/S',
        'Hapag-Lloyd AG',
        'TÜV Rheinland Group',
        'Carl Zeiss AG (Semicondutores e Metrologia)',
        'Robert Bosch GmbH',
        'Google LLC',
      ],
      ndaTitle: '2. Conformidade com Acordos de Confidencialidade (NDA)',
      ndaSubtitle: 'Proteção de segredos comerciais e industriais (Diretiva UE 2016/943)',
      ndaP1: 'Eduardo de Sousa está vinculado a rigorosos acordos de confidencialidade (NDAs) respeitantes a salas limpas de semicondutores e linhas industriais do setor automóvel.',
      ndaP2: 'Assim, todas as métricas quantitativas, tolerâncias e valores económicos apresentados constituem representações ilustrativas e aproximações calculadas para ilustrar competência técnica sem revelar dados proprietários confidenciais.',
      metricsList: [
        'Tolerâncias ópticas (<0.1 µm): Aproximação ilustrativa de rigor submicrométrico.',
        'Cadência automóvel (110–120 unidades/turno): Representação normalizada de ritmo de produção.',
        'Redução de defeitos (15%): Ilustração de ganhos via DMAIC.',
        'Poupança em compras (75% / $800.000 USD/ano): Valores representativos de homologação estratégica.',
        'Frete marítimo (20 contentores/trimestre): Estimativa ilustrativa de volume intercontinental.',
      ],
      privacyTitle: '3. Privacidade de Dados e Conformidade RGPD',
      privacySubtitle: 'Declaração do responsável pelo tratamento e gestão de telemetria',
      privacyController: 'Responsável pelo Tratamento: Eduardo de Sousa. Contacto: desousaej@gmail.com.',
      privacyTelemetry: 'Telemetria de Infraestrutura: Vercel Analytics opera sem cookies invasivos de rastreio de terceiros.',
      privacyClarity: 'Analítica Visual (Microsoft Clarity): O carregamento de cookies de diagnóstico é bloqueado por defeito e só é executado após autorização explícita do utilizador.',
      privacyRights: 'Direitos dos Titulares: Pleno exercício dos direitos de acesso, retificação e eliminação sob os Artigos 15 a 22 do RGPD.',
      copyrightTitle: '4. Direitos de Autor e Propriedade Intelectual',
      copyrightBody: '© 2026 Eduardo de Sousa. Todos os direitos reservados. O design de software, animações e documentação escrita constituem propriedade intelectual protegida.',
    },
  },
  de: {
    metaTitle: 'Rechtliche Hinweise & Datenschutz | Eduardo de Sousa',
    metaDesc: 'Rechtliche Hinweise, nominative Markennutzung, NDA-Konformität und DSGVO-Datenschutzerklärung für Eduardo de Sousa.',
    badge: 'RECHTS- UND REGULIERUNGSDOSSIER',
    title: 'Rechtliche Hinweise & Datenschutz',
    subtitle: 'Vollständige Transparenz zu Unternehmensmarken, illustrativen Kennzahlen und Datenschutz.',
    lastUpdated: 'Gültig ab: März 2026',
    backHome: 'Zurück zum Portfolio',
    sections: {
      trademarkTitle: '1. Hinweis zur nominativen Markennutzung',
      trademarkSubtitle: 'Drittmarken, Unternehmenslogos und Zertifizierungsembleme',
      trademarkP1: 'Alle auf dieser Website gezeigten Marken, Warenzeichen und Unternehmenslogos (u.a. ASML, BMW Group, MINI, Maersk, Hapag-Lloyd, TÜV Rheinland, Carl Zeiss, Robert Bosch GmbH und Google LLC) sind Eigentum der jeweiligen Inhaber.',
      trademarkP2: 'Die Darstellung erfolgt ausschließlich im Rahmen der nominativen fairen Nutzung (Art. 14 Verordnung (EU) 2017/1001), um den tatsächlichen beruflichen Werdegang, auditierten Werke und Reinraumprozesse wahrheitsgemäß darzustellen. Eine geschäftliche Verbindung oder ein Sponsoring wird nicht begründet.',
      brands: [
        'ASML Netherlands B.V. & Lieferketten-Ökosystem',
        'BMW Group (Bayerische Motoren Werke AG)',
        'MINI (BMW Werk Oxford / VDL Nedcar)',
        'A.P. Møller – Maersk A/S',
        'Hapag-Lloyd AG',
        'TÜV Rheinland Group',
        'Carl Zeiss AG (Halbleiter- & Messtechnik)',
        'Robert Bosch GmbH',
        'Google LLC',
      ],
      ndaTitle: '2. Geheimhaltungsvereinbarungen & Illustrative Kennzahlen (NDA)',
      ndaSubtitle: 'Schutz von Geschäfts- und Betriebsgeheimnissen (EU-Richtlinie 2016/943)',
      ndaP1: 'Eduardo de Sousa unterliegt strengen beruflichen Vertraulichkeitsvereinbarungen bezüglich High-Tech-Reinräumen und automobiler Fertigungsverfahren.',
      ndaP2: 'Alle auf dieser Website angegebenen quantitativen Kennzahlen, Fertigungstoleranzen und Kostensenkungen sind daher bereinigte, gerundete und illustrative Näherungswerte, um methodische Kompetenz darzulegen, ohne vertrauliche Originaldaten preiszugeben.',
      metricsList: [
        'Reinraum-Toleranzen (<0.1 µm): Illustrative Annäherung submikroner Präzision.',
        'Automobil-Durchsatz (110–120 Einheiten/Schicht): Gerundete Darstellung der Taktzeit.',
        'Fehlerreduktion (15%): Skalierte Darstellung des DMAIC-Effekts.',
        'Einkaufsoptimierung (75% / 800.000 USD/Jahr): Bereinigte Werte strategischer Beschaffung.',
        'Seefracht (20 Container/Quartal): Näherungswert interkontinentaler Logistikvolumina.',
      ],
      privacyTitle: '3. Datenschutz, Telemetrie & DSGVO-Konformität',
      privacySubtitle: 'Angaben zum Verantwortlichen und Cookie-Einwilligung',
      privacyController: 'Verantwortlicher: Eduardo de Sousa (Eindhoven, Niederlande / Valencia, Spanien). E-Mail: desousaej@gmail.com.',
      privacyTelemetry: 'Infrastruktur-Telemetrie: Vercel Analytics erfasst Ladezeiten ohne datenschutzrelevante Werbecookies.',
      privacyClarity: 'Visuelle Analyse (Microsoft Clarity): Sitzungsdiagnosen über Microsoft Clarity sind standardmäßig deaktiviert und werden erst nach ausdrücklicher Einwilligung geladen.',
      privacyRights: 'Betroffenenrechte: Recht auf Auskunft, Berichtigung und Löschung gemäß Art. 15–22 DSGVO.',
      copyrightTitle: '4. Urheberrecht & Geistiges Eigentum',
      copyrightBody: '© 2026 Eduardo de Sousa. Alle Rechte vorbehalten. Design, Quellcode und redaktionelle Inhalte sind urheberrechtlich geschützt.',
    },
  },
  fr: {
    metaTitle: 'Mentions Légales & Confidentialité | Eduardo de Sousa',
    metaDesc: 'Mentions légales, usage nominatif des marques, respect des accords de confidentialité (NDA) et politique de confidentialité RGPD.',
    badge: 'DOSSIER JURIDIQUE ET RÉGLEMENTAIRE',
    title: 'Mentions Légales & Confidentialité',
    subtitle: 'Transparence juridique sur les marques, métriques illustratives et protection des données.',
    lastUpdated: 'Date d\'effet : Mars 2026',
    backHome: 'Retour au Portefeuille',
    sections: {
      trademarkTitle: '1. Mention d\'Usage Nominatif des Marques',
      trademarkSubtitle: 'Marques de tiers, logotypes d\'entreprises et emblèmes',
      trademarkP1: 'Toutes les marques déposées, dénominations commerciales et logotypes de tiers présents sur ce site (notamment ASML, BMW Group, MINI, Maersk, Hapag-Lloyd, TÜV Rheinland, Carl Zeiss, Robert Bosch GmbH et Google LLC) sont la propriété exclusive de leurs titulaires respectifs.',
      trademarkP2: 'L\'utilisation de ces logos est strictement effectuée dans le cadre de l\'usage nominatif légitime (Règlement (UE) 2017/1001 Art. 14) à des fins d\'identification factuelle du parcours professionnel et des usines auditées. Aucun parrainage ni affiliation n\'est suggéré.',
      brands: [
        'ASML Netherlands B.V. & Écosystème Fournisseurs',
        'BMW Group (Bayerische Motoren Werke AG)',
        'MINI (BMW Plant Oxford / VDL Nedcar)',
        'A.P. Møller – Maersk A/S',
        'Hapag-Lloyd AG',
        'TÜV Rheinland Group',
        'Carl Zeiss AG (Semiconducteurs et Métrologie)',
        'Robert Bosch GmbH',
        'Google LLC',
      ],
      ndaTitle: '2. Respect de la Confidentialité et Métriques Illustratives (NDA)',
      ndaSubtitle: 'Protection des secrets d\'affaires (Directive UE 2016/943)',
      ndaP1: 'Eduardo de Sousa est tenu par des engagements stricts de non-divulgation (NDA) couvrant les processus en salle blanche et les lignes de production automobile.',
      ndaP2: 'Par conséquent, toutes les métriques quantitatives, cadences de production et économies financières mentionnées sont des représentations illustratives et arrondies, conçues pour refléter le savoir-faire sans dévoiler de données confidentielles réelles.',
      metricsList: [
        'Tolérances optiques (<0.1 µm) : Approximation de la précision submicronique.',
        'Cadence automobile (110–120 unités/poste) : Taux de production normalisé.',
        'Réduction des défauts (15%) : Représentation d\'optimisation DMAIC.',
        'Optimisation achats (75% / 800 000 USD/an) : Chiffres normalisés de sourcing alternatif.',
        'Logistique maritime (20 conteneurs/trimestre) : Estimation de volume de fret intercontinental.',
      ],
      privacyTitle: '3. Données Personnelles et Conformité RGPD',
      privacySubtitle: 'Responsable du traitement et gestion des traceurs',
      privacyController: 'Responsable du Traitement : Eduardo de Sousa. Contact : desousaej@gmail.com.',
      privacyTelemetry: 'Télémétrie d\'infrastructure : Vercel Analytics opère sans collecte de données publicitaires tierces.',
      privacyClarity: 'Analyse Visuelle (Microsoft Clarity) : L\'outil de diagnostic Clarity est strictement conditionné au consentement exprès de l\'utilisateur via le bandeau dédié.',
      privacyRights: 'Droits des personnes : Droits d\'accès, de rectification et d\'effacement selon les articles 15 à 22 du RGPD.',
      copyrightTitle: '4. Droits d\'Auteur et Propriété Intellectuelle',
      copyrightBody: '© 2026 Eduardo de Sousa. Tous droits réservés. L\'architecture visuelle et le code sont protégés par le droit d\'auteur.',
    },
  },
  nl: {
    metaTitle: 'Juridische Informatie & Privacy | Eduardo de Sousa',
    metaDesc: 'Juridische mededelingen, nominatief merkgebruik, NDA-naleving en AVG/GDPR privacyverklaring voor Eduardo de Sousa.',
    badge: 'JURIDISCH & REGELGEVEND DOSSIER',
    title: 'Juridische Informatie & Privacy',
    subtitle: 'Volledige transparantie over handelsmerken, illustratieve cijfers en privacywaarborging.',
    lastUpdated: 'Ingangsdatum: Maart 2026',
    backHome: 'Terug naar Portfolio',
    sections: {
      trademarkTitle: '1. Kennisgeving van Nominatief Handelsmerkgebruik',
      trademarkSubtitle: 'Merken van derden, bedrijfslogo\'s en certificeringsemblemen',
      trademarkP1: 'Alle op deze website getoonde handelsmerken, logo\'s en handelsnamen van derden (waaronder ASML, BMW Group, MINI, Maersk, Hapag-Lloyd, TÜV Rheinland, Carl Zeiss, Robert Bosch GmbH en Google LLC) zijn eigendom van hun respectievelijke houders.',
      trademarkP2: 'De vermelding van deze logo\'s geschiedt strikt onder de doctrine van nominatief eerlijk gebruik (Verordening (EU) 2017/1001 Art. 14) om historische loopbaanervaring, geauditeerde fabrieken en cleanroomomgevingen feitelijk te identificeren. Geen enkele affiliatie of sponsoring wordt gesuggereerd.',
      brands: [
        'ASML Netherlands B.V. & Toeleveranciersnetwerk',
        'BMW Group (Bayerische Motoren Werke AG)',
        'MINI (BMW Plant Oxford / VDL Nedcar)',
        'A.P. Møller – Maersk A/S',
        'Hapag-Lloyd AG',
        'TÜV Rheinland Group',
        'Carl Zeiss AG (Semiconductor & Metrologie)',
        'Robert Bosch GmbH',
        'Google LLC',
      ],
      ndaTitle: '2. Naleving van Geheimhouding en Illustratieve Cijfers (NDA)',
      ndaSubtitle: 'Bescherming van bedrijfs- en fabrieksgeheimen (EU-richtlijn 2016/943)',
      ndaP1: 'Eduardo de Sousa is gebonden aan strikte geheimhoudingsovereenkomsten (NDA\'s) met betrekking tot hightech cleanrooms en automotive assemblagelijnen.',
      ndaP2: 'Dientengevolge zijn alle getoonde kwantitatieve cijfers, productietoleranties en kostenbesparingen gesaneerde, afgeronde en illustratieve benaderingen om methodologische bekwaamheid te tonen zonder vertrouwelijke bedrijfsgegevens openbaar te maken.',
      metricsList: [
        'Cleanroom toleranties (<0.1 µm): Illustratieve weergave van submicron precisie.',
        'Automotive OEM doorvoer (110–120 eenheden/ploeg): Genormaliseerde weergave van lijnritme.',
        'Kwaliteitsverbetering (15% defectreductie): Geschaalde weergave van DMAIC-verbetering.',
        'Inkoopoptimalisatie (75% / $800.000 USD/jaar): Representatieve cijfers van strategische sourcing.',
        'Zeevrachtlogistiek (20 containers/kwartaal): Benadering van intercontinentaal vrachtvolume.',
      ],
      privacyTitle: '3. Privacy van Gegevens, Telemetrie & AVG / GDPR',
      privacySubtitle: 'Verklaring verwerkingsverantwoordelijke en cookiebeleid',
      privacyController: 'Verwerkingsverantwoordelijke: Eduardo de Sousa (Eindhoven, Nederland / Valencia, Spanje). Contact: desousaej@gmail.com.',
      privacyTelemetry: 'Infrastructuur telemetrie: Vercel Analytics meet laadtijden zonder trackingcookies voor advertenties van derden.',
      privacyClarity: 'Visuele Analytics (Microsoft Clarity): Sessiediagnostiek via Microsoft Clarity is strikt geblokkeerd totdat de bezoeker expliciete toestemming verleent via de consent banner.',
      privacyRights: 'Rechten van betrokkenen: Volledig recht op inzage, rectificatie en verwijdering conform de artikelen 15 tot 22 AVG.',
      copyrightTitle: '4. Auteursrecht & Intellectueel Eigendom',
      copyrightBody: '© 2026 Eduardo de Sousa. Alle rechten voorbehouden. Softwareontwerp, styling en redactionele teksten zijn intellectueel eigendom.',
    },
  },
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
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors py-2 px-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20"
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

          <div className="pt-2">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Identified Brand Marks:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {t.sections.brands.map((brand, idx) => (
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

        {/* 3. GDPR & ePrivacy */}
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
          </div>
        </section>

        {/* 4. Copyright */}
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
