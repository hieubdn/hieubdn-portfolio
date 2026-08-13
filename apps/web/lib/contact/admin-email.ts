import { getSiteUrl } from "@/lib/site-url";

import { escapeHtml, type ContactInput } from "./validation";

const SITE_URL = getSiteUrl();

export function formatSubmittedAt(date: Date): string {
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

export function renderAdminHtml(input: ContactInput, submittedAt: string): string {
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

export function renderAdminText(input: ContactInput, submittedAt: string): string {
  return `Name: ${input.name}\nEmail: ${input.email}\nSubject: ${input.subject}\nSubmitted at: ${submittedAt}\n\n${input.message}`;
}
