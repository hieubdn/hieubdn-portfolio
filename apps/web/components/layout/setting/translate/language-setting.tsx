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
    // below can translate into the new locale.
    void setLocale(draftLocale).then(() => {
      setCommittedLocale(draftLocale);
      confirmRef.current?.close();
      toast.success(
        translateForLocale(
          draftLocale,
          "setting.page.option.languages.toast.success",
        ),
      );
    });
  }, [draftLocale, setLocale]);

  useEffect(() => {
    setCommittedLocale(locale);
    setDraftLocale(locale);
  }, [locale]);

  const draftLabel =
    LOCALE_OPTIONS.find((o) => o.code === draftLocale)?.nativeLabel ?? draftLocale;

  return (
    <div className={styles.languageSetting}>
      <h3 className={styles.title}>
        <Languages /> {t("setting.page.option.languages")}
      </h3>

      <div className={styles.languageSettingContent}>
        <div className={styles.languageSettingContentTitle}>
          <span className={styles.contentTitle}>{t("setting.page.option.languages.title")}</span>
          <span className={styles.hint}>{t("setting.page.option.languages.hint")}</span>
        </div>
      <ul
        className={styles.optionList}
        role="radiogroup"
        aria-label={t("aria.languages.list")}
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
                    {t(`setting.page.option.languages.${option.code}`)}
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
          {t("setting.page.option.languages.button")}
        </button>
      </div>

      <dialog ref={confirmRef} className={styles.confirmDialog} aria-labelledby="locale-confirm-title">
        <div className={styles.confirmInner}>
          <h4 id="locale-confirm-title" className={styles.confirmTitle}>
            {t("setting.page.option.languages.popup.title")}
          </h4>
          <p className={styles.confirmBody}>
            {t("setting.page.option.languages.popup.body")} <strong>{draftLabel}</strong>?{" "}
            {t("setting.page.option.languages.popup.body.strong")}
          </p>
          <div className={styles.confirmActions}>
            <button type="button" className={styles.confirmCancel} onClick={cancelConfirm}>
              {t("setting.page.option.languages.popup.button.cancel")}
            </button>
            <button type="button" className={styles.confirmOk} onClick={applyLocale}>
              {t("setting.page.option.languages.popup.button.confirm")}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
