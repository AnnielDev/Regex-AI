import { createI18n } from "vue-i18n";

type Locale = "en" | "es";
type MessageSchema = Record<string, unknown>;

type LocaleModule = {
  default: Record<string, unknown>;
};

const localeModules = import.meta.glob<LocaleModule>("./locales/*/*.json", { eager: true });

const messages = Object.entries(localeModules).reduce<Record<string, MessageSchema>>(
  (acc, [path, module]) => {
    const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
    if (!match) return acc;

    const [, locale, namespace] = match;
    if (!acc[locale]) {
      acc[locale] = {};
    }

    acc[locale][namespace] = module.default;
    return acc;
  },
  {},
);

const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "regex-ai-locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return savedLocale === "en" || savedLocale === "es" ? savedLocale : DEFAULT_LOCALE;
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: "en",
  messages: messages as Record<Locale, MessageSchema>,
} as any);

export const SUPPORTED_LOCALES: Locale[] = ["en", "es"];
export default i18n;
