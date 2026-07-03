"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import type { NewsArticle, NewsSource } from "@/lib/news";

import styles from "./news-card.module.scss";

const SOURCE_LABELS: Record<NewsSource, string> = {
  devto: "Dev.to",
  githubblog: "GitHub Blog",
  techcrunch: "TechCrunch",
  infoq: "InfoQ",
  theverge: "The Verge",
  arstechnica: "Ars Technica",
  venturebeat: "VentureBeat",
  wired: "Wired",
};

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsCard({ article }: { article: NewsArticle }) {
  const { t, locale } = useLocaleText();
  const hasStats =
    article.points !== undefined || article.commentCount !== undefined;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={article.title}
    >
      <div className={styles.meta}>
        <span className={`${styles.badge} ${styles[article.source]}`}>
          {SOURCE_LABELS[article.source]}
        </span>
        <time className={styles.date} dateTime={article.publishedAt}>
          {formatDate(article.publishedAt, locale)}
        </time>
      </div>

      <h3 className={styles.title}>{article.title}</h3>

      <p className={styles.excerpt}>
        {article.excerpt || " "}
      </p>

      <div className={styles.footer}>
        {hasStats && (
          <span className={styles.stats}>
            {article.points !== undefined &&
              t("news.card.points").replace("{n}", String(article.points))}
            {article.points !== undefined &&
              article.commentCount !== undefined &&
              " · "}
            {article.commentCount !== undefined &&
              t("news.card.comments").replace(
                "{n}",
                String(article.commentCount),
              )}
          </span>
        )}
        {article.author && (
          <span className={styles.author}>{article.author}</span>
        )}
      </div>
    </a>
  );
}
