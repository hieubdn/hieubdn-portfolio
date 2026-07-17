"use client";

import { useEffect, useState } from "react";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { Briefcase } from "@/assets/svg";
import { Reveal } from "@/components/ui/reveal";

import styles from "./testimonials-block.module.scss";

const TESTIMONIAL_COUNT = 7;
const ROTATE_MS = 5000;

export default function TestimonialsBlock() {
  const { t } = useLocaleText();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIAL_COUNT);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const base = `testimonials.block.items.${index}`;
  const prefix = t(`${base}.prefix`);
  const name = t(`${base}.name`);
  const role = t(`${base}.role`);
  const body = t(`${base}.body`);

  return (
    <div className={styles.root} aria-label={t("testimonials.block.title")}>
      <Reveal
        as="blockquote"
        variant="fade"
        className={styles.quote}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className={styles.author}>
          <span className={styles.nameLine}>
            {prefix ? (
              <>
                {prefix}{" "}
                <span className={styles.authorName}>{name}</span>
              </>
            ) : (
              <span className={styles.authorName}>{name}</span>
            )}
          </span>
          {role ? (
            <span className={styles.role}>
              <Briefcase /> {role}
            </span>
          ) : null}
        </div>
        <div className={styles.quoteContent}>
          <span className={styles.element}>
            {t("testimonials.block.element1")}
            {t("testimonials.block.element")}
            {t("testimonials.block.element2")}
          </span>
          <span className={styles.quoteText}>{body}</span>
          <span className={styles.element}>
            {t("testimonials.block.element1.end")}
            {t("testimonials.block.element")}
            {t("testimonials.block.element2.end")}
          </span>
        </div>
      </Reveal>
      <Reveal as="div" delayMs={100} className={styles.footer}>
        <p className={styles.feedback}>{t("testimonials.block.footer")}</p>
        <h2 className={styles.kicker}>{t("testimonials.block.title")}</h2>
      </Reveal>
    </div>
  );
}
