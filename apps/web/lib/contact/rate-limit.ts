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

const MAX_TRACKED_KEYS = 50_000;

export function createRateLimiter(maxRequests: number, windowMs: number) {
  const entries = new Map<string, WindowEntry>();

  const evictIfNeeded = (nowMs: number) => {
    if (entries.size < MAX_TRACKED_KEYS) return;
    for (const [trackedKey, trackedEntry] of entries) {
      if (nowMs - trackedEntry.windowStartMs >= windowMs) entries.delete(trackedKey);
    }
    while (entries.size >= MAX_TRACKED_KEYS) {
      const oldestKey = entries.keys().next().value;
      if (oldestKey === undefined) break;
      entries.delete(oldestKey);
    }
  };

  return function check(key: string, nowMs = Date.now()): RateLimitResult {
    const entry = entries.get(key);

    if (!entry || nowMs - entry.windowStartMs >= windowMs) {
      evictIfNeeded(nowMs);
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

/**
 * `x-real-ip` is set by the platform's edge for the actual connecting client
 * and can't be forged by the request itself, so it's trusted first. Within
 * `x-forwarded-for`, the *first* entry is attacker-suppliable (it's whatever
 * the original client put there); the *last* entry is the one closest to our
 * own trusted edge, so it's the one to key the rate limit on.
 */
export function clientIpFromHeaders(headers: Headers): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor.split(",");
    const last = parts[parts.length - 1]?.trim();
    if (last) return last;
  }

  return "unknown";
}
