// DE SOUSA // Operations & Supply Chain Advisory
// Aesthetic: Executive Management Consulting (McKinsey & Company / Deloitte Advisory / Palantir Enterprise Precision)
// Clean architectural white canvas, McKinsey Midnight Navy (#051C2C), Corporate Blue (#0066CC), and subtle Deloitte Green (#16A34A)
// 100% Grounded in Eduardo de Sousa's authentic operational track record:
// - Direct Factory Sourcing (China & India factory-gate agreements, -75% BOM, FCL logistics)
// - Automotive OEM moving line cadence (VDL Nedcar: BMW Group & MINI Cooper, 110-120 cars/shift, digital torque wrenches, -15% defects)
// - High-Tech Semiconductor Packaging Preparation & Electromechanical Sub-Assembly (HQ Pack: ASML lithography packaging, pre-cleanroom staging, TÜV winch recertification)
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
  Cookie,
  Scale
} from 'lucide-react';
import InfiniteBrandMarquee from '@/components/ui/InfiniteBrandMarquee';
import { Locale } from '@/types';

import {
  TRANSLATIONS,
  whatsAppMessages,
  whatsAppLabels,
  type SupportedLanguage,
  type TranslationBundle,
} from './locales';

export type { SupportedLanguage, TranslationBundle };


