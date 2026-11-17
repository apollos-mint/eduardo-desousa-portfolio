"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Cookie, X, Lock, BarChart3, Check } from "lucide-react";
import { Locale } from "@/types";

interface CookieConsentBannerProps {
  currentLocale?: Locale;
}

interface TranslationData {
  bannerTitle: string;
  bannerDesc: string;
  accept: string;
  decline: string;
  details: string;
  modalTitle: string;
  modalSub: string;
  controller: string;
  legalBasisTitle: string;
  catEssentialTitle: string;
  catEssentialBadge: string;
  catEssentialDesc: string;
  catAnalyticsTitle: string;
  catAnalyticsBadge: string;
  catAnalyticsDesc: string;
  rightsTitle: string;
  rightsDesc: string;
  save: string;
  close: string;
  statusAccepted: string;
  statusDeclined: string;
}

const dict: Record<Locale, TranslationData> = {
  es: {
    bannerTitle: "Gobernanza de Privacidad & Cookies (RGPD / Directiva ePrivacy)",
    bannerDesc: "Este portal utiliza cookies técnicas esenciales para el funcionamiento de la sesión y la memorización de su idioma preferido. Opcionalmente, empleamos telemetría agregada (Vercel) y analítica de interacción (Microsoft Clarity) para auditar la usabilidad técnica.",
    accept: "Aceptar Analítica",
    decline: "Solo Esenciales",
    details: "Configuración & Legal",
    modalTitle: "Aviso de Privacidad y Declaración de Cookies",
    modalSub: "Conforme al Reglamento (UE) 2016/679 (RGPD) y Directiva 2002/58/CE (ePrivacy)",
    controller: "Responsable del Tratamiento: Eduardo de Sousa · Asesoría de Operaciones Industriales · Valencia, España · Contacto: desousaejai@gmail.com",
    legalBasisTitle: "Bases Jurídicas del Tratamiento",
    catEssentialTitle: "1. Cookies Técnicas y Funcionales Esenciales",
    catEssentialBadge: "Obligatorias / Siempre Activas",
    catEssentialDesc: "Garantizan la seguridad, integridad de red, enrutamiento perimetral y preservación de preferencias esenciales: 'preferred_lang' (1 año, idioma preferido), 'cookie-consent' (1 año, registro de consentimiento) y telemetría de red edge. Exentas de consentimiento previo conforme al Art. 5.3 Directiva ePrivacy / Art. 6.1.f RGPD (Interés Legítimo).",
    catAnalyticsTitle: "2. Analítica de Sesión y Mapas de Calor (Microsoft Clarity & Vercel)",
    catAnalyticsBadge: "Opcional / Consentimiento Expreso",
    catAnalyticsDesc: "Permite registrar patrones anónimos de navegación (scroll, clics, mapas de calor) para corregir fricciones en el flujo de diagnóstico. Microsoft Clarity enmascara automáticamente todos los campos de entrada y texto sensible antes de la transmisión. Vercel Web Analytics opera en modalidad cookieless de borde. Solo se ejecutan tras pulsar 'Aceptar' conforme al Art. 6.1.a RGPD.",
    rightsTitle: "Derechos del Interesado (Arts. 15-22 RGPD)",
    rightsDesc: "Usted tiene derecho a acceder, rectificar, limitar, solicitar la supresión de sus datos o retirar este consentimiento en cualquier momento utilizando este panel o contactando a desousaejai@gmail.com. Asimismo, puede elevar una reclamación ante la Agencia Española de Protección de Datos (AEPD, aepd.es).",
    save: "Guardar Preferencias",
    close: "Cerrar",
    statusAccepted: "Analítica Activa",
    statusDeclined: "Solo Esenciales (Bloqueada)",
  },
  en: {
    bannerTitle: "Privacy & Cookie Governance (GDPR / ePrivacy Directive)",
    bannerDesc: "This portal uses essential technical cookies to ensure platform operations and preserve your preferred language. Optionally, we use aggregated performance telemetry (Vercel) and session interaction analytics (Microsoft Clarity) to audit usability.",
    accept: "Accept Analytics",
    decline: "Essential Only",
    details: "Preferences & Disclosure",
    modalTitle: "Privacy Notice & Cookie Policy Disclosure",
    modalSub: "Compliant with EU Regulation 2016/679 (GDPR) & Directive 2002/58/EC (ePrivacy)",
    controller: "Data Controller: Eduardo de Sousa · Industrial Operations Advisory Practice · Valencia, Spain · Contact: desousaejai@gmail.com",
    legalBasisTitle: "Legal Grounds for Processing",
    catEssentialTitle: "1. Strictly Necessary Technical & Functional Cookies",
    catEssentialBadge: "Mandatory / Always Active",
    catEssentialDesc: "Required for platform security, edge routing, and storing essential preferences: 'preferred_lang' (1 year, language selection), 'cookie-consent' (1 year, privacy choices), and edge routing headers. Exempt from consent under Art. 5.3 ePrivacy Directive / Art. 6.1.f GDPR (Legitimate Interest).",
    catAnalyticsTitle: "2. Session Telemetry & Interaction Heatmaps (Microsoft Clarity & Vercel)",
    catAnalyticsBadge: "Optional / Explicit Consent",
    catAnalyticsDesc: "Captures anonymous user interactions (scroll depth, heatmaps, clicks) to diagnose layout friction. Microsoft Clarity automatically masks sensitive inputs and form fields prior to telemetry ingestion. Vercel Web Analytics operates cookieless at the edge. Runs only after affirmative consent under Art. 6.1.a GDPR.",
    rightsTitle: "Data Subject Rights (Arts. 15-22 GDPR)",
    rightsDesc: "You have the right to access, rectify, restrict, erase, or withdraw your consent at any time via this panel or by emailing desousaejai@gmail.com. You also have the right to lodge a complaint with an EU Supervisory Authority.",
    save: "Save Preferences",
    close: "Close",
    statusAccepted: "Analytics Enabled",
    statusDeclined: "Essential Only (Blocked)",
  },
  de: {
    bannerTitle: "Datenschutz & Cookie-Governance (DSGVO / ePrivacy)",
    bannerDesc: "Dieses Portal verwendet essenzielle technische Cookies für den Betrieb und zur Speicherung Ihrer Sprachauswahl. Optional nutzen wir Leistungs-Telemetrie (Vercel) und Interaktionsanalytik (Microsoft Clarity).",
    accept: "Analytik Akzeptieren",
    decline: "Nur Essenziell",
    details: "Einstellungen & Rechtliches",
    modalTitle: "Datenschutzerklärung & Cookie-Richtlinie",
    modalSub: "Gemäß EU-Verordnung 2016/679 (DSGVO) und Richtlinie 2002/58/EG (ePrivacy)",
    controller: "Verantwortlicher: Eduardo de Sousa · Industrielle Betriebsberatung · Valencia, Spanien · Kontakt: desousaejai@gmail.com",
    legalBasisTitle: "Rechtsgrundlagen der Verarbeitung",
    catEssentialTitle: "1. Technisch Notwendige Cookies",
    catEssentialBadge: "Obligatorisch / Immer Aktiv",
    catEssentialDesc: "Erforderlich für Sicherheit, Edge-Routing und Sprachspeicherung ('preferred_lang', 'cookie-consent'). Ausgenommen von der Einwilligungspflicht gemäß Art. 5.3 ePrivacy-Richtlinie / Art. 6.1.f DSGVO.",
    catAnalyticsTitle: "2. Sitzungstelemetrie & Heatmaps (Microsoft Clarity & Vercel)",
    catAnalyticsBadge: "Optional / Ausdrückliche Einwilligung",
    catAnalyticsDesc: "Erfasst anonyme Interaktionen zur Optimierung der Benutzerführung mit automatischer Maskierung sensibler Felder. Vercel Analytics arbeitet cookieless. Nur aktiv nach Bestätigung gemäß Art. 6.1.a DSGVO.",
    rightsTitle: "Ihre Betroffenenrechte (Art. 15-22 DSGVO)",
    rightsDesc: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Widerruf Ihrer Einwilligung jederzeit über dieses Menü oder per E-Mail an desousaejai@gmail.com sowie Beschwerderecht bei einer Datenschutzbehörde.",
    save: "Einstellungen Speichern",
    close: "Schließen",
    statusAccepted: "Analytik Aktiviert",
    statusDeclined: "Nur Essenziell (Blockiert)",
  },
  nl: {
    bannerTitle: "Privacy & Cookiebeheer (AVG / ePrivacy-richtlijn)",
    bannerDesc: "Dit portaal gebruikt strikt noodzakelijke cookies voor paginawerking en taalvoorkeur. Optioneel gebruiken we prestatietelemetrie (Vercel) en sessie-analyse (Microsoft Clarity).",
    accept: "Analytica Accepteren",
    decline: "Alleen Noodzakelijk",
    details: "Voorkeuren & Juridisch",
    modalTitle: "Privacyverklaring & Cookiebeleid",
    modalSub: "Conform EU-verordening 2016/679 (AVG) en Richtlijn 2002/58/EG (ePrivacy)",
    controller: "Verwerkingsverantwoordelijke: Eduardo de Sousa · Industrieel Advies · Valencia, Spanje · Contact: desousaejai@gmail.com",
    legalBasisTitle: "Juridische Grondslagen",
    catEssentialTitle: "1. Strikt Noodzakelijke Functionele Cookies",
    catEssentialBadge: "Verplicht / Altijd Actief",
    catEssentialDesc: "Essentieel voor veilige navigatie, routing en taalbehoud ('preferred_lang', 'cookie-consent'). Vrijgesteld van toestemming conform Art. 5.3 ePrivacy-richtlijn / Art. 6.1.f AVG.",
    catAnalyticsTitle: "2. Sessietelemetrie & Interactie-Heatmaps (Microsoft Clarity & Vercel)",
    catAnalyticsBadge: "Optioneel / Uitdrukkelijke Toestemming",
    catAnalyticsDesc: "Verzamelt anonieme interactiepatronen met automatische maskering van gevoelige invoer. Vercel Analytics werkt zonder cookies. Wordt pas geladen na toestemming conform Art. 6.1.a AVG.",
    rightsTitle: "Rechten van Betrokkenen (Art. 15-22 AVG)",
    rightsDesc: "U heeft het recht op inzage, rectificatie, verwijdering en intrekking van toestemming via dit paneel of via desousaejai@gmail.com.",
    save: "Voorkeuren Opslaan",
    close: "Sluiten",
    statusAccepted: "Analytica Actief",
    statusDeclined: "Alleen Noodzakelijk (Geblokkeerd)",
  },
  fr: {
    bannerTitle: "Gouvernance de la Confidentialité & Cookies (RGPD / ePrivacy)",
    bannerDesc: "Ce portail utilise des cookies techniques essentiels pour le fonctionnement et la mémorisation de votre langue. En option, nous utilisons la télémétrie (Vercel) et l'analytique (Microsoft Clarity).",
    accept: "Accepter l'analytique",
    decline: "Essentiels Uniquement",
    details: "Préférences & Légal",
    modalTitle: "Politique de Confidentialité et Déclaration relative aux Cookies",
    modalSub: "Conforme au Règlement (UE) 2016/679 (RGPD) et à la Directive 2002/58/CE (ePrivacy)",
    controller: "Responsable du Traitement: Eduardo de Sousa · Conseil en Opérations Industrielles · Valence, Espagne · Contact: desousaejai@gmail.com",
    legalBasisTitle: "Bases Légales du Traitement",
    catEssentialTitle: "1. Cookies Techniques et Fonctionnels Essentiels",
    catEssentialBadge: "Obligatoire / Toujours Actif",
    catEssentialDesc: "Indispensables à la sécurité, à l'acheminement et à la conservation des préférences ('preferred_lang', 'cookie-consent'). Exemptés de consentement selon l'Art. 5.3 Directive ePrivacy / Art. 6.1.f RGPD.",
    catAnalyticsTitle: "2. Télémétrie de Session & Cartes de Chaleur (Microsoft Clarity & Vercel)",
    catAnalyticsBadge: "Optionnel / Consentement Explicite",
    catAnalyticsDesc: "Enregistre anonymement les interactions avec masquage automatique des données sensibles. Vercel opère sans cookies. Activé uniquement après accord selon l'Art. 6.1.a RGPD.",
    rightsTitle: "Droits des Personnes Concernées (Art. 15-22 RGPD)",
    rightsDesc: "Vous disposez d'un droit d'accès, de rectification, d'effacement et de retrait du consentement à tout moment via ce panneau ou par email à desousaejai@gmail.com.",
    save: "Enregistrer",
    close: "Fermer",
    statusAccepted: "Analytique Activée",
    statusDeclined: "Essentiels Uniquement (Bloqué)",
  },
  pt: {
    bannerTitle: "Governança de Privacidade & Cookies (RGPD / Diretiva ePrivacy)",
    bannerDesc: "Este portal utiliza cookies técnicos essenciais para o funcionamento e memorização do seu idioma. Opcionalmente, utilizamos telemetria agregada (Vercel) e análise de sessão (Microsoft Clarity).",
    accept: "Aceitar Analítica",
    decline: "Apenas Essenciais",
    details: "Definições & Legal",
    modalTitle: "Aviso de Privacidade e Declaração de Cookies",
    modalSub: "Em conformidade com o Regulamento (UE) 2016/679 (RGPD) e Diretiva 2002/58/CE (ePrivacy)",
    controller: "Responsável pelo Tratamento: Eduardo de Sousa · Consultoria de Operações Industriais · Valência, Espanha · Contacto: desousaejai@gmail.com",
    legalBasisTitle: "Bases Jurídicas do Tratamento",
    catEssentialTitle: "1. Cookies Técnicos e Funcionais Essenciais",
    catEssentialBadge: "Obrigatórios / Sempre Ativos",
    catEssentialDesc: "Indispensáveis para a segurança da navegação e preservação do idioma ('preferred_lang', 'cookie-consent'). Isentos de consentimento prévio segundo o Art. 5.3 Diretiva ePrivacy / Art. 6.1.f RGPD.",
    catAnalyticsTitle: "2. Telemetria de Sessão e Mapas de Calor (Microsoft Clarity & Vercel)",
    catAnalyticsBadge: "Opcional / Consentimento Expresso",
    catAnalyticsDesc: "Regista padrões anónimos com mascaramento automático de campos sensíveis. Vercel funciona sem cookies. Apenas é ativado após consentimento expresso nos termos do Art. 6.1.a RGPD.",
    rightsTitle: "Direitos do Titular dos Dados (Art. 15-22 RGPD)",
    rightsDesc: "Tem o direito de aceder, retificar, limitar, eliminar e retirar o seu consentimento a qualquer momento através deste painel ou contactando desousaejai@gmail.com.",
    save: "Guardar Definições",
    close: "Fechar",
    statusAccepted: "Analítica Ativa",
    statusDeclined: "Apenas Essenciais (Bloqueado)",
  },
};

