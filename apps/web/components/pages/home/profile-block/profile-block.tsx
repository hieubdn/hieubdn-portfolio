"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import profileImg1 from "@/assets/image/profile-block/hieubdn.jpg";
import { PATH_URL } from "@/config/path";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { Reveal } from "@/components/ui/reveal";

import styles from "./profile-block.module.scss";

const PROFILE_IMAGES = [
  { src: profileImg1 },
] as const;

const PROFILE_ROTATE_MS = 5000;

export default function ProfileBlock() {
  const { t } = useLocaleText();
  const [imageIndex, setImageIndex] = useState(0);

  const profile = {
    name: t("profile.name"),
    title: t("profile.title"),
    email: t("profile.email"),
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
        <Reveal as="div" variant="scale" className={styles.imageWrap}>
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
