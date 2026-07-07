"use client";

import Image from "next/image";
import Link from "next/link";

import laptop from "@/assets/image/project/project.png";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PATH_URL } from "@/config/path";
import { Reveal } from "@/components/ui/reveal";

import styles from "@/components/pages/home/about-block/about-block.module.scss";

export default function ProjectBlock() {
  const { t } = useLocaleText();

  return (
    <Link href={PATH_URL.PROJECTS} className={styles.root}>
      <Reveal as="div" variant="scale" className={styles.media}>
        <Image
          src={laptop}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 28vw"
          className={styles.image}
        />
      </Reveal>
      <div className={styles.caption}>
        <Reveal as="p" className={styles.kicker}>
          {t("projects.block.kicker")}
        </Reveal>
        <Reveal as="p" delayMs={80} className={styles.title}>
          {t("projects.block.title")}
        </Reveal>
      </div>
    </Link>
  );
}
