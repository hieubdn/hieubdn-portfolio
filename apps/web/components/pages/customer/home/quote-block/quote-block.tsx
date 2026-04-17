"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import styles from "./quote-block.module.scss";

export default function QuoteBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root} aria-label={t("quote.block.title")}>
      <div className={styles.meta}>
        <p className={styles.quote}>&quot;{t("quote.block.content")}&quot;</p>
        <p className={styles.author}>◦ {t("quote.block.author")} ◦</p>
      </div>
      <p className={styles.footer}>{t("quote.block.title")}</p>
    </div>
  );
}
