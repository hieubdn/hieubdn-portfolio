/**
 * Fixed-window in-memory rate limiter.
 *
 * State lives in module scope, so on serverless it is per warm instance and
 * resets on cold starts. That is acceptable here: the goal is to stop naive
 * scripted abuse of the contact form (Resend quota burn / inbox spam), not to
 * be a distributed quota system.
 */

type WindowEntry = {
  count: number;
  windowStartMs: number;
};

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

const MAX_TRACKED_KEYS = 10_000;

export function createRateLimiter(maxRequests: number, windowMs: number) {
  const entries = new Map<string, WindowEntry>();

  return function check(key: string, nowMs = Date.now()): RateLimitResult {
    const entry = entries.get(key);

    if (!entry || nowMs - entry.windowStartMs >= windowMs) {
      // Cap memory: drop the whole map rather than tracking eviction order.
      if (entries.size >= MAX_TRACKED_KEYS) entries.clear();
      entries.set(key, { count: 1, windowStartMs: nowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    if (entry.count < maxRequests) {
      entry.count += 1;
      return { allowed: true, retryAfterSeconds: 0 };
    }

    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((entry.windowStartMs + windowMs - nowMs) / 1000),
    );
    return { allowed: false, retryAfterSeconds };
  };
}

export function clientIpFromHeaders(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") ?? "unknown";
}
