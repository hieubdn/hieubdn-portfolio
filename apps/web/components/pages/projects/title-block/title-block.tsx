"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./title-block.module.scss";
import { Star } from "@/assets/svg";

export default function TitleBlock() {
  const { t } = useLocaleText();

  return (
    <p className={styles.kicker}>
      <span className={styles.kickerIcon} aria-hidden>
        <Star gradientId="project-summary-kicker-star-a" />
      </span>{" "}
      {t("projects.block.title")}{" "}
      <span className={styles.kickerIcon} aria-hidden>
        <Star gradientId="project-summary-kicker-star-b" />
      </span>
    </p>
  );
}
