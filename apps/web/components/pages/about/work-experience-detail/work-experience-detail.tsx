"use client";

import Link from "next/link";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PATH_URL } from "@/config/path";

import type { DetailedCompanyExperience } from "../company-experience/company-experience-data";
import { Reveal } from "@/components/ui/reveal";
import styles from "./work-experience-detail.module.scss";

type Props = {
  company: DetailedCompanyExperience;
};

export default function WorkExperienceDetail({ company }: Props) {
  const { t } = useLocaleText();

  return (
    <section className={styles.root} aria-labelledby="work-experience-title">
      <Link href={PATH_URL.ABOUT} className={styles.back}>
        {t("about.page.workExperience.detail.back")}
      </Link>
      <Reveal as="h1" id="work-experience-title" className={styles.title}>
        <span className={styles.nameCompany}>{t(`${company.keyPrefix}.companyDetail`)}</span>  
        <span>{t(`${company.keyPrefix}.durationValue`)}</span> 
      </Reveal>
      <Reveal as="p" delayMs={60} className={styles.comingSoon}>
        {t("about.page.workExperience.detail.comingSoon")}
      </Reveal>
    </section>
  );
}
