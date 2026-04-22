import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

function renderHtml(input: ContactInput): string {
    const message = escapeHtml(input.message).replaceAll("\n", "<br/>");
    return `
<!doctype html>
<html>
  <body
    style="
      font-family: &quot;Open Sans&quot;, sans-serif;
      background: #f8fafc;
      padding: 96px 16px;
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
      <div style="padding: 32px; background: #0f172a; color: #fff">
        <strong
          style="font-size: 24px; font-weight: 390; letter-spacing: 1.2px"
        >
          Hieubdn - New Message
        </strong>
      </div>
      <table style="width: 100%; border-collapse: collapse; padding: 12px 20px">
        <tr>
          <td
            style="
              padding: 24px 20px 20px 20px;
              color: #64748b;
              font-size: 16px;
              font-weight: 390;
              letter-spacing: 1.2px;
            "
          >
            Name Client:    
          </td>
          <td
            style="
              padding: 24px 20px 20px 20px;
              color: #0f172a;
              font-size: 16px;
              font-weight: 390;
              letter-spacing: 1.2px;
            "
          >
            ${escapeHtml(input.name)}
          </td>
        </tr>
        <tr>
          <td
            style="
              padding: 0 20px 20px 20px;
              color: #64748b;
              font-size: 16px;
              font-weight: 390;
              letter-spacing: 1.2px;
            "
          >
            Email Client:
          </td>
          <td
            style="
              padding: 0 20px 20px 20px;
              color: #0f172a;
              font-size: 16px;
              font-weight: 390;
              letter-spacing: 1.2px;
            "
          >
            ${escapeHtml(input.email)}
          </td>
        </tr>
        <tr>
          <td
            style="
              padding: 0 20px 24px 20px;
              color: #64748b;
              font-size: 16px;
              font-weight: 390;
              letter-spacing: 1.2px;
            "
          >
            Subject: 
          </td>
          <td
            style="
              padding: 0 20px 24px 20px;
              color: #0f172a;
              font-size: 16px;
              font-weight: 390;
              letter-spacing: 1.2px;
            "
          >
            ${escapeHtml(input.subject)}
          </td>
        </tr>
      </table>
      <div
        style="
          padding: 24px 20px;
          border-top: 1px solid #e2e8f0;
          color: #0f172a;
          line-height: 1.6;
          font-size: 16px;
          font-weight: 390;
          letter-spacing: 1.2px;
        "
      >
        ${message}
      </div>
      <div
        style="
          padding: 16px 20px 48px 20px;
          color: #0f172a;
          font-size: 16px;
          font-weight: 390;
          letter-spacing: 1.2px;
        "
      >
        <div
          style="
            color: #0f172a;
            font-size: 16px;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          ——————————
        </div>
        <div
          style="
            padding-top: 8px;
            color: #0f172a;
            font-size: 16px;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          BUI DO NGOC HIEU
        </div>
        <div
          style="
            padding-top: 12px;
            color: #0f172a;
            font-size: 16px;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          Software Engineer |
          <strong style="font-weight: 390; color: #0b5394;">Full-Stack Web & Mobile Development</strong>
        </div>
        <div
          style="
            padding-top: 12px;
            color: #0f172a;
            font-size: 16px;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          Email: <strong style="font-weight: 390; color: #0b5394;">hieubdn@gmail.com</strong> | Phone: <strong style="font-weight: 390; color: #0b5394;">0968 664 080</strong>
        </div>
        <div
          style="
            padding-top: 12px;
            color: #0f172a;
            font-size: 16px;
            font-weight: 390;
            letter-spacing: 1.2px;
          "
        >
          Location: Da Nang, Viet Nam
        </div>
      </div>
      <div
      style="
      padding: 16px;
      text-align: center;
      color: #a0a0a0;
      font-size: 16px;
      font-weight: 390;
      letter-spacing: 1.2px;
    "
      >Email tự động từ hieubdn.vercel.app.</div>
      <div
      style="
      padding-bottom: 32px;
      text-align: center;
      color: #a0a0a0;
      font-size: 16px;
      font-weight: 390;
      letter-spacing: 1.2px;
    "
      >Vui lòng không trả lời.</div>
    </div>
  </body>
</html>

    `;
}

function renderText(input: ContactInput): string {
    return `Name: ${input.name}\nEmail: ${input.email}\nSubject: ${input.subject}\n\n${input.message}`;
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

    try {
        const { error } = await new Resend(apiKey).emails.send({
            from: `Bùi Đỗ Ngọc Hiếu <${fromEmail}>`,
            to: [toEmail],
            replyTo: input.email,
            subject: `[hieubdn] ${input.subject}`,
            html: renderHtml(input),
            text: renderText(input),
        });

        if (error) {
            console.error("[contact] Resend error:", error);
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
