"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import styles from "./project-card.module.scss";

type Props = {
  slug: string;
  name: string;
  category: string;
  image?: StaticImageData;
};

export default function ProjectCard({ slug, name, category, image }: Props) {
  const { t } = useLocaleText();
  return (
    <Link href={`/projects/${slug}`} className={styles.root} aria-label={name}>
      <div className={styles.imageWrapper}>
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <div className={styles.categoryWrapper} aria-hidden="true">
          <span className={styles.category}>{category}</span>
          <span className={styles.showProject}>{t("project.detail.label.showProject")}</span>
        </div>
      </div>
    </Link>
  );
}
