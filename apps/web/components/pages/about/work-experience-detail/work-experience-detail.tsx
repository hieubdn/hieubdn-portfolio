"use client";

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

  return (
    <article className={styles.root}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href={PATH_URL.ROOT} className={styles.breadcrumbLink}>
          {t("navBar.home")}
        </Link>
        <span className={styles.breadcrumbSep}>›</span>
        <Link href={PATH_URL.ABOUT} className={styles.breadcrumbLink}>
          {t("navBar.about")}
        </Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbCurrent}>{companyName}</span>
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
          {company.variant === "detailed" && (
            <a
              href={company.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedinLink}
            >
              {t("about.page.workExperience.detail.viewLinkedIn")}{" "}
              <span aria-hidden="true">
                <Right />
              </span>
            </a>
          )}
        </div>
      </Reveal>

      <Reveal as="div" delayMs={80} className={styles.responsibilities}>
        <span className={styles.subheading}>
          {t(`${company.keyPrefix}.responsibilities`)}:{" "}
        </span>
        {company.variant === "detailed" && company.projects ? (
          <div className={styles.projectRows}>
            {company.projects.map((project, index) => (
              <Reveal
                as="div"
                key={project.headingKey}
                delayMs={40 * index}
                className={styles.projectBlock}
              >

                <div className={styles.project}>
                  {project.jobKeys.length > 0 && (
                    <span className={styles.projectHeading}>
                      {t(project.headingKey)}
                      {project.descriptionKey && (
                        <span className={styles.projectDescription}>
                          {t(project.descriptionKey)}
                        </span>
                      )}
                      <span>Duration: 2024 - 2025</span>
                    </span>
                  )}

                  <div className={styles.projectMetaoo}>
                    <span className={styles.projectNote}>Role:<span className={styles.projectDescription}>Full-Stack Software Engineer</span></span>
                    <span className={styles.projectNote}>Team size: <span className={styles.projectDescription}>1 nember</span></span>
                  </div>

                </div>
                <div
                  className={`${styles.projectRow} ${index % 2 === 1 ? styles.projectRowReverse : ""
                    }`}
                >
                  <div className={styles.projectMedia}>
                    {project.video ? (
                      <video
                        src={project.video}
                        className={styles.projectImage}
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
                          className={styles.projectImage}
                        />
                      )
                    )}
                  </div>
                  {project.jobKeys.length > 0 ? (
                    <ul className={styles.bulletList}>
                      {project.jobKeys.map((key) => (
                        <li key={key}>{t(key)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.projectParagraph}>
                      {t(project.headingKey)}
                      {project.descriptionKey && (
                        <span className={styles.projectDescription}>
                          {t(project.descriptionKey)}
                        </span>
                      )}
                    </p>
                  )}
                </div>
                <a
                  href={project.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectCta}
                >
                  {t("about.page.workExperience.detail.viewProject")}{" "}
                  <span aria-hidden="true">
                    <Right />
                  </span>
                </a>
              </Reveal>
            ))}
            {company.noteKey && (
              <Reveal as="p" className={styles.projectNote}>
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
        <span aria-hidden="true" className={styles.backLinkIcon}>
          ←
        </span>
        {t("about.page.workExperience.detail.backToAbout")}
      </Link>
    </article>
  );
}
