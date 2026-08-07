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
 * Before hydration the provider's server snapshot yields English, so SSR
 * and the first client render agree; after hydration it flips to the
 * user's stored locale.
 */
export function useSiteData(): { data: SiteData } {
  const { locale } = useLanguage();
  const source = siteDataByLocale[locale];
  return {
    data: {
      ...source,
      projects: [...source.projects].sort(
        (a, b) => orderIndex(a.id) - orderIndex(b.id),
      ),
    },
  };
}
