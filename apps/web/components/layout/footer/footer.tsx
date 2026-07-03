import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <span>Home</span>
        <span>About</span>
        <span>Projects</span>
        <span>Contact</span>
      </div>
      <div className={styles.inner}>
        <p className={styles.copy}>
         Copyright © {new Date().getFullYear()} ◦ All rights reserved.
        </p>
      </div>
    </footer>
  );
}
