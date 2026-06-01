import type { NewsArticle, NewsSource } from "@/lib/news";

import styles from "./news-card.module.scss";

const SOURCE_LABELS: Record<NewsSource, string> = {
  devto: "Dev.to",
  hackernews: "Hacker News",
  techcrunch: "TechCrunch",
  infoq: "InfoQ",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsCard({ article }: { article: NewsArticle }) {
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
          {formatDate(article.publishedAt)}
        </time>
      </div>
      <h3 className={styles.title}>{article.title}</h3>
      {article.excerpt && (
        <p className={styles.excerpt}>{article.excerpt}</p>
      )}
      {article.author && (
        <p className={styles.author}>{article.author}</p>
      )}
    </a>
  );
}
