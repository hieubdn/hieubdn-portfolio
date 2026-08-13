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
  const positionValue = t(`${company.keyPrefix}.position`);
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
          {t("nav.home")}
        </Link>
        <Reveal as="span" variant="fade" delayMs={0}>›</Reveal>
        <Link href={PATH_URL.ABOUT} className={styles.link}>
          {t("nav.about")}
        </Link>
        <Reveal as="span" variant="fade" delayMs={20}>›</Reveal>
        <Reveal as="span" variant="fade" delayMs={40}>
          {companyName}
        </Reveal>
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
          <Reveal as="h1" className={styles.positionValue}>
            {positionValue}
          </Reveal>
          <Reveal as="span" delayMs={70} className={styles.company}>
            {companyName}
          </Reveal>
          <Reveal as="span" variant="fade" delayMs={100} className={styles.metaLine}>
            <Reveal as="span" delayMs={140} className={styles.durationValue}>
              {t(`${company.keyPrefix}.duration`)}
            </Reveal>
            ◦
            <Reveal as="span" delayMs={200} className={styles.locationValue}>
              {t(`${company.keyPrefix}.location`)}
            </Reveal>
          </Reveal>
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
                      <Reveal as="span" variant="fade" className={styles.heading}>
                        <Reveal as="span" variant="fade" className={styles.headingMain}>
                          <Reveal as="span" delayMs={0} className={styles.companyName}>
                            {t(project.titleKey)}
                          </Reveal>
                          {project.descriptionKey && (
                            <Reveal as="span" delayMs={30} className={styles.description}>
                              {t(project.descriptionKey)}
                            </Reveal>
                          )}
                        </Reveal>
                      </Reveal>
                    )}

                    <div className={styles.meta}>
                      <Reveal as="span" delayMs={60} className={styles.metaItem}>
                        {t("exp.labels.role")}:{" "}
                        <Reveal as="span" delayMs={75} className={styles.metaValue}>
                          {positionValue}
                        </Reveal>
                      </Reveal>
                      <Reveal as="span" delayMs={90} className={styles.metaItem}>
                        {t("exp.labels.teamSize")}:{" "}
                        <Reveal as="span" delayMs={105} className={styles.metaValue}>
                          {t(project.teamSizeKey)}
                        </Reveal>
                      </Reveal>
                      <Reveal as="span" delayMs={120} className={styles.metaItem}>
                        {t("exp.labels.duration")}:{" "}
                        <Reveal as="span" delayMs={135} className={styles.metaValue}>
                          {t(project.durationKey)}
                        </Reveal>
                      </Reveal>
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
                        {project.highlightKeys.map((key, bulletIndex) => (
                          <Reveal as="li" key={key} delayMs={40 * bulletIndex}>
                            {t(key)}
                          </Reveal>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.paragraph}>
                        {t(project.titleKey)}
                        {project.descriptionKey && (
                          <Reveal as="span" delayMs={30} className={styles.description}>
                            {t(project.descriptionKey)}
                          </Reveal>
                        )}
                      </p>
                    )}
                  </div>
                  <a
                    href={project.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                  >
                    {t("exp.labels.viewProject")}{" "}
                    <Reveal as="span" variant="scale" delayMs={150} aria-hidden="true">
                      <Right />
                    </Reveal>
                  </a>
                  {project.highlightKeys.length > 0 && (
                    <button
                      type="button"
                      className={styles.toggle}
                      aria-expanded={isExpanded}
                      onClick={() => toggleProjectHighlights(project.titleKey)}
                    >
                      {isExpanded
                        ? t("exp.labels.showLess")
                        : t("exp.labels.showMore")}
                    </button>
                  )}
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
            {company.responsibilityKeys.map((key, index) => (
              <Reveal as="li" key={key} delayMs={40 * index}>
                {t(key)}
              </Reveal>
            ))}
          </ul>
        )}
      </Reveal>

      {company.variant === "detailed" && (
        <Reveal as="div" delayMs={120} className={styles.techStack}>
          <Reveal as="span" className={styles.subheading}>
            {t("exp.labels.techStack")}:
          </Reveal>
          <ul className={styles.techList}>
            {company.techLineKeys.map((key, index) => (
              <Reveal as="li" key={key} delayMs={40 + 30 * index}>
                {t(key)}
              </Reveal>
            ))}
          </ul>
        </Reveal>
      )}

      <Link href={PATH_URL.ABOUT} className={styles.backLink}>
        <Reveal as="span" variant="fade" aria-hidden="true" className={styles.icon}>
          ←
        </Reveal>
        {t("exp.labels.backToAbout")}
      </Link>
    </article>
  );
}
