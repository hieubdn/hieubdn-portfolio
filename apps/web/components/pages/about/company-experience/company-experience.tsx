"use client";

import type { KeyboardEvent } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PATH_URL } from "@/config/path";

import type { CompanyExperienceEntry } from "./company-experience-data";
import { Reveal } from "@/components/ui/reveal";
import styles from "./company-experience.module.scss";

type CompanyExperienceProps = {
  company: CompanyExperienceEntry;
};

export default function CompanyExperience({ company }: CompanyExperienceProps) {
  const { t } = useLocaleText();
  const router = useRouter();

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

  const goToDetail = () => router.push(`${PATH_URL.WORK_EXPERIENCE}/${company.slug}`);
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetail();
    }
  };

  return (
    <div
      className={
        company.noRootGap ? `${styles.root} ${styles.rootNoGap}` : styles.root
      }
    >
      <Reveal
        as="div"
        className={styles.meta}
        onClick={goToDetail}
        onKeyDown={handleKeyDown}
        role="link"
        tabIndex={0}
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
          {/* <span className={styles.durationValue}>
            {t(`${company.keyPrefix}.durationValue`)}
          </span>
          <span className={styles.durationValue}>
            {t(`${company.keyPrefix}.locationValue`)}
          </span> */}

        </div>
      </Reveal>
    </div>
  );
}
