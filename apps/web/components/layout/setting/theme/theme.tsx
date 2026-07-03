"use client";

import { useMemo } from "react";

import { Theme } from "@/assets/svg";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { useThemePreference } from "@/components/theme/theme-preference-provider";
import type { DarkModePreference } from "@/components/theme/theme-constants";
import styles from "./theme.module.scss";

export default function ThemeSettingPanel() {
  const { preference, setPreference } = useThemePreference();
  const { t } = useLocaleText();
  const darkModeOptions: readonly {
    preference: DarkModePreference;
    label: string;
  }[] = useMemo(
    () => [
      { preference: "off", label: t("setting.page.option.darkMode.off") },
      { preference: "on", label: t("setting.page.option.darkMode.on") },
      { preference: "automatic", label: t("setting.page.option.darkMode.automatic") },
    ],
    [t],
  );

  return (
    <div className={styles.themeSetting}>
      <h3 className={styles.title}>
        <Theme /> {t("setting.page.option.darkMode")}
      </h3>

      <ul className={styles.optionList} role="radiogroup" aria-label={t("aria.theme.darkMode")}>
        {darkModeOptions.map((option) => {
          const selected = preference === option.preference;
          const isAutomatic = option.preference === "automatic";
          return (
            <li key={option.preference} className={styles.optionItem}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                className={styles.optionRow}
                onClick={() => setPreference(option.preference)}
              >
                <span className={styles.optionLabel}>{option.label}</span>
                <span
                  className={`${styles.radio} ${selected ? styles.radioActive : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isAutomatic && (
                <p className={styles.note}>
                  {t("setting.page.option.darkMode.automatic.description")}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
