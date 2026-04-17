"use client";

import { useOnlineStatus } from "@/hooks/use-online-status";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import styles from "./offline-banner.module.scss";

export function OfflineBanner() {
  const online = useOnlineStatus();
  const { t } = useLocaleText();

  if (online) return null;

  return (
    <div className={styles.banner} role="status">
      {t("pwa.offlineBanner")}
    </div>
  );
}
