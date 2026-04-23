import styles from "@/app/page.module.scss";
import ProjectsSection from "@/components/pages/projects/projects";

export default function ProjectsPage() {
  return (
    <div className={styles.home}>
      <ProjectsSection />
    </div>
  );
}
