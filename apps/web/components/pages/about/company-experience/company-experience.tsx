"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import type { CompanyExperienceEntry } from "./company-experience-data";
import { Reveal } from "@/components/ui/reveal";
import styles from "./company-experience.module.scss";

type CompanyExperienceProps = {
  company: CompanyExperienceEntry;
};

export default function CompanyExperience({ company }: CompanyExperienceProps) {
  const { t } = useLocaleText();
  const positionValue = t(`${company.keyPrefix}.positionValue`);
  const companyName = t(`${company.keyPrefix}.company`);

  if (company.variant === "simple") {
    return (
      <Link
        href={company.detailUrl}
        className={styles.root}
        aria-label={`${positionValue} — ${companyName}`}
      >
        <Reveal as="div" className={styles.metaSimple}>
          <h3 className={styles.company}>{companyName}</h3>
          <span className={styles.positionValue}>{positionValue}</span>
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
      </Link>
    );
  }

  return (
    <Link
      href={company.detailUrl}
      className={styles.card}
      aria-label={`${positionValue} — ${companyName}`}
    >
      <div className={styles.logoWrapper}>
        <div className={styles.logoInner}>
          <Image
            src={company.logo}
            alt={company.logoAlt}
            width={64}
            height={64}
            className={styles.logo}
          />
        </div>
      </div>
      <div className={styles.metaInfo}>
        <h3 className={styles.positionValue}>{positionValue}</h3>
        <span className={styles.company}>{companyName}</span>
        <span className={styles.durationValue}>
          {t(`${company.keyPrefix}.durationValue`)}
        </span>
      </div>
    </Link>
  );
}
