"use client";

import { useState } from "react";

import Image from "next/image";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import hdwebsoftLogo from "@/assets/image/about/hdwebsoft_logo.jpg";

import styles from "./hdwebsoft-company.module.scss";

const RESPONSIBILITY_KEYS = [
  "about.page.experience.hdwebsoft.responsibility.0",
  "about.page.experience.hdwebsoft.responsibility.1",
  "about.page.experience.hdwebsoft.responsibility.2",
  "about.page.experience.hdwebsoft.responsibility.3",
  "about.page.experience.hdwebsoft.responsibility.4",
] as const;

const TECH_LINE_KEYS = [
  "about.page.experience.hdwebsoft.tech.tech",
] as const;

export default function HdwebsoftCompany() {
  const { t } = useLocaleText();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.root}>
      <div
        className={styles.meta}
        onClick={() => setExpanded((prev) => !prev)}
        role="button"
        aria-expanded={expanded}
      >
        <a
          href="https://www.linkedin.com/company/hdwebsoft/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logoWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.logoInner}>
            <Image
              src={hdwebsoftLogo}
              alt="HDWEBSOFT logo"
              width={120}
              height={120}
              className={styles.logo}
            />
          </div>
        </a>
        <div className={styles.metaInfo}>
          <h3 className={styles.positionValue}>
            {t("about.page.experience.hdwebsoft.positionValue")}
          </h3>
          <span className={styles.company}>
            {t("about.page.experience.hdwebsoft.company")}
          </span>
          <span className={styles.durationValue}>
            {t("about.page.experience.hdwebsoft.durationValue")} <span className={styles.metaLine}>◦</span> {t("about.page.experience.hdwebsoft.locationValue")}
          </span>
        </div>
        <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ""}`}>▾</span>
      </div>
      {expanded && (
        <div className={styles.details}>
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
      )}
    </div>
  );
}
