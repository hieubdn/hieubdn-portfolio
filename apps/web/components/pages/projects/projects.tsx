"use client";

import type { ReactNode } from "react";

import styles from "./projects.module.scss";
import TitleBlock from "./title-block/title-block";
import TapyProject from "./tapy-project/tapy-project";
import WalkerProject from "./walker-project/walker-project";
import TryotelProject from "./tryotel-project/tryotel-project";
import FlightProject from "./flight-project/flight-project";
import ThoughtProject from "./thought-project/thought-project";
import KhoraProject from "./khora-project/khora-project";
import GranadaProject from "./granada-project/granada-project";
import TravelProject from "./travel-project/travel-project";
import StudiomalsProject from "./studiomals-project/studiomals-project";

const BLOCK_REVEAL_STAGGER_MS = 50;

type ProjectBlockId =
  | "title"
  | "tapy"
  | "walker"
  | "tryotel"
  | "flight"
  | "thought"
  | "khora"
  | "granada"
  | "travel"
  | "studiomals";

type ProjectVariant = "card" | "static";

type ProjectBlock = {
  id: ProjectBlockId;
  label: string;
  variant: ProjectVariant;
  render: () => ReactNode;
};

const PROJECT_BLOCKS: readonly ProjectBlock[] = [
  { id: "tapy", label: "Tapy", variant: "card", render: () => <TapyProject /> },
  { id: "title", label: "Projects heading", variant: "static", render: () => <TitleBlock /> },
  { id: "walker", label: "Walker", variant: "card", render: () => <WalkerProject /> },
  { id: "tryotel", label: "Tryotel", variant: "card", render: () => <TryotelProject /> },
  { id: "flight", label: "Flight", variant: "card", render: () => <FlightProject /> },
  { id: "thought", label: "Thought", variant: "card", render: () => <ThoughtProject /> },
  { id: "khora", label: "Khora", variant: "card", render: () => <KhoraProject /> },
  { id: "granada", label: "Granada", variant: "card", render: () => <GranadaProject /> },
  { id: "travel", label: "Travel", variant: "card", render: () => <TravelProject /> },
  { id: "studiomals", label: "Studiomals", variant: "card", render: () => <StudiomalsProject /> },
] as const;

function articleClassName(block: ProjectBlock): string {
  const area = styles[block.id];
  const base = block.variant === "card" ? styles.block : styles.kickerStrip;
  return `${base} ${area}`;
}

export default function ProjectsSection() {
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
            {block.render()}
          </article>
        ))}
      </div>
    </section>
  );
}
