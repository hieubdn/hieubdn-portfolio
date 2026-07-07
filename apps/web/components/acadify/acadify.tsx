"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { PATH_URL } from "@/config/path";

import {
  ACADIFY_CONTENT,
  type AcadifyLang,
  type AcadifyTable,
} from "./acadify-data";
import styles from "./acadify.module.scss";

const LANG_STORAGE_KEY = "acadify-lang";

function VietnamFlag() {
  return (
    <svg viewBox="0 0 30 20" className={styles.flag} aria-hidden="true">
      <rect width="30" height="20" fill="#DA251D" />
      <polygon
        fill="#FFFF00"
        points="15,4 16.41,8.06 20.71,8.15 17.28,10.74 18.53,14.85 15,12.4 11.47,14.85 12.72,10.74 9.29,8.15 13.59,8.06"
      />
    </svg>
  );
}

function UKFlag() {
  return (
    <svg viewBox="0 0 60 40" className={styles.flag} aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#FFFFFF" strokeWidth="8" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0 V40 M0 20 H60" stroke="#FFFFFF" strokeWidth="12" />
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="7" />
    </svg>
  );
}

function SectionHeading({ number, title }: { number: number; title: string }) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.sectionNumber} aria-hidden="true">
        {number}
      </span>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
  );
}

function DataTable({ table }: { table: AcadifyTable }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {table.headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cell}
                  className={cellIndex === 0 ? styles.tableLeadCell : undefined}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Acadify() {
  const [lang, setLang] = useState<AcadifyLang>("vi");

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "vi" || stored === "en") setLang(stored);
  }, []);

  const switchLang = (next: AcadifyLang) => {
    setLang(next);
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
  };

  const content = ACADIFY_CONTENT[lang];

  return (
    <div className={styles.acadify} lang={lang}>
      <div className={styles.topBar}>
        <div className={styles.topBarActions}>
          <div
            className={styles.langToggle}
            role="group"
            aria-label={content.langToggleLabel}
          >
            <button
              type="button"
              className={`${styles.langOption} ${lang === "vi" ? styles.langOptionActive : ""}`}
              onClick={() => switchLang("vi")}
              aria-pressed={lang === "vi"}
              aria-label="Tiếng Việt"
            >
              <VietnamFlag />
              <span>VI</span>
            </button>
            <button
              type="button"
              className={`${styles.langOption} ${lang === "en" ? styles.langOptionActive : ""}`}
              onClick={() => switchLang("en")}
              aria-pressed={lang === "en"}
              aria-label="English"
            >
              <UKFlag />
              <span>EN</span>
            </button>
          </div>
          <Link href={PATH_URL.ACADIFY_SURVEY} className={styles.feedbackButton}>
            {content.surveyCta}
          </Link>
        </div>
      </div>

      <article className={styles.document}>
        <header className={styles.hero}>
          <p className={styles.heroKicker}>{content.hero.kicker}</p>
          <h1 className={styles.heroTitle}>{content.hero.title}</h1>
          <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>
          <p className={styles.heroMeta}>{content.hero.meta}</p>
        </header>

        <div className={styles.body}>
          <p className={styles.intro}>{content.intro}</p>

          <section className={styles.section}>
            <SectionHeading number={1} title={content.problem.title} />
            <p className={styles.lead}>{content.problem.lead}</p>
            <ul className={styles.bullets}>
              {content.problem.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <SectionHeading number={2} title={content.goals.title} />
            <p className={styles.lead}>{content.goals.lead}</p>
            <div className={styles.phaseBox}>
              <strong className={styles.phaseTitle}>
                {content.goals.phaseTitle}
              </strong>
              <p>{content.goals.phaseBody}</p>
            </div>
          </section>

          <section className={styles.section}>
            <SectionHeading number={3} title={content.solution.title} />
            <p className={styles.lead}>{content.solution.lead}</p>
            <ol className={styles.steps}>
              {content.solution.steps.map((step, index) => (
                <li key={`${step.actor}-${index}`} className={styles.step}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className={styles.stepActor}>{step.actor}</span>
                  <span className={styles.stepDescription}>
                    {step.description}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.section}>
            <SectionHeading number={4} title={content.features.title} />
            <h3 className={styles.subHeading}>{content.features.web.title}</h3>
            <p className={styles.lead}>{content.features.web.lead}</p>
            <DataTable table={content.features.web.table} />
            <h3 className={styles.subHeading}>
              {content.features.mobile.title}
            </h3>
            <p className={styles.lead}>{content.features.mobile.lead}</p>
            <DataTable table={content.features.mobile.table} />
          </section>

          <section className={styles.section}>
            <SectionHeading number={5} title={content.comparison.title} />
            <p className={styles.lead}>{content.comparison.lead}</p>
            <DataTable table={content.comparison.table} />
            <div className={styles.summaryBox}>
              <strong className={styles.summaryTitle}>
                {content.comparison.summaryTitle}
              </strong>
              <p>{content.comparison.summaryBody}</p>
            </div>
          </section>

          <section className={styles.section}>
            <SectionHeading number={6} title={content.stage.title} />
            <p className={styles.lead}>{content.stage.lead}</p>
            <ul className={styles.bullets}>
              {content.stage.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>

          <p className={styles.closing}>{content.closing}</p>
        </div>
      </article>

    </div>
  );
}
