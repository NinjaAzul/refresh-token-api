import { TEMPLATE_EN } from './en';
import { TEMPLATE_PT_BR } from './pt-BR';

type Translations = {
  [key: string]: typeof TEMPLATE_EN | typeof TEMPLATE_PT_BR;
};

export const TEMPLATE_TRANSLATIONS: Translations = {
  'pt-BR': TEMPLATE_PT_BR,
  en: TEMPLATE_EN,
} as const;
