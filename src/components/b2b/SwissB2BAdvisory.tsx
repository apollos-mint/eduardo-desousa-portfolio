'use client';

import Image from 'next/image';
import { TRANSLATIONS, type SupportedLanguage } from './locales';
import { procurementReview as en } from './locales/en';
import { procurementReview as es } from './locales/es';
import { procurementReview as nl } from './locales/nl';
import { procurementReview as de } from './locales/de';
import { procurementReview as fr } from './locales/fr';
import { procurementReview as pt } from './locales/pt';

export type { SupportedLanguage, TranslationBundle } from './locales';

const reviews = { en, es, nl, de, fr, pt };
const languages = { en: 'English', es: 'Español', nl: 'Nederlands', de: 'Deutsch', fr: 'Français', pt: 'Português' };
const pageWidth = 'mx-auto w-full max-w-6xl px-6 sm:px-10';
const contactStyle = 'inline-flex min-h-12 items-center rounded-md bg-[#087da0] px-5 py-3 font-semibold text-white hover:bg-[#09637e] focus-visible:outline-2 focus-visible:outline-offset-4';

export default function SwissB2BAdvisory({ initialLanguage }: { initialLanguage?: SupportedLanguage }) {
  const lang = initialLanguage && Object.hasOwn(reviews, initialLanguage) ? initialLanguage : 'en';
  const copy = reviews[lang];
  const t = TRANSLATIONS[lang];
  const contact = `mailto:desousaej@gmail.com?subject=${encodeURIComponent(copy.contact)}`;

  return (
    <div lang={lang} className="bg-white text-[#051c2c]">
      <header className="border-b border-slate-200">
        <div className={`${pageWidth} flex min-h-20 items-center justify-between gap-4`}>
          <a href="#hero" className="flex items-center gap-3 font-bold tracking-tight">
            <Image src="/images/es-monogram-hd.png" alt="" width={38} height={38} />
            De Sousa Ops
          </a>
          <select aria-label={languages[lang]} value={lang} className="rounded-md border border-slate-300 bg-white p-2 text-sm"
            onChange={(event) => { window.location.assign(`/${event.target.value}`); }}>
            {Object.entries(languages).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </div>
      </header>

      <main>
        <section id="hero" className="relative isolate overflow-hidden bg-[#051c2c] text-white">
          <Image src="/images/hero-industrial-backdrop.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-[#051c2c]/90" />
          <div className={`${pageWidth} py-16 md:py-24`}>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{copy.headline}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">{copy.intro}</p>
            <p className="mt-4 text-sm font-semibold text-cyan-100">{copy.timing}</p>
            <a className={`mt-7 ${contactStyle}`} href={contact}>{copy.contact}</a>
          </div>
        </section>

        <section id="track-record" className={`${pageWidth} grid gap-8 py-14 md:grid-cols-[1fr_1.4fr] md:items-start`}>
          <h2 className="text-3xl font-bold tracking-tight">{copy.experience}</h2>
          <div>
            <h3 className="text-xl font-semibold">{copy.caseTitle}</h3>
            <p className="mt-3 leading-relaxed text-slate-700">{copy.caseBody}</p>
          </div>
        </section>

        <section id="profile" className="border-y border-slate-200 bg-slate-50">
          <div className={`${pageWidth} flex flex-wrap items-center gap-6 py-9 sm:flex-nowrap`}>
            <Image src="/images/eduardo-hero.jpg" alt="" width={104} height={104} className="h-26 w-26 rounded-md object-cover" />
            <div>
              <h2 className="text-2xl font-bold">Eduardo de Sousa</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-slate-700">{copy.profile}</p>
            </div>
          </div>
        </section>

        <section id="services" className={`${pageWidth} grid gap-8 py-14 md:grid-cols-[1fr_1.4fr]`}>
          <h2 className="text-3xl font-bold tracking-tight">{copy.scope}</h2>
          <div>
            <p className="leading-relaxed text-slate-700">{copy.scopeBody}</p>
            <p className="mt-5 border-l-2 border-[#087da0] bg-slate-50 p-4 leading-relaxed text-slate-700">{copy.example}</p>
            <p className="mt-5 text-lg font-semibold">{copy.pricing}</p>
            <a className={`mt-6 ${contactStyle}`} href={contact}>{copy.contact}</a>
          </div>
        </section>

        <section id="pillars" className="border-t border-slate-200 bg-slate-50">
          <div className={`${pageWidth} py-10`}>
            <h2 className="text-2xl font-bold">{copy.capabilities}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-slate-700">
              <li>{copy.quality}</li>
              <li>{copy.systems}</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-[#051c2c] text-slate-200">
        <div className={`${pageWidth} flex flex-wrap items-center gap-x-6 gap-y-3 py-7 text-sm`}>
          <span className="font-semibold text-white">De Sousa Ops</span>
          <a className="underline underline-offset-4" href={`/${lang}/legal`}>{t.footer_legal_link}</a>
          <button className="underline underline-offset-4" type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-gdpr-modal', { detail: { lang } }))}>
            {copy.privacy}
          </button>
        </div>
      </footer>
    </div>
  );
}
