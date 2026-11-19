'use client';

import React from 'react';
import { Cookie } from 'lucide-react';
import { Locale } from '@/types';

interface ManageCookiesButtonProps {
  currentLocale: Locale;
  label?: string;
  className?: string;
}

export default function ManageCookiesButton({
  currentLocale,
  label,
  className = "inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
}: ManageCookiesButtonProps) {
  const defaultLabels: Record<Locale, string> = {
    es: 'Abrir Panel de Configuración de Cookies (RGPD)',
    en: 'Open Cookie & Privacy Preference Center (GDPR)',
    de: 'Cookie- & Datenschutz-Präferenzzentrum öffnen (DSGVO)',
    nl: 'Cookie- & Privacyvoorkeuren beheren (AVG)',
    fr: 'Ouvrir le Centre de Préférences de Cookies (RGPD)',
    pt: 'Abrir Centro de Preferências de Cookies (RGPD)',
  };

  const text = label || defaultLabels[currentLocale] || defaultLabels.en;

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-gdpr-modal', { detail: { lang: currentLocale } }));
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      <Cookie className="w-4 h-4 text-emerald-600 shrink-0" />
      <span>{text}</span>
    </button>
  );
}
