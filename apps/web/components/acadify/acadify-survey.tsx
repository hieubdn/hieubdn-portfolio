"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { PATH_URL } from "@/config/path";
import { HONEYPOT_FIELD } from "@/lib/contact/validation";

import {
  OTHER_OPTION,
  SENDER_NAME_QUESTION_ID,
  SENDER_PHONE_QUESTION_ID,
  SURVEY_SECTIONS,
  SURVEY_UI,
  type SurveyChannelsQuestion,
  type SurveyChoiceQuestion,
  type SurveyQuestion,
  type SurveyScaleQuestion,
  type SurveyTextQuestion,
} from "./acadify-survey-data";
import styles from "./acadify-survey.module.scss";

const SCALE_DEFAULT = 3;
const SCALE_VALUES = [1, 2, 3, 4, 5] as const;

type ChoiceAnswer = { choices: string[]; other: string };
type ChannelAnswer = Record<string, string>;

const ALL_QUESTIONS: readonly SurveyQuestion[] = SURVEY_SECTIONS.flatMap(
  (section) => section.questions,
);

function questionDomId(questionId: string): string {
  return `acadify-survey-${questionId}`;
}

export default function AcadifySurvey() {
  const [choiceAnswers, setChoiceAnswers] = useState<
    Record<string, ChoiceAnswer>
  >({});
  const [scaleAnswers, setScaleAnswers] = useState<Record<string, number>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [channelAnswers, setChannelAnswers] = useState<
    Record<string, ChannelAnswer>
  >({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const clearError = (questionId: string) => {
    setErrors((prev) => {
      if (!prev[questionId]) return prev;
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const selectRadio = (question: SurveyChoiceQuestion, option: string) => {
    setChoiceAnswers((prev) => ({
      ...prev,
      [question.id]: {
        choices: [option],
        other: prev[question.id]?.other ?? "",
      },
    }));
    clearError(question.id);
  };

  const toggleCheckbox = (
    question: SurveyChoiceQuestion,
    option: string,
    checked: boolean,
  ) => {
    setChoiceAnswers((prev) => {
      const current = prev[question.id] ?? { choices: [], other: "" };
      const choices = checked
        ? [...current.choices, option]
        : current.choices.filter((choice) => choice !== option);
      return { ...prev, [question.id]: { ...current, choices } };
    });
    clearError(question.id);
  };

  const setOtherText = (questionId: string, value: string) => {
    setChoiceAnswers((prev) => ({
      ...prev,
      [questionId]: {
        choices: prev[questionId]?.choices ?? [],
        other: value,
      },
    }));
    clearError(questionId);
  };

  const toggleChannel = (
    questionId: string,
    label: string,
    checked: boolean,
  ) => {
    setChannelAnswers((prev) => {
      const current = { ...(prev[questionId] ?? {}) };
      if (checked) {
        current[label] = current[label] ?? "";
      } else {
        delete current[label];
      }
      return { ...prev, [questionId]: current };
    });
    clearError(questionId);
  };

  const setChannelDetail = (
    questionId: string,
    label: string,
    value: string,
  ) => {
    setChannelAnswers((prev) => ({
      ...prev,
      [questionId]: { ...(prev[questionId] ?? {}), [label]: value },
    }));
    clearError(questionId);
  };

  const validate = (): Record<string, string> => {
    const nextErrors: Record<string, string> = {};
    for (const question of ALL_QUESTIONS) {
      if (question.kind === "radio" || question.kind === "checkbox") {
        const answer = choiceAnswers[question.id];
        if (!answer || answer.choices.length === 0) {
          nextErrors[question.id] = SURVEY_UI.validationRequired;
          continue;
        }
        if (answer.choices.includes(OTHER_OPTION) && !answer.other.trim()) {
          nextErrors[question.id] = SURVEY_UI.validationOther;
        }
      } else if (question.kind === "channels") {
        const selected = channelAnswers[question.id] ?? {};
        const hasEmptyDetail = Object.values(selected).some(
          (detail) => !detail.trim(),
        );
        if (hasEmptyDetail) {
          nextErrors[question.id] = SURVEY_UI.validationChannel;
        }
      }
    }
    return nextErrors;
  };

  const formatAnswer = (question: SurveyQuestion): string => {
    switch (question.kind) {
      case "radio":
      case "checkbox": {
        const answer = choiceAnswers[question.id];
        if (!answer) return SURVEY_UI.emptyAnswer;
        return answer.choices
          .map((choice) =>
            choice === OTHER_OPTION
              ? `${OTHER_OPTION}: ${answer.other.trim()}`
              : choice,
          )
          .join("; ");
      }
      case "scale":
        return `${scaleAnswers[question.id] ?? SCALE_DEFAULT}/5`;
      case "short":
      case "long":
        return (textAnswers[question.id] ?? "").trim() || SURVEY_UI.emptyAnswer;
      case "channels": {
        const selected = Object.entries(channelAnswers[question.id] ?? {});
        if (selected.length === 0) return SURVEY_UI.emptyAnswer;
        return selected
          .map(([label, detail]) => `${label}: ${detail.trim()}`)
          .join("; ");
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error(SURVEY_UI.toastMissing);
      const firstInvalid = ALL_QUESTIONS.find(
        (question) => nextErrors[question.id],
      );
      if (firstInvalid) {
        document
          .getElementById(questionDomId(firstInvalid.id))
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const answers = ALL_QUESTIONS.filter(
        (question) =>
          question.id !== SENDER_NAME_QUESTION_ID &&
          question.id !== SENDER_PHONE_QUESTION_ID,
      ).map((question) => ({
        question: `${question.number}. ${question.title}`,
        answer: formatAnswer(question),
      }));
      const response = await fetch("/api/acadify-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: (textAnswers[SENDER_NAME_QUESTION_ID] ?? "").trim(),
          phone: (textAnswers[SENDER_PHONE_QUESTION_ID] ?? "").trim(),
          answers,
          [HONEYPOT_FIELD]: honeypot,
        }),
      });
      if (!response.ok) {
        if (response.status === 429) {
          toast.error(SURVEY_UI.toastRateLimited);
        } else if (response.status === 400) {
          toast.error(SURVEY_UI.toastInvalid);
        } else {
          toast.error(SURVEY_UI.toastError);
        }
        return;
      }
      toast.success(SURVEY_UI.toastSuccess);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error(SURVEY_UI.toastError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderChoiceQuestion = (question: SurveyChoiceQuestion) => {
    const answer = choiceAnswers[question.id] ?? { choices: [], other: "" };
    const isCheckbox = question.kind === "checkbox";
    const atLimit =
      isCheckbox &&
      question.maxChoices !== undefined &&
      answer.choices.length >= question.maxChoices;
    const allOptions = question.hasOther
      ? [...question.options, OTHER_OPTION]
      : question.options;

    return (
      <div className={styles.options}>
        {allOptions.map((option) => {
          const checked = answer.choices.includes(option);
          const disabled = isSubmitting || (atLimit && !checked);
          return (
            <div key={option}>
              <label
                className={`${styles.option} ${disabled && !isSubmitting ? styles.optionDisabled : ""}`}
              >
                <input
                  type={isCheckbox ? "checkbox" : "radio"}
                  name={question.id}
                  value={option}
                  checked={checked}
                  disabled={disabled}
                  onChange={(event) =>
                    isCheckbox
                      ? toggleCheckbox(question, option, event.target.checked)
                      : selectRadio(question, option)
                  }
                />
                <span>{option}</span>
              </label>
              {option === OTHER_OPTION && checked ? (
                <div className={styles.inlineInputWrap}>
                  <input
                    type="text"
                    className={styles.textInput}
                    value={answer.other}
                    placeholder={SURVEY_UI.otherPlaceholder}
                    disabled={isSubmitting}
                    onChange={(event) =>
                      setOtherText(question.id, event.target.value)
                    }
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  const renderScaleQuestion = (question: SurveyScaleQuestion) => {
    const value = scaleAnswers[question.id] ?? SCALE_DEFAULT;
    return (
      <div className={styles.scaleControl}>
        <span className={styles.scaleValue}>{value}/5</span>
        <input
          type="range"
          className={styles.scaleSlider}
          min={1}
          max={5}
          step={1}
          value={value}
          disabled={isSubmitting}
          aria-label={question.title}
          onChange={(event) =>
            setScaleAnswers((prev) => ({
              ...prev,
              [question.id]: Number(event.target.value),
            }))
          }
        />
        <div className={styles.scaleTicks} aria-hidden="true">
          {SCALE_VALUES.map((tick) => (
            <span
              key={tick}
              className={tick === value ? styles.scaleTickActive : undefined}
            >
              {tick}
            </span>
          ))}
        </div>
        <div className={styles.scaleEnds} aria-hidden="true">
          <span>{SURVEY_UI.scaleMinLabel}</span>
          <span>{SURVEY_UI.scaleMaxLabel}</span>
        </div>
      </div>
    );
  };

  const renderTextQuestion = (question: SurveyTextQuestion) => {
    const value = textAnswers[question.id] ?? "";
    const handleChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const nextValue = event.target.value;
      setTextAnswers((prev) => ({ ...prev, [question.id]: nextValue }));
      clearError(question.id);
    };
    if (question.kind === "long") {
      return (
        <textarea
          className={`${styles.textInput} ${styles.textarea}`}
          rows={5}
          value={value}
          placeholder={question.placeholder}
          disabled={isSubmitting}
          onChange={handleChange}
        />
      );
    }
    return (
      <input
        type="text"
        className={styles.textInput}
        value={value}
        placeholder={question.placeholder}
        disabled={isSubmitting}
        onChange={handleChange}
      />
    );
  };

  const renderChannelsQuestion = (question: SurveyChannelsQuestion) => {
    const selected = channelAnswers[question.id] ?? {};
    return (
      <div className={styles.options}>
        {question.channels.map((channel) => {
          const checked = channel.label in selected;
          return (
            <div key={channel.label}>
              <label className={styles.option}>
                <input
                  type="checkbox"
                  name={question.id}
                  value={channel.label}
                  checked={checked}
                  disabled={isSubmitting}
                  onChange={(event) =>
                    toggleChannel(
                      question.id,
                      channel.label,
                      event.target.checked,
                    )
                  }
                />
                <span>{channel.label}</span>
              </label>
              {checked ? (
                <div className={styles.inlineInputWrap}>
                  <input
                    type="text"
                    className={styles.textInput}
                    value={selected[channel.label] ?? ""}
                    placeholder={channel.placeholder}
                    disabled={isSubmitting}
                    onChange={(event) =>
                      setChannelDetail(
                        question.id,
                        channel.label,
                        event.target.value,
                      )
                    }
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  const renderQuestionControl = (question: SurveyQuestion) => {
    switch (question.kind) {
      case "radio":
      case "checkbox":
        return renderChoiceQuestion(question);
      case "scale":
        return renderScaleQuestion(question);
      case "channels":
        return renderChannelsQuestion(question);
      case "short":
      case "long":
        return renderTextQuestion(question);
    }
  };

  const renderQuestion = (question: SurveyQuestion) => {
    const error = errors[question.id];
    return (
      <div
        key={question.id}
        id={questionDomId(question.id)}
        className={styles.question}
      >
        <p className={styles.questionTitle}>
          {question.number}. {question.title}
        </p>
        {question.hint ? (
          <p className={styles.questionHint}>({question.hint})</p>
        ) : null}
        {renderQuestionControl(question)}
        {error ? <span className={styles.errorText}>{error}</span> : null}
      </div>
    );
  };

  return (
    <div className={styles.survey} lang="vi">
      <div className={styles.topBar}>
        <Link href={PATH_URL.ACADIFY} className={styles.backLink}>
          <span aria-hidden="true">←</span>
          {SURVEY_UI.backToIntro}
        </Link>
      </div>

      <div className={styles.document}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>{SURVEY_UI.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{SURVEY_UI.heroSubtitle}</p>
          <p className={styles.heroNote}>{SURVEY_UI.heroNote}</p>
        </header>

        {isSubmitted ? (
          <div className={styles.success}>
            <span className={styles.successIcon} aria-hidden="true">
              ✓
            </span>
            <p className={styles.successTitle}>{SURVEY_UI.successTitle}</p>
            <p className={styles.successBody}>{SURVEY_UI.successBody}</p>
            <Link href={PATH_URL.ACADIFY} className={styles.successLink}>
              {SURVEY_UI.backToIntro}
            </Link>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.honeypotField} aria-hidden="true">
              <input
                type="text"
                name={HONEYPOT_FIELD}
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            {SURVEY_SECTIONS.map((section) => (
              <section key={section.title} className={styles.sectionBlock}>
                <h2 className={styles.sectionBar}>{section.title}</h2>
                {section.note ? (
                  <p className={styles.sectionNote}>{section.note}</p>
                ) : null}
                {section.questions.map(renderQuestion)}
              </section>
            ))}
            <button
              type="submit"
              className={styles.submit}
              disabled={isSubmitting}
            >
              {isSubmitting ? SURVEY_UI.sending : SURVEY_UI.submit}
            </button>
            <p className={styles.closing}>{SURVEY_UI.closing}</p>
          </form>
        )}
      </div>
    </div>
  );
}