export default function CookieConsentBanner({ currentLocale }: CookieConsentBannerProps) {
  const [activeLocale, setActiveLocale] = useState<Locale>("en");
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  // Determine active locale dynamically
  useEffect(() => {
    if (currentLocale && dict[currentLocale]) {
      setActiveLocale(currentLocale);
      return;
    }

    if (typeof window !== "undefined") {
      const urlLang = new URLSearchParams(window.location.search).get("lang") as Locale | null;
      if (urlLang && dict[urlLang]) {
        setActiveLocale(urlLang);
        return;
      }

      const cookieMatch = document.cookie.match(/(?:^|;\s*)preferred_lang=([^;]+)/);
      if (cookieMatch && dict[cookieMatch[1] as Locale]) {
        setActiveLocale(cookieMatch[1] as Locale);
        return;
      }

      const stored = localStorage.getItem("preferred_language") as Locale | null;
      if (stored && dict[stored]) {
        setActiveLocale(stored);
        return;
      }

      // Browser language check
      if (navigator.languages) {
        for (const l of navigator.languages) {
          const code = l.split("-")[0].toLowerCase() as Locale;
          if (dict[code]) {
            setActiveLocale(code);
            return;
          }
        }
      }
    }
  }, [currentLocale]);

  // Check initial consent state on mount & listen to open events
  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) {
        setIsBannerVisible(true);
        setAnalyticsEnabled(false);
      } else if (consent === "accepted") {
        setIsBannerVisible(false);
        setAnalyticsEnabled(true);
        if (typeof window !== "undefined" && (window as any).initClarity) {
          (window as any).initClarity();
        }
      } else {
        setIsBannerVisible(false);
        setAnalyticsEnabled(false);
      }
    } catch {
      // ignore
    }

    // Global listener so any footer link or button can trigger the GDPR Disclosure Modal
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("open-gdpr-modal", handleOpenModal);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-gdpr-modal", handleOpenModal);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const applyConsent = (accepted: boolean) => {
    try {
      const val = accepted ? "accepted" : "declined";
      localStorage.setItem("cookie-consent", val);
      document.cookie = `cookie_consent=${val};path=/;max-age=31536000;SameSite=Lax`;
      setIsBannerVisible(false);
      setAnalyticsEnabled(accepted);

      if (accepted && typeof window !== "undefined" && (window as any).initClarity) {
        (window as any).initClarity();
      }

      window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: val }));
    } catch {
      // ignore
    }
  };

  const handleAcceptAll = () => {
    applyConsent(true);
    setIsModalOpen(false);
  };

  const handleDeclineAll = () => {
    applyConsent(false);
    setIsModalOpen(false);
  };

  const handleSaveModalPreferences = () => {
    applyConsent(analyticsEnabled);
    setIsModalOpen(false);
  };

  const t = dict[activeLocale] || dict.en;

  return (
    <>
      {/* 1. COMPLIANT FLOATING BANNER (Swiss Titanium Slate Theme) */}
      {isBannerVisible && (
        <aside
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-50 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="p-5 sm:p-6 rounded-2xl bg-[#051C2C]/98 border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl text-slate-200 relative ring-1 ring-white/10">
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9.5px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                    EU RGPD / GDPR · ePrivacy 2002/58/EC
                  </span>
                  <h2 id="cookie-banner-title" className="text-xs font-bold text-white tracking-wide uppercase">
                    {t.bannerTitle}
                  </h2>
                </div>
              </div>
              <button
                onClick={handleDeclineAll}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
                aria-label={t.decline}
                title={t.decline}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p id="cookie-banner-desc" className="text-[11.5px] text-slate-300 leading-relaxed mb-4 text-justify">
              {t.bannerDesc}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-700/60">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline font-semibold flex items-center gap-1 transition-colors"
              >
                <Cookie className="w-3.5 h-3.5" />
                <span>{t.details}</span>
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handleDeclineAll}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-slate-300 text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-slate-400"
                >
                  {t.decline}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  {t.accept}
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* 2. INTERACTIVE GDPR & ePRIVACY DISCLOSURE MODAL */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gdpr-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-300 overflow-hidden text-slate-800 text-xs">
            {/* Modal Header */}
            <div className="bg-[#051C2C] text-white p-5 flex items-start justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="gdpr-modal-title" className="text-sm font-bold tracking-wide uppercase text-white">
                    {t.modalTitle}
                  </h3>
                  <p className="text-[10.5px] font-mono text-cyan-300 mt-0.5">
                    {t.modalSub}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
                aria-label={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-slate-700 leading-relaxed divide-y divide-slate-200">
              {/* Controller Details */}
              <div className="pb-3">
                <span className="font-mono font-bold text-[10px] uppercase text-sky-900 tracking-wider block mb-1">
                  Responsable del Tratamiento / Data Controller
                </span>
                <p className="text-slate-700 font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px]">
                  {t.controller}
                </p>
              </div>

              {/* Category 1: Essential Cookies */}
              <div className="pt-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900 text-xs">{t.catEssentialTitle}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded font-mono text-[9.5px] font-bold">
                    {t.catEssentialBadge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 text-justify">
                  {t.catEssentialDesc}
                </p>
              </div>

              {/* Category 2: Analytics & Telemetry with Toggle */}
              <div className="pt-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-cyan-600" />
                    <span className="font-bold text-slate-900 text-xs">{t.catAnalyticsTitle}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
                    <span className="ml-2 font-mono text-[10px] font-bold text-slate-700">
                      {analyticsEnabled ? t.statusAccepted : t.statusDeclined}
                    </span>
                  </label>
                </div>
                <p className="text-[11px] text-slate-600 text-justify">
                  {t.catAnalyticsDesc}
                </p>
              </div>

              {/* User Rights */}
              <div className="pt-3.5 space-y-1">
                <span className="font-bold text-slate-900 text-xs block">{t.rightsTitle}</span>
                <p className="text-[11px] text-slate-600 text-justify">
                  {t.rightsDesc}
                </p>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={handleDeclineAll}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
              >
                {t.decline}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveModalPreferences}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  {t.save}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  {t.accept}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
