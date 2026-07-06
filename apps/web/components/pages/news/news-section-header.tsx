"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { Reveal } from "@/components/ui/reveal";
import styles from "./news-section.module.scss";

export default function NewsSectionHeader() {
  const { t } = useLocaleText();

  return (
    <Reveal as="header" className={styles.header}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.heading}>{t("news.block.title")}</h1>
        <div className={styles.divider} aria-hidden="true">{"//"}</div>
      </div>
      <p className={styles.subtitle}>{t("news.block.subtitle")}</p>
    </Reveal>
  );
}
