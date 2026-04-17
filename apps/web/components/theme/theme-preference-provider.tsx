"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  PROFILE_DARK_MODE_STORAGE_KEY,
  type DarkModePreference,
} from "./theme-constants";

function readStoredPreference(): DarkModePreference {
  if (typeof window === "undefined") return "off";
  try {
    const raw = localStorage.getItem(PROFILE_DARK_MODE_STORAGE_KEY);
    if (raw === "on" || raw === "automatic") return raw;
  } catch {
    /* storage unavailable */
  }
  return "off";
}

function systemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function isEffectiveDark(
  preference: DarkModePreference,
  systemDark: boolean,
): boolean {
  if (preference === "on") return true;
  if (preference === "off") return false;
  return systemDark;
}

type ThemePreferenceContextValue = {
  preference: DarkModePreference;
  setPreference: (next: DarkModePreference) => void;
};

const ThemePreferenceContext = createContext<
  ThemePreferenceContextValue | undefined
>(undefined);

export function ThemePreferenceProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<DarkModePreference>("off");
  const [systemDark, setSystemDark] = useState(false);

  useLayoutEffect(() => {
    setPreferenceState(readStoredPreference());
    setSystemDark(systemPrefersDark());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSchemeChange = () => setSystemDark(mq.matches);
    mq.addEventListener("change", onSchemeChange);
    return () => mq.removeEventListener("change", onSchemeChange);
  }, []);

  const effectiveDark = useMemo(
    () => isEffectiveDark(preference, systemDark),
    [preference, systemDark],
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      effectiveDark ? "dark" : "light",
    );
  }, [effectiveDark]);

  const setPreference = useCallback((next: DarkModePreference) => {
    setPreferenceState(next);
    try {
      localStorage.setItem(PROFILE_DARK_MODE_STORAGE_KEY, next);
    } catch {
      /* preference still applies for this session */
    }
  }, []);

  const value = useMemo(
    () => ({ preference, setPreference }),
    [preference, setPreference],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference(): ThemePreferenceContextValue {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error(
      "useThemePreference must be used within ThemePreferenceProvider",
    );
  }
  return ctx;
}
