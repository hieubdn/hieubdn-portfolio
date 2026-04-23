"use client";

import styles from "./principles-block.module.scss";
import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";

export default function PrinciplesBlock() {
  const { t } = useLocaleText();

  return (
    <div className={styles.root}>
      
    </div>
  );
}