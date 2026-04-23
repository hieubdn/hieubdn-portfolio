"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./summary-kicker-block.module.scss";
import { Star } from "@/assets/svg";

export default function SummaryKickerBlock() {
  const { t } = useLocaleText();

  return (
    <p className={styles.kicker}>
      <span className={styles.kickerIcon} aria-hidden>
        <Star gradientId="about-summary-kicker-star-a" />
      </span>{" "}
      {t("about.page.summary.kicker")}{" "}
      <span className={styles.kickerIcon} aria-hidden>
        <Star gradientId="about-summary-kicker-star-b" />
      </span>
    </p>
  );
}
