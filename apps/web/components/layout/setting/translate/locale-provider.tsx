"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import de from "../../../../../../database/locales/de.json";
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
  writeLocaleCookie,
  writeStoredLocale,
} from "./locale-constants";

type LocaleMessages = Record<string, string>;

const MESSAGES: Record<AppLocaleCode, LocaleMessages> = {
  en,
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

type LocaleProviderProps = {
  children: ReactNode;
  /** From `cookies()` in root layout so SSR matches the first client render. */
  initialLocale: AppLocaleCode;
};

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<AppLocaleCode>(initialLocale);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredLocale();
    document.documentElement.lang = stored;
    writeLocaleCookie(stored);
    setLocaleState((prev) => (stored !== prev ? stored : prev));
    setHasHydrated(true);
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    // Use the `initialLocale` prop (not a ref) until hydrated so SSR and the first
    // client pass always share the same source of truth from the layout.
    const effectiveLocale = hasHydrated ? locale : initialLocale;
    const currentMessages = MESSAGES[effectiveLocale] ?? MESSAGES[DEFAULT_APP_LOCALE];
    const fallbackMessages = MESSAGES[DEFAULT_APP_LOCALE];

    return {
      locale: effectiveLocale,
      setLocale: (nextLocale: AppLocaleCode) => {
        writeStoredLocale(nextLocale);
        writeLocaleCookie(nextLocale);
        document.documentElement.lang = nextLocale;
        setLocaleState(nextLocale);
      },
      t: (key: string) =>
        currentMessages[key] ?? fallbackMessages[key] ?? key,
    };
  }, [hasHydrated, locale, initialLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleText() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleText must be used within LocaleProvider");
  }
  return context;
}
