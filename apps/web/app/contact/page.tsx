import Link from "next/link";

import layout from "@/app/page.module.scss";

import styles from "./page.module.scss";

const EMAIL = "hieubdn@gmail.com";

export default function ContactPage() {
  return (
    <div className={layout.home}>
      <main className={styles.main}>
        <h1 className={styles.title}>Liên hệ</h1>
        <p className={styles.lead}>
          <Link href={`mailto:${EMAIL}`} className={styles.link}>
            {EMAIL}
          </Link>
        </p>
      </main>
    </div>
  );
}
