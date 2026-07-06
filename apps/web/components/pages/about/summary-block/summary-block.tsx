"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { Reveal } from "@/components/ui/reveal";

import styles from "./summary-block.module.scss";

export default function SummaryBlock() {
  const { t } = useLocaleText();
  const leadParagraphs = t("about.page.summary.lead")
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className={styles.root}>
      <Reveal as="p" className={styles.name}>
        {t("profile.block.name")}
      </Reveal>
      <div className={styles.leadWrap}>
        {leadParagraphs.map((paragraph, i) => (
          <Reveal as="p" key={i} delayMs={80 + i * 70} className={styles.lead}>
            {paragraph}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
