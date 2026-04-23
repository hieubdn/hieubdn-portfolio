"use client";

import type { ReactNode } from "react";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import SocialBlock from "@/components/pages/home/social-block/social-block";

import DownloadCvBlock from "./download-cv-block/download-cv-block";
import EducationBlock from "./education-block/education-block";
import ImageBlock from "./image-block/image-block";
import SectionHeading from "./section-heading/section-heading";
import SummaryKickerBlock from "./summary-kicker-block/summary-kicker-block";
import SummaryBlock from "./summary-block/summary-block";
import TechnicalBlock from "./contact-block/contact-block";
import styles from "./about.module.scss";
import CallToAction from "../home/callToAction-block/call-to-action";
import HdwebsoftCompany from "./hdwebsoft-company/hdwebsoft-company";
import ToyarCompany from "./toyar-company/toyar-company";
import Phase2Company from "./phase2-company/phase2-company";
import MindxCompany from "./mindx-company/mindx-company";
import CavaCompany from "./cava-company/cava-company";

const BLOCK_REVEAL_STAGGER_MS = 50;

type AboutBlockId =
  | "image"
  | "summaryKicker"
  | "summary"
  | "technical"
  | "education"
  | "workExperienceHeading"
  | "hdwebsoft"
  | "toyar"
  | "phase2"
  | "cava"
  | "otherExperienceHeading"
  | "mindx"
  | "footerDivider"
  | "footerSocial"
  | "cta"
  | "footerCv";

type AboutBlock = {
  id: AboutBlockId;
  label: string;
};

const ABOUT_BLOCKS: readonly AboutBlock[] = [
  { id: "image", label: "Portrait" },
  { id: "summaryKicker", label: "Self-summary heading" },
  { id: "summary", label: "Self-summary" },
  { id: "technical", label: "Technical skills" },
  { id: "education", label: "Education" },
  { id: "workExperienceHeading", label: "Work experience section" },
  { id: "hdwebsoft", label: "HDWEBSOFT" },
  { id: "toyar", label: "Toyar" },
  { id: "phase2", label: "Phase 2" },
  { id: "cava", label: "Cava" },
  { id: "otherExperienceHeading", label: "Other experience section" },
  { id: "mindx", label: "MindX" },
  { id: "footerDivider", label: "Section divider" },
  { id: "footerSocial", label: "Social profiles" },
  { id: "cta", label: "Call to action" },
  { id: "footerCv", label: "Download CV" },
] as const;

function articleClassName(
  blockId: AboutBlockId,
  variant:
    | "card"
    | "static"
    | "sectionHeading"
    | "divider"
    | "spacer",
): string {
  const area = styles[blockId];
  if (variant === "card") {
    return `${styles.block} ${area}`;
  }
  if (variant === "static") {
    return `${styles.kickerStrip} ${area}`;
  }
  if (variant === "sectionHeading") {
    return `${styles.sectionHeadingRow} ${area}`;
  }
  if (variant === "divider") {
    return `${styles.dividerRow} ${area}`;
  }
  return `${styles.spacerRow} ${area}`;
}

export default function AboutSection() {
  const { t } = useLocaleText();

  return (
    <section className={styles.aboutSection} aria-labelledby="about-title">
      <div className={styles.grid}>
        {ABOUT_BLOCKS.map((block, index) => {
          let inner: ReactNode;
          let variant:
            | "card"
            | "static"
            | "sectionHeading"
            | "divider"
            | "spacer" = "card";

          if (block.id === "image") {
            inner = <ImageBlock />;
          } else if (block.id === "summaryKicker") {
            variant = "static";
            inner = <SummaryKickerBlock />;
          } else if (block.id === "summary") {
            inner = <SummaryBlock />;
          } else if (block.id === "technical") {
            inner = <TechnicalBlock />;
          } else if (block.id === "education") {
            inner = <EducationBlock />;
          } else if (block.id === "workExperienceHeading") {
            variant = "sectionHeading";
            inner = (
              <SectionHeading title={t("about.page.workExperience.heading")} />
            );
          } else if (block.id === "hdwebsoft") {
            inner = <HdwebsoftCompany />;
          } else if (block.id === "toyar") {
            inner = <ToyarCompany />;
          } else if (block.id === "cava") {
            inner = <CavaCompany />;
          } else if (block.id === "phase2") {
            inner = <Phase2Company />;
          } else if (block.id === "otherExperienceHeading") {
            variant = "sectionHeading";
            inner = (
              <SectionHeading title={t("about.page.otherExperience.heading")} />
            );
          } else if (block.id === "mindx") {
            inner = <MindxCompany />;
          } else if (block.id === "footerDivider") {
            variant = "divider";
            inner = <hr className={styles.rule} />;
          } else if (block.id === "footerSocial") {
            inner = <SocialBlock />;
          } else if (block.id === "cta") {
            inner = <CallToAction />;
          } else {
            inner = <DownloadCvBlock />;
          }

          return (
            <article
              key={block.id}
              className={articleClassName(block.id, variant)}
              style={
                variant === "static"
                  ? undefined
                  : {
                      animationDelay: `${index * BLOCK_REVEAL_STAGGER_MS}ms`,
                    }
              }
              aria-label={block.label}
            >
              {inner}
            </article>
          );
        })}
      </div>
    </section>
  );
}
