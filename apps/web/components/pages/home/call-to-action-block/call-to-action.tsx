"use client";

import Link from "next/link";

import { WorkTogetherStarsIcon } from "@/assets/svg";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PATH_URL } from "@/config/path";

import styles from "./call-to-action.module.scss";

export default function CallToAction() {
  const { t } = useLocaleText();
  return (
    <Link
      href={PATH_URL.CONTACT}
      className={styles.root}
      aria-label={t("call.action.label")}
    >
      <span className={styles.icon} aria-hidden>
        <WorkTogetherStarsIcon />
      </span>
      <div className={styles.copy}>
        <span className={styles.line1}>{t("call.action.content")}</span>
        <span className={styles.line2}>
          <span className={styles.work}>{t("call.action.work")} </span>
          <span className={styles.together}>{t("call.action.together")}</span>
        </span>
      </div>
      <div className={styles.availability}>
        <p className={styles.time}>Average response time: 1–2 business days.</p>
        <p className={styles.status}>Status: Available for new projects</p>
      </div>
    </Link>
  );
}