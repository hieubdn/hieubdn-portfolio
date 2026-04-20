"use client";

import Image from "next/image";
import Link from "next/link";

import githubGlyph from "@/assets/image/social-block/code.png";
import instagramGlyph from "@/assets/image/social-block/instagram.png";
import linkedinGlyph from "@/assets/image/social-block/linkedin.png";
import facebookGlyph from "@/assets/image/social-block/facebook.png";
import { SOCIAL_LINKS } from "@/config/path";
import styles from "./contact-page.module.scss";

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
    {
        href: SOCIAL_LINKS.FACEBOOK,
        src: facebookGlyph,
        label: "facebook",
        variant: "facebook",
    },
] as const;

const VARIANT_CLASS = {
    linkedin: styles.iconButtonLinkedin,
    instagram: styles.iconButtonInstagram,
    github: styles.iconButtonGithub,
    facebook: styles.iconButtonFacebook,
} as const;

export default function ContactSection() {

    return (
        <section className={styles.contactSection}>
            <div className={styles.info}>
                <div>
                    <span>Contact info</span>
                    <div></div>
                    <div></div>
                </div>
                <div className={styles.socialsInfo}>
                    <span className={styles.heading}>Socials info</span>
                    <div className={styles.iconRow}>
                        {SOCIAL_ITEMS.map((item) => {
                            const isGithub = item.label === "GitHub";
                            const isFacebook = item.label === "facebook";
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
                                        width={isGithub ? 55 : isFacebook ? 50 : 32}
                                        height={isGithub ? 55 : isFacebook ? 50 : 32}
                                        className={
                                            isGithub ? styles.iconImageGithub : isFacebook ? styles.iconImageFacebook : styles.iconImage
                                        }
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.form}></div>
        </section>
    );
}