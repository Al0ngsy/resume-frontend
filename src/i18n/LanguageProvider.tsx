"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
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
}

// Tiny external store for the persisted locale. useSyncExternalStore reads it
// with the default locale as the server snapshot, so SSR and the first client
// render agree (no hydration mismatch); after hydration React flips to the
// stored locale.
const localeListeners = new Set<() => void>();

function subscribeLocale(onStoreChange: () => void): () => void {
  localeListeners.add(onStoreChange);
  return () => {
    localeListeners.delete(onStoreChange);
  };
}

function getLocaleSnapshot(): Locale {
  return getStoredLocale();
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: defaultLocale,
  t: translations[defaultLocale],
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    () => defaultLocale,
  );

  const setLocale = useCallback((newLocale: Locale) => {
    setStoredLocale(newLocale);
    localeListeners.forEach((listener) => listener());
  }, []);

  // Keep <html lang="..."> in sync with the active locale.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value: LanguageContextValue = {
    locale,
    t: translations[locale],
    setLocale,
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
