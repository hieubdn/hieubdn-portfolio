"use client";

import type { ReactNode } from "react";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import SocialBlock from "@/components/pages/home/social-block/social-block";

import CallToAction from "../home/callToAction-block/call-to-action";
import CavaCompany from "./cava-company/cava-company";
import TechnicalBlock from "./contact-block/contact-block";
import DownloadCvBlock from "./download-cv-block/download-cv-block";
import EducationBlock from "./education-block/education-block";
import HdwebsoftCompany from "./hdwebsoft-company/hdwebsoft-company";
import ImageBlock from "./image-block/image-block";
import MindxCompany from "./mindx-company/mindx-company";
import Phase2Company from "./phase2-company/phase2-company";
import SectionHeading from "./section-heading/section-heading";
import SummaryBlock from "./summary-block/summary-block";
import SummaryKickerBlock from "./summary-kicker-block/summary-kicker-block";
import ToyarCompany from "./toyar-company/toyar-company";
import styles from "./about.module.scss";

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

type AboutVariant = "card" | "static" | "sectionHeading" | "divider";

type AboutBlock = {
  id: AboutBlockId;
  label: string;
  variant: AboutVariant;
  render: () => ReactNode;
};

function variantBaseClass(variant: AboutVariant): string | undefined {
  switch (variant) {
    case "card":
      return styles.block;
    case "static":
      return styles.kickerStrip;
    case "sectionHeading":
      return styles.sectionHeadingRow;
    case "divider":
      return styles.dividerRow;
  }
}

export default function AboutSection() {
  const { t } = useLocaleText();

  const blocks: readonly AboutBlock[] = [
    { id: "image", label: "Portrait", variant: "card", render: () => <ImageBlock /> },
    { id: "summaryKicker", label: "Self-summary heading", variant: "static", render: () => <SummaryKickerBlock /> },
    { id: "summary", label: "Self-summary", variant: "card", render: () => <SummaryBlock /> },
    { id: "technical", label: "Technical skills", variant: "card", render: () => <TechnicalBlock /> },
    { id: "education", label: "Education", variant: "card", render: () => <EducationBlock /> },
    {
      id: "workExperienceHeading",
      label: "Work experience section",
      variant: "sectionHeading",
      render: () => <SectionHeading title={t("about.page.workExperience.heading")} />,
    },
    { id: "hdwebsoft", label: "HDWEBSOFT", variant: "card", render: () => <HdwebsoftCompany /> },
    { id: "toyar", label: "Toyar", variant: "card", render: () => <ToyarCompany /> },
    { id: "phase2", label: "Phase 2", variant: "card", render: () => <Phase2Company /> },
    { id: "cava", label: "Cava", variant: "card", render: () => <CavaCompany /> },
    {
      id: "otherExperienceHeading",
      label: "Other experience section",
      variant: "sectionHeading",
      render: () => <SectionHeading title={t("about.page.otherExperience.heading")} />,
    },
    { id: "mindx", label: "MindX", variant: "card", render: () => <MindxCompany /> },
    { id: "footerDivider", label: "Section divider", variant: "divider", render: () => <hr className={styles.rule} /> },
    { id: "footerSocial", label: "Social profiles", variant: "card", render: () => <SocialBlock /> },
    { id: "cta", label: "Call to action", variant: "card", render: () => <CallToAction /> },
    { id: "footerCv", label: "Download CV", variant: "card", render: () => <DownloadCvBlock /> },
  ];

  return (
    <section className={styles.aboutSection} aria-labelledby="about-title">
      <div className={styles.grid}>
        {blocks.map((block, index) => (
          <article
            key={block.id}
            className={`${variantBaseClass(block.variant)} ${styles[block.id]}`}
            style={
              block.variant === "static"
                ? undefined
                : { animationDelay: `${index * BLOCK_REVEAL_STAGGER_MS}ms` }
            }
            aria-label={block.label}
          >
            {block.render()}
          </article>
        ))}
      </div>
    </section>
  );
}
