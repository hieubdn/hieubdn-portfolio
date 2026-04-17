"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./download-cv-block.module.scss";

export default function DownloadCvBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <div className={styles.meta}>
      </div>
      <div className={styles.footer}>
      <p className={styles.kicker}>{t("about.page.cv.kicker")}</p>
      <p className={styles.title}>{t("about.page.cv.title")}</p>
      </div>
    </div>
  );
}
