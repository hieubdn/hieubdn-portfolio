"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./title-block.module.scss";
import { Star } from "@/assets/svg";
import { Reveal } from "@/components/ui/reveal";

export default function TitleBlock() {
  const { t } = useLocaleText();

  return (
    <Reveal as="p" className={styles.kicker}>
      <span className={styles.kickerIcon} aria-hidden>
        <Star gradientId="project-summary-kicker-star-a" />
      </span>{" "}
      {t("home.projects.title")}{" "}
      <span className={styles.kickerIcon} aria-hidden>
        <Star gradientId="project-summary-kicker-star-b" />
      </span>
    </Reveal>
  );
}
