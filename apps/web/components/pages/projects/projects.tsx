import styles from "./projects.module.scss";

export default function ProjectsSection() {
  return (
    <section className={styles.projects} aria-labelledby="projects-title">
      <h1 id="projects-title" className={styles.title}>
        Dự án
      </h1>
      <p className={styles.lead}>
        Trang showcase dự án; nội dung chi tiết sẽ được bổ sung theo từng mục
        bạn muốn giới thiệu.
      </p>
    </section>
  );
}
