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
          <Reveal as="span" variant="fade" className={styles.nameLine}>
            {prefix ? (
              <>
                {prefix}{" "}
                <Reveal as="span" delayMs={20} className={styles.authorName}>
                  {name}
                </Reveal>
              </>
            ) : (
              <Reveal as="span" className={styles.authorName}>
                {name}
              </Reveal>
            )}
          </Reveal>
          {role ? (
            <Reveal as="span" delayMs={40} className={styles.role}>
              <Briefcase /> {role}
            </Reveal>
          ) : null}
        </div>
        <div className={styles.quoteContent}>
          <Reveal as="span" variant="fade" delayMs={60} className={styles.element}>
            {t("testimonials.block.element1")}
            {t("testimonials.block.element")}
            {t("testimonials.block.element2")}
          </Reveal>
          <Reveal as="span" delayMs={90} className={styles.quoteText}>
            {body}
          </Reveal>
          <Reveal as="span" variant="fade" delayMs={120} className={styles.element}>
            {t("testimonials.block.element1.end")}
            {t("testimonials.block.element")}
            {t("testimonials.block.element2.end")}
          </Reveal>
        </div>
      </Reveal>
      <Reveal as="div" delayMs={100} className={styles.footer}>
        <Reveal as="p" className={styles.sectionSubtitle}>
          {t("testimonials.block.footer")}
        </Reveal>
        <Reveal as="h2" delayMs={40} className={styles.sectionTitle}>
          {t("testimonials.block.title")}
        </Reveal>
      </Reveal>
    </div>
  );
}
