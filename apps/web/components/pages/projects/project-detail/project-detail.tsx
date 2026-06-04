"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import type { ProjectData } from "@/config/projects-data";
import { PATH_URL } from "@/config/path";
import { Right } from "@/assets/svg";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import walkerPoster from "@/assets/image/projects-page/walker-project/poster.jpg";
import tapyPoster from "@/assets/image/projects-page/tapy-project/poster.jpg";
import khoraPoster from "@/assets/image/projects-page/khora-project/poster.jpg";
import flightPoster from "@/assets/image/projects-page/flight-project/poster.jpg";
import granadaPoster from "@/assets/image/projects-page/granada-project/poster.jpg";
import travelPoster from "@/assets/image/projects-page/travel-project/poster.jpg";
import tryotelPoster from "@/assets/image/projects-page/tryotel-project/poster.jpg";
import thoughtPoster from "@/assets/image/projects-page/thought-project/poster.jpg";
import poppyPoster from "@/assets/image/projects-page/poppy-project/poster.png";
import multianglePoster from "@/assets/image/projects-page/multiangle-project/poster.png";
import fidovnPoster from "@/assets/image/projects-page/fidovn-project/poster.png";
import tattooPoster from "@/assets/image/projects-page/tattoo/poster.png";

import flightDetail1 from "@/assets/image/projects-page/flight-project/flight-detail(1).png";
import flightDetail2 from "@/assets/image/projects-page/flight-project/flight-detail(2).jpg";
import flightDetail3 from "@/assets/image/projects-page/flight-project/flight-detail(3).jpg";
import flightDetail4 from "@/assets/image/projects-page/flight-project/flight-detail(4).jpg";
import granadaDetail from "@/assets/image/projects-page/granada-project/granada-detail.jpg";
import khoraDetail from "@/assets/image/projects-page/khora-project/khora-detail.jpg";
import poppyDetail from "@/assets/image/projects-page/poppy-project/poppy-detail.png";
import tapyDetail from "@/assets/image/projects-page/tapy-project/tapy-detail.jpg";
import thoughtDetail from "@/assets/image/projects-page/thought-project/thought-detail.jpg";
import travelDetail from "@/assets/image/projects-page/travel-project/travel-detail.jpg";
import tryotelDetail from "@/assets/image/projects-page/tryotel-project/tryotel-detail.png";
import walkerDetail1 from "@/assets/image/projects-page/walker-project/walkerIP-detail(1).png";
import walkerDetail2 from "@/assets/image/projects-page/walker-project/walkerIP-detail(2).png";
import walkerDetail3 from "@/assets/image/projects-page/walker-project/walkerIP-detail(3).png";
import walkerDetail4 from "@/assets/image/projects-page/walker-project/walkerIP-detail(4).png";
import walkerDetail5 from "@/assets/image/projects-page/walker-project/walkerIP-detail(5).png";
import fidovnDetail1 from "@/assets/image/projects-page/fidovn-project/fidovn-detail1.png";
import fidovnDetail2 from "@/assets/image/projects-page/fidovn-project/fidovn-detail2.png";
import multiangleDetail from "@/assets/image/projects-page/multiangle-project/multiangle-detail.png";
import tattooDetail1 from "@/assets/image/projects-page/tattoo/tattooDetail(1).png";
import tattooDetail2 from "@/assets/image/projects-page/tattoo/tattooDetail(2).png";
import tattooDetail3 from "@/assets/image/projects-page/tattoo/tattooDetail(3).png";
import tattooDetail4 from "@/assets/image/projects-page/tattoo/tattooDetail(4).png";
import tattooDetail5 from "@/assets/image/projects-page/tattoo/tattooDetail(5).png";
import tattooDetail6 from "@/assets/image/projects-page/tattoo/tattooDetail(6).png";


import SocialShare from "./social-share";
import ProjectNav from "./project-nav";
import styles from "./project-detail.module.scss";

const PROJECT_IMAGES: Record<string, StaticImageData> = {
  walkerip: walkerPoster,
  tapy: tapyPoster,
  khora: khoraPoster,
  flightlocal: flightPoster,
  granada: granadaPoster,
  travel: travelPoster,
  tryotel: tryotelPoster,
  thought: thoughtPoster,
  poppy: poppyPoster,
  fidovn: fidovnPoster,
  multiangle: multianglePoster,
  tattoo: tattooPoster,
};

const PROJECT_DETAIL_IMAGES: Record<string, StaticImageData[]> = {
  walkerip: [walkerDetail1, walkerDetail2, walkerDetail3, walkerDetail4, walkerDetail5],
  flightlocal: [flightDetail1, flightDetail2, flightDetail3, flightDetail4],
  granada: [granadaDetail],
  khora: [khoraDetail],
  poppy: [poppyDetail],
  tapy: [tapyDetail],
  thought: [thoughtDetail],
  travel: [travelDetail],
  tryotel: [tryotelDetail],
  fidovn: [fidovnDetail1, fidovnDetail2],
  multiangle: [multiangleDetail],
  tattoo: [tattooDetail1, tattooDetail2, tattooDetail3, tattooDetail4, tattooDetail5, tattooDetail6],
};

function MetaValue({ value }: { value: string | string[] }) {
  const items = Array.isArray(value) ? value : [value];
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className={styles.metaValue}>{item}</span>
      ))}
    </>
  );
}

type Props = { project: ProjectData };

export default function ProjectDetail({ project }: Props) {
  const { t } = useLocaleText();
  const poster = PROJECT_IMAGES[project.slug];
  const detailImages = PROJECT_DETAIL_IMAGES[project.slug] ?? [];
  const description = t(`project.${project.slug}.description`);

  return (
    <>
      <article className={styles.root}>
        <div className={styles.intro}>
          <span className={styles.category}>{project.category} &#x2022;</span>
          <h1 className={styles.title}>{project.name}</h1>
        </div>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href={PATH_URL.ROOT} className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link href={PATH_URL.PROJECTS} className={styles.breadcrumbLink}>Projects</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>{project.name}</span>
        </nav>
        <div className={styles.header}>
          <div className={styles.left}>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.right}>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{t("project.detail.label.design")}</span>
                <MetaValue value={project.design} />
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{t("project.detail.label.client")}</span>
                <MetaValue value={project.client} />
              </div>
            </div>
            {project.projectUrl && project.projectUrl !== "#" && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                {t("project.detail.label.openProject")} <span aria-hidden="true"><Right /></span>
              </a>
            )}
          </div>
        </div>

        {poster && (
          <div className={styles.imageSection}>
            <SocialShare title={project.name} />
            <Image
              src={poster}
              alt={`${project.name} project preview`}
              className={styles.poster}
              sizes="100vw"
              priority
            />
          </div>
        )}

        {detailImages.length > 0 && (
          <div className={styles.detailGrid}>
            {detailImages.map((img, i) => (
              <div key={i} className={styles.detailImageWrapper}>
                <Image
                  src={img}
                  alt={`${project.name} detail ${i + 1}`}
                  className={styles.detailImage}
                  style={{ width: "100%", height: "auto" }}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        )}
      </article>

      <ProjectNav currentSlug={project.slug} />
    </>
  );
}
