"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { siteDataByLocale } from "@/lib/data";
import type { SiteData } from "@/types";

/**
 * Returns site data for the current locale.
 * During SSR and before hydration, returns English (default locale)
 * to avoid hydration mismatches. After mount, returns the user's
 * selected locale.
 */
export function useSiteData(): { data: SiteData; mounted: boolean } {
  const { locale, mounted } = useLanguage();
  // Before mount, always use English to match SSR
  const effectiveLocale = mounted ? locale : "en";
  return { data: siteDataByLocale[effectiveLocale], mounted };
}