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
  { Icon: Name, labelKey: "about.contact.name.label", valueKey: "about.contact.name.value" },
  { Icon: Email, labelKey: "about.contact.email.label", valueKey: "about.contact.email.value" },
  { Icon: Phone, labelKey: "about.contact.phone.label", valueKey: "about.contact.phone.value" },
  { Icon: Hometown, labelKey: "about.contact.hometown.label", valueKey: "about.contact.hometown.value" },
  {
    Icon: CurrentAddress,
    labelKey: "about.contact.address.label",
    valueKey: "about.contact.address.value",
  },
  { Icon: Nationality, labelKey: "about.contact.nationality.label", valueKey: "about.contact.nationality.value" },
  { Icon: Languagesicon, labelKey: "about.contact.languages.label", valueKey: "about.contact.languages.value" },
];

export default function ContactBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      <Reveal as="h3" className={styles.headingBlock}>
        {t("about.contact.title")}
      </Reveal>

      <ul className={styles.list}>
        {CONTACT_ROWS.map(({ Icon, labelKey, valueKey }, index) => (
          <Reveal as="li" key={labelKey} delayMs={60 + index * 40}>
            <Reveal as="span" className={styles.label}>
              <Icon />
              {t(labelKey)}:
            </Reveal>
            <Reveal as="span" delayMs={15} className={styles.value}>
              {t(valueKey)}
            </Reveal>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
