export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX_LENGTH = {
  name: 120,
  email: 200,
  subject: 200,
  message: 5000,
} as const;

/**
 * Hidden form field used as a honeypot: real users never fill it, bots do.
 * Must stay in sync with the hidden input rendered by the contact form.
 */
export const HONEYPOT_FIELD = "company";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// `name`/`subject` are rendered into single-line contexts (an email Subject:
// header, a one-line summary row); a CR/LF in either could be used to try to
// inject extra headers downstream. `message` is intentionally excluded — it's
// a free-form multi-line field, and `email` already can't contain them since
// EMAIL_PATTERN excludes all whitespace.
const SINGLE_LINE_FIELDS = new Set<keyof ContactInput>(["name", "subject"]);
const CONTROL_CHAR_PATTERN = /[\r\n]/;

export function parseInput(body: unknown): ContactInput | null {
  if (!body || typeof body !== "object") return null;
  const source = body as Record<string, unknown>;
  const out = {} as ContactInput;
  for (const field of Object.keys(MAX_LENGTH) as (keyof ContactInput)[]) {
    const value = source[field];
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > MAX_LENGTH[field]) return null;
    if (SINGLE_LINE_FIELDS.has(field) && CONTROL_CHAR_PATTERN.test(trimmed)) {
      return null;
    }
    out[field] = trimmed;
  }
  return EMAIL_PATTERN.test(out.email) ? out : null;
}

export function isHoneypotTripped(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

export function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
