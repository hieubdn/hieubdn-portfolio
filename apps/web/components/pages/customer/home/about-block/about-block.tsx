"use client";

import Image from "next/image";
import Link from "next/link";

import signature from "@/assets/image/about/chuky.png";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { PATH_URL } from "@/config/path";

import styles from "./about-block.module.scss";

export default function AboutBlock() {
  const { t } = useLocaleText();

  return (
    <Link
      href={PATH_URL.ABOUT}
      className={styles.root}
      aria-label="Thông tin thêm — trang giới thiệu"
    >
      <div className={styles.media}>
        <Image
          src={signature}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 28vw"
          className={styles.image}
        />
      </div>
      <div className={styles.caption}>
        <p className={styles.kicker}>{t("about.block.kicker")}</p>
        <p className={styles.title}>{t("about.block.title")}</p>
      </div>
    </Link>
  );
}
