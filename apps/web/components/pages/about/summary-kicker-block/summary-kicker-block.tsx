"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./summary-kicker-block.module.scss";
import { Star } from "@/assets/svg";
import { Reveal } from "@/components/ui/reveal";

export default function SummaryKickerBlock() {
  const { t } = useLocaleText();

  return (
    <Reveal as="p" className={styles.kicker}>
      <Reveal as="span" variant="scale" delayMs={0} className={styles.kickerIcon} aria-hidden>
        <Star gradientId="about-summary-kicker-star-a" />
      </Reveal>{" "}
      {t("about.page.summary.kicker")}{" "}
      <Reveal as="span" variant="scale" delayMs={40} className={styles.kickerIcon} aria-hidden>
        <Star gradientId="about-summary-kicker-star-b" />
      </Reveal>
    </Reveal>
  );
}
