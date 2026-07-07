import { describe, expect, it } from "vitest";

import {
  parseSurveySubmission,
  renderSurveyAdminHtml,
  SURVEY_LIMITS,
} from "./survey-email";

const validBody = {
  name: "Nguyễn Văn A",
  phone: "0905123456",
  answers: [
    { question: "1. Bạn đang dạy kèm môn nào?", answer: "Toán; Vật lý" },
    { question: "12. Soạn đề tự động", answer: "5/5" },
  ],
};

describe("parseSurveySubmission", () => {
  it("accepts a valid submission and trims fields", () => {
    const result = parseSurveySubmission({
      ...validBody,
      name: "  Nguyễn Văn A  ",
    });
    expect(result).not.toBeNull();
    expect(result?.name).toBe("Nguyễn Văn A");
    expect(result?.answers).toHaveLength(2);
  });

  it("accepts empty name/phone (contact section is optional)", () => {
    const result = parseSurveySubmission({ ...validBody, name: "", phone: "" });
    expect(result).not.toBeNull();
  });

  it("accepts empty answers strings (skipped optional questions)", () => {
    const result = parseSurveySubmission({
      ...validBody,
      answers: [{ question: "11. Công cụ đó tên gì?", answer: "" }],
    });
    expect(result?.answers[0]?.answer).toBe("");
  });

  it("rejects non-object bodies", () => {
    expect(parseSurveySubmission(null)).toBeNull();
    expect(parseSurveySubmission("text")).toBeNull();
  });

  it("rejects missing or non-string name/phone", () => {
    expect(parseSurveySubmission({ ...validBody, name: undefined })).toBeNull();
    expect(parseSurveySubmission({ ...validBody, phone: 123 })).toBeNull();
  });

  it("rejects an empty answers array", () => {
    expect(parseSurveySubmission({ ...validBody, answers: [] })).toBeNull();
  });

  it("rejects answers over the max count", () => {
    const answers = Array.from(
      { length: SURVEY_LIMITS.answersMax + 1 },
      (_, index) => ({ question: `${index + 1}. Câu hỏi`, answer: "Trả lời" }),
    );
    expect(parseSurveySubmission({ ...validBody, answers })).toBeNull();
  });

  it("rejects answers with empty questions or wrong shapes", () => {
    expect(
      parseSurveySubmission({
        ...validBody,
        answers: [{ question: "   ", answer: "x" }],
      }),
    ).toBeNull();
    expect(
      parseSurveySubmission({
        ...validBody,
        answers: [{ question: "1. Ok", answer: 5 }],
      }),
    ).toBeNull();
  });

  it("rejects oversized fields", () => {
    expect(
      parseSurveySubmission({
        ...validBody,
        name: "a".repeat(SURVEY_LIMITS.name + 1),
      }),
    ).toBeNull();
    expect(
      parseSurveySubmission({
        ...validBody,
        answers: [
          { question: "1. Ok", answer: "a".repeat(SURVEY_LIMITS.answer + 1) },
        ],
      }),
    ).toBeNull();
  });
});

describe("renderSurveyAdminHtml", () => {
  it("escapes HTML in questions and answers", () => {
    const html = renderSurveyAdminHtml(
      {
        name: "<b>A</b>",
        phone: "",
        answers: [{ question: "1. <script>", answer: "x < y\nz" }],
      },
      "10:00 Monday, July 7, 2026",
    );
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;b&gt;A&lt;/b&gt;");
    expect(html).toContain("x &lt; y<br/>z");
  });
});
