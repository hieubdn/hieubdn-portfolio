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

/** Parses an RSS `pubDate` defensively — a single unparseable date must not
 * throw and take down the whole feed via the uncaught `RangeError` that
 * `toISOString()` raises on an Invalid Date. */
function parsePubDate(pubDate: string): string {
  if (!pubDate) return new Date(0).toISOString();
  const parsed = new Date(pubDate);
  return Number.isNaN(parsed.getTime())
    ? new Date(0).toISOString()
    : parsed.toISOString();
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
    const rawDescription = extractTag(block, "description");
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
      excerpt: stripHTML(decodeEntities(rawDescription)).slice(0, 220),
      publishedAt: parsePubDate(pubDate),
      author: author ? decodeEntities(author) : undefined,
    });
  }

  return items;
}

export async function fetchDevTo(): Promise<NewsArticle[]> {
  const res = await fetch(
    "https://dev.to/api/articles?top=1&per_page=10",
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

export async function fetchGitHubBlog(): Promise<NewsArticle[]> {
  const res = await fetch("https://github.blog/feed/", FETCH_OPTS);
  if (!res.ok) throw new Error(`GitHub Blog responded ${res.status}`);
  const xml = await res.text();
  return parseRSS(xml, "githubblog", "GitHub Blog", 10);
}

export async function fetchTechCrunch(): Promise<NewsArticle[]> {
  const res = await fetch("https://techcrunch.com/feed/", FETCH_OPTS);
  if (!res.ok) throw new Error(`TechCrunch responded ${res.status}`);
  const xml = await res.text();
  return parseRSS(xml, "techcrunch", "TechCrunch", 10);
}

export async function fetchInfoQ(): Promise<NewsArticle[]> {
  const res = await fetch("https://feed.infoq.com/", FETCH_OPTS);
  if (!res.ok) throw new Error(`InfoQ responded ${res.status}`);
  const xml = await res.text();
  return parseRSS(xml, "infoq", "InfoQ", 10);
}

export async function fetchTheVerge(): Promise<NewsArticle[]> {
  const res = await fetch("https://www.theverge.com/rss/index.xml", FETCH_OPTS);
  if (!res.ok) throw new Error(`The Verge responded ${res.status}`);
  const xml = await res.text();
  return parseRSS(xml, "theverge", "The Verge", 10);
}

export async function fetchArsTechnica(): Promise<NewsArticle[]> {
  const res = await fetch("https://feeds.arstechnica.com/arstechnica/index.rss", FETCH_OPTS);
  if (!res.ok) throw new Error(`Ars Technica responded ${res.status}`);
  const xml = await res.text();
  return parseRSS(xml, "arstechnica", "Ars Technica", 10);
}

export async function fetchVentureBeat(): Promise<NewsArticle[]> {
  const res = await fetch("https://venturebeat.com/feed/", FETCH_OPTS);
  if (!res.ok) throw new Error(`VentureBeat responded ${res.status}`);
  const xml = await res.text();
  return parseRSS(xml, "venturebeat", "VentureBeat", 10);
}

export async function fetchWired(): Promise<NewsArticle[]> {
  const res = await fetch("https://www.wired.com/feed/rss", FETCH_OPTS);
  if (!res.ok) throw new Error(`Wired responded ${res.status}`);
  const xml = await res.text();
  return parseRSS(xml, "wired", "Wired", 10);
}
