import { Locale } from '@/types';
import { locales, defaultLocale, cvDataByLocale, getCVData } from '@/data/cv-data';

export { defaultLocale, locales, cvDataByLocale, getCVData };
export const validLocales: Locale[] = ['es', 'en', 'pt', 'nl', 'de', 'fr'];

export function isValidLocale(lang: string): lang is Locale {
  return validLocales.includes(lang as Locale);
}

export function getValidatedLocale(lang?: string): Locale {
  if (lang && isValidLocale(lang)) {
    return lang;
  }
  return defaultLocale;
}

export function getLocalizedPath(currentPath: string, newLocale: Locale): string {
  const segments = currentPath.split('/').filter(Boolean);
  if (segments.length === 0) {
    return `/${newLocale}`;
  }
  if (isValidLocale(segments[0])) {
    segments[0] = newLocale;
    return `/${segments.join('/')}`;
  }
  return `/${newLocale}/${segments.join('/')}`;
}

export function getAllStaticLocaleParams() {
  return validLocales.map((lang) => ({ lang }));
}

export function getAllExperienceStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];
  const baseData = cvDataByLocale[defaultLocale];
  
  validLocales.forEach((lang) => {
    baseData.experiences.forEach((exp) => {
      params.push({ lang, slug: exp.id });
    });
  });
  return params;
}

export function getAllSkillStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];
  const baseData = cvDataByLocale[defaultLocale];
  
  validLocales.forEach((lang) => {
    baseData.skills.forEach((skill) => {
      params.push({ lang, slug: skill.id });
    });
  });
  return params;
}

export function getAllEducationStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];
  const baseData = cvDataByLocale[defaultLocale];
  
  validLocales.forEach((lang) => {
    baseData.educationAndCertifications.forEach((edu) => {
      params.push({ lang, slug: edu.id });
    });
  });
  return params;
}
