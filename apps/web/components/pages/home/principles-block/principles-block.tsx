"use client";

import styles from "./principles-block.module.scss";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

export default function PrinciplesBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <div className={styles.meta}>
        <p className={styles.principles}>{t("principles.block.principle.0")}</p>
        <p className={styles.principles}>{t("principles.block.principle.1")}</p>
      </div>
      <p className={styles.footer}>{t("principles.block.title")}</p>
    </div>
  );
}