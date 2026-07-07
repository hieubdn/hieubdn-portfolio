"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./education-block.module.scss";
import { Certificate } from "@/assets/svg";
import { Reveal } from "@/components/ui/reveal";

export default function EducationBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <Reveal as="h3" className={styles.headingBlock}>
        {t("about.page.education.title")}
      </Reveal>
      <ul className={styles.list}>
        <Reveal as="li" delayMs={80}>
          <span className={styles.title}><Certificate />{t("about.page.education.fullstack")}</span>
          <span className={styles.date}>{t("about.page.education.fullstack.date")}</span>
          <span className={styles.issuedBy}>{t("about.page.education.issuedBy")}</span>
        </Reveal>
        <Reveal as="li" delayMs={150}>
          <span className={styles.title}><Certificate />{t("about.page.education.mobileapp")}</span>
          <span className={styles.date}>{t("about.page.education.mobileapp.date")}</span>
          <span className={styles.issuedBy}>{t("about.page.education.issuedBy")}</span>
        </Reveal>
      </ul>
    </div>
  );
}
