"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { CompanyExperienceEntry } from "@/components/pages/about/company-experience/company-experience-data";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PATH_URL } from "@/config/path";
import { Reveal } from "@/components/ui/reveal";
import { Right } from "@/assets/svg";
import styles from "./work-experience-detail.module.scss";

type Props = {
  company: CompanyExperienceEntry;
};

export default function WorkExperienceDetail({ company }: Props) {
  const { t } = useLocaleText();
  const positionValue = t(`${company.keyPrefix}.positionValue`);
  const companyName = t(`${company.keyPrefix}.company`);
  // Accordion: expanding one project's highlights collapses whichever
  // other project was previously expanded.
  const [expandedProjectKey, setExpandedProjectKey] = useState<string | null>(
    null,
  );

  const toggleProjectHighlights = (titleKey: string) => {
    setExpandedProjectKey((prev) => (prev === titleKey ? null : titleKey));
  };

  return (
    <article className={styles.root}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href={PATH_URL.ROOT} className={styles.link}>
          {t("navBar.home")}
        </Link>
        <span>›</span>
        <Link href={PATH_URL.ABOUT} className={styles.link}>
          {t("navBar.about")}
        </Link>
        <span>›</span>
        <span>{companyName}</span>
      </nav>

      <Reveal as="div" className={styles.header}>
        {company.variant === "detailed" && (
          <div className={styles.logoWrapper}>
            <div className={styles.logoInner}>
              <Image
                src={company.logo}
                alt={company.logoAlt}
                width={96}
                height={96}
                className={styles.logo}
              />
            </div>
          </div>
        )}
        <div className={styles.headerInfo}>
          <h1 className={styles.positionValue}>{positionValue}</h1>
          <span className={styles.company}>{companyName}</span>
          <span className={styles.metaLine}>
            <span className={styles.durationValue}>
              {t(`${company.keyPrefix}.durationValue`)}
            </span>
            ◦
            <span className={styles.locationValue}>
              {t(`${company.keyPrefix}.locationValue`)}
            </span>
          </span>
        </div>
      </Reveal>

      <Reveal as="div" delayMs={80} className={styles.responsibilities}>
        {company.variant === "detailed" && company.projects ? (
          <div className={styles.projects}>
            {company.projects.map((project, index) => {
              const isExpanded = expandedProjectKey === project.titleKey;

              return (
                <Reveal
                  as="div"
                  key={project.titleKey}
                  delayMs={40 * index}
                  className={styles.block}
                >
                  <div className={styles.info}>
                    {project.highlightKeys.length > 0 && (
                      <span className={styles.heading}>
                        <span className={styles.headingMain}>
                          <span className={styles.companyName}>
                            {t(project.titleKey)}
                          </span>
                          {project.descriptionKey && (
                            <span className={styles.description}>
                              {t(project.descriptionKey)}
                            </span>
                          )}
                        </span>
                      </span>
                    )}

                    <div className={styles.meta}>
                      <span className={styles.metaItem}>
                        {t("about.page.workExperience.detail.role")}:{" "}
                        <span className={styles.metaValue}>
                          {positionValue}
                        </span>
                      </span>
                      <span className={styles.metaItem}>
                        {t("about.page.workExperience.detail.teamSize")}:{" "}
                        <span className={styles.metaValue}>
                          {t(project.teamSizeKey)}
                        </span>
                      </span>
                      <span className={styles.metaItem}>
                        {t("about.page.workExperience.detail.duration")}:{" "}
                        <span className={styles.metaValue}>
                          {t(project.durationKey)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${styles.row} ${index % 2 === 1 ? styles.rowReverse : ""}`}
                  >
                    <div className={styles.media}>
                      {project.video ? (
                        <video
                          src={project.video}
                          className={styles.thumbnail}
                          autoPlay
                          loop
                          muted
                          playsInline
                          aria-label={project.imageAlt}
                        />
                      ) : (
                        project.image && (
                          <Image
                            src={project.image}
                            alt={project.imageAlt}
                            width={project.image.width}
                            height={project.image.height}
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className={styles.thumbnail}
                          />
                        )
                      )}
                    </div>
                    {project.highlightKeys.length > 0 ? (
                      <ul
                        className={`${styles.bulletList} ${
                          isExpanded ? "" : styles.collapsed
                        }`}
                      >
                        {project.highlightKeys.map((key) => (
                          <li key={key}>{t(key)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.paragraph}>
                        {t(project.titleKey)}
                        {project.descriptionKey && (
                          <span className={styles.description}>
                            {t(project.descriptionKey)}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                  {project.highlightKeys.length > 0 && (
                    <button
                      type="button"
                      className={styles.toggle}
                      aria-expanded={isExpanded}
                      onClick={() => toggleProjectHighlights(project.titleKey)}
                    >
                      {isExpanded
                        ? t("about.page.workExperience.detail.showLess")
                        : t("about.page.workExperience.detail.showMore")}
                    </button>
                  )}
                  <a
                    href={project.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                  >
                    {t("about.page.workExperience.detail.viewProject")}{" "}
                    <span aria-hidden="true">
                      <Right />
                    </span>
                  </a>
                </Reveal>
              );
            })}
            {company.noteKey && (
              <Reveal as="p" className={styles.note}>
                {t(company.noteKey)}
              </Reveal>
            )}
          </div>
        ) : (
          <ul className={styles.bulletList}>
            {company.responsibilityKeys.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        )}
      </Reveal>

      {company.variant === "detailed" && (
        <Reveal as="div" delayMs={120} className={styles.techStack}>
          <span className={styles.subheading}>
            {t(`${company.keyPrefix}.techStack`)}:
          </span>
          <ul className={styles.techList}>
            {company.techLineKeys.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </Reveal>
      )}

      <Link href={PATH_URL.ABOUT} className={styles.backLink}>
        <span aria-hidden="true" className={styles.icon}>
          ←
        </span>
        {t("about.page.workExperience.detail.backToAbout")}
      </Link>
    </article>
  );
}
