"use client";

import Image from "next/image";
import Link from "next/link";

import profileImg from "@/assets/image/profile-block/hieubdn.jpg";
import { PATH_URL } from "@/config/path";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { Reveal } from "@/components/ui/reveal";

import styles from "./profile-block.module.scss";

export default function ProfileBlock() {
  const { t } = useLocaleText();

  const profile = {
    name: t("profile.block.name"),
    title: t("profile.block.title"),
    email: t("profile.block.email"),
  };

  return (
    <Link
      href={PATH_URL.ABOUT}
      className={styles.root}
      suppressHydrationWarning
    >
      <div className={styles.body}>
        <Reveal as="div" variant="scale" className={styles.imageWrap}>
          <Image
            src={profileImg}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 32vw"
            className={styles.slideImage}
            priority
          />
        </Reveal>
        <div className={styles.info}>
          <Reveal as="h1" delayMs={80} className={styles.name} suppressHydrationWarning>
            {profile.name}
          </Reveal>
          <Reveal as="p" delayMs={140} className={styles.title} suppressHydrationWarning>
            {profile.title}
          </Reveal>
          <Reveal
            as="p"
            delayMs={200}
            className={`${styles.contact} ${styles.email}`}
            suppressHydrationWarning
          >
            {profile.email}
          </Reveal>
        </div>
      </div>
    </Link>
  );
}
