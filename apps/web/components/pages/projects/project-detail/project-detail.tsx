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
import poppyPoster from "@/assets/image/projects-page/poppy-project/poster.webp";
import multianglePoster from "@/assets/image/projects-page/multiangle-project/poster.webp";
import fidovnPoster from "@/assets/image/projects-page/fidovn-project/poster.webp";
import tattooPoster from "@/assets/image/projects-page/tattoo/poster.webp";
import babyPoster from "@/assets/image/projects-page/BabyQuip-project/poster.jpg";
import signInAppPoster from "@/assets/image/projects-page/signinapp-project/poster.webp";
import singleKeyPoster from "@/assets/image/projects-page/singlekey-project/Poster.webp";
import swipedonPoster from "@/assets/image/projects-page/swipedon-project/poster.jpg";

import flightDetail1 from "@/assets/image/projects-page/flight-project/flight-detail(1).webp";
import flightDetail2 from "@/assets/image/projects-page/flight-project/flight-detail(2).jpg";
import flightDetail3 from "@/assets/image/projects-page/flight-project/flight-detail(3).jpg";
import flightDetail4 from "@/assets/image/projects-page/flight-project/flight-detail(4).jpg";
import granadaDetail from "@/assets/image/projects-page/granada-project/granada-detail.webp";
import khoraDetail from "@/assets/image/projects-page/khora-project/khora-detail.webp";
import poppyDetail from "@/assets/image/projects-page/poppy-project/poppy-detail.webp";
import tapyDetail from "@/assets/image/projects-page/tapy-project/tapy-detail.webp";
import thoughtDetail from "@/assets/image/projects-page/thought-project/thought-detail.webp";
import travelDetail from "@/assets/image/projects-page/travel-project/travel-detail.webp";
import tryotelDetail from "@/assets/image/projects-page/tryotel-project/tryotel-detail.webp";
import walkerDetail1 from "@/assets/image/projects-page/walker-project/walkerIP-detail(1).webp";
import walkerDetail2 from "@/assets/image/projects-page/walker-project/walkerIP-detail(2).webp";
import walkerDetail3 from "@/assets/image/projects-page/walker-project/walkerIP-detail(3).webp";
import walkerDetail4 from "@/assets/image/projects-page/walker-project/walkerIP-detail(4).webp";
import walkerDetail5 from "@/assets/image/projects-page/walker-project/walkerIP-detail(5).webp";
import fidovnDetail1 from "@/assets/image/projects-page/fidovn-project/fidovn-detail1.webp";
import fidovnDetail2 from "@/assets/image/projects-page/fidovn-project/fidovn-detail2.webp";
import multiangleDetail from "@/assets/image/projects-page/multiangle-project/multiangle-detail.webp";
import tattooDetail1 from "@/assets/image/projects-page/tattoo/tattooDetail(1).webp";
import tattooDetail2 from "@/assets/image/projects-page/tattoo/tattooDetail(2).webp";
import tattooDetail3 from "@/assets/image/projects-page/tattoo/tattooDetail(3).webp";
import tattooDetail4 from "@/assets/image/projects-page/tattoo/tattooDetail(4).webp";
import tattooDetail5 from "@/assets/image/projects-page/tattoo/tattooDetail(5).webp";
import tattooDetail6 from "@/assets/image/projects-page/tattoo/tattooDetail(6).webp";
import babyDetail1 from "@/assets/image/projects-page/BabyQuip-project/babyDetail(1).webp";
import babyDetail2 from "@/assets/image/projects-page/BabyQuip-project/babyDetail(2).webp";
import babyDetail3 from "@/assets/image/projects-page/BabyQuip-project/babyDetail(3).webp";
import babyDetail4 from "@/assets/image/projects-page/BabyQuip-project/babyDetail(4).webp";
import babyDetail5 from "@/assets/image/projects-page/BabyQuip-project/babyDetail(5).webp";
import babyDetail6 from "@/assets/image/projects-page/BabyQuip-project/babyDetail(6).webp";
import signinappDetail1 from "@/assets/image/projects-page/signinapp-project/signInAppDetail(1).webp";
import signinappDetail2 from "@/assets/image/projects-page/signinapp-project/signInAppDetail(2).webp";
import signinappDetail3 from "@/assets/image/projects-page/signinapp-project/signInAppDetail(3).webp";
import signinappDetail4 from "@/assets/image/projects-page/signinapp-project/signInAppDetail(4).webp";
import signinappDetail5 from "@/assets/image/projects-page/signinapp-project/signInAppDetail(5).webp";
import signinappDetail6 from "@/assets/image/projects-page/signinapp-project/signInAppDetail(6).webp";
import signinappDetail7 from "@/assets/image/projects-page/signinapp-project/signInAppDetail(7).webp";
import singlekeyDetail1 from "@/assets/image/projects-page/singlekey-project/singlekeyDetail(1).webp";
import singlekeyDetail2 from "@/assets/image/projects-page/singlekey-project/singlekeyDetail(2).webp";
import singlekeyDetail3 from "@/assets/image/projects-page/singlekey-project/singlekeyDetail(3).webp";
import singlekeyDetail4 from "@/assets/image/projects-page/singlekey-project/singlekeyDetail(4).webp";
import singlekeyDetail5 from "@/assets/image/projects-page/singlekey-project/singlekeyDetail(5).webp";
import swipedonDetail1 from "@/assets/image/projects-page/swipedon-project/swipedonDetail(1).webp";
import swipedonDetail2 from "@/assets/image/projects-page/swipedon-project/swipedonDetail(2).webp";
import swipedonDetail3 from "@/assets/image/projects-page/swipedon-project/swipedonDetail(3).webp";


