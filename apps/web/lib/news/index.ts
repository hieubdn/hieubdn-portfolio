import { unstable_cache } from "next/cache";

import {
  fetchArsTechnica,
  fetchDevTo,
  fetchGitHubBlog,
  fetchInfoQ,
  fetchTechCrunch,
  fetchTheVerge,
  fetchVentureBeat,
  fetchWired,
} from "./fetchers";
import type { NewsArticle, NewsSource } from "./types";

const MAX_ARTICLES = 50;

const SPAM_KEYWORDS = [
  "coupon",
  "promo code",
  "promo codes",
  "% off",
  "discount code",
  "save up to",
  "best deals",
  "deal of the day",
  "voucher",
];

function isSpam(title: string, excerpt: string): boolean {
  const text = (title + " " + excerpt).toLowerCase();
  return SPAM_KEYWORDS.some((kw) => text.includes(kw));
}

async function fetchAllNews(): Promise<NewsArticle[]> {
  const results = await Promise.allSettled([
    fetchDevTo(),
    fetchGitHubBlog(),
    fetchTechCrunch(),
    fetchInfoQ(),
    fetchTheVerge(),
    fetchArsTechnica(),
    fetchVentureBeat(),
    fetchWired(),
  ]);

  // Group by source, dedup by URL, filter spam/no-excerpt
  const bySource = new Map<NewsSource, NewsArticle[]>();
  const seenUrls = new Set<string>();

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    for (const article of result.value) {
      if (!article.excerpt.trim()) continue;
      if (isSpam(article.title, article.excerpt)) continue;
      if (seenUrls.has(article.url)) continue;
      seenUrls.add(article.url);

      const bucket = bySource.get(article.source) ?? [];
      bucket.push(article);
      bySource.set(article.source, bucket);
    }
  }

  // Sort each source bucket by date desc
  for (const bucket of bySource.values()) {
    bucket.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }

  // Round-robin interleave: 1 article from each source per round
  const queues = Array.from(bySource.values());
  const interleaved: NewsArticle[] = [];

  let madeProgress = true;
  while (madeProgress && interleaved.length < MAX_ARTICLES) {
    madeProgress = false;
    for (const queue of queues) {
      const article = queue.shift();
      if (article) {
        interleaved.push(article);
        madeProgress = true;
        if (interleaved.length >= MAX_ARTICLES) break;
      }
    }
  }

  return interleaved;
}

export const getNews = unstable_cache(fetchAllNews, ["news-articles"], {
  revalidate: 900,
});

export type { NewsArticle, NewsSource } from "./types";
