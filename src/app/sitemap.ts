import { MetadataRoute } from 'next';
import { validLocales, defaultLocale } from '@/lib/i18n';
import { cvDataByLocale } from '@/data/cv-data';

const BASE_URL = 'https://eduardodesousa.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const baseData = cvDataByLocale[defaultLocale];

  // Core static section paths
  const sectionPaths = [
    '',
    '/experience',
    '/skills',
    '/certifications',
    '/education',
    '/contact',
    '/legal',
  ];

  // 1. Generate section URLs with hreflang alternates
  sectionPaths.forEach((path) => {
    validLocales.forEach((lang) => {
      const languages: Record<string, string> = {};
      validLocales.forEach((l) => {
        languages[l] = `${BASE_URL}/${l}${path}`;
      });
      languages['x-default'] = `${BASE_URL}/en${path}`;

      entries.push({
        url: `${BASE_URL}/${lang}${path}`,
        lastModified: currentDate,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : path === '/legal' ? 0.4 : 0.8,
        alternates: {
          languages,
        },
      });
    });
  });

  // 2. Generate dynamic experience deep-dive URLs
  baseData.experiences.forEach((exp) => {
    validLocales.forEach((lang) => {
      const languages: Record<string, string> = {};
      validLocales.forEach((l) => {
        languages[l] = `${BASE_URL}/${l}/experience/${exp.id}`;
      });
      languages['x-default'] = `${BASE_URL}/en/experience/${exp.id}`;

      entries.push({
        url: `${BASE_URL}/${lang}/experience/${exp.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.75,
        alternates: {
          languages,
        },
      });
    });
  });

  // 3. Generate dynamic skill deep-dive URLs
  baseData.skills.forEach((skill) => {
    validLocales.forEach((lang) => {
      const languages: Record<string, string> = {};
      validLocales.forEach((l) => {
        languages[l] = `${BASE_URL}/${l}/skills/${skill.id}`;
      });
      languages['x-default'] = `${BASE_URL}/en/skills/${skill.id}`;

      entries.push({
        url: `${BASE_URL}/${lang}/skills/${skill.id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages,
        },
      });
    });
  });

  // 4. Generate dynamic education/certification deep-dive URLs
  baseData.educationAndCertifications.forEach((edu) => {
    validLocales.forEach((lang) => {
      const languages: Record<string, string> = {};
      validLocales.forEach((l) => {
        languages[l] = `${BASE_URL}/${l}/education/${edu.id}`;
      });
      languages['x-default'] = `${BASE_URL}/en/education/${edu.id}`;

      entries.push({
        url: `${BASE_URL}/${lang}/education/${edu.id}`,
        lastModified: currentDate,
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
