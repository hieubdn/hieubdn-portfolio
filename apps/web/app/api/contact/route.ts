import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hieubdn.vercel.app";
const MAX_LENGTH = {
  name: 120,
  email: 200,
  subject: 200,
  message: 5000,
} as const;

type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function parseInput(body: unknown): ContactInput | null {
  if (!body || typeof body !== "object") return null;
  const source = body as Record<string, unknown>;
  const out = {} as ContactInput;
  for (const field of Object.keys(MAX_LENGTH) as (keyof ContactInput)[]) {
    const value = source[field];
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > MAX_LENGTH[field]) return null;
    out[field] = trimmed;
  }
  return EMAIL_PATTERN.test(out.email) ? out : null;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatSubmittedAt(date: Date): string {
  const timeZone = "Asia/Ho_Chi_Minh";
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  }).format(date);
  const day = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(date);
  return `${time} ${day}`;
}

function renderBrandFooter(): string {
  return `
      <div
        style="
          padding: 32px 8px 8px 8px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
          font-weight: 390;
          line-height: 24px;
          letter-spacing: 1.2px;
        "
      >
        © 2026 - Powered by Bui Do Ngoc Hieu
      </div>

      <div
        style="
          padding: 0 8px 8px 8px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
          font-weight: 390;
          line-height: 24px;
          letter-spacing: 1.2px;
        "
      >
        Da Nang, Viet Nam
      </div>

      <div
        style="
          padding: 0 8px 8px 8px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
          font-weight: 390;
          line-height: 24px;
          letter-spacing: 1.2px;
        "
      >
        <a href="https://hieubdn.vercel.app/" style="text-decoration: none; margin: 0 6px;">
          <img
            src="${SITE_URL}/icons/website.png"
            alt="Website"
            width="24"
            height="24"
            style="border: 0; display: inline-block; vertical-align: middle;"
          />
        </a>

        <a href="https://www.facebook.com/hieubdn" style="text-decoration: none; margin: 0 6px;">
          <img
            src="${SITE_URL}/icons/facebook.png"
            alt="Facebook"
            width="24"
            height="24"
            style="border: 0; display: inline-block; vertical-align: middle;"
          />
        </a>

        <a href="https://github.com/hieubdn" style="text-decoration: none; margin: 0 6px;">
          <img
            src="${SITE_URL}/icons/github.png"
            alt="GitHub"
            width="24"
            height="24"
            style="border: 0; display: inline-block; vertical-align: middle;"
          />
        </a>

        <a href="https://www.linkedin.com/in/hieubdn/" style="text-decoration: none; margin: 0 6px;">
          <img
            src="${SITE_URL}/icons/linkedin.png"
            alt="LinkedIn"
            width="24"
            height="24"
            style="border: 0; display: inline-block; vertical-align: middle;"
          />
        </a>

        <a href="https://www.instagram.com/_hiu.bdn/" style="text-decoration: none; margin: 0 6px;">
          <img
            src="${SITE_URL}/icons/instagram.png"
            alt="Instagram"
            width="24"
            height="24"
            style="border: 0; display: inline-block; vertical-align: middle;"
          />
        </a>
      </div>
  `;
}

function renderAdminHtml(input: ContactInput, submittedAt: string): string {
  const message = escapeHtml(input.message).replaceAll("\n", "<br/>");
  return `
<!doctype html>
<html>
  <body
    style="
      font-family: &quot;Open Sans&quot;, sans-serif;
      background: #f8fafc;
      padding: 50px 12px;
    "
  >
    <div
      style="
        max-width: 768px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        overflow: hidden;
      "
    >
      <div
        style="
          padding: 32px;
          background: linear-gradient(
            135deg,
            #f8f9fa 0%,
            #f3f4f6 50%,
            #f0f0f0 100%
          );
          color: #fff;
        "
      >
        <div
          style="
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 1.2px;
            color: #0f172a;
            text-align: center;
          "
        >
          <img
            src="${SITE_URL}/icons/bell-ring.png"
            alt=""
            width="24"
            height="24"
            style="vertical-align: middle; margin-right: 12px; border: 0; display: inline-block;"
          />
          New Contact Request
        </div>
      </div>
      <div style="width: 100%; border-collapse: collapse; padding: 12px 20px">
        <div
          style="
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            letter-spacing: 1.2px;
            color: #52525b;
            padding: 24px 20px 16px;
          "
        >
          Client Information:
        </div>

        <div
          style="
            padding: 8px 20px 16px 20px;
            color: #64748b;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          Name Client:
          <span style="color: #52525b; padding-left: 10px"
            >${escapeHtml(input.name)}</span
          >
        </div>

        <div
          style="
            padding: 0 20px 16px 20px;
            color: #64748b;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          Email Client:
          <span style="color: #52525b; padding-left: 10px"
            >${escapeHtml(input.email)}</span
          >
        </div>

        <div
          style="
            padding: 0 20px 24px 20px;
            color: #64748b;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          Subject:
          <span style="color: #52525b; padding-left: 10px"
            >${escapeHtml(input.subject)}</span
          >
        </div>
      </div>
      <div
        style="
          padding: 24px 20px 16px 20px;
          border-top: 1px solid #e2e8f0;
          color: #52525b;
          line-height: 1.6;
          font-size: 15px;
          font-family: &quot;Open Sans&quot;, sans-serif;
          font-weight: 390;
          letter-spacing: 1.2px;
        "
      >
        Message from client:
      </div>

      <div style="padding: 0 16px 16px ">
        <div
          style="
            background-color: #f8fafc;
            padding: 16px;
            color: #52525b;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          ${message}
        </div>
      </div>

      <div>
        <div
          style="
            padding: 20px 20px 16px 20px;
            border-top: 1px solid #e2e8f0;
            margin-top: 24px;
            color: #64748b;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          Submitted at:
          <span style="color: #52525b; padding-left: 10px"
            >${escapeHtml(submittedAt)}</span
          >
        </div>
        <div
          style="
            padding: 0 20px 24px 20px;
            color: #64748b;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          Source:
          <span style="color: #52525b; padding-left: 10px"
            >${escapeHtml("hieubdn.vercel.app")}</span
          >
        </div>
      </div>

      ${renderBrandFooter()}

      <div
        style="
          padding: 0 8px 32px 8px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
          font-weight: 390;
          line-height: 24px;
          letter-spacing: 1.2px;
        "
      >
        You are receiving this email because someone submitted a form on your
        website.
      </div>
    </div>
  </body>
</html>
    `;
}

