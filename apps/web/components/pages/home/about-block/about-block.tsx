"use client";

import Image from "next/image";
import Link from "next/link";

import signature from "@/assets/image/about/chuky1.png";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PATH_URL } from "@/config/path";
import { Reveal } from "@/components/ui/reveal";

import styles from "./about-block.module.scss";

export default function AboutBlock() {
  const { t } = useLocaleText();

  return (
    <Link href={PATH_URL.ABOUT} className={styles.root}>
      <Reveal as="div" variant="scale" className={styles.media}>
        <Image
          src={signature}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 28vw"
          className={styles.image}
        />
      </Reveal>
      <div className={styles.caption}>
        <Reveal as="p" className={styles.sectionSubtitle}>
          {t("home.about.kicker")}
        </Reveal>
        <Reveal as="h2" delayMs={80} className={styles.sectionTitle}>
          {t("home.about.title")}
        </Reveal>
      </div>
    </Link>
  );
}
