"use client";

import { HeartIcon } from "@/assets/svg";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { Reveal } from "@/components/ui/reveal";

import styles from "./stats-block.module.scss";

export default function StatsBlock() {
  const { t } = useLocaleText();
  const stats: readonly { value?: string; label: string }[] = [
    { value: t("home.stats.years.value"), label: t("home.stats.years.label") },
    { label: t("home.stats.tagline") },
    { value: t("home.stats.projects.value"), label: t("home.stats.projects.label") },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.cards}>
        {stats.map((item, index) => (
          <Reveal
            as="div"
            key={item.label}
            variant="scale"
            delayMs={index * 90}
            className={styles.card}
          >
            {item.value ? (
              <>
                <Reveal as="p" className={styles.value}>
                  {item.value}
                </Reveal>
                <Reveal as="p" delayMs={20} className={styles.cardLabel}>
                  {item.label}
                </Reveal>
              </>
            ) : (
              <>
                <Reveal as="span" variant="scale" aria-hidden className={styles.heartWrap}>
                  <HeartIcon />
                </Reveal>
                <Reveal as="p" delayMs={20} className={styles.cardLabel}>
                  {item.label}
                </Reveal>
              </>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
