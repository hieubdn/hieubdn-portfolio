import { describe, expect, it } from "vitest";

import { clientIpFromHeaders, createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the configured number of requests in a window", () => {
    const check = createRateLimiter(3, 60_000);
    const now = 1_000_000;
    expect(check("ip", now).allowed).toBe(true);
    expect(check("ip", now + 1).allowed).toBe(true);
    expect(check("ip", now + 2).allowed).toBe(true);
    expect(check("ip", now + 3).allowed).toBe(false);
  });

  it("reports a sensible Retry-After when blocked", () => {
    const check = createRateLimiter(1, 60_000);
    const now = 1_000_000;
    check("ip", now);
    const blocked = check("ip", now + 30_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(30);
  });

  it("resets after the window elapses", () => {
    const check = createRateLimiter(1, 60_000);
    const now = 1_000_000;
    expect(check("ip", now).allowed).toBe(true);
    expect(check("ip", now + 59_999).allowed).toBe(false);
    expect(check("ip", now + 60_000).allowed).toBe(true);
  });

  it("tracks keys independently", () => {
    const check = createRateLimiter(1, 60_000);
    const now = 1_000_000;
    expect(check("a", now).allowed).toBe(true);
    expect(check("b", now).allowed).toBe(true);
    expect(check("a", now + 1).allowed).toBe(false);
  });

  it("evicts only as needed under the tracked-key cap instead of wiping everything", () => {
    const check = createRateLimiter(1, 60_000);
    const now = 1_000_000;

    const FLOOD_COUNT = 50_001;
    for (let i = 0; i < FLOOD_COUNT; i += 1) {
      check(`flood-${i}`, now);
    }

    expect(check(`flood-${FLOOD_COUNT - 2}`, now + 1).allowed).toBe(false);
  });
});

describe("clientIpFromHeaders", () => {
  it("prefers x-real-ip over x-forwarded-for, since the platform sets it directly", () => {
    const headers = new Headers({
      "x-real-ip": "203.0.113.9",
      "x-forwarded-for": "203.0.113.7, 10.0.0.1",
    });
    expect(clientIpFromHeaders(headers)).toBe("203.0.113.9");
  });

  it("uses the last x-forwarded-for entry, not the first — the first is client-suppliable and would let a caller spoof a fresh IP per request", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.7, 10.0.0.1",
    });
    expect(clientIpFromHeaders(headers)).toBe("10.0.0.1");
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", () => {
    const headers = new Headers({ "x-real-ip": "203.0.113.9" });
    expect(clientIpFromHeaders(headers)).toBe("203.0.113.9");
  });

  it("returns 'unknown' when no header is present", () => {
    expect(clientIpFromHeaders(new Headers())).toBe("unknown");
  });
});
