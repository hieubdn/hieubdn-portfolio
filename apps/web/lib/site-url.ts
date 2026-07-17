export function getSiteUrl(): string {
  const site = process.env.NEXT_SITE_URL?.trim();
  const resolved = site
    ? /^https?:\/\//i.test(site)
      ? site
      : `https://${site}`
    : process.env.VERCEL_URL != null
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
  return resolved.replace(/\/+$/, "");
}
