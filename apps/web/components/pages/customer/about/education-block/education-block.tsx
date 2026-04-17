"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./education-block.module.scss";
import { Certificate } from "@/assets/svg";

export default function EducationBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <h3 className={styles.headingBlock}>{t("about.page.education.title")}</h3>
      <ul className={styles.list}>
        <li>
          <span className={styles.title}><Certificate />{t("about.page.education.fullstack")}</span>
          <span className={styles.date}>{t("about.page.education.fullstack.date")}</span>
          <span className={styles.issuedBy}>{t("about.page.education.issuedBy")}</span>
        </li>
        <li>
          <span className={styles.title}><Certificate />{t("about.page.education.mobileapp")}</span>
          <span className={styles.date}>{t("about.page.education.mobileapp.date")}</span>
          <span className={styles.issuedBy}>{t("about.page.education.issuedBy")}</span>
        </li>
      </ul>
    </div>
  );
}
