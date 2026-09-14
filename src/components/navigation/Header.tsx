'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Locale, CVContent } from '@/types';
import { locales } from '@/data/cv-data';
import { getLocalizedPath } from '@/lib/i18n';
import { generateVCard } from '@/lib/utils';
import {
  Globe,
  ChevronDown,
  Menu,
  X,
  FileText,
  FileDown,
  PhoneCall,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function Header({ currentLocale, cvData }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeLang = locales.find((l) => l.code === currentLocale) || locales[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${currentLocale}`, label: cvData.navigation.about },
    { href: `/${currentLocale}/experience`, label: cvData.navigation.experience },
    { href: `/${currentLocale}/skills`, label: cvData.navigation.skills },
    { href: `/${currentLocale}/certifications`, label: cvData.navigation.certifications },
    { href: `/${currentLocale}/contact`, label: cvData.navigation.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-md dark:shadow-2xl py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo with Avatar */}
        <Link
          href={`/${currentLocale}`}
          prefetch={true}
          onClick={() => {
            try {
              sessionStorage.setItem('eds-intro-seen', 'true');
              sessionStorage.setItem('eds-navigated-internally', 'true');
            } catch {}
          }}
          className="flex items-center space-x-3 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <div className="w-full h-full rounded-[10px] overflow-hidden relative bg-slate-900">
              <Image
                src="/images/eduardo-desousa.jpg"
                alt="Eduardo de Sousa"
                fill
                sizes="40px"
                className="object-cover object-top"
              />
            </div>
          </div>
          <div>
            <span className="block font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Eduardo de Sousa
            </span>
            <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">
              {cvData.common.portraitSubtitle.split('//')[0].trim()}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/90 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              onClick={() => {
                try {
                  sessionStorage.setItem('eds-intro-seen', 'true');
                  sessionStorage.setItem('eds-navigated-internally', 'true');
                } catch {}
              }}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="hidden sm:inline">{activeLang.flag}</span>
              <span className="font-mono">{activeLang.code.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-700 dark:border-slate-700 light:border-slate-200 shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 dark:border-slate-800 light:border-slate-100">
                    {cvData.navigation.switchLanguage}
                  </div>
                  {locales.map((loc) => {
                    const targetPath = getLocalizedPath(pathname || '/', loc.code);
                    return (
                      <Link
                        key={loc.code}
                        href={targetPath}
                        onClick={() => setLangDropdownOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 text-xs hover:bg-cyan-500/10 hover:text-cyan-300 dark:hover:text-cyan-300 light:hover:text-cyan-600 transition-colors ${
                          loc.code === currentLocale
                            ? 'text-cyan-400 font-semibold bg-cyan-950/30 dark:bg-cyan-950/30 light:bg-cyan-50'
                            : 'text-slate-300 dark:text-slate-300 light:text-slate-700'
                        }`}
                      >
                        <span className="flex items-center space-x-2">
                          <span className="text-base">{loc.flag}</span>
                          <span>{loc.nativeName}</span>
                        </span>
                        <span className="font-mono text-[10px] text-slate-500 uppercase">
                          {loc.code}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Quick Localized CV Download CTA */}
          <a
            href={`/Eduardo_de_Sousa_Resume_${currentLocale}.pdf`}
            download={`Eduardo_de_Sousa_Resume_${currentLocale.toUpperCase()}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors"
            title={cvData.navigation.downloadPdf || 'Download Executive CV (PDF)'}
          >
            <FileDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>CV</span>
          </a>

          {/* Quick Contact CTA */}
          <a
            href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}?text=${encodeURIComponent(
              cvData.common.whatsAppPrefill
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 dark:bg-slate-950/95 light:bg-white/95 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 px-4 pt-4 pb-6 mt-3 space-y-4 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 hover:bg-slate-900 dark:hover:bg-slate-900 light:hover:bg-slate-100 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col space-y-2">
            <a
              href={`/Eduardo_de_Sousa_Resume_${currentLocale}.pdf`}
              download={`Eduardo_de_Sousa_Resume_${currentLocale.toUpperCase()}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border border-cyan-500/40 text-cyan-300 dark:text-cyan-300 light:text-cyan-700 text-xs font-semibold"
            >
              <FileDown className="w-4 h-4 text-cyan-400" />
              <span>{cvData.navigation.downloadPdf || 'Download Executive CV (PDF)'}</span>
            </a>

            <button
              onClick={() => {
                generateVCard(cvData.personal.roleTitle, cvData.personal.headline);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 border border-slate-700 text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs font-medium"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>{cvData.navigation.downloadVCard}</span>
            </button>

            <a
              href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 dark:text-emerald-300 light:text-emerald-600 text-xs font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct (+34 661 440 045)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
