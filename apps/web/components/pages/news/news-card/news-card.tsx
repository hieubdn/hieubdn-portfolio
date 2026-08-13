"use client";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import type { NewsArticle, NewsSource } from "@/lib/news";
import { Reveal } from "@/components/ui/reveal";

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

function formatDate(iso: string, locale: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
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
  const formattedDate = formatDate(article.publishedAt, locale);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={article.title}
    >
      <Reveal as="div" variant="fade" className={styles.meta}>
        <span className={`${styles.badge} ${styles[article.source]}`}>
          {SOURCE_LABELS[article.source]}
        </span>
        {formattedDate && (
          <time className={styles.date} dateTime={article.publishedAt}>
            {formattedDate}
          </time>
        )}
      </Reveal>

      <Reveal as="h3" delayMs={60} className={styles.title}>
        {article.title}
      </Reveal>

      <Reveal as="p" delayMs={110} className={styles.excerpt}>
        {article.excerpt || " "}
      </Reveal>

      <div className={styles.footer}>
        {hasStats && (
          <span className={styles.stats}>
            {article.points !== undefined &&
              t("news.points").replace("{n}", String(article.points))}
            {article.points !== undefined &&
              article.commentCount !== undefined &&
              " · "}
            {article.commentCount !== undefined &&
              t("news.comments").replace(
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
