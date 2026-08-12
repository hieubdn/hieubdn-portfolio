"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

import styles from "./education-block.module.scss";
import { Certificate } from "@/assets/svg";
import { Reveal } from "@/components/ui/reveal";

export default function EducationBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <Reveal as="h3" className={styles.headingBlock}>
        {t("about.page.education.title")}
      </Reveal>
      <ul className={styles.list}>
        <Reveal as="li" delayMs={80}>
          <Reveal as="span" className={styles.title}>
            <Certificate />
            {t("about.page.education.fullstack")}
          </Reveal>
          <Reveal as="span" delayMs={15} className={styles.date}>
            {t("about.page.education.fullstack.date")}
          </Reveal>
          <Reveal as="span" delayMs={30} className={styles.issuedBy}>
            {t("about.page.education.issuedBy")}
          </Reveal>
        </Reveal>
        <Reveal as="li" delayMs={150}>
          <Reveal as="span" className={styles.title}>
            <Certificate />
            {t("about.page.education.mobileapp")}
          </Reveal>
          <Reveal as="span" delayMs={15} className={styles.date}>
            {t("about.page.education.mobileapp.date")}
          </Reveal>
          <Reveal as="span" delayMs={30} className={styles.issuedBy}>
            {t("about.page.education.issuedBy")}
          </Reveal>
        </Reveal>
      </ul>
    </div>
  );
}
