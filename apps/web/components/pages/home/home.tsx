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
import { Skeleton } from "@/components/ui/skeleton";
import CompanyBlock from "@/components/pages/home/company-block/company";
import PrinciplesBlock from "@/components/pages/home/principles-block/principles-block";
import styles from "./styles.module.scss";
import CompetenciesBlock from "./competencies-block/competencies-block";

const SkillSection = dynamic(
  () => import("@/components/sections/skill/skill"),
  {
    loading: () => (
      <div className={styles.skillDynamic} aria-hidden>
        <Skeleton className={styles.skillSkeleton} />
      </div>
    ),
  },
);

const BLOCK_REVEAL_STAGGER_MS = 50;

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
};

const HOME_BLOCKS: readonly HomeBlock[] = [
  { id: "profile", label: "Profile block" },
  { id: "skills", label: "Skills strip" },
  { id: "about", label: "About block" },
  { id: "projects", label: "Projects block" },
  { id: "selectedWork", label: "Selected Work" },
  { id: "hobby", label: "Core Competencies" },
  { id: "quote", label: "Quote block" },
  { id: "testimonials", label: "Testimonials" },
  { id: "social", label: "My Social Profiles" },
  { id: "stats", label: "Stats block" },
  { id: "company", label: "Company block" },
  { id: "blog", label: "Blog block" },
  { id: "cta", label: "Call to action block" },
] as const;

export default function HomeSection() {
  return (
    <section className={styles.homeSection} aria-label="Home layout">
      <div className={styles.grid}>
        {HOME_BLOCKS.map((block, index) => {
          let inner: ReactNode;
          if (block.id === "profile") {
            inner = <ProfileBlock />;
          } else if (block.id === "skills") {
            inner = <SkillSection />;
          } else if (block.id === "about") {
            inner = <AboutBlock />;
          } else if (block.id === "projects") {
            inner = <ProjectBlock />;
          } else if (block.id === "selectedWork") {
            inner = <SelectedWorkBlock />;
          } else if (block.id === "hobby") {
            inner = <CompetenciesBlock />;
          } else if (block.id === "quote") {
            inner = <QuoteBlock />;
          } else if (block.id === "testimonials") {
            inner = <TestimonialsBlock />;
          } else if (block.id === "social") {
            inner = <SocialBlock />;
          } else if (block.id === "stats") {
            inner = <StatsBlock />;
          } else if (block.id === "company") {
            inner = <CompanyBlock />;
          } else if (block.id === "blog") {
            inner = <PrinciplesBlock />;
          } else if (block.id === "cta") {
            inner = <CallToAction />;
          } else {
            inner = (
              <span className={styles.blockLabel}>{block.label}</span>
            );
          }
          return (
            <article
              key={block.id}
              className={`${styles.block} ${styles[block.id]}`}
              style={{ animationDelay: `${index * BLOCK_REVEAL_STAGGER_MS}ms` }}
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
