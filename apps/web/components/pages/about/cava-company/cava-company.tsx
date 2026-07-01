"use client";

import Image from "next/image";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import cavaLogo from "@/assets/image/about/cava_logo.jpg";

import styles from "./cava-company.module.scss";

const RESPONSIBILITY_KEYS = [
  "about.page.experience.cava.responsibility.0",
  "about.page.experience.cava.responsibility.1",
  "about.page.experience.cava.responsibility.2",
  "about.page.experience.cava.responsibility.3",
  "about.page.experience.cava.responsibility.4",
] as const;

const TECH_LINE_KEYS = [
  "about.page.experience.cava.tech",
] as const;

export default function CavaCompany() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <div className={styles.meta}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoInner}>
            <Image
              src={cavaLogo}
              alt="CAVA logo"
              width={120}
              height={120}
              className={styles.logo}
            />
          </div>
        </div>
        <div className={styles.metaInfo}>
          <h3 className={styles.company}>
            {t("about.page.experience.cava.company")}
          </h3>
          <span className={styles.positionValue}>
            {t("about.page.experience.cava.positionValue")}
          </span>
          <span className={styles.metaLine}>
            <span className={styles.durationValue}>
              {t("about.page.experience.cava.durationValue")}
            </span>
            ◦
            <span className={styles.locationValue}>
              {t("about.page.experience.cava.locationValue")}
            </span>
          </span>
        </div>
      </div>
      <div className={styles.responsibilities}>
        <span className={styles.subheading}>
          {t("about.page.experience.cava.responsibilities")}:{" "}
        </span>
        <ul className={styles.bulletList}>
          {RESPONSIBILITY_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>
      <div className={styles.techStack}>
        <span className={styles.subheading}>
          {t("about.page.experience.cava.techStack")}:
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
