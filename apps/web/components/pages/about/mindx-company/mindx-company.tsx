"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./mindx-company.module.scss";

const RESPONSIBILITY_KEYS = [
  "about.page.experience.mindx.responsibility.0",
  "about.page.experience.mindx.responsibility.1",
] as const;

export default function MindxCompany() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <div className={styles.meta}>
        <h3 className={styles.company}>
          {t("about.page.experience.mindx.company")}
        </h3>
        <span className={styles.positionValue}>
          {t("about.page.experience.mindx.positionValue")}
        </span>
        <span className={styles.metaLine}>
          <span className={styles.durationValue}>
            {t("about.page.experience.mindx.durationValue")}
          </span>
          ◦
          <span className={styles.locationValue}>
            {t("about.page.experience.mindx.locationValue")}
          </span>
        </span>
      </div>
      <div className={styles.responsibilities}>
        <span className={styles.subheading}>
          {t("about.page.experience.mindx.responsibilities")}:{" "}
        </span>
        <ul className={styles.bulletList}>
          {RESPONSIBILITY_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
