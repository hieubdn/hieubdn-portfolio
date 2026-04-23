"use client";

import Image from "next/image";
import Link from "next/link";

import githubGlyph from "@/assets/image/social-block/code.png";
import instagramGlyph from "@/assets/image/social-block/instagram.png";
import linkedinGlyph from "@/assets/image/social-block/linkedin.png";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { SOCIAL_LINKS } from "@/config/path";

import styles from "./social-block.module.scss";

const SOCIAL_ITEMS = [
  {
    href: SOCIAL_LINKS.LINKEDIN,
    src: linkedinGlyph,
    label: "LinkedIn",
    variant: "linkedin",
  },
  {
    href: SOCIAL_LINKS.INSTAGRAM,
    src: instagramGlyph,
    label: "Instagram",
    variant: "instagram",
  },
  {
    href: SOCIAL_LINKS.GITHUB,
    src: githubGlyph,
    label: "GitHub",
    variant: "github",
  },
] as const;

const VARIANT_CLASS = {
  linkedin: styles.iconButtonLinkedin,
  instagram: styles.iconButtonInstagram,
  github: styles.iconButtonGithub,
} as const;

export default function SocialBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <div className={styles.iconsBand}>
        <div className={styles.iconRow}>
          {SOCIAL_ITEMS.map((item) => {
            const isGithub = item.label === "GitHub";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.iconButton} ${VARIANT_CLASS[item.variant]}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={isGithub ? 55 : 32}
                  height={isGithub ? 55 : 32}
                  className={
                    isGithub ? styles.iconImageGithub : styles.iconImage
                  }
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles.caption}>
        <p className={styles.kicker}>{t("social.block.kicker")}</p>
        <p className={styles.title}>{t("social.block.title")}</p>
      </div>
    </div>
  );
}
