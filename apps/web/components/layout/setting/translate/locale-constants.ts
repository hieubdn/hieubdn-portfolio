export const PROFILE_LOCALE_STORAGE_KEY = "profile-locale";

export type AppLocaleCode = "vi" | "ja" | "zh-TW" | "zh-CN" | "ko" | "de" | "en" | "en-GB";

export const APP_LOCALE_CODES: readonly AppLocaleCode[] = [
  "en",
  "en-GB",
  "vi",
  "ja",
  "zh-TW",
  "zh-CN",
  "ko",
  "de",
] as const;

export const DEFAULT_APP_LOCALE: AppLocaleCode = "en";

export const LOCALE_OPTIONS: readonly {
  code: AppLocaleCode;
  nativeLabel: string;
  labelInVietnamese: string;
}[] = [
  { code: "vi", nativeLabel: "Tiếng Việt", labelInVietnamese: "Tiếng Việt" },
  { code: "en", nativeLabel: "English (US)", labelInVietnamese: "Tiếng Anh (Mỹ)" },
  { code: "en-GB", nativeLabel: "English (UK)", labelInVietnamese: "Tiếng Anh (Anh)" },
  { code: "ja", nativeLabel: "日本語", labelInVietnamese: "Tiếng Nhật" },
  {
    code: "zh-TW",
    nativeLabel: "繁體中文",
    labelInVietnamese: "Tiếng Trung phồn thể",
  },
  {
    code: "zh-CN",
    nativeLabel: "简体中文",
    labelInVietnamese: "Tiếng Trung giản thể",
  },
  { code: "ko", nativeLabel: "한국어", labelInVietnamese: "Tiếng Hàn" },
  { code: "de", nativeLabel: "Deutsch", labelInVietnamese: "Tiếng Đức" },
] as const;

export function isAppLocaleCode(value: string): value is AppLocaleCode {
  return (APP_LOCALE_CODES as readonly string[]).includes(value);
}

export function readStoredLocale(): AppLocaleCode {
  if (typeof window === "undefined") {
    return DEFAULT_APP_LOCALE;
  }
  try {
    const raw = localStorage.getItem(PROFILE_LOCALE_STORAGE_KEY);
    if (raw && isAppLocaleCode(raw)) {
      return raw;
    }
  } catch {
    /* storage unavailable */
  }
  return DEFAULT_APP_LOCALE;
}

export function writeStoredLocale(code: AppLocaleCode): void {
  try {
    localStorage.setItem(PROFILE_LOCALE_STORAGE_KEY, code);
  } catch {
    /* preference still applies for this session */
  }
}
