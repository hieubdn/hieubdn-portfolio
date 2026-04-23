"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./hdwebsoft-company.module.scss";

const RESPONSIBILITY_KEYS = [
  "about.page.experience.hdwebsoft.responsibility.0",
  "about.page.experience.hdwebsoft.responsibility.1",
  "about.page.experience.hdwebsoft.responsibility.2",
  "about.page.experience.hdwebsoft.responsibility.3",
  "about.page.experience.hdwebsoft.responsibility.4",
] as const;

const TECH_LINE_KEYS = [
  "about.page.experience.hdwebsoft.tech.frontend",
  "about.page.experience.hdwebsoft.tech.backend",
  "about.page.experience.hdwebsoft.tech.cloud",
  "about.page.experience.hdwebsoft.tech.database",
  "about.page.experience.hdwebsoft.tech.integrations",
  "about.page.experience.hdwebsoft.tech.devops",
] as const;

export default function HdwebsoftCompany() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <div className={styles.meta}>
        <h3 className={styles.company}>
          {t("about.page.experience.hdwebsoft.company")}
        </h3>
        <span className={styles.positionValue}>
          {t("about.page.experience.hdwebsoft.positionValue")}
        </span>
        <span className={styles.metaLine}>
          <span className={styles.durationValue}>
            {t("about.page.experience.hdwebsoft.durationValue")}
          </span>
          ◦
          <span className={styles.locationValue}>
            {t("about.page.experience.hdwebsoft.locationValue")}
          </span>
        </span>
      </div>
      <div className={styles.responsibilities}>
        <span className={styles.subheading}>
          {t("about.page.experience.hdwebsoft.responsibilities")}:{" "}
        </span>
        <ul className={styles.bulletList}>
          {RESPONSIBILITY_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>
      <div className={styles.techStack}>
        <span className={styles.subheading}>
          {t("about.page.experience.hdwebsoft.techStack")}:
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
