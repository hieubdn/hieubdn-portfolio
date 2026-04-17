import styles from "@/app/page.module.scss";
import ProjectsSection from "@/components/pages/customer/projects/projects";

export default function ProjectsPage() {
  return (
    <div className={styles.home}>
      <ProjectsSection />
    </div>
  );
}
