import { escapeHtml } from "@/lib/contact/validation";

export const SURVEY_LIMITS = {
  name: 120,
  phone: 60,
  question: 300,
  answer: 20000,
  answersMax: 40,
} as const;

export type SurveyAnswer = {
  question: string;
  answer: string;
};

export type SurveySubmission = {
  name: string;
  phone: string;
  answers: SurveyAnswer[];
};

const NOT_PROVIDED = "(Chưa cung cấp)";

export function parseSurveySubmission(body: unknown): SurveySubmission | null {
  if (!body || typeof body !== "object") return null;
  const source = body as Record<string, unknown>;

  const { name, phone, answers } = source;
  if (typeof name !== "string" || typeof phone !== "string") return null;
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  if (
    trimmedName.length > SURVEY_LIMITS.name ||
    trimmedPhone.length > SURVEY_LIMITS.phone
  ) {
    return null;
  }

  if (
    !Array.isArray(answers) ||
    answers.length === 0 ||
    answers.length > SURVEY_LIMITS.answersMax
  ) {
    return null;
  }
  const parsedAnswers: SurveyAnswer[] = [];
  for (const item of answers) {
    if (!item || typeof item !== "object") return null;
    const { question, answer } = item as Record<string, unknown>;
    if (typeof question !== "string" || typeof answer !== "string") return null;
    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();
    if (!trimmedQuestion || trimmedQuestion.length > SURVEY_LIMITS.question) {
      return null;
    }
    if (trimmedAnswer.length > SURVEY_LIMITS.answer) return null;
    parsedAnswers.push({ question: trimmedQuestion, answer: trimmedAnswer });
  }

  return { name: trimmedName, phone: trimmedPhone, answers: parsedAnswers };
}

const INFO_ROW_STYLE =
  "padding: 0 20px 12px 20px; color: #64748b; font-size: 15px; " +
  'font-family: "Open Sans", sans-serif; letter-spacing: 0.4px;';

function renderInfoRow(label: string, value: string): string {
  return `
        <div style="${INFO_ROW_STYLE}">
          ${escapeHtml(label)}:
          <span style="color: #1f2937; padding-left: 10px">${escapeHtml(value)}</span>
        </div>`;
}

export function renderSurveyAdminHtml(
  submission: SurveySubmission,
  submittedAt: string,
): string {
  const answerBlocks = submission.answers
    .map((item) => {
      const answer = escapeHtml(item.answer).replaceAll("\n", "<br/>");
      return `
        <div
          style="
            padding: 0 20px 16px 20px;
            color: #52525b;
            font-size: 15px;
            font-family: &quot;Open Sans&quot;, sans-serif;
            line-height: 1.6;
            letter-spacing: 0.4px;
          "
        >
          <strong style="color: #0f172a">${escapeHtml(item.question)}:</strong>
          ${answer}
        </div>`;
    })
    .join("");

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
          padding: 28px 32px;
          background: #1d4354;
          color: #ffffff;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-align: center;
        "
      >
        Khảo sát giáo viên mới — Acadify
      </div>

      <div style="padding: 24px 0 12px">
        ${renderInfoRow("Họ và tên", submission.name || NOT_PROVIDED)}
        ${renderInfoRow("Số điện thoại/Zalo", submission.phone || NOT_PROVIDED)}
        ${renderInfoRow("Thời gian gửi", submittedAt)}
      </div>

      <div
        style="
          border-top: 1px solid #e2e8f0;
          margin: 0 20px 20px;
        "
      ></div>

      ${answerBlocks}

      <div
        style="
          padding: 20px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          color: #64748b;
          font-size: 13px;
          letter-spacing: 0.4px;
        "
      >
        Email này được gửi tự động từ form khảo sát Acadify trên hieubdn.vercel.app.
      </div>
    </div>
  </body>
</html>
  `;
}

export function renderSurveyAdminText(
  submission: SurveySubmission,
  submittedAt: string,
): string {
  const header = [
    `Họ và tên: ${submission.name || NOT_PROVIDED}`,
    `Số điện thoại/Zalo: ${submission.phone || NOT_PROVIDED}`,
    `Thời gian gửi: ${submittedAt}`,
  ].join("\n");
  const body = submission.answers
    .map((item) => `${item.question}: ${item.answer}`)
    .join("\n\n");
  return `${header}\n\n${body}`;
}
