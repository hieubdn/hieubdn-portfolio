"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./download-cv-block.module.scss";
import Image from "next/image";
import Cv from "@/assets/image/CV/profile.png";
import CvPdf from "@/assets/image/CV/BuiDoNgocHieu.pdf";

export default function DownloadCvBlock() {
  const { t } = useLocaleText();

  return (
    <a
      className={styles.root}
      href={CvPdf}
      download="BuiDoNgocHieu.pdf"
    >
      <div className={styles.meta}>
        <Image src={Cv} alt="CV" width={100} height={100} />
      </div>
      <div className={styles.footer}>
        <p className={styles.kicker}>{t("about.page.cv.kicker")}</p>
        <p className={styles.title}>{t("about.page.cv.title")}</p>
      </div>
    </a>
  );
}
