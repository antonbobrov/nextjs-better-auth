import { routing, type TLocale } from '@/i18n/routing';

const LOCALE_LABELS: Record<TLocale, string> = {
  en: 'English',
};

export const LOCALE_OPTIONS = routing.locales.map((id) => ({
  id,
  label: LOCALE_LABELS[id],
}));
