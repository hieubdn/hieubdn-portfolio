"use client";

import { Languages } from "@/assets/svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
  DEFAULT_APP_LOCALE,
  type AppLocaleCode,
  LOCALE_OPTIONS,
} from "./locale-constants";
import { translateForLocale, useLocaleText } from "./locale-provider";
import styles from "./language-setting.module.scss";

export default function LanguageSettingPanel() {
  const confirmRef = useRef<HTMLDialogElement>(null);
  const { locale, setLocale, t } = useLocaleText();
  const [committedLocale, setCommittedLocale] =
    useState<AppLocaleCode>(DEFAULT_APP_LOCALE);
  const [draftLocale, setDraftLocale] = useState<AppLocaleCode>(DEFAULT_APP_LOCALE);

  const dirty = draftLocale !== committedLocale;

  const openConfirm = useCallback(() => {
    if (!dirty) return;
    confirmRef.current?.showModal();
  }, [dirty]);

  const cancelConfirm = useCallback(() => {
    setDraftLocale(committedLocale);
    confirmRef.current?.close();
  }, [committedLocale]);

  const applyLocale = useCallback(() => {
    // setLocale resolves after the target dictionary is loaded, so the toast
    // below can translate into the new locale. It rejects if the dictionary
    // failed to load — the panel must not report success in that case.
    void setLocale(draftLocale)
      .then(() => {
        setCommittedLocale(draftLocale);
        confirmRef.current?.close();
        toast.success(
          translateForLocale(draftLocale, "settings.language.toast"),
        );
      })
      .catch((err) => {
        console.error("[i18n] Failed to apply locale:", draftLocale, err);
        toast.error(t("settings.language.toast.error"));
      });
  }, [draftLocale, setLocale, t]);

  useEffect(() => {
    setCommittedLocale(locale);
    setDraftLocale(locale);
  }, [locale]);

  const draftLabel =
    LOCALE_OPTIONS.find((o) => o.code === draftLocale)?.nativeLabel ?? draftLocale;

  return (
    <div className={styles.languageSetting}>
      <h3 className={styles.title}>
        <Languages /> {t("settings.language.label")}
      </h3>

      <div className={styles.languageSettingContent}>
        <div className={styles.languageSettingContentTitle}>
          <span className={styles.contentTitle}>{t("settings.language.title")}</span>
          <span className={styles.hint}>{t("settings.language.hint")}</span>
        </div>
      <ul
        className={styles.optionList}
        role="radiogroup"
        aria-label={t("aria.languages")}
      >
        {LOCALE_OPTIONS.map((option) => {
          const selected = draftLocale === option.code;
          return (
            <li key={option.code}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                className={styles.optionRow}
                onClick={() => setDraftLocale(option.code)}
              >
                <span className={styles.optionTexts}>
                  <span className={styles.nativeLabel}>{option.nativeLabel}</span>
                  <span className={styles.hintVi}>
                    {t(`settings.language.options.${option.code}`)}
                  </span>
                </span>
                <span
                  className={`${styles.radio} ${selected ? styles.radioActive : ""}`}
                  aria-hidden="true"
                />
              </button>
            </li>
          );
        })}
      </ul>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.saveButton}
          disabled={!dirty}
          onClick={openConfirm}
        >
          {t("settings.language.button")}
        </button>
      </div>

      <dialog ref={confirmRef} className={styles.confirmDialog} aria-labelledby="locale-confirm-title">
        <div className={styles.confirmInner}>
          <h4 id="locale-confirm-title" className={styles.confirmTitle}>
            {t("settings.language.confirm.title")}
          </h4>
          <p className={styles.confirmBody}>
            {t("settings.language.confirm.body")} <strong>{draftLabel}</strong>?{" "}
            {t("settings.language.confirm.note")}
          </p>
          <div className={styles.confirmActions}>
            <button type="button" className={styles.confirmCancel} onClick={cancelConfirm}>
              {t("settings.language.confirm.cancel")}
            </button>
            <button type="button" className={styles.confirmOk} onClick={applyLocale}>
              {t("settings.language.confirm.ok")}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
