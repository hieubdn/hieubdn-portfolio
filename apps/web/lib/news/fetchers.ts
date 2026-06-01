import { createHash } from "crypto";

import type { NewsArticle, NewsSource } from "./types";

const FETCH_OPTS = { next: { revalidate: 900 } } as const;

function extractTag(xml: string, tag: string): string {
  const cdata = xml.match(
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`, "i"),
  );
  const cdataVal = cdata?.[1];
  if (cdataVal) return cdataVal.trim();
  const plain = xml.match(
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"),
  );
  const plainVal = plain?.[1];
  if (plainVal) return plainVal.trim();
  return "";
}

function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”");
}

function makeId(source: NewsSource, url: string): string {
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 12);
  return `${source}-${hash}`;
}

function parseRSS(
  xml: string,
  source: NewsSource,
  sourceName: string,
  limit = 5,
): NewsArticle[] {
  const items: NewsArticle[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null && items.length < limit) {
    const block = match[1];
    if (!block) continue;
    const title = decodeEntities(extractTag(block, "title"));
    const link =
      extractTag(block, "feedburner:origLink") || extractTag(block, "link");
    const description = extractTag(block, "description");
    const pubDate = extractTag(block, "pubDate");
    const author =
      extractTag(block, "dc:creator") || extractTag(block, "author");

    if (!title || !link) continue;

    items.push({
      id: makeId(source, link),
      source,
      sourceName,
      title,
      url: link,
      excerpt: stripHTML(description).slice(0, 220),
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date(0).toISOString(),
      author: author ? decodeEntities(author) : undefined,
    });
  }

  return items;
}

export async function fetchDevTo(): Promise<NewsArticle[]> {
  const res = await fetch(
    "https://dev.to/api/articles?top=1&per_page=5",
    FETCH_OPTS,
  );
  if (!res.ok) throw new Error(`Dev.to responded ${res.status}`);
  const data = (await res.json()) as Array<{
    id: number;
    title: string;
    url: string;
    description: string;
    published_at: string;
    user?: { name: string };
  }>;
  return data.map((a) => ({
    id: `devto-${a.id}`,
    source: "devto" as const,
    sourceName: "Dev.to",
    title: a.title,
    url: a.url,
    excerpt: a.description ?? "",
    publishedAt: a.published_at,
    author: a.user?.name,
  }));
}

export async function fetchHackerNews(): Promise<NewsArticle[]> {
  const idsRes = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
    FETCH_OPTS,
  );
  if (!idsRes.ok) throw new Error(`HN responded ${idsRes.status}`);
  const ids = (await idsRes.json()) as number[];
  const top5 = ids.slice(0, 5);

  const stories = await Promise.all(
    top5.map((id) =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        FETCH_OPTS,
      ).then((r) => r.json()),
    ),
  );

  return (stories as Array<{
    id: number;
    title: string;
    url?: string;
    score: number;
    descendants?: number;
    time: number;
    by: string;
  }>)
    .filter((s) => s?.url)
    .map((s) => ({
      id: `hn-${s.id}`,
      source: "hackernews" as const,
      sourceName: "Hacker News",
      title: s.title,
      url: s.url!,
      excerpt: `${s.score} points · ${s.descendants ?? 0} comments`,
      publishedAt: new Date(s.time * 1000).toISOString(),
      author: s.by,
    }));
}

export async function fetchTechCrunch(): Promise<NewsArticle[]> {
  const res = await fetch("https://techcrunch.com/feed/", FETCH_OPTS);
  if (!res.ok) throw new Error(`TechCrunch responded ${res.status}`);
  const xml = await res.text();
  return parseRSS(xml, "techcrunch", "TechCrunch");
}

export async function fetchInfoQ(): Promise<NewsArticle[]> {
  const res = await fetch("https://feed.infoq.com/", FETCH_OPTS);
  if (!res.ok) throw new Error(`InfoQ responded ${res.status}`);
  const xml = await res.text();
  return parseRSS(xml, "infoq", "InfoQ");
}
