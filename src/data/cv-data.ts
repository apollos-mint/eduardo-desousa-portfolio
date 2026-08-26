import { CVContent, Locale } from '@/types';
import { esData } from './locales/es';
import { enData } from './locales/en';
import { ptData } from './locales/pt';
import { nlData } from './locales/nl';
import { deData } from './locales/de';
import { frData } from './locales/fr';

export const locales: { code: Locale; name: string; nativeName: string; flag: string }[] = [
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

export const defaultLocale: Locale = 'es';

export const cvDataByLocale: Record<Locale, CVContent> = {
  es: esData,
  en: enData,
  pt: ptData,
  nl: nlData,
  de: deData,
  fr: frData,
};

// Ensure skills are populated into categories for all locales
Object.keys(cvDataByLocale).forEach((loc) => {
  const data = cvDataByLocale[loc as Locale];
  if (data?.skillCategories && data?.skills) {
    data.skillCategories.forEach((cat) => {
      cat.skills = data.skills.filter((s) => s.category === cat.id);
    });
  }
});

export function getCVData(locale: Locale): CVContent {
  return cvDataByLocale[locale] || cvDataByLocale.es;
}