function renderAdminText(input: ContactInput, submittedAt: string): string {
  return `Name: ${input.name}\nEmail: ${input.email}\nSubject: ${input.subject}\nSubmitted at: ${submittedAt}\n\n${input.message}`;
}

function renderUserHtml(input: ContactInput, submittedAt: string): string {
  const message = escapeHtml(input.message).replaceAll("\n", "<br/>");
  const name = escapeHtml(input.name);
  return `
<!doctype html>
<html>
  <body
    style="
      font-family: &quot;Open Sans&quot;, sans-serif;
      background: #f8fafc;
      padding: 50px 12px;
    "
  >
    <div
      style="
        max-width: 768px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        overflow: hidden;
      "
    >
      <div
        style="
          padding: 32px;
          background: linear-gradient(
            135deg,
            #f8f9fa 0%,
            #f3f4f6 50%,
            #f0f0f0 100%
          );
        "
      >
        <div
          style="
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 1.2px;
            color: #0f172a;
            text-align: center;
          "
        >
          Thanks for contacting us!
          <img
            src="${SITE_URL}/icons/hands-clapping.png"
            alt=""
            width="28"
            height="28"
            style="vertical-align: middle; margin-left: 12px; border: 0; display: inline-block;"
          />
        </div>
      </div>

      <div style="padding: 12px 20px">
        <div
          style="
            padding: 24px 20px 0 16px;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            letter-spacing: 1.2px;
            color: #52525b;
          "
        >
          Hello
          <span
            style="
              color: #64748b;
              font-size: 15px;
              font-family: &quot;Open Sans&quot;, sans-serif;
              font-weight: 390;
              letter-spacing: 1.2px;
            "
            >${name}</span
          >,
        </div>

        <div
          style="
            padding: 16px 20px 0 16px;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            letter-spacing: 1.2px;
            color: #52525b;
            line-height: 24px;
          "
        >
          Thank you for reaching out. I have received your message and will get
          back to you within 1–2 business days.
        </div>

        <div
          style="
            margin: 24px 16px 0 16px;
            background-color: #f8fafc;
            padding: 16px;
            color: #52525b;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          <div>Your message:</div>
          <div
            style="
              padding: 16px 0 0 0;
              color: #64748b;
              font-size: 15px;
              font-family: &quot;Open Sans&quot;, sans-serif;
              font-weight: 390;
              letter-spacing: 1.2px;
              line-height: 24px;
            "
          >
            ${message}
          </div>
        </div>

        <div
          style="
            padding: 24px 20px 0 16px;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            letter-spacing: 1.2px;
            color: #52525b;
            line-height: 24px;
          "
        >
          If your request is urgent, please contact me directly via phone at
          0968 664 080 or through my social channels listed below.
        </div>

        <div
          style="
            padding: 24px 20px 0 16px;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            letter-spacing: 1.2px;
            color: #52525b;
            line-height: 24px;
          "
        >
          Best regards,
        </div>
        <div
          style="
            padding: 4px 20px 0 16px;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            letter-spacing: 1.2px;
            color: #52525b;
            line-height: 24px;
          "
        >
          Bui Do Ngoc Hieu
        </div>

        <div
          style="
            padding: 20px 20px 16px 20px;
            border-top: 1px solid #e2e8f0;
            margin-top: 24px;
            color: #64748b;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          Submitted at:
          <span style="color: #52525b; padding-left: 10px"
            >${escapeHtml(submittedAt)}</span
          >
        </div>
        <div
          style="
            padding: 0 20px 24px 20px;
            color: #64748b;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          Được gửi từ:
          <span style="color: #52525b; padding-left: 10px"
            >${escapeHtml("hieubdn.vercel.app")}</span
          >
        </div>
      </div>

      ${renderBrandFooter()}

      <div
        style="
          padding: 0 8px 32px 8px;
          text-align: center;
          color: #64748b;
          font-size: 14px;
          font-weight: 390;
          line-height: 24px;
          letter-spacing: 1.2px;
        "
      >
        You are receiving this email because you submitted the contact form on
        hieubdn.vercel.app.
      </div>
    </div>
  </body>
</html>
    `;
}

function renderUserText(input: ContactInput, submittedAt: string): string {
  return `Hello ${input.name},

Thank you for reaching out. I have received your message and will get back to you within 1-2 business days.

Your message:
${input.message}

Submitted at: ${submittedAt}
Source: hieubdn.vercel.app

Best regards,
Bui Do Ngoc Hieu`;
}

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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
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

    const userResult = await resend.emails.send({
      from: sender,
      to: [input.email],
      subject: "Thanks for contacting Bui Do Ngoc Hieu",
      html: renderUserHtml(input, submittedAt),
      text: renderUserText(input, submittedAt),
    });

    if (userResult.error) {
      console.warn("[contact] Resend user confirmation error:", userResult.error);
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
