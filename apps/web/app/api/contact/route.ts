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

function renderHtml(input: ContactInput, submittedAt: string): string {
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
          <svg
            style="width: 24px; height: 24px; fill: #0f172a; margin-right: 12px"
            id="Layer_1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
          >
            <path
              d="m20.068 5.364c-.203-.254-.416-.502-.65-.736-.244-.244-.502-.465-.766-.676-2.96-2.363-7.073-2.623-10.327-.549l-5.767 3.563c-1.377.85-2.274 2.26-2.462 3.869-.188 1.607.361 3.187 1.506 4.332l1.314 1.314 5.976 5.977c.221.221.463.411.714.586.88.617 1.918.957 2.999.957.208 0 .418-.013.629-.037 1.611-.19 3.022-1.094 3.87-2.478l3.772-6.154c1.803-3.19 1.442-7.154-.809-9.968z"
              opacity=".5"
            />
            <path
              d="m1.016 5.74c.307 0 .609-.141.805-.405 1.311-1.772 3.111-2.87 5.506-3.354.542-.11.892-.638.782-1.179s-.636-.892-1.179-.783c-2.861.58-5.122 1.968-6.716 4.126-.329.444-.235 1.07.209 1.398.179.133.388.196.594.196z"
            />
            <path
              d="m23.198 16.023c-.538-.118-1.073.223-1.191.762-.525 2.394-1.61 4.162-3.315 5.407-.446.326-.543.951-.218 1.397.196.268.5.41.809.41.204 0 .411-.062.589-.192 2.087-1.524 3.463-3.742 4.089-6.593.118-.54-.223-1.073-.762-1.191z"
            />
            <path
              d="m2.917 16.481c-1.329 1.858-1.172 4.458.495 6.125.928.928 2.146 1.392 3.365 1.392 1 0 1.99-.33 2.829-.954-.25-.176-.493-.365-.714-.586l-5.976-5.977z"
            />
            <path
              d="m20.068 5.364 1.657-1.657c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-1.659 1.659c.264.211.522.432.766.676.234.234.447.482.65.736z"
            />
          </svg>
          New Contact Request
        </div>
      </div>
      <di style="width: 100%; border-collapse: collapse; padding: 12px 20px">
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
      </di>
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
        <a href="" style="text-decoration: none">
          <svg
            style="width: 24px; height: 24px; fill: #64748b; margin-right: 12px"
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path
              d="m12.023.001s-.008,0-.012,0c-.004,0-.007,0-.01,0-.005,0-.009,0-.014,0-.002,0-.003,0-.005,0C5.373.011,0,5.389,0,12c0,.175.004.348.011.521.012.275.231.464.521.479.276-.012.49-.245.479-.521-.007-.159-.011-.318-.011-.479,0-1.412.277-2.758.764-4h4.907c-.147.454-.281.916-.385,1.395-.059.27.133.605.488.605.23,0,.438-.16.488-.395.119-.552.279-1.086.462-1.605h8.546c.438,1.246.73,2.593.73,4s-.292,2.753-.731,4h-1.769c-.276,0-.5.224-.5.5s.224.5.5.5h1.377c-1.361,3.142-3.528,5.444-4.079,5.995-.093-.002-.186-.002-.278-.006-.281-.004-.509.204-.521.479-.011.275.203.509.479.521.173.007.346.011.521.011,6.617,0,12-5.383,12-12S18.629.014,12.023.001Zm-4.991,6.999H2.214C3.86,3.793,7.027,1.495,10.762,1.074c-1.017,1.143-2.661,3.253-3.73,5.926Zm1.08,0c1.226-2.834,3.122-4.987,3.888-5.789.762.797,2.651,2.948,3.88,5.789h-7.767Zm8.859,0c-1.067-2.669-2.712-4.781-3.732-5.925,3.734.421,6.901,2.719,8.546,5.925h-4.814Zm-3.732,15.925c1.019-1.144,2.664-3.256,3.732-5.925h4.814c-1.645,3.206-4.812,5.504-8.546,5.925Zm4.091-6.925c.403-1.248.669-2.589.669-4s-.265-2.752-.669-4h4.905c.487,1.242.764,2.588.764,4s-.277,2.758-.764,4h-4.905Zm-5.054-4.267c-.678-.678-1.667-.904-2.582-.597-.014.005-8.805,3.997-8.805,3.997-.523.237-.868.763-.879,1.338-.01.574.315,1.111.829,1.369l1.938.969-2.304,2.292c-.661.661-.661,1.737,0,2.4.662.662,1.74.661,2.4,0l2.312-2.302.983,1.97c.257.511.771.828,1.369.828.575-.011,1.101-.355,1.338-.879l3.961-8.717c.342-.98.133-1.979-.561-2.67Zm-.366,2.298l-3.944,8.675c-.079.175-.254.29-.455.293-.19,0-.362-.106-.447-.276l-1.293-2.588c-.071-.144-.221-.287-.447-.276-.131,0-.259.052-.353.146l-2.803,2.791c-.271.271-.716.271-.987,0-.271-.272-.271-.715,0-.985l2.796-2.782c.114-.113.167-.275.141-.434-.025-.159-.126-.296-.27-.368l-2.56-1.279c-.171-.086-.28-.266-.276-.457.003-.191.118-.366.293-.445l8.718-3.962c.549-.185,1.142-.05,1.548.358.421.421.539,1.016.341,1.591Z"
            />
          </svg>
        </a>

        <a href="" style="text-decoration: none">
          <svg
            style="
              width: 24px;
              height: 24px;
              fill: #64748b;
              margin-right: 12px;
              text-decoration: none;
            "
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            style="enable-background: new 0 0 24 24"
            xml:space="preserve"
            width="512"
            height="512"
          >
            <g>
              <path
                d="M24,12.073c0,5.989-4.394,10.954-10.13,11.855v-8.363h2.789l0.531-3.46H13.87V9.86c0-0.947,0.464-1.869,1.95-1.869h1.509   V5.045c0,0-1.37-0.234-2.679-0.234c-2.734,0-4.52,1.657-4.52,4.656v2.637H7.091v3.46h3.039v8.363C4.395,23.025,0,18.061,0,12.073   c0-6.627,5.373-12,12-12S24,5.445,24,12.073z"
              />
            </g>
          </svg>
        </a>

        <a href="" style="text-decoration: none">
          <svg
            style="
              width: 24px;
              height: 24px;
              fill: #64748b;
              margin-right: 12px;
              text-decoration: none;
            "
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            style="enable-background: new 0 0 24 24"
            xml:space="preserve"
            width="512"
            height="512"
          >
            <g>
              <path
                style="fill-rule: evenodd; clip-rule: evenodd"
                d="M12,0.296c-6.627,0-12,5.372-12,12c0,5.302,3.438,9.8,8.206,11.387   c0.6,0.111,0.82-0.26,0.82-0.577c0-0.286-0.011-1.231-0.016-2.234c-3.338,0.726-4.043-1.416-4.043-1.416   C4.421,18.069,3.635,17.7,3.635,17.7c-1.089-0.745,0.082-0.729,0.082-0.729c1.205,0.085,1.839,1.237,1.839,1.237   c1.07,1.834,2.807,1.304,3.492,0.997C9.156,18.429,9.467,17.9,9.81,17.6c-2.665-0.303-5.467-1.332-5.467-5.93   c0-1.31,0.469-2.381,1.237-3.221C5.455,8.146,5.044,6.926,5.696,5.273c0,0,1.008-0.322,3.301,1.23   C9.954,6.237,10.98,6.104,12,6.099c1.02,0.005,2.047,0.138,3.006,0.404c2.29-1.553,3.297-1.23,3.297-1.23   c0.653,1.653,0.242,2.873,0.118,3.176c0.769,0.84,1.235,1.911,1.235,3.221c0,4.609-2.807,5.624-5.479,5.921   c0.43,0.372,0.814,1.103,0.814,2.222c0,1.606-0.014,2.898-0.014,3.293c0,0.319,0.216,0.694,0.824,0.576   c4.766-1.589,8.2-6.085,8.2-11.385C24,5.669,18.627,0.296,12,0.296z"
              />
              <path
                d="M4.545,17.526c-0.026,0.06-0.12,0.078-0.206,0.037c-0.087-0.039-0.136-0.121-0.108-0.18   c0.026-0.061,0.12-0.078,0.207-0.037C4.525,17.384,4.575,17.466,4.545,17.526L4.545,17.526z"
              />
              <path
                d="M5.031,18.068c-0.057,0.053-0.169,0.028-0.245-0.055c-0.079-0.084-0.093-0.196-0.035-0.249   c0.059-0.053,0.167-0.028,0.246,0.056C5.076,17.903,5.091,18.014,5.031,18.068L5.031,18.068z"
              />
              <path
                d="M5.504,18.759c-0.074,0.051-0.194,0.003-0.268-0.103c-0.074-0.107-0.074-0.235,0.002-0.286   c0.074-0.051,0.193-0.005,0.268,0.101C5.579,18.579,5.579,18.707,5.504,18.759L5.504,18.759z"
              />
              <path
                d="M6.152,19.427c-0.066,0.073-0.206,0.053-0.308-0.046c-0.105-0.097-0.134-0.234-0.068-0.307   c0.067-0.073,0.208-0.052,0.311,0.046C6.191,19.217,6.222,19.355,6.152,19.427L6.152,19.427z"
              />
              <path
                d="M7.047,19.814c-0.029,0.094-0.164,0.137-0.3,0.097C6.611,19.87,6.522,19.76,6.55,19.665   c0.028-0.095,0.164-0.139,0.301-0.096C6.986,19.609,7.075,19.719,7.047,19.814L7.047,19.814z"
              />
              <path
                d="M8.029,19.886c0.003,0.099-0.112,0.181-0.255,0.183c-0.143,0.003-0.26-0.077-0.261-0.174c0-0.1,0.113-0.181,0.256-0.184   C7.912,19.708,8.029,19.788,8.029,19.886L8.029,19.886z"
              />
              <path
                d="M8.943,19.731c0.017,0.096-0.082,0.196-0.224,0.222c-0.139,0.026-0.268-0.034-0.286-0.13   c-0.017-0.099,0.084-0.198,0.223-0.224C8.797,19.574,8.925,19.632,8.943,19.731L8.943,19.731z"
              />
            </g>
          </svg>
        </a>

        <a href="" style="text-decoration: none">
          <svg
            style="width: 24px; height: 24px; fill: #64748b; margin-right: 12px"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            style="enable-background: new 0 0 24 24"
            xml:space="preserve"
          >
            <g>
              <path
                id="Path_2525"
                d="M23.002,21.584h0.227l-0.435-0.658l0,0c0.266,0,0.407-0.169,0.409-0.376c0-0.008,0-0.017-0.001-0.025   c0-0.282-0.17-0.417-0.519-0.417h-0.564v1.476h0.212v-0.643h0.261L23.002,21.584z M22.577,20.774h-0.246v-0.499h0.312   c0.161,0,0.345,0.026,0.345,0.237c0,0.242-0.186,0.262-0.412,0.262"
              />
              <path
                id="Path_2520"
                d="M17.291,19.073h-3.007v-4.709c0-1.123-0.02-2.568-1.564-2.568c-1.566,0-1.806,1.223-1.806,2.487v4.79H7.908   V9.389h2.887v1.323h0.04c0.589-1.006,1.683-1.607,2.848-1.564c3.048,0,3.609,2.005,3.609,4.612L17.291,19.073z M4.515,8.065   c-0.964,0-1.745-0.781-1.745-1.745c0-0.964,0.781-1.745,1.745-1.745c0.964,0,1.745,0.781,1.745,1.745   C6.26,7.284,5.479,8.065,4.515,8.065L4.515,8.065 M6.018,19.073h-3.01V9.389h3.01V19.073z M18.79,1.783H1.497   C0.68,1.774,0.01,2.429,0,3.246V20.61c0.01,0.818,0.68,1.473,1.497,1.464H18.79c0.819,0.01,1.492-0.645,1.503-1.464V3.245   c-0.012-0.819-0.685-1.474-1.503-1.463"
              />
              <path
                id="Path_2526"
                d="M22.603,19.451c-0.764,0.007-1.378,0.633-1.37,1.397c0.007,0.764,0.633,1.378,1.397,1.37   c0.764-0.007,1.378-0.633,1.37-1.397c-0.007-0.754-0.617-1.363-1.37-1.37H22.603 M22.635,22.059   c-0.67,0.011-1.254-0.522-1.265-1.192c-0.011-0.67,0.523-1.222,1.193-1.233c0.67-0.011,1.222,0.523,1.233,1.193   c0,0.007,0,0.013,0,0.02C23.81,21.502,23.29,22.045,22.635,22.059h-0.031"
              />
            </g>
          </svg>
        </a>

        <a href="" style="text-decoration: none">
          <svg
            style="width: 24px; height: 24px; fill: #64748b; margin-right: 12px"
            xmlns="http://www.w3.org/2000/svg"
            id="Capa_39"
            data-name="Capa 39"
            viewBox="0 0 24 24"
          >
            <path
              d="m14.502,11.986c0,1.431-1.16,2.591-2.591,2.591s-2.59-1.16-2.59-2.591,1.16-2.591,2.59-2.591,2.591,1.16,2.591,2.591h0Zm0,0"
            />
            <path
              d="m12,0h0C5.373,0,0,5.373,0,12h0c0,6.627,5.373,12,12,12h0c6.627,0,12-5.373,12-12h0C24,5.373,18.627,0,12,0Zm7.637,15.19c-.037.827-.169,1.392-.361,1.886-.199.511-.465.945-.897,1.377-.432.432-.866.698-1.376.896-.494.192-1.06.323-1.887.361-.829.038-1.094.047-3.205.047s-2.375-.009-3.204-.047c-.827-.038-1.392-.169-1.887-.361-.511-.198-.944-.465-1.377-.896-.432-.432-.698-.866-.897-1.377-.192-.494-.323-1.059-.361-1.886-.038-.829-.047-1.094-.047-3.205s.009-2.375.047-3.204c.038-.827.169-1.392.361-1.887.199-.511.465-.944.897-1.376s.866-.698,1.377-.897c.494-.192,1.06-.323,1.887-.361.829-.038,1.094-.047,3.204-.047s2.376.009,3.205.047c.827.037,1.392.169,1.887.361.511.198.944.465,1.376.897.432.432.698.866.897,1.376.192.494.323,1.06.361,1.887.038.829.047,1.093.047,3.204s-.009,2.375-.047,3.205h0Zm-1.666-7.788c-.141-.363-.309-.622-.582-.894-.272-.272-.531-.441-.894-.582-.274-.106-.685-.233-1.443-.267-.82-.038-1.066-.045-3.141-.045s-2.321.008-3.141.045c-.757.034-1.169.161-1.443.267-.363.141-.622.309-.894.582-.272.272-.441.531-.582.894-.106.274-.233.685-.267,1.443-.038.819-.045,1.065-.045,3.141s.008,2.321.045,3.141c.035.757.161,1.169.267,1.443.141.363.309.622.582.894.272.272.531.44.894.581.274.107.685.233,1.443.268.819.038,1.065.045,3.141.045s2.322-.008,3.141-.045c.758-.035,1.169-.161,1.443-.268.363-.141.622-.309.894-.581s.441-.531.582-.894c.106-.274.233-.685.267-1.443.038-.82.046-1.066.046-3.141s-.008-2.321-.046-3.141c-.035-.758-.161-1.169-.267-1.443h0Zm-6.059,8.574c-2.204,0-3.991-1.787-3.991-3.991s1.787-3.991,3.991-3.991,3.991,1.787,3.991,3.991-1.787,3.991-3.991,3.991h0Zm4.149-7.207c-.515,0-.933-.417-.933-.932s.417-.933.933-.933.933.418.933.933-.418.932-.933.932h0Zm0,0"
            />
          </svg>
        </a>
      </div>

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
      html: renderHtml(input, formatSubmittedAt(new Date())),
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
