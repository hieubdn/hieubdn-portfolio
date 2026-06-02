export type NewsSource =
  | "devto"
  | "githubblog"
  | "techcrunch"
  | "infoq"
  | "theverge"
  | "arstechnica"
  | "venturebeat"
  | "wired";

export interface NewsArticle {
  id: string;
  source: NewsSource;
  sourceName: string;
  title: string;
  url: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  points?: number;
  commentCount?: number;
}
