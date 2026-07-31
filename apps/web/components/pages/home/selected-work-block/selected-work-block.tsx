"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

import babyQuip from "@/assets/image/selected-work/BabyQuip.png";
import fidovn from "@/assets/image/selected-work/fidovn.png";
import poppy from "@/assets/image/selected-work/poppy.png";
import singleKey from "@/assets/image/selected-work/singlekey.png";
import swipedOn from "@/assets/image/selected-work/SwipedOn.png";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { Reveal } from "@/components/ui/reveal";

import styles from "./selected-work-block.module.scss";

const ROTATE_MS = 3000;

const SELECTED_PROJECTS = [
  { name: "SwipedOn", image: swipedOn, href: "https://www.swipedon.com/" },
  { name: "BabyQuip", image: babyQuip, href: "https://www.babyquip.com/" },
  { name: "Poppy", image: poppy, href: "https://www.poppyflowers.com/" },
  { name: "SingleKey", image: singleKey, href: "https://www.singlekey.com/en-ca/" },
  { name: "FidoVN", image: fidovn, href: "https://www.fidovn.com/" },
] as const;

function normalizeExternalHref(input: string): string {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }
  return `https://${input}`;
}

function ProjectImage({
  image,
  className,
  priority,
}: {
  image: StaticImageData;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={image}
      alt=""
      fill
      sizes="(max-width: 768px) 100vw, 22vw"
      className={className}
      priority={priority}
    />
  );
}

export default function SelectedWorkBlock() {
  const { t } = useLocaleText();
  const count = SELECTED_PROJECTS.length;

  const [visibleLayer, setVisibleLayer] = useState<0 | 1>(0);
  const [pair, setPair] = useState<[number, number]>(() => [
    0,
    count > 1 ? 1 : 0,
  ]);

  useEffect(() => {
    if (count <= 1) return;
    const id = window.setInterval(() => {
      setVisibleLayer((vis) => {
        setPair(([i0, i1]) => {
          const current = vis === 0 ? i0 : i1;
          const next = (current + 1) % count;
          const hidden = vis === 0 ? 1 : 0;
          if (hidden === 0) {
            return [next, i1];
          }
          return [i0, next];
        });
        return vis === 0 ? 1 : 0;
      });
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [count]);

  const currentProjectIndex = visibleLayer === 0 ? pair[0] : pair[1];
  const current =
    SELECTED_PROJECTS[currentProjectIndex] ?? SELECTED_PROJECTS[0];
  const href = normalizeExternalHref(current.href);

  const idx0 = pair[0];
  const idx1 = pair[1];
  const p0 = SELECTED_PROJECTS[idx0] ?? SELECTED_PROJECTS[0];
  const p1 = SELECTED_PROJECTS[idx1] ?? SELECTED_PROJECTS[0];

  return (
    <Link
      href={href}
      className={styles.root}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
    >
      <Reveal as="div" variant="scale" className={styles.media}>
        {count <= 1 ? (
          <div className={`${styles.imageLayer} ${styles.layerVisible}`} aria-hidden>
            <ProjectImage
              image={p0.image}
              className={styles.image}
              priority
            />
          </div>
        ) : (
          <>
            <div
              className={`${styles.imageLayer} ${
                visibleLayer === 0 ? styles.layerVisible : styles.layerHidden
              }`}
              aria-hidden
            >
              <ProjectImage image={p0.image} className={styles.image} priority />
            </div>
            <div
              className={`${styles.imageLayer} ${
                visibleLayer === 1 ? styles.layerVisible : styles.layerHidden
              }`}
              aria-hidden
            >
              <ProjectImage image={p1.image} className={styles.image} />
            </div>
          </>
        )}
      </Reveal>
      <Reveal as="div" delayMs={80} className={styles.caption}>
        <h2 className={styles.title}>{t("selectedWork.block.title")}</h2>
      </Reveal>
    </Link>
  );
}
