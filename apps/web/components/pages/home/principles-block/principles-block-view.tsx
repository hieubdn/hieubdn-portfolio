"use client";

import Link from "next/link";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import type { NewsArticle } from "@/lib/news";
import { PATH_URL } from "@/config/path";
import { Reveal } from "@/components/ui/reveal";

import styles from "./principles-block.module.scss";

const SOURCE_COLORS: Record<string, string> = {
  devto: "#3b49df",
  githubblog: "#2ea44f",
  techcrunch: "#00c853",
  infoq: "#0288d1",
  theverge: "#fa4522",
  arstechnica: "#ff6d00",
  venturebeat: "#7c4dff",
  wired: "#e91e63",
};

function relativeTime(iso: string, t: (key: string) => string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return t("news.time.lessThanHour");
  if (h < 24) return t("news.time.hoursAgo").replace("{h}", String(h));
  const d = Math.floor(h / 24);
  return t("news.time.daysAgo").replace("{d}", String(d));
}

export default function PrinciplesBlockView({
  articles,
}: {
  articles: NewsArticle[];
}) {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <Reveal as="div" className={styles.header}>
        <span className={styles.label}>{t("home.news.title")}</span>
      </Reveal>

      <ul className={styles.list} role="list">
        {articles.length === 0 && (
          <li className={styles.empty}>{t("home.news.empty")}</li>
        )}
        {articles.map((article, index) => (
          <Reveal as="li" key={article.id} delayMs={index * 60} className={styles.item}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span
                className={styles.dot}
                style={{ background: SOURCE_COLORS[article.source] ?? "#888" }}
                aria-hidden
              />
              <span className={styles.title}>{article.title}</span>
              <span className={styles.time}>
                {relativeTime(article.publishedAt, t)}
              </span>
            </a>
          </Reveal>
        ))}
      </ul>

      <Reveal as={Link} href={PATH_URL.NEWS} className={styles.viewAll} prefetch={false}>
        {t("home.news.viewAll")}
      </Reveal>
    </div>
  );
}
