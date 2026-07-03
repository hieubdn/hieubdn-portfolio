import { describe, expect, it } from "vitest";

import {
  escapeHtml,
  HONEYPOT_FIELD,
  isHoneypotTripped,
  MAX_LENGTH,
  parseInput,
} from "./validation";

const VALID_BODY = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Hello",
  message: "I would like to talk about a project.",
};

describe("parseInput", () => {
  it("accepts a valid body and trims whitespace", () => {
    const result = parseInput({
      ...VALID_BODY,
      name: "  Jane Doe  ",
    });
    expect(result).toEqual({ ...VALID_BODY, name: "Jane Doe" });
  });

  it("rejects non-object bodies", () => {
    expect(parseInput(null)).toBeNull();
    expect(parseInput(undefined)).toBeNull();
    expect(parseInput("string")).toBeNull();
    expect(parseInput(42)).toBeNull();
  });

  it("rejects missing or non-string fields", () => {
    expect(parseInput({ ...VALID_BODY, name: undefined })).toBeNull();
    expect(parseInput({ ...VALID_BODY, message: 123 })).toBeNull();
  });

  it("rejects empty or whitespace-only fields", () => {
    expect(parseInput({ ...VALID_BODY, subject: "   " })).toBeNull();
  });

  it("rejects fields over their max length", () => {
    expect(
      parseInput({ ...VALID_BODY, name: "a".repeat(MAX_LENGTH.name + 1) }),
    ).toBeNull();
    expect(
      parseInput({
        ...VALID_BODY,
        message: "a".repeat(MAX_LENGTH.message + 1),
      }),
    ).toBeNull();
  });

  it("rejects invalid email formats", () => {
    expect(parseInput({ ...VALID_BODY, email: "not-an-email" })).toBeNull();
    expect(parseInput({ ...VALID_BODY, email: "a b@example.com" })).toBeNull();
    expect(parseInput({ ...VALID_BODY, email: "a@b" })).toBeNull();
  });

  it("ignores extra fields", () => {
    expect(parseInput({ ...VALID_BODY, extra: "ignored" })).toEqual(VALID_BODY);
  });
});

describe("isHoneypotTripped", () => {
  it("returns false when the field is absent or empty", () => {
    expect(isHoneypotTripped(VALID_BODY)).toBe(false);
    expect(isHoneypotTripped({ ...VALID_BODY, [HONEYPOT_FIELD]: "" })).toBe(false);
    expect(isHoneypotTripped({ ...VALID_BODY, [HONEYPOT_FIELD]: "   " })).toBe(
      false,
    );
    expect(isHoneypotTripped(null)).toBe(false);
  });

  it("returns true when the hidden field is filled", () => {
    expect(
      isHoneypotTripped({ ...VALID_BODY, [HONEYPOT_FIELD]: "Acme Inc" }),
    ).toBe(true);
  });
});

describe("escapeHtml", () => {
  it("escapes all HTML-sensitive characters", () => {
    expect(escapeHtml(`<script>alert("x&y'z")</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&amp;y&#39;z&quot;)&lt;/script&gt;",
    );
  });

  it("leaves plain text untouched", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });
});
