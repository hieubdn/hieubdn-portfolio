"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import facebookGlyph from "@/assets/image/social-block/facebook.png";
import githubGlyph from "@/assets/image/social-block/code.png";
import instagramGlyph from "@/assets/image/social-block/instagram.png";
import linkedinGlyph from "@/assets/image/social-block/linkedin.png";
import jobGif from "@/assets/image/contact/factory.png";
import locationGif from "@/assets/image/contact/home.png";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { SOCIAL_LINKS } from "@/config/path";

import styles from "./contact-page.module.scss";

type ContactFormField = "name" | "email" | "subject" | "message";
type ContactFormState = Record<ContactFormField, string>;
type ContactFormErrors = Partial<Record<ContactFormField, string>>;

type Translate = (key: string) => string;

type FieldKind =
  | { type: "input"; inputType: "text" | "email" }
  | { type: "textarea"; rows: number };

type ContactFieldDef = {
  id: ContactFormField;
  labelKey: string;
} & FieldKind;

type InfoRow = {
  icon: StaticImageData;
  alt: string;
  labelKey: string;
  valueKey: string;
};

type SocialItem = {
  href: string;
  src: StaticImageData;
  label: string;
  buttonClass: string | undefined;
  imageClass: string | undefined;
  size: number;
};

const INITIAL_FORM: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONTACT_FIELDS: readonly ContactFieldDef[] = [
  { id: "name", type: "input", inputType: "text", labelKey: "contact.page.form.name" },
  { id: "email", type: "input", inputType: "email", labelKey: "contact.page.form.email" },
  { id: "subject", type: "input", inputType: "text", labelKey: "contact.page.form.subject" },
  { id: "message", type: "textarea", rows: 5, labelKey: "contact.page.form.message" },
];

const INFO_ROWS: readonly InfoRow[] = [
  {
    icon: locationGif,
    alt: "Location",
    labelKey: "contact.page.info.from",
    valueKey: "contact.page.info.from.value",
  },
  {
    icon: jobGif,
    alt: "Job",
    labelKey: "contact.page.info.liveIn",
    valueKey: "contact.page.info.liveIn.value",
  },
];

const SOCIAL_ITEMS: readonly SocialItem[] = [
  {
    href: SOCIAL_LINKS.LINKEDIN,
    src: linkedinGlyph,
    label: "LinkedIn",
    buttonClass: styles.iconButtonLinkedin,
    imageClass: styles.iconImage,
    size: 32,
  },
  {
    href: SOCIAL_LINKS.INSTAGRAM,
    src: instagramGlyph,
    label: "Instagram",
    buttonClass: styles.iconButtonInstagram,
    imageClass: styles.iconImage,
    size: 32,
  },
  {
    href: SOCIAL_LINKS.GITHUB,
    src: githubGlyph,
    label: "GitHub",
    buttonClass: styles.iconButtonGithub,
    imageClass: styles.iconImageGithub,
    size: 55,
  },
  {
    href: SOCIAL_LINKS.FACEBOOK,
    src: facebookGlyph,
    label: "Facebook",
    buttonClass: styles.iconButtonFacebook,
    imageClass: styles.iconImageFacebook,
    size: 50,
  },
];

function validateForm(state: ContactFormState, t: Translate): ContactFormErrors {
  const errors: ContactFormErrors = {};
  (Object.keys(state) as ContactFormField[]).forEach((field) => {
    if (!state[field].trim()) {
      errors[field] = t("contact.page.form.validation.required");
    }
  });
  const email = state.email.trim();
  if (!errors.email && email && !EMAIL_PATTERN.test(email)) {
    errors.email = t("contact.page.form.validation.email");
  }
  return errors;
}

export default function ContactSection() {
  const { t } = useLocaleText();
  const [values, setValues] = useState<ContactFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as ContactFormField;
    const nextValue = event.target.value;
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(values, t);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      toast.success(t("contact.page.form.toast.success"));
      setValues(INITIAL_FORM);
    } catch {
      toast.error(t("contact.page.form.toast.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection} data-page="contact">
      <div className={styles.info}>
        <div className={styles.infoContainer}>
          <span className={styles.heading}>{t("contact.page.info.title")}</span>
          {INFO_ROWS.map((row) => (
            <div key={row.valueKey} className={styles.infoItem}>
              <div className={styles.imgaeIcon}>
                <Image
                  src={row.icon}
                  alt={row.alt}
                  width={48}
                  height={48}
                  className={styles.infoIcon}
                  unoptimized
                />
              </div>
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>{t(row.labelKey)}</span>
                <span className={styles.infoValue}>{t(row.valueKey)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.socialsInfo}>
          <span className={styles.heading}>{t("contact.page.socials.title")}</span>
          <div className={styles.iconRow}>
            {SOCIAL_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.iconButton} ${item.buttonClass}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={item.size}
                  height={item.size}
                  className={item.imageClass}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>
            {t("contact.page.form.title")}{" "}
            <span className={styles.formTitleAccent}>
              {t("contact.page.form.title.accent")}
            </span>
          </h2>
        </div>

        <form className={styles.formBody} onSubmit={handleSubmit} noValidate>
          {CONTACT_FIELDS.map((field) =>
            renderField({
              field,
              value: values[field.id],
              error: errors[field.id],
              disabled: isSubmitting,
              onChange: handleChange,
              placeholder: `${t(field.labelKey)} *`,
            }),
          )}

          <button
            type="submit"
            className={styles.formSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t("contact.page.form.sending")
              : t("contact.page.form.send")}
          </button>
        </form>
      </div>
    </section>
  );
}

type RenderFieldArgs = {
  field: ContactFieldDef;
  value: string;
  error: string | undefined;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
};

function renderField(args: RenderFieldArgs): ReactNode {
  const { field, value, error, disabled, onChange, placeholder } = args;
  const domId = `contact-${field.id}`;
  const errorId = error ? `${domId}-error` : undefined;
  const baseClass = `${styles.formInput} ${error ? styles.formInputError : ""}`;

  const commonProps = {
    id: domId,
    name: field.id,
    value,
    onChange,
    placeholder,
    disabled,
    "aria-invalid": Boolean(error),
    "aria-describedby": errorId,
  } as const;

  return (
    <div key={field.id} className={styles.formField}>
      {field.type === "textarea" ? (
        <textarea
          {...commonProps}
          rows={field.rows}
          className={`${baseClass} ${styles.formTextarea}`}
        />
      ) : (
        <input {...commonProps} type={field.inputType} className={baseClass} />
      )}
      {error ? (
        <span id={errorId} className={styles.formError}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
