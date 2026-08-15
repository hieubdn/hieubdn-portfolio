"use client";

import type { ReactNode } from "react";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import SocialBlock from "@/components/pages/home/social-block/social-block";

import CallToAction from "../home/call-to-action-block/call-to-action";
import CompanyExperience from "./company-experience/company-experience";
import { COMPANY_EXPERIENCES } from "./company-experience/company-experience-data";
import ContactBlock from "./contact-block/contact-block";
import DownloadCvBlock from "./download-cv-block/download-cv-block";
import EducationBlock from "./education-block/education-block";
import ImageBlock from "./image-block/image-block";
import SectionHeading from "./section-heading/section-heading";
import SummaryBlock from "./summary-block/summary-block";
import SummaryKickerBlock from "./summary-kicker-block/summary-kicker-block";
import WorkExperienceTimeline from "./work-experience-timeline/work-experience-timeline";
import { Reveal } from "@/components/ui/reveal";
import styles from "./about.module.scss";

const BLOCK_REVEAL_STAGGER_MS = 50;

type AboutBlockId =
  | "image"
  | "summaryKicker"
  | "summary"
  | "technical"
  | "education"
  | "workExperienceHeading"
  | "workExperienceTimeline"
  | "otherExperienceHeading"
  | "mindx"
  | "footerDivider"
  | "footerSocial"
  | "cta"
  | "footerCv";

type AboutVariant = "card" | "static" | "sectionHeading" | "divider" | "timeline";

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
    case "timeline":
      return styles.timelineRow;
  }
}

export default function AboutSection() {
  const { t } = useLocaleText();

  const blocks: readonly AboutBlock[] = [
    { id: "image", label: "Portrait", variant: "card", render: () => <ImageBlock /> },
    { id: "summaryKicker", label: "Self-summary heading", variant: "static", render: () => <SummaryKickerBlock /> },
    { id: "summary", label: "Self-summary", variant: "card", render: () => <SummaryBlock /> },
    { id: "technical", label: "Contact details", variant: "card", render: () => <ContactBlock /> },
    { id: "education", label: "Education", variant: "card", render: () => <EducationBlock /> },
    {
      id: "workExperienceHeading",
      label: "Work experience section",
      variant: "sectionHeading",
      render: () => <SectionHeading title={t("exp.title")} />,
    },
    {
      id: "workExperienceTimeline",
      label: "Work experience timeline",
      variant: "timeline",
      render: () => (
        <WorkExperienceTimeline
          companies={[
            COMPANY_EXPERIENCES.hdwebsoft,
            COMPANY_EXPERIENCES.toyar,
            COMPANY_EXPERIENCES.optoro,
          ]}
        />
      ),
    },
    {
      id: "otherExperienceHeading",
      label: "Other experience section",
      variant: "sectionHeading",
      render: () => <SectionHeading title={t("exp.otherTitle")} />,
    },
    { id: "mindx", label: "MindX", variant: "timeline", render: () => <CompanyExperience company={COMPANY_EXPERIENCES.mindx} /> },
    { id: "footerDivider", label: "Section divider", variant: "divider", render: () => <hr className={styles.rule} /> },
    { id: "footerSocial", label: "Social profiles", variant: "card", render: () => <SocialBlock /> },
    { id: "cta", label: "Call to action", variant: "card", render: () => <CallToAction /> },
    { id: "footerCv", label: "Download CV", variant: "card", render: () => <DownloadCvBlock /> },
  ];

  return (
    <section className={styles.aboutSection} aria-labelledby="about-title">
      <div className={styles.grid}>
        {blocks.map((block, index) => (
          <Reveal
            as="article"
            key={block.id}
            className={`${variantBaseClass(block.variant)} ${styles[block.id]}`}
            delayMs={(index % 5) * BLOCK_REVEAL_STAGGER_MS}
            aria-label={block.label}
          >
            {block.render()}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
