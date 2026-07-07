import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

import {
  parseSurveySubmission,
  renderSurveyAdminHtml,
  renderSurveyAdminText,
} from "@/lib/acadify/survey-email";
import { formatSubmittedAt } from "@/lib/contact/admin-email";
import { clientIpFromHeaders, createRateLimiter } from "@/lib/contact/rate-limit";
import { isHoneypotTripped } from "@/lib/contact/validation";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const checkRateLimit = createRateLimiter(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    console.error("[acadify-survey] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
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

  if (isHoneypotTripped(body)) {
    console.warn("[acadify-survey] Honeypot tripped, dropping submission from", ip);
    return NextResponse.json({ ok: true });
  }

  const input = parseSurveySubmission(body);
  if (!input) {
    return NextResponse.json(
      { ok: false, error: "Invalid survey data." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);
  const submittedAt = formatSubmittedAt(new Date());
  const sender = `Bùi Đỗ Ngọc Hiếu <${fromEmail}>`;
  const subject = input.name
    ? `[Acadify] Khảo sát giáo viên — ${input.name}`
    : "[Acadify] Khảo sát giáo viên";

  try {
    const adminResult = await resend.emails.send({
      from: sender,
      to: [toEmail],
      subject,
      html: renderSurveyAdminHtml(input, submittedAt),
      text: renderSurveyAdminText(input, submittedAt),
    });

    if (adminResult.error) {
      console.error("[acadify-survey] Resend admin error:", adminResult.error);
      return NextResponse.json(
        { ok: false, error: "Failed to send email." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[acadify-survey] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 },
    );
  }
}
