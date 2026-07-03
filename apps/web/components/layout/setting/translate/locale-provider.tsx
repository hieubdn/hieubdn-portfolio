"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "../../../../../../database/locales/en.json";
import {
  DEFAULT_APP_LOCALE,
  type AppLocaleCode,
  readStoredLocale,
  writeLocaleCookie,
  writeStoredLocale,
} from "./locale-constants";

type LocaleMessages = Record<string, string>;

const FALLBACK_MESSAGES: LocaleMessages = en;

// Only `en` ships in the main bundle. The active non-en dictionary arrives from
// the server via `initialMessages`; the rest load on demand when the user
// switches language.
const DICTIONARY_LOADERS: Record<AppLocaleCode, () => Promise<LocaleMessages>> = {
  en: () => Promise.resolve(FALLBACK_MESSAGES),
  vi: () =>
    import("../../../../../../database/locales/vi.json").then((m) => m.default),
  ja: () =>
    import("../../../../../../database/locales/ja.json").then((m) => m.default),
  "zh-TW": () =>
    import("../../../../../../database/locales/zh-TW.json").then((m) => m.default),
  "zh-CN": () =>
    import("../../../../../../database/locales/zh-CN.json").then((m) => m.default),
  ko: () =>
    import("../../../../../../database/locales/ko.json").then((m) => m.default),
  de: () =>
    import("../../../../../../database/locales/de.json").then((m) => m.default),
};

const loadedMessages = new Map<AppLocaleCode, LocaleMessages>([
  [DEFAULT_APP_LOCALE, FALLBACK_MESSAGES],
]);

async function loadMessages(code: AppLocaleCode): Promise<LocaleMessages> {
  const cached = loadedMessages.get(code);
  if (cached) return cached;
  const messages = await DICTIONARY_LOADERS[code]();
  loadedMessages.set(code, messages);
  return messages;
}

/** Translate against an already-loaded locale; falls back to `en` for keys
 * (or whole dictionaries) that are not available yet. */
export function translateForLocale(code: AppLocaleCode, key: string): string {
  const current = loadedMessages.get(code) ?? FALLBACK_MESSAGES;
  return current[key] ?? FALLBACK_MESSAGES[key] ?? key;
}

type LocaleContextValue = {
  locale: AppLocaleCode;
  /** Resolves once the target dictionary is loaded and applied. */
  setLocale: (nextLocale: AppLocaleCode) => Promise<void>;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  children: ReactNode;
  /** From `cookies()` in root layout so SSR matches the first client render. */
  initialLocale: AppLocaleCode;
  /** Dictionary for `initialLocale`, loaded server-side (omitted for `en`). */
  initialMessages?: LocaleMessages;
};

export function LocaleProvider({
  children,
  initialLocale,
  initialMessages,
}: LocaleProviderProps) {
  // Register the server-provided dictionary before the first render so SSR and
  // hydration translate identically. Idempotent, safe under Strict Mode.
  if (initialMessages && !loadedMessages.has(initialLocale)) {
    loadedMessages.set(initialLocale, initialMessages);
  }

  const [locale, setLocaleState] = useState<AppLocaleCode>(initialLocale);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredLocale();
    document.documentElement.lang = stored;
    writeLocaleCookie(stored);
    if (stored !== initialLocale) {
      loadMessages(stored)
        .then(() => setLocaleState(stored))
        .catch((err) => {
          console.error("[i18n] Failed to load locale dictionary:", stored, err);
        });
    }
    setHasHydrated(true);
  }, [initialLocale]);

  const value = useMemo<LocaleContextValue>(() => {
    // Use the `initialLocale` prop (not a ref) until hydrated so SSR and the first
    // client pass always share the same source of truth from the layout.
    const effectiveLocale = hasHydrated ? locale : initialLocale;
    const currentMessages =
      loadedMessages.get(effectiveLocale) ?? FALLBACK_MESSAGES;

    return {
      locale: effectiveLocale,
      setLocale: async (nextLocale: AppLocaleCode) => {
        try {
          await loadMessages(nextLocale);
        } catch (err) {
          console.error(
            "[i18n] Failed to load locale dictionary:",
            nextLocale,
            err,
          );
          return;
        }
        writeStoredLocale(nextLocale);
        writeLocaleCookie(nextLocale);
        document.documentElement.lang = nextLocale;
        setLocaleState(nextLocale);
      },
      t: (key: string) => currentMessages[key] ?? FALLBACK_MESSAGES[key] ?? key,
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
