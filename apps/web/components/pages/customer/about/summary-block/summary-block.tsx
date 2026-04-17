"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./summary-block.module.scss";

export default function SummaryBlock() {
  const { t } = useLocaleText();
  const leadParagraphs = t("about.page.summary.lead")
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className={styles.root}>
      <p className={styles.name}>{t("profile.block.name")}</p>
      <div className={styles.leadWrap}>
        {leadParagraphs.map((paragraph, i) => (
          <p key={i} className={styles.lead}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
