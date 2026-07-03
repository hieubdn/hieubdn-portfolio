"use client";

import Image from "next/image";
import Link from "next/link";

import laptop from "@/assets/image/project/project.png";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PATH_URL } from "@/config/path";

import styles from "@/components/pages/home/about-block/about-block.module.scss";

export default function ProjectBlock() {
  const { t } = useLocaleText();

  return (
    <Link href={PATH_URL.PROJECTS} className={styles.root}>
      <div className={styles.media}>
        <Image
          src={laptop}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 28vw"
          className={styles.image}
        />
      </div>
      <div className={styles.caption}>
        <p className={styles.kicker}>{t("projects.block.kicker")}</p>
        <p className={styles.title}>{t("projects.block.title")}</p>
      </div>
    </Link>
  );
}
