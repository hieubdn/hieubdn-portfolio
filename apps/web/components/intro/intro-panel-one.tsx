"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import { ScrollCue } from "./scroll-cue";
import styles from "./intro-overlay.module.scss";

type IntroPanelOneProps = {
  onAdvance: () => void;
};

export function IntroPanelOne({ onAdvance }: IntroPanelOneProps) {
  const { t } = useLocaleText();

  return (
    <div className={styles.panelInner}>
      <div className={styles.centerContent}>
        <h1 className={styles.introName} suppressHydrationWarning>
          {t("profile.name")}
        </h1>
        <p className={styles.introTitle} suppressHydrationWarning>
          {t("profile.title")}
        </p>
        <p className={styles.introLocation} suppressHydrationWarning>
          {t("home.intro.location")}
        </p>
      </div>
      <ScrollCue
        label={t("home.intro.scrollCue")}
        onClick={onAdvance}
        className={styles.cuePosition}
      />
    </div>
  );
}
