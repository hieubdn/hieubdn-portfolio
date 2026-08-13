import type { AppLocaleCode } from "@/components/layout/setting/translate/locale-constants";

type LocaleMessages = Record<string, string>;

// Server-side loader used by the root layout to inline only the active
// locale's dictionary into the RSC payload instead of bundling all locales.
const LOADERS: Record<AppLocaleCode, () => Promise<LocaleMessages>> = {
  en: () => import("../../../../database/locales/en.json").then((m) => m.default),
  vi: () => import("../../../../database/locales/vi.json").then((m) => m.default),
  ja: () => import("../../../../database/locales/ja.json").then((m) => m.default),
  "zh-CN": () =>
    import("../../../../database/locales/zh-CN.json").then((m) => m.default),
  ko: () => import("../../../../database/locales/ko.json").then((m) => m.default),
  de: () => import("../../../../database/locales/de.json").then((m) => m.default),
  fr: () => import("../../../../database/locales/fr.json").then((m) => m.default),
};

export async function loadLocaleMessages(
  code: AppLocaleCode,
): Promise<LocaleMessages> {
  return LOADERS[code]();
}