import SocialShare from "./social-share";
import ProjectNav from "./project-nav";
import { Reveal } from "@/components/ui/reveal";
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
  baby: babyPoster,
  signinapp: signInAppPoster,
  singlekey: singleKeyPoster,
  swipedon: swipedonPoster,
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
  baby: [babyDetail1, babyDetail2, babyDetail3, babyDetail4, babyDetail5, babyDetail6],
  signinapp: [signinappDetail1, signinappDetail2, signinappDetail3, signinappDetail4, signinappDetail5, signinappDetail6, signinappDetail7],
  singlekey: [singlekeyDetail1, singlekeyDetail2, singlekeyDetail3, singlekeyDetail4, singlekeyDetail5],
  swipedon: [swipedonDetail1, swipedonDetail2, swipedonDetail3],
};

function MetaValue({ value }: { value: string | string[] }) {
  const items = Array.isArray(value) ? value : [value];
  return (
    <>
      {items.map((item, i) => (
        <Reveal as="span" key={i} delayMs={i * 30} className={styles.metaValue}>
          {item}
        </Reveal>
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
        <Reveal as="div" className={styles.intro}>
          <span className={styles.category}>{project.category} &#x2022;</span>
          <h1 className={styles.title}>{project.name}</h1>
        </Reveal>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href={PATH_URL.ROOT} className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link href={PATH_URL.PROJECTS} className={styles.breadcrumbLink}>Projects</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>{project.name}</span>
        </nav>
        <div className={styles.header}>
          <Reveal as="div" variant="left" delayMs={60} className={styles.left}>
            <p className={styles.description}>{description}</p>
          </Reveal>

          <Reveal as="div" variant="right" delayMs={100} className={styles.right}>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{t("project.labels.design")}</span>
                <MetaValue value={project.design} />
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{t("project.labels.client")}</span>
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
                {t("project.labels.open")} <span aria-hidden="true"><Right /></span>
              </a>
            )}
          </Reveal>
        </div>

        {poster && (
          <Reveal as="div" variant="scale" className={styles.imageSection}>
            <SocialShare title={project.name} />
            <Image
              src={poster}
              alt={`${project.name} project preview`}
              className={styles.poster}
              sizes="100vw"
              priority
            />
          </Reveal>
        )}

        {detailImages.length > 0 && (
          <div className={styles.detailGrid}>
            {detailImages.map((img, i) => (
              <Reveal
                as="div"
                key={i}
                variant="scale"
                delayMs={(i % 4) * 70}
                className={styles.detailImageWrapper}
              >
                <Image
                  src={img}
                  alt={`${project.name} detail ${i + 1}`}
                  className={styles.detailImage}
                  style={{ width: "100%", height: "auto" }}
                  sizes="100vw"
                />
              </Reveal>
            ))}
          </div>
        )}
      </article>

      <ProjectNav currentSlug={project.slug} />
    </>
  );
}
