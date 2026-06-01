export type NewsSource = "devto" | "hackernews" | "techcrunch" | "infoq";

export interface NewsArticle {
  id: string;
  source: NewsSource;
  sourceName: string;
  title: string;
  url: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
}
