"use client";

import { useEffect, useRef, useState } from "react";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { LOCALE_FLAGS } from "@/components/layout/setting/translate/locale-flags";
import {
  LOCALE_OPTIONS,
  type AppLocaleCode,
} from "@/components/layout/setting/translate/locale-constants";

import styles from "./intro-language-switch.module.scss";

const LOCALE_SHORT_LABEL: Record<AppLocaleCode, string> = {
  en: "English",
  vi: "Vietnamese",
  ja: "Japanese",
  ko: "Korean",
  de: "Deutsch",
  "zh-CN": "Chinese (CN)",
  fr: "French",
};

export function IntroLanguageSwitch() {
  const { locale, setLocale, t } = useLocaleText();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const CurrentFlag = LOCALE_FLAGS[locale];

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("settings.language.label")}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.flagWrap}>
          <CurrentFlag className={styles.flag} />
        </span>
        <span className={styles.shortLabel}>{LOCALE_SHORT_LABEL[locale]}</span>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label={t("aria.languages")}>
          {LOCALE_OPTIONS.map((option) => {
            const Flag = LOCALE_FLAGS[option.code];
            const selected = option.code === locale;
            return (
              <li key={option.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`${styles.option} ${selected ? styles.optionActive : ""}`}
                  onClick={() => {
                    setOpen(false);
                    if (!selected) void setLocale(option.code);
                  }}
                >
                  <span className={styles.flagWrap}>
                    <Flag className={styles.flag} />
                  </span>
                  <span className={styles.optionLabel}>{option.nativeLabel}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
