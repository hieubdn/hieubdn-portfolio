import type { ReactNode } from "react";

import AboutBlock from "@/components/pages/customer/home/about-block/about-block";
import CallToAction from "@/components/pages/customer/home/callToAction-block/call-to-action";
import ProfileBlock from "@/components/pages/customer/home/profile-block/profile-block";
import ProjectBlock from "@/components/pages/customer/home/project-block/project-block";
import QuoteBlock from "@/components/pages/customer/home/quote-block/quote-block";
import SelectedWorkBlock from "@/components/pages/customer/home/selected-work-block/selected-work-block";
import SocialBlock from "@/components/pages/customer/home/social-block/social-block";
import StatsBlock from "@/components/pages/customer/home/stats-block/stats-block";
import TestimonialsBlock from "@/components/pages/customer/home/testimonials-block/testimonials-block";
import SkillSection from "@/components/sections/skill/skill";
import CompanyBlock from "@/components/pages/customer/home/company-block/company";
import BlogBlock from "@/components/pages/customer/home/blog-block/blog-block";
import styles from "./styles.module.scss";

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
  { id: "hobby", label: "Hobby block" },
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
            inner = <BlogBlock />;
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
