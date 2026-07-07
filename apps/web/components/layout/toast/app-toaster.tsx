"use client";

import {
  useLayoutEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { Toaster } from "sonner";

import type { DarkModePreference } from "@/components/theme/theme-constants";
import { useThemePreference } from "@/components/theme/theme-preference-provider";

import "sonner/dist/styles.css";
import styles from "./app-toaster.module.scss";

function isEffectiveDark(
  preference: DarkModePreference,
  systemDark: boolean,
): boolean {
  if (preference === "on") return true;
  if (preference === "off") return false;
  return systemDark;
}

export function AppToaster() {
  const { preference } = useThemePreference();
  const [systemDark, setSystemDark] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const onChange = () => setSystemDark(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const theme = useMemo(
    () => (isEffectiveDark(preference, systemDark) ? "dark" : "light"),
    [preference, systemDark],
  );

  return (
    <Toaster
      className={styles.toaster}
      theme={theme}
      position="top-center"
      richColors
      closeButton
      duration={5000}
      style={{ "--width": "min(500px, calc(100vw - 32px))" } as CSSProperties}
      toastOptions={{
        classNames: {
          toast: styles.toast,
          title: styles.toastTitle,
          description: styles.toastDescription,
        },
      }}
    />
  );
}
