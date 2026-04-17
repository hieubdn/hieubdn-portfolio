import { Skeleton } from "./skeleton";
import styles from "./page-skeleton.module.scss";

export function PageSkeleton() {
  return (
    <div className={styles.root} aria-busy aria-live="polite">
      <Skeleton className={styles.hero} />
      <div className={styles.row}>
        <Skeleton className={styles.card} />
        <Skeleton className={styles.card} />
      </div>
      <Skeleton className={styles.wide} />
    </div>
  );
}
