"use client";

import { useState } from "react";

import Image from "next/image";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import toyarLogo from "@/assets/image/about/toyar_logo.jpg";

import styles from "./toyar-company.module.scss";

const FIDOBOX_KEYS = [
  "about.page.experience.toyar.project.job.0",
  "about.page.experience.toyar.project.job.1",
  "about.page.experience.toyar.project.job.2",
  "about.page.experience.toyar.project.job.3",
  "about.page.experience.toyar.project.job.4",
  "about.page.experience.toyar.project.job.5",
] as const;

const FIDOVN_KEYS = [
  "about.page.experience.toyar.project.job.6",
  "about.page.experience.toyar.project.job.7",
  "about.page.experience.toyar.project.job.8",
  "about.page.experience.toyar.project.job.9",
  "about.page.experience.toyar.project.job.10",
  "about.page.experience.toyar.project.job.11",
  "about.page.experience.toyar.project.job.12",
] as const;

const TECH_LINE_KEYS = ["about.page.experience.toyar.tech"] as const;

export default function ToyarCompany() {
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
          href="https://www.linkedin.com/company/toyarinc/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logoWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.logoInner}>
            <Image
              src={toyarLogo}
              alt="Toyar logo"
              width={120}
              height={120}
              className={styles.logo}
            />
          </div>
        </a>
        <div className={styles.metaInfo}>
          <h3 className={styles.positionValue}>
            {t("about.page.experience.toyar.positionValue")}
          </h3>
          <span className={styles.company}>
            {t("about.page.experience.toyar.company")}
          </span>
          <span className={styles.durationValue}>
            {t("about.page.experience.toyar.durationValue")} <span className={styles.metaLine}>◦</span> {t("about.page.experience.toyar.locationValue")}
          </span>
        </div>
        <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ""}`}>▾</span>
      </div>
      {expanded && (
        <div className={styles.details}>
          <div className={styles.responsibilities}>
            <span className={styles.subheading}>
              {t("about.page.experience.toyar.responsibilities")}:{" "}
            </span>
            <ul className={styles.projectList}>
              <li className={styles.projectHeading}>
                {t("about.page.experience.toyar.project.1")}:
                <ul className={styles.bulletList}>
                  {FIDOVN_KEYS.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </li>
              <li className={styles.projectHeading}>
                {t("about.page.experience.toyar.project.0")}:
                <ul className={styles.bulletList}>
                  {FIDOBOX_KEYS.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </li>
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
      )}
    </div>
  );
}
