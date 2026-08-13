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
  const positionValue = t(`${company.keyPrefix}.position`);
  const companyName = t(`${company.keyPrefix}.company`);

  if (company.variant === "simple") {
    return (
      <Link
        href={company.detailUrl}
        className={styles.root}
        aria-label={`${positionValue} — ${companyName}`}
      >
        <Reveal as="div" className={styles.metaSimple}>
          <Reveal as="h3" className={styles.company}>
            {companyName}
          </Reveal>
          <Reveal as="span" delayMs={40} className={styles.positionValue}>
            {positionValue}
          </Reveal>
          <Reveal as="span" variant="fade" delayMs={70} className={styles.metaLine}>
            <Reveal as="span" delayMs={90} className={styles.durationValue}>
              {t(`${company.keyPrefix}.duration`)}
            </Reveal>
            ◦
            <Reveal as="span" delayMs={110} className={styles.locationValue}>
              {t(`${company.keyPrefix}.location`)}
            </Reveal>
          </Reveal>
        </Reveal>
        <Reveal as="div" delayMs={90} className={styles.responsibilities}>
          <Reveal as="span" className={styles.subheading}>
            {t("exp.labels.responsibilities")}:{" "}
          </Reveal>
          <ul className={styles.bulletList}>
            {company.responsibilityKeys.map((key, index) => (
              <Reveal as="li" key={key} delayMs={90 + index * 40}>
                {t(key)}
              </Reveal>
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
        <Reveal as="h3" className={styles.positionValue}>
          {positionValue}
        </Reveal>
        <Reveal as="span" delayMs={40} className={styles.company}>
          {companyName}
        </Reveal>
        <Reveal as="span" delayMs={80} className={styles.durationValue}>
          {t(`${company.keyPrefix}.duration`)}
        </Reveal>
      </div>
    </Link>
  );
}
