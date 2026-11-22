import { SupportedLanguage, TranslationBundle } from './types';
import { en } from './en';
import { es } from './es';
import { nl } from './nl';
import { de } from './de';
import { fr } from './fr';
import { pt } from './pt';

export const TRANSLATIONS: Record<SupportedLanguage, TranslationBundle> = {
  en,
  es,
  nl,
  de,
  fr,
  pt,
};

export const whatsAppMessages: Record<SupportedLanguage, string> = {
  es: 'Hola Eduardo, me gustaría consultar una propuesta de operaciones industriales.',
  en: 'Hello Eduardo, I would like to consult on an industrial operations and supply chain advisory engagement.',
  de: 'Hallo Eduardo, ich würde gerne eine Beratung zu Industrie- und Lieferkettenoperationen anfragen.',
  nl: 'Hallo Eduardo, ik wil graag overleggen over industriële operaties en supply chain advisory.',
  fr: 'Bonjour Eduardo, je souhaiterais échanger sur un accompagnement en opérations industrielles et supply chain.',
  pt: 'Olá Eduardo, gostaria de consultar uma proposta de assessoria em operações industriais e supply chain.',
};

export const whatsAppLabels: Record<SupportedLanguage, string> = {
  es: 'WhatsApp Directo (+34 661 440 045)',
  en: 'Direct WhatsApp (+34 661 440 045)',
  de: 'Direkt über WhatsApp (+34 661 440 045)',
  nl: 'Direct via WhatsApp (+34 661 440 045)',
  fr: 'WhatsApp Immédiat (+34 661 440 045)',
  pt: 'WhatsApp Direto (+34 661 440 045)',
};

export type { SupportedLanguage, TranslationBundle };
