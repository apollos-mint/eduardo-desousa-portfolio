'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, X } from 'lucide-react';
import { Locale } from '@/types';

interface CookieConsentBannerProps {
  currentLocale: Locale;
}

const dict: Record<Locale, {
  title: string;
  message: string;
  learnMore: string;
  accept: string;
  decline: string;
}> = {
  es: {
    title: 'Privacidad & Preferencias de Telemetría',
    message: 'Este sitio utiliza telemetría de rendimiento anónima y cookies de analítica visual (Microsoft Clarity) para optimizar la experiencia de navegación técnica.',
    learnMore: 'Aviso Legal & Privacidad',
    accept: 'Aceptar Analítica',
    decline: 'Solo Esenciales',
  },
  en: {
    title: 'Privacy & Telemetry Preferences',
    message: 'This site uses anonymous performance telemetry and visual analytics cookies (Microsoft Clarity) to optimize the technical browsing experience.',
    learnMore: 'Legal & Privacy Notices',
    accept: 'Accept Analytics',
    decline: 'Essential Only',
  },
  pt: {
    title: 'Privacidade e Preferências de Telemetria',
    message: 'Este site utiliza telemetria anónima e cookies de análise visual (Microsoft Clarity) para otimizar a experiência de navegação técnica.',
    learnMore: 'Avisos Legais e Privacidade',
    accept: 'Aceitar Analítica',
    decline: 'Apenas Essenciais',
  },
  de: {
    title: 'Datenschutz & Telemetrie-Einstellungen',
    message: 'Diese Website verwendet anonyme Leistungs-Telemetrie und Analyse-Cookies (Microsoft Clarity), um das technische Nutzererlebnis zu optimieren.',
    learnMore: 'Rechtliche Hinweise & Datenschutz',
    accept: 'Analytik Akzeptieren',
    decline: 'Nur Essenziell',
  },
  fr: {
    title: 'Confidentialité & Télémétrie',
    message: 'Ce site utilise une télémétrie de performance anonyme et des cookies d\'analyse (Microsoft Clarity) pour optimiser l\'expérience de navigation.',
    learnMore: 'Mentions Légales & Confidentialité',
    accept: 'Accepter',
    decline: 'Essentiels Uniquement',
  },
  nl: {
    title: 'Privacy & Telemetrie Voorkeuren',
    message: 'Deze site maakt gebruik van anonieme prestatietelemetrie en analytische cookies (Microsoft Clarity) om de surfervaring te optimaliseren.',
    learnMore: 'Juridische Informatie & Privacy',
    accept: 'Accepteren',
    decline: 'Alleen Noodzakelijk',
  },
};

export default function CookieConsentBanner({ currentLocale }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = dict[currentLocale] || dict.en;

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setIsVisible(true);
      } else if (consent === 'accepted') {
        // Initialize Clarity if already accepted
        if (typeof window !== 'undefined' && (window as any).initClarity) {
          (window as any).initClarity();
        }
      }
    } catch {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie-consent', 'accepted');
      setIsVisible(false);
      if (typeof window !== 'undefined' && (window as any).initClarity) {
        (window as any).initClarity();
      }
    } catch {}
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('cookie-consent', 'declined');
      setIsVisible(false);
    } catch {}
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-5 rounded-2xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl space-y-4 relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {t.title}
            </h4>
          </div>
          <button
            onClick={handleDecline}
            className="text-slate-500 hover:text-slate-300 p-1"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed text-justify">
          {t.message}{' '}
          <Link
            href={`/${currentLocale}/legal`}
            className="text-cyan-400 underline hover:text-cyan-300 transition-colors"
          >
            {t.learnMore}
          </Link>.
        </p>

        <div className="flex items-center justify-end space-x-2.5 pt-1">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium transition-all"
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
