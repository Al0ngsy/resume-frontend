"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { siteDataByLocale } from "@/lib/data";
import { PROJECT_ORDER } from "@/lib/data/projectOrder";
import type { SiteData } from "@/types";

const orderIndex = (id: string): number => {
  const idx = PROJECT_ORDER.indexOf(id);
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
};

/**
 * Returns site data for the current locale, with projects sorted by
 * PROJECT_ORDER (see src/lib/data/projectOrder.ts — edit that file
 * to rearrange projects).
 * During SSR and before hydration, returns English (default locale)
 * to avoid hydration mismatches. After mount, returns the user's
 * selected locale.
 */
export function useSiteData(): { data: SiteData; mounted: boolean } {
  const { locale, mounted } = useLanguage();
  // Before mount, always use English to match SSR
  const effectiveLocale = mounted ? locale : "en";
  const source = siteDataByLocale[effectiveLocale];
  return {
    data: {
      ...source,
      projects: [...source.projects].sort(
        (a, b) => orderIndex(a.id) - orderIndex(b.id),
      ),
    },
    mounted,
  };
}
