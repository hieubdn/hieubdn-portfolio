"use client";

import { HeartIcon } from "@/assets/svg";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { Reveal } from "@/components/ui/reveal";

import styles from "./stats-block.module.scss";

export default function StatsBlock() {
  const { t } = useLocaleText();
  const stats: readonly { value?: string; label: string }[] = [
    { value: t("stats.block.years"), label: t("stats.block.exp") },
    { label: t("stats.block.madeWithLove") },
    { value: t("stats.block.projects"), label: t("stats.block.totalProjects") },
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
                <p className={styles.value}>{item.value}</p>
                <p className={styles.cardLabel}>{item.label}</p>
              </>
            ) : (
              <>
                <span className={styles.heartWrap} aria-hidden>
                  <HeartIcon />
                </span>
                <p className={styles.cardLabel}>{item.label}</p>
              </>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
