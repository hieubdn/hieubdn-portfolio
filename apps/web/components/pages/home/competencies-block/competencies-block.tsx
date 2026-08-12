"use client";

import {
  useCallback,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
} from "react";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import {
  MobileDevelopment,
  SoftwareEngineer,
  WebDevelopment,
} from "@/assets/svg";
import { Reveal } from "@/components/ui/reveal";
import styles from "./competencies.module.scss";

type CompetencyKey = "software" | "website" | "mobileApp";

type Competency = {
  key: CompetencyKey;
  Icon: ComponentType;
  accent: string;
};

const COMPETENCIES: readonly Competency[] = [
  { key: "software", Icon: SoftwareEngineer, accent: "#ff2d8c" },
  { key: "website", Icon: WebDevelopment, accent: "#4a9eff" },
  { key: "mobileApp", Icon: MobileDevelopment, accent: "#ff8c42" },
];

export default function CompetenciesBlock() {
  const { t } = useLocaleText();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<CompetencyKey | null>(null);

  const open = useCallback((key: CompetencyKey) => {
    setSelected(key);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const active = COMPETENCIES.find((c) => c.key === selected);

  return (
    <div className={styles.root} aria-label={t("competencies.block.title")}>
      <div className={styles.meta}>
        {COMPETENCIES.map(({ key, Icon }, index) => (
          <Reveal
            as="button"
            key={key}
            type="button"
            variant="scale"
            delayMs={index * 70}
            className={styles.item}
            onClick={() => open(key)}
          >
            <Icon />
            <Reveal as="span" className={styles.text}>
              {t(`competencies.block.${key}`)}
            </Reveal>
          </Reveal>
        ))}
      </div>
      <div className={styles.caption}>
        <Reveal as="p" delayMs={210} className={styles.sectionSubtitle}>
          {t("competencies.block.kicker")}
        </Reveal>
        <Reveal as="h2" delayMs={280} className={styles.sectionTitle}>
          {t("competencies.block.title")}
        </Reveal>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="competency-title"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {active ? (
          <article className={styles.card}>
            <button
              type="button"
              className={styles.close}
              onClick={close}
              aria-label={t("competencies.popup.close")}
            >
              ×
            </button>

            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}><active.Icon /></span>
              <div className={styles.cardTitleContainer}>
                <span
                  id="competency-title"
                  className={`${styles.cardTitle} ${styles.underline}`}
                  style={{ "--underline-color": active.accent } as CSSProperties}
                >
                  {t(`competencies.popup.${active.key}.title`)}
                </span>
                <span className={styles.cardSubtitle}>{t(`competencies.popup.${active.key}.subtitle`)}</span>
              </div>
            </div>

            <div>
              <span className={styles.tag}>&lt;span&gt;</span>
              <p className={styles.description}>
                {t(`competencies.popup.${active.key}.description`)}
              </p>
              <span className={styles.tag}>&lt;/span&gt;</span></div>

          </article>
        ) : null}
      </dialog>
    </div>
  );
}
