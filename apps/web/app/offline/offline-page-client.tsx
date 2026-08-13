"use client";

import Link from "next/link";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PATH_URL } from "@/config/path";
import styles from "./offline.module.scss";

export function OfflinePageClient() {
  const { t } = useLocaleText();

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{t("pwa.offline.title")}</h1>
      <p className={styles.body}>{t("pwa.offline.body")}</p>
      <Link className={styles.link} href={PATH_URL.ROOT}>
        {t("pwa.offline.backHome")}
      </Link>
    </div>
  );
}
