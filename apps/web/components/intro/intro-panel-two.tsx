"use client";

import type { RefObject } from "react";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import { FallingIconStage } from "./fallingIcon/falling-icon-stage";
import { ScrollCue } from "./scroll-cue";
import { TestimonialGlobeSection } from "./testimonialGlobe/testimonial-globe-section";
import styles from "./intro-overlay.module.scss";

type IntroPanelTwoProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
  onFinish: () => void;
  active: boolean;
};

export function IntroPanelTwo({ scrollRef, onFinish, active }: IntroPanelTwoProps) {
  const { t } = useLocaleText();

  return (
    <div ref={scrollRef} className={styles.panelT2Scroll}>
      <section className={styles.t2Section}>
        <div className={styles.centerContent}>
          <h2 className={styles.introName} suppressHydrationWarning>
            {t("profile.name")}
          </h2>
          <p className={styles.introTitle} suppressHydrationWarning>
            {t("profile.title")}
          </p>
          <p className={styles.introLocation} suppressHydrationWarning>
            {t("home.intro.location")}
          </p>
        </div>
      </section>

      <section
        className={`${styles.t2Section} ${styles.placeholderSection}`}
        aria-label={`${t("home.intro.placeholder")} 02`}
      >
        <FallingIconStage active={active} />
      </section>

      <section className={`${styles.t2Section} ${styles.placeholderSection}`}>
        <TestimonialGlobeSection
          title={t("home.intro.globe.title")}
          subtitle={t("home.intro.globe.subtitle")}
        />
      </section>

      <section className={`${styles.t2Section} ${styles.lastSection}`}>
        <ScrollCue label={t("home.intro.scrollCue")} onClick={onFinish} />
      </section>
    </div>
  );
}
