"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";

import githubGlyph from "@/assets/image/social-block/code.png";
import instagramGlyph from "@/assets/image/social-block/instagram.png";
import linkedinGlyph from "@/assets/image/social-block/linkedin.png";
import facebookGlyph from "@/assets/image/social-block/facebook.png";
import locationGif from "@/assets/image/contact/location.gif";
import jobGif from "@/assets/image/contact/job.gif";
import { SOCIAL_LINKS } from "@/config/path";
import styles from "./contact-page.module.scss";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

type ContactFormField = "name" | "email" | "subject" | "message";

type ContactFormState = Record<ContactFormField, string>;
type ContactFormErrors = Partial<Record<ContactFormField, string>>;

const INITIAL_FORM: ContactFormState = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SOCIAL_ITEMS = [
    {
        href: SOCIAL_LINKS.LINKEDIN,
        src: linkedinGlyph,
        label: "LinkedIn",
        variant: "linkedin",
    },
    {
        href: SOCIAL_LINKS.INSTAGRAM,
        src: instagramGlyph,
        label: "Instagram",
        variant: "instagram",
    },
    {
        href: SOCIAL_LINKS.GITHUB,
        src: githubGlyph,
        label: "GitHub",
        variant: "github",
    },
    {
        href: SOCIAL_LINKS.FACEBOOK,
        src: facebookGlyph,
        label: "facebook",
        variant: "facebook",
    },
] as const;

const VARIANT_CLASS = {
    linkedin: styles.iconButtonLinkedin,
    instagram: styles.iconButtonInstagram,
    github: styles.iconButtonGithub,
    facebook: styles.iconButtonFacebook,
} as const;

export default function ContactSection() {
    const { t } = useLocaleText();
    const [values, setValues] = useState<ContactFormState>(INITIAL_FORM);
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name as ContactFormField]: value }));
        setErrors((prev) => {
            if (!prev[name as ContactFormField]) return prev;
            const next = { ...prev };
            delete next[name as ContactFormField];
            return next;
        });
    };

    const validate = (state: ContactFormState): ContactFormErrors => {
        const nextErrors: ContactFormErrors = {};
        (Object.keys(state) as ContactFormField[]).forEach((field) => {
            if (!state[field].trim()) {
                nextErrors[field] = t("contact.page.form.validation.required");
            }
        });
        if (
            !nextErrors.email &&
            state.email.trim() &&
            !EMAIL_PATTERN.test(state.email.trim())
        ) {
            nextErrors.email = t("contact.page.form.validation.email");
        }
        return nextErrors;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextErrors = validate(values);
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
                    <div className={styles.infoItem}>
                        <div className={styles.imgaeIcon}>
                            <Image
                                src={locationGif}
                                alt="Location"
                                width={48}
                                height={48}
                                className={styles.infoIcon}
                                unoptimized
                            />
                        </div>
                        <div className={styles.infoText}>
                            <span className={styles.infoLabel}>{t("contact.page.info.from")}</span>
                            <span className={styles.infoValue}>{t("contact.page.info.from.value")}</span>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <div className={styles.imgaeIcon}>
                            <Image
                                src={jobGif}
                                alt="Job"
                                width={48}
                                height={48}
                                className={styles.infoIcon}
                                unoptimized
                            />
                        </div>
                        <div className={styles.infoText}>
                            <span className={styles.infoLabel}>{t("contact.page.info.liveIn")}</span>
                            <span className={styles.infoValue}>{t("contact.page.info.liveIn.value")}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.socialsInfo}>
                    <span className={styles.heading}>{t("contact.page.socials.title")}</span>
                    <div className={styles.iconRow}>
                        {SOCIAL_ITEMS.map((item) => {
                            const isGithub = item.label === "GitHub";
                            const isFacebook = item.label === "facebook";
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`${styles.iconButton} ${VARIANT_CLASS[item.variant]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.label}
                                >
                                    <Image
                                        src={item.src}
                                        alt=""
                                        width={isGithub ? 55 : isFacebook ? 50 : 32}
                                        height={isGithub ? 55 : isFacebook ? 50 : 32}
                                        className={
                                            isGithub ? styles.iconImageGithub : isFacebook ? styles.iconImageFacebook : styles.iconImage
                                        }
                                    />
                                </Link>
                            );
                        })}
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
                    <div className={styles.formField}>
                        <input
                            id="contact-name"
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder={`${t("contact.page.form.name")} *`}
                            className={`${styles.formInput} ${errors.name ? styles.formInputError : ""}`}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? "contact-name-error" : undefined}
                            disabled={isSubmitting}
                        />
                        {errors.name ? (
                            <span id="contact-name-error" className={styles.formError}>
                                {errors.name}
                            </span>
                        ) : null}
                    </div>

                    <div className={styles.formField}>
                        <input
                            id="contact-email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder={`${t("contact.page.form.email")} *`}
                            className={`${styles.formInput} ${errors.email ? styles.formInputError : ""}`}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "contact-email-error" : undefined}
                            disabled={isSubmitting}
                        />
                        {errors.email ? (
                            <span id="contact-email-error" className={styles.formError}>
                                {errors.email}
                            </span>
                        ) : null}
                    </div>

                    <div className={styles.formField}>
                        <input
                            id="contact-subject"
                            type="text"
                            name="subject"
                            value={values.subject}
                            onChange={handleChange}
                            placeholder={`${t("contact.page.form.subject")} *`}
                            className={`${styles.formInput} ${errors.subject ? styles.formInputError : ""}`}
                            aria-invalid={Boolean(errors.subject)}
                            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                            disabled={isSubmitting}
                        />
                        {errors.subject ? (
                            <span id="contact-subject-error" className={styles.formError}>
                                {errors.subject}
                            </span>
                        ) : null}
                    </div>

                    <div className={styles.formField}>
                        <textarea
                            id="contact-message"
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            placeholder={`${t("contact.page.form.message")} *`}
                            className={`${styles.formInput} ${styles.formTextarea} ${errors.message ? styles.formInputError : ""}`}
                            rows={5}
                            aria-invalid={Boolean(errors.message)}
                            aria-describedby={errors.message ? "contact-message-error" : undefined}
                            disabled={isSubmitting}
                        />
                        {errors.message ? (
                            <span id="contact-message-error" className={styles.formError}>
                                {errors.message}
                            </span>
                        ) : null}
                    </div>

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