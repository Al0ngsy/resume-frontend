import type { Locale } from "@/i18n/config";
import type { SiteData } from "@/types";
import siteDataEn from "./en";
import siteDataDe from "./de";
import siteDataVi from "./vi";

export const siteDataByLocale: Record<Locale, SiteData> = {
  en: siteDataEn,
  de: siteDataDe,
  vi: siteDataVi,
};