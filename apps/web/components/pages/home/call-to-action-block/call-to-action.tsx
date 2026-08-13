"use client";

import Link from "next/link";

import { WorkTogetherStarsIcon } from "@/assets/svg";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PATH_URL } from "@/config/path";
import { Reveal } from "@/components/ui/reveal";

import styles from "./call-to-action.module.scss";

export default function CallToAction() {
  const { t } = useLocaleText();
  return (
    <Link href={PATH_URL.CONTACT} className={styles.root}>
      <Reveal as="span" variant="scale" className={styles.icon} aria-hidden>
        <WorkTogetherStarsIcon />
      </Reveal>
      <Reveal as="div" delayMs={80} className={styles.copy}>
        <Reveal as="span" className={styles.line1}>
          {t("call.action.content")}
        </Reveal>
        <Reveal as="span" variant="fade" delayMs={40} className={styles.line2}>
          <Reveal as="span" delayMs={55} className={styles.work}>
            {t("call.action.work")}{" "}
          </Reveal>
          <Reveal as="span" delayMs={70} className={styles.together}>
            {t("call.action.together")}
          </Reveal>
        </Reveal>
      </Reveal>
      <Reveal as="div" delayMs={160} className={styles.availability}>
        <Reveal as="p" className={styles.time}>
          Average response time: 1–2 business days.
        </Reveal>
        <Reveal as="p" delayMs={40} className={styles.status}>
          Status: Available for new projects
        </Reveal>
      </Reveal>
    </Link>
  );
}