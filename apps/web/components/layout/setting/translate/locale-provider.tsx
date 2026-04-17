"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import de from "../../../../../../database/locales/de.json";
import enGb from "../../../../../../database/locales/en-GB.json";
import en from "../../../../../../database/locales/en.json";
import ja from "../../../../../../database/locales/ja.json";
import ko from "../../../../../../database/locales/ko.json";
import vi from "../../../../../../database/locales/vi.json";
import zhCn from "../../../../../../database/locales/zh-CN.json";
import zhTw from "../../../../../../database/locales/zh-TW.json";
import {
  DEFAULT_APP_LOCALE,
  type AppLocaleCode,
  readStoredLocale,
  writeStoredLocale,
} from "./locale-constants";

type LocaleMessages = Record<string, string>;

const MESSAGES: Record<AppLocaleCode, LocaleMessages> = {
  en,
  "en-GB": enGb,
  vi,
  ja,
  "zh-TW": zhTw,
  "zh-CN": zhCn,
  ko,
  de,
};

export function translateForLocale(code: AppLocaleCode, key: string): string {
  const current = MESSAGES[code] ?? MESSAGES[DEFAULT_APP_LOCALE];
  const fallback = MESSAGES[DEFAULT_APP_LOCALE];
  return current[key] ?? fallback[key] ?? key;
}

type LocaleContextValue = {
  locale: AppLocaleCode;
  setLocale: (nextLocale: AppLocaleCode) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocaleCode>(DEFAULT_APP_LOCALE);

  useLayoutEffect(() => {
    const stored = readStoredLocale();
    document.documentElement.lang = stored;
    if (stored !== DEFAULT_APP_LOCALE) {
      setLocaleState(stored);
    }
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const currentMessages = MESSAGES[locale] ?? MESSAGES[DEFAULT_APP_LOCALE];
    const fallbackMessages = MESSAGES[DEFAULT_APP_LOCALE];

    return {
      locale,
      setLocale: (nextLocale: AppLocaleCode) => {
        writeStoredLocale(nextLocale);
        document.documentElement.lang = nextLocale;
        setLocaleState(nextLocale);
      },
      t: (key: string) => currentMessages[key] ?? fallbackMessages[key] ?? key,
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleText() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleText must be used within LocaleProvider");
  }
  return context;
}
