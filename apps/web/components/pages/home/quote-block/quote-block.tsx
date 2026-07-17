"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { Reveal } from "@/components/ui/reveal";
import styles from "./quote-block.module.scss";

export default function QuoteBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root} aria-label={t("quote.block.title")}>
      <Reveal as="div" variant="fade" className={styles.meta}>
        <p className={styles.quote}>&quot;{t("quote.block.content")}&quot;</p>
        <p className={styles.author}>◦ {t("quote.block.author")} ◦</p>
      </Reveal>
      <div className={styles.caption}>
        <Reveal as="p" delayMs={100} className={styles.kicker}>
          {t("quote.block.kicker")}
        </Reveal>
        <Reveal as="h2" delayMs={170} className={styles.title}>
          {t("quote.block.title")}
        </Reveal>
      </div>
    </div>
  );
}
