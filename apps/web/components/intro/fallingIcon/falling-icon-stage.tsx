"use client";

import Image from "next/image";
import { Permanent_Marker } from "next/font/google";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import { FALLING_ICON_SKILLS } from "./falling-icon-data";
import { useFallingPhysics } from "./use-falling-physics";
import styles from "./falling-icon-stage.module.scss";

const marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type FallingIconStageProps = {
  active: boolean;
};

export function FallingIconStage({ active }: FallingIconStageProps) {
  const { t } = useLocaleText();
  const { stageRef, targetRef, canvasHostRef, bannerRef } = useFallingPhysics({
    gravity: 0.9,
    stiffness: 0.9,
    active,
  });

  return (
    <div ref={stageRef} className={styles.fallingStage}>
      <div ref={targetRef} className={styles.fallingTarget}>
        {FALLING_ICON_SKILLS.map((skill) => (
          <span
            key={skill.name}
            className={styles.fallingChip}
            data-falling-chip
          >
            <Image src={skill.icon} alt={skill.name} width={32} height={32} unoptimized />
          </span>
        ))}
      </div>
      <div ref={canvasHostRef} className={styles.fallingCanvas} aria-hidden="true" />
      <div
        ref={bannerRef}
        className={`${styles.fallingReveal} ${marker.className}`}
      >
        {t("intro.fallingBanner")}
      </div>
    </div>
  );
}
