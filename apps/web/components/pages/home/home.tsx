import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import AboutBlock from "@/components/pages/home/about-block/about-block";
import CallToAction from "@/components/pages/home/callToAction-block/call-to-action";
import ProfileBlock from "@/components/pages/home/profile-block/profile-block";
import ProjectBlock from "@/components/pages/home/project-block/project-block";
import QuoteBlock from "@/components/pages/home/quote-block/quote-block";
import SelectedWorkBlock from "@/components/pages/home/selected-work-block/selected-work-block";
import SocialBlock from "@/components/pages/home/social-block/social-block";
import StatsBlock from "@/components/pages/home/stats-block/stats-block";
import TestimonialsBlock from "@/components/pages/home/testimonials-block/testimonials-block";
import CompanyBlock from "@/components/pages/home/company-block/company";
import PrinciplesBlock from "@/components/pages/home/principles-block/principles-block";
import { Skeleton } from "@/components/ui/skeleton";

import CompetenciesBlock from "./competencies-block/competencies-block";
import styles from "./styles.module.scss";

const BLOCK_REVEAL_STAGGER_MS = 50;

const SkillSection = dynamic(
  () => import("@/components/pages/home/skill-block/skill"),
  {
    loading: () => (
      <div className={styles.skillDynamic} aria-hidden>
        <Skeleton className={styles.skillSkeleton} />
      </div>
    ),
  },
);

type HomeBlockId =
  | "profile"
  | "skills"
  | "about"
  | "projects"
  | "selectedWork"
  | "hobby"
  | "quote"
  | "testimonials"
  | "company"
  | "blog"
  | "social"
  | "stats"
  | "cta";

type HomeBlock = {
  id: HomeBlockId;
  label: string;
  render: () => ReactNode;
};

const HOME_BLOCKS: readonly HomeBlock[] = [
  { id: "profile", label: "Profile block", render: () => <ProfileBlock /> },
  { id: "skills", label: "Skills strip", render: () => <SkillSection /> },
  { id: "about", label: "About block", render: () => <AboutBlock /> },
  { id: "projects", label: "Projects block", render: () => <ProjectBlock /> },
  { id: "selectedWork", label: "Selected Work", render: () => <SelectedWorkBlock /> },
  { id: "hobby", label: "Core Competencies", render: () => <CompetenciesBlock /> },
  { id: "quote", label: "Quote block", render: () => <QuoteBlock /> },
  { id: "testimonials", label: "Testimonials", render: () => <TestimonialsBlock /> },
  { id: "social", label: "My Social Profiles", render: () => <SocialBlock /> },
  { id: "stats", label: "Stats block", render: () => <StatsBlock /> },
  { id: "company", label: "Company block", render: () => <CompanyBlock /> },
  { id: "blog", label: "Blog block", render: () => <PrinciplesBlock /> },
  { id: "cta", label: "Call to action block", render: () => <CallToAction /> },
] as const;

export default function HomeSection() {
  return (
    <section className={styles.homeSection} aria-label="Home layout">
      <div className={styles.grid}>
        {HOME_BLOCKS.map((block, index) => (
          <article
            key={block.id}
            className={`${styles.block} ${styles[block.id]}`}
            style={{ animationDelay: `${index * BLOCK_REVEAL_STAGGER_MS}ms` }}
            aria-label={block.label}
          >
            {block.render()}
          </article>
        ))}
      </div>
    </section>
  );
}
