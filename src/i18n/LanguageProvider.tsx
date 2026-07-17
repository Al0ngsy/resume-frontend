"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type Locale,
  defaultLocale,
  getStoredLocale,
  setStoredLocale,
} from "./config";
import { translations, type Translation } from "./translations";

interface LanguageContextValue {
  locale: Locale;
  t: Translation;
  setLocale: (locale: Locale) => void;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: defaultLocale,
  t: translations[defaultLocale],
  setLocale: () => {},
  mounted: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR and first client render use defaultLocale to avoid hydration mismatch.
  // After mount, we read the stored locale and switch if different.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredLocale();
    if (stored !== defaultLocale) {
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  // Keep <html lang="..."> in sync with the active locale.
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
  }, []);

  const value: LanguageContextValue = {
    locale,
    t: translations[locale],
    setLocale,
    mounted,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}