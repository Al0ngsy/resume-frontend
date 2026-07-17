export type Locale = "en" | "de" | "vi";

export const defaultLocale: Locale = "en";

export const locales: Locale[] = ["en", "de", "vi"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  vi: "Tiếng Việt",
};

export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  vi: "VI",
};

const STORAGE_KEY = "resume-locale";

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && locales.includes(stored as Locale)) {
      return stored as Locale;
    }
  } catch {
    // localStorage might be unavailable
  }
  return defaultLocale;
}

export function setStoredLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // ignore
  }
}