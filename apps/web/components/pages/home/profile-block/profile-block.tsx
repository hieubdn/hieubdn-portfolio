"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import profileImg1 from "@/assets/image/profile-block/hieubdn.jpg";
import { PATH_URL } from "@/config/path";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./profile-block.module.scss";

const PROFILE_IMAGES = [
  { src: profileImg1 },
] as const;

const PROFILE_ROTATE_MS = 5000;

export default function ProfileBlock() {
  const { t } = useLocaleText();
  const [imageIndex, setImageIndex] = useState(0);

  const profile = {
    name: t("profile.block.name"),
    title: t("profile.block.title"),
    email: t("profile.block.email"),
  };

  useEffect(() => {
    if (PROFILE_IMAGES.length <= 1) return;
    const n = PROFILE_IMAGES.length;
    const id = window.setInterval(() => {
      setImageIndex((i) => (i + 1) % n);
    }, PROFILE_ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <Link
      href={PATH_URL.ABOUT}
      className={styles.root}
      suppressHydrationWarning
    >
      <div className={styles.body}>
        <div className={styles.imageWrap}>
          <div className={styles.slideStack} aria-hidden>
            {PROFILE_IMAGES.map((item, i) => (
              <Image
                key={i}
                src={item.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 32vw"
                className={[
                  styles.slideImage,
                  i === imageIndex && styles.slideImageActive,
                  "slideTweak" in item &&
                    item.slideTweak === "hiubdn" &&
                    styles.slideImageHiubdn,
                ]
                  .filter(Boolean)
                  .join(" ")}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
        <div className={styles.info}>
          <p className={styles.name} suppressHydrationWarning>
            {profile.name}
          </p>
          <p className={styles.title} suppressHydrationWarning>
            {profile.title}
          </p>
          <p
            className={`${styles.contact} ${styles.email}`}
            suppressHydrationWarning
          >
            {profile.email}
          </p>
        </div>
      </div>
    </Link>
  );
}
