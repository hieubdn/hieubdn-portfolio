"use client";

import Link from "next/link";

import { GithubGlyph, InstagramGlyph, LinkedinGlyph } from "@/assets/svg";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { SOCIAL_LINKS } from "@/config/path";
import { Reveal } from "@/components/ui/reveal";

import styles from "./social-block.module.scss";

const SOCIAL_ITEMS = [
  {
    href: SOCIAL_LINKS.LINKEDIN,
    Glyph: LinkedinGlyph,
    label: "LinkedIn",
    variant: "linkedin",
    iconClassName: styles.iconImage,
  },
  {
    href: SOCIAL_LINKS.INSTAGRAM,
    Glyph: InstagramGlyph,
    label: "Instagram",
    variant: "instagram",
    iconClassName: styles.iconImage,
  },
  {
    href: SOCIAL_LINKS.GITHUB,
    Glyph: GithubGlyph,
    label: "GitHub",
    variant: "github",
    iconClassName: styles.iconImageGithub,
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
          {SOCIAL_ITEMS.map((item, index) => (
            <Reveal
              as={Link}
              key={item.href}
              variant="scale"
              delayMs={index * 70}
              href={item.href}
              className={`${styles.iconButton} ${VARIANT_CLASS[item.variant]}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
            >
              <span className={item.iconClassName} aria-hidden>
                <item.Glyph />
              </span>
            </Reveal>
          ))}
        </div>
      </div>
      <div className={styles.caption}>
        <Reveal as="h2" delayMs={280} className={styles.title}>
          {t("social.block.title")}
        </Reveal>
      </div>
    </div>
  );
}
