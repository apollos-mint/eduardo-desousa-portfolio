'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Locale, CVContent } from '@/types';
import { generateVCard } from '@/lib/utils';
import confetti from 'canvas-confetti';
import HeroScene from '@/components/3d/HeroScene';
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Car,
  Download,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ContactSectionProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function ContactSection({ currentLocale, cvData }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'High-Tech Operations Leadership Opportunity',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Construct mailto link
    const to = cvData.personal.email;
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Company: ${formData.company}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  return (
    <section id="contact" className="pt-2 sm:pt-4 pb-20 sm:pb-24 relative overflow-hidden bg-gradient-to-b from-transparent via-slate-900/50 to-slate-950/80">
      {/* Truly Dynamic WebGL Background */}
      <div className="absolute inset-0 opacity-50">
        <HeroScene />
      </div>
      <div className="absolute inset-0 bg-subtle-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-950/70 dark:bg-emerald-950/70 light:bg-emerald-100 border border-emerald-500/30 text-xs font-mono text-emerald-400 dark:text-emerald-400 light:text-emerald-700">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">
              {cvData.navigation.contact} // Direct Line
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {cvData.common.contactTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            {cvData.common.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Hub with Executive Photo (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-6">
              {/* Executive Photo & Bio Header */}
              <div className="flex items-center space-x-4 pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20 shrink-0 bg-slate-900">
                  <Image
                    src="/images/eduardo-desousa.jpg"
                    alt="Eduardo de Sousa"
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Eduardo de Sousa
                  </h3>
                  <div className="text-xs text-cyan-400 font-mono mt-0.5">
                    {cvData.personal.roleTitle}
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{cvData.common.availabilityStatus}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                {/* Location */}
                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-mono uppercase text-slate-300">
                      {cvData.common.locationLabel}
                    </div>
                    <div className="font-semibold text-slate-100">{cvData.personal.location}</div>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-mono uppercase text-slate-300">
                      {cvData.common.phoneCalls}
                    </div>
                    <a
                      href={`tel:${cvData.personal.phones.callsOnly.replace(/[^0-9+]/g, '')}`}
                      className="font-semibold text-cyan-400 hover:underline"
                    >
                      {cvData.personal.phones.callsOnly}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-emerald-950/40 dark:bg-emerald-950/40 light:bg-emerald-50 border border-emerald-500/30">
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-mono uppercase text-emerald-400/90">
                      {cvData.common.whatsAppDirect} (Calls & Chat)
                    </div>
                    <a
                      href={`https://wa.me/${cvData.personal.phones.whatsAppRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-300 hover:underline"
                    >
                      {cvData.personal.phones.callsAndWhatsApp}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-mono uppercase text-slate-300">
                      {cvData.common.emailDirect}
                    </div>
                    <a
                      href={`mailto:${cvData.personal.email}`}
                      className="font-semibold text-cyan-400 hover:underline"
                    >
                      {cvData.personal.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* vCard Trigger */}
              <button
                onClick={generateVCard}
                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 dark:text-cyan-300 light:text-cyan-700 font-semibold text-xs transition-all duration-200 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>{cvData.navigation.downloadVCard}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Message Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{cvData.contact.inquiryReceived}</h3>
                  <p className="text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                    {cvData.contact.inquiryMessage}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 hover:text-white mt-4"
                  >
                    {cvData.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {cvData.common.sendMessage}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-300">
                        {cvData.contact.fullName}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={cvData.contact.fullNamePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 focus:border-cyan-500 focus:outline-none text-slate-100 text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-300">
                        {cvData.contact.email}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={cvData.contact.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 focus:border-cyan-500 focus:outline-none text-slate-100 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-300">
                        {cvData.contact.company}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={cvData.contact.companyPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 focus:border-cyan-500 focus:outline-none text-slate-100 text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-300">
                        {cvData.contact.topic}
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 focus:border-cyan-500 focus:outline-none text-slate-100 text-xs sm:text-sm"
                      >
                        <option>{cvData.contact.topicOption1}</option>
                        <option>{cvData.contact.topicOption2}</option>
                        <option>{cvData.contact.topicOption3}</option>
                        <option>{cvData.contact.topicOption4}</option>
                        <option>{cvData.contact.topicOption5}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300">
                      {cvData.contact.messageScope}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={cvData.contact.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 focus:border-cyan-500 focus:outline-none text-slate-100 text-xs sm:text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>{cvData.contact.submit}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
