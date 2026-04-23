"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./toyar-company.module.scss";

const RESPONSIBILITY_KEYS = [
  "about.page.experience.toyar.responsibility.0",
  "about.page.experience.toyar.responsibility.1",
  "about.page.experience.toyar.responsibility.2",
  "about.page.experience.toyar.responsibility.3",
  "about.page.experience.toyar.responsibility.4",
] as const;

const TECH_LINE_KEYS = ["about.page.experience.toyar.tech"] as const;

export default function ToyarCompany() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <div className={styles.meta}>
        <h3 className={styles.company}>
          {t("about.page.experience.toyar.company")}
        </h3>
        <span className={styles.positionValue}>
          {t("about.page.experience.toyar.positionValue")}
        </span>
        <span className={styles.metaLine}>
          <span className={styles.durationValue}>
            {t("about.page.experience.toyar.durationValue")}
          </span>
          ◦
          <span className={styles.locationValue}>
            {t("about.page.experience.toyar.locationValue")}
          </span>
        </span>
      </div>
      <div className={styles.responsibilities}>
        <span className={styles.subheading}>
          {t("about.page.experience.toyar.responsibilities")}:{" "}
        </span>
        <ul className={styles.bulletList}>
          {RESPONSIBILITY_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>
      <div className={styles.techStack}>
        <span className={styles.subheading}>
          {t("about.page.experience.toyar.techStack")}:
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
