import { MetadataRoute } from 'next';
import { validLocales, defaultLocale } from '@/lib/i18n';
import { cvDataByLocale } from '@/data/cv-data';

const BASE_URL = 'https://desousaops.vercel.app';
const STATIC_LAST_MOD = new Date('2026-11-15T00:00:00.000Z');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const baseData = cvDataByLocale[defaultLocale];

  // 1. Root canonical entry
  const rootLanguages: Record<string, string> = {};
  validLocales.forEach((l) => {
    rootLanguages[l] = `${BASE_URL}/${l}`;
  });
  rootLanguages['x-default'] = `${BASE_URL}/en`;

  entries.push({
    url: `${BASE_URL}/`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: rootLanguages,
    },
  });

  // 2. Core section paths
  const sectionPaths = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/experience', priority: 0.85, freq: 'monthly' as const },
    { path: '/skills', priority: 0.85, freq: 'monthly' as const },
    { path: '/certifications', priority: 0.8, freq: 'monthly' as const },
    { path: '/education', priority: 0.75, freq: 'monthly' as const },
    { path: '/contact', priority: 0.9, freq: 'monthly' as const },
    { path: '/legal', priority: 0.3, freq: 'yearly' as const },
  ];

  sectionPaths.forEach(({ path, priority, freq }) => {
    validLocales.forEach((lang) => {
      const languages: Record<string, string> = {};
      validLocales.forEach((l) => {
        languages[l] = `${BASE_URL}/${l}${path}`;
      });
      languages['x-default'] = `${BASE_URL}/en${path}`;

      entries.push({
        url: `${BASE_URL}/${lang}${path}`,
        lastModified: STATIC_LAST_MOD,
        changeFrequency: freq,
        priority,
        alternates: {
          languages,
        },
      });
    });
  });

  // 3. Dynamic experience deep-dive URLs
  baseData.experiences.forEach((exp) => {
    validLocales.forEach((lang) => {
      const languages: Record<string, string> = {};
      validLocales.forEach((l) => {
        languages[l] = `${BASE_URL}/${l}/experience/${exp.id}`;
      });
      languages['x-default'] = `${BASE_URL}/en/experience/${exp.id}`;

      entries.push({
        url: `${BASE_URL}/${lang}/experience/${exp.id}`,
        lastModified: STATIC_LAST_MOD,
        changeFrequency: 'monthly',
        priority: 0.75,
        alternates: {
          languages,
        },
      });
    });
  });

  // 4. Dynamic skill deep-dive URLs
  baseData.skills.forEach((skill) => {
    validLocales.forEach((lang) => {
      const languages: Record<string, string> = {};
      validLocales.forEach((l) => {
        languages[l] = `${BASE_URL}/${l}/skills/${skill.id}`;
      });
      languages['x-default'] = `${BASE_URL}/en/skills/${skill.id}`;

      entries.push({
        url: `${BASE_URL}/${lang}/skills/${skill.id}`,
        lastModified: STATIC_LAST_MOD,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages,
        },
      });
    });
  });

  // 5. Dynamic education deep-dive URLs
  baseData.educationAndCertifications.forEach((edu) => {
    validLocales.forEach((lang) => {
      const languages: Record<string, string> = {};
      validLocales.forEach((l) => {
        languages[l] = `${BASE_URL}/${l}/education/${edu.id}`;
      });
      languages['x-default'] = `${BASE_URL}/en/education/${edu.id}`;

      entries.push({
        url: `${BASE_URL}/${lang}/education/${edu.id}`,
        lastModified: STATIC_LAST_MOD,
        changeFrequency: 'monthly',
        priority: 0.65,
        alternates: {
          languages,
        },
      });
    });
  });

  return entries;
}
