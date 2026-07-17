import type { Locale } from "@/i18n/config";
import type { SiteData } from "@/types";
import siteDataEn from "./en";
import siteDataDe from "./de";
import siteDataVi from "./vi";

export type { SiteData } from "@/types";

export const siteDataByLocale: Record<Locale, SiteData> = {
  en: siteDataEn,
  de: siteDataDe,
  vi: siteDataVi,
};

/**
 * Default (English) data — used for SSR and as fallback.
 * Components that need locale-aware data should use useSiteData() instead.
 */
const siteData: SiteData = siteDataEn;

export default siteData;