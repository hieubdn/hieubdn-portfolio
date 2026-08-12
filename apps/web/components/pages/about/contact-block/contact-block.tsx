"use client";

import type { ComponentType } from "react";

import {
  CurrentAddress,
  Email,
  Hometown,
  Languagesicon,
  Name,
  Nationality,
  Phone,
} from "@/assets/svg";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import { Reveal } from "@/components/ui/reveal";

import styles from "./contact-block.module.scss";

type ContactRow = {
  Icon: ComponentType;
  labelKey: string;
  valueKey: string;
};

const CONTACT_ROWS: readonly ContactRow[] = [
  { Icon: Name, labelKey: "about.page.contact.name", valueKey: "about.page.contact.name1" },
  { Icon: Email, labelKey: "about.page.contact.email", valueKey: "about.page.contact.email1" },
  { Icon: Phone, labelKey: "about.page.contact.phone", valueKey: "about.page.contact.phone1" },
  { Icon: Hometown, labelKey: "about.page.contact.hometown", valueKey: "about.page.contact.hometown1" },
  {
    Icon: CurrentAddress,
    labelKey: "about.page.contact.currentaddress",
    valueKey: "about.page.contact.currentaddress1",
  },
  { Icon: Nationality, labelKey: "about.page.contact.nationality", valueKey: "about.page.contact.nationality1" },
  { Icon: Languagesicon, labelKey: "about.page.contact.languages", valueKey: "about.page.contact.languages1" },
];

export default function ContactBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <Reveal as="h3" className={styles.headingBlock}>
        {t("about.page.contact.title")}
      </Reveal>

      <ul className={styles.list}>
        {CONTACT_ROWS.map(({ Icon, labelKey, valueKey }, index) => (
          <Reveal as="li" key={labelKey} delayMs={60 + index * 40}>
            <span className={styles.label}>
              <Icon />
              {t(labelKey)}:
            </span>
            <span className={styles.value}>{t(valueKey)}</span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