function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.889-9.885 9.889m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

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
      tag: t.tool4_tag,
      status: t.tool4_status,
      title: t.tool4_title,
      scope: t.tool4_scope,
      desc: t.tool4_desc,
    },
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
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#0066CC] selection:text-white w-full max-w-full overflow-x-hidden">
      
      {/* 1. TOP INSTITUTIONAL TRUST RIBBON (McKinsey / Deloitte Style) */}
      <div className="bg-[#051C2C] text-slate-200 text-[11px] sm:text-xs py-2.5 sm:py-3 px-4 sm:px-6 lg:px-8 border-b border-slate-800 min-h-[38px] sm:min-h-[42px] flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </span>
            <span className="font-semibold tracking-wide text-white truncate">
              {t.status_ribbon}
            </span>
            <span className="text-slate-500 hidden sm:inline shrink-0">|</span>
            <span className="text-emerald-400 font-medium hidden sm:inline shrink-0">{t.status_mode}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-400 shrink-0">
            <span className="text-emerald-400">●</span>
            <span>{t.ribbon_direct_engagement}</span>
          </div>
        </div>
      </div>

      {/* 2. CORPORATE NAVIGATION (High-Contrast Border, Balanced Spacing, Zero Cutoff) */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b-2 border-slate-300 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 sm:gap-4">
            {/* Brand Monogram & Wordmark */}
            <a href="#hero" className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] rounded-lg p-1 -ml-1 transition-colors">
              <div className="relative shrink-0 w-[46px] h-[46px] sm:w-[54px] sm:h-[54px] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/es-monogram-hd.png"
                  alt="De Sousa Ops Monogram"
                  width={54}
                  height={54}
                  unoptimized
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(4,11,20,0.18)]"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  priority
                />
              </div>
              <div className="flex flex-col shrink-0">
                <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#040B14] group-hover:text-[#0066CC] transition-colors uppercase leading-none sm:leading-tight">
                  De Sousa Ops
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500 uppercase whitespace-nowrap mt-0.5">
                  {t.nav_brand_sub_title}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Visible on xl: >= 1280px to prevent crowding/cutting off CTA on 1024-1279px screens) */}
            <nav className="hidden xl:flex items-center gap-2 2xl:gap-3 mr-2">
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

            {/* Language Selector & CTA (Clean separation, shrink-0, zero clipping) */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 pl-3 sm:pl-4 border-l border-slate-300 shrink-0">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 min-h-[42px] px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-300 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] cursor-pointer"
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
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 min-h-[38px] cursor-pointer ${
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

              {/* WhatsApp Quick Direct Link (Visible on 2xl to avoid crowding primary CTA) */}
              <a
                href={`https://wa.me/34661440045?text=${encodeURIComponent(whatsAppMessages[lang])}`}
                target="_blank"
                rel="noopener noreferrer"
                title={whatsAppLabels[lang]}
                className="hidden 2xl:inline-flex items-center justify-center min-h-[42px] px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-md transition-colors gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600 fill-current" />
                <span>WhatsApp</span>
              </a>

              {/* Primary Header CTA (Never truncated, whitespace-nowrap, shrink-0) */}
              <a
                href="#advisory-inquiry"
                className="inline-flex items-center justify-center min-h-[42px] px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#040B14] hover:bg-[#081a30] active:scale-[0.99] rounded-lg border border-[#00D2FF]/40 hover:border-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
              >
                {t.nav_cta}
              </a>

              {/* Mobile/Tablet Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden inline-flex items-center justify-center min-h-[42px] min-w-[42px] p-2 text-slate-700 hover:bg-slate-100 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] cursor-pointer shrink-0"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg">
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
              <div className="pt-3 space-y-2">
                <a
                  href="#advisory-inquiry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center min-h-[48px] px-5 py-3 text-sm font-semibold text-white bg-[#040B14] hover:bg-[#081a30] border border-[#00D2FF]/40 rounded-lg shadow-sm transition-colors"
                >
                  {t.nav_cta}
                </a>
                <a
                  href={`https://wa.me/34661440045?text=${encodeURIComponent(whatsAppMessages[lang])}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center min-h-[48px] px-5 py-3 text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg shadow-xs transition-colors gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600 fill-current" />
                  <span>{whatsAppLabels[lang]}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* 3. EXECUTIVE HERO SECTION (Industrial Background, Grounded Proof) */}
      <section id="hero" className="scroll-mt-28 relative bg-slate-100 pt-8 pb-14 lg:pt-12 lg:pb-18 border-b-2 border-slate-300 overflow-hidden">
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
              <a
                href={`https://wa.me/34661440045?text=${encodeURIComponent(whatsAppMessages[lang])}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 text-sm font-semibold text-emerald-900 bg-emerald-50/90 hover:bg-emerald-100 border border-emerald-300 hover:border-emerald-400 active:scale-[0.99] rounded-lg shadow-2xs hover:shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600 fill-current" />
                <span>{whatsAppLabels[lang]}</span>
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

            {/* DUAL INTERACTIVE TICKER: Tier-1 Manufacturing / Tech Stack & Global Logistics Carriers */}
            <div className="mt-8 pt-7 border-t border-slate-200/90">
              <InfiniteBrandMarquee currentLocale={lang as Locale} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE PILLARS OF ADVISORY PRACTICE (Deloitte Grid, Expandable SOP Drawers) */}
      {/* 4. ADVISORY PRACTICE PILLARS & VERIFIED TRACK RECORD (Merged Executive Dossiers) */}
            {/* 4. TRACK RECORD OF INDUSTRIAL PROFESSIONAL EXPERIENCE (Horizontal Motion Architecture) */}
      <section id="pillars" className="scroll-mt-24 relative bg-slate-50 py-10 lg:py-14 border-b border-slate-300 overflow-hidden">
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
                    <span className="text-[10px] font-mono font-bold text-[#0066CC] uppercase">{t.pillar_prefix} 01</span>
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
                    <span className="text-[10px] font-mono font-bold text-[#0066CC] uppercase">{t.pillar_prefix} 02</span>
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
                    <span className="text-[10px] font-mono font-bold text-[#0066CC] uppercase">{t.pillar_prefix} 03</span>
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
                        [ TRANSCONTINENTAL FCL • FACTORY GATE ]
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
                      <span className="text-emerald-400 font-bold">HIGH-TECH PRE-CLEANROOM PACKAGING</span>
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
                {t.tooling_banner_pill}
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
                    {t.calc_simulator_badge}
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
                    <span>{t.calc_slider_min_label}</span>
                    <span>{t.calc_slider_std_label}</span>
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
      <section id="profile" className="scroll-mt-24 bg-white py-10 lg:py-14 border-b border-slate-200 overflow-hidden">
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
                    href={`https://wa.me/34661440045?text=${encodeURIComponent(whatsAppMessages[lang])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 mr-2 text-emerald-600 fill-current" />
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
      <section id="methodology" className="scroll-mt-24 bg-white py-10 lg:py-14 border-b border-slate-200 overflow-hidden">
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
                  href={`https://wa.me/34661440045?text=${encodeURIComponent(whatsAppMessages[lang])}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-700 font-medium"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600 fill-current" />
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
                href={`https://wa.me/34661440045?text=Hello%20Eduardo,%20I%20have%20submitted%20mandate%20dossier%20${bookingModal.mandateId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 mr-2 text-emerald-600 fill-current" />
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

          {/* NOMINATIVE FAIR USE & TRADEMARK DISCLAIMER NOTICE */}
          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed text-justify sm:text-left">
            <p className="font-mono text-slate-400">
              <strong className="text-slate-300 uppercase tracking-wider">
                {lang === 'es' && 'Aviso de Marcas y Propiedad Intelectual: '}
                {lang === 'en' && 'Trademark & Intellectual Property Notice: '}
                {lang === 'de' && 'Marken- und Urheberrechtshinweis: '}
                {lang === 'nl' && 'Kennisgeving van Merken & Intellectueel Eigendom: '}
                {lang === 'fr' && 'Mention relative aux Marques et à la Propriété Intellectuelle : '}
                {lang === 'pt' && 'Aviso de Marcas e Propriedade Intelectual: '}
              </strong>
              {t.footer_trademark_disclaimer}
            </p>
          </div>

          {/* GDPR, COOKIE GOVERNANCE & LEGAL DOSSIER BAR */}
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

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`/${lang}/legal`}
                className="font-mono text-cyan-400 hover:text-cyan-300 underline font-semibold flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 hover:border-cyan-500/50"
              >
                <Scale className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.footer_legal_link}</span>
              </a>

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
        </div>
      </footer>

      {/* 13. FLOATING WHATSAPP ACTION BUTTON (Direct Principal Channel) */}
      <aside aria-label="Quick WhatsApp contact" className="fixed bottom-6 left-6 z-40 print:hidden">
        <a
          href={`https://wa.me/34661440045?text=${encodeURIComponent(whatsAppMessages[lang])}`}
          target="_blank"
          rel="noopener noreferrer"
          title={whatsAppLabels[lang]}
          aria-label={whatsAppLabels[lang]}
          className="group flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#051C2C]/95 hover:bg-[#08283f] backdrop-blur-md text-white rounded-full border border-emerald-500/60 shadow-lg hover:shadow-emerald-500/25 active:scale-95 transition-all duration-300"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </span>
          <WhatsAppIcon className="w-5 h-5 text-emerald-400 fill-current shrink-0" />
          <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
            WhatsApp
          </span>
          <span className="text-[11px] font-mono text-emerald-300/90 hidden md:inline-block">
            +34 661 440 045
          </span>
        </a>
      </aside>
    </div>
  );
}
