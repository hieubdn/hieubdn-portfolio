"use client";

import { useState } from "react";

import Image from "next/image";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import type { CompanyExperienceEntry } from "./company-experience-data";
import { Reveal } from "@/components/ui/reveal";
import styles from "./company-experience.module.scss";

type CompanyExperienceProps = {
  company: CompanyExperienceEntry;
};

export default function CompanyExperience({ company }: CompanyExperienceProps) {
  const { t } = useLocaleText();
  const [expanded, setExpanded] = useState(false);

  if (company.variant === "simple") {
    return (
      <div className={styles.root}>
        <Reveal as="div" className={styles.metaSimple}>
          <h3 className={styles.company}>
            {t(`${company.keyPrefix}.company`)}
          </h3>
          <span className={styles.positionValue}>
            {t(`${company.keyPrefix}.positionValue`)}
          </span>
          <span className={styles.metaLine}>
            <span className={styles.durationValue}>
              {t(`${company.keyPrefix}.durationValue`)}
            </span>
            ◦
            <span className={styles.locationValue}>
              {t(`${company.keyPrefix}.locationValue`)}
            </span>
          </span>
        </Reveal>
        <Reveal as="div" delayMs={90} className={styles.responsibilities}>
          <span className={styles.subheading}>
            {t(`${company.keyPrefix}.responsibilities`)}:{" "}
          </span>
          <ul className={styles.bulletList}>
            {company.responsibilityKeys.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    );
  }

  return (
    <div
      className={
        company.noRootGap ? `${styles.root} ${styles.rootNoGap}` : styles.root
      }
    >
      <Reveal
        as="div"
        className={styles.meta}
        onClick={() => setExpanded((prev) => !prev)}
        role="button"
        aria-expanded={expanded}
      >
        <a
          href={company.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logoWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.logoInner}>
            <Image
              src={company.logo}
              alt={company.logoAlt}
              width={120}
              height={120}
              className={styles.logo}
            />
          </div>
        </a>
        <div className={styles.metaInfo}>
          <h3 className={styles.positionValue}>
            {t(`${company.keyPrefix}.positionValue`)}
          </h3>
          <span className={styles.company}>
            {t(`${company.keyPrefix}.company`)}
          </span>
          <span className={styles.durationValue}>
            {t(`${company.keyPrefix}.durationValue`)} <span className={styles.metaLine}>◦</span> {t(`${company.keyPrefix}.locationValue`)}
          </span>
        </div>
        <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ""}`}>▾</span>
      </Reveal>
      {expanded && (
        <div
          className={
            company.projects
              ? `${styles.details} ${styles.detailsWithProjects}`
              : styles.details
          }
        >
          <div className={styles.responsibilities}>
            <span className={styles.subheading}>
              {t(`${company.keyPrefix}.responsibilities`)}:{" "}
            </span>
            {company.projects ? (
              <ul className={styles.projectList}>
                {company.projects.map((project) => (
                  <li key={project.headingKey} className={styles.projectHeading}>
                    {project.jobKeys.length > 0 ? (
                      <>
                        {t(project.headingKey)}:
                        <ul className={styles.bulletList}>
                          {project.jobKeys.map((key) => (
                            <li key={key}>{t(key)}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      t(project.headingKey)
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.bulletList}>
                {company.responsibilityKeys.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.techStack}>
            <span className={styles.subheading}>
              {t(`${company.keyPrefix}.techStack`)}:
            </span>
            <ul className={styles.techList}>
              {company.techLineKeys.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
