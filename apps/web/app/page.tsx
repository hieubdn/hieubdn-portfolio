import styles from "./page.module.scss";
import HomeSection from "@/components/pages/customer/home/home";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <HomeSection />
    </div>
  );
}