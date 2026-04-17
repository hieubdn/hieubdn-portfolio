"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./phase2-company.module.scss";

const RESPONSIBILITY_KEYS = [
  "about.page.experience.phase2.responsibility.0",
  "about.page.experience.phase2.responsibility.1",
  "about.page.experience.phase2.responsibility.2",
  "about.page.experience.phase2.responsibility.3",
  "about.page.experience.phase2.responsibility.4",
] as const;

const TECH_LINE_KEYS = ["about.page.experience.phase2.tech"] as const;

export default function Phase2Company() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <div className={styles.meta}>
        <h3 className={styles.company}>
          {t("about.page.experience.phase2.company")}
        </h3>
        <span className={styles.positionValue}>
          {t("about.page.experience.phase2.positionValue")}
        </span>
        <span className={styles.metaLine}>
          <span className={styles.durationValue}>
            {t("about.page.experience.phase2.durationValue")}
          </span>
          ●
          <span className={styles.locationValue}>
            {t("about.page.experience.phase2.locationValue")}
          </span>
        </span>
      </div>
      <div className={styles.responsibilities}>
        <span className={styles.subheading}>
          {t("about.page.experience.phase2.responsibilities")}:{" "}
        </span>
        <ul className={styles.bulletList}>
          {RESPONSIBILITY_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>
      <div className={styles.techStack}>
        <span className={styles.subheading}>
          {t("about.page.experience.phase2.techStack")}:
        </span>
        <ul className={styles.techList}>
          {TECH_LINE_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
