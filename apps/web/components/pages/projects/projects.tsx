"use client";

import type { StaticImageData } from "next/image";

import walkerPoster from "@/assets/image/projects-page/walker-project/poster.jpg";
import tapyPoster from "@/assets/image/projects-page/tapy-project/poster.jpg";
import khoraPoster from "@/assets/image/projects-page/khora-project/poster.jpg";
import flightPoster from "@/assets/image/projects-page/flight-project/poster.jpg";
import granadaPoster from "@/assets/image/projects-page/granada-project/poster.jpg";
import travelPoster from "@/assets/image/projects-page/travel-project/poster.jpg";
import tryotelPoster from "@/assets/image/projects-page/tryotel-project/poster.jpg";
import thoughtPoster from "@/assets/image/projects-page/thought-project/poster.jpg";
import poppytPoster from "@/assets/image/projects-page/poppy-project/poster.webp";
import fidovnPoster from "@/assets/image/projects-page/fidovn-project/poster.webp";
import multianglePoster from "@/assets/image/projects-page/multiangle-project/poster.webp";
import tattooPoster from "@/assets/image/projects-page/tattoo/poster.webp";
import babyPoster from "@/assets/image/projects-page/BabyQuip-project/poster.jpg";
import signInAppPoster from "@/assets/image/projects-page/signinapp-project/poster.webp";
import singleKeyPoster from "@/assets/image/projects-page/singlekey-project/Poster.webp";
import swipedonPoster from "@/assets/image/projects-page/swipedon-project/poster.jpg";


import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./projects.module.scss";
import TitleBlock from "./title-block/title-block";
import ProjectCard from "./project-card/project-card";

const BLOCK_REVEAL_STAGGER_MS = 50;

type ProjectBlockId =
  | "poppy"
  | "fidovn"
  | "title"
  | "tapy"
  | "walker"
  | "tryotel"
  | "flight"
  | "thought"
  | "khora"
  | "granada"
  | "travel"
  | "multiangle"
  | "tattoo"
  | "baby"
  | "signinapp"
  | "singlekey"
  | "swipedon";

type ProjectVariant = "card" | "static";

type ProjectBlock = {
  id: ProjectBlockId;
  label: string;
  variant: ProjectVariant;
  slug?: string;
  category?: string;
  image?: StaticImageData;
};

const PROJECT_BLOCKS: readonly ProjectBlock[] = [
  {
    id: "poppy",
    label: "Poppy Flowers",
    variant: "card",
    slug: "poppy",
    category: "Web Development",
    image: poppytPoster,
  },
  {
    id: "fidovn",
    label: "FidoVN - Employment Platform",
    variant: "card",
    slug: "fidovn",
    category: "Web & App Development",
    image: fidovnPoster,
  },
  {
    id: "tapy",
    label: "Tapy – Download. Connect.",
    variant: "card",
    slug: "tapy",
    category: "Web & App Development",
    image: tapyPoster,
  },
  { id: "title", label: "Projects heading", variant: "static" },
  {
    id: "walker",
    label: "Walker IP Pty Ltd",
    variant: "card",
    slug: "walkerip",
    category: "Web Development",
    image: walkerPoster,
  },
  {
    id: "tryotel",
    label: "Tryotel Web (B2C)",
    variant: "card",
    slug: "tryotel",
    category: "Web & App Development",
    image: tryotelPoster,
  },
  {
    id: "flight",
    label: "Flight Local (B2B Travel Solution)",
    variant: "card",
    slug: "flightlocal",
    category: "Web Development",
    image: flightPoster,
  },
  {
    id: "thought",
    label: "Thought – Thinkers Platform",
    variant: "card",
    slug: "thought",
    category: "Web Development",
    image: thoughtPoster,
  },
  {
    id: "khora",
    label: "Khora – Urban Thinkers",
    variant: "card",
    slug: "khora",
    category: "Web Development",
    image: khoraPoster,
  },
  {
    id: "granada",
    label: "AI Lab Granada",
    variant: "card",
    slug: "granada",
    category: "Web Development",
    image: granadaPoster,
  },
  {
    id: "travel",
    label: "Tryotel – Cross-Platform Travel App",
    variant: "card",
    slug: "travel",
    category: "Web & App Development",
    image: travelPoster,
  },
  {
    id: "multiangle",
    label: "Multiangle AI",
    variant: "card",
    slug: "multiangle",
    category: "Web Development",
    image: multianglePoster,
  },
  {
    id: "tattoo",
    label: "The Trung Tattoo",
    variant: "card",
    slug: "tattoo",
    category: "Web Development",
    image: tattooPoster,
  }, 
  {
    id: "baby",
    label: "BabyQuip – Baby Care App",
    variant: "card",
    slug: "baby",
    category: "Web & App Development",
    image: babyPoster,
  },
  {
    id: "signinapp",
    label: "Sign In App – Visitor Management",
    variant: "card",
    slug: "signinapp",
    category: "Web & App Development",
    image: signInAppPoster,
  },
  {
    id: "singlekey",
    label: "SingleKey – Smart Access Control",
    variant: "card",
    slug: "singlekey",
    category: "Web & App Development",
    image: singleKeyPoster,
  },
  {
    id: "swipedon",
    label: "SwipedOn – Visitor Management",
    variant: "card",
    slug: "swipedon",
    category: "Web & App Development",
    image: swipedonPoster,
  },

] as const;

function articleClassName(block: ProjectBlock): string {
  const area = styles[block.id];
  const base = block.variant === "card" ? styles.block : styles.kickerStrip;
  return `${base} ${area}`;
}

export default function ProjectsSection() {
  const { t } = useLocaleText();
  return (
    <section className={styles.projectSection} aria-labelledby="project-title">
      <div className={styles.grid}>
        {PROJECT_BLOCKS.map((block, index) => (
          <article
            key={block.id}
            className={articleClassName(block)}
            style={
              block.variant === "static"
                ? undefined
                : { animationDelay: `${index * BLOCK_REVEAL_STAGGER_MS}ms` }
            }
            aria-label={block.label}
          >
            {block.variant === "static" ? (
              <TitleBlock />
            ) : (
              <ProjectCard
                slug={block.slug!}
                name={block.label}
                category={block.category!}
                image={block.image}
              />
            )}
          </article>
        ))}
      </div>
      <div className={styles.updatingBanner}>
        <span>{t("projects.page.updating")}</span>
        <span className={styles.dots}>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
        </span>
      </div>
    </section>
  );
}
