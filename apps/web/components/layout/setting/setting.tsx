"use client";

import { BackToHomeIcon, SettingIcon, Languages, ResetSettings } from "@/assets/svg";
import { useEffect, useMemo, useState } from "react";
import { useMainScreen } from "@/components/layout/main-screen/main-screen-context";
import LanguageSettingPanel from "@/components/layout/setting/translate/language-setting";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import styles from "./setting.module.scss";

const SETTINGS_STACK_MQ = "(max-width: 960px)";

type SettingOptionId = "languages" | "resetSettings";

export default function Setting() {
  const { showRouteView } = useMainScreen();
  const { t } = useLocaleText();
  const settingOptions = useMemo(
    () =>
      [
        {
          id: "languages" as const,
          label: t("setting.page.option.languages"),
          icon: <Languages />,
        },
        {
          id: "resetSettings" as const,
          label: t("setting.page.option.resetSettings"),
          icon: <ResetSettings />,
        },
      ] as const,
    [t],
  );

  const [activeOptionId, setActiveOptionId] =
    useState<SettingOptionId>("languages");
  const activeOption =
    settingOptions.find((option) => option.id === activeOptionId) ??
    settingOptions[0];

  const [isStackLayout, setIsStackLayout] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(SETTINGS_STACK_MQ);
    const apply = () => setIsStackLayout(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const panelForOption = (option: (typeof settingOptions)[number]) =>
    option.id === "languages" ? (
      <LanguageSettingPanel />
    ) : (
      <>
        <h3 className={styles.settingPanelTitle}>
          {option.icon} {option.label}
        </h3>
        <p className={styles.settingPanelDescription}>
          This is a starter content area for {option.label}. You can fill the
          full content later.
        </p>
      </>
    );

  return (
    <div className={styles.setting}>
      <span className={styles.backToHome} onClick={showRouteView}>
        <BackToHomeIcon /> {t("setting.page.moveBackToHome")}
      </span>

      <div className={styles.settingContent}>
        {isStackLayout ? (
          <div className={styles.settingPanelStack}>
            <h2 className={styles.settingMobileTitle}>
              <SettingIcon /> {t("setting.page.title")}
            </h2>
            {settingOptions.map((option) => (
              <section key={option.id} className={styles.settingPanel}>
                {panelForOption(option)}
              </section>
            ))}
          </div>
        ) : (
          <>
            <aside className={styles.settingSidebar}>
              <h2 className={styles.settingTitle}>
                <SettingIcon /> {t("setting.page.title")}
              </h2>
              <ul className={styles.settingOptionList}>
                {settingOptions.map((option) => {
                  const isActive = option.id === activeOptionId;
                  return (
                    <li key={option.id}>
                      <button
                        type="button"
                        className={`${styles.settingOption} ${isActive ? styles.active : ""}`}
                        onClick={() => setActiveOptionId(option.id)}
                      >
                        <span className={styles.settingOptionIcon}>
                          {option.icon}
                        </span>
                        {option.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <div className={styles.settingPanelSingle}>
              <section className={styles.settingPanel}>
                {panelForOption(activeOption)}
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}