import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

import {
  formatSubmittedAt,
  renderAdminHtml,
  renderAdminText,
} from "@/lib/contact/admin-email";
import { clientIpFromHeaders, createRateLimiter } from "@/lib/contact/rate-limit";
import { isHoneypotTripped, parseInput } from "@/lib/contact/validation";

export const runtime = "nodejs";

// 3 submissions per 10 minutes per IP — generous for humans, blocks scripts.
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const checkRateLimit = createRateLimiter(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json(
      { ok: false, error: "Server is not configured." },
      { status: 500 },
    );
  }

  const ip = clientIpFromHeaders(request.headers);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Bots that fill the hidden field get a fake success so they don't adapt.
  if (isHoneypotTripped(body)) {
    console.warn("[contact] Honeypot tripped, dropping submission from", ip);
    return NextResponse.json({ ok: true });
  }

  const input = parseInput(body);
  if (!input) {
    return NextResponse.json(
      { ok: false, error: "Invalid contact form data." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);
  const submittedAt = formatSubmittedAt(new Date());
  const sender = `Bùi Đỗ Ngọc Hiếu <${fromEmail}>`;

  try {
    const adminResult = await resend.emails.send({
      from: sender,
      to: [toEmail],
      replyTo: input.email,
      subject: `[hieubdn] ${input.subject}`,
      html: renderAdminHtml(input, submittedAt),
      text: renderAdminText(input, submittedAt),
    });

    if (adminResult.error) {
      console.error("[contact] Resend admin error:", adminResult.error);
      return NextResponse.json(
        { ok: false, error: "Failed to send email." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 },
    );
  }
}
