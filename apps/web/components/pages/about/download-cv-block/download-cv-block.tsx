"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./download-cv-block.module.scss";
import Image from "next/image";
import Cv from "@/assets/image/CV/profile.png";
import CvPdf from "@/assets/image/CV/BuiDoNgocHieu.pdf";
import { Reveal } from "@/components/ui/reveal";

export default function DownloadCvBlock() {
  const { t } = useLocaleText();

  return (
    <a
      className={styles.root}
      href={CvPdf}
      download="BuiDoNgocHieu.pdf"
    >
      <Reveal as="div" variant="scale" className={styles.thumbnail}>
        <Image src={Cv} alt="CV" width={100} height={100} />
      </Reveal>
      <Reveal as="div" variant="fade" delayMs={90} className={styles.footer}>
        <Reveal as="p" className={styles.kicker}>
          {t("about.cv.kicker")}
        </Reveal>
        <Reveal as="p" delayMs={40} className={styles.title}>
          {t("about.cv.title")}
        </Reveal>
      </Reveal>
    </a>
  );
}
